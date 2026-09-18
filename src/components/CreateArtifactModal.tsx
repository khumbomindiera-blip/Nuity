import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Sparkles, 
  FileText, 
  Check, 
  AlertCircle,
  Eye,
  Edit3
} from 'lucide-react';
import Markdown from 'react-markdown';
import { 
  ContinuityArtifact, 
  ArtifactType, 
  ArtifactStatus, 
  Pod, 
  ActionItem 
} from '../types';

interface CreateArtifactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (artifact: ContinuityArtifact) => void;
  pods: Pod[];
  defaultPodId?: string;
  initialData?: Partial<ContinuityArtifact>;
}

export const CreateArtifactModal: React.FC<CreateArtifactModalProps> = ({
  isOpen,
  onClose,
  onSave,
  pods,
  defaultPodId,
  initialData
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState(initialData?.title || '');
  const [podId, setPodId] = useState(initialData?.podId || defaultPodId || pods[0]?.id || 'maker-hardware');
  const [type, setType] = useState<ArtifactType>(initialData?.type || 'Decision Log');
  const [status, setStatus] = useState<ArtifactStatus>(initialData?.status || 'verified');
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [content, setContent] = useState(initialData?.content || '## Overview\n\n## Implementation & Technical Details\n\n## Continuity Impact\n');
  const [author, setAuthor] = useState(initialData?.author || 'Current Fellow');
  const [authorRole, setAuthorRole] = useState(initialData?.authorRole || 'Engineering Fellow');
  const [tagsInput, setTagsInput] = useState(initialData?.tags ? initialData.tags.join(', ') : 'Continuity, UniPods');
  const [keyDecisions, setKeyDecisions] = useState<string[]>(initialData?.keyDecisions || ['']);
  const [actionItems, setActionItems] = useState<ActionItem[]>(initialData?.actionItems || []);
  const [lessonsLearned, setLessonsLearned] = useState<string[]>(initialData?.lessonsLearned || ['']);
  const [version, setVersion] = useState(initialData?.version || '1.0');
  const [previewTab, setPreviewTab] = useState<'edit' | 'preview'>('edit');
  const [error, setError] = useState<string | null>(null);

  const handleAddDecision = () => setKeyDecisions([...keyDecisions, '']);
  const handleRemoveDecision = (index: number) => {
    setKeyDecisions(keyDecisions.filter((_, i) => i !== index));
  };
  const handleDecisionChange = (index: number, val: string) => {
    const updated = [...keyDecisions];
    updated[index] = val;
    setKeyDecisions(updated);
  };

  const handleAddAction = () => {
    setActionItems([...actionItems, { task: '', owner: 'Unassigned', deadline: 'Next Sprint', completed: false }]);
  };
  const handleRemoveAction = (index: number) => {
    setActionItems(actionItems.filter((_, i) => i !== index));
  };
  const handleActionChange = (index: number, field: keyof ActionItem, val: string) => {
    const updated = [...actionItems];
    updated[index] = { ...updated[index], [field]: val };
    setActionItems(updated);
  };

  const handleAddLesson = () => setLessonsLearned([...lessonsLearned, '']);
  const handleRemoveLesson = (index: number) => {
    setLessonsLearned(lessonsLearned.filter((_, i) => i !== index));
  };
  const handleLessonChange = (index: number, val: string) => {
    const updated = [...lessonsLearned];
    updated[index] = val;
    setLessonsLearned(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!summary.trim()) {
      setError('Executive summary is required');
      return;
    }

    const selectedPod = pods.find(p => p.id === podId);
    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newArtifact: ContinuityArtifact = {
      id: initialData?.id || `art-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      podId,
      podName: selectedPod ? selectedPod.name : 'Maker & Hardware Pod',
      type,
      status,
      summary: summary.trim(),
      content: content.trim(),
      author: author.trim() || 'UniPod Contributor',
      authorRole: authorRole.trim() || 'Fellow',
      createdAt: initialData?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      tags: tags.length > 0 ? tags : ['UniPods', 'Continuity'],
      keyDecisions: keyDecisions.filter(d => d.trim().length > 0),
      actionItems: actionItems.filter(a => a.task.trim().length > 0),
      lessonsLearned: lessonsLearned.filter(l => l.trim().length > 0),
      version,
      views: initialData?.views || 1,
      verifiedBy: author
    };

    onSave(newArtifact);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        id="create-artifact-modal"
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl overflow-hidden text-left"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-800 bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Log Continuity Artifact
              </h2>
              <p className="text-xs text-stone-400">
                Preserve institutional decisions, hardware calibrations & lessons learned for UniPods
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Core Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Pod selector */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Target Pod *
              </label>
              <select
                id="create-pod-select"
                value={podId}
                onChange={(e) => setPodId(e.target.value)}
                className="w-full text-xs bg-stone-950 border border-stone-750 focus:border-emerald-500 rounded-lg px-3 py-2 text-stone-200 focus:outline-none"
              >
                {pods.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            {/* Type selector */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                Artifact Type *
              </label>
              <select
                id="create-type-select"
                value={type}
                onChange={(e) => setType(e.target.value as ArtifactType)}
                className="w-full text-xs bg-stone-950 border border-stone-750 focus:border-emerald-500 rounded-lg px-3 py-2 text-stone-200 focus:outline-none"
              >
                <option value="Decision Log">Decision Log (ADR)</option>
                <option value="Hardware SOP">Hardware SOP & Calibration</option>
                <option value="Technical Spec">Technical Spec</option>
                <option value="Meeting Synthesis">Meeting Synthesis</option>
                <option value="Grant & Funding">Grant & Funding Brief</option>
                <option value="Post-Mortem">Post-Mortem / Failure Analysis</option>
                <option value="Chat Capture">Chat / WhatsApp Capture</option>
              </select>
            </div>

            {/* Status & Version */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ArtifactStatus)}
                  className="w-full text-xs bg-stone-950 border border-stone-750 focus:border-emerald-500 rounded-lg px-2.5 py-2 text-stone-200 focus:outline-none"
                >
                  <option value="verified">Verified</option>
                  <option value="active">Active</option>
                  <option value="needs_review">Needs Review</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Version
                </label>
                <input
                  type="text"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  placeholder="1.0"
                  className="w-full text-xs bg-stone-950 border border-stone-750 focus:border-emerald-500 rounded-lg px-2.5 py-2 text-stone-200 focus:outline-none"
                />
              </div>
            </div>

          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Artifact Title *
            </label>
            <input
              id="create-artifact-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., ADR-014: Standardized Solder Reflow Temperature Curve for Lead-Free SMD"
              className="w-full text-sm bg-stone-950 border border-stone-750 focus:border-emerald-500 rounded-lg px-3.5 py-2.5 text-stone-100 placeholder:text-stone-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              required
            />
          </div>

          {/* Executive Summary */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1.5">
              Executive Continuity Summary *
            </label>
            <textarea
              id="create-artifact-summary"
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief 2-3 sentence overview explaining what this record solves and why it matters to future cohorts..."
              className="w-full text-xs sm:text-sm bg-stone-950 border border-stone-750 focus:border-emerald-500 rounded-lg p-3 text-stone-200 placeholder:text-stone-600 focus:outline-none"
              required
            />
          </div>

          {/* Key Decisions (Dynamic list) */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Key Architectural or Lab Decisions
              </label>
              <button
                type="button"
                onClick={handleAddDecision}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300"
              >
                <Plus className="w-3 h-3" />
                Add Decision
              </button>
            </div>

            <div className="space-y-2">
              {keyDecisions.map((dec, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={dec}
                    onChange={(e) => handleDecisionChange(idx, e.target.value)}
                    placeholder="e.g., Set maximum spindle speed to 12,000 RPM when milling 6061 aluminum"
                    className="flex-1 text-xs bg-stone-900 border border-stone-750 focus:border-emerald-500 rounded-lg px-3 py-1.5 text-stone-200 focus:outline-none"
                  />
                  {keyDecisions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveDecision(idx)}
                      className="p-1.5 text-stone-500 hover:text-rose-400 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Full Content with Markdown Tab */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-stone-300">
                Complete Content (Markdown Supported)
              </label>
              <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800 text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewTab('edit')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded ${
                    previewTab === 'edit' ? 'bg-stone-800 text-stone-200' : 'text-stone-400'
                  }`}
                >
                  <Edit3 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('preview')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded ${
                    previewTab === 'preview' ? 'bg-stone-800 text-stone-200' : 'text-stone-400'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  Preview
                </button>
              </div>
            </div>

            {previewTab === 'edit' ? (
              <textarea
                id="create-artifact-content"
                rows={7}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full text-xs sm:text-sm font-mono bg-stone-950 border border-stone-750 focus:border-emerald-500 rounded-lg p-3.5 text-stone-200 placeholder:text-stone-600 focus:outline-none"
                placeholder="Write full markdown technical record, procedures, formulas, pinouts, and results..."
              />
            ) : (
              <div className="w-full min-h-[160px] p-4 rounded-lg bg-stone-950 border border-stone-800 prose prose-invert prose-stone max-w-none text-xs sm:text-sm text-stone-300">
                <Markdown>{content || '*No content to preview yet*'}</Markdown>
              </div>
            )}
          </div>

          {/* Action Items (Dynamic) */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Next Steps & Accountability Owners
              </label>
              <button
                type="button"
                onClick={handleAddAction}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300"
              >
                <Plus className="w-3 h-3" />
                Add Action Item
              </button>
            </div>

            {actionItems.length === 0 ? (
              <p className="text-xs text-stone-500 italic">No assigned action items yet. Click "Add Action Item" to establish continuity accountability.</p>
            ) : (
              <div className="space-y-2">
                {actionItems.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={item.task}
                      onChange={(e) => handleActionChange(idx, 'task', e.target.value)}
                      placeholder="Task description"
                      className="sm:col-span-1 text-xs bg-stone-900 border border-stone-750 rounded-lg px-2.5 py-1.5 text-stone-200"
                    />
                    <input
                      type="text"
                      value={item.owner}
                      onChange={(e) => handleActionChange(idx, 'owner', e.target.value)}
                      placeholder="Assignee / Role"
                      className="text-xs bg-stone-900 border border-stone-750 rounded-lg px-2.5 py-1.5 text-stone-200"
                    />
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={item.deadline}
                        onChange={(e) => handleActionChange(idx, 'deadline', e.target.value)}
                        placeholder="Deadline"
                        className="flex-1 text-xs bg-stone-900 border border-stone-750 rounded-lg px-2.5 py-1.5 text-stone-200"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveAction(idx)}
                        className="p-1.5 text-stone-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lessons Learned / Warnings */}
          <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Lessons Learned / Warnings for Future Cohorts
              </label>
              <button
                type="button"
                onClick={handleAddLesson}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300"
              >
                <Plus className="w-3 h-3" />
                Add Warning
              </button>
            </div>

            <div className="space-y-2">
              {lessonsLearned.map((les, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={les}
                    onChange={(e) => handleLessonChange(idx, e.target.value)}
                    placeholder="e.g., Moisture in nylon filament causes severe nozzle clogging; always dry spool for 4h at 70°C"
                    className="flex-1 text-xs bg-stone-900 border border-stone-750 focus:border-amber-500 rounded-lg px-3 py-1.5 text-stone-200 focus:outline-none"
                  />
                  {lessonsLearned.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLesson(idx)}
                      className="p-1.5 text-stone-500 hover:text-rose-400 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Author & Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Author Name
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
                className="w-full text-xs bg-stone-950 border border-stone-750 rounded-lg px-3 py-2 text-stone-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Author Role
              </label>
              <input
                type="text"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="e.g. Lead Robotics Fellow"
                className="w-full text-xs bg-stone-950 border border-stone-750 rounded-lg px-3 py-2 text-stone-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Hardware, LoRaWAN, CNC"
                className="w-full text-xs bg-stone-950 border border-stone-750 rounded-lg px-3 py-2 text-stone-200"
              />
            </div>
          </div>

        </form>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 px-6 border-t border-stone-800 bg-stone-950">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-400 hover:text-white transition"
          >
            Cancel
          </button>

          <button
            id="btn-save-artifact"
            type="button"
            onClick={handleSubmit}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-md shadow-emerald-500/20 transition"
          >
            <Check className="w-4 h-4" />
            <span>Deposit into Institutional Memory</span>
          </button>
        </div>

      </div>
    </div>
  );
};
