import { unstable_cache } from 'next/cache';
import { CACHE_CONFIG, CACHE_TAGS } from './cache-management';
import { ProductionCard } from '@/types/events';

// TypeScript interfaces for the API response
interface SubCategory {
    id: number;
    name: string;
    organicUrl: string;
}

interface Category {
    id: number;
    name: string;
    organicUrl: string;
    subCategories: SubCategory[];
}

interface Performer {
    id: number;
    name: string;
    category: Category;
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
}

interface Venue {
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
}

interface Production {
    id: number;
    localDate: string;
    utcDate: string;
    name: string;
    venue: Venue;
    minPrice: number;
    maxPrice: number;
    avgPrice: number;
    medianPrice: number;
    minAipPrice: number;
    maxAipPrice: number;
    showAip: boolean;
    listingCount: number;
    ticketCount: number;
    categoryId: number;
    subCategoryId: number;
    dateTbd: boolean;
    timeTbd: boolean;
    ifNecessary: boolean;
    organicUrl: string;
    webPath: string;
    onsaleDate: string;
    presale1Date?: string;
    distance: number;
    hidden: boolean;
    exclusiveWsUserId: number;
    primaryIntegrated: boolean;
    similarProductionCount: number;
    staticMapUrl: string;
    performers: Performer[];
    localPrices: Record<string, unknown> | null;
}

interface I18n {
    from: string;
    to: string;
    rate: number;
    applyCurrencyConversion: boolean;
}

interface TopPicksResponse {
    page: number;
    total: number;
    numberOfPages: number;
    items: Production[];
    i18n: I18n;
}



// Performer Assets API interfaces
interface AssetImage {
    dataModelName: string;
    path: string;
    size: string;
}

interface RelatedResource {
    id: number;
    type: string;
    images: AssetImage[];
}

interface PerformerAsset {
    id: number;
    type: string;
    images: AssetImage[];
    relatedResources: RelatedResource[];
}

interface PerformerAssetsResponse {
    page: number;
    total: number;
    numberOfPages: number;
    items: PerformerAsset[];
}

// Create a cached version of the core TopPicks logic
const getCachedTopPicks = unstable_cache(
    async (
        startDate: string,
        endDate: string | null,
        latitude: number,
        longitude: number,
        minListingPriceCeiling: number | null,
        items: number
    ): Promise<ProductionCard[]> => {
        //https://www.vividseats.com/hermes/api/v1/productions?pageSize=12&includeIpAddress=true&radius=80450&startDate=2025-06-11&sortBy=RANK&excludeParking=true&distinct=true&latLong=40.76%3B-73.99

        const url = `https://www.vividseats.com/hermes/api/v1/productions?pageSize=${items}&includeIpAddress=true&radius=80450&startDate=${startDate}${endDate ? `&endDate=${endDate}` : ""}&sortBy=RANK&excludeParking=true&distinct=true&latLong=${latitude}%3B${longitude}${minListingPriceCeiling ? `&minListingPriceCeiling=${minListingPriceCeiling}` : ""}`
        
        const response = await fetch(url, {
            next: { 
                revalidate: CACHE_CONFIG.PRODUCTIONS_DURATION // Cache individual fetch for 5 minutes
            }
        })
        const data: TopPicksResponse = await response.json()

        //Create an array of each item.performers[0].id
        const performerIds = data.items.map((item) => item.performers[0].id)
        //https://www.vividseats.com/hermes/api/v1/assets?resource=PERFORMER&resourceId=103531,133912,35413,99993,44701,125633,6404,8577,18040,2457,627,61742
        const performerAssets = await fetch(`https://www.vividseats.com/hermes/api/v1/assets?resource=PERFORMER&resourceId=${performerIds.join(",")}`, {
            next: { 
                revalidate: CACHE_CONFIG.PERFORMER_ASSETS_DURATION // Cache performer assets for 30 minutes (they change less frequently)
            }
        })
        const performerData: PerformerAssetsResponse = await performerAssets.json()
        
        //create the productionCard array and add the imageUrl as the external image path from the performerAssets
        const productionCards: ProductionCard[] = data.items.map((item) => {
            const performerAsset = performerData.items.find((asset) => asset.id === item.performers[0].id)
            //get the path for the images where dataModelName: 'EXTERNAL'
            const externalImage = performerAsset?.images.find((image) => image.dataModelName === "EXTERNAL")

            return {
                id: item.id,
                imageUrl: "https://media.vsstatic.com/image/upload/t_homepage_carousel_card_image_v2,f_auto,q_auto,dpr_1,w_312/" + externalImage?.path || "",
                title: item.name,
                webPath: item.webPath,
                venue: item.venue,
                performers: item.performers,
                date: item.localDate,
                time: item.timeTbd ? "TBD" : item.localDate,
                similarProductionCount: item.similarProductionCount
            }
        })
        return productionCards
    },
    [CACHE_TAGS.TOP_PICKS], // Cache key prefix
    {
        revalidate: CACHE_CONFIG.TOP_PICKS_DURATION, // Cache the entire function result for 10 minutes
        tags: [CACHE_TAGS.TOP_PICKS] // Tags for cache invalidation
    }
);

export async function TopPicks(
    startDate: string,
    endDate: string | null,
    latitude: number,
    longitude: number,
    minListingPriceCeiling: number | null,
    items: number
): Promise<ProductionCard[]> {
    return getCachedTopPicks(startDate, endDate, latitude, longitude, minListingPriceCeiling, items);
}