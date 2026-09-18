import React from 'react';
import {
  PlusCircle,
  ShieldCheck,
  Activity,
  Radio,
  Layers,
  Network,
  Bot,
  Compass,
  Home
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'feed' | 'vault' | 'podmind' | 'pods' | 'synergies' | 'audit' | 'extract';
  setActiveTab: (
    tab: 'feed' | 'vault' | 'podmind' | 'pods' | 'synergies' | 'audit' | 'extract'
  ) => void;
  onOpenCreate: () => void;
  onOpenImport: () => void;
  continuityScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenCreate,
  onOpenImport,
  continuityScore
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-800 bg-stone-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-stone-950 font-black shadow-lg shadow-emerald-950/40">
              <span className="text-xl tracking-tighter">Nu</span>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-stone-950 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">
                  Nuity
                </h1>

                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  UniPods Platform
                </span>
              </div>

              <p className="text-xs text-stone-400 font-medium tracking-wide">
                Continuity for UniPods Communities
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-900/90 p-1 rounded-xl border border-stone-800">

            <button
              id="nav-tab-feed"
              onClick={() => setActiveTab('feed')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'feed'
                  ? 'bg-emerald-500 text-stone-950 shadow-sm shadow-emerald-500/30'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Community Feed
            </button>

            <button
              id="nav-tab-vault"
              onClick={() => setActiveTab('vault')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'vault'
                  ? 'bg-emerald-500 text-stone-950 shadow-sm shadow-emerald-500/30'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Knowledge Vault
            </button>

            <button
              id="nav-tab-podmind"
              onClick={() => setActiveTab('podmind')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'podmind'
                  ? 'bg-emerald-500 text-stone-950 shadow-sm shadow-emerald-500/30'
                  : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              PodMind AI
            </button>

            <button
              id="nav-tab-pods"
              onClick={() => setActiveTab('pods')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'pods'
                  ? 'bg-emerald-500 text-stone-950 shadow-sm shadow-emerald-500/30'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              UniPod Hubs
            </button>

            <button
              id="nav-tab-synergies"
              onClick={() => setActiveTab('synergies')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'synergies'
                  ? 'bg-emerald-500 text-stone-950 shadow-sm shadow-emerald-500/30'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              Synergies
            </button>

            <button
              id="nav-tab-audit"
              onClick={() => setActiveTab('audit')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'audit'
                  ? 'bg-emerald-500 text-stone-950 shadow-sm shadow-emerald-500/30'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Continuity Audit
            </button>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2.5">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800/80">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-400">
                {continuityScore}%
              </span>
            </div>

            <button
              onClick={onOpenImport}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-700 transition"
            >
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              Import Chat
            </button>

            <button
              onClick={onOpenCreate}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-stone-950"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Log Artifact
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-stone-850 overflow-x-auto gap-1">

          <button
            onClick={() => setActiveTab('feed')}
            className={`px-3 py-1 text-xs font-semibold rounded-md whitespace-nowrap ${
              activeTab === 'feed'
                ? 'bg-emerald-500 text-stone-950'
                : 'text-stone-400'
            }`}
          >
            Feed
          </button>

          <button
            onClick={() => setActiveTab('vault')}
            className={`px-3 py-1 text-xs font-semibold rounded-md whitespace-nowrap ${
              activeTab === 'vault'
                ? 'bg-emerald-500 text-stone-950'
                : 'text-stone-400'
            }`}
          >
            Vault
          </button>

          <button
            onClick={() => setActiveTab('podmind')}
            className={`px-3 py-1 text-xs font-semibold rounded-md whitespace-nowrap ${
              activeTab === 'podmind'
                ? 'bg-emerald-500 text-stone-950'
                : 'text-stone-400'
            }`}
          >
            AI
          </button>

          <button
            onClick={() => setActiveTab('pods')}
            className={`px-3 py-1 text-xs font-semibold rounded-md whitespace-nowrap ${
              activeTab === 'pods'
                ? 'bg-emerald-500 text-stone-950'
                : 'text-stone-400'
            }`}
          >
            Pods
          </button>

          <button
            onClick={() => setActiveTab('synergies')}
            className={`px-3 py-1 text-xs font-semibold rounded-md whitespace-nowrap ${
              activeTab === 'synergies'
                ? 'bg-emerald-500 text-stone-950'
                : 'text-stone-400'
            }`}
          >
            Synergies
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1 text-xs font-semibold rounded-md whitespace-nowrap ${
              activeTab === 'audit'
                ? 'bg-emerald-500 text-stone-950'
                : 'text-stone-400'
            }`}
          >
            Audit
          </button>
        </div>
      </div>
    </header>
  );
};
