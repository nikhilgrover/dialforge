/**
 * Headless CLI Scanner Script for DialForge
 * Can be executed locally or via GitHub Actions cron.
 * 
 * Features:
 * - Emits Google Cloud Logging (Stackdriver) structured JSON logs for Firebase / GCP Monitoring.
 * - Records scan telemetry directly into Cloud Firestore (`scan_jobs` collection).
 * - Writes GitHub Step Summaries for transparent CI visibility.
 * - Exits with status 1 on SLA breach (failure rate >= 25%), triggering automated alert emails.
 */
import fs from 'node:fs';
import { executeStoreScan, VETTED_SCAN_SOURCES } from '../src/services/scannerService';

/**
 * Emit a structured JSON log entry in Google Cloud Logging format.
 * In GCP / Firebase environments, stdout JSON is automatically parsed into structured log payloads.
 */
function emitCloudLog(payload: {
  severity: 'DEFAULT' | 'DEBUG' | 'INFO' | 'NOTICE' | 'WARNING' | 'ERROR' | 'CRITICAL';
  message: string;
  [key: string]: unknown;
}) {
  const gcpLogEntry = {
    ...payload,
    time: new Date().toISOString(),
    'logging.googleapis.com/labels': {
      app: 'dialforge',
      component: 'supplier-scanner',
      environment: process.env.NODE_ENV || 'production'
    }
  };

  // Structured single-line JSON log for Cloud Logging / Stackdriver
  console.log(JSON.stringify(gcpLogEntry));
}

async function main() {
  const args = process.argv.slice(2);
  const simulateFailure = args.includes('--test-alert') || args.includes('--simulate-failure');
  const jsonOnly = args.includes('--json');

  if (!jsonOnly) {
    console.log('🚀 Starting DialForge Supplier Feeds & Deal Scanner...');
    if (simulateFailure) {
      console.log('⚠️ Running in TEST-ALERT simulation mode (forcing supplier degraded/offline states)');
    }
    console.log(`📡 Monitored Sources (${VETTED_SCAN_SOURCES.length}):`);
    VETTED_SCAN_SOURCES.forEach(s => console.log(`   • ${s.name} (${s.domain}) [${s.tier}]`));
    console.log('--------------------------------------------------');
  }

  const startTime = Date.now();
  const job = await executeStoreScan({
    simulateFailure,
    onProgress: (stage, progress) => {
      if (!jsonOnly) {
        console.log(`[${progress}%] ${stage}`);
      }
    }
  });

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(2);
  const metrics = job.metrics;
  const failureRate = metrics?.failureRatePercent ?? 0;
  const avgLatency = metrics?.avgLatencyMs ?? 0;

  // Determine Google Cloud Logging severity
  let severity: 'INFO' | 'WARNING' | 'ERROR' = 'INFO';
  if (job.status === 'failed' || failureRate >= 25) {
    severity = 'ERROR';
  } else if (job.status === 'degraded' || failureRate > 0) {
    severity = 'WARNING';
  }

  // Emit Google Cloud Logging (Cloud Operations / CloudWatch equivalent) Structured Log
  emitCloudLog({
    severity,
    message: `DialForge Scanner Job ${job.id} completed: ${job.status.toUpperCase()} with ${failureRate}% failure rate and ${job.priceDropsDetected} deals detected.`,
    jobId: job.id,
    durationMs: metrics?.totalDurationMs ?? 0,
    status: job.status,
    itemsMonitored: job.itemsFound,
    priceDropsDetected: job.priceDropsDetected,
    failureRatePercent: failureRate,
    successRatePercent: metrics?.overallSuccessRate ?? 100,
    avgLatencyMs: avgLatency,
    sourcesTotal: metrics?.sourcesTotal ?? 8,
    sourcesSucceeded: metrics?.sourcesSucceeded ?? 8,
    sourcesFailed: metrics?.sourcesFailed ?? 0,
    alertTriggered: metrics?.alertTriggered ?? false,
    alertMessage: metrics?.alertMessage,
    supplierHealth: job.sourceResults?.map(s => ({
      sourceId: s.sourceId,
      sourceName: s.sourceName,
      status: s.status,
      statusCode: s.statusCode,
      latencyMs: s.latencyMs,
      itemsParsed: s.itemsParsed,
      itemsExpected: s.itemsExpected,
      error: s.error || null
    })),
    topDeals: job.dealsDiscovered.map(d => ({
      componentName: d.componentName,
      storeName: d.storeName,
      oldPrice: d.oldPrice,
      dealPrice: d.newPrice,
      discountPercent: d.discountPercent
    }))
  });

  if (!jsonOnly) {
    console.log('--------------------------------------------------');
    console.log(`⏱️  Scan Execution Time: ${durationSec}s`);
    console.log(`📦 Components Monitored: ${job.itemsFound}`);
    console.log(`🔥 Price Drops & Deals Found: ${job.priceDropsDetected}`);
    console.log(`📊 Supplier Failure Rate: ${failureRate}% (Critical Threshold: ≥ 25%)`);
    console.log(`⚡ Average Latency: ${avgLatency}ms`);
    console.log(`🚦 Job Status: ${job.status.toUpperCase()}`);

    if (job.sourceResults && job.sourceResults.length > 0) {
      console.log('\n--- Supplier Health Telemetry ---');
      console.table(
        job.sourceResults.map(s => ({
          Supplier: s.sourceName,
          Status: s.status === 'online' ? '🟢 ONLINE' : s.status === 'degraded' ? '🟡 DEGRADED' : '🔴 OFFLINE',
          HTTP: s.statusCode,
          Latency: `${s.latencyMs}ms`,
          Items: `${s.itemsParsed}/${s.itemsExpected}`,
          Error: s.error || 'None'
        }))
      );
    }

    if (job.dealsDiscovered.length > 0) {
      console.log('\n--- Top Market Deals Discovered ---');
      job.dealsDiscovered.forEach(d => {
        console.log(`   🏷️  ${d.componentName}: $${d.oldPrice.toFixed(2)} -> $${d.newPrice.toFixed(2)} (-${d.discountPercent}%) at ${d.storeName}`);
      });
    }
  }

  // --- GitHub Actions Step Summary Generation ---
  const stepSummaryPath = process.env.GITHUB_STEP_SUMMARY;
  if (stepSummaryPath) {
    try {
      const statusEmoji = job.status === 'completed' ? '🟢' : job.status === 'degraded' ? '🟡' : '🔴';
      let md = `## ${statusEmoji} DialForge Supplier Scan & Telemetry Report\n\n`;
      md += `**Execution Time:** ${durationSec}s | **Timestamp:** ${job.timestamp} | **Status:** \`${job.status.toUpperCase()}\`\n\n`;

      if (metrics?.alertTriggered) {
        md += `> [!WARNING]\n`;
        md += `> **Alert Condition (${metrics.alertSeverity?.toUpperCase()}):** ${metrics.alertMessage}\n\n`;
      }

      md += `### 📊 Google Cloud & Firebase Operations Metrics\n\n`;
      md += `| Metric | Current Value | SLA Target |\n`;
      md += `| :--- | :--- | :--- |\n`;
      md += `| **Overall Success Rate** | \`${metrics?.overallSuccessRate}%\` | \`≥ 75%\` |\n`;
      md += `| **Supplier Failure Rate** | \`${failureRate}%\` | \`< 25%\` |\n`;
      md += `| **Average Latency** | \`${avgLatency}ms\` | \`< 800ms\` |\n`;
      md += `| **Active Deals Found** | \`${job.priceDropsDetected}\` | - |\n`;
      md += `| **Components Tracked** | \`${job.itemsFound}\` | - |\n\n`;

      md += `### 📡 Supplier Health Breakdown\n\n`;
      md += `| Supplier | Status | HTTP | Latency | Items | Diagnostics |\n`;
      md += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
      job.sourceResults?.forEach(s => {
        const icon = s.status === 'online' ? '🟢' : s.status === 'degraded' ? '🟡' : '🔴';
        md += `| ${s.sourceName} | ${icon} ${s.status} | \`${s.statusCode}\` | \`${s.latencyMs}ms\` | ${s.itemsParsed}/${s.itemsExpected} | ${s.error || 'Normal'} |\n`;
      });
      md += '\n';

      if (job.dealsDiscovered.length > 0) {
        md += `### 🏷️ Top Price Drops Discovered\n\n`;
        md += `| Component | Store | Prior Price | Deal Price | Discount |\n`;
        md += `| :--- | :--- | :--- | :--- | :--- |\n`;
        job.dealsDiscovered.forEach(d => {
          md += `| **${d.componentName}** | ${d.storeName} | ~~$${d.oldPrice.toFixed(2)}~~ | **$${d.newPrice.toFixed(2)}** | **-${d.discountPercent}%** |\n`;
        });
        md += '\n';
      }

      fs.appendFileSync(stepSummaryPath, md, 'utf-8');
      if (!jsonOnly) console.log('✅ Generated GitHub Actions step summary.');
    } catch (summaryErr) {
      console.warn('Unable to write to $GITHUB_STEP_SUMMARY:', summaryErr);
    }
  }

  // --- Alerting & SLA Exit Code ---
  if (job.status === 'failed' || failureRate >= 25) {
    if (!jsonOnly) {
      console.error(`\n🚨 ::error title=Scanner SLA Breach::${metrics?.alertMessage || 'Supplier failure rate exceeded 25% threshold'}`);
      console.error('❌ Exiting with status 1 to trigger GitHub Actions failure email alert.');
    }
    process.exit(1);
  }

  if (job.status === 'degraded' && metrics?.alertMessage && !jsonOnly) {
    console.log(`\n⚠️  ::warning title=Degraded Supplier Telemetry::${metrics.alertMessage}`);
  }

  if (!jsonOnly) {
    console.log('\n✨ Scan workflow completed successfully.');
  }
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Scanner unhandled exception:', err);
  process.exit(1);
});
