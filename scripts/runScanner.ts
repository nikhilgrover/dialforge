/**
 * Headless CLI Scanner Script for DialForge
 * Can be executed locally or via GitHub Actions cron
 */
import { executeStoreScan, VETTED_SCAN_SOURCES } from '../src/services/scannerService';

async function main() {
  console.log('🚀 Starting DialForge Supplier Feeds & Deal Scanner...');
  console.log(`📡 Monitored Sources (${VETTED_SCAN_SOURCES.length}):`);
  VETTED_SCAN_SOURCES.forEach(s => console.log(`   • ${s.name} (${s.domain}) [${s.tier}]`));
  console.log('--------------------------------------------------');

  const startTime = Date.now();
  const job = await executeStoreScan((stage, progress) => {
    console.log(`[${progress}%] ${stage}`);
  });

  console.log('--------------------------------------------------');
  console.log(`✅ Scan Finished in ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
  console.log(`📦 Components Monitored: ${job.itemsFound}`);
  console.log(`🔥 Price Drops & Deals Found: ${job.priceDropsDetected}`);
  
  if (job.dealsDiscovered.length > 0) {
    console.log('\nTop Deals Discovered:');
    job.dealsDiscovered.forEach(d => {
      console.log(`   🏷️ ${d.componentName}: $${d.oldPrice.toFixed(2)} -> $${d.newPrice.toFixed(2)} (-${d.discountPercent}%) at ${d.storeName}`);
    });
  }

  process.exit(0);
}

main().catch(err => {
  console.error('❌ Scanner failed:', err);
  process.exit(1);
});
