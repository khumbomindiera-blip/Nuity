import React from 'react';
import { 
  Pod, 
  ContinuityArtifact 
} from '../types';
import { 
  Wrench, 
  Plane, 
  Activity, 
  Zap, 
  Cpu, 
  Award, 
  Users, 
  FolderKanban, 
  ShieldCheck, 
  ArrowRight, 
  MapPin, 
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

interface PodsDirectoryProps {
  pods: Pod[];
  artifacts: ContinuityArtifact[];
  onSelectPodForVault: (podId: string) => void;
  onAskPodMindForPod: (pod: Pod) => void;
  onRunAuditForPod: (pod: Pod) => void;
}

export const PodsDirectory: React.FC<PodsDirectoryProps> = ({
  pods,
  artifacts,
  onSelectPodForVault,
  onAskPodMindForPod,
  onRunAuditForPod
}) => {
  const getPodIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench': return Wrench;
      case 'Plane': return Plane;
      case 'Activity': return Activity;
      case 'Zap': return Zap;
      case 'Cpu': return Cpu;
      case 'Award': return Award;
      default: return Layers;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-left">
      
      {/* Directory Intro Banner */}
      <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              UniPods Network Ecosystem
            </span>
            <span className="text-xs text-stone-500">• 6 Active Innovation Pods</span>
          </div>
          <h2 className="text-2xl font-black text-stone-100 tracking-tight mb-2">
            UniPods Innovation Pods Directory
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
            University Innovation Pods (UniPods) house high-end fabrication machinery, IoT testbeds, bio-diagnostics cleanrooms, and venture incubation pipelines. Nuity preserves their collective memory across cohorts.
          </p>
        </div>
      </div>

      {/* Pods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pods.map((pod) => {
          const Icon = getPodIcon(pod.iconName);
          const podArtifacts = artifacts.filter(a => a.podId === pod.id);

          return (
            <div 
              key={pod.id}
              id={`pod-card-${pod.id}`}
              className="flex flex-col justify-between p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-stone-700 transition shadow-sm hover:shadow-xl hover:shadow-black/30"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold border ${pod.accentBg}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-widest block">
                        {pod.code}
                      </span>
                      <h3 className="text-base font-bold text-stone-100 leading-tight">
                        {pod.name}
                      </h3>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-800 text-emerald-400 border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" />
                      {pod.continuityScore}%
                    </span>
                    <span className="block text-[9px] text-stone-500 font-medium">Memory Index</span>
                  </div>
                </div>

                {/* Tagline & Description */}
                <p className="text-xs font-semibold text-emerald-400/90 mb-1.5 line-clamp-1">
                  {pod.tagline}
                </p>
                <p className="text-xs text-stone-400 line-clamp-3 mb-4 leading-relaxed">
                  {pod.description}
                </p>

                {/* Lead & Location */}
                <div className="space-y-1.5 mb-4 p-3 rounded-xl bg-stone-950/60 border border-stone-800/80 text-xs">
                  <div className="flex items-center justify-between text-stone-300">
                    <span className="text-stone-500 text-[11px]">Pod Lead:</span>
                    <span className="font-semibold text-[11px]">{pod.lead}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-400 text-[11px]">
                    <span className="text-stone-500">Facility:</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-600" />
                      {pod.location}
                    </span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="p-2 rounded-lg bg-stone-850 border border-stone-800">
                    <span className="text-base font-black text-stone-100 block">{pod.memberCount}</span>
                    <span className="text-[10px] text-stone-500 font-medium">Makers/Fellows</span>
                  </div>
                  <div className="p-2 rounded-lg bg-stone-850 border border-stone-800">
                    <span className="text-base font-black text-stone-100 block">{pod.activeProjects}</span>
                    <span className="text-[10px] text-stone-500 font-medium">Active Projects</span>
                  </div>
                  <div className="p-2 rounded-lg bg-stone-850 border border-stone-800">
                    <span className="text-base font-black text-emerald-400 block">{podArtifacts.length}</span>
                    <span className="text-[10px] text-stone-500 font-medium">Vault Records</span>
                  </div>
                </div>

                {/* Equipment Highlights */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                    Lab & Fabrication Hardware
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {pod.equipmentList.slice(0, 3).map((eq, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-stone-800/90 text-stone-300 border border-stone-750">
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-stone-800 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectPodForVault(pod.id)}
                    className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-stone-800 hover:bg-stone-750 text-stone-200 transition"
                  >
                    <span>Vault Records</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                  </button>

                  <button
                    onClick={() => onAskPodMindForPod(pod)}
                    className="flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask PodMind</span>
                  </button>
                </div>

                <button
                  onClick={() => onRunAuditForPod(pod)}
                  className="w-full text-center py-1 text-[11px] font-medium text-stone-500 hover:text-stone-300 transition"
                >
                  Run Institutional Continuity Audit →
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
