export type VendorTier = 'premier' | 'vetted-direct' | 'supply-house' | 'marketplace';

export interface VendorOption {
  id: string;
  storeName: string;
  tier: VendorTier;
  price: number;
  productUrl: string;
  inStock: boolean;
  shippingDaysEstimate?: string;
  isSpecialDeal?: boolean; // When price is >= 15% below baseline
  notes?: string;
}

export type PartCategory =
  | 'movement'
  | 'case'
  | 'dial'
  | 'hands'
  | 'seconds-accent'
  | 'bezel-insert'
  | 'chapter-ring'
  | 'rotor'
  | 'spacer'
  | 'strap'
  | 'tools';

export interface BaseComponent {
  id: string;
  name: string;
  brand: string;
  description: string;
  category: PartCategory;
  basePrice: number;
  vendors: VendorOption[];
  imageUrl?: string;
  lastScannedAt?: string;
  historicalLowestPrice?: number;
}

export type MovementType = 'automatic' | 'manual' | 'quartz-sweeping' | 'quartz-standard';
export type MovementFamily = 'NH' | 'VH' | 'ETA' | 'Ronda' | 'Miyota';

export interface HandHoleSizes {
  hour: number;   // e.g. 1.50mm (NH) or 1.20mm (VH31)
  minute: number; // e.g. 0.89mm (NH) or 0.70mm (VH31)
  second: number; // e.g. 0.21mm (NH) or 0.17mm (VH31)
  gmt?: number;   // e.g. 2.20mm (NH34)
}

export interface Movement extends BaseComponent {
  category: 'movement';
  caliber: string;
  movementType: MovementType;
  family: MovementFamily;
  beatsPerHour: number;
  beatsPerSecond: number; // 6 for NH35, 4 for VH31, 1 for Ronda 515
  diameterMm: number;     // 27.4mm for NH, 23.7mm for VH31
  thicknessMm: number;    // 5.32mm for NH35, 5.70 for NH34, 3.45 for VH31
  handHoleSizes: HandHoleSizes;
  hasDate: boolean;
  hasDay: boolean;
  hasGmt: boolean;
  batteryModel?: string;  // e.g. 'SR920SW / 371' for VH31
  batteryLifeYears?: number;
}

export type CaseStyle = 'diver' | 'explorer' | 'field' | 'flieger' | 'dress' | 'datejust' | 'pilot' | 'gs' | 'bauhaus' | '1908';
export type CrownPosition = '3.0' | '3.8' | '4.0' | '9.0';
export type CrystalType = 'flat-sapphire' | 'double-domed-sapphire' | 'top-hat-sapphire' | 'mineral';
export type CaseFinish = 'brushed-steel' | 'pvd-black' | 'bronze' | 'rose-gold' | 'gold';
export type CasebackType = 'solid' | 'exhibition';

export interface Case extends BaseComponent {
  category: 'case';
  caseStyle: CaseStyle;
  outerDiameterMm: number;
  lugToLugMm: number;
  lugWidthMm: 18 | 20 | 22;
  thicknessMm: number;
  dialDiameterFitMm: number; // Standard is 28.5mm
  crownPosition: CrownPosition;
  crystalType: CrystalType;
  crystalClearanceMm: number; // e.g. 1.2mm for standard flat, 1.8mm for double dome
  waterResistanceM: number;
  caseFinish: CaseFinish;
  hasRotatingBezel: boolean;
  bezelInsertSize?: {
    outerMm: number;
    innerMm: number;
    isSloping: boolean;
  };
  hasChapterRing: boolean;
  chapterRingSize?: {
    outerMm: number;
    innerMm: number;
  };
  casebackType: CasebackType;
  nativeMovementFamily: 'NH' | 'VH' | 'ETA' | 'Universal';
}

export type DialStyle = 'diver' | 'field' | 'explorer' | 'flieger' | 'marine' | 'minimalist' | 'dress' | 'art';
export type LumeType = 'BGW9' | 'C3' | 'Vintage' | 'None';
export type DialFeetPosition = '3.0' | '3.8' | '4.0' | 'none';

export interface Dial extends BaseComponent {
  category: 'dial';
  diameterMm: number; // Standard 28.5mm
  dialStyle: DialStyle;
  colorName: string;
  colorHex: string;
  indicesStyle: 'dots-and-batons' | 'explorer-369' | 'field-arabic' | 'flieger-a' | 'roman' | 'minimal-markers';
  lume: LumeType;
  dialFeetPositions: DialFeetPosition[];
  dateWindow: 'none' | '3.0' | '3.8' | '6.0';
  texture?: 'matte' | 'sunburst' | 'waffle' | 'enamel' | 'sand' | 'linen' | 'meteorite' | 'guilloche' | 'mother-of-pearl';
}

export type HandsStyle = 'mercedes' | 'snowflake' | 'sword' | 'cathedral' | 'baton' | 'marine' | 'dauphine' | 'flieger' | 'breguet' | 'alpha';

export interface HandComponents {
  hour: string;
  minute: string;
  second: string;
}

export interface Hands extends BaseComponent {
  category: 'hands';
  handsStyle: HandsStyle;
  handHoleSizes: HandHoleSizes;
  lume: LumeType;
  finish: 'silver' | 'gold' | 'black' | 'rose-gold' | 'heat-blued' | 'blue';
  compatibleMovementFamilies: MovementFamily[];
  handComponents?: HandComponents;
}

export interface SecondsHandAccent extends BaseComponent {
  category: 'seconds-accent';
  accentStyle: 'lightning' | 'red-arrow' | 'orange-arrow' | 'blue-lollipop' | 'trident' | 'classic';
  colorName: string;
  colorHex: string;
  holeSize: number; // e.g. 0.21mm (NH) or 0.17mm (VH31)
  compatibleMovementFamilies: MovementFamily[];
}

export interface BezelInsert extends BaseComponent {
  category: 'bezel-insert';
  style: 'diver-60min' | 'gmt-24hr' | 'dual-time-12hr' | 'yacht' | 'tachymeter';
  material: 'ceramic' | 'aluminum' | 'steel';
  color1: string;
  color1Hex: string;
  color2?: string;
  color2Hex?: string;
  outerMm: number;
  innerMm: number;
  isSloping: boolean;
}

export interface ChapterRing extends BaseComponent {
  category: 'chapter-ring';
  finish: 'brushed-silver' | 'matte-black' | 'white' | 'gold';
  markerType: 'minute-ticks' | 'numbers' | 'sterile';
  outerMm: number;
  innerMm: number;
}

export interface Rotor extends BaseComponent {
  category: 'rotor';
  compatibleMovements: string[]; // e.g. ['NH35', 'NH36', 'NH34', 'NH38']
  finish: 'rose-gold-skeleton' | 'cotes-de-geneve' | 'black-tactical' | 'tokyo-wave' | 'bronze-crest';
}

export interface MovementSpacer extends BaseComponent {
  category: 'spacer';
  fromMovementFamily: 'VH' | 'Ronda';
  toCaseFamily: 'NH';
  material: '3d-printed-petg' | 'machined-brass' | 'delrin';
  includesStemShim: boolean;
}

export type StrapType = 'oyster-steel' | 'jubilee-steel' | 'vintage-leather' | 'nato-nylon' | 'fkm-rubber' | 'president-steel' | 'gs-steel' | 'custom-leather';

export interface Strap extends BaseComponent {
  category: 'strap';
  strapType: StrapType;
  lugWidthMm: 18 | 20 | 22;
  colorName: string;
  colorHex: string;
  hardwareFinish: CaseFinish;
}

export interface WatchTool extends BaseComponent {
  category: 'tools';
  toolType: 'hand-press' | 'caseback-wrench' | 'rodico' | 'dial-dots' | 'tweezers' | 'silicone-grease' | 'movement-holder' | 'pin-vise';
  isConsumable: boolean;
}

export interface WatchBuild {
  movement?: Movement;
  case?: Case;
  dial?: Dial;
  hands?: Hands;
  secondsAccent?: SecondsHandAccent;
  bezelInsert?: BezelInsert;
  chapterRing?: ChapterRing;
  rotor?: Rotor;
  spacer?: MovementSpacer;
  strap?: Strap;
  // Selected vendor choices (componentId -> vendorId)
  selectedVendors: Record<string, string>;
}

export type BuildStep = 'movement' | 'case' | 'dial' | 'hands' | 'accessories' | 'sourcing';

export type IssueSeverity = 'error' | 'warning' | 'info';

export interface CompatibilityIssue {
  id: string;
  severity: IssueSeverity;
  title: string;
  description: string;
  affectedComponents: PartCategory[];
  suggestedFix?: string;
  requiresItem?: {
    category: PartCategory;
    name: string;
  };
}

export interface CompatibilityReport {
  isAssembled: boolean;
  isValid: boolean; // No error-severity issues
  errorCount: number;
  warningCount: number;
  infoCount: number;
  issues: CompatibilityIssue[];
}

export interface SupplierScanResult {
  sourceId: string;
  sourceName: string;
  domain: string;
  tier: VendorTier;
  status: 'online' | 'degraded' | 'offline' | 'error';
  statusCode: number; // e.g. 200, 429, 502, 504
  latencyMs: number;
  itemsParsed: number;
  itemsExpected: number;
  error?: string;
}

export interface ScanJobMetrics {
  totalDurationMs: number;
  overallSuccessRate: number; // 0 - 100%
  failureRatePercent: number; // 0 - 100%
  sourcesTotal: number;
  sourcesSucceeded: number;
  sourcesFailed: number;
  avgLatencyMs: number;
  alertTriggered: boolean;
  alertSeverity?: 'none' | 'warning' | 'critical';
  alertMessage?: string;
}

export interface ScanJob {
  id: string;
  timestamp: string;
  sourcesScanned: string[];
  itemsFound: number;
  priceDropsDetected: number;
  status: 'idle' | 'running' | 'completed' | 'degraded' | 'failed';
  dealsDiscovered: {
    componentId: string;
    componentName: string;
    storeName: string;
    oldPrice: number;
    newPrice: number;
    discountPercent: number;
  }[];
  metrics?: ScanJobMetrics;
  sourceResults?: SupplierScanResult[];
}

