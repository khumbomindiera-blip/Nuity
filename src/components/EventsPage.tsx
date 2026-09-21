export function EventsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black text-white">
        Upcoming Events
      </h1>

      <div className="p-5 rounded-xl bg-stone-900 border border-stone-800">
        <p className="text-blue-400 font-bold">22 Sep</p>
        <h3 className="text-white font-bold">
          Mentor Office Hours
        </h3>
      </div>

      <div className="p-5 rounded-xl bg-stone-900 border border-stone-800">
        <p className="text-blue-400 font-bold">24 Sep</p>
        <h3 className="text-white font-bold">
          Demos & Cohort Vote
        </h3>
      </div>

      <div className="p-5 rounded-xl bg-stone-900 border border-stone-800">
        <p className="text-blue-400 font-bold">30 Sep</p>
        <h3 className="text-white font-bold">
          Agritech Accelerator Deadline
        </h3>
      </div>
    </div>
  );
}
