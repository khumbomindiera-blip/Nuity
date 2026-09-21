interface CommunityFeedProps {
  onAskPodMind: () => void;
}

export function CommunityFeed({
  onAskPodMind,
}: CommunityFeedProps) {
  return (
    <div className="space-y-6">

      {/* What You Missed */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 to-indigo-900/30 border border-blue-800">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-3">
          WHAT YOU MISSED
        </div>

        <h1 className="text-3xl font-black mb-4 text-white">
          What You Missed This Week
        </h1>

        <ul className="space-y-2 text-stone-300 mb-5">
          <li>🔔 Team declaration deadline closes today</li>
          <li>🏆 Hackathon judging criteria released</li>
          <li>🚀 Agritech accelerator applications now open</li>
        </ul>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold">
            Listen (2 min)
          </button>

          <button className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-sm font-semibold">
            View Sources
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-5">

          {/* Post Composer */}
          <div className="p-5 rounded-xl bg-stone-900 border border-stone-800">
            <h3 className="font-bold text-white mb-3">
              Share with your UniPod community
            </h3>

            <input
              type="text"
              placeholder="What's happening in your UniPod?"
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-stone-500"
            />

            <div className="flex justify-end mt-3">
              <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold">
               Share Update
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm font-semibold">
              All
            </button>

            <button className="px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-sm">
              Announcements
            </button>

            <button className="px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-sm">
              Opportunities
            </button>

            <button className="px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-sm">
              Events
            </button>

            <button className="px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-sm">
              Discussions
            </button>
          </div>

          <h2 className="text-xl font-bold text-white">
            Community Feed
          </h2>

          {/* Post 1 */}
          <div className="p-5 rounded-xl bg-stone-900 border border-stone-800 hover:border-blue-700 transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                AB
              </div>

              <div>
                <h3 className="font-bold text-white">
                  Amina Bello
                </h3>

                <p className="text-xs text-stone-500">
                  Nigeria • 37 min ago
                </p>
              </div>
            </div>

            <h4 className="font-bold text-white mb-2">
              Judging criteria for the chatbot hackathon
            </h4>

            <p className="text-sm text-stone-400">
              Four criteria carry equal weight: functionality,
              accuracy, usability and maintainability.
            </p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-800">
              <button className="text-sm text-stone-400 hover:text-blue-400 transition">
                ❤️ Like
              </button>

              <button className="text-sm text-stone-400 hover:text-blue-400 transition">
                💬 Comment
              </button>

              <button className="text-sm text-stone-400 hover:text-blue-400 transition">
                🔗 Share
              </button>
            </div>
          </div>

          {/* Post 2 */}
          <div className="p-5 rounded-xl bg-stone-900 border border-stone-800 hover:border-blue-700 transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white">
                MD
              </div>

              <div>
                <h3 className="font-bold text-white">
                  Moussa Diallo
                </h3>

                <p className="text-xs text-stone-500">
                  Guinea • 3 hours ago
                </p>
              </div>
            </div>

            <h4 className="font-bold text-white mb-2">
              Looking for a React Developer
            </h4>

            <p className="text-sm text-stone-400">
              Team Sahel is looking for someone experienced in React
              and offline-first PWA development.
            </p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-800">
              <button className="text-sm text-stone-400 hover:text-blue-400 transition">
                ❤️ Like
              </button>

              <button className="text-sm text-stone-400 hover:text-blue-400 transition">
                💬 Comment
              </button>

              <button className="text-sm text-stone-400 hover:text-blue-400 transition">
                🔗 Share
              </button>
            </div>
          </div>

          {/* Post 3 */}
          <div className="p-5 rounded-xl bg-stone-900 border border-stone-800 hover:border-blue-700 transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white">
                GN
              </div>

              <div>
                <h3 className="font-bold text-white">
                  Grace Nakato
                </h3>

                <p className="text-xs text-stone-500">
                  Uganda • 5 hours ago
                </p>
              </div>
            </div>

            <h4 className="font-bold text-white mb-2">
              Do we email the team list or post it here?
            </h4>

            <p className="text-sm text-stone-400">
              I couldn't find the submission address for the team declaration.
            </p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-800">
              <button className="text-sm text-stone-400 hover:text-blue-400 transition">
                ❤️ Like
              </button>

              <button className="text-sm text-stone-400 hover:text-blue-400 transition">
                💬 Comment
              </button>

              <button className="text-sm text-stone-400 hover:text-blue-400 transition">
                🔗 Share
              </button>
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="space-y-4">

          <div className="p-5 rounded-xl bg-stone-900 border border-stone-800">
            <h3 className="font-bold text-white mb-4">
              Upcoming Events
            </h3>

            <div className="space-y-4">

              <div>
                <p className="font-semibold text-blue-400">
                  22 Sep
                </p>
                <p className="text-stone-300">
                  Mentor Office Hours
                </p>
              </div>

              <div>
                <p className="font-semibold text-blue-400">
                  24 Sep
                </p>
                <p className="text-stone-300">
                  Demos & Cohort Vote
                </p>
              </div>

              <div>
                <p className="font-semibold text-blue-400">
                  30 Sep
                </p>
                <p className="text-stone-300">
                  Agritech Accelerator Deadline
                </p>
              </div>

            </div>
          </div>

          <div className="p-5 rounded-xl bg-stone-900 border border-stone-800">
            <h3 className="font-bold text-white mb-2">
              Ask PodMind
            </h3>

            <p className="text-sm text-stone-400 mb-4">
              Search across WhatsApp chats, meetings, transcripts and institutional memory.
            </p>

            <input
              type="text"
              placeholder="Ask anything from chats, calls or documents..."
              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-stone-500 mb-3"
            />

            <button
              onClick={onAskPodMind}
              className="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold"
            >
              Ask PodMind
            </button>
          </div>

          <div className="p-5 rounded-xl bg-stone-900 border border-stone-800">
            <h3 className="font-bold text-white mb-2">
              About Nuity
            </h3>

            <p className="text-sm text-stone-400">
              Continuity for UniPods Communities.
            </p>

            <p className="text-xs text-stone-500 mt-3">
              Powered by PodMind AI • Preserve Knowledge • Discover Opportunities • Strengthen Collaboration
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
