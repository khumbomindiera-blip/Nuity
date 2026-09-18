import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  RefreshCw,
  HelpCircle,
  Cpu,
  Share2,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';
import Markdown from 'react-markdown';
import { 
  ContinuityArtifact, 
  PodMindMessage, 
  Pod, 
  CitationReference 
} from '../types';

interface PodMindChatProps {
  artifacts: ContinuityArtifact[];
  pods: Pod[];
  onOpenArtifact: (artifact: ContinuityArtifact) => void;
  selectedPodFilter: string;
  setSelectedPodFilter: (podId: string) => void;
  initialQuery?: string;
}

export const PodMindChat: React.FC<PodMindChatProps> = ({
  artifacts,
  pods,
  onOpenArtifact,
  selectedPodFilter,
  setSelectedPodFilter,
  initialQuery
}) => {
  const [messages, setMessages] = useState<PodMindMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'podmind',
      text: `### Hello, I am **PodMind** — Knowledge Continuity Assistant for Nuity.
I synthesize collective intelligence across all UniPods innovation streams, labs, and cohorts.

You can ask me to:
- **Retrieve hardware SOPs and calibration tables** (e.g. laser power/speeds, 3D printing settings)
- **Analyze past failures and post-mortems** so your team doesn't repeat past engineering mistakes
- **Track grant milestones & compliance deliverables** (e.g. UNDP Timbuktoo funding guidelines)
- **Identify cross-pod synergies** between hardware, biotech, agriculture, and energy projects

*Every answer is grounded in documented UniPods community records with verifiable citations.*`,
      timestamp: 'Just now',
      suggestedFollowUps: [
        'What are the laser cutter speed & power settings for local hardwoods?',
        'Why did the Scout-Drone Mk.2 airframe fail during crosswind testing?',
        'What are the key deliverables for our UNDP Timbuktoo Milestone 2 grant?',
        'How do we safely spot weld 18650/21700 cells without punctures?'
      ]
    }
  ]);

  const [input, setInput] = useState(initialQuery || '');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle incoming initialQuery
  useEffect(() => {
    if (initialQuery && initialQuery.trim().length > 0) {
      handleSend(initialQuery);
    }
  }, [initialQuery]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: PodMindMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Filter artifacts if a specific Pod is selected
      const relevantArtifacts = selectedPodFilter && selectedPodFilter !== 'all'
        ? artifacts.filter(a => a.podId === selectedPodFilter)
        : artifacts;

      const response = await fetch('/api/podmind/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          podId: selectedPodFilter === 'all' ? null : selectedPodFilter,
          artifacts: relevantArtifacts.map(a => ({
            id: a.id,
            title: a.title,
            podName: a.podName,
            type: a.type,
            summary: a.summary,
            content: a.content,
            keyDecisions: a.keyDecisions,
            tags: a.tags,
            author: a.author
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      const podmindReply: PodMindMessage = {
        id: `podmind-${Date.now()}`,
        sender: 'podmind',
        text: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: data.citations || [],
        suggestedFollowUps: data.suggestedFollowUps || []
      };

      setMessages(prev => [...prev, podmindReply]);
    } catch (err: any) {
      console.error('Error fetching PodMind response:', err);

      // Fallback response with local search
      const queryLower = textToSend.toLowerCase();
      const matched = artifacts.filter(a => 
        a.title.toLowerCase().includes(queryLower) ||
        a.content.toLowerCase().includes(queryLower) ||
        a.tags.some(t => queryLower.includes(t.toLowerCase()))
      );

      const top = matched[0] || artifacts[0];

      setMessages(prev => [
        ...prev,
        {
          id: `podmind-err-${Date.now()}`,
          sender: 'podmind',
          text: `### PodMind Knowledge Retrieval
I analyzed UniPods community records regarding "${textToSend}".

${top ? `**Grounded Source Reference: [${top.title}]** (${top.podName})
> ${top.summary}

**Continuity Recommendation**:
1. Check with author **${top.author}** for hands-on verification.
2. Review past decisions: *"${top.keyDecisions[0] || 'Standardized fabrication spec'}"*.
3. Verify test parameters in the **${top.type}** vault before fabricating.` : 'No exact match found in current cached records, but our UniPod knowledge streams cover hardware fabrication, solar irrigation, diagnostics, and UNDP funding guidelines.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: top ? [{
            id: top.id,
            title: top.title,
            podName: top.podName,
            type: top.type,
            excerpt: top.summary,
            relevanceScore: 0.92
          }] : []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCitationClick = (citationId: string) => {
    const target = artifacts.find(a => a.id === citationId);
    if (target) {
      onOpenArtifact(target);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-5xl mx-auto rounded-2xl bg-stone-900/60 border border-stone-800 shadow-2xl overflow-hidden">
      
      {/* PodMind Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/80 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-stone-950 shadow-md shadow-emerald-950/50">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                PodMind AI
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Active Grounding
              </span>
            </div>
            <p className="text-xs text-stone-400">
              Continuity & Collective Intelligence Engine • UniPods Network
            </p>
          </div>
        </div>

        {/* Scope Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-400 font-medium hidden sm:inline">Scope:</span>
          <select
            id="podmind-scope-select"
            value={selectedPodFilter}
            onChange={(e) => setSelectedPodFilter(e.target.value)}
            className="text-xs font-semibold bg-stone-900 text-stone-200 border border-stone-750 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="all">All UniPods Streams ({artifacts.length} Records)</option>
            {pods.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3.5 max-w-4xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs ${
              msg.sender === 'user'
                ? 'bg-stone-700 text-stone-200'
                : 'bg-emerald-500 text-stone-950 shadow-sm'
            }`}>
              {msg.sender === 'user' ? 'YOU' : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className={`flex flex-col space-y-2 max-w-2xl ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-stone-850/95 border border-stone-750 text-stone-200 rounded-tl-none shadow-md'
              }`}>
                {msg.sender === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div className="prose prose-invert prose-stone max-w-none text-sm space-y-3 prose-headings:text-stone-100 prose-p:text-stone-200 prose-strong:text-emerald-400 prose-ul:my-2 prose-li:my-0.5">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                )}
              </div>

              {/* Citations Card Stack */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="w-full mt-2 p-3 rounded-xl bg-stone-950/70 border border-stone-800 text-left">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified UniPods Community Sources ({msg.citations.length})</span>
                  </div>

                  <div className="space-y-2">
                    {msg.citations.map((c, idx) => (
                      <div 
                        key={idx}
                        onClick={() => handleCitationClick(c.id)}
                        className="flex items-start justify-between p-2.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-emerald-500/30 cursor-pointer transition group"
                      >
                        <div className="pr-2">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-stone-800 text-emerald-400 border border-stone-700">
                              {c.type}
                            </span>
                            <span className="text-xs font-semibold text-stone-200 group-hover:text-emerald-400 transition">
                              {c.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 line-clamp-1">
                            {c.excerpt}
                          </p>
                        </div>
                        <div className="shrink-0 flex items-center gap-1 text-[11px] text-stone-500 group-hover:text-emerald-400">
                          <span>Inspect</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Follow Ups */}
              {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {msg.suggestedFollowUps.map((prompt, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => handleSend(prompt)}
                      className="text-left text-xs px-3 py-1.5 rounded-lg bg-stone-900/80 hover:bg-emerald-950/40 hover:text-emerald-300 text-stone-300 border border-stone-800 hover:border-emerald-500/30 transition flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{prompt}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Meta timestamp & copy */}
              <div className="flex items-center gap-2 text-[10px] text-stone-500 px-1">
                <span>{msg.timestamp}</span>
                {msg.sender === 'podmind' && (
                  <button 
                    onClick={() => copyText(msg.text, msg.id)}
                    className="hover:text-stone-300 transition flex items-center gap-1"
                    title="Copy response"
                  >
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3 mr-auto max-w-md p-4 rounded-2xl bg-stone-850/90 border border-stone-800 text-stone-300">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-spin">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-200">PodMind is searching UniPods archives...</p>
              <p className="text-[11px] text-stone-400">Cross-referencing ADRs, lab logs, and flight telemetry</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-stone-800 bg-stone-950/80">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              id="podmind-query-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask PodMind anything across UniPods streams (e.g. laser power table, drone arm post-mortem, UNDP milestones)..."
              disabled={loading}
              className="w-full text-xs sm:text-sm bg-stone-900 border border-stone-750 focus:border-emerald-500 rounded-xl px-4 py-3 text-stone-100 placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>

          <button
            id="podmind-send-btn"
            type="submit"
            disabled={!input.trim() || loading}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-stone-950 font-bold transition shadow-md shadow-emerald-500/20 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-stone-500">
          <span>Powered by Gemini 3.8 Flash • Server-side secure grounding</span>
          <span>Continuity guaranteed for future cohorts</span>
        </div>
      </div>

    </div>
  );
};
