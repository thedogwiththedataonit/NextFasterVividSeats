import TopPicksServer from "@/components/TopPicksServer"
import Header from "@/components/Header"
import { Banner } from "@/components/Banner"
import { Suspense } from "react"
import Image from "next/image"

// Type definitions based on VividSeats data structure
interface TopPick {
  id: number
  title: string
  image_url: string
  link: string
  external_image_path: string
}

interface TopEvent {
  id: number
  title: string
  image_url?: string
  link: string
  external_image_path: string
}

interface BlogArticle {
  id: number
  title: string
  category_name: string
  link: string
}

interface VividSeatsData {
  top_picks: TopPick[]
  top_sports: TopEvent[]
  top_concerts: TopEvent[]
  top_theater: TopEvent[]
  blog_article: BlogArticle[]
}

// Fallback data based on the actual VividSeats response
const fallbackData: VividSeatsData = {
  top_picks: [
    {
      id: 1,
      title: "Beyoncé",
      image_url: "https://a.vsstatic.com/mobile/app/concerts/beyonce-4.jpg",
      link: "/beyonce-tickets/performer/4987",
      external_image_path: ",w_600/f_auto/hero/event/concerts/4987-beyonce/beyonce-tickets-12.jpg"
    },
    {
      id: 17,
      title: "Kendrick Lamar",
      image_url: "https://a.vsstatic.com/mobile/app/concerts/kendrick-lamar-5.jpg",
      link: "/kendrick-lamar-tickets/performer/25626",
      external_image_path: ",w_600/f_auto/hero/event/concerts/25626-kendrick-lamar/kendrick-lamar-tickets-11.jpg"
    },
    {
      id: 18,
      title: "Stanley Cup Finals",
      image_url: "https://a.vsstatic.com/mobile/app/nhl/stanley-cup-finals-2.jpg",
      link: "/stanley-cup-finals-tickets--sports-nhl-hockey/performer/143164",
      external_image_path: ",w_600/f_auto/hero/event/sports/143164-nhl-stanley-cup-finals/nhl-stanley-cup-finals-big-tickets-2.jpg"
    },
    {
      id: 33,
      title: "NBA Finals",
      image_url: "https://a.vsstatic.com//mobile/app/nba/nba-finals.jpg",
      link: "/nba-finals-tickets--sports-nba-basketball/performer/2724",
      external_image_path: ",w_600/f_auto/g_center/hero/event/sports/171-nba-playoffs/nba-finals-big-tickets-3.jpg"
    }
  ],
  top_sports: [
    {
      id: 23,
      title: "WNBA",
      image_url: "https://a.vsstatic.com/mobile/app/category/wnba-2.jpg",
      link: "/sports/wnba",
      external_image_path: ",w_600/f_auto/hero/category/83-wnba/wnba-tickets-1.jpg"
    },
    {
      id: 20,
      title: "NBA",
      image_url: "https://a.vsstatic.com/mobile/app/category/nba-basketball-2.jpg",
      link: "/nba-basketball",
      external_image_path: ",w_600/f_auto/hero/category/3-nba-basketball/nba-basketball-big-tickets-2.jpg"
    },
    {
      id: 21,
      title: "NHL",
      link: "/nhl-hockey",
      external_image_path: ",w_600/f_auto/hero/category/4-nhl-hockey/nhl-big-tickets-3.jpg"
    },
    {
      id: 22,
      title: "MLB",
      image_url: "http://a.vsstatic.com/mobile/app/category/mlb-2.jpg",
      link: "/mlb-baseball",
      external_image_path: ",w_600/f_auto/hero/category/2-mlb-baseball/mlb-baseball-tickets-2.jpg"
    }
  ],
  top_concerts: [
    {
      id: 28,
      title: "Coldplay",
      image_url: "https://a.vsstatic.com/mobile/app/concerts/coldplay.jpg",
      link: "/coldplay-tickets/performer/1524",
      external_image_path: ",w_600/f_auto/hero/event/concerts/1524-coldplay/coldplay-tickets-6.jpg"
    },
    {
      id: 30,
      title: "Tyler the Creator",
      image_url: "https://a.vsstatic.com/mobile/app/concerts/tyler-the-creator-3.jpg",
      link: "/tyler-the-creator-tickets/performer/31701",
      external_image_path: ",w_600/f_auto/hero/event/concerts/31701-tyler-the-creator/tyler-the-creator-tickets-7.jpg"
    },
    {
      id: 34,
      title: "Sabrina Carpenter",
      image_url: "https://a.vsstatic.com/mobile/app/concerts/sabrina-carpenter-2.jpg",
      link: "/sabrina-carpenter-tickets/performer/42658",
      external_image_path: ",w_600/f_auto/hero/event/concerts/42658-sabrina-carpenter/sabrina-carpenter-tickets-8.jpg"
    },
    {
      id: 35,
      title: "AC/DC",
      image_url: "https://a.vsstatic.com/mobile/app/concerts/ac-dc-3.jp",
      link: "/acdc-tickets/performer/7",
      external_image_path: ",w_600/f_auto/hero/event/concerts/7-ac-dc/ac-dc-tickets-9.jpg"
    }
  ],
  top_theater: [
    {
      id: 24,
      title: "Shane Gillis",
      image_url: "https://a.vsstatic.com/mobile/app/category/comedy.jpg",
      link: "/shane-gillis-tickets--theater-comedy/performer/103286",
      external_image_path: ",w_600/f_auto/hero/event/comedy/103286-shane-gillis/shane-gillis-tickets-1.jpg"
    },
    {
      id: 25,
      title: "Sebastian Maniscalco",
      image_url: "https://a.vsstatic.com/mobile/app/theater/sebastian-maniscalco.jpg",
      link: "/sebastian-maniscalco-tickets--theater-comedy/performer/29424",
      external_image_path: ",w_600/f_auto/hero/event/comedy/29424-sebastian-maniscalco/sebastian-maniscalco-tickets-1.jpg"
    },
    {
      id: 26,
      title: "Hamilton",
      image_url: "https://a.vsstatic.com/mobile/app/theater/hamilton.jpg",
      link: "/hamilton-tickets--theater-musical/performer/40710",
      external_image_path: ",w_600/f_auto/hero/event/theater/40710-hamilton/hamilton-tickets-1.jpg"
    },
    {
      id: 27,
      title: "Nikki Glaser",
      image_url: "https://a.vsstatic.com/mobile/app/theater/nikki-glaser-2.jpg",
      link: "/nikki-glaser-tickets--theater-comedy/performer/35141",
      external_image_path: ",w_600/f_auto/hero/event/comedy/35141-nikki-glaser/nikki-glaser-tickets-4.jpg"
    }
  ],
  blog_article: [
    {
      id: 3,
      title: "NFL Schedule 2025: Schedule Release Date, Key Dates, Top Games, Opponents",
      category_name: "NFL",
      link: "/blog/nfl-schedule-release-date"
    },
    {
      id: 8,
      title: "Beyonce: The life story you may not know",
      category_name: "Pop",
      link: "/blog/beyonce-life-story-you-may-not-know"
    },
    {
      id: 2,
      title: "Mapping MLS Fandom: Which Counties Support Which Teams?",
      category_name: "MLS",
      link: "/blog/most-popular-mls-teams-by-state-county"
    }
  ]
}

// Static sections component that uses fallback data for true static generation
function StaticSections() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Sports Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Sports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fallbackData.top_sports.map((sport) => (
            <div key={sport.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg aspect-video mb-3">
                <Image
                  src={`https://media.vsstatic.com/image/upload/t_homepage_carousel_card_image_v2,f_auto,q_auto,dpr_1,w_312${sport.external_image_path}`}
                  alt={sport.title}
                  width={312}
                  height={176}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600">
                {sport.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Concerts Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Concerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fallbackData.top_concerts.map((concert) => (
            <div key={concert.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg aspect-video mb-3">
                <Image
                  src={`https://media.vsstatic.com/image/upload/t_homepage_carousel_card_image_v2,f_auto,q_auto,dpr_1,w_312${concert.external_image_path}`}
                  alt={concert.title}
                  width={312}
                  height={176}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600">
                {concert.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Theater Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Theater</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fallbackData.top_theater.map((show) => (
            <div key={show.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg aspect-video mb-3">
                <Image
                  src={`https://media.vsstatic.com/image/upload/t_homepage_carousel_card_image_v2,f_auto,q_auto,dpr_1,w_312${show.external_image_path}`}
                  alt={show.title}
                  width={312}
                  height={176}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600">
                {show.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Articles Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">More Event News</h2>
          <button className="text-purple-600 font-medium hover:text-purple-700 flex items-center">
            View All News
            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fallbackData.blog_article.map((article) => (
            <div key={article.id} className="bg-blue-50 rounded-lg p-6 hover:bg-blue-100 cursor-pointer transition-colors">
              <div className="text-sm font-medium text-blue-600 mb-2">
                {article.category_name}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 line-clamp-3">
                {article.title}
              </h3>
              <button className="text-blue-600 font-medium hover:text-blue-700">
                Read More →
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default async function Home({searchParams}: {searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
  
  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <Header />

      {/* Main Content */}
      <main>
        {/* Top Picks Section - Dynamic with Suspense */}
        <Suspense fallback={
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
                    className={`h-10 bg-gray-200 rounded-full ${filter.width}`}
                  ></div>
                ))}
              </div>

              {/* Featured Events Grid - Large Cards Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={`large-${index}`} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-3 bg-gray-200">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="h-4 bg-gray-300 rounded w-24"></div>
                            <div className="h-4 bg-gray-300 rounded w-20"></div>
                          </div>
                          <div className="h-6 bg-gray-300 rounded-full w-16"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Remaining Events - Small Cards Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={`small-${index}`} className="flex items-center space-x-4 p-4 rounded-lg animate-pulse">
                    <div className="w-20 h-24 rounded-lg rounded-r-none bg-gray-200 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-12 flex-shrink-0"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        }>
          <TopPicksServer searchParams={searchParams}/>
        </Suspense>

        {/* Static Sections - Pre-rendered at build time */}
        <StaticSections />
      </main>

      {/* Trust Section - Static */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-bold mb-4">100% Buyer Guarantee</h3>
              <p className="text-blue-100">
                Designed to give you peace of mind.
              </p>
              <button className="mt-4 text-white underline hover:text-blue-200">
                Learn more about our guarantee →
              </button>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Safe & secure transactions</h3>
              <p className="text-blue-100">
                Your private and personal information should remain private and personal.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Full-service customer care</h3>
              <p className="text-blue-100">
                You deserve hassle-free assistance from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Static */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Vivid Seats</h3>
              <p className="text-gray-400 text-sm">
                A full service national event ticket marketplace
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Sports</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">NFL</a></li>
                <li><a href="#" className="hover:text-white">NBA</a></li>
                <li><a href="#" className="hover:text-white">MLB</a></li>
                <li><a href="#" className="hover:text-white">NHL</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Concerts</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Pop</a></li>
                <li><a href="#" className="hover:text-white">Rock</a></li>
                <li><a href="#" className="hover:text-white">Country</a></li>
                <li><a href="#" className="hover:text-white">Hip-Hop</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Theater</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Broadway</a></li>
                <li><a href="#" className="hover:text-white">Comedy</a></li>
                <li><a href="#" className="hover:text-white">Family</a></li>
                <li><a href="#" className="hover:text-white">Musical</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>&copy; 2024 Vivid Seats LLC. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
