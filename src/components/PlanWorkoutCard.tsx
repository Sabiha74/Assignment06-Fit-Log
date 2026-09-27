"use client";

import Image from "next/image";
import Link from "next/link";
import { IWorkout } from "@/types/workout";

interface PlanWorkoutCardProps {
  workout: IWorkout;
  isDone?: boolean;
  showMarkDone?: boolean;
  onMarkDone?: () => void;
  onRemove: () => void;
}

const PlanWorkoutCard = ({
  workout,
  isDone = false,
  showMarkDone = false,
  onMarkDone,
  onRemove,
}: PlanWorkoutCardProps) => {
  return (
    <div
      className={`flex items-center gap-4 rounded-xl border border-[#252a32] bg-[#15181e] p-3 ${
        isDone ? "opacity-60" : ""
      }`}
    >
      
      <div className="relative h-[58px] w-[92px] shrink-0 overflow-hidden rounded-lg sm:h-[64px] sm:w-[100px]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className={`object-cover ${
            isDone ? "grayscale opacity-60" : ""
          }`}
        />
      </div>

      
      <div className="min-w-0 flex-1">
        <h3
          className={`truncate text-xs font-extrabold uppercase ${
            isDone
              ? "text-[#8b919b] line-through"
              : "text-white"
          }`}
        >
          {workout.name}
        </h3>

        <p className="mt-1 truncate text-[10px] text-[#666c76]">
          {workout.equipment}
        </p>

        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[9px] text-[#8b919b]">
          <span>
            <span className="text-[#ccff00]">◷</span>{" "}
            {workout.duration} min
          </span>

          <span>
            <span className="text-[#ccff00]">♨</span>{" "}
            {workout.caloriesBurned} kcal
          </span>

          <span>
            <span className="text-[#ccff00]">★</span>{" "}
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-[#303641] px-3 py-1.5 text-[9px] font-medium text-[#a4a9b2] transition hover:border-[#555c68] hover:text-white"
        >
          View Details
        </Link>

        {showMarkDone && !isDone && (
          <button
            type="button"
            onClick={onMarkDone}
            className="rounded-full bg-[#ccff00] px-3 py-1.5 text-[9px] font-bold text-black transition hover:bg-[#b8e600]"
          >
            ✓ Mark as Done
          </button>
        )}

        {showMarkDone && isDone && (
          <span className="rounded-full border border-[#3b4430] px-3 py-1.5 text-[9px] font-semibold text-[#ccff00]">
            ✓ Done
          </span>
        )}

        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="flex h-7 w-7 items-center justify-center text-base text-[#666c76] transition hover:text-white"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default PlanWorkoutCard;