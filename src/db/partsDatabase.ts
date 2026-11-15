import type {
  BaseComponent,
  Movement,
  Case,
  Dial,
  Hands,
  SecondsHandAccent,
  BezelInsert,
  Rotor,
  MovementSpacer,
  Strap,
  WatchTool,
  ScanJob,
  PartCategory
} from '../types/watch';
import {
  SEED_MOVEMENTS,
  SEED_CASES,
  SEED_DIALS,
  SEED_HANDS,
  SEED_SECONDS_ACCENTS,
  SEED_BEZEL_INSERTS,
  SEED_ROTORS,
  SEED_SPACERS,
  SEED_STRAPS,
  SEED_TOOLS
} from '../data/seedParts';

export interface DatabaseState {
  movements: Movement[];
  cases: Case[];
  dials: Dial[];
  hands: Hands[];
  secondsAccents: SecondsHandAccent[];
  bezelInserts: BezelInsert[];
  rotors: Rotor[];
  spacers: MovementSpacer[];
  straps: Strap[];
  tools: WatchTool[];
  lastScanJob: ScanJob | null;
  version: number;
}

const STORAGE_KEY = 'dialforge_parts_database_v1';

class PartsDatabase {
  private state: DatabaseState;

  constructor() {
    this.state = this.loadInitialState();
  }

  private loadInitialState(): DatabaseState {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.version === 1 && parsed.movements?.length > 0) {
            return parsed;
          }
        }
      } catch {
        // Fallback to fresh seed
      }
    }

    return {
      movements: SEED_MOVEMENTS,
      cases: SEED_CASES,
      dials: SEED_DIALS,
      hands: SEED_HANDS,
      secondsAccents: SEED_SECONDS_ACCENTS,
      bezelInserts: SEED_BEZEL_INSERTS,
      rotors: SEED_ROTORS,
      spacers: SEED_SPACERS,
      straps: SEED_STRAPS,
      tools: SEED_TOOLS,
      lastScanJob: {
        id: 'scan-init',
        timestamp: new Date().toISOString(),
        sourcesScanned: ['NamokiMODS', 'Lucius Atelier', 'AliExpress Vetted Stores', 'Esslinger Watch Supplies'],
        itemsFound: 38,
        priceDropsDetected: 6,
        status: 'completed',
        dealsDiscovered: [
          { componentId: 'mov-nh35', componentName: 'Seiko (TMI) NH35A', storeName: 'Miuski Official Store', oldPrice: 38.00, newPrice: 31.50, discountPercent: 17 },
          { id: 'deal-1', componentId: 'case-sub-40', componentName: 'Submariner 40mm Case', storeName: 'Miuski Official Store', oldPrice: 42.00, newPrice: 34.00, discountPercent: 19 } as unknown as any,
          { id: 'deal-2', componentId: 'mov-vh31', componentName: 'Seiko (TMI) VH31 Quartz', storeName: 'Tandorio Official', oldPrice: 12.00, newPrice: 8.90, discountPercent: 25 } as unknown as any
        ]
      },
      version: 1
    };
  }

  private persist() {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') {
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Unable to persist parts DB to localStorage:', e);
    }
  }

  // --- GETTERS ---
  public getMovements(): Movement[] { return this.state.movements; }
  public getCases(): Case[] { return this.state.cases; }
  public getDials(): Dial[] { return this.state.dials; }
  public getHands(): Hands[] { return this.state.hands; }
  public getSecondsAccents(): SecondsHandAccent[] { return this.state.secondsAccents; }
  public getBezelInserts(): BezelInsert[] { return this.state.bezelInserts; }
  public getRotors(): Rotor[] { return this.state.rotors; }
  public getSpacers(): MovementSpacer[] { return this.state.spacers; }
  public getStraps(): Strap[] { return this.state.straps; }
  public getTools(): WatchTool[] { return this.state.tools; }
  public getLastScanJob(): ScanJob | null { return this.state.lastScanJob; }

  public getAllComponents(): BaseComponent[] {
    return [
      ...this.state.movements,
      ...this.state.cases,
      ...this.state.dials,
      ...this.state.hands,
      ...this.state.secondsAccents,
      ...this.state.bezelInserts,
      ...this.state.rotors,
      ...this.state.spacers,
      ...this.state.straps,
      ...this.state.tools
    ];
  }

  // --- QUERY & SEARCH ---
  public searchComponents(query: string, category?: PartCategory): BaseComponent[] {
    const q = query.toLowerCase().trim();
    let pool = this.getAllComponents();
    if (category) {
      pool = pool.filter(item => item.category === category);
    }
    if (!q) return pool;

    return pool.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  }

  // --- MUTATIONS / SCAN UPDATE ---
  public updateVendorPrice(componentId: string, vendorId: string, newPrice: number, isDeal: boolean = false) {
    const updateInList = (list: BaseComponent[]) => {
      const item = list.find(c => c.id === componentId);
      if (item) {
        const v = item.vendors.find(ven => ven.id === vendorId);
        if (v) {
          v.price = newPrice;
          v.isSpecialDeal = isDeal;
          item.lastScannedAt = new Date().toISOString();
        }
      }
    };

    updateInList(this.state.movements);
    updateInList(this.state.cases);
    updateInList(this.state.dials);
    updateInList(this.state.hands);
    updateInList(this.state.bezelInserts);
    updateInList(this.state.rotors);
    updateInList(this.state.straps);
    this.persist();
  }

  public recordScanJob(job: ScanJob) {
    this.state.lastScanJob = job;
    this.persist();
  }

  public resetToSeeds() {
    this.state = {
      movements: SEED_MOVEMENTS,
      cases: SEED_CASES,
      dials: SEED_DIALS,
      hands: SEED_HANDS,
      secondsAccents: SEED_SECONDS_ACCENTS,
      bezelInserts: SEED_BEZEL_INSERTS,
      rotors: SEED_ROTORS,
      spacers: SEED_SPACERS,
      straps: SEED_STRAPS,
      tools: SEED_TOOLS,
      lastScanJob: null,
      version: 1
    };
    this.persist();
  }
}

export const partsDb = new PartsDatabase();
