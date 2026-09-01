import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  RotateCw, 
  MapPin, 
  Store, 
  Sparkles,
  Info,
  Calendar,
  Layers,
  ChevronDown
} from 'lucide-react';
import { DISTRICTS_DATA } from '../data/mockAgriData';
import { TRANSLATIONS } from '../data/translations';
import AppleSelect from '../components/AppleSelect';
import { fetchLiveDistrictMandiFeed } from '../services/mandiService';

const DISTRICT_DATA_STORE = {
  rourkela: {
    districtName: 'Rourkela (Sundargarh)',
    stateName: 'Odisha',
    markets: [
      { id: 'panposh', name: 'Rourkela (Panposh APMC)', premium: 0 },
      { id: 'sundargarh_main', name: 'Sundargarh Main Mandi', premium: 30 },
      { id: 'rajgangpur', name: 'Rajgangpur Sub-Yard', premium: -10 },
      { id: 'bonai', name: 'Bonai Market Yard', premium: -25 }
    ],
    crops: {
      Paddy: {
        name: 'Paddy / Dhan (Swarna Grade-A)',
        unit: '₹ / quintal',
        basePrice: 2420,
        minPrice: 2360,
        maxPrice: 2480,
        msp: 2183,
        trend: 'up',
        change: '+4.8%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-50, -35, -20, -30, -10, +15, 0],
        nearby: [
          { name: 'Sundargarh Central APMC', type: 'Principal Yard', price: 2450, min: 2390, max: 2510 },
          { name: 'Rajgangpur APMC', type: 'Sub-Market Yard', price: 2410, min: 2350, max: 2460 },
          { name: 'Jharsuguda Mandi', type: 'Regional Hub', price: 2480, min: 2420, max: 2530 },
          { name: 'Sambalpur APMC', type: 'Major APMC Yard', price: 2510, min: 2450, max: 2560 }
        ]
      },
      Mustard: {
        name: 'Mustard / Rai (Pusa Bold)',
        unit: '₹ / quintal',
        basePrice: 5680,
        minPrice: 5500,
        maxPrice: 5850,
        msp: 5050,
        trend: 'up',
        change: '+3.2%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-80, -60, -40, -15, -30, +20, 0],
        nearby: [
          { name: 'Sundargarh Central APMC', type: 'Principal Yard', price: 5720, min: 5550, max: 5880 },
          { name: 'Jharsuguda Mandi', type: 'Regional Hub', price: 5760, min: 5600, max: 5920 },
          { name: 'Rourkela Panposh', type: 'APMC Market', price: 5680, min: 5500, max: 5850 },
          { name: 'Sambalpur APMC', type: 'Major Yard', price: 5800, min: 5650, max: 5950 }
        ]
      },
      Tomato: {
        name: 'Tomato (Utkal Deepti Fresh)',
        unit: '₹ / kg',
        basePrice: 28,
        minPrice: 24,
        maxPrice: 32,
        msp: 15,
        trend: 'up',
        change: '+8.5%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-4, -3, -1, -2, 0, +2, 0],
        nearby: [
          { name: 'Panposh Sabzi Mandi', type: 'Vegetable APMC', price: 28, min: 24, max: 32 },
          { name: 'Sundargarh Mandi', type: 'District Market', price: 30, min: 26, max: 34 },
          { name: 'Rajgangpur Market', type: 'Sub-Yard', price: 27, min: 23, max: 31 },
          { name: 'Rourkela Daily Haat', type: 'Farmer Market', price: 29, min: 25, max: 33 }
        ]
      },
      Groundnut: {
        name: 'Groundnut / Peanut (Bold Seed)',
        unit: '₹ / quintal',
        basePrice: 6450,
        minPrice: 6200,
        maxPrice: 6700,
        msp: 5850,
        trend: 'up',
        change: '+2.1%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-100, -70, -40, -50, -20, +10, 0],
        nearby: [
          { name: 'Sundargarh Central APMC', type: 'Principal Yard', price: 6500, min: 6250, max: 6750 },
          { name: 'Jharsuguda APMC', type: 'Regional Hub', price: 6540, min: 6300, max: 6800 },
          { name: 'Sambalpur APMC', type: 'Major APMC', price: 6580, min: 6350, max: 6850 },
          { name: 'Bargarh Mandi', type: 'Terminal Yard', price: 6620, min: 6400, max: 6900 }
        ]
      }
    }
  },

  yavatmal: {
    districtName: 'Yavatmal',
    stateName: 'Maharashtra',
    markets: [
      { id: 'yavatmal_main', name: 'Yavatmal APMC Main', premium: 0 },
      { id: 'wani', name: 'Wani Cotton Market', premium: 50 },
      { id: 'pusad', name: 'Pusad APMC', premium: -20 },
      { id: 'darwha', name: 'Darwha Mandi Yard', premium: -35 }
    ],
    crops: {
      Cotton: {
        name: 'Cotton (कपास - Bt-II Medium Staple)',
        unit: '₹ / quintal',
        basePrice: 6890,
        minPrice: 6700,
        maxPrice: 7150,
        msp: 6620,
        trend: 'up',
        change: '+3.4%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-120, -80, -60, -90, -40, +30, 0],
        nearby: [
          { name: 'Wani APMC', type: 'Cotton Market Hub', price: 6940, min: 6750, max: 7200 },
          { name: 'Wardha Mandi', type: 'Principal APMC', price: 6910, min: 6720, max: 7180 },
          { name: 'Amravati Cotton Yard', type: 'Major Regional Hub', price: 7020, min: 6800, max: 7280 },
          { name: 'Akola APMC', type: 'Central APMC Yard', price: 6850, min: 6680, max: 7100 }
        ]
      },
      Soybean: {
        name: 'Soybean (सोयाबीन - Yellow JS-335)',
        unit: '₹ / quintal',
        basePrice: 4720,
        minPrice: 4550,
        maxPrice: 4890,
        msp: 4600,
        trend: 'down',
        change: '-4.1%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [+140, +110, +80, +95, +40, -10, 0],
        nearby: [
          { name: 'Yavatmal APMC', type: 'Principal Yard', price: 4720, min: 4550, max: 4890 },
          { name: 'Pusad Mandi', type: 'Sub-Yard', price: 4760, min: 4600, max: 4920 },
          { name: 'Washim APMC', type: 'Regional Hub', price: 4810, min: 4650, max: 4980 },
          { name: 'Akola Mandi', type: 'Major APMC', price: 4790, min: 4620, max: 4950 }
        ]
      },
      Wheat: {
        name: 'Wheat (गेहूं - Lokwan Grade-1)',
        unit: '₹ / quintal',
        basePrice: 2460,
        minPrice: 2380,
        maxPrice: 2540,
        msp: 2275,
        trend: 'up',
        change: '+2.1%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-40, -25, -15, -20, -5, +10, 0],
        nearby: [
          { name: 'Yavatmal Main', type: 'APMC Market', price: 2460, min: 2380, max: 2540 },
          { name: 'Wardha APMC', type: 'Grain Hub', price: 2490, min: 2410, max: 2570 },
          { name: 'Nagpur Mandi', type: 'Terminal Market', price: 2550, min: 2480, max: 2620 },
          { name: 'Amravati APMC', type: 'Principal Yard', price: 2480, min: 2400, max: 2560 }
        ]
      },
      Toor: {
        name: 'Toor / Arhar (तुवर दाल - Desi Red)',
        unit: '₹ / quintal',
        basePrice: 9850,
        minPrice: 9400,
        maxPrice: 10200,
        msp: 7000,
        trend: 'up',
        change: '+7.5%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-250, -180, -120, -150, -60, +40, 0],
        nearby: [
          { name: 'Yavatmal APMC', type: 'Pulse Hub', price: 9850, min: 9400, max: 10200 },
          { name: 'Latur Dal Market', type: 'Asia Largest Pulse Hub', price: 10150, min: 9700, max: 10500 },
          { name: 'Akola APMC', type: 'Major APMC', price: 9920, min: 9500, max: 10300 },
          { name: 'Washim Mandi', type: 'District Yard', price: 9890, min: 9450, max: 10250 }
        ]
      }
    }
  },

  ernakulam: {
    districtName: 'Ernakulam',
    stateName: 'Kerala',
    markets: [
      { id: 'ernakulam_central', name: 'Ernakulam Central Market', premium: 0 },
      { id: 'aluva', name: 'Aluva APMC Yard', premium: 30 },
      { id: 'kothamangalam', name: 'Kothamangalam Yard', premium: -15 },
      { id: 'perumbavoor', name: 'Perumbavoor Market', premium: 10 }
    ],
    crops: {
      Rice: {
        name: 'Rice / Matta Paddy (Grade-A)',
        unit: '₹ / quintal',
        basePrice: 2400,
        minPrice: 2320,
        maxPrice: 2480,
        msp: 2183,
        trend: 'up',
        change: '+5.2%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-60, -45, -30, -35, -15, +10, 0],
        nearby: [
          { name: 'Aluva APMC Market', type: 'Principal Yard', price: 2430, min: 2350, max: 2510 },
          { name: 'Kottayam Pampady APMC', type: 'Regional APMC', price: 2390, min: 2310, max: 2470 },
          { name: 'Thrissur Central Mandi', type: 'Major Market Yard', price: 2460, min: 2380, max: 2540 },
          { name: 'Palakkad Paddy Yard', type: 'Grain Hub', price: 2490, min: 2410, max: 2570 }
        ]
      },
      Coconut: {
        name: 'Coconut (Dry & Fresh Large)',
        unit: '₹ / piece',
        basePrice: 35,
        minPrice: 32,
        maxPrice: 38,
        msp: 28,
        trend: 'neutral',
        change: '0.0%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-1, 0, -1, 0, 0, +1, 0],
        nearby: [
          { name: 'Ernakulam Broadway', type: 'Wholesale Yard', price: 35, min: 32, max: 38 },
          { name: 'Aluva Coconut Yard', type: 'APMC Market', price: 36, min: 33, max: 39 },
          { name: 'Kottayam Market', type: 'District Yard', price: 34, min: 31, max: 37 },
          { name: 'Kozhikode Mandi', type: 'Major Hub', price: 38, min: 35, max: 41 }
        ]
      },
      Pepper: {
        name: 'Black Pepper (Garbled MG-1)',
        unit: '₹ / kg',
        basePrice: 520,
        minPrice: 490,
        maxPrice: 550,
        msp: 450,
        trend: 'up',
        change: '+8.1%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-18, -12, -8, -10, -4, +3, 0],
        nearby: [
          { name: 'Kochi Spices Exchange', type: 'National Spices Board Hub', price: 520, min: 490, max: 550 },
          { name: 'Idukki Spices Yard', type: 'Plantation APMC', price: 535, min: 505, max: 565 },
          { name: 'Kumily Spices APMC', type: 'Spices Market', price: 540, min: 510, max: 570 },
          { name: 'Wayanad Pepper Mandi', type: 'Regional Hub', price: 515, min: 485, max: 545 }
        ]
      }
    }
  },

  nashik: {
    districtName: 'Nashik',
    stateName: 'Maharashtra',
    markets: [
      { id: 'lasalgaon', name: 'Lasalgaon APMC (Asia Largest Onion)', premium: 70 },
      { id: 'nashik_main', name: 'Nashik Main Mandi', premium: 0 },
      { id: 'pimpalgaon', name: 'Pimpalgaon APMC Yard', premium: 30 },
      { id: 'yeola', name: 'Yeola Market Yard', premium: -40 }
    ],
    crops: {
      Onion: {
        name: 'Onion (लाल प्याज - Lasalgaon Bold)',
        unit: '₹ / quintal',
        basePrice: 2850,
        minPrice: 2600,
        maxPrice: 3150,
        msp: 1800,
        trend: 'up',
        change: '+9.4%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-150, -110, -70, -85, -30, +25, 0],
        nearby: [
          { name: 'Lasalgaon APMC', type: 'Asia Largest Onion Hub', price: 2920, min: 2680, max: 3220 },
          { name: 'Pimpalgaon Yard', type: 'Major APMC', price: 2880, min: 2640, max: 3180 },
          { name: 'Yeola APMC', type: 'Sub-Market Yard', price: 2810, min: 2580, max: 3100 },
          { name: 'Pune APMC', type: 'Terminal Market', price: 2980, min: 2750, max: 3300 }
        ]
      },
      Tomato: {
        name: 'Tomato (टमाटर - Hybrid Red Grade-A)',
        unit: '₹ / kg',
        basePrice: 28,
        minPrice: 24,
        maxPrice: 32,
        msp: 15,
        trend: 'up',
        change: '+12.0%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-5, -4, -2, -3, -1, +2, 0],
        nearby: [
          { name: 'Pimpalgaon Mandi', type: 'Tomato Hub', price: 29, min: 25, max: 33 },
          { name: 'Nashik Main Yard', type: 'District APMC', price: 28, min: 24, max: 32 },
          { name: 'Narayangaon APMC', type: 'Major Tomato Market', price: 31, min: 27, max: 35 },
          { name: 'Mumbai Vashi APMC', type: 'Terminal Mega Market', price: 34, min: 30, max: 38 }
        ]
      },
      Grapes: {
        name: 'Grapes (अंगूर - Thompson Export)',
        unit: '₹ / kg',
        basePrice: 85,
        minPrice: 75,
        maxPrice: 98,
        msp: 60,
        trend: 'up',
        change: '+4.5%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-6, -4, -3, -5, -2, +1, 0],
        nearby: [
          { name: 'Pimpalgaon Grapes Yard', type: 'Export Quality Hub', price: 88, min: 78, max: 101 },
          { name: 'Nashik Mandi', type: 'District Market', price: 85, min: 75, max: 98 },
          { name: 'Sangli APMC', type: 'Major Grapes APMC', price: 92, min: 82, max: 105 },
          { name: 'Pune Yard', type: 'Regional Hub', price: 90, min: 80, max: 103 }
        ]
      }
    }
  },

  karnal: {
    districtName: 'Karnal',
    stateName: 'Haryana',
    markets: [
      { id: 'karnal_grain', name: 'Karnal Grain Market', premium: 0 },
      { id: 'taraori', name: 'Taraori Basmati APMC', premium: 70 },
      { id: 'gharaunda', name: 'Gharaunda Sub-Yard', premium: -20 },
      { id: 'nilokheri', name: 'Nilokheri Mandi', premium: -15 }
    ],
    crops: {
      Basmati: {
        name: 'Basmati Paddy (Pusa 1121 Super Aromatic)',
        unit: '₹ / quintal',
        basePrice: 3850,
        minPrice: 3650,
        maxPrice: 4100,
        msp: 2183,
        trend: 'up',
        change: '+4.2%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-90, -70, -45, -55, -20, +25, 0],
        nearby: [
          { name: 'Taraori Basmati Yard', type: 'World Basmati Hub', price: 3920, min: 3720, max: 4180 },
          { name: 'Kurukshetra APMC', type: 'Principal Yard', price: 3870, min: 3670, max: 4120 },
          { name: 'Panipat Grain Market', type: 'Major Market', price: 3810, min: 3610, max: 4060 },
          { name: 'Ambala APMC', type: 'Regional Hub', price: 3890, min: 3690, max: 4150 }
        ]
      },
      Wheat: {
        name: 'Wheat (गेहूं - HD 2967 Sharbati)',
        unit: '₹ / quintal',
        basePrice: 2480,
        minPrice: 2420,
        maxPrice: 2550,
        msp: 2275,
        trend: 'up',
        change: '+2.8%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-45, -30, -15, -25, -10, +15, 0],
        nearby: [
          { name: 'Karnal Grain Mandi', type: 'District Grain Hub', price: 2480, min: 2420, max: 2550 },
          { name: 'Taraori APMC', type: 'Principal Yard', price: 2500, min: 2440, max: 2570 },
          { name: 'Kurukshetra Yard', type: 'Major APMC', price: 2490, min: 2430, max: 2560 },
          { name: 'Kaithal Mandi', type: 'Sub-Market Yard', price: 2470, min: 2410, max: 2540 }
        ]
      },
      Mustard: {
        name: 'Mustard / Sarson (High Oil 42%)',
        unit: '₹ / quintal',
        basePrice: 5420,
        minPrice: 5250,
        maxPrice: 5600,
        msp: 5050,
        trend: 'up',
        change: '+1.8%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-70, -50, -30, -40, -15, +10, 0],
        nearby: [
          { name: 'Karnal APMC', type: 'Principal Yard', price: 5420, min: 5250, max: 5600 },
          { name: 'Rewari Mustard Yard', type: 'Major Oilseed Hub', price: 5560, min: 5380, max: 5740 },
          { name: 'Hisar Mandi', type: 'Regional APMC', price: 5480, min: 5310, max: 5660 },
          { name: 'Panipat APMC', type: 'Grain & Oilseed Yard', price: 5400, min: 5230, max: 5580 }
        ]
      }
    }
  },

  bathinda: {
    districtName: 'Bathinda',
    stateName: 'Punjab',
    markets: [
      { id: 'bathinda_grain', name: 'Bathinda Grain Market', premium: 0 },
      { id: 'maur_mandi', name: 'Maur Mandi APMC', premium: 20 },
      { id: 'rampura', name: 'Rampura Phul Yard', premium: 10 },
      { id: 'talwandi', name: 'Talwandi Sabo Market', premium: -25 }
    ],
    crops: {
      Wheat: {
        name: 'Wheat (ਕਣਕ - PBW 725 Certified)',
        unit: '₹ / quintal',
        basePrice: 2490,
        minPrice: 2430,
        maxPrice: 2560,
        msp: 2275,
        trend: 'up',
        change: '+3.1%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-55, -35, -20, -30, -10, +15, 0],
        nearby: [
          { name: 'Maur Mandi APMC', type: 'Major Grain Market', price: 2510, min: 2450, max: 2580 },
          { name: 'Mansa APMC', type: 'Principal Yard', price: 2480, min: 2420, max: 2550 },
          { name: 'Muktsar Yard', type: 'District APMC', price: 2470, min: 2410, max: 2540 },
          { name: 'Faridkot APMC', type: 'Regional Hub', price: 2520, min: 2460, max: 2590 }
        ]
      },
      Paddy: {
        name: 'Paddy / Dhan (PR 126 Fine Grade)',
        unit: '₹ / quintal',
        basePrice: 2240,
        minPrice: 2190,
        maxPrice: 2290,
        msp: 2183,
        trend: 'up',
        change: '+1.9%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-30, -20, -10, -15, -5, +10, 0],
        nearby: [
          { name: 'Bathinda Mandi', type: 'Principal Yard', price: 2240, min: 2190, max: 2290 },
          { name: 'Maur APMC', type: 'Grain Market', price: 2260, min: 2210, max: 2310 },
          { name: 'Sunam Grain Yard', type: 'Regional APMC', price: 2280, min: 2230, max: 2330 },
          { name: 'Patiala APMC', type: 'Major Hub', price: 2310, min: 2260, max: 2360 }
        ]
      },
      Cotton: {
        name: 'Cotton (ਨਰਮਾ - Narma Long Staple)',
        unit: '₹ / quintal',
        basePrice: 6780,
        minPrice: 6550,
        maxPrice: 7050,
        msp: 6620,
        trend: 'up',
        change: '+2.4%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-110, -75, -50, -65, -30, +20, 0],
        nearby: [
          { name: 'Bathinda Cotton Market', type: 'Principal Cotton Yard', price: 6780, min: 6550, max: 7050 },
          { name: 'Abohar Cotton Yard', type: 'Cotton Hub of Punjab', price: 6890, min: 6650, max: 7160 },
          { name: 'Malout APMC', type: 'Major Cotton Yard', price: 6840, min: 6600, max: 7110 },
          { name: 'Sri Ganganagar Yard', type: 'Terminal Market', price: 6950, min: 6710, max: 7220 }
        ]
      }
    }
  },
  pune: {
    districtName: 'Pune (Gultekdi)',
    stateName: 'Maharashtra',
    markets: [
      { id: 'gultekdi', name: 'Pune Gultekdi APMC', premium: 0 },
      { id: 'baramati', name: 'Baramati Market Yard', premium: 35 },
      { id: 'manchar', name: 'Manchar APMC', premium: -20 },
      { id: 'junnar', name: 'Junnar Market', premium: -15 }
    ],
    crops: {
      Soybean: {
        name: 'Soybean (सोयाबीन - Yellow JS-9305)',
        unit: '₹ / quintal',
        basePrice: 4750,
        minPrice: 4580,
        maxPrice: 4920,
        msp: 4600,
        trend: 'up',
        change: '+2.8%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-60, -40, -25, -30, -10, +15, 0],
        nearby: [
          { name: 'Pune Gultekdi Hub', type: 'Terminal APMC', price: 4750, min: 4580, max: 4920 },
          { name: 'Baramati APMC', type: 'Major Yard', price: 4790, min: 4620, max: 4960 },
          { name: 'Satara APMC', type: 'Regional Hub', price: 4720, min: 4550, max: 4890 },
          { name: 'Solapur APMC', type: 'Principal Yard', price: 4820, min: 4650, max: 4990 }
        ]
      },
      Onion: {
        name: 'Onion (लाल कांदा - Pune Red)',
        unit: '₹ / quintal',
        basePrice: 2780,
        minPrice: 2550,
        maxPrice: 3020,
        msp: 1800,
        trend: 'up',
        change: '+6.2%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-120, -90, -50, -60, -20, +20, 0],
        nearby: [
          { name: 'Pune Gultekdi Hub', type: 'Terminal Mega Hub', price: 2780, min: 2550, max: 3020 },
          { name: 'Manchar APMC', type: 'Principal Yard', price: 2720, min: 2500, max: 2950 },
          { name: 'Khed APMC', type: 'Sub-Yard', price: 2690, min: 2470, max: 2920 },
          { name: 'Mumbai Vashi Terminal', type: 'Mega Market', price: 2950, min: 2700, max: 3200 }
        ]
      },
      Wheat: {
        name: 'Wheat (गेहूं - Lokwan Grade-A)',
        unit: '₹ / quintal',
        basePrice: 2480,
        minPrice: 2410,
        maxPrice: 2560,
        msp: 2275,
        trend: 'up',
        change: '+1.9%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-40, -25, -15, -20, -5, +10, 0],
        nearby: [
          { name: 'Pune Gultekdi APMC', type: 'Principal Yard', price: 2480, min: 2410, max: 2560 },
          { name: 'Baramati Grain Yard', type: 'Major APMC', price: 2510, min: 2440, max: 2590 },
          { name: 'Ahmednagar Mandi', type: 'Regional Hub', price: 2460, min: 2390, max: 2540 },
          { name: 'Mumbai Vashi Mega Hub', type: 'Terminal Market', price: 2570, min: 2500, max: 2650 }
        ]
      }
    }
  },
  latur: {
    districtName: 'Latur (Marathwada)',
    stateName: 'Maharashtra',
    markets: [
      { id: 'latur_dal', name: 'Latur Pulse & Oilseed APMC', premium: 0 },
      { id: 'udgir', name: 'Udgir Main Yard', premium: 25 },
      { id: 'ahmedpur', name: 'Ahmedpur Mandi', premium: -15 },
      { id: 'ausa', name: 'Ausa APMC', premium: -20 }
    ],
    crops: {
      Toor: {
        name: 'Toor / Arhar (तुवर - Latur Red Bold)',
        unit: '₹ / quintal',
        basePrice: 10150,
        minPrice: 9700,
        maxPrice: 10550,
        msp: 7000,
        trend: 'up',
        change: '+6.8%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-220, -160, -100, -130, -50, +35, 0],
        nearby: [
          { name: 'Latur Pulse Market', type: 'Asia Largest Pulse Hub', price: 10150, min: 9700, max: 10550 },
          { name: 'Udgir APMC', type: 'Principal Yard', price: 10080, min: 9630, max: 10480 },
          { name: 'Akola Dal APMC', type: 'Major Hub', price: 9950, min: 9500, max: 10350 },
          { name: 'Solapur Mandi', type: 'Regional APMC', price: 10200, min: 9750, max: 10600 }
        ]
      },
      Soybean: {
        name: 'Soybean (सोयाबीन - Yellow JS-335)',
        unit: '₹ / quintal',
        basePrice: 4790,
        minPrice: 4620,
        maxPrice: 4950,
        msp: 4600,
        trend: 'up',
        change: '+3.1%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-80, -55, -35, -45, -15, +15, 0],
        nearby: [
          { name: 'Latur APMC Main', type: 'Principal Oilseed Hub', price: 4790, min: 4620, max: 4950 },
          { name: 'Udgir Mandi', type: 'Sub-Market Yard', price: 4760, min: 4590, max: 4920 },
          { name: 'Nanded APMC', type: 'Major APMC', price: 4820, min: 4650, max: 4980 },
          { name: 'Parbhani Yard', type: 'Regional Hub', price: 4740, min: 4570, max: 4900 }
        ]
      },
      Gram: {
        name: 'Chana / Bengal Gram (चना - Desi Chana)',
        unit: '₹ / quintal',
        basePrice: 5890,
        minPrice: 5650,
        maxPrice: 6100,
        msp: 5440,
        trend: 'up',
        change: '+4.2%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-110, -80, -45, -60, -20, +25, 0],
        nearby: [
          { name: 'Latur Pulse Hub', type: 'Principal Yard', price: 5890, min: 5650, max: 6100 },
          { name: 'Udgir APMC', type: 'Sub-Yard', price: 5850, min: 5610, max: 6060 },
          { name: 'Solapur Mandi', type: 'Major APMC', price: 5930, min: 5690, max: 6140 },
          { name: 'Gulbarga APMC', type: 'Regional Hub', price: 5970, min: 5730, max: 6180 }
        ]
      }
    }
  },
  indore: {
    districtName: 'Indore (Malwa)',
    stateName: 'Madhya Pradesh',
    markets: [
      { id: 'choithram', name: 'Indore Choithram Mandi', premium: 0 },
      { id: 'sanwer', name: 'Sanwer APMC Yard', premium: -20 },
      { id: 'mhow', name: 'Mhow Market Yard', premium: 15 },
      { id: 'depalpur', name: 'Depalpur Mandi', premium: -30 }
    ],
    crops: {
      Soybean: {
        name: 'Soybean (सोयाबीन - Yellow JS-9560)',
        unit: '₹ / quintal',
        basePrice: 4820,
        minPrice: 4650,
        maxPrice: 4990,
        msp: 4600,
        trend: 'up',
        change: '+3.5%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-90, -65, -40, -50, -20, +15, 0],
        nearby: [
          { name: 'Indore Choithram Hub', type: 'Major MP Hub', price: 4820, min: 4650, max: 4990 },
          { name: 'Ujjain APMC', type: 'Principal Yard', price: 4790, min: 4620, max: 4960 },
          { name: 'Dewas Grain Mandi', type: 'Regional Hub', price: 4850, min: 4680, max: 5020 },
          { name: 'Khandwa APMC', type: 'Major Market', price: 4760, min: 4590, max: 4930 }
        ]
      },
      Wheat: {
        name: 'Wheat (गेहूं - Malwa Sharbati Premium)',
        unit: '₹ / quintal',
        basePrice: 2850,
        minPrice: 2720,
        maxPrice: 3050,
        msp: 2275,
        trend: 'up',
        change: '+5.4%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-70, -50, -30, -40, -15, +20, 0],
        nearby: [
          { name: 'Indore Grain Yard', type: 'Sharbati Wheat Hub', price: 2850, min: 2720, max: 3050 },
          { name: 'Sehore Mandi', type: 'World Sharbati APMC', price: 2920, min: 2780, max: 3120 },
          { name: 'Ujjain APMC', type: 'Principal Yard', price: 2810, min: 2680, max: 3010 },
          { name: 'Bhopal Karond Mandi', type: 'Regional Hub', price: 2880, min: 2750, max: 3080 }
        ]
      },
      Maize: {
        name: 'Maize / Corn (मक्का - Yellow Feed Grade)',
        unit: '₹ / quintal',
        basePrice: 2180,
        minPrice: 2090,
        maxPrice: 2260,
        msp: 2090,
        trend: 'up',
        change: '+1.5%',
        arrivalDate: new Date().toLocaleDateString('en-GB'),
        historyOffsets: [-30, -20, -10, -15, -5, +10, 0],
        nearby: [
          { name: 'Indore Choithram Yard', type: 'Principal Yard', price: 2180, min: 2090, max: 2260 },
          { name: 'Sanwer APMC', type: 'Sub-Yard', price: 2150, min: 2060, max: 2230 },
          { name: 'Chhindwara APMC', type: 'Asia Largest Corn Hub', price: 2240, min: 2150, max: 2320 },
          { name: 'Ratlam Mandi', type: 'Regional Hub', price: 2170, min: 2080, max: 2250 }
        ]
      }
    }
  }
};

export default function MandiMarket({ currentLang, currentUser }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const [selectedDistrictKey, setSelectedDistrictKey] = useState('rourkela');
  const [selectedMarketId, setSelectedMarketId] = useState('panposh');
  const [selectedCropKey, setSelectedCropKey] = useState('Paddy');
  const [initialLoading, setInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDistrictSyncing, setIsDistrictSyncing] = useState(false);
  const [isCropSyncing, setIsCropSyncing] = useState(false);
  const [isMarketSyncing, setIsMarketSyncing] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  const [hoveredPointIndex, setHoveredPointIndex] = useState(null);
  const [liveStore, setLiveStore] = useState({});

  // Helper to load live district feed from AGMARKNET
  const loadMandiData = async (distKey) => {
    try {
      const liveData = await fetchLiveDistrictMandiFeed(distKey);
      if (liveData && liveData.crops && Object.keys(liveData.crops).length > 0) {
        setLiveStore(prev => ({
          ...prev,
          [distKey]: liveData
        }));

        const availableCrops = Object.keys(liveData.crops);
        // If current crop is not available in the new district's live data, switch to the first available crop
        if (!liveData.crops[selectedCropKey]) {
          const firstCrop = availableCrops[0];
          setSelectedCropKey(firstCrop);
          const firstCropMarkets = Object.keys(liveData.crops[firstCrop]?.marketMap || {});
          if (firstCropMarkets.length > 0) {
            setSelectedMarketId(firstCropMarkets[0]);
          }
        }
      }
      setLastSyncedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) {
      console.warn('Live mandi fetch error:', e);
    }
  };

  // Initial Data & APMC Radar Loading
  useEffect(() => {
    let isMounted = true;
    async function loadInitial() {
      await loadMandiData(selectedDistrictKey);
      if (isMounted) {
        setInitialLoading(false);
      }
    }
    loadInitial();
    return () => { isMounted = false; };
  }, []);

  // Sync with user district on login
  useEffect(() => {
    if (currentUser?.district || currentUser?.taluk) {
      const userDist = (currentUser.district || currentUser.taluk).toLowerCase();
      const matchKey = Object.keys(DISTRICT_DATA_STORE).find(k => 
        userDist.includes(k) || k.includes(userDist)
      );
      if (matchKey && matchKey !== selectedDistrictKey) {
        handleDistrictChange(matchKey);
      }
    }
  }, [currentUser]);

  const handleDistrictChange = async (distKey) => {
    setIsDistrictSyncing(true);
    setSelectedDistrictKey(distKey);
    setHoveredPointIndex(null);

    const distData = liveStore[distKey] || DISTRICT_DATA_STORE[distKey] || DISTRICT_DATA_STORE.rourkela;
    const availableCrops = Object.keys(distData.crops || {});
    if (availableCrops.length > 0) {
      const newCrop = availableCrops[0];
      setSelectedCropKey(newCrop);
      const cropMarkets = Object.keys(distData.crops[newCrop]?.marketMap || {});
      if (cropMarkets.length > 0) {
        setSelectedMarketId(cropMarkets[0]);
      } else if (distData.markets && distData.markets[0]) {
        setSelectedMarketId(distData.markets[0].id);
      }
    }

    await loadMandiData(distKey);

    setTimeout(() => {
      setIsDistrictSyncing(false);
    }, 400);
  };

  const handleCropChange = (newCropKey) => {
    setIsCropSyncing(true);
    setSelectedCropKey(newCropKey);
    setHoveredPointIndex(null);
    const cropObj = activeDistrict.crops?.[newCropKey];
    if (cropObj?.marketMap) {
      const marketKeys = Object.keys(cropObj.marketMap);
      if (marketKeys.length > 0 && !cropObj.marketMap[selectedMarketId]) {
        setSelectedMarketId(marketKeys[0]);
      }
    }
    setTimeout(() => {
      setIsCropSyncing(false);
    }, 200);
  };

  const handleMarketChange = (newMarketId) => {
    setIsMarketSyncing(true);
    setSelectedMarketId(newMarketId);
    setHoveredPointIndex(null);
    setTimeout(() => {
      setIsMarketSyncing(false);
    }, 180);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadMandiData(selectedDistrictKey);
    } catch (e) {
      // fallback
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const activeDistrict = liveStore[selectedDistrictKey] || DISTRICT_DATA_STORE[selectedDistrictKey] || DISTRICT_DATA_STORE.rourkela;

  const cropList = Object.keys(activeDistrict.crops || {});
  const activeCrop = activeDistrict.crops?.[selectedCropKey] || activeDistrict.crops?.[cropList[0]] || {
    name: selectedCropKey,
    displayName: selectedCropKey,
    unit: '₹ / quintal',
    basePrice: 2369,
    minPrice: 2360,
    maxPrice: 2390,
    msp: 2183,
    mspFloorLabel: 'Govt Support Price',
    trend: 'up',
    change: '+3.2%',
    arrivalDate: activeDistrict.arrivalDate || new Date().toLocaleDateString('en-GB'),
    marketMap: {},
    nearby: []
  };

  // Available markets that trade this specific crop in this district
  const availableMarketsForCrop = useMemo(() => {
    if (activeCrop.marketMap && Object.keys(activeCrop.marketMap).length > 0) {
      return Object.values(activeCrop.marketMap);
    }
    return activeDistrict.markets || [];
  }, [activeCrop, activeDistrict]);

  // Keep selectedMarketId in sync with available markets for active crop
  const activeMarket = useMemo(() => {
    if (activeCrop.marketMap && activeCrop.marketMap[selectedMarketId]) {
      return activeCrop.marketMap[selectedMarketId];
    }
    const foundInNearby = activeCrop.nearby?.find(m => m.id === selectedMarketId);
    if (foundInNearby) {
      return foundInNearby;
    }
    if (availableMarketsForCrop.length > 0) {
      return availableMarketsForCrop[0];
    }
    return activeDistrict.markets?.find(m => m.id === selectedMarketId) || activeDistrict.markets?.[0] || { id: 'main', name: `${activeDistrict.districtName} APMC` };
  }, [activeCrop, selectedMarketId, availableMarketsForCrop, activeDistrict]);

  // Real-time market specific price
  const currentPrice = Number(activeMarket.price || activeCrop.marketMap?.[activeMarket.id]?.price || activeCrop.basePrice) || 2400;
  const currentMinPrice = Number(activeMarket.min || activeCrop.marketMap?.[activeMarket.id]?.min || activeCrop.minPrice) || Math.round(currentPrice * 0.95);
  const currentMaxPrice = Number(activeMarket.max || activeCrop.marketMap?.[activeMarket.id]?.max || activeCrop.maxPrice) || Math.round(currentPrice * 1.05);


  const chartData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];
    const offsets = [
      -Math.round(currentPrice * 0.024),
      -Math.round(currentPrice * 0.016),
      -Math.round(currentPrice * 0.008),
      -Math.round(currentPrice * 0.014),
      -Math.round(currentPrice * 0.004),
      +Math.round(currentPrice * 0.009),
      0
    ];
    
    const points = days.map((day, idx) => {
      const price = currentPrice + (offsets[idx] || 0);
      return { day, price };
    });

    const prices = points.map(p => p.price);
    const minP = Math.min(...prices);
    const maxP = Math.max(...prices);
    const padding = (maxP - minP) * 0.25 || currentPrice * 0.05 || 10;
    const yMin = minP - padding;
    const yMax = maxP + padding;

    const xStart = 55;
    const xEnd = 645;
    const yTop = 25;
    const yBottom = 135;

    const coords = points.map((p, i) => {
      const x = xStart + (i / (points.length - 1)) * (xEnd - xStart);
      const normalizedY = (p.price - yMin) / (yMax - yMin || 1);
      const y = yBottom - normalizedY * (yBottom - yTop);
      return { ...p, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
    });


    let pathD = `M ${coords[0].x},${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i === 0 ? i : i - 1];
      const p1 = coords[i];
      const p2 = coords[i + 1];
      const p3 = coords[i + 2 < coords.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      pathD += ` C ${Math.round(cp1x * 10) / 10},${Math.round(cp1y * 10) / 10} ${Math.round(cp2x * 10) / 10},${Math.round(cp2y * 10) / 10} ${p2.x},${p2.y}`;
    }

    const areaD = `${pathD} L ${coords[coords.length - 1].x},${yBottom + 15} L ${coords[0].x},${yBottom + 15} Z`;

    return {
      points: coords,
      pathD,
      areaD,
      minPrice: minP,
      maxPrice: maxP,
      gridLines: [
        { label: `₹${Math.round(maxP)}`, y: yTop },
        { label: `₹${Math.round((maxP + minP) / 2)}`, y: (yTop + yBottom) / 2 },
        { label: `₹${Math.round(minP)}`, y: yBottom }
      ]
    };
  }, [currentPrice, activeCrop]);

  const activeHoverPoint = hoveredPointIndex !== null 
    ? chartData.points[hoveredPointIndex] 
    : chartData.points[chartData.points.length - 1];

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-6 animate-apple-fade text-[#1d1d1f] overflow-visible min-w-0 relative">
      
      {/* Apple Frosted Sync Indicator */}
      {(isRefreshing || isDistrictSyncing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
          <div className="p-6 rounded-[24px] liquid-glass/95 border border-[#d2d2d7]/80 shadow-2xl flex flex-col items-center space-y-3.5 max-w-xs text-center animate-apple-scale">
            <div className="w-10 h-10 rounded-full liquid-pill-btn/10 text-[#0071e3] flex items-center justify-center">
              <span className="w-5 h-5 border-2 border-[#0071e3] border-t-transparent rounded-full animate-spin"></span>
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-[#1d1d1f]">Syncing AGMARKNET Feed</h4>
              <p className="text-[11px] text-[#86868b]">Connecting to National APMC Gateway for {activeDistrict.districtName}...</p>
            </div>
          </div>
        </div>
      )}
      
      {/* 1. Header (Clean Apple Typography) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-apple-in relative z-20">
        <div className="space-y-0.5">
          <h1 className="text-[24px] sm:text-[34px] font-bold tracking-tight text-[#1d1d1f]">
            {t.marketTitle || 'Market Prices & Trends'}
          </h1>
          <p className="text-[13px] sm:text-[15px] text-[#86868b] font-normal">
            {activeDistrict.districtName} ({activeDistrict.stateName}) • {t.marketSubtitle || 'Live APMC arrivals & prices'}
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          {/* Live AGMARKNET Status Badge & Timestamp */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full liquid-pill-light border border-emerald-500/30 text-[11px] font-semibold text-emerald-700 bg-emerald-50/70 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Feed • {lastSyncedTime}</span>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 rounded-full liquid-glass hover:bg-[#f5f5f7] border border-[#d2d2d7] text-xs font-semibold text-[#1d1d1f] hover:text-[#0071e3] shadow-xs flex items-center space-x-1.5 cursor-pointer active:scale-95 transition-all disabled:opacity-60"
          >
            <RotateCw size={13} className={isRefreshing ? 'animate-spin text-[#0071e3]' : ''} />
            <span>{isRefreshing ? (t.updating || 'Syncing...') : (t.refresh || 'Sync Mandi Feed')}</span>
          </button>
        </div>
      </div>

      {/* Top 3 Dynamic Selectors with High Z-Index */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 relative z-40">
        
        {/* 1. Select District */}
        <div className="p-4 rounded-[22px] liquid-glass border border-white/80 shadow-xs space-y-1.5 relative z-30 focus-within:z-50 hover:z-40">
          <span className="text-[10px] text-[#86868b] uppercase font-bold tracking-wider block">
            {t.selectDistrict || 'Select District'}
          </span>
          <AppleSelect
            options={[
              { value: 'rourkela', label: 'Rourkela (Sundargarh)', subLabel: '(Odisha)' },
              { value: 'yavatmal', label: 'Yavatmal', subLabel: '(Maharashtra)' },
              { value: 'ernakulam', label: 'Ernakulam (Kochi)', subLabel: '(Kerala)' },
              { value: 'karnal', label: 'Karnal', subLabel: '(Haryana)' },
              { value: 'bathinda', label: 'Bathinda', subLabel: '(Punjab)' },
              { value: 'nashik', label: 'Nashik (Lasalgaon)', subLabel: '(Maharashtra)' },
              { value: 'pune', label: 'Pune (Gultekdi)', subLabel: '(Maharashtra)' },
              { value: 'latur', label: 'Latur (Marathwada)', subLabel: '(Maharashtra)' },
              { value: 'indore', label: 'Indore (Malwa)', subLabel: '(Madhya Pradesh)' }
            ]}
            value={selectedDistrictKey}
            onChange={(val) => handleDistrictChange(val)}
            icon={MapPin}
          />
        </div>

        {/* 2. Select Market */}
        <div className="p-4 rounded-[22px] liquid-glass border border-white/80 shadow-xs space-y-1.5 relative z-20 focus-within:z-50 hover:z-40">
          <span className="text-[10px] text-[#86868b] uppercase font-bold tracking-wider block">
            {t.selectMarket || 'Select Market'}
          </span>
          <AppleSelect
            options={availableMarketsForCrop.map(m => ({
              value: m.id,
              label: m.name,
              subLabel: m.price ? `₹${Number(m.price).toLocaleString()}` : ''
            }))}
            value={activeMarket.id}
            onChange={(val) => {
              handleMarketChange(val);
            }}
            icon={Store}
          />
        </div>


        {/* 3. Select Crop */}
        <div className="p-4 rounded-[22px] liquid-glass border border-white/80 shadow-xs space-y-1.5 relative z-10 focus-within:z-50 hover:z-40">
          <span className="text-[10px] text-[#86868b] uppercase font-bold tracking-wider block">
            {t.selectCrop || 'Select Crop'}
          </span>
          <AppleSelect
            options={cropList.map(c => ({
              value: c,
              label: activeDistrict.crops?.[c]?.displayName || activeDistrict.crops?.[c]?.name || c
            }))}
            value={selectedCropKey}
            onChange={(val) => handleCropChange(val)}
            icon={Sparkles}
          />
        </div>


      </div>

      {/* Main Interactive Precision Price Chart Card (Pure Apple Aesthetic) */}
      <div className={`p-6 sm:p-8 rounded-[28px] liquid-glass border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] space-y-5 relative z-10 transition-opacity duration-200 ${isCropSyncing || isMarketSyncing ? 'opacity-70 scale-[0.995]' : 'opacity-100'}`}>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#f0f0f0]">
          <div className="flex flex-wrap items-baseline gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full liquid-pill-btn"></span>
            <h2 className="text-base font-semibold text-[#1d1d1f]">
              {activeCrop.displayName || activeCrop.name}
            </h2>
            <span className="text-xs text-[#86868b]">
              • {activeMarket.name}
            </span>
          </div>
          <span className="text-xs text-[#86868b]">
            {t.lastUpdated || 'Arrival Date'}: <b className="text-[#1d1d1f] font-medium">{activeCrop.arrivalDate}</b>
          </span>
        </div>

        {/* SVG Precision Line Chart */}
        <div className="h-48 sm:h-56 w-full pt-2 select-none relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 700 170">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0071e3" stopOpacity="0.20" />
                <stop offset="85%" stopColor="#0071e3" stopOpacity="0.02" />
                <stop offset="100%" stopColor="#0071e3" stopOpacity="0.0" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0071e3" floodOpacity="0.2" />
              </filter>
            </defs>

            {/* Subtle Gridlines */}
            {chartData.gridLines.map((gl, idx) => (
              <g key={idx}>
                <line
                  x1="55"
                  y1={gl.y}
                  x2="645"
                  y2={gl.y}
                  stroke="#f0f0f0"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text x="45" y={gl.y + 4} textAnchor="end" fontSize="10" fill="#a1a1a6" fontWeight="500">
                  {gl.label}
                </text>
              </g>
            ))}

            {/* Area Fill */}
            <path
              d={chartData.areaD}
              fill="url(#chartGrad)"
            />

            {/* Main Spline Curve */}
            <path
              d={chartData.pathD}
              fill="none"
              stroke="#0071e3"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />

            {/* Data Points with Hover Detection */}
            {chartData.points.map((pt, i) => {
              const isSelected = activeHoverPoint.day === pt.day;
              return (
                <g 
                  key={i} 
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPointIndex(i)}
                  onClick={() => setHoveredPointIndex(i)}
                >
                  <circle cx={pt.x} cy={pt.y} r="18" fill="transparent" />

                  {isSelected && (
                    <circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="8" 
                      fill="#0071e3" 
                      fillOpacity="0.2" 
                      className="animate-ping origin-center"
                    />
                  )}

                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? 6 : 4}
                    fill="#ffffff"
                    stroke="#0071e3"
                    strokeWidth={isSelected ? 3.5 : 2.5}
                    className="transition-all duration-200"
                  />

                  <text
                    x={pt.x}
                    y="160"
                    textAnchor="middle"
                    fontSize="11"
                    fill={isSelected ? '#1d1d1f' : '#86868b'}
                    fontWeight={isSelected ? '600' : '400'}
                  >
                    {pt.day}
                  </text>

                  {isSelected && (
                    <g className="transition-all duration-200">
                      <rect
                        x={pt.x - 38}
                        y={Math.max(2, pt.y - 32)}
                        width="76"
                        height="22"
                        rx="7"
                        fill="#1d1d1f"
                      />
                      <text
                        x={pt.x}
                        y={Math.max(16, pt.y - 17)}
                        textAnchor="middle"
                        fontSize="11"
                        fill="#ffffff"
                        fontWeight="bold"
                      >
                        ₹{pt.price.toLocaleString()}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 3 Real-Time Commodity Price Metric Cards (Clean Apple Typography) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        
        {/* Card 1: Modal Rate */}
        <div className="p-5 sm:p-6 rounded-[20px] liquid-glass shadow-xs space-y-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-[#86868b] uppercase tracking-wider">
            <span>{(activeCrop.displayName || activeCrop.name)} {t.spotRate || 'Spot Rate'}</span>
            <span className="text-[#0071e3] font-bold">{activeCrop.change}</span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-[#1d1d1f]">
            ₹{currentPrice.toLocaleString()} <span className="text-xs font-normal text-[#86868b]">{activeCrop.unit}</span>
          </div>
          <div className="text-xs text-[#86868b] pt-1 border-t border-[#f0f0f0]">
            {activeMarket.name}
          </div>
        </div>

        {/* Card 2: Govt MSP Floor */}
        <div className="p-5 sm:p-6 rounded-[20px] liquid-glass shadow-xs space-y-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-[#86868b] uppercase tracking-wider">
            <span>{activeCrop.mspFloorLabel || t.govtMspFloor || 'Govt Support Price'}</span>
            <span className="text-[#86868b]">{activeCrop.isOfficialMsp ? 'Official MSP' : 'Floor Base'}</span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-[#0071e3]">
            ₹{activeCrop.msp.toLocaleString()} <span className="text-xs font-normal text-[#86868b]">{activeCrop.unit}</span>
          </div>
          <div className="text-xs text-[#86868b] pt-1 border-t border-[#f0f0f0]">
            +₹{Math.max(0, currentPrice - activeCrop.msp).toLocaleString()} {t.premiumOverBase || "premium over baseline"}
          </div>
        </div>

        {/* Card 3: Live Trading Spread */}
        <div className="p-5 sm:p-6 rounded-[20px] liquid-glass shadow-xs space-y-1.5">
          <div className="flex justify-between items-center text-xs font-semibold text-[#86868b] uppercase tracking-wider">
            <span>{t.dailyTradingRange || 'Trading Spread'}</span>
            <span className="text-[#86868b]">Min - Max</span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-[#1d1d1f]">
            ₹{currentMinPrice.toLocaleString()} - ₹{currentMaxPrice.toLocaleString()}
          </div>
          <div className="text-xs text-[#86868b] pt-1 border-t border-[#f0f0f0]">
            {t.dailyApmcRange || "Daily APMC Auction Range"}
          </div>
        </div>

      </div>

      {/* Clean Regional APMC Mandis Comparison (Pure Minimalist Apple Card Grid) */}
      <div className="p-6 sm:p-7 rounded-[22px] liquid-glass shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
        <div className="pb-3 border-b border-[#f0f0f0]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0071e3] block">
            {t.regionalNetwork || 'Regional APMC Network'}
          </span>
          <h3 className="text-base font-semibold text-[#1d1d1f]">
            {t.nearbyComparison || 'Nearby APMC Mandi Rates for'} {(activeCrop.displayName || activeCrop.name)} ({activeDistrict.districtName})
          </h3>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {(activeCrop.nearby || []).map((m, idx) => {
            const isSelected = (m.id === activeMarket.id || m.name === activeMarket.name);
            return (
              <div
                key={idx}
                onClick={() => {
                  if (m.id) handleMarketChange(m.id);
                }}
                className={`p-5 rounded-[18px] transition-all shadow-xs cursor-pointer ${
                  isSelected 
                    ? 'bg-white border-2 border-[#0071e3] ring-4 ring-[#0071e3]/10 shadow-md scale-[1.02]' 
                    : 'bg-[#f5f5f7] border border-[#d2d2d7]/50 hover:border-[#0071e3]/40 hover:bg-white'
                } space-y-3`}
              >
                <div className="flex items-start justify-between gap-1">
                  <div>
                    <h4 className={`font-semibold text-sm leading-snug ${isSelected ? 'text-[#0071e3]' : 'text-[#1d1d1f]'}`}>
                      {m.name}
                    </h4>
                    <span className="text-xs text-[#86868b]">{m.type}</span>
                  </div>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0071e3]/10 text-[#0071e3]">
                      Active
                    </span>
                  )}
                </div>

                <div className="pt-2.5 border-t border-[#e0e0e0] space-y-1">
                  <div className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
                    ₹{Number(m.price).toLocaleString()} <span className="text-xs font-normal text-[#86868b]">{activeCrop.unit}</span>
                  </div>
                  <div className="text-xs text-[#86868b]">
                    {t.auctionSpread || "Auction Spread"}: <span className="text-[#1d1d1f] font-medium">₹{Number(m.min).toLocaleString()} - ₹{Number(m.max).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
