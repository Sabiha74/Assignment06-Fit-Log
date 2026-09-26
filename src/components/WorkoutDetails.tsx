import Image from "next/image";
import { IWorkout } from "@/types/workout";

interface WorkoutDetailsProps {
  workout: IWorkout;
}

const WorkoutDetails = ({ workout }: WorkoutDetailsProps) => {
  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
      {/* LEFT SIDE - IMAGE */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#252a32] bg-[#15181e] lg:aspect-auto lg:h-[620px]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* RIGHT SIDE - DETAILS */}
      <div className="flex flex-col">
        {/* Title */}
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
          {workout.name}
        </h1>

        {/* Description */}
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8b919b]">
          {workout.description}
        </p>

        {/* Muscle Groups */}
        <div className="mt-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#ccff00] px-3 py-1 text-[11px] font-bold text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout Information */}
        <div className="mt-4 overflow-hidden rounded-xl border border-[#252a32] bg-[#15181e]">
          <InfoRow
            label="EQUIPMENT"
            value={workout.equipment}
          />

          <InfoRow
            label="DIFFICULTY"
            value={workout.difficulty}
          />

          <InfoRow
            label="SETS"
            value={workout.sets.toString()}
          />

          <InfoRow
            label="REPS"
            value={workout.reps}
          />

          <InfoRow
            label="DURATION"
            value={`${workout.duration} min`}
          />

          <InfoRow
            label="CALORIES"
            value={`${workout.caloriesBurned} kcal`}
          />

          <InfoRow
            label="RATING"
            value={workout.rating.toString()}
            last
          />
        </div>

        {/* Instructions */}
        <div className="mt-5">
          <h2 className="text-sm font-extrabold uppercase text-white">
            INSTRUCTIONS
          </h2>

          <ol className="mt-3 space-y-2">
            {workout.instructions.map((instruction, index) => (
              <li
                key={index}
                className="flex gap-3 text-xs leading-5 text-[#8b919b]"
              >
                <span className="shrink-0 text-[#666c76]">
                  {index + 1}.
                </span>

                <span>{instruction}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          {/* Add to Today's Plan */}
          <button
            type="button"
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

            Add to today's plan
          </button>

          {/* Save for Later */}
          <button
            type="button"
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
      </div>
    </section>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
  last?: boolean;
}

const InfoRow = ({ label, value, last = false }: InfoRowProps) => {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 ${
        !last ? "border-b border-[#252a32]" : ""
      }`}
    >
      <span className="text-[9px] font-bold tracking-wider text-[#666c76]">
        {label}
      </span>

      <span className="text-xs text-[#c4c7cd]">
        {value}
      </span>
    </div>
  );
};

export default WorkoutDetails;