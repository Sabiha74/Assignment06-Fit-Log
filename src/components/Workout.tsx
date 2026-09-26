import React from 'react';
import WorkoutCard from './WorkoutCard';
const getWorkout = async () => {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
    const data = await res.json();
    return data;
}
const Workout = async () => {
    const workout = await getWorkout();
    return (
         <section className="w-full">
      <h2 className="mb-6 text-3xl font-bold text-white">
        THE LIBRARY
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {workout.map((workout) => (
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