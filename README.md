# 🛠️ DialForge — The Custom Watch Builder & Compatibility Engine

**DialForge** is an open-source, horologically accurate component builder for custom watchmaking (inspired by *PC Part Picker*). It guides watch builders—from beginners assembling their first custom build to seasoned modders—through selecting matching movements, cases, dials, hands, inserts, rotors, and straps with **real-time mechanical compatibility validation**.

---

## ✨ Features

### 1. ⚙️ Universal Movement Support
- **Mechanical / Automatic Calibers**:
  - Seiko TMI **NH35A** (Date @ 3:00)
  - Seiko TMI **NH36A** (Day/Date @ 3:00)
  - Seiko TMI **NH34A GMT** (Independent 24h caller hand stack)
  - Seiko TMI **NH38A** (Sterile / Open-Heart no-date)
  - Seagull / HZ / Dandong **PT5000** (High-beat 28,800 bph ETA 2824 clone)
- **Quartz Calibers**:
  - Seiko TMI **VH31** (Mechanical-like **4 beats-per-second smooth sweep**)
  - Ronda **515 Powertech** (Swiss 1Hz deadbeat ticking quartz)

---

### 2. 🧠 Rigorous Mechanical Compatibility Rules
DialForge checks physical and horological clearance constraints in real time:

- **Hand Pinion Arbor Diameters**:
  - Seiko NH movements require **1.50mm / 0.89mm / 0.21mm** arbors.
  - Quartz (VH31, Ronda) require **1.20mm / 0.70mm / 0.17mm** arbors.
  - Attempting to mount NH hands on VH31 will trigger an immediate blocker error.
- **Movement Casing Spacers**:
  - Detects smaller calibers (like the 23.7mm VH31) placed inside standard 28.5mm / 29mm NH-compatible cases, and automatically prompts builders with a 1-click **"Add VH31 to NH Casing Adapter Ring"** fix.
- **Dial Feet vs. Crown Position**:
  - Evaluates crown positions (3:00, 3.8:00, 4.1:00) against dial feet. If dial feet don't align (or when using quartz movements without matching dial feet), flags the need for dial dot adhesives and wire-cutter trimming.
- **NH34 GMT Hand Stack Clearance**:
  - The NH34 hand pinion stack stands at **5.70mm** tall (0.4mm higher than NH35). DialForge warns if paired with a standard flat sapphire crystal and suggests double-domed sapphire or high-clearance box crystals.
- **Ghost Date Clicks**:
  - Warns when an NH35/NH36 date caliber is paired with a sterile (no-date) dial, alerting users to the redundant crown click position.
- **Rotors on Solid / Quartz Builds**:
  - Flags custom decorated rotors paired with solid steel casebacks (invisible) or quartz calibers (incompatible).

---

### 3. 🎨 Interactive 2D Concentric Visualizer (`WatchCanvas`)
- Concentric vector rendering of the watch case, bezel, chapter ring, dial, and hands.
- **Front View**: Live animated sweeping seconds hand (continuous smooth motion for VH31 / NH35 or 1-second stepped tick for standard quartz).
- **Back View Flip**: Interactive toggle to inspect the exhibition caseback showing decorated rotors or quartz battery & coil shields.

---

### 4. 🛒 Reputable Vendor Sourcing & Deal Badging
DialForge aggregates real market pricing and direct vendor sourcing links across 3 vetted tiers:
- **Tier 1: Premier Mod Houses** (*NamokiMODS, Lucius Atelier, DLW Watches, Tokeilab*) — High QA tolerance, precision finishes.
- **Tier 2: Direct OEM / Vetted Marketplaces** (*Caroline Mod Store, Miuski, Tandorio on AliExpress*) — Budget-friendly, vetted track record.
- **Tier 3: Horological Supply Houses** (*Esslinger, Otto Frei, CousinsUK*) — OEM movements, genuine batteries, specialized watchmaking tools.
- **🏷️ Real-time Deal & Value Badges**: Highlights component listings discounted by 15%+ or offering exceptional value.

---

### 5. 📋 Bill of Materials (BOM) & Build Sharing
- **Total Build Cost Calculator**: Real-time tally with multi-vendor breakdowns.
- **Assembly Tools Checklist**: Hand setting tools, dial dots, caseback openers, rodico putty, and silicone gasket grease.
- **Export to Markdown**: Instant copy-paste formatted table ready for Reddit (`r/SeikoMods`, `r/Watches`) or watchmaking forums.
- **Shareable URL Encoding**: Share your exact build via base64 encoded URL hash!

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ & npm

### Development
```bash
# Clone the repository
cd watch-part-picker

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build
```bash
npm run build
```

The compiled assets will be in `dist/`, ready to deploy to GitHub Pages, Cloudflare Pages, Firebase Hosting, or Vercel.

---

## 📜 License
MIT License
