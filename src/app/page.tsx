import Banner from "@/components/Banner";
import Workout from "@/components/Workout";


const page = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center  gap-4 px-4 py-12 sm:px-6 md:py-16 lg:gap-16 lg:py-20">
      <Banner></Banner>
      <Workout></Workout>
    </div>
  );
};

export default page;