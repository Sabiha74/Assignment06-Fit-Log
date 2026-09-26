
import WorkoutDetails from "@/components/WorkoutDetails";
import { IWorkout } from "@/types/workout";
import { notFound } from "next/navigation";

const getWorkout = async (id: string): Promise<IWorkout | undefined> => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/fitlog",
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch workouts: ${res.status}`);
  }

  const workouts: IWorkout[] = await res.json();

  return workouts.find(
    (workout) => workout.id.toString() === id
  );
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0d0f13]">

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <WorkoutDetails workout={workout} />
      </main>

    
    </div>
  );
};

export default Page;