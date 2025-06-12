export interface ProductionCard {
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
    category: {
      id: number;
      name: string;
      organicUrl: string;
      subCategories: Array<{
        id: number;
        name: string;
        organicUrl: string;
      }>;
    };
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