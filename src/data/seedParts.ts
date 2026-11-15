import type {
  Movement,
  Case,
  Dial,
  Hands,
  SecondsHandAccent,
  BezelInsert,
  Rotor,
  MovementSpacer,
  Strap,
  WatchTool
} from '../types/watch';

export const SEED_MOVEMENTS: Movement[] = [
  {
    id: 'mov-nh35',
    name: 'Seiko (TMI) NH35A Automatic',
    brand: 'Seiko Instruments / TMI',
    description: 'The undisputed king of custom watch modding. Features bi-directional automatic winding, hand-winding, hacking seconds, and a date complication at 3:00. Unmatched aftermarket parts support.',
    category: 'movement',
    caliber: 'NH35A',
    movementType: 'automatic',
    family: 'NH',
    basePrice: 38,
    beatsPerHour: 21600,
    beatsPerSecond: 6,
    diameterMm: 27.4,
    thicknessMm: 5.32,
    hasDate: true,
    hasDay: false,
    hasGmt: false,
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lastScannedAt: '2026-11-14T18:00:00Z',
    historicalLowestPrice: 28.50,
    vendors: [
      { id: 'v-miuski-nh35', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 31.50, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-nh35-automatic-movement.html', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-namoki-nh35', storeName: 'NamokiMODS', tier: 'premier', price: 64.99, productUrl: 'https://www.namokimods.com/products/seiko-sii-nh35a-automatic-movement', inStock: true, shippingDaysEstimate: '3-5 days', notes: 'Pre-regulated to +/- 5 sec/day' },
      { id: 'v-esslinger-nh35', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 47.95, productUrl: 'https://www.esslinger.com/seiko-watch-movement-nh35-automatic-date-at-3-overall-height-7-6mm/', inStock: true, shippingDaysEstimate: '2-4 days' }
    ]
  },
  {
    id: 'mov-nh36',
    name: 'Seiko (TMI) NH36A Day/Date Automatic',
    brand: 'Seiko Instruments / TMI',
    description: 'Workhorse dual-complication caliber featuring both English/Kanji day wheel and date wheel @ 3:00. Standard movement in legendary Seiko 5 and SKX series.',
    category: 'movement',
    caliber: 'NH36A',
    movementType: 'automatic',
    family: 'NH',
    basePrice: 42,
    beatsPerHour: 21600,
    beatsPerSecond: 6,
    diameterMm: 27.4,
    thicknessMm: 5.32,
    hasDate: true,
    hasDay: true,
    hasGmt: false,
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lastScannedAt: '2026-11-14T18:00:00Z',
    historicalLowestPrice: 32.00,
    vendors: [
      { id: 'v-miuski-nh36', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 34.00, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-nh36-day-date-movement.html', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-namoki-nh36', storeName: 'NamokiMODS', tier: 'premier', price: 69.99, productUrl: 'https://www.namokimods.com/products/seiko-sii-nh36a-automatic-movement', inStock: true, shippingDaysEstimate: '3-5 days' }
    ]
  },
  {
    id: 'mov-nh38',
    name: 'Seiko (TMI) NH38A True Time-Only',
    brand: 'Seiko Instruments / TMI',
    description: 'The purpose-built time-only automatic. Eliminates the "ghost date" crown click when building with sterile or no-date dials. Also features an open-heart balance bridge visible on open-heart dials.',
    category: 'movement',
    caliber: 'NH38A',
    movementType: 'automatic',
    family: 'NH',
    basePrice: 42,
    beatsPerHour: 21600,
    beatsPerSecond: 6,
    diameterMm: 27.4,
    thicknessMm: 5.32,
    hasDate: false,
    hasDay: false,
    hasGmt: false,
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lastScannedAt: '2026-11-14T18:00:00Z',
    historicalLowestPrice: 33.00,
    vendors: [
      { id: 'v-tandorio-nh38', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 34.00, productUrl: 'https://www.aliexpress.us/w/wholesale-tandorio-nh38-automatic-movement.html', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-dlw-nh38', storeName: 'DLW Watches', tier: 'premier', price: 58.00, productUrl: 'https://www.dlwwatches.com/products/movement-nh38', inStock: true, shippingDaysEstimate: '4-7 days' }
    ]
  },
  {
    id: 'mov-nh34',
    name: 'Seiko (TMI) NH34A Caller GMT',
    brand: 'Seiko Instruments / TMI',
    description: 'Groundbreaking affordable mechanical GMT movement. Features an independently adjustable 24-hour hand and date complication. Taller hand stack (5.70mm) requires double-domed crystal.',
    category: 'movement',
    caliber: 'NH34A',
    movementType: 'automatic',
    family: 'NH',
    basePrice: 52,
    beatsPerHour: 21600,
    beatsPerSecond: 6,
    diameterMm: 27.4,
    thicknessMm: 5.70,
    hasDate: true,
    hasDay: false,
    hasGmt: true,
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21, gmt: 2.20 },
    lastScannedAt: '2026-11-14T18:00:00Z',
    historicalLowestPrice: 38.00,
    vendors: [
      { id: 'v-miuski-nh34', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 39.50, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-nh34-gmt-automatic-movement.html', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-lucius-nh34', storeName: 'Lucius Atelier', tier: 'premier', price: 74.90, productUrl: 'https://luciusatelier.com/products/seiko-nh34-gmt-automatic-movement', inStock: true, shippingDaysEstimate: '3-6 days', notes: 'Individually regulated' }
    ]
  },
  {
    id: 'mov-vh31',
    name: 'Seiko (TMI) VH31 Sweeping Quartz',
    brand: 'Seiko Instruments / TMI',
    description: 'High-precision hybrid quartz caliber featuring a smooth 4 beats/second mechanical sweep. Ultra-slim 3.45mm profile, 15-second/month accuracy, zero winding needed. Requires NH movement adapter spacer.',
    category: 'movement',
    caliber: 'VH31',
    movementType: 'quartz-sweeping',
    family: 'VH',
    basePrice: 12,
    beatsPerHour: 14400,
    beatsPerSecond: 4,
    diameterMm: 23.3,
    thicknessMm: 3.45,
    hasDate: false,
    hasDay: false,
    hasGmt: false,
    handHoleSizes: { hour: 1.20, minute: 0.70, second: 0.17 },
    batteryLifeYears: 2,
    batteryModel: 'SR920SW / 371',
    lastScannedAt: '2026-11-14T18:00:00Z',
    historicalLowestPrice: 7.90,
    vendors: [
      { id: 'v-tandorio-vh31', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 8.90, productUrl: 'https://www.aliexpress.us/w/wholesale-tandorio-vh31-quartz-movement.html', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-esslinger-vh31', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 14.50, productUrl: 'https://www.esslinger.com/hattoris-epson-japan-quartz-watch-movement-vh31-overall-height-5-0mm/', inStock: true, shippingDaysEstimate: '2-4 days', notes: 'Includes factory warranty' }
    ]
  },
  {
    id: 'mov-ronda515',
    name: 'Ronda 515.24H Swiss Quartz GMT',
    brand: 'Ronda Swiss',
    description: 'Swiss-engineered workhorse step-quartz movement with dual-time 24H hand and 3:00 date window. Renowned 45-month power cell life and high shock resistance.',
    category: 'movement',
    caliber: '515.24H',
    movementType: 'quartz-standard',
    family: 'Ronda',
    basePrice: 16,
    beatsPerHour: 3600,
    beatsPerSecond: 1,
    diameterMm: 26.0,
    thicknessMm: 3.00,
    hasDate: true,
    hasDay: false,
    hasGmt: true,
    handHoleSizes: { hour: 1.20, minute: 0.70, second: 0.20, gmt: 1.60 },
    batteryLifeYears: 3.75,
    batteryModel: 'SR920SW / 371',
    lastScannedAt: '2026-11-14T18:00:00Z',
    historicalLowestPrice: 13.50,
    vendors: [
      { id: 'v-esslinger-ronda515', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 16.95, productUrl: 'https://www.esslinger.com/harley-ronda-quartz-watch-movement-515-24h-date-at-3-00-overall-height-4-9mm/', inStock: true, shippingDaysEstimate: '2-4 days' }
    ]
  },
  {
    id: 'mov-pt5000',
    name: 'HKPT PT5000 High-Beat 28,800 BPH',
    brand: 'HK Precision Technology',
    description: 'Swiss ETA 2824-2 architecture clone boasting a fluid 8 beats/second (28,800 BPH) sweep. Glashütte chronometer certified grade capability. Requires ETA compatible case and hands.',
    category: 'movement',
    caliber: 'PT5000',
    movementType: 'automatic',
    family: 'ETA',
    basePrice: 65,
    beatsPerHour: 28800,
    beatsPerSecond: 8,
    diameterMm: 25.6,
    thicknessMm: 4.60,
    hasDate: true,
    hasDay: false,
    hasGmt: false,
    handHoleSizes: { hour: 1.50, minute: 0.90, second: 0.25 },
    lastScannedAt: '2026-11-14T18:00:00Z',
    historicalLowestPrice: 48.00,
    vendors: [
      { id: 'v-miuski-pt5000', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 54.00, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-pt5000-high-beat-movement.html', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-esslinger-pt5000', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 79.95, productUrl: 'https://www.esslinger.com/chinese-automatic-movement-pt5000-overall-height-6-5mm/', inStock: true, shippingDaysEstimate: '2-4 days' }
    ]
  }
];

export const SEED_CASES: Case[] = [
  {
    id: 'case-sub-40',
    imageUrl: 'https://assets.assemble.watch/parts/cases/namoki/namoki_nmk909_sub_skx007_srpd_watch_case_polished_finish.webp',
    name: 'Submariner Style 40mm Diver Case (Stainless)',
    brand: 'Miuski Custom Works',
    description: 'Classic dive watch aesthetic. 316L solid stainless steel with unidirectional 120-click rotating bezel, screw-down crown at 3:00, and flat scratch-resistant sapphire crystal.',
    category: 'case',
    caseStyle: 'diver',
    basePrice: 42,
    outerDiameterMm: 40,
    lugToLugMm: 47.5,
    lugWidthMm: 20,
    thicknessMm: 13.0,
    dialDiameterFitMm: 28.5,
    crownPosition: '3.0',
    crystalType: 'flat-sapphire',
    crystalClearanceMm: 1.3,
    waterResistanceM: 200,
    caseFinish: 'brushed-steel',
    hasRotatingBezel: true,
    bezelInsertSize: { outerMm: 38.0, innerMm: 30.6, isSloping: true },
    hasChapterRing: false,
    casebackType: 'solid',
    nativeMovementFamily: 'NH',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-miuski-subcase', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 34.00, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-submariner-watch-case-40mm.html', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-namoki-nmk901', storeName: 'NamokiMODS', tier: 'premier', price: 89.99, productUrl: 'https://www.namokimods.com/products/nmk909-sub-skx007-srpd-watch-case-bundle-polished-finish', inStock: true, shippingDaysEstimate: '3-5 days', notes: 'Includes double O-ring Viton gaskets' }
    ]
  },
  {
    id: 'case-sub-black-40',
    imageUrl: 'https://assets.assemble.watch/parts/cases/namoki/namoki_nmk909_sub_skx007_srpd_watch_case_pvd_matte_black_finish.webp',
    name: 'Submariner Style 40mm PVD Stealth Black Case',
    brand: 'Caroline Mod Store',
    description: 'Tactical blacked-out diver case with satin PVD scratch-resistant ceramic coating. 120-click unidirectional bezel and screw-down triple-seal crown at 3:00.',
    category: 'case',
    caseStyle: 'diver',
    basePrice: 48,
    outerDiameterMm: 40,
    lugToLugMm: 47.5,
    lugWidthMm: 20,
    thicknessMm: 13.0,
    dialDiameterFitMm: 28.5,
    crownPosition: '3.0',
    crystalType: 'flat-sapphire',
    crystalClearanceMm: 1.3,
    waterResistanceM: 200,
    caseFinish: 'pvd-black',
    hasRotatingBezel: true,
    bezelInsertSize: { outerMm: 38.0, innerMm: 30.6, isSloping: true },
    hasChapterRing: false,
    casebackType: 'solid',
    nativeMovementFamily: 'NH',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-caroline-pvd-case', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 38.00, productUrl: 'https://www.aliexpress.us/w/wholesale-caroline-submariner-pvd-case.html', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-dlw-sub-pvd', storeName: 'DLW Watches', tier: 'premier', price: 92.00, productUrl: 'https://www.dlwwatches.com/products/case-sub-matte-black', inStock: true, shippingDaysEstimate: '3-5 days' }
    ]
  },
  {
    id: 'case-skx-42',
    imageUrl: 'https://assets.assemble.watch/parts/cases/namoki/namoki_nmk901_skx_watch_case_aged_steel_finish.webp',
    name: 'SKX007 Style 42mm GMT Diver Case',
    brand: 'Namoki Custom Line',
    description: 'Iconic ergonomic 42mm diver case with crown at 3.8:00. Equipped with high-clearance double-domed sapphire crystal engineered specifically to provide clearance for NH34 GMT hand stacks.',
    category: 'case',
    caseStyle: 'diver',
    basePrice: 68,
    outerDiameterMm: 42,
    lugToLugMm: 46.0,
    lugWidthMm: 22,
    thicknessMm: 13.8,
    dialDiameterFitMm: 28.5,
    crownPosition: '3.8',
    crystalType: 'double-domed-sapphire',
    crystalClearanceMm: 1.9,
    waterResistanceM: 200,
    caseFinish: 'brushed-steel',
    hasRotatingBezel: true,
    bezelInsertSize: { outerMm: 38.0, innerMm: 31.5, isSloping: false },
    hasChapterRing: true,
    chapterRingSize: { outerMm: 30.5, innerMm: 27.5 },
    casebackType: 'exhibition',
    nativeMovementFamily: 'NH',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-skx007', storeName: 'NamokiMODS', tier: 'premier', price: 79.99, productUrl: 'https://www.namokimods.com/products/nmk901-skx-watch-case-aged-steel-finish', inStock: true, shippingDaysEstimate: '3-5 days' },
      { id: 'v-tandorio-skx', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 38.50, productUrl: 'https://www.aliexpress.us/w/wholesale-tandorio-skx007-watch-case-42mm.html', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' }
    ]
  },
  {
    id: 'case-gmt-39',
    imageUrl: 'https://assets.assemble.watch/parts/cases/lucius_atelier/lucius_atelier_gs_diver_watch_case_36mm_nh34_ready.webp',
    name: 'Explorer II Style 39mm High-Clearance GMT Case',
    brand: 'Lucius Atelier',
    description: 'Modern 39mm sports GMT case with crown at 3:00. Fitted with premium double-domed anti-reflective sapphire crystal offering 1.95mm clearance for NH34 caller GMT stacks.',
    category: 'case',
    caseStyle: 'diver',
    basePrice: 72,
    outerDiameterMm: 39,
    lugToLugMm: 47.0,
    lugWidthMm: 20,
    thicknessMm: 12.8,
    dialDiameterFitMm: 28.5,
    crownPosition: '3.0',
    crystalType: 'double-domed-sapphire',
    crystalClearanceMm: 1.95,
    waterResistanceM: 200,
    caseFinish: 'brushed-steel',
    hasRotatingBezel: true,
    bezelInsertSize: { outerMm: 38.0, innerMm: 30.6, isSloping: true },
    hasChapterRing: false,
    casebackType: 'exhibition',
    nativeMovementFamily: 'NH',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-gmt39', storeName: 'Lucius Atelier', tier: 'premier', price: 98.00, productUrl: 'https://luciusatelier.com/products/gs-diver-watch-case-36mm-nh34-ready', inStock: true, shippingDaysEstimate: '3-5 days' },
      { id: 'v-miuski-gmt39', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 42.00, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-explorer-gmt-case-39mm.html', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' }
    ]
  },
  {
    id: 'case-exp-36',
    imageUrl: 'https://assets.assemble.watch/parts/cases/lucius_atelier/lucius_atelier_explorer_watch_case_36mm_v3.webp',
    name: 'Explorer Style 36mm Smooth Bezel Case',
    brand: 'Lucius Atelier',
    description: 'Proportionally perfect everyday sport/dress watch case. Slender 11.5mm profile with fixed mirror-polished bezel, screw-down crown at 3:00, and exhibition sapphire caseback.',
    category: 'case',
    caseStyle: 'explorer',
    basePrice: 55,
    outerDiameterMm: 36,
    lugToLugMm: 44.0,
    lugWidthMm: 20,
    thicknessMm: 11.8,
    dialDiameterFitMm: 28.5,
    crownPosition: '3.0',
    crystalType: 'flat-sapphire',
    crystalClearanceMm: 1.3,
    waterResistanceM: 100,
    caseFinish: 'brushed-steel',
    hasRotatingBezel: false,
    hasChapterRing: false,
    casebackType: 'exhibition',
    nativeMovementFamily: 'NH',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-exp36', storeName: 'Lucius Atelier', tier: 'premier', price: 92.00, productUrl: 'https://luciusatelier.com/products/explorer-watch-case-36mm-v3', inStock: true, shippingDaysEstimate: '3-5 days' },
      { id: 'v-miuski-exp36', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 36.00, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-explorer-watch-case-36mm.html', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' }
    ]
  },
  {
    id: 'case-field-38',
    imageUrl: 'https://assets.assemble.watch/parts/cases/namoki/namoki_nmk912_field_watch_case_bundle_olive_green_finish.webp',
    name: 'Khaki Field Style 38mm Matte Case',
    brand: 'Tandorio Horology',
    description: 'Military field watch case featuring a glare-free bead-blasted satin finish, drilled lug holes for quick strap changes, and a robust screw-down solid engraved caseback.',
    category: 'case',
    caseStyle: 'field',
    basePrice: 38,
    outerDiameterMm: 38,
    lugToLugMm: 46.5,
    lugWidthMm: 20,
    thicknessMm: 12.0,
    dialDiameterFitMm: 28.5,
    crownPosition: '3.0',
    crystalType: 'flat-sapphire',
    crystalClearanceMm: 1.3,
    waterResistanceM: 100,
    caseFinish: 'brushed-steel',
    hasRotatingBezel: false,
    hasChapterRing: false,
    casebackType: 'solid',
    nativeMovementFamily: 'NH',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-tandorio-field', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 29.80, productUrl: 'https://www.aliexpress.us/w/wholesale-tandorio-field-watch-case-38mm.html', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' }
    ]
  },
  {
    id: 'case-datejust-36',
    imageUrl: 'https://assets.assemble.watch/parts/cases/lucius_atelier/lucius_atelier_datejust_watch_case_36mm.webp',
    name: 'Datejust Style 36mm Fluted Bezel Case',
    brand: 'Miuski Custom Works',
    description: 'Refined dress watch case with light-catching fluted stainless steel bezel, screw-down crown at 3:00, and exhibition screw-in caseback.',
    category: 'case',
    caseStyle: 'datejust',
    basePrice: 46,
    outerDiameterMm: 36,
    lugToLugMm: 44.5,
    lugWidthMm: 20,
    thicknessMm: 12.2,
    dialDiameterFitMm: 28.5,
    crownPosition: '3.0',
    crystalType: 'flat-sapphire',
    crystalClearanceMm: 1.3,
    waterResistanceM: 100,
    caseFinish: 'brushed-steel',
    hasRotatingBezel: false,
    hasChapterRing: false,
    casebackType: 'exhibition',
    nativeMovementFamily: 'NH',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-miuski-dj36', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 37.50, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-datejust-watch-case-36mm.html', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-lucius-dj36', storeName: 'Lucius Atelier', tier: 'premier', price: 95.00, productUrl: 'https://luciusatelier.com/products/datejust-watch-case-36mm', inStock: true, shippingDaysEstimate: '3-5 days' }
    ]
  },
  {
    id: 'case-flieger-40',
    imageUrl: 'https://assets.assemble.watch/parts/cases/lucius_atelier/lucius_atelier_pilot_watch_case_34mm_ultra_thin_edition.webp',
    name: 'Type-A Pilot Flieger 40mm Satin Case',
    brand: 'Tandorio Horology',
    description: 'Aviation heritage pilot case featuring a fine satin finish, distinctive diamond onion crown for easy winding, and anti-reflective flat sapphire.',
    category: 'case',
    caseStyle: 'pilot',
    basePrice: 40,
    outerDiameterMm: 40,
    lugToLugMm: 48.0,
    lugWidthMm: 20,
    thicknessMm: 11.9,
    dialDiameterFitMm: 28.5,
    crownPosition: '3.0',
    crystalType: 'flat-sapphire',
    crystalClearanceMm: 1.3,
    waterResistanceM: 100,
    caseFinish: 'brushed-steel',
    hasRotatingBezel: false,
    hasChapterRing: false,
    casebackType: 'exhibition',
    nativeMovementFamily: 'NH',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-tandorio-flieger', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 32.00, productUrl: 'https://www.aliexpress.us/w/wholesale-tandorio-flieger-watch-case-40mm.html', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' }
    ]
  }
];

export const SEED_DIALS: Dial[] = [
  // --- 1. Iconic Art & Museum Dials ---
  {
    id: 'dial-great-wave',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_luminous_bgw9_the_great_wave_off_kanagawa_dial_no_date.webp',
    name: 'The Great Wave off Kanagawa (Luminous BGW9)',
    brand: 'Lucius Atelier',
    description: 'Masterpiece horology dial featuring Hokusai\'s iconic woodblock print. Multi-layered luminous ink emits a brilliant ice-blue BGW9 glow in the dark.',
    category: 'dial',
    basePrice: 62,
    diameterMm: 28.5,
    dialStyle: 'art',
    colorName: 'Sea Wave Blue',
    colorHex: '#1e3a8a',
    indicesStyle: 'minimal-markers',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'enamel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-great-wave', storeName: 'Lucius Atelier', tier: 'premier', price: 62.00, productUrl: 'https://luciusatelier.com/products/luminous-bgw9-the-great-wave-off-kanagawa-dial-no-date', inStock: true }
    ]
  },
  {
    id: 'dial-starry-night',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_luminous_the_starry_night_dial_day_date.webp',
    name: 'The Starry Night Luminous Dial',
    brand: 'Lucius Atelier',
    description: 'Vincent van Gogh inspired fine-art watch dial with celestial swirling brushstrokes and day/date apertures at 3:00. Fully luminescent starry sky.',
    category: 'dial',
    basePrice: 82,
    diameterMm: 28.5,
    dialStyle: 'art',
    colorName: 'Cobalt Night Blue',
    colorHex: '#172554',
    indicesStyle: 'dots-and-batons',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'enamel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-starry-night', storeName: 'Lucius Atelier', tier: 'premier', price: 82.00, productUrl: 'https://luciusatelier.com/products/luminous-the-starry-night-dial-day-date', inStock: true }
    ]
  },
  {
    id: 'dial-fine-wind-nodate',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_fine_wind_clear_morning_dial_no_date.webp',
    name: 'Fine Wind, Clear Morning (Red Fuji)',
    brand: 'Lucius Atelier',
    description: 'Hokusai\'s Red Fuji woodblock depiction in kiln-fired enamel with geometric clouds and towering crimson peak.',
    category: 'dial',
    basePrice: 39,
    diameterMm: 28.5,
    dialStyle: 'art',
    colorName: 'Crimson Fuji Red',
    colorHex: '#991b1b',
    indicesStyle: 'minimal-markers',
    lume: 'None',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'enamel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-fine-wind', storeName: 'Lucius Atelier', tier: 'premier', price: 39.00, productUrl: 'https://luciusatelier.com/products/fine-wind-clear-morning-dial-no-date', inStock: true }
    ]
  },
  {
    id: 'dial-fine-wind-date',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_fine_wind_clear_morning_dial_date.webp',
    name: 'Fine Wind, Clear Morning (Red Fuji - Date)',
    brand: 'Lucius Atelier',
    description: 'Enamel Red Fuji dial with bevel-framed date window at 3:00 matching Seiko NH35 datewheels.',
    category: 'dial',
    basePrice: 43,
    diameterMm: 28.5,
    dialStyle: 'art',
    colorName: 'Crimson Fuji Red',
    colorHex: '#991b1b',
    indicesStyle: 'minimal-markers',
    lume: 'None',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'enamel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-fine-wind-date', storeName: 'Lucius Atelier', tier: 'premier', price: 43.00, productUrl: 'https://luciusatelier.com/products/fine-wind-clear-morning-dial-date', inStock: true }
    ]
  },

  // --- 2. Mother of Pearl & Luxury Gemstone Dials ---
  {
    id: 'dial-mop-natural-date',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_mother_of_pearl_dial_natural_swarovski_edition_date.webp',
    name: 'Mother of Pearl / Swarovski Edition (Date)',
    brand: 'Lucius Atelier',
    description: 'Natural iridescent oceanic mother of pearl wafer adorned with hand-set Swarovski crystal hour indices and beveled date frame.',
    category: 'dial',
    basePrice: 64,
    diameterMm: 28.5,
    dialStyle: 'dress',
    colorName: 'Iridescent Pearl',
    colorHex: '#f8fafc',
    indicesStyle: 'dots-and-batons',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'mother-of-pearl',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-mop-date', storeName: 'Lucius Atelier', tier: 'premier', price: 64.00, productUrl: 'https://luciusatelier.com/products/mother-of-pearl-dial-natural-swarovski-edition-date', inStock: true }
    ]
  },
  {
    id: 'dial-mop-pink-nodate',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_mother_of_pearl_dial_pink_swarovski_edition_no_date.webp',
    name: 'Mother of Pearl Pink / Swarovski (No Date)',
    brand: 'Lucius Atelier',
    description: 'Natural rose-pink shimmering nacre dial with handset crystal hour markers and sterile clean layout.',
    category: 'dial',
    basePrice: 64,
    diameterMm: 28.5,
    dialStyle: 'dress',
    colorName: 'Rose Pearl Pink',
    colorHex: '#fbcfe8',
    indicesStyle: 'dots-and-batons',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'mother-of-pearl',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-mop-pink', storeName: 'Lucius Atelier', tier: 'premier', price: 64.00, productUrl: 'https://luciusatelier.com/products/mother-of-pearl-dial-pink-swarovski-edition-no-date', inStock: true }
    ]
  },
  {
    id: 'dial-bitcoin-24k',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_bitcoin_dial_24k_gold.webp',
    name: 'Bitcoin Dial - 24K Gold Plated',
    brand: 'Lucius Atelier',
    description: 'Deep-engraved proof-coin Bitcoin emblem plated in authentic 24-karat yellow gold with circuit board micro-traces.',
    category: 'dial',
    basePrice: 58,
    diameterMm: 28.5,
    dialStyle: 'dress',
    colorName: '24K Yellow Gold',
    colorHex: '#eab308',
    indicesStyle: 'minimal-markers',
    lume: 'None',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'sunburst',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-bitcoin-gold', storeName: 'Lucius Atelier', tier: 'premier', price: 58.00, productUrl: 'https://luciusatelier.com/products/bitcoin-dial-24k-gold', inStock: true }
    ]
  },
  {
    id: 'dial-bitcoin-black',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_bitcoin_dial_vintage_black.webp',
    name: 'Bitcoin Dial - Vintage Matte Black',
    brand: 'Lucius Atelier',
    description: 'Stealth black commemorative crypto dial with matte PVD backdrop and raised gold relief insignia.',
    category: 'dial',
    basePrice: 58,
    diameterMm: 28.5,
    dialStyle: 'dress',
    colorName: 'Matte Obsidian Black',
    colorHex: '#18181b',
    indicesStyle: 'minimal-markers',
    lume: 'None',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'matte',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-bitcoin-black', storeName: 'Lucius Atelier', tier: 'premier', price: 58.00, productUrl: 'https://luciusatelier.com/products/bitcoin-dial-vintage-black', inStock: true }
    ]
  },

  // --- 3. Deep Enamel & Pitch Black Dials ---
  {
    id: 'dial-marine-master',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_pitch_black_enamel_dial_date.webp',
    name: 'Pitch Black Kiln Enamel Dial (Date)',
    brand: 'Lucius Atelier',
    description: 'Flawless glossy piano-black enamel dial with mirror finish. Applied chrome indices filled with ultra-bright Swiss Super-LumiNova BGW9 and framed date window @ 3:00.',
    category: 'dial',
    basePrice: 54,
    diameterMm: 28.5,
    dialStyle: 'diver',
    colorName: 'Enamel Gloss Black',
    colorHex: '#09090b',
    indicesStyle: 'dots-and-batons',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'enamel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-pitch-black', storeName: 'Lucius Atelier', tier: 'premier', price: 54.00, productUrl: 'https://luciusatelier.com/products/pitch-black-enamel-dial-date', inStock: true },
      { id: 'v-ds-dial-mm', storeName: 'DS-Watch Mod Store (AliExpress)', tier: 'vetted-direct', price: 18.50, productUrl: 'https://www.aliexpress.us/w/wholesale-ds-watch-enamel-dial-28.5mm.html', inStock: true, isSpecialDeal: true }
    ]
  },

  // --- 4. Luxury Sport Sunburst & Textured Dials ---
  {
    id: 'dial-sunburst-blue',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_nautilus_deep_blue_sunburst_dial_date.webp',
    name: 'Nautilus Deep Blue Sunburst Dial (Date)',
    brand: 'Lucius Atelier',
    description: 'Horizontal embossed grooved dial with deep navy sunburst radial brushing that shifts between midnight black and electric ocean blue in sunlight.',
    category: 'dial',
    basePrice: 68,
    diameterMm: 28.5,
    dialStyle: 'dress',
    colorName: 'Deep Sunburst Blue',
    colorHex: '#1e3a8a',
    indicesStyle: 'dots-and-batons',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'sunburst',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-nautilus-blue', storeName: 'Lucius Atelier', tier: 'premier', price: 68.00, productUrl: 'https://luciusatelier.com/products/nautilus-deep-blue-sunburst-dial-date', inStock: true },
      { id: 'v-miuski-blue-dial', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 19.00, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-nautilus-blue-dial.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'dial-arctic-white',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_nautilus_arctic_white_dial_date.webp',
    name: 'Nautilus Arctic White Textured Dial (Date)',
    brand: 'Lucius Atelier',
    description: 'Crisp glacial-white horizontal bar relief dial with blackened indices and date frame offering maximum contrast.',
    category: 'dial',
    basePrice: 71,
    diameterMm: 28.5,
    dialStyle: 'dress',
    colorName: 'Arctic Polar White',
    colorHex: '#f8fafc',
    indicesStyle: 'dots-and-batons',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'waffle',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-nautilus-white', storeName: 'Lucius Atelier', tier: 'premier', price: 71.00, productUrl: 'https://luciusatelier.com/products/nautilus-arctic-white-dial-date', inStock: true }
    ]
  },
  {
    id: 'dial-turquoise-tiffany',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_nautilus_turquoise_dial_no_date.webp',
    name: 'Nautilus Tiffany Turquoise Dial (No Date)',
    brand: 'Lucius Atelier',
    description: 'Hypnotic robins-egg turquoise blue dial with horizontal texture ribs and pure sterile layout.',
    category: 'dial',
    basePrice: 68,
    diameterMm: 28.5,
    dialStyle: 'dress',
    colorName: 'Tiffany Turquoise',
    colorHex: '#2dd4bf',
    indicesStyle: 'dots-and-batons',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'waffle',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-tiffany', storeName: 'Lucius Atelier', tier: 'premier', price: 68.00, productUrl: 'https://luciusatelier.com/products/nautilus-turquoise-dial-no-date', inStock: true },
      { id: 'v-caroline-tiffany', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 22.50, productUrl: 'https://www.aliexpress.us/w/wholesale-caroline-tiffany-blue-dial.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'dial-hemicube-guilloche',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_hemicube_dial_no_date.webp',
    name: 'Hemicube 3D Isometric Guilloché Dial',
    brand: 'Lucius Atelier',
    description: 'High-complication CNC isometric cubic guilloché pattern that bends light in three dimensions across alternating satin facets.',
    category: 'dial',
    basePrice: 61,
    diameterMm: 28.5,
    dialStyle: 'dress',
    colorName: 'Charcoal Guilloché',
    colorHex: '#27272a',
    indicesStyle: 'minimal-markers',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'guilloche',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-hemicube', storeName: 'Lucius Atelier', tier: 'premier', price: 61.00, productUrl: 'https://luciusatelier.com/products/hemicube-dial-no-date', inStock: true }
    ]
  },
  {
    id: 'dial-blank-brass',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_blank_brass_dial.webp',
    name: 'Blank Raw Brass Sunburst Dial',
    brand: 'Lucius Atelier',
    description: 'Solid natural raw brass dial blank featuring heavy circular sunburst brushing. Ideal for custom patination or minimalist builds.',
    category: 'dial',
    basePrice: 20,
    diameterMm: 28.5,
    dialStyle: 'minimalist',
    colorName: 'Warm Raw Brass',
    colorHex: '#ca8a04',
    indicesStyle: 'minimal-markers',
    lume: 'None',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'sunburst',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-brass', storeName: 'Lucius Atelier', tier: 'premier', price: 20.00, productUrl: 'https://luciusatelier.com/products/blank-brass-dial', inStock: true }
    ]
  },

  // --- 5. Explorer & Heritage Dials ---
  {
    id: 'dial-explorer-1016-nodate',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_explorer_1016_dial_no_date.webp',
    name: 'Explorer 1016 Vintage Dial (No Date)',
    brand: 'Lucius Atelier',
    description: 'The golden age horology benchmark. Distinctive 3-6-9 Arabic font typography, printed gilt minute track, and vintage patinated lume markers.',
    category: 'dial',
    basePrice: 52,
    diameterMm: 28.5,
    dialStyle: 'explorer',
    colorName: 'Satin Black',
    colorHex: '#18181b',
    indicesStyle: 'explorer-369',
    lume: 'Vintage',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'matte',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-exp1016', storeName: 'Lucius Atelier', tier: 'premier', price: 52.00, productUrl: 'https://luciusatelier.com/products/explorer-1016-dial-no-date', inStock: true },
      { id: 'v-tandorio-exp-black', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 17.50, productUrl: 'https://www.aliexpress.us/w/wholesale-tandorio-1016-dial-28.5mm.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'dial-explorer-1016-date',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_explorer_1016_dial_date.webp',
    name: 'Explorer 1016 Gilt Dial (Date Window)',
    brand: 'Lucius Atelier',
    description: 'Vintage 3-6-9 dial with aperture for standard NH35 date calendar wheel at 3:00.',
    category: 'dial',
    basePrice: 52,
    diameterMm: 28.5,
    dialStyle: 'explorer',
    colorName: 'Vintage Gilt Black',
    colorHex: '#18181b',
    indicesStyle: 'explorer-369',
    lume: 'Vintage',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'matte',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-exp-date', storeName: 'Lucius Atelier', tier: 'premier', price: 52.00, productUrl: 'https://luciusatelier.com/products/explorer-1016-dial-date', inStock: true }
    ]
  },
  {
    id: 'dial-nautical-exp-v2',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_nautical_explorer_dial_v2_no_date.webp',
    name: 'Nautical Explorer Dial v2 (No Date)',
    brand: 'Lucius Atelier',
    description: 'A blend of nautical diver markers and iconic 3-6-9 Explorer geometry with Swiss BGW9 lume.',
    category: 'dial',
    basePrice: 52,
    diameterMm: 28.5,
    dialStyle: 'explorer',
    colorName: 'Matte Jet Black',
    colorHex: '#18181b',
    indicesStyle: 'explorer-369',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'matte',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-nautical-exp', storeName: 'Lucius Atelier', tier: 'premier', price: 52.00, productUrl: 'https://luciusatelier.com/products/nautical-explorer-dial-v2-no-date', inStock: true }
    ]
  },
  {
    id: 'dial-1908-silver',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_1908_dial_silver_indices_no_date.webp',
    name: '1908 Dress Dial - Silver Faceted Indices',
    brand: 'Lucius Atelier',
    description: 'Haute horlogerie dress watch dial with rhodium-plated faceted arrow markers and printed minute rail track.',
    category: 'dial',
    basePrice: 55,
    diameterMm: 28.5,
    dialStyle: 'dress',
    colorName: 'Opaline Silver',
    colorHex: '#f1f5f9',
    indicesStyle: 'minimal-markers',
    lume: 'None',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'enamel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-1908-silver', storeName: 'Lucius Atelier', tier: 'premier', price: 55.00, productUrl: 'https://luciusatelier.com/products/1908-dial-silver-indices-no-date', inStock: true }
    ]
  },
  {
    id: 'dial-1908-gold',
    imageUrl: 'https://assets.assemble.watch/parts/dials/lucius_atelier/lucius_atelier_1908_dial_yellow_gold_indices_no_date.webp',
    name: '1908 Dress Dial - Yellow Gold Indices',
    brand: 'Lucius Atelier',
    description: 'Dress watch dial with 18k yellow gold-plated faceted arrow indices and crisp railroad outer track.',
    category: 'dial',
    basePrice: 55,
    diameterMm: 28.5,
    dialStyle: 'dress',
    colorName: 'Champagne Ivory',
    colorHex: '#fef3c7',
    indicesStyle: 'minimal-markers',
    lume: 'None',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'enamel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-1908-gold', storeName: 'Lucius Atelier', tier: 'premier', price: 55.00, productUrl: 'https://luciusatelier.com/products/1908-dial-yellow-gold-indices-no-date', inStock: true }
    ]
  },

  // --- 6. Namoki Vintage & Tool Dials ---
  {
    id: 'dial-namoki-62mas-grey',
    imageUrl: 'https://assets.assemble.watch/parts/dials/namoki/namoki_watch_dial_62mas_grey.webp',
    name: '62MAS Sunburst Charcoal Grey Dial',
    brand: 'NamokiMODS',
    description: 'Tribute to Seiko\'s original 1965 diver (6217-8001). Radiant charcoal sunburst finish with raised polished rectangle indices and date at 3:00.',
    category: 'dial',
    basePrice: 42,
    diameterMm: 28.5,
    dialStyle: 'diver',
    colorName: 'Sunburst Charcoal',
    colorHex: '#475569',
    indicesStyle: 'dots-and-batons',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'sunburst',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-62mas-grey', storeName: 'NamokiMODS', tier: 'premier', price: 42.00, productUrl: 'https://www.namokimods.com/products/watch-dial-62mas-grey', inStock: true }
    ]
  },
  {
    id: 'dial-namoki-62mas-blue',
    imageUrl: 'https://assets.assemble.watch/parts/dials/namoki/namoki_watch_dial_62mas_sunburst_blue.webp',
    name: '62MAS Sunburst Pacific Blue Dial',
    brand: 'NamokiMODS',
    description: 'Rich maritime sunburst blue diver dial with rectangular applied lume markers and polished chamfers.',
    category: 'dial',
    basePrice: 42,
    diameterMm: 28.5,
    dialStyle: 'diver',
    colorName: 'Sunburst Pacific Blue',
    colorHex: '#1d4ed8',
    indicesStyle: 'dots-and-batons',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'sunburst',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-62mas-blue', storeName: 'NamokiMODS', tier: 'premier', price: 42.00, productUrl: 'https://www.namokimods.com/products/watch-dial-62mas-sunburst-blue', inStock: true }
    ]
  },
  {
    id: 'dial-namoki-alpine-black',
    imageUrl: 'https://assets.assemble.watch/parts/dials/namoki/namoki_watch_dial_alpine_black.webp',
    name: 'Alpine Sunburst Onyx Black Dial',
    brand: 'NamokiMODS',
    description: 'Adventure sports dial with deep circular sunburst texture and triangular indices.',
    category: 'dial',
    basePrice: 40,
    diameterMm: 28.5,
    dialStyle: 'explorer',
    colorName: 'Onyx Black',
    colorHex: '#18181b',
    indicesStyle: 'dots-and-batons',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'sunburst',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-alpine-black', storeName: 'NamokiMODS', tier: 'premier', price: 40.00, productUrl: 'https://www.namokimods.com/products/watch-dial-alpine-black', inStock: true }
    ]
  },
  {
    id: 'dial-namoki-alpine-blue',
    imageUrl: 'https://assets.assemble.watch/parts/dials/namoki/namoki_watch_dial_alpine_blue.webp',
    name: 'Alpine Sunburst Glacier Blue Dial',
    brand: 'NamokiMODS',
    description: 'Glacial blue sunburst adventure dial with crisp Swiss lume.',
    category: 'dial',
    basePrice: 40,
    diameterMm: 28.5,
    dialStyle: 'explorer',
    colorName: 'Glacier Blue',
    colorHex: '#38bdf8',
    indicesStyle: 'dots-and-batons',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'sunburst',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-alpine-blue', storeName: 'NamokiMODS', tier: 'premier', price: 40.00, productUrl: 'https://www.namokimods.com/products/watch-dial-alpine-blue', inStock: true }
    ]
  },
  {
    id: 'dial-namoki-106-black',
    imageUrl: 'https://assets.assemble.watch/parts/dials/namoki/namoki_watch_dial_106_minimal_tool_dial_black.webp',
    name: '106 Minimal Tool Dial (Matte Black)',
    brand: 'NamokiMODS',
    description: 'Clean utilitarian tool watch dial with baton indices, high-legibility crosshair layout, and date window.',
    category: 'dial',
    basePrice: 38,
    diameterMm: 28.5,
    dialStyle: 'minimalist',
    colorName: 'Matte Black',
    colorHex: '#18181b',
    indicesStyle: 'minimal-markers',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'matte',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-106-black', storeName: 'NamokiMODS', tier: 'premier', price: 38.00, productUrl: 'https://www.namokimods.com/products/watch-dial-106-minimal-tool-dial-black', inStock: true }
    ]
  },
  {
    id: 'dial-namoki-107-white',
    imageUrl: 'https://assets.assemble.watch/parts/dials/namoki/namoki_watch_dial_107_minimal_tool_dial_white.webp',
    name: '107 Minimal Tool Dial (Stark White)',
    brand: 'NamokiMODS',
    description: 'Ultra-clean stark white dial with jet-black printed indices and date window.',
    category: 'dial',
    basePrice: 38,
    diameterMm: 28.5,
    dialStyle: 'minimalist',
    colorName: 'Stark White',
    colorHex: '#f8fafc',
    indicesStyle: 'minimal-markers',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'matte',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-107-white', storeName: 'NamokiMODS', tier: 'premier', price: 38.00, productUrl: 'https://www.namokimods.com/products/watch-dial-107-minimal-tool-dial-white', inStock: true }
    ]
  },
  {
    id: 'dial-namoki-108-silver',
    imageUrl: 'https://assets.assemble.watch/parts/dials/namoki/namoki_watch_dial_108_minimal_tool_dial_sunburst_silver.webp',
    name: '108 Sector Sunburst Silver Dial',
    brand: 'NamokiMODS',
    description: 'Vintage 1940s scientific sector dial with two-tone concentric rings and radial sunburst finish.',
    category: 'dial',
    basePrice: 42,
    diameterMm: 28.5,
    dialStyle: 'dress',
    colorName: 'Sunburst Silver',
    colorHex: '#e2e8f0',
    indicesStyle: 'minimal-markers',
    lume: 'None',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'sunburst',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-108-silver', storeName: 'NamokiMODS', tier: 'premier', price: 42.00, productUrl: 'https://www.namokimods.com/products/watch-dial-108-minimal-tool-dial-sunburst-silver', inStock: true }
    ]
  },
  {
    id: 'dial-namoki-af001-light',
    imageUrl: 'https://assets.assemble.watch/parts/dials/namoki/namoki_namoki_x_watch_dial_af_001_light.webp',
    name: 'Namoki x AF-001 Aviator Light Dial',
    brand: 'NamokiMODS',
    description: 'Limited collaborative aviation instrument dial with cockpit altimeter typography.',
    category: 'dial',
    basePrice: 45,
    diameterMm: 28.5,
    dialStyle: 'flieger',
    colorName: 'Sand Beige',
    colorHex: '#fef08a',
    indicesStyle: 'flieger-a',
    lume: 'Vintage',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'matte',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-af001-light', storeName: 'NamokiMODS', tier: 'premier', price: 45.00, productUrl: 'https://www.namokimods.com/products/namoki-x-watch-dial-af-001-light', inStock: true }
    ]
  },
  {
    id: 'dial-namoki-af001-stealth',
    imageUrl: 'https://assets.assemble.watch/parts/dials/namoki/namoki_namoki_x_watch_dial_af_001_stealth.webp',
    name: 'Namoki x AF-001 Aviator Stealth Dial',
    brand: 'NamokiMODS',
    description: 'Tactical blacked-out aviator instrument dial with stealth grey indices.',
    category: 'dial',
    basePrice: 45,
    diameterMm: 28.5,
    dialStyle: 'flieger',
    colorName: 'Stealth Black',
    colorHex: '#18181b',
    indicesStyle: 'flieger-a',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'matte',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-af001-stealth', storeName: 'NamokiMODS', tier: 'premier', price: 45.00, productUrl: 'https://www.namokimods.com/products/namoki-x-watch-dial-af-001-stealth', inStock: true }
    ]
  },

  // --- 7. Exotic Custom Artist Dials ---
  {
    id: 'dial-mission-mars',
    imageUrl: 'https://assets.assemble.watch/parts/dials/custom/custom_daneceo_mission_on_mars_dark.webp',
    name: 'Mission to Mars - Dark Meteorite Dial',
    brand: 'daneCEO Horology',
    description: 'Custom astronomical space mod dial with lunar crater topographic texture and Mars exploration motif.',
    category: 'dial',
    basePrice: 75,
    diameterMm: 28.5,
    dialStyle: 'art',
    colorName: 'Space Dark Charcoal',
    colorHex: '#27272a',
    indicesStyle: 'minimal-markers',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'meteorite',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-daneceo-mars', storeName: 'daneCEO Studio', tier: 'premier', price: 75.00, productUrl: 'https://www.instagram.com/the_watch_virtuoso/', inStock: true }
    ]
  },
  {
    id: 'dial-up-custom',
    imageUrl: 'https://assets.assemble.watch/parts/dials/custom/custom_daneceo_up.webp',
    name: 'Up! Multi-Color Balloon Artist Dial',
    brand: 'daneCEO Horology',
    description: 'Playful haute horlogerie custom artisan dial featuring vibrant micro-painted polychromatic balloons against a cloud-white sky.',
    category: 'dial',
    basePrice: 75,
    diameterMm: 28.5,
    dialStyle: 'art',
    colorName: 'Sky White / Multi',
    colorHex: '#f8fafc',
    indicesStyle: 'minimal-markers',
    lume: 'None',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'enamel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-daneceo-up', storeName: 'daneCEO Studio', tier: 'premier', price: 75.00, productUrl: 'https://www.instagram.com/the_watch_virtuoso/', inStock: true }
    ]
  }
];

export const SEED_HANDS: Hands[] = [
  {
    id: 'hands-mercedes-nh',
    handComponents: {
      hour: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_grand_seiko_dauphine_hands_brushed_top_silver_hour.webp',
      minute: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_grand_seiko_dauphine_hands_brushed_top_silver_minute.webp',
      second: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_grand_seiko_dauphine_hands_brushed_top_silver_second.webp'
    },
    name: 'Grand Seiko Dauphine Hands - Brushed Top Silver',
    brand: 'Lucius Atelier',
    description: 'Razor-sharp diamond cut dauphine hands with mirror-polished beveled edges and satin brushed top ridge. Fits NH35/NH36/NH34.',
    category: 'hands',
    basePrice: 28,
    handsStyle: 'dauphine',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lume: 'BGW9',
    finish: 'silver',
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-gs-hands', storeName: 'Lucius Atelier', tier: 'premier', price: 28.00, productUrl: 'https://luciusatelier.com/products/grand-seiko-dauphine-hands-brushed-top-silver', inStock: true },
      { id: 'v-miuski-mercedes', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 11.50, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-dauphine-hands-nh35.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'hands-mercedes-gold',
    handComponents: {
      hour: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_dauphine_hands_polished_yellow_gold_hour.webp',
      minute: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_dauphine_hands_polished_yellow_gold_minute.webp',
      second: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_dauphine_hands_polished_yellow_gold_second.webp'
    },
    name: 'Dauphine Hands - Polished Yellow Gold',
    brand: 'Lucius Atelier',
    description: 'Polished 18k yellow gold-plated faceted hands. Adds vintage warmth to dress or two-tone builds.',
    category: 'hands',
    basePrice: 28,
    handsStyle: 'dauphine',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lume: 'None',
    finish: 'gold',
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-gold-dauphine', storeName: 'Lucius Atelier', tier: 'premier', price: 28.00, productUrl: 'https://luciusatelier.com/products/dauphine-hands-polished-yellow-gold', inStock: true },
      { id: 'v-miuski-gold-mercedes', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 12.00, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-gold-dauphine-hands.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'hands-snowflake-nh',
    handComponents: {
      hour: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_baton_hands_bgw9_polished_silver_hour.webp',
      minute: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_baton_hands_bgw9_polished_silver_minute.webp',
      second: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_baton_hands_bgw9_polished_silver_second.webp'
    },
    name: 'Baton Hands - BGW9 Polished Silver',
    brand: 'Lucius Atelier',
    description: 'Linear architectural baton hands with mirror-polished flanks and filled with bright Swiss BGW9 lume.',
    category: 'hands',
    basePrice: 28,
    handsStyle: 'baton',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lume: 'BGW9',
    finish: 'silver',
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-baton', storeName: 'Lucius Atelier', tier: 'premier', price: 28.00, productUrl: 'https://luciusatelier.com/products/baton-hands-bgw9-polished-silver', inStock: true },
      { id: 'v-caroline-snowflake', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 12.50, productUrl: 'https://www.aliexpress.us/w/wholesale-caroline-baton-hands-nh35.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'hands-gmt-nh34',
    handComponents: {
      hour: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_broad_arrow_hands_bgw9_polished_silver_hour.webp',
      minute: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_broad_arrow_hands_bgw9_polished_silver_minute.webp',
      second: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_broad_arrow_hands_bgw9_polished_silver_second.webp'
    },
    name: 'Broad Arrow 4-Hand Set (NH34 Caller GMT)',
    brand: 'Lucius Atelier',
    description: 'Heritage military broad arrow hand set engineered specifically with 2.20mm GMT arbor hole for Seiko NH34 calibers.',
    category: 'hands',
    basePrice: 28,
    handsStyle: 'sword',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21, gmt: 2.20 },
    lume: 'BGW9',
    finish: 'silver',
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-broad-arrow', storeName: 'Lucius Atelier', tier: 'premier', price: 28.00, productUrl: 'https://luciusatelier.com/products/broad-arrow-hands-bgw9-polished-silver', inStock: true },
      { id: 'v-miuski-nh34hands', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 13.50, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-nh34-gmt-hands.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'hands-milgauss-orange',
    handComponents: {
      hour: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_grand_seiko_dauphine_hands_brushed_top_silver_red_hour.webp',
      minute: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_grand_seiko_dauphine_hands_brushed_top_silver_red_minute.webp',
      second: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_grand_seiko_dauphine_hands_brushed_top_silver_red_second.webp'
    },
    name: 'Dauphine Hands - Brushed Top Silver & Red Accent',
    brand: 'Lucius Atelier',
    description: 'Faceted silver hands with crimson needle tip seconds hand.',
    category: 'hands',
    basePrice: 28,
    handsStyle: 'dauphine',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lume: 'BGW9',
    finish: 'silver',
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-gs-red', storeName: 'Lucius Atelier', tier: 'premier', price: 28.00, productUrl: 'https://luciusatelier.com/products/grand-seiko-dauphine-hands-brushed-top-silver-red', inStock: true },
      { id: 'v-miuski-lightning', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 11.50, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-lightning-bolt-hands-nh35.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'hands-sword-nh',
    handComponents: {
      hour: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_1908_sword_breguet_hands_polished_silver_hour.webp',
      minute: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_1908_sword_breguet_hands_polished_silver_minute.webp',
      second: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_1908_sword_breguet_hands_polished_silver_second.webp'
    },
    name: '1908 Sword Breguet Hands - Polished Silver',
    brand: 'Lucius Atelier',
    description: 'Classic high-horology sword hands featuring open circular Breguet eyelet on the hour hand.',
    category: 'hands',
    basePrice: 28,
    handsStyle: 'sword',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lume: 'None',
    finish: 'silver',
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-1908-hands', storeName: 'Lucius Atelier', tier: 'premier', price: 28.00, productUrl: 'https://luciusatelier.com/products/1908-sword-breguet-hands-polished-silver', inStock: true },
      { id: 'v-tandorio-sword', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 11.80, productUrl: 'https://www.aliexpress.us/w/wholesale-tandorio-sword-hands-nh35.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'hands-breguet-blue',
    handComponents: {
      hour: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_breguet_hands_polished_blue_hour.webp',
      minute: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_breguet_hands_polished_blue_minute.webp',
      second: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_breguet_hands_polished_blue_second.webp'
    },
    name: 'Breguet Hands - Thermal Blued Steel Finish',
    brand: 'Lucius Atelier',
    description: 'Iconic hollow-moon Breguet hands with deep iridescent cobalt blue temper finish.',
    category: 'hands',
    basePrice: 28,
    handsStyle: 'marine',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lume: 'None',
    finish: 'heat-blued',
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-breguet-blue', storeName: 'Lucius Atelier', tier: 'premier', price: 28.00, productUrl: 'https://luciusatelier.com/products/breguet-hands-polished-blue', inStock: true }
    ]
  },
  {
    id: 'hands-dauphine-black',
    handComponents: {
      hour: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_dauphine_hands_polished_black_hour.webp',
      minute: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_dauphine_hands_polished_black_minute.webp',
      second: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_dauphine_hands_polished_black_second.webp'
    },
    name: 'Dauphine Hands - Polished PVD Black',
    brand: 'Lucius Atelier',
    description: 'Gloss black DLC/PVD coated faceted dauphine hands for stealth or high-contrast monochromatic builds.',
    category: 'hands',
    basePrice: 28,
    handsStyle: 'dauphine',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lume: 'None',
    finish: 'black',
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-dauphine-black', storeName: 'Lucius Atelier', tier: 'premier', price: 28.00, productUrl: 'https://luciusatelier.com/products/dauphine-hands-polished-black', inStock: true }
    ]
  },
  {
    id: 'hands-baton-vh31',
    handComponents: {
      hour: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_baton_hands_bgw9_polished_silver_hour.webp',
      minute: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_baton_hands_bgw9_polished_silver_minute.webp',
      second: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_baton_hands_bgw9_polished_silver_second.webp'
    },
    name: 'Slim Baton Hand Set - Polished Silver (VH31 Quartz Hole Sizes)',
    brand: 'Tandorio Horology',
    description: 'Precision-broached hand set manufactured specifically to fit Seiko VH31 quartz arbors (1.20mm hour, 0.70mm minute, 0.17mm second).',
    category: 'hands',
    basePrice: 18,
    handsStyle: 'baton',
    handHoleSizes: { hour: 1.20, minute: 0.70, second: 0.17 },
    lume: 'BGW9',
    finish: 'silver',
    compatibleMovementFamilies: ['VH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-tandorio-vh31-hands', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 11.20, productUrl: 'https://www.aliexpress.us/w/wholesale-tandorio-vh31-hands.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'hands-eta-dauphine',
    handComponents: {
      hour: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_grand_seiko_dauphine_hands_brushed_top_silver_hour.webp',
      minute: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_grand_seiko_dauphine_hands_brushed_top_silver_minute.webp',
      second: 'https://assets.assemble.watch/parts/hands/lucius_atelier/lucius_atelier_grand_seiko_dauphine_hands_brushed_top_silver_second.webp'
    },
    name: 'Dauphine Hand Set - Rhodium (PT5000 / ETA 2824 Sizing)',
    brand: 'Esslinger Supplies',
    description: 'Precision Swiss-pattern dauphine hands sized with ETA 2824 / PT5000 collet specifications (1.50mm / 0.90mm / 0.25mm).',
    category: 'hands',
    basePrice: 22,
    handsStyle: 'dauphine',
    handHoleSizes: { hour: 1.50, minute: 0.90, second: 0.25 },
    lume: 'BGW9',
    finish: 'silver',
    compatibleMovementFamilies: ['ETA'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-esslinger-eta-hands', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 21.95, productUrl: 'https://www.esslinger.com/watch-hands-to-fit-eta-2824-2-hole-sizes-90-150-25mm/', inStock: true }
    ]
  }
];

export const SEED_SECONDS_ACCENTS: SecondsHandAccent[] = [
  {
    id: 'sec-nh-orange-lightning',
    name: 'Milgauss Orange Lightning Bolt Seconds Hand',
    brand: 'DLW Watches',
    description: 'Signature zigzag lightning bolt needle coated in vibrant safety orange lacquer. Directly replaces standard NH second hand.',
    category: 'seconds-accent',
    basePrice: 12,
    accentStyle: 'lightning',
    colorName: 'Safety Orange',
    colorHex: '#ea580c',
    holeSize: 0.21,
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-dlw-lightning', storeName: 'DLW Watches', tier: 'premier', price: 14.00, productUrl: 'https://www.dlwwatches.com/products/hands-lightning-seconds', inStock: true },
      { id: 'v-miuski-orange-lightning', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 4.50, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-lightning-seconds-hand.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'sec-nh-red-arrow',
    name: 'Red Arrow Needle Seconds Hand',
    brand: 'NamokiMODS',
    description: 'Gloss black counterbalance stem tapering to an eye-catching vivid red arrow point with lumed circle.',
    category: 'seconds-accent',
    basePrice: 10,
    accentStyle: 'red-arrow',
    colorName: 'Cherry Red',
    colorHex: '#dc2626',
    holeSize: 0.21,
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-red-arrow', storeName: 'NamokiMODS', tier: 'premier', price: 12.00, productUrl: 'https://www.namokimods.com/products/arrow-second-hand-red-finish', inStock: true },
      { id: 'v-miuski-red-arrow', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 3.80, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-red-seconds-hand-nh35.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'sec-nh-blue-lollipop',
    name: 'Ocean Blue Lollipop Seconds Hand',
    brand: 'Lucius Atelier',
    description: 'Polished rhodium needle featuring a luminous circular lollipop disc filled with Swiss BGW9 lume.',
    category: 'seconds-accent',
    basePrice: 12,
    accentStyle: 'blue-lollipop',
    colorName: 'Cyan Blue',
    colorHex: '#0284c7',
    holeSize: 0.21,
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-blue-lollipop', storeName: 'Lucius Atelier', tier: 'premier', price: 14.00, productUrl: 'https://luciusatelier.com/products/grand-seiko-dauphine-hands-brushed-top-silver-blue', inStock: true }
    ]
  },
  {
    id: 'sec-vh31-red-arrow',
    name: 'Red Needle Seconds Hand (VH31 0.17mm Hole)',
    brand: 'Tandorio Horology',
    description: 'Engineered specifically for the smaller 0.17mm pinion arbor on Seiko VH31 quartz calibers.',
    category: 'seconds-accent',
    basePrice: 8,
    accentStyle: 'red-arrow',
    colorName: 'Rally Red',
    colorHex: '#ef4444',
    holeSize: 0.17,
    compatibleMovementFamilies: ['VH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-tandorio-vh31-sec', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 4.20, productUrl: 'https://www.aliexpress.us/w/wholesale-tandorio-vh31-seconds-hand.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'sec-nh-yellow-bolt',
    name: 'Acid Yellow Flash Seconds Hand',
    brand: 'Caroline Mod Store',
    description: 'High-visibility neon yellow second hand for racing, dive timing, or sport chronograph vibes.',
    category: 'seconds-accent',
    basePrice: 9,
    accentStyle: 'lightning',
    colorName: 'Racing Yellow',
    colorHex: '#eab308',
    holeSize: 0.21,
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-caroline-yellow-sec', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 4.00, productUrl: 'https://www.aliexpress.us/w/wholesale-caroline-yellow-seconds-hand.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'sec-nh-trident',
    name: 'Trident Counterweight Seconds Hand',
    brand: 'DLW Watches',
    description: 'Poseidon trident silhouette counterweight with polished silver stem and crimson arrow pointer.',
    category: 'seconds-accent',
    basePrice: 13,
    accentStyle: 'trident',
    colorName: 'Silver & Crimson',
    colorHex: '#b91c1c',
    holeSize: 0.21,
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-dlw-trident', storeName: 'DLW Watches', tier: 'premier', price: 15.00, productUrl: 'https://www.dlwwatches.com/products/hands-trident', inStock: true }
    ]
  }
];

export const SEED_BEZEL_INSERTS: BezelInsert[] = [
  {
    id: 'insert-sub-black',
    imageUrl: 'https://assets.assemble.watch/parts/bezels/lucius_atelier/lucius_atelier_skx007_ceramic_bezel_insert_slope_yacht_master_black.webp',
    name: 'Ceramic Submariner 60-Minute Insert - Gloss Black',
    brand: 'NamokiMODS',
    description: 'Polished scratch-resistant ceramic with engraved and platinum-filled numerals. Lumed pip at 12:00.',
    category: 'bezel-insert',
    basePrice: 28,
    style: 'diver-60min',
    material: 'ceramic',
    color1: 'Gloss Black',
    color1Hex: '#09090b',
    outerMm: 38.0,
    innerMm: 30.6,
    isSloping: true,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-sub-insert', storeName: 'NamokiMODS', tier: 'premier', price: 34.99, productUrl: 'https://www.namokimods.com/products/ceramic-bezel-insert-sub-style-black', inStock: true },
      { id: 'v-miuski-insert-black', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 11.50, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-ceramic-bezel-insert-38mm.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'insert-yacht-matte',
    imageUrl: 'https://assets.assemble.watch/parts/bezels/lucius_atelier/lucius_atelier_skx007_ceramic_bezel_insert_slope_yacht_master_black.webp',
    name: 'Yacht-Master Matte Black Ceramic Insert (Raised Numerals)',
    brand: 'Lucius Atelier',
    description: 'Matte blasted ceramic backdrop with mirror-polished three-dimensional raised relief numerals.',
    category: 'bezel-insert',
    basePrice: 38,
    style: 'yacht',
    material: 'ceramic',
    color1: 'Matte Black',
    color1Hex: '#18181b',
    outerMm: 38.0,
    innerMm: 30.6,
    isSloping: true,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-yacht-insert', storeName: 'Lucius Atelier', tier: 'premier', price: 42.00, productUrl: 'https://luciusatelier.com/products/skx007-ceramic-bezel-insert-slope-yacht-master-black', inStock: true },
      { id: 'v-caroline-yacht-insert', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 14.50, productUrl: 'https://www.aliexpress.us/w/wholesale-caroline-yacht-master-bezel-insert.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'insert-gmt-batman',
    imageUrl: 'https://assets.assemble.watch/parts/bezels/lucius_atelier/lucius_atelier_skx013_aluminium_bezel_insert_slope_gmt_24h_batman_black_blue.webp',
    name: 'Batman GMT 24-Hour Insert (Black & Royal Blue)',
    brand: 'Lucius Atelier',
    description: 'Dual-color 24-hour day/night split insert designed specifically for caller GMT movements like NH34A.',
    category: 'bezel-insert',
    basePrice: 32,
    style: 'gmt-24hr',
    material: 'ceramic',
    color1: 'Pitch Black',
    color1Hex: '#09090b',
    color2: 'Royal Blue',
    color2Hex: '#1d4ed8',
    outerMm: 38.0,
    innerMm: 30.6,
    isSloping: true,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-batman-insert', storeName: 'Lucius Atelier', tier: 'premier', price: 38.00, productUrl: 'https://luciusatelier.com/products/skx013-aluminium-bezel-insert-slope-gmt-24h-batman-black-blue', inStock: true },
      { id: 'v-dlw-batman', storeName: 'DLW Watches', tier: 'premier', price: 36.00, productUrl: 'https://www.dlwwatches.com/products/ceramic-insert-007-gmt-batman', inStock: true },
      { id: 'v-tandorio-batman', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 12.00, productUrl: 'https://www.aliexpress.us/w/wholesale-tandorio-batman-gmt-insert.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'insert-pepsi-dual',
    imageUrl: 'https://assets.assemble.watch/parts/bezels/lucius_atelier/lucius_atelier_skx007_ceramic_bezel_insert_slope_pepsi_dual_time_swiss_made.webp',
    name: 'Pepsi Dual-Time 12-Hour Insert (Navy Blue & Ruby Red)',
    brand: 'Lucius Atelier',
    description: 'Swiss-made dual-time ceramic insert with 12-hour indices allowing dual time tracking with any standard 3-hand movement.',
    category: 'bezel-insert',
    basePrice: 34,
    style: 'dual-time-12hr',
    material: 'ceramic',
    color1: 'Navy Blue',
    color1Hex: '#1e3a8a',
    color2: 'Ruby Red',
    color2Hex: '#b91c1c',
    outerMm: 38.0,
    innerMm: 30.6,
    isSloping: true,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-pepsi', storeName: 'Lucius Atelier', tier: 'premier', price: 38.00, productUrl: 'https://luciusatelier.com/products/skx007-ceramic-bezel-insert-slope-pepsi-dual-time-swiss-made', inStock: true },
      { id: 'v-namoki-pepsi', storeName: 'NamokiMODS', tier: 'premier', price: 39.99, productUrl: 'https://www.namokimods.com/products/ceramic-bezel-insert-dual-time-pepsi', inStock: true },
      { id: 'v-miuski-pepsi', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 13.00, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-pepsi-bezel-insert.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'insert-skx-flat-black',
    imageUrl: 'https://assets.assemble.watch/parts/bezels/lucius_atelier/lucius_atelier_skx013_aluminium_bezel_insert_slope_gmt_24h_batman_black_blue.webp',
    name: 'SKX007 Factory Flat Diver Bezel Insert',
    brand: 'Caroline Mod Store',
    description: 'Flat profile aluminum bezel insert dimensioned to fit OEM Seiko SKX007 (38.0mm outer / 31.5mm inner).',
    category: 'bezel-insert',
    basePrice: 18,
    style: 'diver-60min',
    material: 'aluminum',
    color1: 'Satin Black',
    color1Hex: '#18181b',
    outerMm: 38.0,
    innerMm: 31.5,
    isSloping: false,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-caroline-skx-flat', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 9.50, productUrl: 'https://www.aliexpress.us/w/wholesale-caroline-skx007-bezel-insert.html', inStock: true, isSpecialDeal: true }
    ]
  }
];

export const SEED_ROTORS: Rotor[] = [
  {
    id: 'rotor-skeleton-rose',
    name: 'Skeletonized Wave Rotor - Rose Gold Plated (NH)',
    brand: 'DLW Watches',
    description: 'Precision laser-cut winding rotor with Geneva wave skeleton bridges, high-density tungsten rim weight, and lustrous 18k rose gold electroplating.',
    category: 'rotor',
    basePrice: 28,
    finish: 'rose-gold-skeleton',
    compatibleMovements: ['NH35', 'NH36', 'NH38', 'NH34'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-dlw-rose-rotor', storeName: 'DLW Watches', tier: 'premier', price: 32.00, productUrl: 'https://www.dlwwatches.com/products/rotor-skeleton-rose-gold', inStock: true },
      { id: 'v-miuski-rose-rotor', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 14.50, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-rose-gold-rotor-nh35.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'rotor-bronze-crest',
    name: 'Antique Bronze Heritage Crest Rotor (NH)',
    brand: 'NamokiMODS',
    description: 'Heavy architectural bronze rotor adorned with engraved Japanese Kanagawa waves. Optimized winding efficiency for automatic mainsprings.',
    category: 'rotor',
    basePrice: 32,
    finish: 'bronze-crest',
    compatibleMovements: ['NH35', 'NH36', 'NH38', 'NH34'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-bronze-rotor', storeName: 'NamokiMODS', tier: 'premier', price: 34.99, productUrl: 'https://www.namokimods.com/products/custom-rotor-great-wave-finish', inStock: true }
    ]
  },
  {
    id: 'rotor-black-tactical',
    name: 'Stealth Tactical Black PVD Rotor (NH)',
    brand: 'Caroline Mod Store',
    description: 'Matte black DLC coated rotor with open skeleton windows. Pairs seamlessly with exhibition caseback diver builds.',
    category: 'rotor',
    basePrice: 22,
    finish: 'black-tactical',
    compatibleMovements: ['NH35', 'NH36', 'NH38', 'NH34'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-caroline-black-rotor', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 12.00, productUrl: 'https://www.aliexpress.us/w/wholesale-caroline-black-rotor-nh35.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'rotor-cotes-de-geneve',
    name: 'Traditional Côtes de Genève Rhodium Rotor (NH)',
    brand: 'Lucius Atelier',
    description: 'Classic high-horology circular Geneva striped rotor plated in bright rhodium with polished chamfers.',
    category: 'rotor',
    basePrice: 30,
    finish: 'cotes-de-geneve',
    compatibleMovements: ['NH35', 'NH36', 'NH38', 'NH34'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-rhodium-rotor', storeName: 'Lucius Atelier', tier: 'premier', price: 36.00, productUrl: 'https://luciusatelier.com/products/custom-rotor-nh35-rhodium-finish', inStock: true }
    ]
  }
];

export const SEED_SPACERS: MovementSpacer[] = [
  {
    id: 'spacer-vh31-to-nh',
    name: 'Precision Delrin Spacer: VH31 Quartz to NH Case',
    brand: 'Custom Horology Lab',
    description: 'CNC-machined engineering Delrin adapter ring. Positions the 23.3mm VH31 quartz caliber securely into standard 28.5mm Seiko NH case cavities while matching stem height precisely.',
    category: 'spacer',
    basePrice: 12,
    fromMovementFamily: 'VH',
    toCaseFamily: 'NH',
    material: 'delrin',
    includesStemShim: true,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-modlab-spacer', storeName: 'Custom Horology Lab (Etsy)', tier: 'premier', price: 14.50, productUrl: 'https://www.etsy.com/search?q=seiko+vh31+to+nh35+movement+spacer+adapter', inStock: true },
      { id: 'v-tandorio-spacer', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 5.50, productUrl: 'https://www.aliexpress.us/w/wholesale-tandorio-vh31-movement-spacer.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'spacer-eta-to-nh',
    name: 'Brass Movement Adapter Ring: ETA 2824 / PT5000 to NH Case',
    brand: 'Esslinger Supplies',
    description: 'Turned solid brass spacer with securing movement clamps to house ETA 2824-2 and PT5000 movements in custom NH-compatible watch cases.',
    category: 'spacer',
    basePrice: 16,
    fromMovementFamily: 'Ronda',
    toCaseFamily: 'NH',
    material: 'machined-brass',
    includesStemShim: true,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-esslinger-spacer', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 16.95, productUrl: 'https://www.esslinger.com/movement-casing-cushion-and-spacer-rings-for-eta-2824/', inStock: true }
    ]
  }
];

export const SEED_STRAPS: Strap[] = [
  {
    id: 'strap-oyster-20',
    imageUrl: 'https://assets.assemble.watch/parts/bracelets/lucius_atelier/lucius_atelier_oyster_bracelet_20_18mm_mid_polished.webp',
    name: 'Solid 316L Stainless Steel Oyster Bracelet (20mm)',
    brand: 'Miuski Custom Works',
    description: 'Solid milled links with brushed outer flanks, polished sides, solid end-links, and double-lock micro-adjusting dive extension clasp.',
    category: 'strap',
    basePrice: 35,
    strapType: 'oyster-steel',
    lugWidthMm: 20,
    colorName: 'Brushed Steel',
    colorHex: '#cbd5e1',
    hardwareFinish: 'brushed-steel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-oyster', storeName: 'Lucius Atelier', tier: 'premier', price: 65.00, productUrl: 'https://luciusatelier.com/products/oyster-bracelet-20-18mm-mid-polished', inStock: true },
      { id: 'v-miuski-oyster', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 21.00, productUrl: 'https://www.aliexpress.us/w/wholesale-miuski-oyster-bracelet-20mm.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'strap-jubilee-20',
    imageUrl: 'https://assets.assemble.watch/parts/bracelets/lucius_atelier/lucius_atelier_jubilee_bracelet_20_16mm.webp',
    name: 'Solid 5-Link Jubilee Steel Bracelet (20mm)',
    brand: 'Caroline Mod Store',
    description: 'Fluid five-piece link architecture with high-polish center links and brushed outer flanks. Concealed milled crown clasp.',
    category: 'strap',
    basePrice: 38,
    strapType: 'jubilee-steel',
    lugWidthMm: 20,
    colorName: 'Brushed & Mirror Polished',
    colorHex: '#e2e8f0',
    hardwareFinish: 'brushed-steel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-jubilee', storeName: 'Lucius Atelier', tier: 'premier', price: 68.00, productUrl: 'https://luciusatelier.com/products/jubilee-bracelet-20-16mm', inStock: true },
      { id: 'v-caroline-jubilee', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 22.50, productUrl: 'https://www.aliexpress.us/w/wholesale-caroline-jubilee-bracelet-20mm.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'strap-leather-black-20',
    imageUrl: 'https://assets.assemble.watch/parts/straps/lucius_atelier/lucius_atelier_full_grain_cowhide_leather_strap_20_16mm_black_side_stitch.webp',
    name: 'Full Grain Cowhide Leather Strap - Black Side Stitch (20mm)',
    brand: 'Lucius Atelier',
    description: 'Handcrafted supple full-grain Italian cowhide leather strap with minimal cream side stitching and brushed 316L buckle.',
    category: 'strap',
    basePrice: 28,
    strapType: 'vintage-leather',
    lugWidthMm: 20,
    colorName: 'Black Leather',
    colorHex: '#18181b',
    hardwareFinish: 'brushed-steel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-black-leather', storeName: 'Lucius Atelier', tier: 'premier', price: 32.00, productUrl: 'https://luciusatelier.com/products/full-grain-cowhide-leather-strap-20-16mm-black-side-stitch', inStock: true },
      { id: 'v-tandorio-black-leather', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 12.00, productUrl: 'https://www.aliexpress.us/w/wholesale-tandorio-leather-watch-strap-20mm.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'strap-leather-brown-20',
    imageUrl: 'https://assets.assemble.watch/parts/straps/lucius_atelier/lucius_atelier_full_grain_cowhide_leather_strap_20_16mm_brown_side_stitch.webp',
    name: 'Full Grain Cowhide Leather Strap - Tobacco Brown (20mm)',
    brand: 'Lucius Atelier',
    description: 'Rich cognac/tobacco brown oiled pull-up leather that develops a distinctive patina with wear.',
    category: 'strap',
    basePrice: 28,
    strapType: 'vintage-leather',
    lugWidthMm: 20,
    colorName: 'Tobacco Brown',
    colorHex: '#78350f',
    hardwareFinish: 'brushed-steel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-brown-leather', storeName: 'Lucius Atelier', tier: 'premier', price: 32.00, productUrl: 'https://luciusatelier.com/products/full-grain-cowhide-leather-strap-20-16mm-brown-side-stitch', inStock: true },
      { id: 'v-tandorio-brown-leather', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 12.00, productUrl: 'https://www.aliexpress.us/w/wholesale-tandorio-brown-leather-strap-20mm.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'strap-jubilee-22',
    imageUrl: 'https://assets.assemble.watch/parts/bracelets/lucius_atelier/lucius_atelier_jubilee_bracelet_20_16mm.webp',
    name: 'Solid 316L Jubilee Bracelet for SKX007 (22mm Lug)',
    brand: 'Caroline Mod Store',
    description: 'Custom curved solid end-links engineered specifically for SKX007 cases with 22mm lug width.',
    category: 'strap',
    basePrice: 38,
    strapType: 'jubilee-steel',
    lugWidthMm: 22,
    colorName: 'Brushed & Polished Steel',
    colorHex: '#e2e8f0',
    hardwareFinish: 'brushed-steel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-caroline-jubilee-22', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 24.00, productUrl: 'https://www.aliexpress.us/w/wholesale-caroline-skx007-jubilee-bracelet-22mm.html', inStock: true, isSpecialDeal: true }
    ]
  }
];

export const SEED_TOOLS: WatchTool[] = [
  {
    id: 'tool-springbar',
    name: 'Bergeon 6767-F Swiss Spring Bar Tool',
    brand: 'Bergeon Swiss',
    description: 'The global standard watchmakers tool with fine pointed tip (0.8mm) and narrow fork (1.2mm) for damage-free strap and bracelet changes.',
    category: 'tools',
    basePrice: 24,
    toolType: 'caseback-wrench',
    isConsumable: false,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-esslinger-6767', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 24.50, productUrl: 'https://www.esslinger.com/bergeon-6767-f-swiss-watchmakers-spring-bar-tool/', inStock: true },
      { id: 'v-miuski-springbar', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 6.00, productUrl: 'https://www.aliexpress.us/w/wholesale-watchmaker-spring-bar-tool.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'tool-hand-press',
    name: 'Watch Hand Setting Press Tool (3-Piece Nylon Tipped)',
    brand: 'Horotec / Generic Pro',
    description: 'Precision set of three color-coded hand plungers with soft non-marring Delrin tips (sizes: 0.8mm, 1.0mm, 1.5mm) ensuring flat, parallel hand installation without scratching dial or hands.',
    category: 'tools',
    basePrice: 18,
    toolType: 'hand-press',
    isConsumable: false,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-esslinger-handpress', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 18.95, productUrl: 'https://www.esslinger.com/watch-hand-setting-tool-set-of-3/', inStock: true },
      { id: 'v-miuski-handpress', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 7.20, productUrl: 'https://www.aliexpress.us/w/wholesale-watch-hand-press-tool.html', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'tool-rodico',
    name: 'Bergeon 7010 Premium Rodico Cleaning Putty',
    brand: 'Bergeon Swiss',
    description: 'Indispensable horological cleaning compound. Lifts dust particles, excess lubrication, fingerprints, and holds small hands without leaving residue.',
    category: 'tools',
    basePrice: 8,
    toolType: 'rodico',
    isConsumable: true,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-esslinger-rodico', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 8.50, productUrl: 'https://www.esslinger.com/bergeon-7010-premium-rodico-cleaning-compound/', inStock: true }
    ]
  },
  {
    id: 'tool-movement-holder',
    name: 'Bergeon 4040 Reversible Movement Holder',
    brand: 'Bergeon Swiss',
    description: 'Hardened synthetic jaws with smooth screw adjustment clamp caliber securely while setting dials, pressing hands, and installing stems.',
    category: 'tools',
    basePrice: 22,
    toolType: 'movement-holder',
    isConsumable: false,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-esslinger-holder', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 23.95, productUrl: 'https://www.esslinger.com/bergeon-reversible-movement-holder-nh35/', inStock: true }
    ]
  },
  {
    id: 'tool-dial-protector',
    name: 'Dial Protector Film Sheets (10-Pack)',
    brand: 'NamokiMODS',
    description: 'Thin transparent plastic film with center notch slipped under watch hands to protect the dial finish from metal levers during hand removal.',
    category: 'tools',
    basePrice: 5,
    toolType: 'dial-dots',
    isConsumable: true,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-dialguard', storeName: 'NamokiMODS', tier: 'premier', price: 5.99, productUrl: 'https://www.namokimods.com/products/dial-protector-sheets-pack-of-10', inStock: true },
      { id: 'v-esslinger-dialguard', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 4.95, productUrl: 'https://www.esslinger.com/watch-dial-protector-sheets-pack-of-10/', inStock: true }
    ]
  },
  {
    id: 'tool-tweezers',
    name: 'Bergeon #3 Non-Magnetic Precision Tweezers',
    brand: 'Bergeon Swiss',
    description: 'Swiss stainless steel antimagnetic tweezers with micro-fine tips for delicate second hands, screws, and dial feet.',
    category: 'tools',
    basePrice: 19,
    toolType: 'tweezers',
    isConsumable: false,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-esslinger-tweezers', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 19.95, productUrl: 'https://www.esslinger.com/anti-magnetic-stainless-steel-precision-tweezers-3c/', inStock: true }
    ]
  }
];
