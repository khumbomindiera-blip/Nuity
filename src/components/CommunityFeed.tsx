interface CommunityFeedProps {
  onAskPodMind: () => void;
}

export function CommunityFeed({
  onAskPodMind,
}: CommunityFeedProps) {
  return (
    <div className="space-y-6">

      {/* Daily Brief */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 to-indigo-900/30 border border-blue-800">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-3">
          Your Daily Brief
        </div>

        <h1 className="text-3xl font-black mb-2 text-white">
          Three things before you start
        </h1>

        <ul className="space-y-2 text-stone-300">
          <li>• New Teams transcript uploaded</li>
          <li>• Grant milestone due this week</li>
          <li>• Two new continuity records added</li>
        </ul>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-4">

          <h2 className="text-xl font-bold text-white">
            What's Happening
          </h2>

          {/* Post 1 */}
          <div className="p-5 rounded-xl bg-stone-900 border border-stone-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
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
              Four criteria carry equal weight:
              functionality, accuracy, usability and maintainability.
            </p>

            <div className="flex gap-6 mt-4 text-sm text-stone-500">
              <span>❤️ 18 Likes</span>
              <span>💬 9 Comments</span>
            </div>
          </div>

          {/* Post 2 */}
          <div className="p-5 rounded-xl bg-stone-900 border border-stone-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
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

            <div className="flex gap-6 mt-4 text-sm text-stone-500">
              <span>❤️ 7 Likes</span>
              <span>💬 12 Comments</span>
            </div>
          </div>

          {/* Post 3 */}
          <div className="p-5 rounded-xl bg-stone-900 border border-stone-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold">
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

            <div className="flex gap-6 mt-4 text-sm text-stone-500">
              <span>❤️ 2 Likes</span>
              <span>💬 1 Comment</span>
            </div>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">

          <div className="p-5 rounded-xl bg-stone-900 border border-stone-800">
            <h3 className="font-bold text-white mb-4">
              Upcoming Events
            </h3>

            <div className="space-y-3 text-sm">
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
              Answers from chats, calls, transcripts and documents.
            </p>

            <button
              onClick={onAskPodMind}
              className="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold"
            >
              Open PodMind
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
