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
  PartCategory,
  DialStyle,
  CaseStyle,
  HandsStyle,
  StrapType,
  CaseFinish
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

const STORAGE_KEY = 'dialforge_parts_database_v2';

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
          if (parsed.version === 2 && parsed.movements?.length > 0) {
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
          { componentId: 'case-sub-40', componentName: 'Submariner Style 40mm Diver Case', storeName: 'Miuski Official Store', oldPrice: 42.00, newPrice: 34.00, discountPercent: 19 },
          { componentId: 'mov-vh31', componentName: 'Seiko (TMI) VH31 Sweeping Quartz', storeName: 'Tandorio Official', oldPrice: 12.00, newPrice: 8.90, discountPercent: 25 },
          { componentId: 'mov-nh35', componentName: 'Seiko (TMI) NH35A Automatic Caliber', storeName: 'Miuski Official Store', oldPrice: 38.00, newPrice: 31.50, discountPercent: 17 },
          { componentId: 'dial-diver-blue', componentName: 'Ocean Master Dial - Sunburst Royal Blue', storeName: 'Miuski Official Store', oldPrice: 28.00, newPrice: 19.00, discountPercent: 32 },
          { componentId: 'hands-mercedes-silver', componentName: 'Classic Mercedes Lumed Hands (BGW9)', storeName: 'Miuski Official Store', oldPrice: 16.00, newPrice: 11.80, discountPercent: 26 },
          { componentId: 'insert-ceramic-sub-black', componentName: 'Ceramic Diver 120-Click Bezel Insert', storeName: 'Miuski Official Store', oldPrice: 20.00, newPrice: 14.50, discountPercent: 27 },
          { componentId: 'strap-jubilee-20', componentName: 'Solid Link Jubilee Bracelet (20mm)', storeName: 'Miuski Official Store', oldPrice: 36.00, newPrice: 26.90, discountPercent: 25 }
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

  public async fetchLiveMovements(limit = 50): Promise<Movement[]> {
    try {
      const res = await fetch(`https://api.assemble.watch/parts?category=movements&limit=${limit}`);
      if (!res.ok) return this.state.movements;
      const json = await res.json();
      if (!json.data || !Array.isArray(json.data)) return this.state.movements;

      const fetched: Movement[] = json.data.map((item: any) => {
        const ref = item.assets?.specs?.movement_ref || (item.name.includes('NH34') ? 'NH34A' : item.name.includes('NH36') ? 'NH36A' : item.name.includes('NH38') ? 'NH38A' : 'NH35A');
        const isGmt = ref.includes('NH34') || item.name.includes('GMT');
        const hasDay = item.assets?.specs?.has_day || ref.includes('NH36');
        const hasDate = item.assets?.specs?.has_date ?? !ref.includes('NH38');

        return {
          id: item.id,
          name: item.name,
          brand: item.vendor || 'Seiko Instruments / TMI',
          description: `Direct vendor listing from ${item.vendor}. Genuine watch movement caliber.`,
          category: 'movement' as const,
          caliber: ref,
          movementType: 'automatic' as const,
          family: 'NH' as const,
          basePrice: item.price || 50,
          beatsPerHour: 21600,
          beatsPerSecond: 6,
          diameterMm: 27.4,
          thicknessMm: isGmt ? 5.70 : 5.32,
          handHoleSizes: isGmt ? { hour: 1.50, minute: 0.89, second: 0.21, gmt: 2.20 } : { hour: 1.50, minute: 0.89, second: 0.21 },
          hasDate,
          hasDay,
          hasGmt: isGmt,
          imageUrl: item.assets?.main ? (item.assets.main.startsWith('http') ? item.assets.main : `https://assets.assemble.watch${item.assets.main}`) : undefined,
          vendors: [
            {
              id: `v-${item.id}`,
              storeName: item.vendor || 'Direct Vendor',
              tier: 'premier' as const,
              price: item.price || 50,
              productUrl: item.url || 'https://luciusatelier.com',
              inStock: item.in_stock ?? true,
              shippingDaysEstimate: '3-6 days'
            }
          ]
        };
      });

      const existingIds = new Set(this.state.movements.map(m => m.id));
      const newItems = fetched.filter(m => !existingIds.has(m.id));
      if (newItems.length > 0) {
        this.state.movements = [...this.state.movements, ...newItems];
        this.persist();
      }
      return this.state.movements;
    } catch (err) {
      console.error('Failed to fetch live movements:', err);
      return this.state.movements;
    }
  }

  public async fetchLiveCases(limit = 100): Promise<Case[]> {
    try {
      const res = await fetch(`https://api.assemble.watch/parts?category=cases&limit=${limit}`);
      if (!res.ok) return this.state.cases;
      const json = await res.json();
      if (!json.data || !Array.isArray(json.data)) return this.state.cases;

      const fetched: Case[] = json.data.map((item: any) => {
        const lowerName = item.name.toLowerCase();
        let caseStyle: CaseStyle = 'diver';
        if (lowerName.includes('submariner') || lowerName.includes('skx') || lowerName.includes('diver') || lowerName.includes('62mas')) {
          caseStyle = 'diver';
        } else if (lowerName.includes('explorer')) {
          caseStyle = 'explorer';
        } else if (lowerName.includes('field') || lowerName.includes('military')) {
          caseStyle = 'field';
        } else if (lowerName.includes('pilot') || lowerName.includes('flieger')) {
          caseStyle = 'pilot';
        } else if (lowerName.includes('datejust')) {
          caseStyle = 'datejust';
        } else if (lowerName.includes('1908')) {
          caseStyle = '1908';
        } else if (lowerName.includes('gs') || lowerName.includes('62gs')) {
          caseStyle = 'gs';
        } else if (lowerName.includes('bauhaus')) {
          caseStyle = 'bauhaus';
        } else {
          caseStyle = 'dress';
        }

        const diameter = item.assets?.specs?.diameter || (lowerName.includes('36mm') ? 36 : lowerName.includes('38mm') ? 38 : lowerName.includes('42mm') ? 42 : 40);
        const hasBezel = Boolean(item.assets?.specs?.allows_bezel || item.assets?.specs?.requires_bezel_insert || caseStyle === 'diver');
        const isGmt = Boolean(item.assets?.specs?.is_gmt || lowerName.includes('gmt') || lowerName.includes('nh34'));
        const finishTag = item.tags?.find((t: string) => t.startsWith('finish:'))?.replace('finish:', '').toLowerCase() || '';
        const colorTag = item.tags?.find((t: string) => t.startsWith('color:'))?.replace('color:', '').toLowerCase() || '';

        const caseFinish: CaseFinish = finishTag.includes('pvd') || colorTag.includes('black')
          ? 'pvd-black'
          : colorTag.includes('gold')
          ? 'gold'
          : 'brushed-steel';

        const lugWidth: 18 | 20 | 22 = diameter >= 42 ? 22 : diameter <= 34 ? 18 : 20;

        return {
          id: item.id,
          name: item.name,
          brand: item.vendor || 'Custom Mod',
          description: `Engineered modding case by ${item.vendor}. Precision 316L stainless steel architecture.`,
          category: 'case' as const,
          caseStyle,
          outerDiameterMm: diameter,
          lugToLugMm: diameter + 8,
          lugWidthMm: lugWidth,
          thicknessMm: item.assets?.specs?.thickness || (hasBezel ? 13.5 : 11.5),
          dialDiameterFitMm: 28.5,
          crownPosition: lowerName.includes('skx007') || lowerName.includes('skx013') ? '3.8' : '3.0',
          crystalType: isGmt ? 'double-domed-sapphire' : 'flat-sapphire',
          crystalClearanceMm: isGmt ? 1.9 : 1.3,
          waterResistanceM: hasBezel ? 200 : 100,
          caseFinish,
          hasRotatingBezel: hasBezel,
          bezelInsertSize: hasBezel ? {
            outerMm: diameter >= 40 ? 38.0 : 36.5,
            innerMm: diameter >= 40 ? 30.6 : 30.0,
            isSloping: true
          } : undefined,
          hasChapterRing: Boolean(item.assets?.specs?.allows_chapter_ring),
          casebackType: 'exhibition' as const,
          nativeMovementFamily: 'NH' as const,
          basePrice: item.price || 85,
          imageUrl: item.assets?.main ? (item.assets.main.startsWith('http') ? item.assets.main : `https://assets.assemble.watch${item.assets.main}`) : undefined,
          vendors: [
            {
              id: `v-${item.id}`,
              storeName: item.vendor || 'Direct Vendor',
              tier: 'premier' as const,
              price: item.price || 85,
              productUrl: item.url || 'https://luciusatelier.com',
              inStock: item.in_stock ?? true,
              shippingDaysEstimate: '3-6 days'
            }
          ]
        };
      });

      const existingIds = new Set(this.state.cases.map(c => c.id));
      const newItems = fetched.filter(c => !existingIds.has(c.id));
      if (newItems.length > 0) {
        this.state.cases = [...this.state.cases, ...newItems];
        this.persist();
      }
      return this.state.cases;
    } catch (err) {
      console.error('Failed to fetch live cases:', err);
      return this.state.cases;
    }
  }

  public async fetchLiveDials(page = 1, limit = 50): Promise<Dial[]> {
    try {
      const res = await fetch(`https://api.assemble.watch/parts?category=dials&limit=${limit}&page=${page}`);
      if (!res.ok) return this.state.dials;
      const json = await res.json();
      if (!json.data || !Array.isArray(json.data)) return this.state.dials;

      const fetchedDials: Dial[] = json.data.map((item: any) => {
        const textureTag = item.tags?.find((t: string) => t.startsWith('dial-texture:'))?.replace('dial-texture:', '').toLowerCase() || 'matte';
        const colorTag = item.tags?.find((t: string) => t.startsWith('color:'))?.replace('color:', '') || 'Custom';
        const hasDate = item.tags?.some((t: string) => t === 'feature:Date' || t === 'feature:Day/Date');

        const lowerName = item.name.toLowerCase();
        let dialStyle: DialStyle = 'dress';
        if (lowerName.includes('diver') || lowerName.includes('submariner') || lowerName.includes('62mas') || lowerName.includes('skx') || lowerName.includes('marine')) {
          dialStyle = 'diver';
        } else if (lowerName.includes('art') || lowerName.includes('wave') || lowerName.includes('kanagawa') || lowerName.includes('starry') || lowerName.includes('fuji') || lowerName.includes('sakura') || lowerName.includes('manga') || lowerName.includes('koi') || lowerName.includes('bitcoin')) {
          dialStyle = 'art';
        } else if (lowerName.includes('explorer') || lowerName.includes('1016') || lowerName.includes('ranger')) {
          dialStyle = 'explorer';
        } else if (lowerName.includes('field') || lowerName.includes('military') || lowerName.includes('khaki')) {
          dialStyle = 'field';
        } else if (lowerName.includes('flieger') || lowerName.includes('pilot') || lowerName.includes('aviator') || lowerName.includes('b-uhr')) {
          dialStyle = 'flieger';
        } else if (lowerName.includes('minimal') || lowerName.includes('sector') || lowerName.includes('calatrava')) {
          dialStyle = 'minimalist';
        }

        return {
          id: item.id,
          name: item.name,
          brand: item.vendor || 'Custom Mod',
          description: `Authentic modding dial by ${item.vendor}. Direct vendor product listing.`,
          category: 'dial' as const,
          basePrice: item.price || 45,
          diameterMm: 28.5,
          dialStyle,
          colorName: colorTag,
          colorHex: '#18181b',
          indicesStyle: 'dots-and-batons' as const,
          lume: (item.assets?.specs?.lume as any) || 'BGW9',
          dialFeetPositions: ['3.0', '3.8'],
          dateWindow: hasDate ? ('3.0' as const) : ('none' as const),
          texture: textureTag.includes('sunburst') ? 'sunburst' : textureTag.includes('enamel') ? 'enamel' : textureTag.includes('pearl') ? 'mother-of-pearl' : textureTag.includes('guilloche') ? 'guilloche' : 'matte',
          imageUrl: item.assets?.main ? (item.assets.main.startsWith('http') ? item.assets.main : `https://assets.assemble.watch${item.assets.main}`) : undefined,
          vendors: [
            {
              id: `v-${item.id}`,
              storeName: item.vendor || 'Direct Vendor',
              tier: 'premier' as const,
              price: item.price || 45,
              productUrl: item.url || 'https://luciusatelier.com',
              inStock: item.in_stock ?? true
            }
          ]
        };
      });

      const existingIds = new Set(this.state.dials.map(d => d.id));
      const newDials = fetchedDials.filter(d => !existingIds.has(d.id));
      if (newDials.length > 0) {
        this.state.dials = [...this.state.dials, ...newDials];
        this.persist();
      }
      return this.state.dials;
    } catch (err) {
      console.error('Failed to fetch live dials:', err);
      return this.state.dials;
    }
  }

  public async fetchLiveHands(limit = 100): Promise<Hands[]> {
    try {
      const res = await fetch(`https://api.assemble.watch/parts?category=hands&limit=${limit}`);
      if (!res.ok) return this.state.hands;
      const json = await res.json();
      if (!json.data || !Array.isArray(json.data)) return this.state.hands;

      const fetched: Hands[] = json.data.map((item: any) => {
        const lowerName = item.name.toLowerCase();
        let handsStyle: HandsStyle = 'dauphine';
        if (lowerName.includes('mercedes')) handsStyle = 'mercedes';
        else if (lowerName.includes('snowflake')) handsStyle = 'snowflake';
        else if (lowerName.includes('baton')) handsStyle = 'baton';
        else if (lowerName.includes('sword')) handsStyle = 'sword';
        else if (lowerName.includes('breguet')) handsStyle = 'breguet';
        else if (lowerName.includes('alpha')) handsStyle = 'alpha';
        else if (lowerName.includes('flieger') || lowerName.includes('pilot')) handsStyle = 'flieger';
        else if (lowerName.includes('dauphine') || lowerName.includes('gs')) handsStyle = 'dauphine';

        const isGmt = lowerName.includes('gmt') || Boolean(item.tags?.includes('feature:GMT'));
        const colorTag = item.tags?.find((t: string) => t.startsWith('color:'))?.replace('color:', '').toLowerCase() || '';

        const finish: 'silver' | 'gold' | 'black' | 'rose-gold' | 'heat-blued' | 'blue' =
          colorTag.includes('gold') ? 'gold'
          : colorTag.includes('black') ? 'black'
          : colorTag.includes('rose') ? 'rose-gold'
          : colorTag.includes('blue') ? 'heat-blued'
          : 'silver';

        const hour = item.assets?.components?.hour ? (item.assets.components.hour.startsWith('http') ? item.assets.components.hour : `https://assets.assemble.watch${item.assets.components.hour}`) : undefined;
        const minute = item.assets?.components?.minute ? (item.assets.components.minute.startsWith('http') ? item.assets.components.minute : `https://assets.assemble.watch${item.assets.components.minute}`) : undefined;
        const second = item.assets?.components?.second ? (item.assets.components.second.startsWith('http') ? item.assets.components.second : `https://assets.assemble.watch${item.assets.components.second}`) : undefined;

        return {
          id: item.id,
          name: item.name,
          brand: item.vendor || 'Custom Mod',
          description: `Diamond-cut watch hands by ${item.vendor}. Precision arbor fitting for NH-series pinions.`,
          category: 'hands' as const,
          handsStyle,
          handHoleSizes: isGmt
            ? { hour: 1.50, minute: 0.89, second: 0.21, gmt: 2.20 }
            : { hour: 1.50, minute: 0.89, second: 0.21 },
          lume: lowerName.includes('c3') ? 'C3' : lowerName.includes('bgw9') ? 'BGW9' : 'None',
          finish,
          compatibleMovementFamilies: ['NH' as const],
          basePrice: item.price || 28,
          handComponents: hour && minute && second ? { hour, minute, second } : undefined,
          imageUrl: item.assets?.thumbnail ? (item.assets.thumbnail.startsWith('http') ? item.assets.thumbnail : `https://assets.assemble.watch${item.assets.thumbnail}`) : undefined,
          vendors: [
            {
              id: `v-${item.id}`,
              storeName: item.vendor || 'Direct Vendor',
              tier: 'premier' as const,
              price: item.price || 28,
              productUrl: item.url || 'https://luciusatelier.com',
              inStock: item.in_stock ?? true,
              shippingDaysEstimate: '3-6 days'
            }
          ]
        };
      });

      const existingIds = new Set(this.state.hands.map(h => h.id));
      const newItems = fetched.filter(h => !existingIds.has(h.id));
      if (newItems.length > 0) {
        this.state.hands = [...this.state.hands, ...newItems];
        this.persist();
      }
      return this.state.hands;
    } catch (err) {
      console.error('Failed to fetch live hands:', err);
      return this.state.hands;
    }
  }

  public async fetchLiveBezelInserts(limit = 100): Promise<BezelInsert[]> {
    try {
      const res = await fetch(`https://api.assemble.watch/parts?category=bezel_inserts&limit=${limit}`);
      if (!res.ok) return this.state.bezelInserts;
      const json = await res.json();
      if (!json.data || !Array.isArray(json.data)) return this.state.bezelInserts;

      const fetched: BezelInsert[] = json.data.map((item: any) => {
        const lowerName = item.name.toLowerCase();
        const isGmt = lowerName.includes('gmt') || lowerName.includes('dual time') || Boolean(item.tags?.includes('bezel-type:GMT'));
        const isSkx013 = lowerName.includes('skx013');

        const materialTag = item.tags?.find((t: string) => t.startsWith('material:'))?.replace('material:', '').toLowerCase() || '';
        const material: 'ceramic' | 'aluminum' | 'steel' = materialTag.includes('alum') ? 'aluminum' : materialTag.includes('steel') ? 'steel' : 'ceramic';

        let color1 = 'Black';
        let color1Hex = '#18181b';
        let color2Hex: string | undefined = undefined;

        if (lowerName.includes('pepsi')) {
          color1Hex = '#1e3a8a';
          color2Hex = '#dc2626';
        } else if (lowerName.includes('batman')) {
          color1Hex = '#18181b';
          color2Hex = '#2563eb';
        } else if (lowerName.includes('coca-cola') || lowerName.includes('coke')) {
          color1Hex = '#18181b';
          color2Hex = '#dc2626';
        } else if (lowerName.includes('blue')) {
          color1Hex = '#1e3a8a';
        } else if (lowerName.includes('green') || lowerName.includes('kermit') || lowerName.includes('hulk')) {
          color1Hex = '#065f46';
        } else if (lowerName.includes('silver') || lowerName.includes('yacht')) {
          color1Hex = '#94a3b8';
        }

        return {
          id: item.id,
          name: item.name,
          brand: item.vendor || 'Custom Mod',
          description: `Precision bezel insert by ${item.vendor}. Scratch-resistant ${material} construction.`,
          category: 'bezel-insert' as const,
          style: isGmt ? ('gmt-24hr' as const) : ('diver-60min' as const),
          material,
          color1,
          color1Hex,
          color2Hex,
          outerMm: isSkx013 ? 36.5 : 38.0,
          innerMm: isSkx013 ? 30.0 : 30.6,
          isSloping: item.assets?.specs?.is_sloped ?? true,
          basePrice: item.price || 38,
          imageUrl: item.assets?.main ? (item.assets.main.startsWith('http') ? item.assets.main : `https://assets.assemble.watch${item.assets.main}`) : undefined,
          vendors: [
            {
              id: `v-${item.id}`,
              storeName: item.vendor || 'Direct Vendor',
              tier: 'premier' as const,
              price: item.price || 38,
              productUrl: item.url || 'https://luciusatelier.com',
              inStock: item.in_stock ?? true,
              shippingDaysEstimate: '3-6 days'
            }
          ]
        };
      });

      const existingIds = new Set(this.state.bezelInserts.map(b => b.id));
      const newItems = fetched.filter(b => !existingIds.has(b.id));
      if (newItems.length > 0) {
        this.state.bezelInserts = [...this.state.bezelInserts, ...newItems];
        this.persist();
      }
      return this.state.bezelInserts;
    } catch (err) {
      console.error('Failed to fetch live bezel inserts:', err);
      return this.state.bezelInserts;
    }
  }

  public async fetchLiveStraps(limit = 100): Promise<Strap[]> {
    try {
      const [braceletsRes, strapsRes] = await Promise.all([
        fetch(`https://api.assemble.watch/parts?category=bracelets&limit=${limit}`),
        fetch(`https://api.assemble.watch/parts?category=straps&limit=${limit}`)
      ]);

      const braceletsJson = braceletsRes.ok ? await braceletsRes.json() : { data: [] };
      const strapsJson = strapsRes.ok ? await strapsRes.json() : { data: [] };

      const allItems = [...(braceletsJson.data || []), ...(strapsJson.data || [])];

      const fetched: Strap[] = allItems.map((item: any) => {
        const lowerName = item.name.toLowerCase();
        let strapType: StrapType = 'oyster-steel';

        if (lowerName.includes('jubilee')) strapType = 'jubilee-steel';
        else if (lowerName.includes('president')) strapType = 'president-steel';
        else if (lowerName.includes('gs') && lowerName.includes('bracelet')) strapType = 'gs-steel';
        else if (lowerName.includes('oyster')) strapType = 'oyster-steel';
        else if (lowerName.includes('rubber') || lowerName.includes('fkm')) strapType = 'fkm-rubber';
        else if (lowerName.includes('nato')) strapType = 'nato-nylon';
        else if (lowerName.includes('cordovan') || lowerName.includes('leather')) strapType = 'vintage-leather';

        const colorTag = item.tags?.find((t: string) => t.startsWith('color:'))?.replace('color:', '') || 'Silver';
        const colorHex = colorTag.toLowerCase().includes('black')
          ? '#18181b'
          : colorTag.toLowerCase().includes('brown')
          ? '#78350f'
          : colorTag.toLowerCase().includes('blue')
          ? '#1e3a8a'
          : '#cbd5e1';

        const lugWidth = item.assets?.specs?.lug_width === 22 ? 22 : item.assets?.specs?.lug_width === 18 ? 18 : 20;

        return {
          id: item.id,
          name: item.name,
          brand: item.vendor || 'Custom Mod',
          description: `Premium strap / bracelet by ${item.vendor}. Engineered for high comfort and durability.`,
          category: 'strap' as const,
          strapType,
          lugWidthMm: lugWidth as 18 | 20 | 22,
          colorName: colorTag,
          colorHex,
          hardwareFinish: colorHex === '#18181b' ? 'pvd-black' : 'brushed-steel',
          basePrice: item.price || 48,
          imageUrl: item.assets?.main ? (item.assets.main.startsWith('http') ? item.assets.main : `https://assets.assemble.watch${item.assets.main}`) : undefined,
          vendors: [
            {
              id: `v-${item.id}`,
              storeName: item.vendor || 'Direct Vendor',
              tier: 'premier' as const,
              price: item.price || 48,
              productUrl: item.url || 'https://luciusatelier.com',
              inStock: item.in_stock ?? true,
              shippingDaysEstimate: '3-6 days'
            }
          ]
        };
      });

      const existingIds = new Set(this.state.straps.map(s => s.id));
      const newItems = fetched.filter(s => !existingIds.has(s.id));
      if (newItems.length > 0) {
        this.state.straps = [...this.state.straps, ...newItems];
        this.persist();
      }
      return this.state.straps;
    } catch (err) {
      console.error('Failed to fetch live straps:', err);
      return this.state.straps;
    }
  }

  public async fetchLiveAll(): Promise<{ movements: number; cases: number; dials: number; hands: number; bezelInserts: number; straps: number }> {
    const [movements, cases, dials, hands, bezelInserts, straps] = await Promise.all([
      this.fetchLiveMovements(50),
      this.fetchLiveCases(100),
      this.fetchLiveDials(1, 100),
      this.fetchLiveHands(100),
      this.fetchLiveBezelInserts(100),
      this.fetchLiveStraps(100)
    ]);

    return {
      movements: movements.length,
      cases: cases.length,
      dials: dials.length,
      hands: hands.length,
      bezelInserts: bezelInserts.length,
      straps: straps.length
    };
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
      version: 2
    };
    this.persist();
  }
}

export const partsDb = new PartsDatabase();
