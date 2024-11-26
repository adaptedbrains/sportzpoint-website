import React from "react";
import ArticleCard from "@/components/ArticleCard";
import ArticleGridCard from "@/components/ArticleGridCard";
import { latestPost } from "@/lib/latestPost";
import { latestPublishPostByCategories } from "@/lib/latestPublishPost";
import LastestPostForRootPage from "@/components/LastestPostForRootPage";
import WebStoriesList from "@/components/WebStoryList";
import FeaturedEvents from "@/components/FeaturedEvents";
import Follow from "@/components/Follow";

const Page = async () => {
  // Fetch data for both latest posts and olympics
  const latestPostsData = latestPost(`${process.env.NEXT_PUBLIC_API_URL}/article/publish?limit=20&page=1`);
  // process.env.NEXT_PUBLIC_API_URL}/articles/category/${slug}?limit=20&page=${currentPage}
  const olympicsLatest = latestPublishPostByCategories(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/olympics?limit=5&page=1`);

  const cricketLatest = latestPublishPostByCategories(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/cricket?limit=5&page=1`);
  const footballLatest = latestPublishPostByCategories(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/football?limit=5&page=1`);
  const tennisLatest = latestPublishPostByCategories(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/tennis?limit=5&page=1`);
  const hockeyLatest = latestPublishPostByCategories(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/hockey?limit=5&page=1`);
  const badmintonLatest = latestPublishPostByCategories(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/badminton?limit=5&page=1`);

  const women_in_sportsLatest = latestPublishPostByCategories(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/women-in-sports?limit=5&page=1`);
  const eSportsLatest = latestPublishPostByCategories(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/e-sports?limit=5&page=1`);
  const athleticsLatest = latestPublishPostByCategories(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/athletics?limit=5&page=1`);

  const webStoryLatest = latestPublishPostByCategories(`${process.env.NEXT_PUBLIC_API_URL}/articles/type/Web Story?limit=3&page=1`);

  const [latestUploadPost, olympic, cricket, football, tennis, hockey, badminton, women_in_sports, e_sports, athletics,webStory] = await Promise.all([
    latestPostsData,
    olympicsLatest,
    cricketLatest,
    footballLatest,
    tennisLatest,
    hockeyLatest,
    badmintonLatest,
    women_in_sportsLatest,
    eSportsLatest,
    athleticsLatest,
    webStoryLatest
  ]);

  return (
    <div className="container mx-auto px-2 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Sidebar - Reduced width */}
        <aside className="hidden lg:block lg:col-span-2">
          <div className="sticky top-[84px] space-y-4">
            <FeaturedEvents />
            <Follow />
          </div>
        </aside>

        {/* Main content - Increased width */}
        <div className="lg:col-span-7 col-span-1">
          {/* Featured Latest Posts */}
          {latestUploadPost?.length > 0 && (
            <ArticleCard 
              mainPost={latestUploadPost[0]} 
              secondaryPost={latestUploadPost[1]} 
            />
          )}

          {/* Grid Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {latestUploadPost?.slice(2).map((article, index) => (
              <ArticleGridCard key={index} post={article} />
            ))}
          </div>

          {/* Olympics Section */}
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl text-green-700 font-semibold">Olympics</h1>
              <div className="w-20 h-[2px] bg-green-800 mt-1"></div>
            </div>
            <div className="space-y-4">
              {olympic?.length > 0 && (
                <ArticleCard 
                  mainPost={olympic[0]} 
                  secondaryPost={olympic[1]} 
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {olympic?.slice(2).map((article, index) => (
                  <ArticleGridCard key={index} post={article} />
                ))}
              </div>
            </div>
          </div>

          {/* Web Stories */}
          {webStory.length !== 0 && <WebStoriesList webStories={webStory} />}

          {/* Cricket Section */}
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl text-green-700 font-semibold">Cricket</h1>
              <div className="w-20 h-[2px] bg-green-800 mt-1"></div>
            </div>
            <div className="space-y-4">
              {cricket?.length > 0 && (
                <ArticleCard 
                  mainPost={cricket[0]} 
                  secondaryPost={cricket[1]} 
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {cricket?.slice(2).map((article, index) => (
                  <ArticleGridCard key={index} post={article} />
                ))}
              </div>
            </div>
          </div>

          {/* Football Section */}
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl text-green-700 font-semibold">Football</h1>
              <div className="w-20 h-[2px] bg-green-800 mt-1"></div>
            </div>
            <div className="space-y-4">
              {football?.length > 0 && (
                <ArticleCard 
                  mainPost={football[0]} 
                  secondaryPost={football[1]} 
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {football?.slice(2).map((article, index) => (
                  <ArticleGridCard key={index} post={article} />
                ))}
              </div>
            </div>
          </div>

          {/* Tennis Section */}
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl text-green-700 font-semibold">Tennis</h1>
              <div className="w-20 h-[2px] bg-green-800 mt-1"></div>
            </div>
            <div className="space-y-4">
              {tennis?.length > 0 && (
                <ArticleCard 
                  mainPost={tennis[0]} 
                  secondaryPost={tennis[1]} 
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {tennis?.slice(2).map((article, index) => (
                  <ArticleGridCard key={index} post={article} />
                ))}
              </div>
            </div>
          </div>

          {/* Hockey Section */}
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl text-green-700 font-semibold">Hockey</h1>
              <div className="w-20 h-[2px] bg-green-800 mt-1"></div>
            </div>
            <div className="space-y-4">
              {hockey?.length > 0 && (
                <ArticleCard 
                  mainPost={hockey[0]} 
                  secondaryPost={hockey[1]} 
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {hockey?.slice(2).map((article, index) => (
                  <ArticleGridCard key={index} post={article} />
                ))}
              </div>
            </div>
          </div>

          {/* Badminton Section */}
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl text-green-700 font-semibold">Badminton</h1>
              <div className="w-20 h-[2px] bg-green-800 mt-1"></div>
            </div>
            <div className="space-y-4">
              {badminton?.length > 0 && (
                <ArticleCard 
                  mainPost={badminton[0]} 
                  secondaryPost={badminton[1]} 
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {badminton?.slice(2).map((article, index) => (
                  <ArticleGridCard key={index} post={article} />
                ))}
              </div>
            </div>
          </div>

          {/* Women In Sports Section */}
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl text-green-700 font-semibold">Women In Sports</h1>
              <div className="w-20 h-[2px] bg-green-800 mt-1"></div>
            </div>
            <div className="space-y-4">
              {women_in_sports?.length > 0 && (
                <ArticleCard 
                  mainPost={women_in_sports[0]} 
                  secondaryPost={women_in_sports[1]} 
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {women_in_sports?.slice(2).map((article, index) => (
                  <ArticleGridCard key={index} post={article} />
                ))}
              </div>
            </div>
          </div>

          {/* E-Sports Section */}
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl text-green-700 font-semibold">E-Sports</h1>
              <div className="w-20 h-[2px] bg-green-800 mt-1"></div>
            </div>
            <div className="space-y-4">
              {e_sports?.length > 0 && (
                <ArticleCard 
                  mainPost={e_sports[0]} 
                  secondaryPost={e_sports[1]} 
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {e_sports?.slice(2).map((article, index) => (
                  <ArticleGridCard key={index} post={article} />
                ))}
              </div>
            </div>
          </div>

          {/* Athletics Section */}
          <div className="mt-8">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl text-green-700 font-semibold">Athletics</h1>
              <div className="w-20 h-[2px] bg-green-800 mt-1"></div>
            </div>
            <div className="space-y-4">
              {athletics?.length > 0 && (
                <ArticleCard 
                  mainPost={athletics[0]} 
                  secondaryPost={athletics[1]} 
                />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {athletics?.slice(2).map((article, index) => (
                  <ArticleGridCard key={index} post={article} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-3 col-span-1">
          {/* Latest Stories - scrollable */}
          <div className="mb-6">
            <LastestPostForRootPage />
          </div>
          
          {/* Newsletter - fixed position */}
          <div className="sticky top-20 bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-col items-start">
              <h2 className="text-xl font-bold text-green-800 mb-2">Subscribe Newsletter</h2>
              <div className="w-10 h-[1px] bg-green-800 mb-4"></div>
              
              <p className="text-sm text-gray-600 mb-4">
                Get the latest sports updates and news delivered directly to your inbox.
              </p>
              
              <form className="w-full space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-sm"
                  required
                />
                
                <button
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
