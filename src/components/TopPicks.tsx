'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TopPicks as TopPicksAPI } from '@/utils/top-picks';

interface ProductionCard {
  id: number;
  imageUrl: string;
  title: string;
  venue: {
    id: number;
    name: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
    countryCode: string;
    regionId: number;
    parkingVenueId: number;
    capacity: number;
    timezone: string;
    organicUrl: string;
    latitude: number;
    longitude: number;
    productionCount: number;
    webPath: string;
    exclusiveWsUserId: number;
    revenueRank: number;
  };
  performers: Array<{
    id: number;
    name: string;
    category: any;
    master: boolean;
    organicUrl: string;
    parkingId: number;
    webPath: string;
    revenueRank: number;
    allTimeRevenueRank: number;
    exclusiveWsUserId: number;
    priority: number;
    urlName: string;
    productionCount: number;
    nickname?: string;
  }>;
  date: string;
  time: string;
  similarProductionCount: number;
}

interface TopPicksProps {
  topPicks: ProductionCard[];
  location?: string;
  latitude?: number;
  longitude?: number;
}

// Skeleton component for loading states
export const EventCardSkeleton: React.FC = () => (
  <div className="group cursor-pointer animate-pulse">
    <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-3 bg-gray-200"></div>
    <div className="space-y-2">
      <div className="h-6 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

export const SmallEventCardSkeleton: React.FC = () => (
  <div className="flex items-center space-x-4 p-0 rounded-lg border border-gray-200 animate-pulse">
    <div className="w-20 h-24 rounded-lg rounded-r-none bg-gray-200 flex-shrink-0"></div>
    <div className="flex-1 min-w-0">
      <div className="h-5 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

// Large featured card component
const LargeEventCard: React.FC<{ event: ProductionCard }> = ({ event }) => {
    console.log(event)
  const formatDate = (dateString: string) => {
    // Remove timezone identifier in brackets if present (e.g., [America/New_York])
    const cleanDateString = dateString.replace(/\[.*?\]$/, '');
    const date = new Date(cleanDateString);
    
    if (isNaN(date.getTime())) {
      return 'TBD';
    }
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    if (timeString === 'TBD') return 'TBD';
    try {
      // Remove timezone identifier in brackets if present (e.g., [America/New_York])
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
        <img
          src={event.imageUrl}
          alt={event.title}
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
    // Remove timezone identifier in brackets if present (e.g., [America/New_York])
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
      // Remove timezone identifier in brackets if present (e.g., [America/New_York])
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
        <img
          src={event.imageUrl}
          alt={event.title}
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

// Helper functions for date calculations
const getDateRange = (filter: string) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  switch (filter) {
    case 'Any Dates':
      return { startDate: today.toISOString().split('T')[0], endDate: null };
    
    case 'This Weekend': {
      const dayOfWeek = today.getDay();
      const daysUntilSaturday = (6 - dayOfWeek) % 7;
      const saturday = new Date(today);
      saturday.setDate(today.getDate() + daysUntilSaturday);
      const sunday = new Date(saturday);
      sunday.setDate(saturday.getDate() + 1);
      return { 
        startDate: saturday.toISOString().split('T')[0],
        endDate: sunday.toISOString().split('T')[0]
      };
    }
    
    case 'This Week': {
      const dayOfWeek = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - dayOfWeek);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return { 
        startDate: startOfWeek.toISOString().split('T')[0],
        endDate: endOfWeek.toISOString().split('T')[0]
      };
    }
    
    case 'This Month': {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return { 
        startDate: startOfMonth.toISOString().split('T')[0],
        endDate: endOfMonth.toISOString().split('T')[0]
      };
    }
    
    case 'Next 7 Days': {
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 7);
      return { 
        startDate: today.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      };
    }
    
    case 'Next 30 Days': {
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 30);
      return { 
        startDate: today.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      };
    }
    
    case 'Next 60 Days': {
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 60);
      return { 
        startDate: today.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      };
    }
    
    default:
      return { startDate: today.toISOString().split('T')[0], endDate: null };
  }
};

// Main TopPicks component
const TopPicks: React.FC<TopPicksProps> = ({ 
  topPicks: initialTopPicks, 
  location = "New York, NY",
  latitude = 40.76,
  longitude = -73.99
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  // Get active filter from URL or default to "Any Dates"
  const activeFilter = searchParams.get('filter') || 'Any Dates';
  const [events, setEvents] = useState<ProductionCard[]>(initialTopPicks);
  const [loading, setLoading] = useState(false);

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

  // Load events when filter changes
  useEffect(() => {
    if (activeFilter === 'explore') return;
    
    const loadEvents = async () => {
      setLoading(true);
      try {
        const { startDate, endDate } = getDateRange(activeFilter);
        const newEvents = await TopPicksAPI(startDate, endDate, latitude, longitude, null, 12);
        setEvents(newEvents);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [activeFilter, latitude, longitude]);

  const handleFilterChange = (filterValue: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (filterValue === 'explore') {
        params.delete('filter');
      } else {
        params.set('filter', filterValue);
      }
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  // Split the events - first 4 as large cards, rest as small cards
  const featuredEvents = events.slice(0, 4);
  const remainingEvents = events.slice(4);

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

      {/* Time Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {timeFilters.map((filter, index) => (
          <button
            key={index}
            onClick={() => handleFilterChange(filter.value)}
            disabled={isPending}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors disabled:opacity-50 ${
              activeFilter === filter.value
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
          </button>
        ))}
      </div>

      
      {/* Featured Events Grid - Large Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading || isPending ? (
          // Show skeletons while loading
          Array.from({ length: 4 }).map((_, index) => (
            <EventCardSkeleton key={`skeleton-large-${index}`} />
          ))
        ) : (
          featuredEvents.map((event) => (
            <LargeEventCard key={event.id} event={event} />
          ))
        )}
      </div>

      {/* Remaining Events - Small Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading || isPending ? (
          // Show skeletons while loading
          Array.from({ length: 8 }).map((_, index) => (
            <SmallEventCardSkeleton key={`skeleton-small-${index}`} />
          ))
        ) : (
          remainingEvents.map((event) => (
            <SmallEventCard key={event.id} event={event} />
          ))
        )}
      </div>
    </section>
  );
};

export default TopPicks; 