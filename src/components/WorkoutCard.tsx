import Image from "next/image";
import Link from "next/link";

interface WorkoutCardProps {
  workout: {
    id: number;
    name: string;
    image: string;
    muscleGroups: string[];
    equipment: string;
    difficulty: string;
    duration: number;
    caloriesBurned: number;
    sets: number;
    reps: string;
    rating: number;
    description: string;
    instructions: string[];
  };
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-[#252a32] bg-[#15181e]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        
        <h3 className="text-lg font-bold text-white">
          {workout.name}
        </h3>

        
        <p className="mt-2 text-sm text-[#8b919b]">
          {workout.equipment}
        </p>

        
        <div className="mt-4 flex flex-wrap gap-4 border-t border-[#252a32] pt-3 text-xs text-[#8b919b]">
          <span>◷ {workout.duration} min</span>

          <span>🔥 {workout.caloriesBurned} kcal</span>

          <span>
            <span className="text-[#ccff00]">★</span>{" "}
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;