import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Calendar, 
  User, 
  Tag, 
  CheckSquare, 
  Square, 
  AlertOctagon, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  FileText, 
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import Markdown from 'react-markdown';
import { ContinuityArtifact, ActionItem } from '../types';

interface ArtifactDetailModalProps {
  artifact: ContinuityArtifact | null;
  onClose: () => void;
  onAskPodMind: (artifact: ContinuityArtifact) => void;
  onUpdateArtifact: (updated: ContinuityArtifact) => void;
}

export const ArtifactDetailModal: React.FC<ArtifactDetailModalProps> = ({
  artifact,
  onClose,
  onAskPodMind,
  onUpdateArtifact
}) => {
  if (!artifact) return null;

  const [copied, setCopied] = useState(false);

  const toggleActionItem = (index: number) => {
    if (!artifact.actionItems) return;
    const newItems = [...artifact.actionItems];
    newItems[index] = {
      ...newItems[index],
      completed: !newItems[index].completed
    };

    const updated = {
      ...artifact,
      actionItems: newItems,
      updatedAt: new Date().toISOString().split('T')[0]
    };

    onUpdateArtifact(updated);
  };

  const copyMarkdown = () => {
    const raw = `# ${artifact.title}
**Pod**: ${artifact.podName} | **Type**: ${artifact.type} | **Author**: ${artifact.author} (${artifact.createdAt})
**Version**: ${artifact.version} | **Status**: ${artifact.status}

## Summary
${artifact.summary}

## Key Decisions
${artifact.keyDecisions.map(d => `- ${d}`).join('\n')}

## Content
${artifact.content}

## Lessons Learned
${artifact.lessonsLearned?.map(l => `- ${l}`).join('\n') || 'None recorded'}
`;

    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdownFile = () => {
    const element = document.createElement('a');
    const file = new Blob([artifact.content], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${artifact.id}-${artifact.title.replace(/\s+/g, '-').toLowerCase()}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        id="artifact-detail-modal-container"
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden text-left"
      >
        
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-stone-800 bg-stone-950/70">
          <div className="pr-6">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {artifact.type}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-stone-800 text-stone-300 border border-stone-700">
                {artifact.podName}
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-stone-800/80 text-stone-400">
                v{artifact.version}
              </span>
              {artifact.status === 'verified' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Institutional Record
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-stone-100 tracking-tight leading-snug">
              {artifact.title}
            </h2>

            <div className="flex items-center gap-4 mt-2 text-xs text-stone-400 flex-wrap">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-stone-500" />
                <strong className="text-stone-300">{artifact.author}</strong> ({artifact.authorRole})
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                Logged: {artifact.createdAt}
              </span>
            </div>
          </div>

          {/* Close button */}
          <button
            id="close-detail-modal"
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Toolbar */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-stone-850/60 border-b border-stone-800 text-xs">
          <button
            id="btn-ask-podmind-modal"
            onClick={() => onAskPodMind(artifact)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask PodMind About This Record</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={copyMarkdown}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-300 transition"
              title="Copy as Markdown"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={downloadMarkdownFile}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-stone-300 transition"
              title="Export Markdown File"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .MD</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Executive Summary Card */}
          <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800/90">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1.5">
              Executive Continuity Summary
            </span>
            <p className="text-sm text-stone-200 leading-relaxed">
              {artifact.summary}
            </p>
          </div>

          {/* Key Decisions & Institutional Anchors */}
          {artifact.keyDecisions && artifact.keyDecisions.length > 0 && (
            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-3 flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Key Architectural & Community Decisions
              </span>
              <ul className="space-y-2">
                {artifact.keyDecisions.map((dec, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <span>{dec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Full Markdown Content */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
              Full Knowledge Record
            </span>
            <div className="prose prose-invert prose-stone max-w-none text-sm text-stone-300 leading-relaxed bg-stone-950/40 p-5 rounded-xl border border-stone-800/60">
              <Markdown>{artifact.content}</Markdown>
            </div>
          </div>

          {/* Action Items Checklist */}
          {artifact.actionItems && artifact.actionItems.length > 0 && (
            <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-300 flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                  Accountability & Next Actions
                </span>
                <span className="text-[11px] text-stone-500">
                  {artifact.actionItems.filter(i => i.completed).length} / {artifact.actionItems.length} completed
                </span>
              </div>

              <div className="space-y-2">
                {artifact.actionItems.map((item, idx) => (
                  <div 
                    key={idx}
                    onClick={() => toggleActionItem(idx)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition ${
                      item.completed 
                        ? 'bg-stone-950/40 border-stone-800 text-stone-500 line-through' 
                        : 'bg-stone-850/80 border-stone-750 text-stone-200 hover:border-emerald-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.completed ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-stone-500 shrink-0" />
                      )}
                      <span className="text-xs sm:text-sm font-medium">{item.task}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-stone-400 shrink-0">
                      <span className="bg-stone-800 px-2 py-0.5 rounded text-[11px] text-stone-300">
                        {item.owner}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {item.deadline}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lessons Learned / Pitfalls */}
          {artifact.lessonsLearned && artifact.lessonsLearned.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4" />
                Lessons Learned & Warning for Future Cohorts
              </span>
              <ul className="space-y-1.5">
                {artifact.lessonsLearned.map((lesson, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-300">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap pt-2">
            <span className="text-xs text-stone-500 font-semibold flex items-center gap-1">
              <Tag className="w-3 h-3" />
              Taxonomy:
            </span>
            {artifact.tags.map((tag, idx) => (
              <span key={idx} className="text-xs px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                #{tag}
              </span>
            ))}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 px-6 border-t border-stone-800 bg-stone-950/80">
          <div className="text-xs text-stone-500">
            Institutional Memory ID: <code className="text-stone-400">{artifact.id}</code>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-stone-800 hover:bg-stone-700 text-stone-200 transition"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
