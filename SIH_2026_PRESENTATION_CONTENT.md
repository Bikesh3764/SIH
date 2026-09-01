# 🌾 SMART INDIA HACKATHON (SIH 2026) OFFICIAL PRESENTATION
## Project: AgriShield AI
### Predictive Farm Distress Mitigation & Multilingual AI Agronomy Platform

---

## 📌 SLIDE 1: TITLE PAGE

* **Project Title:** AgriShield AI
* **Theme:** Agriculture, FoodTech & Rural Development
* **Category:** Software
* **Problem Statement Title:** Predictive Farm Distress Mitigation & Multilingual AI Agronomy Platform
* **Team Name:** [Your Registered Team Name]
* **Team ID:** [Your Registered Team ID]
* **Problem Statement ID:** [Your Problem Statement ID]

---

## 📌 SLIDE 2: PROPOSED SOLUTION & INNOVATION

### 1. Proposed Solution (Working Prototype Overview):
* **Predictive Farm Distress-Risk Index (FDI):** A real-time 3-pillar calculation engine that computes a 0–100 distress score by combining:
  1. **14-Day Cumulative Climate Telemetry (40% Weight):** Past 7-day rainfall sum + next 7-day forecast + root-zone soil saturation (0–7cm).
  2. **APMC Mandi Realization & Price Crash Radar (35% Weight):** Real-time district mandi prices compared against official CACP Minimum Support Prices (MSP).
  3. **KCC Debt Proximity (25% Weight):** Active crop loan repayment countdown.
* **Crop Disease Vision AI:** Farmers upload a photo of an infected leaf to receive instant disease identification, severity assessment, and dual remedies (**Organic Biological + Chemical Dosages**).
* **Kisan Voice AI Assistant:** An interactive voice-enabled chatbot allowing farmers to speak or type agronomy queries and listen to audio responses in **6 Indian languages**.
* **Live Mandi Radar:** Direct AGMARKNET spot prices across district mandis with MSP comparisons and Sell / Hold advisories.
* **Hyperlocal Weather & Dynamic Farming Advisories:** Real-time 24-hour timeline, 7-day forecast, and automated advisories for watering, fungal spore risk, and harvesting windows.
* **Direct Benefit Govt Schemes:** Categorized directory of central & state agricultural subsidies with direct portal access and eligibility guidelines.

### 2. Innovation & Uniqueness (USP):
* **14-Day Dual-Window Climate Analysis:** Assesses cumulative 14-day rainfall volume to accurately distinguish between **Waterlogging / Root Rot threats** and **Prolonged Drought Spells**.
* **Real-time Price Crash Detection:** Automatically identifies when APMC commodity spot rates trade below government MSP floor rates.
* **Unified Agronomic Cockpit:** Connects weather, market prices, crop disease diagnosis, and debt tracking into a single cohesive farmer dashboard.
* **Full 6-Language Localization:** 100% native translation and voice support in **Hindi, Odia, Marathi, Punjabi, Malayalam, and English**.

---

## 📌 SLIDE 3: TECHNICAL APPROACH

### 1. Technologies & Frameworks Used:
* **Frontend Framework:** React.js 18 with Vite 6 Build System
* **UI & Styling:** Tailwind CSS 3 (Apple SF-Pro Glassmorphism Theme), Lucide Icons
* **Animation Engine:** Framer Motion (Hardware-accelerated fluid UI)
* **AI & Vision Model:** Google Gemini 3.5 Flash Lite (Multimodal Vision & Conversational AI)
* **Live Mandi Telemetry:** Open Government Data Platform (data.gov.in AGMARKNET API)
* **Live Weather Telemetry:** Open-Meteo Global WMO Satellite API
* **Speech Processing:** Web Speech Recognition & SpeechSynthesis APIs

### 2. Architecture & Data Flow:

```
[Farmer Input: Voice / Leaf Image / District]
                    │
                    ▼
       [AgriShield AI Web App]
                    │
   ┌────────────────┼────────────────┐
   │                │                │
   ▼                ▼                ▼
[Google Gemini AI] [data.gov.in API] [Open-Meteo API]
Vision Pathology   AGMARKNET Feed    14-Day Rainfall
Voice Agronomy     MSP Comparison    Soil Moisture 0-7cm
   │                │                │
   └────────────────┼────────────────┘
                    │
                    ▼
[Farm Distress-Risk Index (FDI) Engine]
Score = (0.40 × Climate) + (0.35 × Market) + (0.25 × Debt)
                    │
                    ▼
[Actionable Visual Dashboard & Voice Output]
```

---

## 📌 SLIDE 4: FEASIBILITY, CHALLENGES & MITIGATION

### 1. Feasibility Analysis:
* **Technical Feasibility:** 100% functional working prototype tested with real-time satellite feeds and live government data.
* **Operational Feasibility:** Voice-first interface and intuitive visual color indicators (Green / Yellow / Red) make it usable for farmers with varying literacy levels.
* **Economic Feasibility:** Built entirely on open APIs and web technologies, eliminating the need for expensive field hardware or paid farmer subscriptions.

### 2. Real Challenges & Practical Mitigations:

* **Challenge 1: Regional Language & Literacy Barriers**
  * *Reality:* Many farmers prefer speaking in regional languages rather than typing complex agricultural terms.
  * *Mitigation:* Integrated 6-language voice input and text-to-speech audio playback across Hindi, Odia, Marathi, Punjabi, Malayalam, and English.

* **Challenge 2: Inconsistent Smartphone Camera Conditions in the Field**
  * *Reality:* Photos taken in farms may have shadows, glare, or motion blur.
  * *Mitigation:* Gemini Multimodal Vision AI processes leaf texture, discoloration patterns, and pustules simultaneously to classify diseases accurately.

* **Challenge 3: APMC Market Price Volatility & Distance Disparities**
  * *Reality:* Commodity prices vary widely between neighboring mandis.
  * *Mitigation:* Aggregates all active commodities across the district's mandis and benchmarks modal rates against official CACP MSP floors to highlight price crashes.

---

## 📌 SLIDE 5: IMPACT AND BENEFITS

### 1. Impact on Farmers & Agriculture:
* **Small & Marginal Farmers:** Early alerts on adverse weather, crop disease treatments, and MSP realization prevent financial loss.
* **Timely Agronomic Decisions:** Actionable advisories on when to irrigate, spray biopesticides, or harvest produce.
* **Reduced Dependency on Middlemen:** Transparent APMC spot prices empower farmers to negotiate fair rates.

### 2. Core Tangible Benefits:
* **Input Cost Savings:** Dual organic + chemical remedies prevent excessive, incorrect pesticide purchases.
* **Price Realization:** Mandi radar guides farmers to sell at peak market windows.
* **Debt Default Prevention:** Dynamic loan due date countdown keeps repayment timelines visible alongside farm income trends.

---

## 📌 SLIDE 6: RESEARCH AND REFERENCES

1. **Ministry of Agriculture & Farmers Welfare, Government of India:**
   * AGMARKNET Daily Mandi Prices & Arrivals Data (`data.gov.in`)
2. **Commission for Agricultural Costs and Prices (CACP):**
   * Official Minimum Support Price (MSP) Reports & Cost of Cultivation Standards.
3. **Open-Meteo & World Meteorological Organization (WMO):**
   * Global High-Resolution Numerical Weather & Soil Moisture Telemetry.
4. **Google Cloud AI / Google DeepMind:**
   * Gemini Multimodal Generative AI Documentation.
5. **Indian Council of Agricultural Research (ICAR):**
   * Standard Crop Disease Diagnosis & Integrated Pest Management (IPM) Practices.
