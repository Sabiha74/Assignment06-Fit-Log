import React from 'react';
import WorkoutCard from './WorkoutCard';
import { IWorkout } from '@/types/workout';
const getWorkout = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/fitlog", { next: { revalidate: 60 }, });
    

    if (!res.ok) {
    throw new Error(`Failed to fetch workouts: ${res.status}`);
  }

  return res.json();
};
const Workout = async () => {
    const workout = await getWorkout();
    return (
         <section className="w-full">
      <h2 className=" text-3xl font-bold text-white">
        THE LIBRARY
      </h2>
       <p className="mb-6 text-sm text-[#8b919b]">
        Twelve lifts covering every major muscle group.
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {workout.map((workout: IWorkout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
          />
        ))}
      </div>
    </section>
    );
};

export default Workout;