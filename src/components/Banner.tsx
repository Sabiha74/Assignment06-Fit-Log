import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="border rounded-2xl border-[#35383d] bg-[#1a1d22]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">


        <div>
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          
          <h1 className="max-w-2xl text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Train With Intent. Log Every Set.
          </h1>

          
          <p className="mt-6 max-w-xl text-sm leading-6 text-[#8b919b] sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work
            add up.
          </p>

          
          <Link
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-5 py-3 text-xs font-bold uppercase tracking-wide text-black transition hover:bg-[#b8e600]"
          >
            Browse Workouts
          </Link>
        </div>

       
       
                <Image
                          src="/banner.png"
                          alt="FitLog workout"
                          width={400}
                          height={300}
            />
          
    

      </div>
    </section>
  );
};

export default Hero;