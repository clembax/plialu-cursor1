import { Link } from 'react-router';
import React from 'react';

export function SolutionRavalementPage() {
  return (
        <main className="min-h-[50vh] flex flex-col pt-48 md:pt-56 pb-20 bg-[#0E2A33]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Ravalement de façade</h1>
            <Link to="/solutions-hub"
              
              className="text-[#E2FD48] hover:text-white transition font-medium flex items-center gap-2 mt-8"
            >
              &larr; Retour aux solutions
            </Link>
          </div>
        </main>
  );
}
