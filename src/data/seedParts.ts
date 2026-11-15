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
      { id: 'v-miuski-nh35', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 31.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-namoki-nh35', storeName: 'NamokiMODS', tier: 'premier', price: 64.99, productUrl: 'https://namokimods.com', inStock: true, shippingDaysEstimate: '3-5 days', notes: 'Pre-regulated to +/- 5 sec/day' },
      { id: 'v-esslinger-nh35', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 47.95, productUrl: 'https://esslinger.com', inStock: true, shippingDaysEstimate: '2-4 days' }
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
      { id: 'v-miuski-nh36', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 34.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-namoki-nh36', storeName: 'NamokiMODS', tier: 'premier', price: 69.99, productUrl: 'https://namokimods.com', inStock: true, shippingDaysEstimate: '3-5 days' }
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
      { id: 'v-tandorio-nh38', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 34.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-dlw-nh38', storeName: 'DLW Watches', tier: 'premier', price: 58.00, productUrl: 'https://dlwwatches.com', inStock: true, shippingDaysEstimate: '4-7 days' }
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
      { id: 'v-miuski-nh34', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 39.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-lucius-nh34', storeName: 'Lucius Atelier', tier: 'premier', price: 74.90, productUrl: 'https://luciusatelier.com', inStock: true, shippingDaysEstimate: '3-6 days', notes: 'Individually regulated' }
    ]
  },
  {
    id: 'mov-vh31',
    name: 'Seiko (TMI) VH31 Sweeping Quartz',
    brand: 'Seiko Instruments / TMI',
    description: 'The holy grail of grab-and-go watchmaking. A high-torque quartz movement that sweeps smoothly at 4 beats per second (14,400 bph), mimicking a mechanical movement without the daily winding or accuracy drift.',
    category: 'movement',
    caliber: 'VH31',
    movementType: 'quartz-sweeping',
    family: 'VH',
    basePrice: 12,
    beatsPerHour: 14400,
    beatsPerSecond: 4,
    diameterMm: 23.7,
    thicknessMm: 3.45,
    hasDate: false,
    hasDay: false,
    hasGmt: false,
    batteryModel: 'SR920SW / 371',
    batteryLifeYears: 2,
    handHoleSizes: { hour: 1.20, minute: 0.70, second: 0.17 },
    lastScannedAt: '2026-11-14T18:00:00Z',
    historicalLowestPrice: 8.50,
    vendors: [
      { id: 'v-tandorio-vh31', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 8.90, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-esslinger-vh31', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 14.50, productUrl: 'https://esslinger.com', inStock: true, shippingDaysEstimate: '2-4 days', notes: 'Includes factory warranty' }
    ]
  },
  {
    id: 'mov-ronda515',
    name: 'Ronda Powertech 515 Quartz',
    brand: 'Ronda AG (Swiss Parts)',
    description: 'Workhorse Swiss quartz movement with date window. High-efficiency stepping motor provides traditional 1-tick-per-second action and a remarkable 45-month battery lifespan.',
    category: 'movement',
    caliber: 'Ronda 515',
    movementType: 'quartz-standard',
    family: 'Ronda',
    basePrice: 18,
    beatsPerHour: 3600,
    beatsPerSecond: 1,
    diameterMm: 26.0,
    thicknessMm: 3.00,
    hasDate: true,
    hasDay: false,
    hasGmt: false,
    batteryModel: 'Renata 371',
    batteryLifeYears: 3.75,
    handHoleSizes: { hour: 1.20, minute: 0.70, second: 0.20 },
    lastScannedAt: '2026-11-14T18:00:00Z',
    historicalLowestPrice: 15.00,
    vendors: [
      { id: 'v-esslinger-ronda515', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 16.95, productUrl: 'https://esslinger.com', inStock: true, shippingDaysEstimate: '2-4 days' }
    ]
  },
  {
    id: 'mov-pt5000',
    name: 'HK Precision PT5000 High-Beat Automatic',
    brand: 'HK Precision Technology',
    description: 'High-grade 28,800 bph (4Hz / 8 beats/s) Swiss ETA 2824-2 clone caliber. Features buttery smooth second hand sweep, Incabloc shock protection, and Chronometer-grade capability.',
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
    historicalLowestPrice: 52.00,
    vendors: [
      { id: 'v-miuski-pt5000', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 54.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-esslinger-pt5000', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 79.95, productUrl: 'https://esslinger.com', inStock: true, shippingDaysEstimate: '2-4 days' }
    ]
  }
];

export const SEED_CASES: Case[] = [
  {
    id: 'case-sub-40',
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
      { id: 'v-miuski-subcase', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 34.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-namoki-nmk901', storeName: 'NamokiMODS (NMK901 Sub)', tier: 'premier', price: 89.99, productUrl: 'https://namokimods.com', inStock: true, shippingDaysEstimate: '3-5 days', notes: 'Includes double O-ring Viton gaskets' }
    ]
  },
  {
    id: 'case-sub-black-40',
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
      { id: 'v-caroline-pvd-case', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 38.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-dlw-sub-pvd', storeName: 'DLW Watches', tier: 'premier', price: 92.00, productUrl: 'https://dlwwatches.com', inStock: true, shippingDaysEstimate: '3-5 days' }
    ]
  },
  {
    id: 'case-skx-42',
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
      { id: 'v-namoki-skx007', storeName: 'NamokiMODS', tier: 'premier', price: 79.99, productUrl: 'https://namokimods.com', inStock: true, shippingDaysEstimate: '3-5 days' },
      { id: 'v-tandorio-skx', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 38.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' }
    ]
  },
  {
    id: 'case-gmt-39',
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
      { id: 'v-lucius-gmt39', storeName: 'Lucius Atelier', tier: 'premier', price: 98.00, productUrl: 'https://luciusatelier.com', inStock: true, shippingDaysEstimate: '3-5 days' },
      { id: 'v-miuski-gmt39', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 42.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' }
    ]
  },
  {
    id: 'case-exp-36',
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
      { id: 'v-lucius-exp36', storeName: 'Lucius Atelier', tier: 'premier', price: 92.00, productUrl: 'https://luciusatelier.com', inStock: true, shippingDaysEstimate: '3-5 days' },
      { id: 'v-miuski-exp36', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 36.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' }
    ]
  },
  {
    id: 'case-field-38',
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
      { id: 'v-tandorio-field', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 29.80, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' }
    ]
  },
  {
    id: 'case-datejust-36',
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
      { id: 'v-miuski-dj36', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 37.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' }
    ]
  },
  {
    id: 'case-flieger-40',
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
      { id: 'v-tandorio-flieger', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 32.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' }
    ]
  }
];

export const SEED_DIALS: Dial[] = [
  {
    id: 'dial-marine-master',
    name: 'Marine Master Diver Dial - Matte Black',
    brand: 'NamokiMODS',
    description: 'Classic professional dive dial. High-contrast white geometric indices filled with ultra-bright Swiss Super-LumiNova BGW9 (ice blue night glow). Crisp date window at 3:00.',
    category: 'dial',
    basePrice: 38,
    diameterMm: 28.5,
    dialStyle: 'diver',
    colorName: 'Matte Black',
    colorHex: '#18181b',
    indicesStyle: 'dots-and-batons',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'matte',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-mm-dial', storeName: 'NamokiMODS', tier: 'premier', price: 42.00, productUrl: 'https://namokimods.com', inStock: true },
      { id: 'v-ds-dial-mm', storeName: 'DS-Watch Mod Store (AliExpress)', tier: 'vetted-direct', price: 18.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'dial-diver-blue',
    name: 'Ocean Master Diver Dial - Sunburst Royal Blue',
    brand: 'DLW Watches',
    description: 'Captivating deep sunburst cobalt blue dial. Applied chrome index borders with brilliant BGW9 blue night illumination and date aperture at 3:00.',
    category: 'dial',
    basePrice: 39,
    diameterMm: 28.5,
    dialStyle: 'diver',
    colorName: 'Sunburst Royal Blue',
    colorHex: '#1e3a8a',
    indicesStyle: 'dots-and-batons',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'sunburst',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-dlw-blue-dial', storeName: 'DLW Watches', tier: 'premier', price: 44.00, productUrl: 'https://dlwwatches.com', inStock: true },
      { id: 'v-miuski-blue-dial', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 19.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'dial-diver-green',
    name: 'Emerald Diver Dial - Sunburst Malachite Green',
    brand: 'Caroline Mod Store',
    description: 'Rich emerald green sunburst finish inspired by legendary luxury dive watches. Crisp 3:00 date window and applied polished indices.',
    category: 'dial',
    basePrice: 32,
    diameterMm: 28.5,
    dialStyle: 'diver',
    colorName: 'Emerald Green',
    colorHex: '#064e3b',
    indicesStyle: 'dots-and-batons',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'sunburst',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-caroline-green-dial', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 21.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'dial-explorer-navy',
    name: 'Explorer 3-6-9 Dial - Sunburst Navy',
    brand: 'Lucius Atelier',
    description: 'Iconic mountaineering aesthetic. Deep navy blue sunburst surface with applied mirror-polished 3-6-9 numerals and baton indices. Pure sterile time-only design with no date cut-out.',
    category: 'dial',
    basePrice: 48,
    diameterMm: 28.5,
    dialStyle: 'explorer',
    colorName: 'Sunburst Navy',
    colorHex: '#0c2238',
    indicesStyle: 'explorer-369',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'sunburst',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-exp-dial', storeName: 'Lucius Atelier', tier: 'premier', price: 54.00, productUrl: 'https://luciusatelier.com', inStock: true },
      { id: 'v-miuski-exp-dial', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 21.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'dial-explorer-black',
    name: 'Explorer 3-6-9 Dial - Matte Tactical Black',
    brand: 'Tandorio Horology',
    description: 'Understated matte black tool watch dial with crisp applied Arabic 3-6-9 numerals and lumed indices. Clean sterile no-date dial.',
    category: 'dial',
    basePrice: 28,
    diameterMm: 28.5,
    dialStyle: 'explorer',
    colorName: 'Matte Black',
    colorHex: '#171717',
    indicesStyle: 'explorer-369',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'matte',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-tandorio-exp-black', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 17.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'dial-field-military',
    name: 'Khaki Military Field Dial - Matte Black 24H',
    brand: 'Tandorio Horology',
    description: 'Functional 12-hour and inner 24-hour military scale. Printed in authentic vintage cream patina with matching C3 glow. Fitted with date window at 3:00.',
    category: 'dial',
    basePrice: 28,
    diameterMm: 28.5,
    dialStyle: 'field',
    colorName: 'Tactical Black',
    colorHex: '#121316',
    indicesStyle: 'field-arabic',
    lume: 'Vintage',
    dialFeetPositions: ['3.0'],
    dateWindow: '3.0',
    texture: 'matte',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-tandorio-field-dial', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 16.90, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'dial-field-olive',
    name: 'Tactical Field Dial - Matte Olive Drab',
    brand: 'Tokeilab',
    description: 'Military spec olive drab dial with crisp stencil numerals. Sterile no-date configuration specifically engineered for time-only field builds like the NH38 or VH31.',
    category: 'dial',
    basePrice: 34,
    diameterMm: 28.5,
    dialStyle: 'field',
    colorName: 'Olive Drab',
    colorHex: '#283618',
    indicesStyle: 'field-arabic',
    lume: 'C3',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'matte',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-tokeilab-field-olive', storeName: 'Tokeilab', tier: 'premier', price: 36.00, productUrl: 'https://tokeilab.com', inStock: true }
    ]
  },
  {
    id: 'dial-tiffany-sunburst',
    name: 'Artisan Turquoise "Tiffany" Dial',
    brand: 'Caroline Mod Store',
    description: 'Striking pastel turquoise sunburst dial that catches the light brilliantly. Time-only design with polished applied indices and BGW9 lume.',
    category: 'dial',
    basePrice: 32,
    diameterMm: 28.5,
    dialStyle: 'minimalist',
    colorName: 'Tiffany Turquoise',
    colorHex: '#0abab5',
    indicesStyle: 'minimal-markers',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'sunburst',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-caroline-tiffany', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 22.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'dial-birch-white',
    name: 'Grand Snowflake Textured Dial - Arctic White',
    brand: 'Lucius Atelier',
    description: 'Exquisite 3D vertical bark texture reminiscent of snow-covered birch trees. Mirror-finished beveled indices and crisp 3:00 date aperture.',
    category: 'dial',
    basePrice: 52,
    diameterMm: 28.5,
    dialStyle: 'dress',
    colorName: 'Arctic White',
    colorHex: '#f8fafc',
    indicesStyle: 'dots-and-batons',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'waffle',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-birch', storeName: 'Lucius Atelier', tier: 'premier', price: 62.00, productUrl: 'https://luciusatelier.com', inStock: true }
    ]
  },
  {
    id: 'dial-meteorite-raw',
    name: 'Muonionalusta Real Meteorite Slice Dial',
    brand: 'Lucius Atelier',
    description: 'Genuine Swedish meteorite slice exhibiting distinctive natural Widmanstätten crystalline cross-hatch structures. Sterile time-only aesthetic with polished indices.',
    category: 'dial',
    basePrice: 85,
    diameterMm: 28.5,
    dialStyle: 'dress',
    colorName: 'Natural Metallic Silver',
    colorHex: '#94a3b8',
    indicesStyle: 'minimal-markers',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: 'none',
    texture: 'meteorite',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-meteorite', storeName: 'Lucius Atelier', tier: 'premier', price: 95.00, productUrl: 'https://luciusatelier.com', inStock: true }
    ]
  },
  {
    id: 'dial-linen-silver',
    name: 'Vintage Linen Textured Dial - Champagne Silver',
    brand: 'NamokiMODS',
    description: 'Delicate criss-cross woven fabric linen pattern inspired by mid-century luxury dress watches. Polished faceted indices and framed 3:00 date aperture.',
    category: 'dial',
    basePrice: 44,
    diameterMm: 28.5,
    dialStyle: 'dress',
    colorName: 'Champagne Silver',
    colorHex: '#e2e8f0',
    indicesStyle: 'minimal-markers',
    lume: 'BGW9',
    dialFeetPositions: ['3.0', '3.8'],
    dateWindow: '3.0',
    texture: 'linen',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-linen', storeName: 'NamokiMODS', tier: 'premier', price: 48.00, productUrl: 'https://namokimods.com', inStock: true }
    ]
  },
  {
    id: 'dial-flieger-a',
    name: 'Luftwaffe Baumuster Type-A Pilot Dial',
    brand: 'Tandorio Horology',
    description: 'Authentic 1940s aviator observation dial with prominent 12:00 triangle and dots marker. Highly legible sterile layout.',
    category: 'dial',
    basePrice: 29,
    diameterMm: 28.5,
    dialStyle: 'flieger',
    colorName: 'Matte Pilot Black',
    colorHex: '#0f172a',
    indicesStyle: 'field-arabic',
    lume: 'C3',
    dialFeetPositions: ['3.0'],
    dateWindow: 'none',
    texture: 'matte',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-tandorio-flieger-dial', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 18.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  }
];

export const SEED_HANDS: Hands[] = [
  {
    id: 'hands-mercedes-nh',
    name: 'Classic Mercedes Hand Set - Polished Silver (NH Automatic)',
    brand: 'NamokiMODS',
    description: 'Iconic Submariner style hands with circular hour hand tri-spoke. Manufactured to exact Seiko NH tolerances (1.50/0.89/0.21mm). Swiss BGW9 lume.',
    category: 'hands',
    basePrice: 24,
    handsStyle: 'mercedes',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lume: 'BGW9',
    finish: 'silver',
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-mercedes', storeName: 'NamokiMODS', tier: 'premier', price: 28.00, productUrl: 'https://namokimods.com', inStock: true },
      { id: 'v-miuski-mercedes', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 11.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'hands-mercedes-gold',
    name: 'Vintage Gilt Mercedes Hand Set - Yellow Gold (NH Automatic)',
    brand: 'DLW Watches',
    description: 'Polished yellow gold plated Mercedes hands filled with vintage cream patina lume. Adds warmth to vintage two-tone or gilt builds.',
    category: 'hands',
    basePrice: 26,
    handsStyle: 'mercedes',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lume: 'Vintage',
    finish: 'gold',
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-dlw-gilt-mercedes', storeName: 'DLW Watches', tier: 'premier', price: 29.00, productUrl: 'https://dlwwatches.com', inStock: true },
      { id: 'v-miuski-gilt-mercedes', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 12.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'hands-snowflake-nh',
    name: 'Snowflake Hand Set - Polished Silver (NH Automatic)',
    brand: 'DLW Watches',
    description: 'Legendary angular block hands inspired by vintage Tudor dive watches. Diamond-faceted polished edges with thick BGW9 luminescence.',
    category: 'hands',
    basePrice: 26,
    handsStyle: 'snowflake',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lume: 'BGW9',
    finish: 'silver',
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-dlw-snowflake', storeName: 'DLW Watches', tier: 'premier', price: 29.50, productUrl: 'https://dlwwatches.com', inStock: true },
      { id: 'v-tandorio-snowflake', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 12.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'hands-milsub-sword-nh',
    name: 'MilSub Sword Hands - British Navy Spec (NH Automatic)',
    brand: 'Tokeilab',
    description: 'Wide sword-blade hands modeled after British Royal Navy issue dive watches. Maximizes luminous surface area with vibrant C3 green glow.',
    category: 'hands',
    basePrice: 25,
    handsStyle: 'sword',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lume: 'C3',
    finish: 'silver',
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-tokeilab-sword', storeName: 'Tokeilab', tier: 'premier', price: 26.00, productUrl: 'https://tokeilab.com', inStock: true }
    ]
  },
  {
    id: 'hands-dauphine-nh',
    name: 'Grand Dauphine Dress Hands - Faceted Silver (NH Automatic)',
    brand: 'Lucius Atelier',
    description: 'Razor-sharp beveled dauphine hands that catch reflections from any angle. Perfect for Grand Seiko or Datejust style dress builds.',
    category: 'hands',
    basePrice: 28,
    handsStyle: 'dauphine',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lume: 'None',
    finish: 'silver',
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-dauphine', storeName: 'Lucius Atelier', tier: 'premier', price: 32.00, productUrl: 'https://luciusatelier.com', inStock: true }
    ]
  },
  {
    id: 'hands-gmt-nh34',
    name: '4-Piece GMT Hand Set with Red 24H Arrow (NH34)',
    brand: 'NamokiMODS',
    description: 'Complete 4-piece set including a bright red 24-hour GMT arrow hand (2.20mm hole) engineered specifically for the Seiko NH34 movement.',
    category: 'hands',
    basePrice: 32,
    handsStyle: 'mercedes',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21, gmt: 2.20 },
    lume: 'BGW9',
    finish: 'silver',
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-gmt-hands', storeName: 'NamokiMODS', tier: 'premier', price: 34.00, productUrl: 'https://namokimods.com', inStock: true },
      { id: 'v-miuski-gmt-hands', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 14.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'hands-gmt-snowflake',
    name: '4-Piece Snowflake GMT Set with Orange 24H Arrow (NH34)',
    brand: 'DLW Watches',
    description: 'Snowflake hour & minute hands paired with a vibrant signal orange GMT pointer hand for high-legibility dual-time zone travel builds.',
    category: 'hands',
    basePrice: 34,
    handsStyle: 'snowflake',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21, gmt: 2.20 },
    lume: 'BGW9',
    finish: 'silver',
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-dlw-snowflake-gmt', storeName: 'DLW Watches', tier: 'premier', price: 36.50, productUrl: 'https://dlwwatches.com', inStock: true },
      { id: 'v-caroline-snowflake-gmt', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 15.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'hands-baton-vh31',
    name: 'Slim Baton Hand Set (VH31 Sweeping Quartz / Ronda)',
    brand: 'Tandorio Horology',
    description: 'Precision-broached hand set sized exclusively for quartz calibers (1.20mm hour, 0.70mm minute, 0.17mm second pinion). Balanced counterweights prevent quartz gear train drag.',
    category: 'hands',
    basePrice: 16,
    handsStyle: 'baton',
    handHoleSizes: { hour: 1.20, minute: 0.70, second: 0.17 },
    lume: 'BGW9',
    finish: 'silver',
    compatibleMovementFamilies: ['VH', 'Ronda'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-tandorio-vh31-hands', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 11.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true },
      { id: 'v-esslinger-quartz-hands', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 18.50, productUrl: 'https://esslinger.com', inStock: true }
    ]
  },
  {
    id: 'hands-sword-vh31',
    name: 'MilSub Sword Hand Set (VH31 Sweeping Quartz / Ronda)',
    brand: 'Caroline Mod Store',
    description: 'Military sword design engineered with 1.20/0.70/0.17mm quartz arbors. Allows building a lightweight, zero-maintenance quartz field or dive watch.',
    category: 'hands',
    basePrice: 17,
    handsStyle: 'sword',
    handHoleSizes: { hour: 1.20, minute: 0.70, second: 0.17 },
    lume: 'C3',
    finish: 'silver',
    compatibleMovementFamilies: ['VH', 'Ronda'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-caroline-vh31-sword', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 12.80, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'hands-flieger-vh31',
    name: 'Heat-Blued Aviator Pilot Hands (VH31 / Ronda Quartz)',
    brand: 'Tandorio Horology',
    description: 'Classic diamond pilot hands with traditional thermal heat-blued steel finish and vintage cream lume. Precision 1.20/0.70/0.17mm quartz arbors.',
    category: 'hands',
    basePrice: 19,
    handsStyle: 'flieger',
    handHoleSizes: { hour: 1.20, minute: 0.70, second: 0.17 },
    lume: 'Vintage',
    finish: 'heat-blued',
    compatibleMovementFamilies: ['VH', 'Ronda'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-tandorio-flieger-quartz', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 13.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  }
];

export const SEED_BEZEL_INSERTS: BezelInsert[] = [
  {
    id: 'insert-sub-black',
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
      { id: 'v-namoki-ins-blk', storeName: 'NamokiMODS', tier: 'premier', price: 34.00, productUrl: 'https://namokimods.com', inStock: true },
      { id: 'v-miuski-ins-blk', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 14.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'insert-sub-green',
    name: 'Ceramic "Kermit" 60-Minute Insert - Forest Green',
    brand: 'DLW Watches',
    description: 'Vibrant emerald forest green ceramic dive insert. Deep engraved numbers with white fill.',
    category: 'bezel-insert',
    basePrice: 30,
    style: 'diver-60min',
    material: 'ceramic',
    color1: 'Forest Green',
    color1Hex: '#065f46',
    outerMm: 38.0,
    innerMm: 30.6,
    isSloping: true,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-dlw-kermit', storeName: 'DLW Watches', tier: 'premier', price: 36.00, productUrl: 'https://dlwwatches.com', inStock: true },
      { id: 'v-caroline-kermit', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 15.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'insert-gmt-batman',
    name: 'Ceramic Dual-Color "Batman" 24-Hour GMT Insert',
    brand: 'NamokiMODS',
    description: 'Seamless two-tone blue (day) and black (night) high-tech ceramic bezel insert engineered for NH34 24H traveler builds.',
    category: 'bezel-insert',
    basePrice: 38,
    style: 'gmt-24hr',
    material: 'ceramic',
    color1: 'Night Black',
    color1Hex: '#09090b',
    color2: 'Ocean Blue',
    color2Hex: '#1d4ed8',
    outerMm: 38.0,
    innerMm: 30.6,
    isSloping: true,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-batman', storeName: 'NamokiMODS', tier: 'premier', price: 42.00, productUrl: 'https://namokimods.com', inStock: true },
      { id: 'v-miuski-batman', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 16.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'insert-gmt-pepsi',
    name: 'Ceramic Dual-Color "Pepsi" 24-Hour GMT Insert',
    brand: 'DLW Watches',
    description: 'Legendary red and blue ceramic 24H GMT insert. Laser-engraved and silver-powdered markers.',
    category: 'bezel-insert',
    basePrice: 38,
    style: 'gmt-24hr',
    material: 'ceramic',
    color1: 'Crimson Red',
    color1Hex: '#991b1b',
    color2: 'Navy Blue',
    color2Hex: '#1e3a8a',
    outerMm: 38.0,
    innerMm: 30.6,
    isSloping: true,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-dlw-pepsi', storeName: 'DLW Watches', tier: 'premier', price: 42.00, productUrl: 'https://dlwwatches.com', inStock: true },
      { id: 'v-tandorio-pepsi', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 16.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'insert-dual-12h',
    name: 'Stealth Ceramic 12-Hour Dual Time Zone Insert',
    brand: 'Lucius Atelier',
    description: 'Discreet 12-hour numeral markings allowing second time zone tracking without needing a GMT movement. Matte black ceramic.',
    category: 'bezel-insert',
    basePrice: 34,
    style: 'dual-time-12hr',
    material: 'ceramic',
    color1: 'Stealth Black',
    color1Hex: '#18181b',
    outerMm: 38.0,
    innerMm: 30.6,
    isSloping: true,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-12h', storeName: 'Lucius Atelier', tier: 'premier', price: 38.00, productUrl: 'https://luciusatelier.com', inStock: true }
    ]
  }
];

export const SEED_ROTORS: Rotor[] = [
  {
    id: 'rotor-tokyo-waves',
    name: 'Kanagawa Great Wave Laser-Engraved Rotor',
    brand: 'Lucius Atelier',
    description: 'Intricately etched Hokusai Great Wave motif in solid brass with heavy rhodium plating. Mesmerizing motion through an exhibition caseback.',
    category: 'rotor',
    basePrice: 38,
    finish: 'tokyo-wave',
    compatibleMovements: ['NH35', 'NH36', 'NH34', 'NH38'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-wave-rotor', storeName: 'Lucius Atelier', tier: 'premier', price: 44.00, productUrl: 'https://luciusatelier.com', inStock: true },
      { id: 'v-ds-wave-rotor', storeName: 'DS-Watch Mod Store (AliExpress)', tier: 'vetted-direct', price: 18.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'rotor-gold-skeleton',
    name: '24K Yellow Gold Plated Skeletonized Rotor',
    brand: 'NamokiMODS',
    description: 'Lightweight geometric cutouts with mirror-beveled edges and gleaming 24K gold electroplating. Increases winding responsiveness.',
    category: 'rotor',
    basePrice: 36,
    finish: 'rose-gold-skeleton',
    compatibleMovements: ['NH35', 'NH36', 'NH34', 'NH38'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-gold-rotor', storeName: 'NamokiMODS', tier: 'premier', price: 39.99, productUrl: 'https://namokimods.com', inStock: true }
    ]
  },
  {
    id: 'rotor-geneva-rhodium',
    name: 'Côtes de Genève Rhodium Striped Rotor',
    brand: 'Tokeilab',
    description: 'Swiss horology inspired circular Geneva waves across a rhodium finished oscillating weight with engraved caliber markings.',
    category: 'rotor',
    basePrice: 32,
    finish: 'cotes-de-geneve',
    compatibleMovements: ['NH35', 'NH36', 'NH34', 'NH38'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-tokeilab-geneva', storeName: 'Tokeilab', tier: 'premier', price: 34.00, productUrl: 'https://tokeilab.com', inStock: true }
    ]
  }
];

export const SEED_SPACERS: MovementSpacer[] = [
  {
    id: 'spacer-vh31-to-nh',
    name: 'VH31 to NH Casing Adapter Ring (3D Delrin)',
    brand: 'DialForge Engineering',
    description: 'Custom CNC-machined Delrin / PETG adapter ring that precisely seats the 23.7mm Seiko VH31 quartz movement into standard 28.5mm NH case cavities. Includes dial dot recesses.',
    category: 'spacer',
    basePrice: 9.50,
    fromMovementFamily: 'VH',
    toCaseFamily: 'NH',
    material: 'delrin',
    includesStemShim: true,
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-dialforge-spacer', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 6.80, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true },
      { id: 'v-namoki-vh31-ring', storeName: 'NamokiMODS Custom Labs', tier: 'premier', price: 14.00, productUrl: 'https://namokimods.com', inStock: true }
    ]
  }
];

export const SEED_STRAPS: Strap[] = [
  {
    id: 'strap-oyster-20',
    name: 'Solid 316L Stainless Steel Oyster Bracelet (20mm)',
    brand: 'Miuski Custom Works',
    description: 'Solid milled links with brushed outer flanks, polished sides, solid end-links, and double-lock micro-adjusting dive extension clasp.',
    category: 'strap',
    basePrice: 35,
    strapType: 'oyster-steel',
    lugWidthMm: 20,
    colorName: 'Brushed Steel',
    colorHex: '#94a3b8',
    hardwareFinish: 'brushed-steel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-miuski-oyster-20', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 24.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-namoki-oyster-20', storeName: 'NamokiMODS', tier: 'premier', price: 62.00, productUrl: 'https://namokimods.com', inStock: true, shippingDaysEstimate: '3-5 days' }
    ]
  },
  {
    id: 'strap-jubilee-22',
    name: 'Five-Link Jubilee Solid Bracelet (22mm for SKX)',
    brand: 'NamokiMODS',
    description: 'Iconic five-link construction with high-polish center links and brushed outer links. Conforms comfortably to the wrist with solid curved end links.',
    category: 'strap',
    basePrice: 48,
    strapType: 'jubilee-steel',
    lugWidthMm: 22,
    colorName: 'Brushed & Polished Steel',
    colorHex: '#cbd5e1',
    hardwareFinish: 'brushed-steel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-jubilee-22', storeName: 'NamokiMODS', tier: 'premier', price: 68.00, productUrl: 'https://namokimods.com', inStock: true, shippingDaysEstimate: '3-5 days' },
      { id: 'v-tandorio-jubilee-22', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 26.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'strap-fkm-black-20',
    name: 'FKM High-Grade Fluorine Rubber Waffle Strap (20mm)',
    brand: 'Tokeilab',
    description: 'Ultra-durable, lint-resistant FKM rubber with vintage Japanese waffle grid texture. Highly supple, waterproof, and heat resistant.',
    category: 'strap',
    basePrice: 24,
    strapType: 'fkm-rubber',
    lugWidthMm: 20,
    colorName: 'Obsidian Black',
    colorHex: '#09090b',
    hardwareFinish: 'brushed-steel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-tokeilab-fkm', storeName: 'Tokeilab', tier: 'premier', price: 28.00, productUrl: 'https://tokeilab.com', inStock: true },
      { id: 'v-caroline-fkm', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 14.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'strap-leather-brown-20',
    name: 'Horween Chromexcel Vintage Leather Strap (20mm)',
    brand: 'Lucius Atelier',
    description: 'Hand-stitched full-grain pull-up leather that develops rich vintage character with wear. Tapered 20mm to 18mm with polished 316L buckle.',
    category: 'strap',
    basePrice: 38,
    strapType: 'vintage-leather',
    lugWidthMm: 20,
    colorName: 'Cognac Saddle Brown',
    colorHex: '#78350f',
    hardwareFinish: 'brushed-steel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-lucius-leather', storeName: 'Lucius Atelier', tier: 'premier', price: 46.00, productUrl: 'https://luciusatelier.com', inStock: true }
    ]
  },
  {
    id: 'strap-nato-bond-20',
    name: 'Heavy-Duty Seatbelt Nylon NATO Strap - Bond 007 (20mm)',
    brand: 'DLW Watches',
    description: 'Silky smooth high-density seatbelt nylon in classic black and slate gray stripes. Heat-sealed holes with heavy-duty brushed steel hardware.',
    category: 'strap',
    basePrice: 18,
    strapType: 'nato-nylon',
    lugWidthMm: 20,
    colorName: 'Bond 007 Black/Grey',
    colorHex: '#334155',
    hardwareFinish: 'brushed-steel',
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-dlw-bond-nato', storeName: 'DLW Watches', tier: 'premier', price: 22.00, productUrl: 'https://dlwwatches.com', inStock: true },
      { id: 'v-tandorio-nato', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 8.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  }
];

export const SEED_SECONDS_ACCENTS: SecondsHandAccent[] = [
  {
    id: 'sec-milgauss-orange',
    name: 'Milgauss Style Orange Lightning Bolt Second (0.21mm)',
    brand: 'DLW Watches',
    description: 'Vibrant high-visibility orange lightning bolt design. Replaces standard seconds hand for a pop of personality.',
    category: 'seconds-accent',
    basePrice: 14,
    accentStyle: 'lightning',
    colorName: 'Signal Orange',
    colorHex: '#ea580c',
    holeSize: 0.21,
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-dlw-orange-sec', storeName: 'DLW Watches', tier: 'premier', price: 16.00, productUrl: 'https://dlwwatches.com', inStock: true },
      { id: 'v-miuski-orange-sec', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 6.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'sec-nh-red-arrow',
    name: 'Submariner Style Cherry Red Arrow Second (0.21mm)',
    brand: 'NamokiMODS',
    description: 'Gloss cherry red second hand with luminous lollipop round pip near tip.',
    category: 'seconds-accent',
    basePrice: 13,
    accentStyle: 'red-arrow',
    colorName: 'Cherry Red',
    colorHex: '#dc2626',
    holeSize: 0.21,
    compatibleMovementFamilies: ['NH'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-namoki-red-sec', storeName: 'NamokiMODS', tier: 'premier', price: 15.00, productUrl: 'https://namokimods.com', inStock: true }
    ]
  },
  {
    id: 'sec-vh31-red-arrow',
    name: 'Quartz Red Tip Sweeping Second (0.17mm for VH31)',
    brand: 'Tandorio Horology',
    description: 'Featherweight 0.17mm second pinion hand with counterbalanced tail, specially designed not to tax quartz stepper gear trains.',
    category: 'seconds-accent',
    basePrice: 10,
    accentStyle: 'red-arrow',
    colorName: 'Speed Red',
    colorHex: '#ef4444',
    holeSize: 0.17,
    compatibleMovementFamilies: ['VH', 'Ronda'],
    lastScannedAt: '2026-11-14T18:00:00Z',
    vendors: [
      { id: 'v-tandorio-sec-vh31', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 6.90, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  }
];

export const SEED_TOOLS: WatchTool[] = [
  {
    id: 'tool-hand-press',
    name: 'Precision Hand Setting Tool with 3 Nylon Tips',
    brand: 'Bergeon Style Horology',
    description: 'Essential vertical plunger tool to press hour, minute, and second hands flat without scratching dial or damaging movement pinions.',
    category: 'tools',
    toolType: 'hand-press',
    basePrice: 22,
    isConsumable: false,
    vendors: [
      { id: 'v-esslinger-press', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 24.50, productUrl: 'https://esslinger.com', inStock: true },
      { id: 'v-miuski-press', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 12.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'tool-dial-dots',
    name: 'Bergeon 6938 Adhesive Dial Dots (Sheet of 100)',
    brand: 'Bergeon Swiss',
    description: 'Ultra-thin, residue-free adhesive dots used to firmly mount dials to movement spacers when dial feet have been clipped (essential for VH31 quartz conversions).',
    category: 'tools',
    toolType: 'dial-dots',
    basePrice: 9.95,
    isConsumable: true,
    vendors: [
      { id: 'v-esslinger-dial-dots', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 9.95, productUrl: 'https://esslinger.com', inStock: true }
    ]
  },
  {
    id: 'tool-caseback-wrench',
    name: 'Adjustable Two-Prong Caseback Opening Wrench',
    brand: 'Horotec Style',
    description: 'Hardened steel wrench for opening and securely torque-tightening notched screw-down diver casebacks.',
    category: 'tools',
    toolType: 'caseback-wrench',
    basePrice: 12,
    isConsumable: false,
    vendors: [
      { id: 'v-miuski-wrench', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 8.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'tool-rodico',
    name: 'Bergeon 6033 Rodico Cleaning Putty',
    brand: 'Bergeon Swiss',
    description: 'The watchmaker\'s magic putty. Safely lifts dust, lint, and excess oil from dials, hand stems, and inside sapphire crystals without leaving smudges.',
    category: 'tools',
    toolType: 'rodico',
    basePrice: 7.50,
    isConsumable: true,
    vendors: [
      { id: 'v-esslinger-rodico', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 7.50, productUrl: 'https://esslinger.com', inStock: true }
    ]
  },
  {
    id: 'tool-silicone-grease',
    name: 'Seiko S-916 High-Viscosity Silicone Gasket Grease',
    brand: 'Seiko Instruments',
    description: 'Lubricates and revitalizes rubber O-rings on the caseback and crown tube to ensure full 100M/200M water resistance seals.',
    category: 'tools',
    toolType: 'silicone-grease',
    basePrice: 11,
    isConsumable: true,
    vendors: [
      { id: 'v-esslinger-grease', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 11.00, productUrl: 'https://esslinger.com', inStock: true }
    ]
  }
];
