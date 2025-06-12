import Link from 'next/link';
import Image from 'next/image';
import { ProductionCard } from '@/types/events';

interface TopPicksServerContentProps {
  topPicks: ProductionCard[];
  location: string;
  activeFilter: string;
}

// Large event card component
const LargeEventCard: React.FC<{ event: ProductionCard }> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const cleanDateString = dateString.replace(/\[.*?\]$/, '');
    const date = new Date(cleanDateString);
    
    if (isNaN(date.getTime())) {
      return 'TBD';
    }
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    if (timeString === 'TBD') return 'TBD';
    try {
      const cleanTimeString = timeString.replace(/\[.*?\]$/, '');
      const date = new Date(cleanTimeString);
      
      if (isNaN(date.getTime())) {
        return 'TBD';
      }
      
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } catch {
      return 'TBD';
    }
  };

  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-3">
        <Image
          src={event.imageUrl}
          alt={event.title}
          width={312}
          height={234}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors truncate">
          {event.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-pink-500">
              {formatDate(event.date)} • {formatTime(event.time)}
            </p>
            <p className="text-sm text-gray-500">
              {event.venue.name}
            </p>
          </div>
          {event.similarProductionCount > 0 && (
            <div className="text-xs text-gray-500 flex-shrink-0">
              +{event.similarProductionCount} more date{event.similarProductionCount !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Small compact card component
const SmallEventCard: React.FC<{ event: ProductionCard }> = ({ event }) => {
  const formatDate = (dateString: string) => {
    const cleanDateString = dateString.replace(/\[.*?\]$/, '');
    const date = new Date(cleanDateString);
    
    if (isNaN(date.getTime())) {
      return 'TBD';
    }
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    if (timeString === 'TBD') return 'TBD';
    try {
      const cleanTimeString = timeString.replace(/\[.*?\]$/, '');
      const date = new Date(cleanTimeString);
      
      if (isNaN(date.getTime())) {
        return 'TBD';
      }
      
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } catch {
      return 'TBD';
    }
  };

  return (
    <div className="flex items-center space-x-4 p-0 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors group">
      <div className="w-20 h-24 rounded-lg rounded-r-none overflow-hidden flex-shrink-0">
        <Image
          src={event.imageUrl}
          alt={event.title}
          width={80}
          height={96}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 truncate group-hover:text-purple-600">
          {event.title}
        </h4>
        <p className="text-sm text-gray-600 truncate">
          {formatDate(event.date)} • {formatTime(event.time)}
        </p>
        <p className="text-sm text-gray-500 truncate">
          {event.venue.name}
        </p>
      </div>
    </div>
  );
};

export default function TopPicksServerContent({ 
  topPicks, 
  location, 
  activeFilter 
}: TopPicksServerContentProps) {
  const timeFilters = [
    { label: "Explore", value: "explore" },
    { label: "Any Dates", value: "Any Dates" },
    { label: "This Weekend", value: "This Weekend" },
    { label: "This Week", value: "This Week" },
    { label: "This Month", value: "This Month" },
    { label: "Next 7 Days", value: "Next 7 Days" },
    { label: "Next 30 Days", value: "Next 30 Days" },
    { label: "Next 60 Days", value: "Next 60 Days" }
  ];

  // Split the events - first 4 as large cards, rest as small cards
  const featuredEvents = topPicks.slice(0, 4);
  const remainingEvents = topPicks.slice(4);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Our top picks in{" "}
            <span className="text-primary">{location}</span>
            <svg className="inline w-6 h-6 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </h2>
        </div>
        <button className="text-foreground font-semibold hover:text-primary flex items-center">
          Find More Events
          <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Time Filter Links */}
      <div className="flex flex-wrap gap-3 mb-8">
        {timeFilters.map((filter, index) => {
          const isActive = activeFilter === filter.value;
          const href = filter.value === 'explore' ? '/' : `/?filter=${encodeURIComponent(filter.value)}`;
          
          return (
            <Link
              key={index}
              href={href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-purple-100 text-purple-700 border border-purple-200"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {filter.label}
              {filter.label === "Explore" && (
                <svg className="inline w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              )}
            </Link>
          );
        })}
      </div>

      {/* Featured Events Grid - Large Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {featuredEvents.map((event) => (
          <LargeEventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Remaining Events - Small Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {remainingEvents.map((event) => (
          <SmallEventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
} 