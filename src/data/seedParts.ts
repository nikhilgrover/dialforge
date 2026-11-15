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
    vendors: [
      { id: 'v-miuski-nh35', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 31.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-namoki-nh35', storeName: 'NamokiMODS', tier: 'premier', price: 64.99, productUrl: 'https://namokimods.com', inStock: true, shippingDaysEstimate: '3-5 days', notes: 'Pre-regulated to +/- 5 sec/day' },
      { id: 'v-esslinger-nh35', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 47.95, productUrl: 'https://esslinger.com', inStock: true, shippingDaysEstimate: '2-4 days' }
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
    vendors: [
      { id: 'v-tandorio-vh31', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 8.90, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-esslinger-vh31', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 14.50, productUrl: 'https://esslinger.com', inStock: true, shippingDaysEstimate: '2-4 days', notes: 'Includes factory warranty' }
    ]
  },
  {
    id: 'mov-ronda515',
    name: 'Ronda powertech Caliber 515 Quartz',
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
    vendors: [
      { id: 'v-esslinger-ronda515', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 16.95, productUrl: 'https://esslinger.com', inStock: true, shippingDaysEstimate: '2-4 days' }
    ]
  }
];

export const SEED_CASES: Case[] = [
  {
    id: 'case-sub-40',
    name: 'Submariner Style 40mm Diver Case',
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
    vendors: [
      { id: 'v-miuski-subcase', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 34.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' },
      { id: 'v-namoki-nmk901', storeName: 'NamokiMODS (NMK901 Sub)', tier: 'premier', price: 89.99, productUrl: 'https://namokimods.com', inStock: true, shippingDaysEstimate: '3-5 days', notes: 'Includes double O-ring Viton gaskets' }
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
    vendors: [
      { id: 'v-namoki-skx007', storeName: 'NamokiMODS', tier: 'premier', price: 79.99, productUrl: 'https://namokimods.com', inStock: true, shippingDaysEstimate: '3-5 days' },
      { id: 'v-tandorio-skx', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 38.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' }
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
    vendors: [
      { id: 'v-tandorio-field', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 29.80, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true, shippingDaysEstimate: '10-14 days' }
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
    vendors: [
      { id: 'v-namoki-mm-dial', storeName: 'NamokiMODS', tier: 'premier', price: 42.00, productUrl: 'https://namokimods.com', inStock: true },
      { id: 'v-ds-dial-mm', storeName: 'DS-Watch Mod Store (AliExpress)', tier: 'vetted-direct', price: 18.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
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
    vendors: [
      { id: 'v-lucius-exp-dial', storeName: 'Lucius Atelier', tier: 'premier', price: 54.00, productUrl: 'https://luciusatelier.com', inStock: true },
      { id: 'v-miuski-exp-dial', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 21.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'dial-field-military',
    name: 'Khaki Military Field Dial - Matte Black',
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
    vendors: [
      { id: 'v-tandorio-field-dial', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 16.90, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
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
    vendors: [
      { id: 'v-lucius-birch', storeName: 'Lucius Atelier', tier: 'premier', price: 62.00, productUrl: 'https://luciusatelier.com', inStock: true }
    ]
  }
];

export const SEED_HANDS: Hands[] = [
  {
    id: 'hands-mercedes-nh',
    name: 'Classic Mercedes Hand Set (NH Automatic)',
    brand: 'NamokiMODS',
    description: 'Iconic Submariner style hands with circular hour hand tri-spoke. Manufactured to exact Seiko NH tolerances (1.50/0.89/0.21mm). Swiss BGW9 lume.',
    category: 'hands',
    basePrice: 24,
    handsStyle: 'mercedes',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lume: 'BGW9',
    finish: 'silver',
    compatibleMovementFamilies: ['NH'],
    vendors: [
      { id: 'v-namoki-mercedes', storeName: 'NamokiMODS', tier: 'premier', price: 28.00, productUrl: 'https://namokimods.com', inStock: true },
      { id: 'v-miuski-mercedes', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 11.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'hands-snowflake-nh',
    name: 'Snowflake Hand Set (NH Automatic)',
    brand: 'DLW Watches',
    description: 'Legendary angular block hands inspired by vintage Tudor dive watches. Diamond-faceted polished edges with thick BGW9 luminescence.',
    category: 'hands',
    basePrice: 26,
    handsStyle: 'snowflake',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lume: 'BGW9',
    finish: 'silver',
    compatibleMovementFamilies: ['NH'],
    vendors: [
      { id: 'v-dlw-snowflake', storeName: 'DLW Watches', tier: 'premier', price: 29.50, productUrl: 'https://dlwwatches.com', inStock: true },
      { id: 'v-tandorio-snowflake', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 12.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'hands-milsub-sword-nh',
    name: 'MilSub Sword Hands (NH Automatic)',
    brand: 'Tokeilab',
    description: 'Wide sword-blade hands modeled after British Royal Navy issue dive watches. Maximizes luminous surface area with vibrant C3 green glow.',
    category: 'hands',
    basePrice: 25,
    handsStyle: 'sword',
    handHoleSizes: { hour: 1.50, minute: 0.89, second: 0.21 },
    lume: 'C3',
    finish: 'silver',
    compatibleMovementFamilies: ['NH'],
    vendors: [
      { id: 'v-tokeilab-sword', storeName: 'Tokeilab', tier: 'premier', price: 26.00, productUrl: 'https://tokeilab.com', inStock: true }
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
    vendors: [
      { id: 'v-namoki-gmt-hands', storeName: 'NamokiMODS', tier: 'premier', price: 34.00, productUrl: 'https://namokimods.com', inStock: true },
      { id: 'v-miuski-gmt-hands', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 14.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'hands-baton-vh31',
    name: 'Slim Baton Hand Set (VH31 Sweeping Quartz)',
    brand: 'Tandorio Horology',
    description: 'Precision-broached hand set sized exclusively for the Seiko TMI VH31 quartz movement (1.20mm hour, 0.70mm minute, 0.17mm second pinion). Balanced counterweights prevent quartz gear train drag.',
    category: 'hands',
    basePrice: 16,
    handsStyle: 'baton',
    handHoleSizes: { hour: 1.20, minute: 0.70, second: 0.17 },
    lume: 'BGW9',
    finish: 'silver',
    compatibleMovementFamilies: ['VH', 'Ronda'],
    vendors: [
      { id: 'v-tandorio-vh31-hands', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 11.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true },
      { id: 'v-esslinger-quartz-hands', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 18.50, productUrl: 'https://esslinger.com', inStock: true }
    ]
  },
  {
    id: 'hands-sword-vh31',
    name: 'MilSub Sword Hand Set (VH31 Sweeping Quartz)',
    brand: 'Caroline Mod Store',
    description: 'Military sword design engineered with 1.20/0.70/0.17mm quartz arbors. Allows building a lightweight, zero-maintenance quartz field or dive watch.',
    category: 'hands',
    basePrice: 17,
    handsStyle: 'sword',
    handHoleSizes: { hour: 1.20, minute: 0.70, second: 0.17 },
    lume: 'C3',
    finish: 'silver',
    compatibleMovementFamilies: ['VH', 'Ronda'],
    vendors: [
      { id: 'v-caroline-vh31-sword', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 12.80, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  }
];

export const SEED_SECONDS_ACCENTS: SecondsHandAccent[] = [
  {
    id: 'sec-milgauss-orange',
    name: 'Milgauss Style Orange Lightning Bolt Second',
    brand: 'DLW Watches',
    description: 'Vibrant high-visibility orange lightning bolt design. Replaces standard seconds hand for a pop of personality.',
    category: 'seconds-accent',
    basePrice: 14,
    accentStyle: 'lightning',
    colorName: 'Signal Orange',
    colorHex: '#ea580c',
    holeSize: 0.21,
    compatibleMovementFamilies: ['NH'],
    vendors: [
      { id: 'v-dlw-lightning', storeName: 'DLW Watches', tier: 'premier', price: 15.00, productUrl: 'https://dlwwatches.com', inStock: true }
    ]
  },
  {
    id: 'sec-red-arrow-nh',
    name: 'Vintage Red Arrow Tip Second',
    brand: 'NamokiMODS',
    description: 'Polished silver second hand with a bold crimson red lacquered arrow tip.',
    category: 'seconds-accent',
    basePrice: 12,
    accentStyle: 'red-arrow',
    colorName: 'Crimson Red',
    colorHex: '#dc2626',
    holeSize: 0.21,
    compatibleMovementFamilies: ['NH'],
    vendors: [
      { id: 'v-namoki-red-arrow', storeName: 'NamokiMODS', tier: 'premier', price: 14.00, productUrl: 'https://namokimods.com', inStock: true },
      { id: 'v-miuski-red-sec', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 6.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'sec-vh31-red-arrow',
    name: 'Red Sweep Second Hand (VH31 Quartz Spec)',
    brand: 'Tandorio Horology',
    description: 'Precision 0.17mm arbor second hand in bright red, designed to sweep smoothly across the dial on VH31 quartz calibers.',
    category: 'seconds-accent',
    basePrice: 8,
    accentStyle: 'red-arrow',
    colorName: 'Crimson Red',
    colorHex: '#dc2626',
    holeSize: 0.17,
    compatibleMovementFamilies: ['VH'],
    vendors: [
      { id: 'v-tandorio-vh31-sec', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 5.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  }
];

export const SEED_BEZEL_INSERTS: BezelInsert[] = [
  {
    id: 'insert-sub-black',
    name: 'Ceramic Submariner 60-Min Insert (Black/White)',
    brand: 'NamokiMODS',
    description: 'Scratch-proof polished zirconium ceramic with platinum PVD engraved 60-minute dive numerals and luminous pip at 12:00.',
    category: 'bezel-insert',
    basePrice: 32,
    style: 'diver-60min',
    material: 'ceramic',
    color1: 'Gloss Black',
    color1Hex: '#09090b',
    outerMm: 38.0,
    innerMm: 30.6,
    isSloping: true,
    vendors: [
      { id: 'v-namoki-sub-insert', storeName: 'NamokiMODS', tier: 'premier', price: 38.00, productUrl: 'https://namokimods.com', inStock: true },
      { id: 'v-miuski-sub-insert', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 13.90, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'insert-gmt-batman',
    name: 'Ceramic GMT "Batman" 24-Hr Insert (Blue/Black)',
    brand: 'DLW Watches',
    description: 'Split day/night ceramic insert. Midnight black for 18:00–06:00 and royal blue for 06:00–18:00 with engraved 24-hour track.',
    category: 'bezel-insert',
    basePrice: 35,
    style: 'gmt-24hr',
    material: 'ceramic',
    color1: 'Midnight Black',
    color1Hex: '#09090b',
    color2: 'Royal Blue',
    color2Hex: '#1d4ed8',
    outerMm: 38.0,
    innerMm: 30.6,
    isSloping: true,
    vendors: [
      { id: 'v-dlw-batman', storeName: 'DLW Watches', tier: 'premier', price: 39.00, productUrl: 'https://dlwwatches.com', inStock: true },
      { id: 'v-tandorio-batman', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 14.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'insert-gmt-pepsi',
    name: 'Ceramic GMT "Pepsi" 24-Hr Insert (Red/Blue)',
    brand: 'NamokiMODS',
    description: 'Iconic aviation dual-color 24-hour bezel insert in vibrant scarlet red and marine blue.',
    category: 'bezel-insert',
    basePrice: 36,
    style: 'gmt-24hr',
    material: 'ceramic',
    color1: 'Deep Scarlet',
    color1Hex: '#b91c1c',
    color2: 'Navy Blue',
    color2Hex: '#1e3a8a',
    outerMm: 38.0,
    innerMm: 30.6,
    isSloping: true,
    vendors: [
      { id: 'v-namoki-pepsi', storeName: 'NamokiMODS', tier: 'premier', price: 42.00, productUrl: 'https://namokimods.com', inStock: true }
    ]
  }
];

export const SEED_ROTORS: Rotor[] = [
  {
    id: 'rotor-great-wave',
    name: 'The Great Wave of Kanagawa Custom Rotor',
    brand: 'Lucius Atelier',
    description: 'Laser-engraved solid brass rotor featuring Hokusai\'s famous wave in rose gold finish. Screws directly onto NH35/36/34 automatic bridges.',
    category: 'rotor',
    basePrice: 28,
    compatibleMovements: ['NH35A', 'NH36A', 'NH34A', 'NH38A'],
    finish: 'rose-gold-skeleton',
    vendors: [
      { id: 'v-lucius-wave-rotor', storeName: 'Lucius Atelier', tier: 'premier', price: 34.00, productUrl: 'https://luciusatelier.com', inStock: true },
      { id: 'v-miuski-wave-rotor', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 14.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'rotor-cotes-de-geneve',
    name: 'Côtes de Genève Gunmetal Rotor',
    brand: 'NamokiMODS',
    description: 'Traditional Swiss-style ribbed striping in a sleek gunmetal PVD finish with polished chamfered bevels.',
    category: 'rotor',
    basePrice: 26,
    compatibleMovements: ['NH35A', 'NH36A', 'NH34A', 'NH38A'],
    finish: 'cotes-de-geneve',
    vendors: [
      { id: 'v-namoki-geneve-rotor', storeName: 'NamokiMODS', tier: 'premier', price: 29.99, productUrl: 'https://namokimods.com', inStock: true }
    ]
  }
];

export const SEED_SPACERS: MovementSpacer[] = [
  {
    id: 'spacer-vh31-to-nh',
    name: 'VH31 to NH35 Case Movement Adapter Ring',
    brand: 'Caroline Mod Store',
    description: 'Precision engineered Delrin casing ring that adapts the 23.7mm Seiko VH31 quartz movement securely into standard 27.4mm Seiko NH-spec cases. Includes stem height compensation ring.',
    category: 'spacer',
    basePrice: 9,
    fromMovementFamily: 'VH',
    toCaseFamily: 'NH',
    material: 'delrin',
    includesStemShim: true,
    vendors: [
      { id: 'v-caroline-spacer', storeName: 'Caroline Mod Store (AliExpress)', tier: 'vetted-direct', price: 6.80, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true },
      { id: 'v-esslinger-spacer', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 12.00, productUrl: 'https://esslinger.com', inStock: true }
    ]
  }
];

export const SEED_STRAPS: Strap[] = [
  {
    id: 'strap-oyster-20',
    name: 'Solid Link Oyster Steel Bracelet (20mm)',
    brand: 'Miuski Custom Works',
    description: 'Heavyweight 316L solid stainless steel with brushed links, solid end links curved to match 40mm Sub and 36mm Explorer cases, and a solid milled security clasp.',
    category: 'strap',
    basePrice: 28,
    strapType: 'oyster-steel',
    lugWidthMm: 20,
    colorName: 'Brushed Stainless',
    colorHex: '#cbd5e1',
    hardwareFinish: 'brushed-steel',
    vendors: [
      { id: 'v-miuski-oyster', storeName: 'Miuski Official Store (AliExpress)', tier: 'vetted-direct', price: 19.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true },
      { id: 'v-namoki-oyster', storeName: 'NamokiMODS', tier: 'premier', price: 54.00, productUrl: 'https://namokimods.com', inStock: true }
    ]
  },
  {
    id: 'strap-jubilee-20',
    name: 'Five-Link Jubilee Steel Bracelet (20mm)',
    brand: 'NamokiMODS',
    description: 'Drapey and comfortable 5-link architecture with polished center links and brushed outer flanks. Features micro-adjust clasp.',
    category: 'strap',
    basePrice: 38,
    strapType: 'jubilee-steel',
    lugWidthMm: 20,
    colorName: 'Polished / Brushed Steel',
    colorHex: '#e2e8f0',
    hardwareFinish: 'brushed-steel',
    vendors: [
      { id: 'v-namoki-jubilee', storeName: 'NamokiMODS', tier: 'premier', price: 58.00, productUrl: 'https://namokimods.com', inStock: true }
    ]
  },
  {
    id: 'strap-vintage-leather-20',
    name: 'Handcrafted Italian Saddle Leather Strap (20mm)',
    brand: 'Lucius Atelier',
    description: 'Supple vegetable-tanned Italian leather with hand-tied ivory thread stitching at the lugs. Equipped with tool-free quick-release spring bars.',
    category: 'strap',
    basePrice: 32,
    strapType: 'vintage-leather',
    lugWidthMm: 20,
    colorName: 'Cognac Saddle Brown',
    colorHex: '#854d0e',
    hardwareFinish: 'brushed-steel',
    vendors: [
      { id: 'v-lucius-leather', storeName: 'Lucius Atelier', tier: 'premier', price: 38.00, productUrl: 'https://luciusatelier.com', inStock: true }
    ]
  },
  {
    id: 'strap-nato-bond-20',
    name: 'James Bond Ballistic NATO Nylon Strap (20mm)',
    brand: 'DLW Watches',
    description: 'Military-grade ballistic nylon in classic black and slate grey regimental stripes. Heavy-duty 316L hardware with etched logo.',
    category: 'strap',
    basePrice: 16,
    strapType: 'nato-nylon',
    lugWidthMm: 20,
    colorName: 'Black & Grey Stripe',
    colorHex: '#334155',
    hardwareFinish: 'brushed-steel',
    vendors: [
      { id: 'v-dlw-nato', storeName: 'DLW Watches', tier: 'premier', price: 18.00, productUrl: 'https://dlwwatches.com', inStock: true },
      { id: 'v-tandorio-nato', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 7.50, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'strap-fkm-rubber-20',
    name: 'FKM Waffle Dive Strap (20mm)',
    brand: 'Tokeilab',
    description: 'High-density fluoroelastomer (FKM) rubber. Ultra-soft, lint-resistant, and impervious to saltwater, UV, and sweat.',
    category: 'strap',
    basePrice: 24,
    strapType: 'fkm-rubber',
    lugWidthMm: 20,
    colorName: 'Obsidian Black',
    colorHex: '#09090b',
    hardwareFinish: 'brushed-steel',
    vendors: [
      { id: 'v-tokeilab-fkm', storeName: 'Tokeilab', tier: 'premier', price: 28.00, productUrl: 'https://tokeilab.com', inStock: true }
    ]
  },
  {
    id: 'strap-jubilee-22',
    name: 'SKX007 Jubilee Steel Bracelet (22mm)',
    brand: 'NamokiMODS',
    description: '22mm curved solid end links custom-milled to seamlessly hug the curvature of SKX007 cases.',
    category: 'strap',
    basePrice: 42,
    strapType: 'jubilee-steel',
    lugWidthMm: 22,
    colorName: 'Steel',
    colorHex: '#e2e8f0',
    hardwareFinish: 'brushed-steel',
    vendors: [
      { id: 'v-namoki-skx-jubilee', storeName: 'NamokiMODS', tier: 'premier', price: 59.99, productUrl: 'https://namokimods.com', inStock: true }
    ]
  }
];

export const SEED_TOOLS: WatchTool[] = [
  {
    id: 'tool-hand-press',
    name: 'Bergeon-Style Precision Hand Press with Nylon Tips',
    brand: 'Esslinger Supplies',
    description: 'Spring-loaded plunger press with non-marring Delrin tips. Essential for setting hour, minute, and second hands straight and parallel without scratching dials.',
    category: 'tools',
    toolType: 'hand-press',
    basePrice: 18,
    isConsumable: false,
    vendors: [
      { id: 'v-esslinger-handpress', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 19.95, productUrl: 'https://esslinger.com', inStock: true },
      { id: 'v-ali-handpress', storeName: 'Tandorio Official (AliExpress)', tier: 'vetted-direct', price: 11.00, productUrl: 'https://aliexpress.com', inStock: true, isSpecialDeal: true }
    ]
  },
  {
    id: 'tool-dial-dots',
    name: 'High-Tack Adhesive Dial Dots (Pack of 100)',
    brand: 'NamokiMODS',
    description: 'Microscopic double-sided adhesive pads designed to mount dials when dial feet have been clipped for quartz movements or 3.8:00 crown positions.',
    category: 'tools',
    toolType: 'dial-dots',
    basePrice: 6,
    isConsumable: true,
    vendors: [
      { id: 'v-namoki-dialdots', storeName: 'NamokiMODS', tier: 'premier', price: 6.50, productUrl: 'https://namokimods.com', inStock: true },
      { id: 'v-esslinger-dots', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 5.95, productUrl: 'https://esslinger.com', inStock: true }
    ]
  },
  {
    id: 'tool-rodico',
    name: 'Bergeon 6033 Rodico Cleaning Putty',
    brand: 'Bergeon Swiss',
    description: 'The watchmaker\'s secret weapon. Lint-free cleaning putty used for lifting tiny seconds hands, picking up dust specs, and holding delicate parts.',
    category: 'tools',
    toolType: 'rodico',
    basePrice: 8,
    isConsumable: true,
    vendors: [
      { id: 'v-esslinger-rodico', storeName: 'Esslinger Watch Supplies', tier: 'supply-house', price: 7.95, productUrl: 'https://esslinger.com', inStock: true }
    ]
  },
  {
    id: 'tool-caseback-wrench',
    name: 'Two-Pin Adjustable Screwback Case Opener',
    brand: 'Tokeilab',
    description: 'Precision tempered steel wrench with adjustable jaw width to open and seal screw-down casebacks without slipping.',
    category: 'tools',
    toolType: 'caseback-wrench',
    basePrice: 12,
    isConsumable: false,
    vendors: [
      { id: 'v-tokeilab-wrench', storeName: 'Tokeilab', tier: 'premier', price: 14.00, productUrl: 'https://tokeilab.com', inStock: true }
    ]
  }
];
