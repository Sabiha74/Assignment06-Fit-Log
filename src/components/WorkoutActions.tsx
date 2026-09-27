"use client";

import { toast } from "react-toastify";
import { IWorkout } from "@/types/workout";

interface WorkoutActionsProps {
  workout: IWorkout;
}

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const handleAddToPlan = () => {
    const storedPlan = localStorage.getItem("fitlog-plan");

    const plan: number[] = storedPlan
      ? JSON.parse(storedPlan)
      : [];

    if (plan.includes(workout.id)) {
      toast.info("This workout is already in today's plan.");
      return;
    }

    if (plan.length >= 5) {
      toast.warning(
        "You can add a maximum of 5 workouts to today's plan.",
      );
      return;
    }

    const updatedPlan = [...plan, workout.id];

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan),
    );

    window.dispatchEvent(new Event("fitlog-storage"));

    toast.success(`${workout.name} added to today's plan.`);
  };

  const handleSaveForLater = () => {
    const storedSaved = localStorage.getItem("fitlog-saved");

    const saved: number[] = storedSaved
      ? JSON.parse(storedSaved)
      : [];

    if (saved.includes(workout.id)) {
      toast.info("This workout is already saved.");
      return;
    }

    const updatedSaved = [...saved, workout.id];

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved),
    );

    window.dispatchEvent(new Event("fitlog-storage"));

    toast.success(`${workout.name} saved for later.`);
  };

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {/* Add to Today's Plan */}
      <button
        type="button"
        onClick={handleAddToPlan}
        className="flex items-center gap-2 rounded-md bg-[#ccff00] px-4 py-2.5 text-xs font-bold text-black transition hover:bg-[#b8e600]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
          <path d="M8 14h2" />
          <path d="M14 14h2" />
          <path d="M8 18h2" />
          <path d="M14 18h2" />
        </svg>

        Add to today&apos;s plan
      </button>

      {/* Save for Later */}
      <button
        type="button"
        onClick={handleSaveForLater}
        className="flex items-center gap-2 rounded-md border border-[#353b45] bg-transparent px-4 py-2.5 text-xs font-medium text-[#a4a9b2] transition hover:border-[#555c68] hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>

        Save for later
      </button>
    </div>
  );
};

export default WorkoutActions;