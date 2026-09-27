import Image from "next/image";
import { IWorkout } from "@/types/workout";
import WorkoutActions from "@/components/WorkoutActions";

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

     
      <div className="flex flex-col">
        
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
          {workout.name}
        </h1>

        
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8b919b]">
          {workout.description}
        </p>

        
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

        
        <WorkoutActions workout={workout} />
      </div>
    </section>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
  last?: boolean;
}

const InfoRow = ({
  label,
  value,
  last = false,
}: InfoRowProps) => {
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