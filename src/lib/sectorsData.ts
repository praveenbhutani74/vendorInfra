export interface Sector {
  slug: string;
  name: string;
  image: string;
  description: string;
  overview: string;
  projectTypes: string[];
  vendorInfraRole: string[];
  keyStats: { label: string; value: string }[];
  programs: string[];
  futureOutlook: string;
}

export const sectors: Sector[] = [
  {
    slug: "roads-bridges",
    name: "Roads & Bridges",
    image: "https://vendorinfra.com/wp-content/uploads/2020/11/ROADS-AND-BRIDGES.jpg",
    description: "National highways, expressways, flyovers & bridge infrastructure",
    overview:
      "India has the world's second-largest road network, extending over 6.63 million km as of 2026 (up from 5.89 million km in 2013). This network handles 71% of freight and 85% of passenger movement, powering economic activity and regional connectivity. The sector contributes roughly 4.7% to GDP and supports industrial, agricultural, and tourism growth. Government programs like Bharatmala Pariyojana, PM GatiShakti, and NIP have accelerated capacity addition, while digitalization through FASTag and AI traffic monitoring is enhancing efficiency. The focus is shifting toward climate-resilient, green corridors and integrated logistics networks.",
    keyStats: [
      { label: "Total Road Length", value: "6.63M km" },
      { label: "National Highways", value: "1,46,600 km" },
      { label: "Avg. Construction Speed", value: "34 km/day" },
      { label: "Annual Capex Allocation", value: "₹2.95L Cr" },
    ],
    programs: [
      "Bharatmala Pariyojana – 34,800 km planned (22,000 km built) | ₹5.35 lakh crore budget",
      "PM GatiShakti – National Master Plan for integrated transport planning",
      "Multimodal Logistics Parks – 35 identified (9 under construction)",
      "Green Highway Policy – tree plantations, solar lighting, rainwater harvesting",
    ],
    futureOutlook:
      "By 2030, India targets reducing logistics cost to <8% of GDP through asset monetization, AI-enabled operations, and multimodal corridors. EV charging lanes and digital tolling will enhance efficiency, while PPP models and foreign financing will expand expressway development to over 7 million km.",
    projectTypes: [
      "National Highways & Expressways",
      "State Highways & MDRs",
      "Flyovers & Grade Separators",
      "ROBs / RUBs",
      "Long-span Cable-stayed & Suspension Bridges",
      "Tunnel Approaches",
      "Urban Ring Roads",
      "Hill Roads & Border Roads",
    ],
    vendorInfraRole: [
      "Verified vendor discovery across 20+ material categories",
      "Real-time price benchmarking for TMT, cement & bitumen",
      "Equipment hire marketplace for paving, compaction & batching",
      "Project tender alerts and SOR access for NHAI / state PWDs",
      "Supply chain financing through HDFC, Tata Capital & L&T Finance",
      "ISO-certified data security for bid and procurement data",
    ],
  },
  {
    slug: "urban-transport",
    name: "Urban Transport",
    image: "https://vendorinfra.com/wp-content/uploads/2020/11/URBAN-TRANSPORT.jpg",
    description: "Metro rail, MRTS, BRT and urban mobility systems",
    overview:
      "Rapid urbanization has made mass transit a core pillar of city infrastructure. India hosts the world's third-largest metro network (982 km operational), which will surpass 2,000 km by 2030. Expansions across Delhi, Mumbai, Bengaluru, and Chennai support low-carbon mobility and reduced congestion. Digital ticketing, intelligent traffic systems, and safe urban stations enhance commuter experience. Public transport integration with EV and e-bus fleets is reducing urban emissions and fossil fuel dependence.",
    keyStats: [
      { label: "Operational Metro Length", value: "982 km" },
      { label: "Under Construction", value: "1,150+ km" },
      { label: "Daily Metro Ridership", value: "8 Million" },
      { label: "Electric Buses (FAME-II)", value: "12,000+" },
    ],
    programs: [
      "Metro Lite and Neo Metro models for Tier-2 cities",
      "RRTS – Delhi–Meerut 82 km operational corridor",
      "National Common Mobility Card (NCMC) for interoperable ticketing",
      "Smart City Transit Integration: Bike-sharing + EV infrastructure",
    ],
    futureOutlook:
      "By 2030 urban transit will anchor net-zero-mobility goals through AI-based dispatch, automation, and hydrogen-powered rolling stock, enabling seamless multi-modal networks in 100+ cities.",
    projectTypes: [
      "Metro Rail (underground, elevated & at-grade)",
      "Light Rail Transit (LRT)",
      "Bus Rapid Transit (BRT) Corridors",
      "Elevated Urban Corridors",
      "Monorail Systems",
      "Integrated Multimodal Hubs",
      "Last-mile Connectivity Infrastructure",
    ],
    vendorInfraRole: [
      "Vendor discovery for civil, MEP and track-work specialists",
      "Price discovery for structural steel, cables and precast segments",
      "Equipment hire for TBMs, segment erectors and gantry cranes",
      "Sector-specific SORs and tender alert subscriptions",
      "Supply chain financing for subcontractors",
    ],
  },
  {
    slug: "railways",
    name: "Railways",
    image: "https://vendorinfra.com/wp-content/uploads/2020/12/RAILWAYS.jpg",
    description: "Dedicated freight corridors, high-speed rail and station upgrades",
    overview:
      "Indian Railways is the lifeline of national mobility, transporting 23 million passengers and 1.55 billion tonnes of freight every day. Covering 68,426 route km, the network is 95.3% electrified, enhancing efficiency and cutting emissions. Capex investments of ₹2.65 lakh crore (FY26) support modern coaches, AI signaling, and station redevelopment. Dedicated freight corridors and high-speed rail projects are pushing India toward a next-generation rail economy.",
    keyStats: [
      { label: "Route Length", value: "68,426 km" },
      { label: "Electrification", value: "95.3%" },
      { label: "Freight Traffic / Year", value: "1.55 BT" },
      { label: "Vande Bharat Trains", value: "130 Running" },
    ],
    programs: [
      "Dedicated Freight Corridors (DFC): 2,843 km | 96% complete",
      "Amrit Bharat Station Scheme: 550 smart stations",
      "KAVACH Safety System: 1,500 route km deployed",
      "Net-Zero 2030 Railway Target",
    ],
    futureOutlook:
      "Complete electrification and logistics integration with ports and corridors will accelerate freight turnaround. Hydrogen and solar-based locomotives will support carbon neutrality by 2030.",
    projectTypes: [
      "Dedicated Freight Corridors (EDFC / WDFC)",
      "High-Speed Rail (Bullet Train)",
      "Station Redevelopment (Amrit Bharat)",
      "Electrification (25 kV OHE)",
      "Signalling & Telecommunication Upgrades",
      "Track Laying & Ballasting",
      "ROB / Subway Construction",
    ],
    vendorInfraRole: [
      "Vendor discovery for track, OHE and civil specialists",
      "Price benchmarking for rails, sleepers and ballast",
      "Tender alerts from RITES, IRCON, DFCCIL and NHSRCL",
      "Equipment hire for track-laying machines and rail cranes",
      "Project financing and working capital support",
    ],
  },
  {
    slug: "airports",
    name: "Airports & Aviation",
    image: "https://vendorinfra.com/wp-content/uploads/2020/11/AIRPORTS.jpg",
    description: "Greenfield airports, terminal expansions and airside works",
    overview:
      "India's aviation sector is among the fastest growing globally, projected to handle 1 billion passengers annually within a decade. Operational airports rose from 74 (2014) to 149 (2026), boosting Tier-2 and Tier-3 connectivity. With US$15 billion in investments, modernization covers terminal expansion, cargo handling, and smart operations. The sector is embracing AI security, biometric boarding, and green energy to reduce carbon intensity.",
    keyStats: [
      { label: "Active Airports (2026)", value: "149" },
      { label: "Target Airports by 2030", value: ">230" },
      { label: "Passenger Traffic FY25", value: "396 Million" },
      { label: "Sector Investment 2024-30", value: "US$15B" },
    ],
    programs: [
      "UDAN Scheme: 517 routes | 76 new airports linked",
      "Greenfield Airports: Jewar, Navi Mumbai, Dholera, Mopa",
      "AI Surveillance & Smart Baggage Systems",
      "Sustainable Aviation Fuel testing programs",
    ],
    futureOutlook:
      "India targets net-zero airport operations by 2030 and 50% domestic air traffic growth by FY28. Airport city models and MRO hubs will turn India into a global aviation cluster.",
    projectTypes: [
      "Greenfield Airports",
      "Terminal Expansion & Modernisation",
      "Runway & Taxiway Construction",
      "Cargo Terminal Development",
      "Airport City & Aerocity Projects",
      "MRO Facilities",
      "Helicopter Terminals (Heliports)",
    ],
    vendorInfraRole: [
      "Vendor discovery for speciality civil, MEP and IT/AV contractors",
      "Price discovery for structural glass, cladding and AGL systems",
      "Equipment hire for runway paving and compaction equipment",
      "Tender alerts from AAI, MIAL and greenfield airport developers",
      "Supply chain financing for SME vendors",
    ],
  },
  {
    slug: "transmission-lines-substations",
    name: "Transmission Lines & Substations",
    image: "https://vendorinfra.com/wp-content/uploads/2020/11/TRANSMISSION-LINE.jpg",
    description: "HV/EHV transmission networks and substation projects",
    overview:
      "India's grid is a critical enabler of industrial and renewable growth. Over 4.98 lakh circuit km of 400 kV+ lines connect all regions, with interstate capacity of 123 GW. Investments worth ₹4.1 lakh crore (FY25–30) focus on smart substations, HVDC corridors, and real-time SCADA systems. The network integrates solar and wind projects under Green Energy Corridors.",
    keyStats: [
      { label: "Transmission Lines", value: "4.98L ckm" },
      { label: "Smart GIS Substations", value: "250+" },
      { label: "Inter-Regional Transfer", value: "123 GW" },
      { label: "Green Integration Capacity", value: "60 GW" },
    ],
    programs: [
      "Green Energy Corridor I & II – linking renewables to the national grid",
      "HVDC Backbone: Raigarh–Pugalur–Trissur and Alipurduar–Siliguri corridors",
      "Smart Meter Mission: Nationwide rollout across all states",
    ],
    futureOutlook:
      "AI-driven load balancing and decentralized storage grids will shape India's next power-distribution era, ensuring zero blackout reliability.",
    projectTypes: [
      "220 kV, 400 kV & 765 kV Transmission Lines",
      "HVDC Transmission Corridors",
      "GIS & AIS Substations",
      "Line Bays & Switching Stations",
      "Underground Cable Systems",
      "Rural Electrification (RDSS / PMDP)",
    ],
    vendorInfraRole: [
      "Vendor discovery for tower fabricators, conductor & hardware suppliers",
      "Price benchmarking for ACSR/ACCC conductors, transformers & insulators",
      "Equipment hire for stringing equipment and tensioners",
      "Tender alerts from PGCIL, STUs and SECI",
      "Project financing support through reputed NBFCs",
    ],
  },
  {
    slug: "industrial-corridor",
    name: "Industrial Corridors",
    image: "https://vendorinfra.com/wp-content/uploads/2020/11/INDUSTRIAL-CORRIDOR.jpg",
    description: "DMIC, CBIC and other industrial zone developments",
    overview:
      "Industrial corridors are designed as integrated economic zones combining manufacturing, urban living, and logistics. Stretching over 4,200 km, they anchor India's goal to raise manufacturing GDP share to 25% by 2030. Each corridor links smart cities, ports, and freight networks, facilitating plug-and-play industrialization. They have generated massive foreign interest from Japan, Singapore, and Gulf sovereign funds.",
    keyStats: [
      { label: "Total Investment", value: "₹9L Cr+" },
      { label: "Corridor Length", value: "4,200 km" },
      { label: "Industrial Nodes", value: "32 (14 Live)" },
      { label: "Job Potential", value: "12 Million+" },
    ],
    programs: [
      "DMIC: ₹6 lakh crore | 1,500 km | 8 Industrial Nodes",
      "Dholera Smart City & Vikram Udyogpuri industrial township",
      "NICDIT Integrated Approach for Corridor governance",
    ],
    futureOutlook:
      "Next-gen corridors will adopt green manufacturing, AI logistics parks, and net-zero smart townships aligned with 'Make in India 2.0' mission.",
    projectTypes: [
      "DMIC & CBIC Node Development",
      "Industrial Parks & Manufacturing Zones",
      "Plug-and-Play Industrial Sheds",
      "Integrated Township Infrastructure",
      "Utility Corridors (Power, Water, Gas)",
      "Logistics Parks & Warehousing",
      "SEZ & NIMZ Development",
    ],
    vendorInfraRole: [
      "Vendor discovery across civil, MEP, pre-engineered buildings and utilities",
      "Price benchmarking for structural steel, pre-engineered structures and cables",
      "Equipment hire for earthmoving, piling and erection equipment",
      "Tender alerts from NICDC, NITI Aayog and state industrial authorities",
      "End-to-end supply chain financing",
    ],
  },
  {
    slug: "smart-cities",
    name: "Smart Cities",
    image: "https://vendorinfra.com/wp-content/uploads/2020/12/smart-city-3.jpg",
    description: "Integrated command centers, ICT infrastructure and urban services",
    overview:
      "Covering 100 cities, the Smart Cities Mission represents a nationwide push for data-driven urban transformation. Projects worth ₹2.1 lakh crore drive ICT integration for mobility, water, waste, and energy systems. Integrated Command & Control Centres (ICCCs) operate in 80+ cities, enabling digital governance and faster public service delivery. The mission has significantly enhanced urban resilience and citizen participation.",
    keyStats: [
      { label: "Smart Cities Covered", value: "100" },
      { label: "Approved Investment", value: "₹2.1L Cr" },
      { label: "Projects Completed", value: "7,400+ (88%)" },
      { label: "ICCCs Operational", value: "80+" },
    ],
    programs: [
      "Smart Mobility, Lighting & Monitoring Systems",
      "IoT Sensors for waste and water tracking",
      "EV Charging Networks in urban centres",
    ],
    futureOutlook:
      "By 2030, India plans to scale Smart City principles across 200+ Tier-2 and Tier-3 cities, making digital urban governance standard nationwide.",
    projectTypes: [
      "Integrated Command & Control Centres (ICCC)",
      "Smart Street Lighting (LED & IoT)",
      "Smart Water Metering & SCADA",
      "Surveillance & Traffic Management Systems",
      "Wi-Fi Hotspots & Public Broadband",
      "Area-Based Development (ABD)",
      "E-Governance Infrastructure",
    ],
    vendorInfraRole: [
      "Vendor discovery for ICT, civil and MEP contractors",
      "Price discovery for LED fittings, CCTV, networking and sensors",
      "Tender tracking from Smart Cities SPVs and ULBs",
      "Equipment hire for civil and installation works",
      "Working capital financing for SME technology vendors",
    ],
  },
  {
    slug: "ports",
    name: "Ports & Maritime",
    image: "https://vendorinfra.com/wp-content/uploads/2020/11/PORTS.jpg",
    description: "Major ports, minor ports and inland waterways infrastructure",
    overview:
      "Ports enable India's trade-led industrial strategy, handling 95% of cargo volume and 70% by value. Twelve major ports and 210 minor ports now hold 2,600 MTPA capacity with 1.49 billion-tonne throughput (FY25). Under Sagarmala Programme (₹5.6 lakh crore), automation, mechanization, and green initiatives are redefining maritime efficiency. Inland waterways development is reducing freight costs and GHG emissions.",
    keyStats: [
      { label: "Cargo Handled FY25", value: "1.49 BT" },
      { label: "Port Capacity", value: "2,600 MTPA" },
      { label: "Sagarmala Projects", value: "800+" },
      { label: "Green Port Renewable Share", value: "25%" },
    ],
    programs: [
      "Sagarmala Programme – coastal connectivity & logistics parks (₹5.6 lakh crore)",
      "Maritime India Vision 2030",
      "Port Automation Projects at JNPT and Paradip",
    ],
    futureOutlook:
      "Focus on blue-economy zones, offshore wind support ports, and green shipping fuel will position India as a global maritime hub by 2030.",
    projectTypes: [
      "Deep-draft Port Development",
      "Container Terminal Construction",
      "Jetty & Berth Construction",
      "Dredging & Reclamation",
      "Dry Docks & Ship Repair Facilities",
      "Inland Waterway Terminals (IWT)",
      "Fishing Harbour Development",
    ],
    vendorInfraRole: [
      "Vendor discovery for marine civil, dredging and cargo handling specialists",
      "Price benchmarking for sheet piles, fenders, bollards and crane systems",
      "Equipment hire for dredgers, grab cranes and barges",
      "Tender alerts from MoPSW, Major Port Trusts and Sagarmala",
      "Supply chain financing for port subcontractors",
    ],
  },
  {
    slug: "water-waste-water",
    name: "Water & Waste Water",
    image: "https://vendorinfra.com/wp-content/uploads/2020/11/WATER-AND-WASTE-WATER.jpg",
    description: "Water supply, sewage treatment and distribution networks",
    overview:
      "India's water infrastructure is advancing toward universal access and sustainability. The Jal Jeevan Mission achieved 96% rural coverage, bringing tap water to 14 crore households. Urban programs (AMRUT 2.0) are modernizing wastewater treatment capacities to 38,000 MLD by 2030. IoT networks now monitor water quality and leakage in 150+ cities, reducing losses and improving efficiency. Water recycling and reuse markets are growing in industrial corridors.",
    keyStats: [
      { label: "Rural Tap Coverage", value: "96%" },
      { label: "Households with Tap Water", value: "14 Cr+" },
      { label: "STP Capacity Target (2030)", value: "38,000 MLD" },
      { label: "JJM Investment", value: "₹3.6L Cr" },
    ],
    programs: [
      "Jal Jeevan Mission, AMRUT 2.0, and Namami Gange",
      "Leak Detection IoT Programs in urban networks",
      "SCADA Control Systems for real-time operation",
    ],
    futureOutlook:
      "Digital water governance, desalination and river basin mapping will drive India to full water security by 2030.",
    projectTypes: [
      "Bulk Water Supply Schemes",
      "Water Treatment Plants (WTP)",
      "Sewage Treatment Plants (STP)",
      "Underground Drainage (UGD) Networks",
      "Jal Jeevan Mission (FHTC connections)",
      "Desalination Plants",
      "Stormwater Drainage & Flood Management",
    ],
    vendorInfraRole: [
      "Vendor discovery for pipe suppliers, pump OEMs and civil contractors",
      "Price benchmarking for HDPE, DI & CI pipes, pumps and valves",
      "Equipment hire for trenching, pipe-laying and compaction equipment",
      "Tender alerts from NMCG, CPHEEO, AMRUT and Jal Boards",
      "Supply chain financing for SME contractors",
    ],
  },
  {
    slug: "renewable-power",
    name: "Renewable Power",
    image: "https://vendorinfra.com/wp-content/uploads/2020/11/RENEWABLE-POWER.jpg",
    description: "Solar, wind, hydro and hybrid renewable energy projects",
    overview:
      "India is charting a historic energy transition with 204 GW renewables in 2026 and a 500 GW target by 2030. Solar (104 GW) and wind (45 GW) drive this growth; hydro and biomass provide balance. The sector attracts global capital via green bonds and PPAs with data centers and industries. The Green Hydrogen Mission (₹8 lakh crore) and battery manufacturing initiatives position India as a clean tech export leader.",
    keyStats: [
      { label: "Total RE Capacity (2026)", value: "204 GW" },
      { label: "Target by 2030", value: "500 GW" },
      { label: "Solar / Wind / Hydro", value: "104 / 45 / 51 GW" },
      { label: "Investment 2024–30", value: "US$320B+" },
    ],
    programs: [
      "PLI Scheme for solar manufacturing (65 GW domestic capability)",
      "National Offshore Wind Mission",
      "Battery Storage Roadmap – 50 GWh target by 2027",
    ],
    futureOutlook:
      "Hybrid solar-wind parks, green ammonia exports, and decentralized micro-grids will anchor India's net-zero by 2070 strategy.",
    projectTypes: [
      "Utility-scale Solar Parks",
      "Rooftop Solar (C&I and Residential)",
      "Onshore Wind Farms",
      "Offshore Wind Projects",
      "Pumped Storage Hydro",
      "Solar-Wind Hybrid Projects",
      "Green Hydrogen Plants",
    ],
    vendorInfraRole: [
      "Vendor discovery for module, inverter, cable and BOP suppliers",
      "Price benchmarking for solar modules, wind towers and transformers",
      "Equipment hire for cranes, cable-laying and testing equipment",
      "Tender tracking from SECI, MNRE, NTPC and SERCs",
      "Project finance and working capital through green finance partners",
    ],
  },
  {
    slug: "power",
    name: "Power",
    image: "https://vendorinfra.com/wp-content/uploads/2020/12/Power.jpg",
    description: "Thermal, hydro and nuclear power generation projects",
    overview:
      "India's power sector is among the largest in the world, with 435 GW installed capacity supplying a peak demand of 253 GW. Renewables already form 46% of capacity, well ahead of global averages. Smart metering and digital distribution under the Revamped DISCOM Scheme are reducing T&D losses to 15.1%. Massive grid modernization and storage investments will support energy-intensive digital and EV economies.",
    keyStats: [
      { label: "Installed Power Capacity", value: "435 GW" },
      { label: "T&D Losses", value: "15.1%" },
      { label: "Smart Meters Deployed", value: "8.4 Crore" },
      { label: "FY25–30 Investments", value: "₹11L Cr" },
    ],
    programs: [
      "UDAY 2.0 & Smart Grid Mission",
      "National Power Distribution Reforms",
      "FGD Installation for Emission Control",
    ],
    futureOutlook:
      "Digital grids with AI forecasting, rooftop solar net-metering, and EV integration will create a flexible 24×7 renewable-ready power market.",
    projectTypes: [
      "Thermal Power Stations (Coal, Gas, Oil)",
      "Large Hydro Power Projects",
      "Nuclear Power Plants",
      "Pumped Storage Projects",
      "Captive Power Plants",
      "Waste-to-Energy Projects",
      "Combined Cycle Power Plants (CCPP)",
    ],
    vendorInfraRole: [
      "Vendor discovery for civil, mechanical and electrical specialists",
      "Price benchmarking for boiler components, turbines and HV cables",
      "Equipment hire for large-capacity cranes and specialised machinery",
      "Tender alerts from NTPC, NHPC, NPCIL and state GENCOs",
      "Supply chain financing for sub-vendors and ancillary suppliers",
    ],
  },
  {
    slug: "buildings-industrial",
    name: "Buildings & Industrial Projects",
    image: "https://vendorinfra.com/wp-content/uploads/2020/11/BUILDINGS-INDUSTRIAL-PROJECTS.jpg",
    description: "Commercial complexes, factories and industrial facilities",
    overview:
      "The construction sector fuels India's urban and industrial transformation, creating over 50 million jobs. Valued at US$480 billion in 2025 and heading toward US$1 trillion by 2030, growth is driven by housing, commercial real estate, and logistics parks. Transition toward green and digital construction — PEB, BIM, and sustainable materials — has cut project times by 40%. Government schemes like PM Awas Yojana and PLI for construction materials are stimulating capacity and innovation.",
    keyStats: [
      { label: "Market Value (2025)", value: "US$480B" },
      { label: "Target Market (2030)", value: "US$1T" },
      { label: "Green Buildings", value: "10B sq ft" },
      { label: "FDI Inflows (2020–24)", value: "US$28B" },
    ],
    programs: [
      "PM Awas Yojana – 3 crore homes and Smart Housing Mission",
      "PLI Schemes for cement and eco-steel",
      "Data Center Infrastructure Policy 2025",
    ],
    futureOutlook:
      "Digital twin technology, 3D printing, and carbon-neutral construction materials will dominate the built environment by 2030.",
    projectTypes: [
      "Commercial Office Complexes & IT Parks",
      "Data Centres",
      "Hospitals & Healthcare Facilities",
      "Educational Campuses",
      "Hotels & Hospitality Projects",
      "Industrial Factories & Warehouses",
      "Government & Institutional Buildings",
    ],
    vendorInfraRole: [
      "Vendor discovery for structural, interior and MEP contractors",
      "Price benchmarking for structural steel, glass, flooring and finishes",
      "Equipment hire for tower cranes, hoists and concrete pumps",
      "Tender alerts from CPWD, NBCC and state PWDs",
      "Supply chain financing for building material suppliers",
    ],
  },
  {
    slug: "oil-gas",
    name: "Oil & Gas",
    image: "https://vendorinfra.com/wp-content/uploads/2020/11/OIL-GAS.jpg",
    description: "Offshore platforms, pipelines and refinery infrastructure",
    overview:
      "India's oil & gas sector, valued at US$150 billion by 2030, is undergoing strategic transformation to support cleaner energy use. With refining capacity of 254 MMTPA (4th globally) and expanding pipelines (23,300 km → 34,000 km by 2028), India is emerging as Asia's refining hub. The government's vision is to boost natural gas to 15% of the energy mix and expand city gas distribution to 70% of districts.",
    keyStats: [
      { label: "Refining Capacity", value: "254 MMTPA" },
      { label: "Gas Pipeline Length", value: "23,300→34,000 km" },
      { label: "LNG Terminals", value: "8 + 4 Underway" },
      { label: "Sector Investment (2030)", value: "US$150B" },
    ],
    programs: [
      "National Gas Grid & CGD Expansion to 70% of districts",
      "Strategic Oil Reserves Phase II (12 MMT)",
      "Hydrogen-Ready Refinery Upgrades",
    ],
    futureOutlook:
      "Higher LNG storage, bio-fuel blending, and CCUS projects will transition India toward a low-carbon hydrocarbon economy by 2035.",
    projectTypes: [
      "Cross-Country Oil & Gas Pipelines",
      "City Gas Distribution (CGD) Networks",
      "LNG Import Terminals",
      "Petroleum Refineries & Petrochemical Plants",
      "Offshore Platforms & Jackets",
      "Storage Terminals & Depots",
      "Gas Processing Plants",
    ],
    vendorInfraRole: [
      "Vendor discovery for piping, instrumentation and civil specialists",
      "Price benchmarking for line pipes, fittings, valves and instruments",
      "Equipment hire for pipeline construction and testing equipment",
      "Tender alerts from ONGC, OIL, GAIL, IOC, BPCL and HPCL",
      "Supply chain financing through sector-specialised lenders",
    ],
  },
  {
    slug: "irrigation-tunneling",
    name: "Irrigation & Tunnel Projects",
    image: "https://vendorinfra.com/wp-content/uploads/2020/12/Irrigation-Tunnel-Project.jpg",
    description: "Dams, canals, micro-irrigation and tunnel construction",
    overview:
      "Irrigation supports India's agricultural backbone while tunnels enable connectivity across complex terrains. Under PMKSY, ₹3.5 lakh crore has been deployed to modernize canals and lift systems, covering over 100 lakh hectares of farmland. Advanced TBM methodologies drive 1,100 km of active tunnel projects across metros, hydro, and highways. Technological innovation is reducing construction time and improving safety across mountainous regions.",
    keyStats: [
      { label: "Irrigation Investment", value: "₹3.5L Cr" },
      { label: "Irrigated Area Covered", value: "100 Lakh ha" },
      { label: "Active Tunnel Projects", value: "350+" },
      { label: "Total Tunnel Length", value: "1,100 km" },
    ],
    programs: [
      "PMKSY, River Linking (Ken-Betwa), and National Hydro Tunneling Plan",
      "Smart Irrigation and Micro-Drip Expansion",
    ],
    futureOutlook:
      "Focus on climate-resilient irrigation and AI monitoring of hydro structures will strengthen rural productivity and climate adaptation by 2030.",
    projectTypes: [
      "Major & Medium Irrigation Dams",
      "Canal Networks & Lining Works",
      "Micro-Irrigation Systems (Drip & Sprinkler)",
      "Lift Irrigation Schemes",
      "Road, Rail & Hydro Tunnels",
      "Pumped Storage Hydro Tunnels",
      "Underground Metro Tunnels",
    ],
    vendorInfraRole: [
      "Vendor discovery for TBM operators, shotcrete and civil specialists",
      "Price benchmarking for HDPE liners, waterproofing and concrete additives",
      "Equipment hire for TBMs, drilling jumbos and concrete pumps",
      "Tender alerts from CWC, state irrigation departments and PMKSY",
      "Supply chain financing for sub-contractors",
    ],
  },
  {
    slug: "solid-waste-management",
    name: "Solid Waste Management",
    image: "https://vendorinfra.com/wp-content/uploads/2020/12/Solid-Waste-Management.jpg",
    description: "Waste processing plants, landfill and material recovery facilities",
    overview:
      "India produces 165,000 tonnes of municipal waste daily; scientific management is now core to urban sustainability. Driven by the Swachh Bharat Mission (U) 2.0, waste processing capacity has reached 76% of total generation (up from just 20% in 2014). Cities adopt GPS tracking, AI sorting, and integrated segregation systems. Recycling and waste-to-energy initiatives make SWM a circular-economy pillar.",
    keyStats: [
      { label: "Daily Municipal Waste", value: "1,65,000 T" },
      { label: "Waste Processed", value: "76%" },
      { label: "WTE Plants / Capacity", value: "55 / 440 MW" },
      { label: "SBM-U 2.0 Investment", value: "₹60,000 Cr" },
    ],
    programs: [
      "Swachh Bharat Mission Urban 2.0",
      "Waste-to-Energy & C&D Recycling Plants",
      "AI Tracking & Digital Landfill Maps",
    ],
    futureOutlook:
      "By 2030 India aims for 100% scientific waste processing and near-zero landfills through private participation and green technologies.",
    projectTypes: [
      "Integrated Solid Waste Management Facilities",
      "Sanitary Landfills & Bio-remediation",
      "Waste-to-Energy (WtE) Plants",
      "Material Recovery Facilities (MRF)",
      "Composting & Biogas Plants",
      "Construction & Demolition Waste Plants",
      "Hazardous Waste Treatment Facilities",
    ],
    vendorInfraRole: [
      "Vendor discovery for civil, mechanical and environmental contractors",
      "Price benchmarking for HDPE liners, leachate systems and conveyors",
      "Equipment hire for compactors, shredders and sorting systems",
      "Tender alerts from ULBs, Smart Cities SPVs and SBM Mission",
      "Supply chain financing for SME vendors",
    ],
  },
];

export function getSectorBySlug(slug: string): Sector | undefined {
  return sectors.find((s) => s.slug === slug);
}
