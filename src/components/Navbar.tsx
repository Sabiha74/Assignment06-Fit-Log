"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const updateCounts = () => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    const plan: number[] = storedPlan
      ? JSON.parse(storedPlan)
      : [];

    const saved: number[] = storedSaved
      ? JSON.parse(storedSaved)
      : [];

    setPlanCount(plan.length);
    setSavedCount(saved.length);
  };

  useEffect(() => {
  
    updateCounts();

    
    const handleFitlogStorage = () => {
      updateCounts();
    };

    window.addEventListener(
      "fitlog-storage",
      handleFitlogStorage,
    );

    
    window.addEventListener("storage", updateCounts);

    return () => {
      window.removeEventListener(
        "fitlog-storage",
        handleFitlogStorage,
      );

      window.removeEventListener(
        "storage",
        updateCounts,
      );
    };
  }, []);

  return (
    <nav className="border-b border-[#252a32] bg-[#0e1014]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

        
        <div className="flex items-center gap-2">
        
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md text-[#8b919b] hover:bg-[#15181e] hover:text-white"
            >
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={-1}
              className="menu dropdown-content z-50 mt-3 w-44 rounded-lg border border-[#252a32] bg-[#15181e] p-2 shadow-xl"
            >
              <li>
                <Link href="/">Workouts</Link>
              </li>

              <li>
                <Link href="/my-plan">My Plan</Link>
              </li>
            </ul>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
            />

            <span className="text-sm font-bold tracking-wide text-white">
              FITLOG
            </span>
          </Link>
        </div>

        
        <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <div className="flex items-center gap-2 rounded-full bg-[#111419] p-1">
            <Link
              href="/"
              className="rounded-full px-5 py-2 text-xs font-medium text-[#8b919b] transition hover:bg-[#ccff002b] hover:text-[#ccff00]"
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              className="rounded-full px-5 py-2 text-xs font-medium text-[#8b919b] transition hover:bg-[#ccff002b] hover:text-[#ccff00]"
            >
              My Plan
            </Link>
          </div>
        </div>

      
        <div className="flex items-center gap-3">

          
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs text-[#8b919b] transition hover:text-white"
          >
            <span className="hidden sm:inline">
              Plan
            </span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[10px] font-bold text-black">
              {planCount}
            </span>
          </Link>

          
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs text-[#8b919b] transition hover:text-white"
          >
            <span className="hidden sm:inline">
              Saved
            </span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#3a414c] px-1.5 text-[10px] font-medium text-[#d1d5db]">
              {savedCount}
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;