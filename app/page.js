import React from "react";
import FeaturedEvents from "@/components/FeaturedEvents";
// import LoginSignUp from "@/components/LoginSignUp";
import Follow from "@/components/Follow";
import ArticleListCard from "@/components/ArticleListCard";
import ArticleCard from "@/components/ArticleCard";
import ArticleGridCard from "@/components/ArticleGridCard";
// import LatestStories from "@/components/LatestStory";
import { latestPost } from "@/lib/latestPost";
import { olympics } from "@/lib/olympics"; // Assuming you have a separate olympics API function
// import LatestStory from "@/components/LatestStory";


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
  const latestPostsData = latestPost();
  // process.env.NEXT_PUBLIC_API_URL}/articles/category/${slug}?limit=20&page=${currentPage}
  const olympicsLatest = olympics(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/olympics?limit=5&page=1`);
  const cricketLatest = olympics(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/cricket?limit=5&page=1`);
  const footballLatest = olympics(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/football?limit=5&page=1`);
  const tennisLatest = olympics(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/tennis?limit=5&page=1`);
  const hockeyLatest = olympics(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/hockey?limit=5&page=1`);
  const women_in_sportsLatest = olympics(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/women-in-sports?limit=5&page=1`);
  const eSportsLatest = olympics(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/e-sports?limit=5&page=1`);
  const athleticsLatest = olympics(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/athletics?limit=5&page=1`);
  // const transfer_newsLatest = olympics(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/transfer_news?limit=5&page=1`);
  // mmmmm
  // Wait for both promises to resolve
  const [latestUploadPost, olympic, cricket, football, tennis, hockey, badminton, women_in_sports, e_sports, athletics] = await Promise.all([
    latestPostsData,
    olympicsLatest,
    cricketLatest,
    footballLatest,
    tennisLatest,
    hockeyLatest,
    women_in_sportsLatest,
    eSportsLatest,
    athleticsLatest,
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 px-4 lg:px-28 mt-7">
      {/* Sidebar hidden on small screens */}
      <Sidebar />
      <div className="col-span-1 lg:col-span-5">
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

            <h1 className="text-3xl text-green-700 font-semibold">badminton
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

      <div className="col-span-1 lg:col-span-3 sticky top-20 h-screen overflow-y-auto hidden lg:block">

      </div>
    </div>
  );
};

export default Page;
