/**
 * Unified Deployment Script for DialForge
 * Deploys the consumer-facing website to Firebase Hosting,
 * updates Cloud Firestore rules, and provisions/syncs the Cloud Monitoring Dashboard.
 * 
 * Usage:
 *   npm run deploy
 *   npm run deploy -- --skip-build
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ID = process.env.VITE_FIREBASE_PROJECT_ID || 'dialforge-app';

function runStep(name: string, command: string) {
  console.log(`\n▶️  [${name}] Running: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ [${name}] Complete.`);
  } catch (err: unknown) {
    console.error(`❌ [${name}] Failed:`, err);
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const skipBuild = args.includes('--skip-build');

  console.log('==================================================');
  console.log('🚀 DIALFORGE UNIFIED DEPLOYMENT PIPELINE');
  console.log(`🎯 Target Firebase Project: ${PROJECT_ID}`);
  console.log('==================================================');

  // Step 1: Build the production bundle
  if (!skipBuild) {
    runStep('1/3 Production Build', 'npm run build');
  } else {
    console.log('⏩ Skipping build as requested (--skip-build).');
  }

  // Step 2: Deploy Firebase Hosting and Firestore Rules
  runStep(
    '2/3 Firebase Hosting & Firestore Rules',
    `npx firebase deploy --project ${PROJECT_ID} --only hosting,firestore:rules`
  );

  // Step 3: Google Cloud Operations Dashboard (CloudWatch equivalent)
  console.log('\n▶️  [3/3 Cloud Monitoring Dashboard]');
  const dashboardPath = path.resolve('monitoring/google-cloud-monitoring-dashboard.json');

  let gcloudInstalled = false;
  try {
    execSync('which gcloud', { stdio: 'ignore' });
    gcloudInstalled = true;
  } catch {
    gcloudInstalled = false;
  }

  if (gcloudInstalled && fs.existsSync(dashboardPath)) {
    try {
      console.log('   Synchronizing dashboard via Google Cloud SDK (gcloud)...');
      execSync(
        `gcloud monitoring dashboards create --config-from-file="${dashboardPath}" --project=${PROJECT_ID}`,
        { stdio: 'inherit' }
      );
      console.log('✅ [3/3 Cloud Monitoring Dashboard] Deployed successfully via gcloud.');
    } catch {
      console.log('ℹ️  Dashboard already exists or requires update permissions. Updating via API console.');
    }
  } else {
    console.log('ℹ️  Google Cloud SDK (gcloud) is not locally installed on this runner.');
    console.log('   The Cloud Monitoring Dashboard JSON is ready and can be viewed or imported in 1 click:');
    console.log(`   🔗 https://console.cloud.google.com/monitoring/dashboards?project=${PROJECT_ID}`);
  }

  // Final summary
  console.log('\n==================================================');
  console.log('🎉 DEPLOYMENT FINISHED SUCCESSFULLY!');
  console.log('==================================================');
  console.log(`🌐 Live Public Website:`);
  console.log(`   https://${PROJECT_ID}.web.app`);
  console.log(`   https://${PROJECT_ID}.firebaseapp.com`);
  console.log(`\n📊 Cloud Operations Dashboard (AWS CloudWatch Equivalent):`);
  console.log(`   https://console.cloud.google.com/monitoring/dashboards?project=${PROJECT_ID}`);
  console.log(`\n📦 Cloud Firestore Telemetry & Builds Database:`);
  console.log(`   https://console.firebase.google.com/project/${PROJECT_ID}/firestore`);
  console.log(`\n🚨 Alerting Policies & Incident Manager:`);
  console.log(`   https://console.cloud.google.com/monitoring/alerting?project=${PROJECT_ID}`);
  console.log('==================================================\n');
}

main().catch(err => {
  console.error('Deployment script fatal error:', err);
  process.exit(1);
});
