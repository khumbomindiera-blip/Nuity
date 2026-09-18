import React, { useState, useEffect, useMemo } from 'react';
import { 
  ContinuityArtifact, 
  Pod, 
  ArtifactType, 
  SynergyConnection 
} from './types';
import { INITIAL_PODS, INITIAL_SYNERGIES } from './data/mockPods';
import { INITIAL_ARTIFACTS } from './data/mockArtifacts';
import { Navbar } from './components/Navbar';
import { ArtifactCard } from './components/ArtifactCard';
import { PodMindChat } from './components/PodMindChat';
import { ArtifactDetailModal } from './components/ArtifactDetailModal';
import { CreateArtifactModal } from './components/CreateArtifactModal';
import { ImportCaptureModal } from './components/ImportCaptureModal';
import { PodsDirectory } from './components/PodsDirectory';
import { SynergyRadar } from './components/SynergyRadar';
import { ContinuityAuditView } from './components/ContinuityAuditView';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Radio, 
  PlusCircle, 
  Layers, 
  Star, 
  ShieldCheck, 
  SlidersHorizontal,
  FolderOpen,
  ArrowUpDown,
  RotateCcw,
  Bot
} from 'lucide-react';

const STORAGE_KEY = 'nuity_artifacts_v1';
const SYNERGY_STORAGE_KEY = 'nuity_synergies_v1';

export default function App() {
  // Navigation tab
  const [activeTab, setActiveTab] = useState<'vault' | 'podmind' | 'pods' | 'synergies' | 'audit' | 'extract'>('vault');

  // Artifacts state with local storage fallback
  const [artifacts, setArtifacts] = useState<ContinuityArtifact[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return INITIAL_ARTIFACTS;
  });

  // Synergies state
  const [synergies, setSynergies] = useState<SynergyConnection[]>(() => {
    try {
      const saved = localStorage.getItem(SYNERGY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not read synergies', e);
    }
    return INITIAL_SYNERGIES;
  });

  // Pods directory
  const [pods] = useState<Pod[]>(INITIAL_PODS);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPodFilter, setSelectedPodFilter] = useState<string>('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'title'>('date');

  // Modals state
  const [selectedArtifact, setSelectedArtifact] = useState<ContinuityArtifact | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [createDefaultPod, setCreateDefaultPod] = useState<string | undefined>(undefined);
  const [createInitialTitle, setCreateInitialTitle] = useState<string | undefined>(undefined);

  // PodMind targeted query state
  const [podmindQuery, setPodmindQuery] = useState<string | undefined>(undefined);

  // Sync artifacts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(artifacts));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [artifacts]);

  // Sync synergies
  useEffect(() => {
    try {
      localStorage.setItem(SYNERGY_STORAGE_KEY, JSON.stringify(synergies));
    } catch (e) {
      console.warn('Failed to save synergies', e);
    }
  }, [synergies]);

  // Overall Continuity Score calculation
  const overallContinuityScore = useMemo(() => {
    if (pods.length === 0) return 90;
    const sum = pods.reduce((acc, p) => acc + p.continuityScore, 0);
    return Math.round(sum / pods.length);
  }, [pods]);

  // Filtered Artifacts
  const filteredArtifacts = useMemo(() => {
    return artifacts.filter(art => {
      // Pod filter
      if (selectedPodFilter !== 'all' && art.podId !== selectedPodFilter) {
        return false;
      }
      // Type filter
      if (selectedTypeFilter !== 'all' && art.type !== selectedTypeFilter) {
        return false;
      }
      // Starred
      if (onlyStarred && !art.starred) {
        return false;
      }
      // Verified
      if (onlyVerified && art.status !== 'verified') {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = art.title.toLowerCase().includes(q);
        const matchesSummary = art.summary.toLowerCase().includes(q);
        const matchesContent = art.content.toLowerCase().includes(q);
        const matchesAuthor = art.author.toLowerCase().includes(q);
        const matchesTags = art.tags.some(t => t.toLowerCase().includes(q));
        const matchesDecisions = art.keyDecisions?.some(d => d.toLowerCase().includes(q));

        if (!matchesTitle && !matchesSummary && !matchesContent && !matchesAuthor && !matchesTags && !matchesDecisions) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [artifacts, selectedPodFilter, selectedTypeFilter, onlyStarred, onlyVerified, searchQuery, sortBy]);

  // Handlers
  const handleToggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setArtifacts(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, starred: !a.starred };
      }
      return a;
    }));
  };

  const handleSaveArtifact = (newArt: ContinuityArtifact) => {
    setArtifacts(prev => [newArt, ...prev]);
    setSelectedArtifact(newArt);
  };

  const handleUpdateArtifact = (updated: ContinuityArtifact) => {
    setArtifacts(prev => prev.map(a => a.id === updated.id ? updated : a));
    setSelectedArtifact(updated);
  };

  const handleAskAboutArtifact = (art: ContinuityArtifact) => {
    setPodmindQuery(`What are the key continuity takeaways, decisions, and operational precautions in "${art.title}"?`);
    setSelectedPodFilter(art.podId);
    setActiveTab('podmind');
  };

  const handleOpenArtifactDetail = (art: ContinuityArtifact) => {
    // Increment view count
    setArtifacts(prev => prev.map(a => a.id === art.id ? { ...a, views: a.views + 1 } : a));
    setSelectedArtifact({ ...art, views: art.views + 1 });
  };

  const handleAddSynergy = (newSyn: SynergyConnection) => {
    setSynergies(prev => [newSyn, ...prev]);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPodFilter('all');
    setSelectedTypeFilter('all');
    setOnlyStarred(false);
    setOnlyVerified(false);
  };

  const handleResetDefaultData = () => {
    if (window.confirm('Reset Nuity to initial UniPods institutional memory dataset?')) {
      setArtifacts(INITIAL_ARTIFACTS);
      setSynergies(INITIAL_SYNERGIES);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SYNERGY_STORAGE_KEY);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Universal Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreate={() => {
          setCreateDefaultPod(selectedPodFilter !== 'all' ? selectedPodFilter : undefined);
          setCreateInitialTitle(undefined);
          setIsCreateOpen(true);
        }}
        onOpenImport={() => setIsImportOpen(true)}
        continuityScore={overallContinuityScore}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* VIEW 1: Knowledge Vault (ADRs, SOPs, Post-Mortems, Grants, Logs) */}
        {activeTab === 'vault' && (
          <div className="space-y-6 text-left">
            
            {/* Hero & Context Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900/90 to-emerald-950/30 border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Institutional Memory Matrix
                  </span>
                  <span className="text-xs text-stone-500">• {artifacts.length} Archived Records</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                  UniPods Knowledge Vault
                </h1>
                <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                  Decisions, equipment calibrations, flight test post-mortems, and grant milestones preserved across graduating student cohorts.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  id="vault-ask-podmind-btn"
                  onClick={() => setActiveTab('podmind')}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 font-bold text-xs transition"
                >
                  <Bot className="w-4 h-4" />
                  <span>Ask PodMind</span>
                </button>

                <button
                  onClick={() => setIsImportOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-xs transition"
                >
                  <Radio className="w-4 h-4" />
                  <span>Import Chat/Transcript</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Control Panel */}
            <div className="p-4 rounded-2xl bg-stone-900/70 border border-stone-800 space-y-3">
              
              {/* Top Search Line */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="vault-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search across decisions, hardware SOPs, authors, tags (e.g. LoRaWAN, laser, UNDP, BMS)..."
                    className="w-full text-xs sm:text-sm bg-stone-950 border border-stone-750 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Sort selector */}
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 text-xs">
                  <span className="text-stone-400 font-medium flex items-center gap-1">
                    <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
                    Sort:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-stone-950 text-stone-200 border border-stone-750 rounded-lg px-2.5 py-2 text-xs focus:outline-none"
                  >
                    <option value="date">Most Recent</option>
                    <option value="views">Most Consulted</option>
                    <option value="title">Title (A-Z)</option>
                  </select>
                </div>
              </div>

              {/* Filter Pills Row 1: Pod Selector */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-stone-500 font-bold text-[10px] uppercase tracking-wider shrink-0 pr-1">
                  UniPod Stream:
                </span>
                <button
                  onClick={() => setSelectedPodFilter('all')}
                  className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition ${
                    selectedPodFilter === 'all'
                      ? 'bg-emerald-500 text-stone-950 font-bold'
                      : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  All Pods ({artifacts.length})
                </button>
                {pods.map(p => {
                  const count = artifacts.filter(a => a.podId === p.id).length;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPodFilter(p.id)}
                      className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                        selectedPodFilter === p.id
                          ? 'bg-emerald-500 text-stone-950 font-bold'
                          : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                      }`}
                    >
                      <span>{p.name}</span>
                      <span className="text-[10px] opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Filter Pills Row 2: Type Selector & Toggles */}
              <div className="flex items-center justify-between gap-3 flex-wrap pt-2 border-t border-stone-850 text-xs">
                
                {/* Artifact Types */}
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  <span className="text-stone-500 font-bold text-[10px] uppercase tracking-wider shrink-0 pr-1">
                    Artifact Type:
                  </span>
                  {[
                    'all',
                    'Decision Log',
                    'Hardware SOP',
                    'Post-Mortem',
                    'Chat Capture',
                    'Grant & Funding',
                    'Technical Spec',
                    'Meeting Synthesis'
                  ].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedTypeFilter(type)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition ${
                        selectedTypeFilter === type
                          ? 'bg-stone-100 text-stone-950'
                          : 'bg-stone-850 text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      {type === 'all' ? 'All Types' : type}
                    </button>
                  ))}
                </div>

                {/* Checkbox Toggles */}
                <div className="flex items-center gap-3 shrink-0">
                  <label className="flex items-center gap-1.5 cursor-pointer text-stone-300">
                    <input
                      type="checkbox"
                      checked={onlyVerified}
                      onChange={(e) => setOnlyVerified(e.target.checked)}
                      className="rounded bg-stone-950 border-stone-750 text-emerald-500 focus:ring-0"
                    />
                    <span className="text-[11px] font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Verified Only
                    </span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer text-stone-300">
                    <input
                      type="checkbox"
                      checked={onlyStarred}
                      onChange={(e) => setOnlyStarred(e.target.checked)}
                      className="rounded bg-stone-950 border-stone-750 text-amber-500 focus:ring-0"
                    />
                    <span className="text-[11px] font-medium flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      Starred Only
                    </span>
                  </label>

                  {(searchQuery || selectedPodFilter !== 'all' || selectedTypeFilter !== 'all' || onlyStarred || onlyVerified) && (
                    <button
                      onClick={handleResetFilters}
                      className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </button>
                  )}
                </div>

              </div>

            </div>

            {/* Results Counter & Grid */}
            <div className="flex items-center justify-between text-xs text-stone-400 px-1">
              <span>
                Showing <strong className="text-stone-200">{filteredArtifacts.length}</strong> of {artifacts.length} institutional records
              </span>
              <button
                onClick={handleResetDefaultData}
                className="text-[10px] text-stone-600 hover:text-stone-400 transition"
              >
                Reset Default Archive
              </button>
            </div>

            {/* Artifacts Grid */}
            {filteredArtifacts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredArtifacts.map((art) => (
                  <ArtifactCard
                    key={art.id}
                    artifact={art}
                    onSelect={handleOpenArtifactDetail}
                    onAskAbout={handleAskAboutArtifact}
                    onToggleStar={handleToggleStar}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-stone-900/40 border border-stone-800 space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-stone-800 flex items-center justify-center text-stone-500">
                  <FolderOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-200">No records match your filter criteria</h3>
                  <p className="text-xs text-stone-400 max-w-sm mx-auto mt-1">
                    Try clearing search keywords or selecting "All Pods" to see community records.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-200 transition"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => setIsCreateOpen(true)}
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-stone-950 transition"
                  >
                    Log New Record for This Pod
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* VIEW 2: PodMind AI Assistant */}
        {activeTab === 'podmind' && (
          <PodMindChat
            artifacts={artifacts}
            pods={pods}
            onOpenArtifact={handleOpenArtifactDetail}
            selectedPodFilter={selectedPodFilter}
            setSelectedPodFilter={setSelectedPodFilter}
            initialQuery={podmindQuery}
          />
        )}

        {/* VIEW 3: UniPods Hubs Directory */}
        {activeTab === 'pods' && (
          <PodsDirectory
            pods={pods}
            artifacts={artifacts}
            onSelectPodForVault={(podId) => {
              setSelectedPodFilter(podId);
              setActiveTab('vault');
            }}
            onAskPodMindForPod={(pod) => {
              setSelectedPodFilter(pod.id);
              setPodmindQuery(`What are the key documented SOPs, equipment settings, and active challenges in ${pod.name}?`);
              setActiveTab('podmind');
            }}
            onRunAuditForPod={(pod) => {
              setActiveTab('audit');
            }}
          />
        )}

        {/* VIEW 4: Cross-Pod Synergies */}
        {activeTab === 'synergies' && (
          <SynergyRadar
            synergies={synergies}
            pods={pods}
            onAddSynergy={handleAddSynergy}
            onSelectPod={(podId) => {
              setSelectedPodFilter(podId);
              setActiveTab('vault');
            }}
          />
        )}

        {/* VIEW 5: Continuity & Risk Audit */}
        {activeTab === 'audit' && (
          <ContinuityAuditView
            pods={pods}
            artifacts={artifacts}
            onOpenCreateArtifactForGap={(podId, initialTitle) => {
              setCreateDefaultPod(podId);
              setCreateInitialTitle(initialTitle);
              setIsCreateOpen(true);
            }}
          />
        )}

      </main>

      {/* Modals */}
      {selectedArtifact && (
        <ArtifactDetailModal
          artifact={selectedArtifact}
          onClose={() => setSelectedArtifact(null)}
          onAskPodMind={handleAskAboutArtifact}
          onUpdateArtifact={handleUpdateArtifact}
        />
      )}

      {isCreateOpen && (
        <CreateArtifactModal
          isOpen={isCreateOpen}
          onClose={() => {
            setIsCreateOpen(false);
            setCreateInitialTitle(undefined);
          }}
          onSave={handleSaveArtifact}
          pods={pods}
          defaultPodId={createDefaultPod}
          initialData={createInitialTitle ? { title: createInitialTitle } : undefined}
        />
      )}

      {isImportOpen && (
        <ImportCaptureModal
          isOpen={isImportOpen}
          onClose={() => setIsImportOpen(false)}
          onDeposit={handleSaveArtifact}
          pods={pods}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-stone-850 py-6 px-4 bg-stone-950/80 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-300">Nuity</span>
            <span>— Continuity for UniPods Communities</span>
          </div>
          <div>
            <span>Powered by PodMind AI • Preserving collective institutional memory across cohorts</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
