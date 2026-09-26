import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-[#252a32] bg-[#0e1014]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row">

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
          />

          <span className="text-xs font-bold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        <p className="text-center text-[10px] text-[#5f6670] md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;