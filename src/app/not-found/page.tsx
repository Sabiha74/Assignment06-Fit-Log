import Link from "next/link";

const NotFound = () => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-bold tracking-[0.2em] text-[#ccff00]">
          404
        </p>

        <h1 className="mt-3 text-4xl font-extrabold uppercase text-white">
          Page Not Found
        </h1>

        <p className="mt-2 text-sm text-[#666c76]">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-md bg-[#ccff00] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#b8e600]"
        >
          Go to workouts
        </Link>
      </div>
    </section>
  );
};

export default NotFound;