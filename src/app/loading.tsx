import Header from "@/components/Header"
import { Banner } from "@/components/Banner"
import { EventCardSkeleton, SmallEventCardSkeleton } from "@/components/TopPicks"

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Top Picks Section Skeleton - Only section that loads dynamically */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="h-9 bg-gray-200 rounded w-80"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-32"></div>
            </div>

            {/* Time Filter Buttons Skeleton */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { width: 'w-20' }, // Explore
                { width: 'w-24' }, // Any Dates
                { width: 'w-28' }, // This Weekend
                { width: 'w-24' }, // This Week
                { width: 'w-26' }, // This Month
                { width: 'w-26' }, // Next 7 Days
                { width: 'w-28' }, // Next 30 Days
                { width: 'w-28' }  // Next 60 Days
              ].map((filter, index) => (
                <div
                  key={index}
                  className={`h-10 bg-gray-200 rounded-full ${filter.width} animate-pulse`}
                ></div>
              ))}
            </div>

            {/* Featured Events Grid - Large Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <EventCardSkeleton key={index} />
              ))}
            </div>

            {/* Remaining Events - Small Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <SmallEventCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Note: Other sections (Sports, Concerts, Theater, Blog) are pre-rendered statically */}
        {/* They don't need loading skeletons as they're built at build time */}
      </main>
    </div>
  )
} 