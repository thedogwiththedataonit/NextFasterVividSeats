This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# VividSeats.com Mock Application

A detailed reproduction of the VividSeats.com homepage built with Next.js, featuring real-time data fetching and parsing from the actual VividSeats website.

## Features

- **Real Data Fetching**: Scrapes the actual Vivid Seats homepage and extracts the `__NEXT_DATA__` JSON
- **Responsive Design**: Modern, mobile-first design using Tailwind CSS
- **Dynamic Content**: Displays real event data including:
  - Top Picks (Featured events)
  - Sports categories and events
  - Concert listings
  - Theater and comedy shows
  - Blog articles
- **Fallback System**: Graceful degradation with static data if live fetching fails
- **Performance Optimized**: Uses Next.js App Router and server-side API routes

## Architecture

### Data Flow

1. **Client Request**: Frontend requests data from `/api/vivid-seats`
2. **Server Fetching**: API route fetches HTML from `https://www.vividseats.com`
3. **Data Parsing**: Server extracts and parses the `__NEXT_DATA__` JSON
4. **Response**: Structured data returned to client with fallback handling

### Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── vivid-seats/
│   │       └── route.ts       # API endpoint for data fetching
│   ├── page.tsx               # Main homepage component
│   └── layout.tsx             # Root layout
└── components/                # (Future: Reusable components)
```

## Data Structure

The application parses and displays the following data from VividSeats:

### Top Picks
Featured events prominently displayed at the top:
- Beyoncé
- Kendrick Lamar  
- Stanley Cup Finals
- NBA Finals

### Sports Categories
- WNBA
- NBA
- NHL
- MLB

### Concerts
- Coldplay
- Tyler the Creator
- Sabrina Carpenter
- AC/DC

### Theater & Comedy
- Shane Gillis
- Sebastian Maniscalco
- Hamilton
- Nikki Glaser

### Blog Articles
- NFL Schedule articles
- Artist feature stories
- Sports analysis

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **View Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

4. **Test API Endpoint**
   ```bash
   curl http://localhost:3000/api/vivid-seats
   ```

## API Reference

### GET `/api/vivid-seats`

Returns structured VividSeats data.

**Response Format:**
```json
{
  "success": true,
  "data": {
    "top_picks": [...],
    "top_sports": [...],
    "top_concerts": [...],
    "top_theater": [...],
    "blog_article": [...]
  },
  "source": "live" | "fallback",
  "message": "Optional status message"
}
```

**Data Source:**
- `"live"`: Data successfully fetched from VividSeats.com
- `"fallback"`: Using cached/static data due to fetch error

## Technical Implementation

### Data Fetching Strategy

1. **Primary**: Live fetch from VividSeats.com with HTML parsing
2. **Secondary**: Fallback to embedded static data
3. **Error Handling**: Graceful degradation with user notification

### Parsing Logic

The application uses regex to extract the `__NEXT_DATA__` script tag:
```typescript
const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/)
```

### Image Optimization

Images are loaded from VividSeats CDN using their Cloudinary-based URLs:
```typescript
src={`https://media.vsstatic.com/image/upload${event.external_image_path}`}
```

## Design Features

- **Purple/Blue Gradient**: Matches VividSeats brand colors
- **Card-based Layout**: Clean, modern event cards with hover effects
- **Responsive Grid**: Adapts from 1 column (mobile) to 4 columns (desktop)
- **Loading States**: Spinner and skeleton states during data fetch
- **Error Handling**: User-friendly error messages and fallback content

## Browser Compatibility

- Modern browsers supporting ES2018+
- Mobile-first responsive design
- Touch-friendly interface

## Development Notes

- Uses Next.js 15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Server-side data fetching to avoid CORS issues
- Regex-based HTML parsing for data extraction

## Future Enhancements

- [ ] Add search functionality
- [ ] Implement event filtering
- [ ] Add user authentication mock
- [ ] Create individual event detail pages
- [ ] Add shopping cart simulation
- [ ] Implement real-time price updates

## License

This is a demonstration project for educational purposes. VividSeats is a trademark of Vivid Seats LLC.


---
Search
https://www.vividseats.com/hermes/api/v1/search-suggestions?query=test&includeIpAddress=false&radius=8045000


Using the vercel values, get the ip (have a default for nyc if working on it locally)
Use them to call top picks and under 100 picks in parallel
Once the output for those is parsed (artistIds), make a call to get the imageUrls


Get the top picks
https://www.vividseats.com/hermes/api/v1/productions?pageSize=12&includeIpAddress=true&radius=80450&startDate=2025-06-11&sortBy=RANK&excludeParking=true&distinct=true&latLong=40.76%3B-73.99
- similarProductionCount (+# more dates)

Any Dates (Default) - No endDate
This Weekend - weekend dates
This Week - week dates
This Month
Next 7 Days 
Next 30 Days
Next 60 Days

Get the picks Under $100 (6 cards on the homepage)
https://www.vividseats.com/hermes/api/v1/productions?pageSize=4&includeIpAddress=true&radius=80450&startDate=2025-06-11&endDate=2025-06-18&sortBy=RANK&excludeParking=true&distinct=true&minListingPriceCeiling=100
params:
- pageSize = 4
- includeIpAddress = true
- radius = 80450 
- startDate = 2025-06-11
- endDate = 2025-06-18
- sortBy = RANK


get the performers[0].id, create an array of them in a string, separated by ,
Get the image URLS
https://www.vividseats.com/hermes/api/v1/assets?resource=PERFORMER&resourceId=103531,133912,35413,99993,44701,125633,6404,8577,18040,2457,627,61742


https://media.vsstatic.com/image/upload/t_homepage_carousel_card_image_v2,f_auto,q_auto,dpr_1,w_312

External
/hero/event/concerts/627-oasis/oasis-tickets-10.jpg

THere is a MOBILEHEROIMAGE and External image (i'm guessing external is for laptops)

The top 6 cards have a skeleton on every reload for some reason (pretty expensive ngl)


Images
-https://media.vsstatic.com/image/upload/f_auto,q_auto/hero/homepage/loyalty-banner/2023/buyer-guarantee/xl-sub-banner.jpg


Show Card
