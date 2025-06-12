import { TopPicks } from "@/utils/top-picks";
import { headers } from "next/headers";
import TopPicksServerContent from "./TopPicksServerContent";

interface TopPicksServerProps {
  location?: string;
  timeFilter?: string;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Helper function to calculate date ranges (moved from client-side)
function getDateRange(filter: string) {
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
}

export default async function TopPicksServer({ 
  searchParams
}: TopPicksServerProps) {
  const resolvedSearchParams = await searchParams
  const timeFilter = typeof resolvedSearchParams.filter === 'string' ? resolvedSearchParams.filter : 'explore'

  // Get location data from headers
  const headerList = await headers();
  const lat = parseFloat(headerList.get("x-vercel-ip-latitude") || "40.76");
  const lon = parseFloat(headerList.get("x-vercel-ip-longitude") || "-73.99");
  const city = headerList.get("x-vercel-ip-city") || "New York"
  const state = headerList.get("x-vercel-ip-state") || headerList.get("x-vercel-ip-country") || "NY"
  //make sure city and space replace  %20 with a space
  const location = `${city.replace("%20", " ")}, ${state.replace("%20", " ")}`
  

  // Handle "explore" filter as "Any Dates" for data fetching
  const effectiveFilter = timeFilter === "explore" ? "Any Dates" : timeFilter;
  
  // Calculate date range based on the effective time filter
  const { startDate, endDate } = getDateRange(effectiveFilter);
  
  const topPicks = await TopPicks(startDate, endDate, lat, lon, null, 12);

  return (
    <TopPicksServerContent 
      topPicks={topPicks}
      location={location}
      activeFilter={timeFilter}
    />
  );
} 