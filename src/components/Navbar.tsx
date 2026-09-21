import React from 'react';
import {
  PlusCircle,
  Bell,
  Calendar,
  Home,
  Bot,
  Layers,
  Compass
} from 'lucide-react';

interface NavbarProps {
  activeTab:
    | 'feed'
    | 'events'
    | 'alerts'
    | 'vault'
    | 'podmind'
    | 'pods'
    | 'synergies'
    | 'audit';

  setActiveTab: (
    tab:
      | 'feed'
      | 'events'
      | 'alerts'
      | 'vault'
      | 'podmind'
      | 'pods'
      | 'synergies'
      | 'audit'
  ) => void;

  onOpenCreate: () => void;
  onOpenImport: () => void;
  continuityScore: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenCreate
}) => {
  const tabStyle = (tab: string) =>
    activeTab === tab
      ? 'bg-blue-600 text-white'
      : 'text-slate-400 hover:text-white hover:bg-slate-800';

  return (
    <header className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white">
              N
            </div>

            <div>
              <h1 className="text-white font-bold text-lg">
                Nuity
              </h1>

              <p className="text-xs text-slate-400">
                UniPods Community Platform
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">

            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${tabStyle('feed')}`}
            >
              <Home size={16} />
              Home
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${tabStyle('events')}`}
            >
              <Calendar size={16} />
              Events
            </button>

            <button
              onClick={() => setActiveTab('alerts')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${tabStyle('alerts')}`}
            >
              <Bell size={16} />
              Alerts
            </button>

            <button
              onClick={() => setActiveTab('podmind')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${tabStyle('podmind')}`}
            >
              <Bot size={16} />
              Ask PodMind
            </button>

            <button
              onClick={() => setActiveTab('vault')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${tabStyle('vault')}`}
            >
              <Layers size={16} />
              Knowledge
            </button>

            <button
              onClick={() => setActiveTab('pods')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${tabStyle('pods')}`}
            >
              <Compass size={16} />
              UniPods
            </button>

          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCreate}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-2"
            >
              <PlusCircle size={16} />
              Share Update
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
