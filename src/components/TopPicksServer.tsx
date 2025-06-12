import { TopPicks } from "@/utils/top-picks";
import TopPicksComponent from "./TopPicks";

interface TopPicksServerProps {
  latitude: number;
  longitude: number;
  location?: string;
}

export default async function TopPicksServer({ 
  latitude, 
  longitude, 
  location = "New York, NY" 
}: TopPicksServerProps) {
  // Fetch initial data with "Any Dates" filter (no end date)
  const today = new Date();
  const startDate = today.toISOString().split('T')[0];
  
  const initialTopPicks = await TopPicks(startDate, null, latitude, longitude, null, 12);

  return (
    <TopPicksComponent 
      topPicks={initialTopPicks}
      location={location}
      latitude={latitude}
      longitude={longitude}
    />
  );
} 