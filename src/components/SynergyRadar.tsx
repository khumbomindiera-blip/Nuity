import React, { useState } from 'react';
import { 
  SynergyConnection, 
  Pod 
} from '../types';
import { 
  Network, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Plus, 
  CheckCircle2, 
  Layers, 
  TrendingUp,
  Share2,
  Clock
} from 'lucide-react';

interface SynergyRadarProps {
  synergies: SynergyConnection[];
  pods: Pod[];
  onAddSynergy: (synergy: SynergyConnection) => void;
  onSelectPod: (podId: string) => void;
}

export const SynergyRadar: React.FC<SynergyRadarProps> = ({
  synergies,
  pods,
  onAddSynergy,
  onSelectPod
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [sourcePodId, setSourcePodId] = useState(pods[0]?.id || '');
  const [targetPodId, setTargetPodId] = useState(pods[1]?.id || '');
  const [artifactTitle, setArtifactTitle] = useState('');
  const [synergyType, setSynergyType] = useState<SynergyConnection['synergyType']>('Shared Hardware SOP');
  const [description, setDescription] = useState('');
  const [impact, setImpact] = useState('');

  const filtered = selectedType === 'all' 
    ? synergies 
    : synergies.filter(s => s.synergyType === selectedType);

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artifactTitle.trim() || !description.trim()) return;

    const source = pods.find(p => p.id === sourcePodId);
    const target = pods.find(p => p.id === targetPodId);

    const newSyn: SynergyConnection = {
      id: `syn-${Date.now().toString().slice(-4)}`,
      sourcePodId,
      sourcePodName: source ? source.name : 'Maker & Hardware Pod',
      targetPodId,
      targetPodName: target ? target.name : 'Agri-Tech & Drone Pod',
      artifactTitle: artifactTitle.trim(),
      synergyType,
      description: description.trim(),
      impact: impact.trim() || 'Accelerated prototyping and avoided duplicated trial cycles.'
    };

    onAddSynergy(newSyn);
    setShowAddModal(false);
    setArtifactTitle('');
    setDescription('');
    setImpact('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Collective Intelligence Matrix
            </span>
            <span className="text-xs text-stone-500">• Cross-Pod Knowledge Transfers</span>
          </div>
          <h2 className="text-2xl font-black text-stone-100 tracking-tight mb-2">
            Cross-Pod Synergy Radar
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
            Eliminates siloed duplication across UniPod workstreams. When one team solves a hardware, firmware, or grant roadblock, every other Pod gains instant access.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs shadow-md shadow-emerald-500/20 shrink-0 self-start md:self-auto transition"
        >
          <Plus className="w-4 h-4" />
          <span>Record Cross-Pod Synergy</span>
        </button>
      </div>

      {/* Metric Highlight Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black text-white block">180+ Hours</span>
            <span className="text-xs text-stone-400">Prototyping Time Saved</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black text-white block">94.8%</span>
            <span className="text-xs text-stone-400">Hardware SOP Reuse Rate</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-black text-white block">$35,000</span>
            <span className="text-xs text-stone-400">Co-Disbursed Grant Capital</span>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-stone-400 font-semibold shrink-0">Filter by Transfer:</span>
        {['all', 'Shared Hardware SOP', 'Shared Firmware', 'Cross-Disciplinary Sensor', 'Grant Collaboration'].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
              selectedType === type
                ? 'bg-emerald-500 text-stone-950 font-bold'
                : 'bg-stone-900 text-stone-300 border border-stone-800 hover:border-stone-750'
            }`}
          >
            {type === 'all' ? 'All Synergies' : type}
          </button>
        ))}
      </div>

      {/* Synergies List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((syn) => (
          <div 
            key={syn.id}
            className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-stone-750 transition shadow-sm space-y-3"
          >
            {/* Pod link header */}
            <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => onSelectPod(syn.sourcePodId)}
                  className="font-bold text-emerald-400 hover:underline"
                >
                  {syn.sourcePodName}
                </button>
                <ArrowRight className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <button
                  onClick={() => onSelectPod(syn.targetPodId)}
                  className="font-bold text-teal-400 hover:underline"
                >
                  {syn.targetPodName}
                </button>
              </div>

              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-800 text-stone-300 border border-stone-750">
                {syn.synergyType}
              </span>
            </div>

            {/* Artifact title */}
            <h3 className="text-sm font-bold text-white">
              "{syn.artifactTitle}"
            </h3>

            {/* Description */}
            <p className="text-xs text-stone-300 leading-relaxed">
              {syn.description}
            </p>

            {/* Impact callout */}
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Continuity Impact & Waste Avoided
              </span>
              <p className="text-stone-300 italic">
                {syn.impact}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Synergy Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-stone-900 border border-stone-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Record Cross-Pod Knowledge Transfer</h3>
            
            <form onSubmit={handleSubmitNew} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-stone-400 mb-1">Origin Pod</label>
                  <select
                    value={sourcePodId}
                    onChange={(e) => setSourcePodId(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-750 rounded-lg p-2 text-stone-200"
                  >
                    {pods.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Beneficiary Pod</label>
                  <select
                    value={targetPodId}
                    onChange={(e) => setTargetPodId(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-750 rounded-lg p-2 text-stone-200"
                  >
                    {pods.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Transferred Knowledge / Artifact Title</label>
                <input
                  type="text"
                  value={artifactTitle}
                  onChange={(e) => setArtifactTitle(e.target.value)}
                  placeholder="e.g. 12V Regulated BMS Shield"
                  className="w-full bg-stone-950 border border-stone-750 rounded-lg p-2 text-stone-200"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Synergy Classification</label>
                <select
                  value={synergyType}
                  onChange={(e) => setSynergyType(e.target.value as any)}
                  className="w-full bg-stone-950 border border-stone-750 rounded-lg p-2 text-stone-200"
                >
                  <option value="Shared Hardware SOP">Shared Hardware SOP</option>
                  <option value="Shared Firmware">Shared Firmware</option>
                  <option value="Cross-Disciplinary Sensor">Cross-Disciplinary Sensor</option>
                  <option value="Grant Collaboration">Grant Collaboration</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Transfer Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain how this knowledge was reused across the pods..."
                  className="w-full bg-stone-950 border border-stone-750 rounded-lg p-2 text-stone-200"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Measurable Impact / Waste Avoided</label>
                <input
                  type="text"
                  value={impact}
                  onChange={(e) => setImpact(e.target.value)}
                  placeholder="e.g. Saved 2 weeks of flight testing, zero battery failures"
                  className="w-full bg-stone-950 border border-stone-750 rounded-lg p-2 text-stone-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-500 text-stone-950 font-bold"
                >
                  Save Connection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
