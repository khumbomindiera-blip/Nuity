import React from 'react';
import { 
  ContinuityArtifact, 
  ArtifactType 
} from '../types';
import { 
  FileCheck2, 
  Wrench, 
  AlertTriangle, 
  MessageSquare, 
  Award, 
  Cpu, 
  Users, 
  Star, 
  Eye, 
  Calendar,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface ArtifactCardProps {
  artifact: ContinuityArtifact;
  onSelect: (artifact: ContinuityArtifact) => void;
  onAskAbout: (artifact: ContinuityArtifact) => void;
  onToggleStar: (id: string, e: React.MouseEvent) => void;
}

export const ArtifactCard: React.FC<ArtifactCardProps> = ({
  artifact,
  onSelect,
  onAskAbout,
  onToggleStar
}) => {
  const getTypeBadge = (type: ArtifactType) => {
    switch (type) {
      case 'Decision Log':
        return {
          icon: FileCheck2,
          className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          label: 'ADR / Decision'
        };
      case 'Hardware SOP':
        return {
          icon: Wrench,
          className: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          label: 'Hardware SOP'
        };
      case 'Post-Mortem':
        return {
          icon: AlertTriangle,
          className: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
          label: 'Post-Mortem'
        };
      case 'Chat Capture':
        return {
          icon: MessageSquare,
          className: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
          label: 'Chat Capture'
        };
      case 'Grant & Funding':
        return {
          icon: Award,
          className: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          label: 'Grant & Milestone'
        };
      case 'Technical Spec':
        return {
          icon: Cpu,
          className: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
          label: 'Technical Spec'
        };
      case 'Meeting Synthesis':
        return {
          icon: Users,
          className: 'bg-stone-500/10 text-stone-300 border-stone-500/20',
          label: 'Meeting Synthesis'
        };
      default:
        return {
          icon: FileCheck2,
          className: 'bg-stone-500/10 text-stone-300 border-stone-500/20',
          label: type
        };
    }
  };

  const badge = getTypeBadge(artifact.type);
  const IconComponent = badge.icon;

  return (
    <div 
      id={`artifact-card-${artifact.id}`}
      onClick={() => onSelect(artifact)}
      className="group relative flex flex-col justify-between p-5 rounded-2xl bg-stone-900/70 hover:bg-stone-800/80 border border-stone-800 hover:border-stone-700 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-black/40 text-left"
    >
      <div>
        {/* Header Tags & Star */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold border ${badge.className}`}>
              <IconComponent className="w-3 h-3" />
              {badge.label}
            </span>

            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-stone-800/80 text-stone-300 border border-stone-750">
              {artifact.podName}
            </span>

            {artifact.status === 'verified' && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Verified
              </span>
            )}
          </div>

          <button
            onClick={(e) => onToggleStar(artifact.id, e)}
            className="p-1 rounded-md text-stone-500 hover:text-amber-400 hover:bg-stone-800 transition"
            title="Star artifact"
          >
            <Star className={`w-4 h-4 ${artifact.starred ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-stone-100 group-hover:text-emerald-400 transition-colors line-clamp-2 mb-2 leading-snug">
          {artifact.title}
        </h3>

        {/* Summary */}
        <p className="text-xs text-stone-400 line-clamp-3 mb-4 leading-relaxed">
          {artifact.summary}
        </p>

        {/* Key Decisions Preview */}
        {artifact.keyDecisions && artifact.keyDecisions.length > 0 && (
          <div className="mb-4 p-2.5 rounded-lg bg-stone-950/60 border border-stone-800/70">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/90 block mb-1">
              Continuity Anchor
            </span>
            <p className="text-[11px] text-stone-300 line-clamp-1 italic">
              "{artifact.keyDecisions[0]}"
            </p>
          </div>
        )}
      </div>

      {/* Footer Meta & Actions */}
      <div>
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3.5">
          {artifact.tags.slice(0, 3).map((tag, idx) => (
            <span 
              key={idx} 
              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-stone-800 text-stone-400"
            >
              #{tag}
            </span>
          ))}
          {artifact.tags.length > 3 && (
            <span className="text-[10px] text-stone-500 self-center">
              +{artifact.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-stone-800/80 text-[11px] text-stone-400">
          <div className="flex items-center gap-2">
            <span className="font-medium text-stone-300">{artifact.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-stone-500" />
              {artifact.createdAt}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-stone-500">
              <Eye className="w-3 h-3" />
              {artifact.views}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAskAbout(artifact);
              }}
              className="inline-flex items-center gap-1 px-2 py-1 rounded bg-stone-800 hover:bg-emerald-500/20 hover:text-emerald-400 text-stone-400 transition"
              title="Query PodMind AI about this artifact"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Ask</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
