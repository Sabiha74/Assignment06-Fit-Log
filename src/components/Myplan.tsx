"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { IWorkout } from "@/types/workout";
import PlanWorkoutCard from "./PlanWorkoutCard";

const API_URL =
  "https://api.api-store.workers.dev/api/fitlog";

type SortOption = "duration" | "calories" | "difficulty";
type ActiveTab = "plan" | "saved";

const MyPlan = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<IWorkout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  const [activeTab, setActiveTab] =
    useState<ActiveTab>("plan");

  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  const [loading, setLoading] = useState(true);

 

  const loadData = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch workouts");
      }

      const allWorkouts: IWorkout[] = await response.json();

      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved =
        localStorage.getItem("fitlog-saved");
      const storedCompleted =
        localStorage.getItem("fitlog-completed");

      const planIds: number[] = storedPlan
        ? JSON.parse(storedPlan)
        : [];

      const savedIds: number[] = storedSaved
        ? JSON.parse(storedSaved)
        : [];

      const completed: number[] = storedCompleted
        ? JSON.parse(storedCompleted)
        : [];

      const planWorkouts = allWorkouts.filter((workout) =>
        planIds.includes(workout.id),
      );

      const saved = allWorkouts.filter((workout) =>
        savedIds.includes(workout.id),
      );

      setWorkouts(planWorkouts);
      setSavedWorkouts(saved);
      setCompletedIds(completed);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load your workouts.");
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  const timer = window.setTimeout(() => {
    loadData();
  }, 0);

  const handleStorageUpdate = () => {
    loadData();
  };

  window.addEventListener("fitlog-storage", handleStorageUpdate);

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("fitlog-storage", handleStorageUpdate);
  };
}, []);

    
  const handleRemoveFromPlan = (id: number) => {
    const storedPlan = localStorage.getItem("fitlog-plan");

    const plan: number[] = storedPlan
      ? JSON.parse(storedPlan)
      : [];

    const updatedPlan = plan.filter(
      (workoutId) => workoutId !== id,
    );

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan),
    );

    setWorkouts((current) =>
      current.filter((workout) => workout.id !== id),
    );

    toast.success("Workout removed from today's plan.");

    window.dispatchEvent(new Event("fitlog-storage"));
  };

 

  const handleRemoveSaved = (id: number) => {
    const storedSaved =
      localStorage.getItem("fitlog-saved");

    const saved: number[] = storedSaved
      ? JSON.parse(storedSaved)
      : [];

    const updatedSaved = saved.filter(
      (workoutId) => workoutId !== id,
    );

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved),
    );

    setSavedWorkouts((current) =>
      current.filter((workout) => workout.id !== id),
    );

    toast.success("Workout removed from saved.");

    window.dispatchEvent(new Event("fitlog-storage"));
  };

 

  const handleMarkDone = (id: number) => {
    const updatedCompleted = completedIds.includes(id)
      ? completedIds
      : [...completedIds, id];

    setCompletedIds(updatedCompleted);

    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(updatedCompleted),
    );

    toast.success("Workout marked as done.");
  };

  

  const sortedWorkouts = useMemo(() => {
    const list =
      activeTab === "plan"
        ? [...workouts]
        : [...savedWorkouts];

    if (sortBy === "duration") {
      return list.sort(
        (a, b) => a.duration - b.duration,
      );
    }

    if (sortBy === "calories") {
      return list.sort(
        (a, b) =>
          b.caloriesBurned - a.caloriesBurned,
      );
    }

    if (sortBy === "difficulty") {
      const order: Record<string, number> = {
        Beginner: 1,
        Intermediate: 2,
        Advanced: 3,
      };

      return list.sort(
        (a, b) =>
          (order[a.difficulty] ?? 0) -
          (order[b.difficulty] ?? 0),
      );
    }

    return list;
  }, [
    activeTab,
    workouts,
    savedWorkouts,
    sortBy,
  ]);

  

  const currentWorkouts =
  activeTab === "plan"
    ? workouts
    : savedWorkouts;

const exercises = currentWorkouts.length;

const minutes = currentWorkouts.reduce(
  (total, workout) =>
    total + workout.duration,
  0,
);

const calories = currentWorkouts.reduce(
  (total, workout) =>
    total + workout.caloriesBurned,
  0,
);
 

  return (
    <section className="mx-auto w-full max-w-[940px] px-4 py-10 sm:px-6">
      
      <div>
        <h1 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl">
          My Plan
        </h1>

        <p className="mt-1 text-xs text-[#666c76]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      
      <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-xl border border-[#252a32] bg-[#111419]">
        
        <div className="px-4 py-5 sm:px-5">
          <p className="text-[9px] text-[#666c76]">
            Exercises
          </p>

          <p className="mt-1 text-2xl font-extrabold text-[#ccff00] sm:text-3xl">
            {exercises}
          </p>
        </div>

       
        <div className="border-l border-[#252a32] px-4 py-5 sm:px-5">
          <p className="text-[9px] text-[#666c76]">
            Minutes
          </p>

          <p className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
            {minutes}
          </p>
        </div>

        
        <div className="border-l border-[#252a32] px-4 py-5 sm:px-5">
          <p className="text-[9px] text-[#666c76]">
            Calories
          </p>

          <p className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
            {calories}
          </p>
        </div>
      </div>

     
      <div className="mt-5 flex items-center justify-between gap-4">
        
        <div className="flex rounded-lg border border-[#252a32] bg-[#111419] p-1">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`rounded-md px-3 py-1.5 text-[9px] font-medium transition ${
              activeTab === "plan"
                ? "bg-[#20242b] text-white"
                : "text-[#666c76] hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`rounded-md px-3 py-1.5 text-[9px] font-medium transition ${
              activeTab === "saved"
                ? "bg-[#20242b] text-white"
                : "text-[#666c76] hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

       
        <div className="flex items-center gap-2">
          <span className="hidden text-[9px] text-[#666c76] sm:block">
            Sort By
          </span>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(
                event.target.value as SortOption,
              )
            }
            className="rounded-md border border-[#252a32] bg-[#111419] px-2.5 py-1.5 text-[9px] text-[#c4c7cd] outline-none"
          >
            <option value="duration">
              Duration
            </option>

            <option value="calories">
              Calories
            </option>

            <option value="difficulty">
              Difficulty
            </option>
          </select>
        </div>
      </div>

      
      <div className="mt-4 space-y-2.5">
        {loading ? (
          <div className="rounded-xl border border-[#252a32] bg-[#15181e] px-4 py-8 text-center text-xs text-[#666c76]">
            Loading workouts...
          </div>
        ) : sortedWorkouts.length === 0 ? (
          <div className="rounded-xl border border-[#252a32] bg-[#15181e] px-4 py-10 text-center">
            <p className="text-sm font-semibold text-white">
              {activeTab === "plan"
                ? "No workouts in today's plan."
                : "No saved workouts yet."}
            </p>

            <p className="mt-1 text-xs text-[#666c76]">
              {activeTab === "plan"
                ? "Add a workout from its details page."
                : "Save workouts to find them here later."}
            </p>
          </div>
        ) : (
          sortedWorkouts.map((workout) => (
            <PlanWorkoutCard
              key={workout.id}
              workout={workout}
              isDone={completedIds.includes(
                workout.id,
              )}
              showMarkDone={activeTab === "plan"}
              onMarkDone={() =>
                handleMarkDone(workout.id)
              }
              onRemove={() =>
                activeTab === "plan"
                  ? handleRemoveFromPlan(
                      workout.id,
                    )
                  : handleRemoveSaved(workout.id)
              }
            />
          ))
        )}
      </div>
    </section>
  );
};

export default MyPlan;