interface CommunityFeedProps {
  onAskPodMind: () => void;
}

export function CommunityFeed({
  onAskPodMind,
}: CommunityFeedProps) {
  return (
    <div className="space-y-6">

      {/* Daily Brief */}
      <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
        <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-3">
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

      {/* Latest Activity */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">
          Latest Activity
        </h2>

        <div className="space-y-4">

          <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
            <h3 className="font-bold text-white">
              Hackathon Planning Meeting
            </h3>

            <p className="text-stone-400 text-sm mt-2">
              AI-generated summary is available. Key decisions and action items were extracted.
            </p>

            <button
              onClick={onAskPodMind}
              className="mt-3 px-4 py-2 rounded-lg bg-emerald-500 text-black font-bold"
            >
              Ask PodMind
            </button>
          </div>

          <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
            <h3 className="font-bold text-white">
              New Funding Opportunity
            </h3>

            <p className="text-stone-400 text-sm mt-2">
              Student innovation funding opportunity detected and archived.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-900 border border-stone-800">
            <h3 className="font-bold text-white">
              Teams Transcript Uploaded
            </h3>

            <p className="text-stone-400 text-sm mt-2">
              Meeting transcript processed and added to the Knowledge Vault.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
