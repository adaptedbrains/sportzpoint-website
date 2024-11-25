import React from "react";
import FeaturedEvents from "@/components/FeaturedEvents";
// import LoginSignUp from "@/components/LoginSignUp";
import Follow from "@/components/Follow";
import ArticleListCard from "@/components/ArticleListCard";
import ArticleCard from "@/components/ArticleCard";
import ArticleGridCard from "@/components/ArticleGridCard";
// import LatestStories from "@/components/LatestStory";
import { latestPost } from "@/lib/latestPost";
import { latestPublishPostByCategories } from "@/lib/latestPublishPost";
import LastestPostForRootPage from "@/components/LastestPostForRootPage";
import WebStory from "@/components/WebStory";
import WebStoriesList from "@/components/WebStoryList";
// import LatestPostCardList from "@/components/LatestPostCard";


const Sidebar = () => (
  <div className="col-span-2 flex-col gap-4 sticky top-0 h-screen hidden lg:flex">
    {/* Sidebar is hidden on screens smaller than 'lg' */}
    {/* <LoginSignUp /> */}
    <FeaturedEvents />
    <Follow />
  </div>
);

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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-4 lg:px-16 mt-7">
      {/* Sidebar */}
      <div className="col-span-2 flex-col gap-4 sticky top-0 h-screen hidden lg:flex">
        <FeaturedEvents />
        <Follow />
      </div>

      {/* Main content */}
      <div className="col-span-1 lg:col-span-6">
        {latestUploadPost?.[0] && <ArticleCard post={latestUploadPost[0]} />}
        <div className="grid grid-cols-1 gap-3">
          {latestUploadPost?.slice(1, 11).map((article, index) => (
            <ArticleListCard key={index} post={article} />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {latestUploadPost?.slice(11, 20).map((article, index) => (
            <ArticleGridCard key={index} post={article} />
          ))}
        </div>

        <div className="olympic ">
          <div className="flex items-center gap-4 my-7">

            <h1 className="text-3xl text-green-700 font-semibold">Olympics
            </h1>
            <div className="w-20 h-[2px] bg-green-800 mt-1">

            </div>
          </div>

          <div className="flex flex-col gap-5">
            {olympic && <ArticleCard post={olympic[0]} />}

            {olympic && olympic.slice(1, 3).map((article, index) => {
              return <ArticleListCard key={index} post={article} />
            })
            }

            <div className="grid grid-cols-2 gap-3">


              {olympic && olympic.slice(3, 5).map((article, index) => {
                return <ArticleGridCard key={index} post={article} />
              })
              }
            </div>


          </div>

        </div>






        <div className="olympic ">
          <div className="flex items-center gap-4 my-7">

            <h1 className="text-3xl text-green-700 font-semibold">Cricket
            </h1>
            <div className="w-20 h-[2px] bg-green-800 mt-1">

            </div>
          </div>

          <div className="flex flex-col gap-5">
            {cricket && <ArticleCard post={cricket[0]} />}

            {cricket && cricket.slice(1, 3).map((article, index) => {
              return <ArticleListCard key={index} post={article} />
            })
            }

            <div className="grid grid-cols-2 gap-3">


              {cricket && cricket.slice(3, 5).map((article, index) => {
                return <ArticleGridCard key={index} post={article} />
              })
              }
            </div>


          </div>

        </div>



       {webStory.length!==0 && <WebStoriesList webStories={webStory} />}




        <div className="olympic ">
          <div className="flex items-center gap-4 my-7">

            <h1 className="text-3xl text-green-700 font-semibold">Football
            </h1>
            <div className="w-20 h-[2px] bg-green-800 mt-1">

            </div>
          </div>

          <div className="flex flex-col gap-5">
            {football && <ArticleCard post={football[0]} />}

            {football && football.slice(1, 3).map((article, index) => {
              return <ArticleListCard key={index} post={article} />
            })
            }

            <div className="grid grid-cols-2 gap-3">


              {football && football.slice(3, 5).map((article, index) => {
                return <ArticleGridCard key={index} post={article} />
              })
              }
            </div>


          </div>

        </div>




        <div className="olympic ">
          <div className="flex items-center gap-4 my-7">

            <h1 className="text-3xl text-green-700 font-semibold">Tennis
            </h1>
            <div className="w-20 h-[2px] bg-green-800 mt-1">

            </div>
          </div>

          <div className="flex flex-col gap-5">
            {tennis && <ArticleCard post={tennis[0]} />}

            {tennis && tennis.slice(1, 3).map((article, index) => {
              return <ArticleListCard key={index} post={article} />
            })
            }

            <div className="grid grid-cols-2 gap-3">


              {tennis && tennis.slice(3, 5).map((article, index) => {
                return <ArticleGridCard key={index} post={article} />
              })
              }
            </div>


          </div>

        </div>



        <div className="olympic ">
          <div className="flex items-center gap-4 my-7">

            <h1 className="text-3xl text-green-700 font-semibold">Hockey
            </h1>
            <div className="w-20 h-[2px] bg-green-800 mt-1">

            </div>
          </div>

          <div className="flex flex-col gap-5">
            {hockey && <ArticleCard post={hockey[0]} />}

            {hockey && hockey.slice(1, 3).map((article, index) => {
              return <ArticleListCard key={index} post={article} />
            })
            }

            <div className="grid grid-cols-2 gap-3">


              {hockey && hockey.slice(3, 5).map((article, index) => {
                return <ArticleGridCard key={index} post={article} />
              })
              }
            </div>


          </div>

        </div>



        <div className="olympic ">
          <div className="flex items-center gap-4 my-7">

            <h1 className="text-3xl text-green-700 font-semibold">Badminton
            </h1>
            <div className="w-20 h-[2px] bg-green-800 mt-1">

            </div>
          </div>

          <div className="flex flex-col gap-5">
            {badminton && <ArticleCard post={badminton[0]} />}

            {badminton && badminton.slice(1, 3).map((article, index) => {
              return <ArticleListCard key={index} post={article} />
            })
            }

            <div className="grid grid-cols-2 gap-3">


              {badminton && badminton.slice(3, 5).map((article, index) => {
                return <ArticleGridCard key={index} post={article} />
              })
              }
            </div>


          </div>

        </div>






        <div className="olympic ">
          <div className="flex items-center gap-4 my-7">

            <h1 className="text-3xl text-green-700 font-semibold">Women In Sports
            </h1>
            <div className="w-20 h-[2px] bg-green-800 mt-1">

            </div>
          </div>

          <div className="flex flex-col gap-5">
            {women_in_sports && <ArticleCard post={women_in_sports[0]} />}

            {women_in_sports && women_in_sports.slice(1, 3).map((article, index) => {
              return <ArticleListCard key={index} post={article} />
            })
            }

            <div className="grid grid-cols-2 gap-3">


              {women_in_sports && women_in_sports.slice(3, 5).map((article, index) => {
                return <ArticleGridCard key={index} post={article} />
              })
              }
            </div>


          </div>

        </div>









        <div className="olympic ">
          <div className="flex items-center gap-4 my-7">

            <h1 className="text-3xl text-green-700 font-semibold">E-Sports
            </h1>
            <div className="w-20 h-[2px] bg-green-800 mt-1">

            </div>
          </div>

          <div className="flex flex-col gap-5">
            {e_sports && <ArticleCard post={e_sports[0]} />}

            {e_sports && e_sports.slice(1, 3).map((article, index) => {
              return <ArticleListCard key={index} post={article} />
            })
            }

            <div className="grid grid-cols-2 gap-3">


              {e_sports && e_sports.slice(3, 5).map((article, index) => {
                return <ArticleGridCard key={index} post={article} />
              })
              }
            </div>


          </div>

        </div>






        <div className="olympic ">
          <div className="flex items-center gap-4 my-7">

            <h1 className="text-3xl text-green-700 font-semibold">Athletics
            </h1>
            <div className="w-20 h-[2px] bg-green-800 mt-1">

            </div>
          </div>

          <div className="flex flex-col gap-5">
            {athletics && <ArticleCard post={athletics[0]} />}

            {athletics && athletics.slice(1, 3).map((article, index) => {
              return <ArticleListCard key={index} post={article} />
            })
            }

            <div className="grid grid-cols-2 gap-3">


              {athletics && athletics.slice(3, 5).map((article, index) => {
                return <ArticleGridCard key={index} post={article} />
              })
              }
            </div>


          </div>

        </div>











      </div>

      {/* Right sidebar with Latest stories and Newsletter */}
      <div className="lg:col-span-4 col-span-1 pr-0">
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
  );
};

export default Page;
