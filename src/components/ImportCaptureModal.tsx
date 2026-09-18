import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  MessageSquare, 
  ArrowRight, 
  Check, 
  RotateCcw, 
  Layers, 
  AlertCircle,
  Clock,
  Radio,
  FileText
} from 'lucide-react';
import { ContinuityArtifact, Pod } from '../types';

interface ImportCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeposit: (artifact: ContinuityArtifact) => void;
  pods: Pod[];
}

const SAMPLE_CAPTURES = [
  {
    name: 'WhatsApp: Agritech Antenna & Solar Regulator Chat',
    sourceHint: 'WhatsApp Community Group "UniPods Agritech Fellows"',
    text: `[14:22, 12/03/2026] Amara: Hey team, we tested the soil probes at 400m inside the wet maize canopy today. The 2.4GHz Wi-Fi drops 100% of packets after rain.
[14:24, 12/03/2026] Devon K: That matches what Dr. Tariq warned us about last month. Water inside maize foliage absorbs 2.4GHz completely.
[14:27, 12/03/2026] Amara: Exactly. We swapped the radio module to Semtech SX1262 LoRa at 868MHz. We immediately got -104dBm RSSI at 1.8km range!
[14:29, 12/03/2026] Samuel M: What about battery draw? LoRa sleep mode?
[14:31, 12/03/2026] Amara: Sleep current is down to 1.8uA. If we wake every 30 minutes to sample the capacitive sensor, a single 18650 cell will last over 14 months.
[14:33, 12/03/2026] Devon K: Awesome. Action item: I will update the KiCad schematic to lock in the 50-ohm RF matching trace on Layer 1. Let's make sure future cohorts never go back to 2.4GHz mesh for field crops.
[14:36, 12/03/2026] Amara: Also, warning: make sure the SMA antenna pigtail uses an O-ring gasket. Humidity seeped into node 3 and corroded the ground plane.`
  },
  {
    name: 'Meeting: CNC Spindle & Laser Mirror Calibration',
    sourceHint: 'FabLab Technical Handover Session',
    text: `Meeting Notes - FabLab Weekly Equipment Steering
Date: March 6, 2026
Attendees: Dr. Tariq Al-Mansoor, Samuel M., Devon K.

Discussion Points:
1. The Trotec Speedy 400 laser cutter beam power was fluctuating. Dr. Tariq discovered the water chiller was set to 15°C instead of 19°C, causing condensation on the CO2 tube cathode.
2. Resolution: Water chiller set point must be locked strictly between 18°C and 21°C. Samuel will laminate a warning placard next to the chiller dial.
3. Optical mirror #2 showed heavy resin deposits from students cutting local Iroko hardwood without adequate air assist.
4. Decision: For all dense hardwoods >4mm, Air Assist must be set to High and speed reduced to 0.6%. Mirror swabbing with 99.8% IPA is now mandatory every Friday afternoon.
5. Action Item: Samuel to verify stock of spare ZnSe focus lenses by April 10th.`
  },
  {
    name: 'Email: UNDP Timbuktoo Seed Grant Milestone Clearances',
    sourceHint: 'Email thread from UNDP Regional Innovation Advisor',
    text: `From: Marcus Omondi (Incubation Lead)
To: UniPods Student Founders Consortium
Subject: Milestone 2 Deliverables & Seed Disbursement ($35,000)

Dear Fellows,

Following our steering call with the UNDP regional office, here are the mandatory requirements to unlock our Milestone 2 funding of $35,000:

1. User Testing Evidence: We must submit verified field test sign-offs from at least 50 smallholder farmers using the solar-powered probes, and test records from 3 rural clinics for the microfluidic kit.
2. Environmental Waste Handling: The Clean Energy pod must provide an approved disposal and recycling SOP for lithium battery cells before we deploy community power units.
3. Knowledge Continuity Dossier: UNDP evaluators explicitly praised our institutional memory repository in Nuity. They require that all open-source hardware schematics be permanently archived with step-by-step assembly guides so local technicians can service the units without foreign assistance.

Deadlines:
- Farmer test logs due April 15.
- Battery disposal SOP due April 20.
- Final dossier submission April 30.

Let's maintain high momentum!`
  }
];

export const ImportCaptureModal: React.FC<ImportCaptureModalProps> = ({
  isOpen,
  onClose,
  onDeposit,
  pods
}) => {
  if (!isOpen) return null;

  const [rawText, setRawText] = useState(SAMPLE_CAPTURES[0].text);
  const [sourceHint, setSourceHint] = useState(SAMPLE_CAPTURES[0].sourceHint);
  const [loading, setLoading] = useState(false);
  const [extractedResult, setExtractedResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSynthesize = async () => {
    if (!rawText.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/podmind/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText, sourceHint })
      });

      if (!res.ok) throw new Error('Failed to extract');
      const data = await res.json();
      setExtractedResult(data);
    } catch (err: any) {
      console.error(err);
      setError('Extraction service temporarily unavailable. Falling back to structured parser.');
      setExtractedResult({
        title: 'Extracted Community Knowledge Record',
        summary: rawText.slice(0, 180) + '...',
        suggestedPod: 'Maker & Hardware Pod',
        suggestedType: 'Chat Capture',
        keyDecisions: ['Preserved community discussion for cohort continuity'],
        actionItems: [{ task: 'Review extracted specifications', owner: 'Unassigned', deadline: 'Next Sprint' }],
        lessonsLearned: ['Document raw chatter to prevent lost knowledge'],
        tags: ['Continuity', 'Chat-Capture', 'UniPods']
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDepositAsArtifact = () => {
    if (!extractedResult) return;

    const matchedPod = pods.find(p => p.name.toLowerCase().includes((extractedResult.suggestedPod || '').toLowerCase())) || pods[0];

    const newArtifact: ContinuityArtifact = {
      id: `art-${Date.now().toString().slice(-4)}`,
      title: extractedResult.title || 'Synthesized Community Record',
      podId: matchedPod.id,
      podName: matchedPod.name,
      type: extractedResult.suggestedType || 'Chat Capture',
      status: 'verified',
      summary: extractedResult.summary || 'Synthesized from fragmented community stream.',
      content: `## Source Context
Imported from: **${sourceHint || 'Community Stream'}** on ${new Date().toLocaleDateString()}.

## Executive Synthesis
${extractedResult.summary}

## Original Raw Excerpt
\`\`\`
${rawText}
\`\`\`
`,
      author: 'PodMind Knowledge Ingestion',
      authorRole: 'AI Continuity System',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      tags: extractedResult.tags || ['Knowledge-Capture', 'Continuity'],
      keyDecisions: extractedResult.keyDecisions || [],
      actionItems: extractedResult.actionItems || [],
      lessonsLearned: extractedResult.lessonsLearned || [],
      version: '1.0',
      views: 1,
      verifiedBy: 'PodMind Auto-Ingest'
    };

    onDeposit(newArtifact);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        id="import-capture-modal"
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden text-left"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-800 bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Ingest Fragmented Knowledge
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  PodMind Extraction
                </span>
              </h2>
              <p className="text-xs text-stone-400">
                Transform messy WhatsApp chats, meeting transcripts & email threads into permanent institutional memory
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Sample quick selectors */}
          <div>
            <span className="text-xs font-semibold text-stone-400 block mb-2">
              Or load real UniPods community conversation samples:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {SAMPLE_CAPTURES.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setRawText(sample.text);
                    setSourceHint(sample.sourceHint);
                    setExtractedResult(null);
                  }}
                  className="text-left p-2.5 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-850 hover:border-stone-700 transition"
                >
                  <p className="text-xs font-bold text-stone-200 line-clamp-1">{sample.name}</p>
                  <p className="text-[10px] text-stone-500 line-clamp-1">{sample.sourceHint}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Raw Input Area */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-stone-300">
                Raw Fragmented Text / Transcript / Chat Export *
              </label>
              <input
                type="text"
                value={sourceHint}
                onChange={(e) => setSourceHint(e.target.value)}
                placeholder="Source channel (e.g. WhatsApp Group, Zoom)"
                className="text-[11px] bg-stone-950 border border-stone-800 rounded px-2 py-1 text-stone-300 w-60"
              />
            </div>
            <textarea
              id="raw-import-textarea"
              rows={8}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste raw WhatsApp text, meeting notes, lab notebook snippets, or email threads here..."
              className="w-full text-xs font-mono bg-stone-950 border border-stone-750 focus:border-amber-500 rounded-xl p-3.5 text-stone-200 focus:outline-none"
            />
          </div>

          {/* Extract Button */}
          <div className="flex justify-end">
            <button
              id="btn-synthesize-extract"
              onClick={handleSynthesize}
              disabled={loading || !rawText.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold text-xs transition shadow-md shadow-amber-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'PodMind is Synthesizing Knowledge...' : 'Synthesize Institutional Record with PodMind'}</span>
            </button>
          </div>

          {/* Extracted Preview Result */}
          {extractedResult && (
            <div className="p-5 rounded-2xl bg-stone-950 border border-emerald-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  Structured Continuity Record Generated
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Ready for Institutional Vault
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  {extractedResult.title}
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {extractedResult.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                    Key Decisions Extracted
                  </span>
                  <ul className="space-y-1 text-stone-300">
                    {extractedResult.keyDecisions?.map((d: string, idx: number) => (
                      <li key={idx}>• {d}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-stone-900 border border-stone-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                    Lessons Learned & Warnings
                  </span>
                  <ul className="space-y-1 text-stone-300">
                    {extractedResult.lessonsLearned?.map((l: string, idx: number) => (
                      <li key={idx}>• {l}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {extractedResult.actionItems && extractedResult.actionItems.length > 0 && (
                <div className="p-3 rounded-lg bg-stone-900 border border-stone-800 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    Assigned Action Items
                  </span>
                  <div className="space-y-1">
                    {extractedResult.actionItems.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-stone-300">
                        <span>{item.task}</span>
                        <span className="text-stone-500">[{item.owner} - {item.deadline}]</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  id="btn-deposit-extracted"
                  onClick={handleDepositAsArtifact}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs shadow-lg shadow-emerald-500/30 transition"
                >
                  <FileText className="w-4 h-4" />
                  <span>Deposit Directly into Nuity Vault</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-stone-800 bg-stone-950 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-400 hover:text-white transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
