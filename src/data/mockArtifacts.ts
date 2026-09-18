import { ContinuityArtifact } from '../types';

export const INITIAL_ARTIFACTS: ContinuityArtifact[] = [
  {
    id: 'art-001',
    title: 'ADR-012: Selection of LoRaWAN 868MHz vs ESP-NOW for Field Agritech Probes',
    podId: 'agri-drone',
    podName: 'Agri-Tech & Drone Pod',
    type: 'Decision Log',
    status: 'verified',
    summary: 'Architectural evaluation and field test decision choosing SX1262 LoRa modules operating at 868MHz over 2.4GHz ESP-NOW for high-canopy maize farms.',
    content: `## Context & Problem Statement
During wet season trials at the University Agronomy Research Field, soil moisture nodes deployed 400m into dense 2.5m tall maize crops suffered complete 2.4GHz packet drop-off using ESP32 Wi-Fi / ESP-NOW protocols due to water absorption in foliage.

## Considered Options
1. **ESP-NOW (2.4GHz)**: Cheap ($2.50 per node), high throughput, but <60m range under wet maize canopy.
2. **Cellular NB-IoT (SIM7080G)**: Reliable, but recurring SIM subscription costs ($3/month/node) unsustainable for smallholder farmers.
3. **LoRaWAN (SX1262 868MHz)**: Long range (up to 4.2km tested), low power (sleep current 1.8µA), license-free ISM band.

## Decision Outcome
Selected **SX1262 LoRaWAN 868MHz with Deep Sleep Cycle (Wake every 30m)**.
- Transmit power tuned to 14dBm.
- Antenna: 1/4 wave tuned whip mounted 1.5m above ground level.
- Central gateway mounted atop the Water Tower (Alt: 22m).

## Continuity Impact & Warnings
Future student cohorts **must not** attempt to revert to 2.4GHz mesh for orchard or maize deployments. All sensor PCB revisions must maintain the 50Ω RF impedance matching trace on Layer 1.`,
    author: 'Amara Okafor',
    authorRole: 'Senior Agritech Fellow',
    createdAt: '2026-03-12',
    updatedAt: '2026-03-14',
    tags: ['LoRaWAN', 'Hardware', 'RF Design', 'Agritech', 'Telemetry'],
    keyDecisions: [
      'Standardized on Semtech SX1262 transceiver running at 868MHz ISM band',
      'Discarded 2.4GHz due to 92% attenuation through water-rich maize foliage',
      'Gateway permanently installed atop University Water Tower with solar backup'
    ],
    actionItems: [
      { task: 'Release KiCAD v2.3 gerber files to shared UniPod repo', owner: 'Amara Okafor', deadline: 'Completed', completed: true },
      { task: 'Test battery life with 18650 LiFePO4 cells through 90 days', owner: 'Devon K.', deadline: '2026-05-30', completed: false }
    ],
    lessonsLearned: [
      'Rainfall creates dynamic attenuation; RF link margin must be at least +18dB above sensitivity floor',
      'SMA pigtails without O-ring gaskets leak humidity within 2 weeks in tropical climates'
    ],
    version: '2.3',
    views: 284,
    verifiedBy: 'Dr. Tariq Al-Mansoor',
    starred: true
  },
  {
    id: 'art-002',
    title: 'SOP-004: Laser Cutter Power & Speed Matrix for African Hardwoods & Acrylic',
    podId: 'maker-hardware',
    podName: 'Maker & Hardware Pod',
    type: 'Hardware SOP',
    status: 'verified',
    summary: 'Calibrated operational baseline for the Trotec Speedy 400 80W CO2 Laser cutter to prevent mirror thermal cracking, charred edges, and exhaust fires.',
    content: `## Purpose
To maintain consistent cutting and engraving tolerances across student projects and prevent costly optic replacements. The ZnSe focus lens was cracked in 2025 due to incorrect focal distance and lack of air assist.

## Safety Check Sequence Before Power On
1. Verify water chiller temperature is strictly between **18°C and 21°C**.
2. Inspect honeycomb bed for scrap buildup to avoid secondary flaming.
3. Switch on industrial exhaust blower and check pressure differential meter (>450 Pa).
4. Run auto-focus plunger gauge on material surface.

## Calibrated Speed & Power Table (80W CO2 Tube)
- **3.0mm Cast Acrylic**: Power 75%, Speed 1.8%, Frequency 20,000Hz, Air Assist High.
- **4.0mm Birch Plywood**: Power 85%, Speed 1.2%, Frequency 1,000Hz, Air Assist High.
- **6.0mm Local Iroko Hardwood**: Power 95%, Speed 0.6%, Frequency 1,000Hz, 2 Passes required.
- **1.5mm Anodized Aluminum (Etching)**: Power 40%, Speed 80%, Frequency 30,000Hz.

## Maintenance Rule
Every Friday afternoon, clean the 45-degree beam combiner mirror with reagent-grade isopropyl alcohol (IPA 99.8%) and lint-free optical paper only.`,
    author: 'Dr. Tariq Al-Mansoor',
    authorRole: 'FabLab Director',
    createdAt: '2026-02-18',
    updatedAt: '2026-03-01',
    tags: ['Laser Cutting', 'SOP', 'FabLab', 'Safety', 'Equipment Maintenance'],
    keyDecisions: [
      'Strictly prohibited cutting PVC, vinyl, or synthetic leather (releases chlorine gas)',
      'Air assist solenoid must be engaged on all cuts >3mm thick',
      'Weekly mirror inspection logged on Nuity physical QR station'
    ],
    actionItems: [
      { task: 'Order spare ZnSe 2.0" focus lenses from certified distributor', owner: 'Lab Tech Samuel', deadline: '2026-04-10', completed: false },
      { task: 'Laminate SOP matrix card and fasten adjacent to operator console', owner: 'Dr. Tariq', deadline: 'Completed', completed: true }
    ],
    lessonsLearned: [
      'Cutting untreated local Iroko wood creates heavy resin condensation on optical mirrors; daily swab mandatory',
      'Never leave laser unattended; keep dry chemical fire extinguisher within 2 meters'
    ],
    version: '3.1',
    views: 412,
    verifiedBy: 'Dr. Tariq Al-Mansoor',
    starred: true
  },
  {
    id: 'art-003',
    title: 'Post-Mortem: Drone Airframe Delamination During 45km/h Crosswind Field Test',
    podId: 'agri-drone',
    podName: 'Agri-Tech & Drone Pod',
    type: 'Post-Mortem',
    status: 'verified',
    summary: 'Root cause analysis of the crash of Scout-Drone Prototype Mk.2 during high-speed autonomous flight tests over the North Farm sector.',
    content: `## Incident Overview
On March 4th at 15:42, Scout-Drone Mk.2 crashed from 35m altitude after motor arm #3 severed at the fuselage joint. The vehicle entered an unrecoverable yaw spin. Ground telemetry recorded 112A peak current spike immediately prior.

## Root Cause Analysis (5-Whys)
1. **Why did the arm sever?** The 3D printed arm clamp experienced shear failure along layer print lines.
2. **Why along layer lines?** The clamp was printed in standard PLA on a flat orientation rather than on edge, orienting layer lines parallel to the flight bending moment.
3. **Why PLA?** The team ran out of Carbon-Fiber Nylon (PA-CF) filament and substituted PLA without notifying the structures lead.
4. **Why was there no PA-CF?** Lead time on imported spool was 6 weeks; no stock buffer was logged in Nuity inventory.
5. **Why was high crosswind allowed?** Pre-flight gust limits were set verbally rather than checked against an anemometer checklist.

## Corrective Actions & Continuity Mandates
- **Mandate 1**: All structural flight motor mounts must be 3D printed exclusively in annealed PA-CF or CNC-milled 3K carbon twill sheet.
- **Mandate 2**: Standardized flight checklist with digital sign-off before arming Pixhawk telemetry.
- **Mandate 3**: Maker Pod now maintains a 4-spool reserve of PA-CF locked for aerospace prototypes.`,
    author: 'Kofi Mensah & Amara Okafor',
    authorRole: 'Flight Test Safety Officer',
    createdAt: '2026-03-05',
    updatedAt: '2026-03-08',
    tags: ['Post-Mortem', 'Drone', '3D Printing', 'Safety', 'Failure Analysis'],
    keyDecisions: [
      'Banned standard PLA for all flight-critical structural brackets',
      'Established minimum stock trigger for specialized engineering filaments',
      'Integrated mandatory pre-flight digital checklist on mobile'
    ],
    actionItems: [
      { task: 'Redesign arm clamp with gusset reinforcement in SolidWorks', owner: 'Devon K.', deadline: 'Completed', completed: true },
      { task: 'Anneal new PA-CF prototypes at 80°C for 6 hours in lab oven', owner: 'Samuel M.', deadline: '2026-03-25', completed: false }
    ],
    lessonsLearned: [
      'Layer orientation in FDM 3D printing is as critical as material tensile strength',
      'Never permit prototype substitutions without formal engineering peer review'
    ],
    version: '1.2',
    views: 350,
    verifiedBy: 'Dr. Tariq Al-Mansoor',
    starred: false
  },
  {
    id: 'art-004',
    title: 'Chat Capture: WhatsApp Synthesis on High-Voltage Battery Spot Welding Settings',
    podId: 'clean-energy',
    podName: 'Clean Energy & Climate Pod',
    type: 'Chat Capture',
    status: 'active',
    summary: 'Synthesized discussion from 48 WhatsApp messages across 6 fellows troubleshooting nickel strip blowouts while assembling 48V 100Ah recycled telecom pack.',
    content: `## Source Context
Imported and synthesized from the "UniPods Energy Fellows" WhatsApp community group on Feb 26, 2026. Captured to ensure future student builders don't ruin salvaged 21700 cells.

## Captured Problem
Fellows noticed that at 45ms pulse width, the spot welder was blowing through 0.15mm pure nickel strips and puncturing cell positive terminals, creating thermal short hazards.

## Community Solution Developed in Chat
- **Optimal Pressure**: 3.5kg hand pressure on dual welding pins. If pressure is too light, spark arc occurs on the surface.
- **Electrode Dressing**: Copper-alumina electrodes must be polished with 800-grit sandpaper every 100 welds to remove black oxide buildup.
- **Energy Setting**: Dial back pulse 1 to 8ms (pre-heat), pulse 2 to 24ms (fusion weld).
- **Material Warning**: Reject cheap "nickel-plated steel" strips from local market; use salt-water test (submerge sample in saltwater overnight; steel rusts, pure nickel remains shiny).`,
    author: 'Zainab Ibrahim (Curated)',
    authorRole: 'Knowledge Lead',
    createdAt: '2026-02-27',
    updatedAt: '2026-02-27',
    tags: ['Battery', 'Spot Welding', 'WhatsApp Capture', 'Safety', 'Hardware Hacks'],
    keyDecisions: [
      'Set spot welder dual-pulse settings: Pulse 1 = 8ms, Pulse 2 = 24ms',
      'Mandated saltwater corrosion test for all incoming nickel strip batches',
      'Polishing electrodes every 100 welds added to student lab bench card'
    ],
    actionItems: [
      { task: 'Upload video demo of correct pin pressure to UniPod video share', owner: 'Kofi Mensah', deadline: '2026-04-01', completed: false }
    ],
    lessonsLearned: [
      'Black oxide on welding tips causes 80% of accidental cell punctures',
      'Nickel-plated steel increases pack internal resistance by 400% compared to pure nickel'
    ],
    version: '1.0',
    views: 198,
    verifiedBy: 'Kofi Mensah',
    starred: false
  },
  {
    id: 'art-005',
    title: 'Milestone Brief: UNDP Timbuktoo Seed Grant Q1 Report & Milestone 2 Pitch Notes',
    podId: 'incubation-grants',
    podName: 'Incubation, Grants & Policy Pod',
    type: 'Grant & Funding',
    status: 'verified',
    summary: 'Full documentation of Milestone 1 completion, financial ledger reconciliation, and strategic pitch notes for Milestone 2 ($35,000 disbursement).',
    content: `## Executive Overview
The UniPods consortium successfully delivered Milestone 1 on January 28, 2026: "Delivery of 3 functional field-deployed proof-of-concept prototypes in Agritech, Health, and Energy".

## Milestone 2 Requirements ($35,000 Disbursement)
1. **User Testing**: Field trials with at least 50 verified cooperative farmers and 3 community health clinics.
2. **IP Declaration**: Provisional patent filing or open-source hardware attribution agreement lodged with the university IP office.
3. **Continuity Guarantee**: Full digital continuity dossier in Nuity showing repeatable manufacturing documentation and training materials for local technicians.

## Strategic Pitch Guidance for Cohort
- Evaluators prioritize **local repairability**: emphasize that 78% of components can be sourced or fabricated within the UniPod FabLab without overseas imports.
- Highlight **community adoption rate** over raw technical specs.
- Showcase cross-pod synergies (e.g. Clean Energy battery powering Biotech diagnostic kits).`,
    author: 'Marcus Omondi',
    authorRole: 'Incubator Program Lead',
    createdAt: '2026-01-30',
    updatedAt: '2026-03-02',
    tags: ['UNDP', 'Timbuktoo', 'Seed Funding', 'Grants', 'Milestones', 'IP'],
    keyDecisions: [
      'Dual-track IP model: Core hardware schematics open-source (CERN-OHL), proprietary AI model weights retained for university spin-out',
      'Established $2,500 emergency repair reserve fund per deployed community hub'
    ],
    actionItems: [
      { task: 'Collect signed field trial logs from 50 cooperative farmers', owner: 'Amara Okafor', deadline: '2026-04-15', completed: false },
      { task: 'File provisional utility model patent for low-cost peristaltic pump', owner: 'Marcus Omondi & Dr. Chen', deadline: '2026-04-30', completed: false }
    ],
    lessonsLearned: [
      'Grant disbursement requires exact timestamped photo verification of deployed units in rural fields',
      'Engaging community chiefs prior to flight telemetry testing accelerates adoption by 300%'
    ],
    version: '2.0',
    views: 520,
    verifiedBy: 'Marcus Omondi',
    starred: true
  },
  {
    id: 'art-006',
    title: 'Tech Spec: Low-Cost Peristaltic Micro-Pump for Point-of-Care Blood Cartridges',
    podId: 'biotech-health',
    podName: 'Biotech & Diagnostic Pod',
    type: 'Technical Spec',
    status: 'verified',
    summary: 'Detailed CAD bill of materials, stepper motor microstepping driver calibration, and silicone tubing specifications for 0.05ml/min metering precision.',
    content: `## System Architecture
Point-of-care microfluidic assays require non-pulsatile fluid delivery between 0.02ml/min and 0.15ml/min without contaminating patient samples with pump internals.

## Mechanism & Parts Breakdown
1. **Housing**: 3D printed in PETG on Prusa MK4 with 0.15mm layer height (food/medical grade filament).
2. **Roller Assembly**: 3x 608ZZ miniature ball bearings running on 4mm dowel pins.
3. **Actuator**: NEMA 17 Stepper motor (1.8° step angle) driven by TMC2209 silent driver in StealthChop mode at 1/64 microstepping.
4. **Tubing**: Medical-grade platinum-cured silicone (ID 1.0mm, OD 3.0mm, Shore 50A).

## Calibration Formula
\`Steps_per_ml = (Steps_per_rev * Microsteps) / (Pi * Rotor_Diameter * Tubing_Cross_Section)\`
For current prototype: **12,480 steps = 1.00 ml reagent delivery** (±1.4% error margin).`,
    author: 'Dr. Nadia Chen',
    authorRole: 'Bioengineering Faculty Advisor',
    createdAt: '2026-02-10',
    updatedAt: '2026-03-11',
    tags: ['Microfluidics', 'Health', 'Diagnostics', 'NEMA17', 'Biotech', '3D Printing'],
    keyDecisions: [
      'Chose silicone peristaltic design over syringe pump to enable continuous circulation and disposable fluid paths',
      'Specified TMC2209 driver to eliminate stepper motor acoustic vibration that disrupted optical droplet sensors'
    ],
    actionItems: [
      { task: 'Submit pump housing STL files to FabLab directory', owner: 'Nadia Chen', deadline: 'Completed', completed: true },
      { task: 'Run 1,000-hour tube fatigue test under continuous 37°C incubation', owner: 'Farhan S.', deadline: '2026-05-15', completed: false }
    ],
    lessonsLearned: [
      'Standard vinyl tubing hardens and cracks within 48 hours; only platinum-cured silicone is biocompatible for blood assays'
    ],
    version: '1.4',
    views: 310,
    verifiedBy: 'Dr. Nadia Chen',
    starred: false
  },
  {
    id: 'art-007',
    title: 'Steering Meeting: Inter-Pod Knowledge Handover & Cohort 2026 Graduation Plan',
    podId: 'maker-hardware',
    podName: 'Maker & Hardware Pod',
    type: 'Meeting Synthesis',
    status: 'active',
    summary: 'Executive synthesis of the Q1 all-hands UniPods council addressing the upcoming graduation of 14 senior student founders and the transition protocol.',
    content: `## Meeting Minutes & Council Decisions
**Date**: March 10, 2026 | **Chaired by**: Dr. Tariq Al-Mansoor & Marcus Omondi
**Attendees**: Leads from all 6 Pods (Amara, Kofi, Nadia, Zainab, Marcus, Tariq)

## Key Points & Resolutions
1. **The Graduation Cliff**: 14 key engineering fellows graduate in June. Without structured continuity, their hands-on knowhow (e.g. drone flight telemetry, custom CNC tool offsets, grant compliance ledger) will vanish.
2. **Nuity Continuity Mandate**: Every graduating fellow must log at least 3 verified ADRs or SOPs in Nuity before clearance certificate is signed.
3. **PodMind Training**: All new incoming student cohorts will use PodMind as their first onboarding assistant to query past mistakes, CAD models, and supplier catalogs.
4. **Physical QR Badges**: Dr. Tariq will attach Nuity QR code plaques to each major machine in the FabLab, linking directly to the corresponding machine SOP.`,
    author: 'Zainab Ibrahim',
    authorRole: 'Council Secretary & AI Fellow',
    createdAt: '2026-03-10',
    updatedAt: '2026-03-10',
    tags: ['Meeting', 'Governance', 'Graduation Handover', 'Continuity', 'UniPods Strategy'],
    keyDecisions: [
      'Graduation clearance officially tied to digital knowledge deposit in Nuity',
      'QR plaques deployed to all 12 major lab machines by end of March',
      'PodMind declared official AI mentor for Cohort 2026 onboarding'
    ],
    actionItems: [
      { task: 'Print and resin-coat machine QR badges for FabLab', owner: 'Samuel M.', deadline: '2026-03-28', completed: false },
      { task: 'Audit each pod for single-person knowledge dependencies', owner: 'Zainab Ibrahim', deadline: '2026-04-05', completed: false }
    ],
    lessonsLearned: [
      'Waiting until the final month of graduation to transfer knowledge results in 70% information loss'
    ],
    version: '1.0',
    views: 440,
    verifiedBy: 'Dr. Tariq Al-Mansoor',
    starred: true
  }
];
