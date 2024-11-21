'use client';
import ArticleCard from '@/components/ArticleCard';
import ArticleListCard from '@/components/ArticleListCard';
import React from 'react';
import { dummyStory, CricketArticles } from '../util/headerScore';
import Link from 'next/link';
import LoginSignUp from '@/components/LoginSignUp';
import FeaturedEvents from '@/components/FeaturedEvents';
import Follow from '@/components/Follow';
import LatestStories from '@/components/LatestStory';
import Image from 'next/image';

const Page = () => {
  return (
    <div className="grid grid-cols-10 gap-4 px-28 mt-7">
      {/* First Div */}
      <div className="col-span-2 flex flex-col gap-4 sticky -top-40 h-[120vh] ">
        <LoginSignUp />
        <FeaturedEvents />
        <Follow />
      </div>

      {/* Middle Div */}
      <div className="col-span-5">
        <ArticleCard />
        <div className="grid grid-cols-1 gap-3">
          {CricketArticles.map((article, index) => (
            <ArticleListCard key={index} {...article} />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 mt-7 bg-black p-3">
          {dummyStory &&
            dummyStory.map((web, i) => {
              return (
                <div key={i} className="relative">
                  <Link href={`/webStory`} className="block">
                    <div className="relative">
                      <Image
                        src={web.pages[0].image}
                        alt={web.title}
                        width={200}
                        height={70}
                      />
                      {/* Black gradient overlay */}
                      <div className="absolute inset-0 bg-black opacity-50"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h4 className="text-white font-semibold">{web.title}</h4>
                        <p className="text-white">{web.description}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>

      {/* Last Div */}
      <div className="col-span-3 sticky top-20 h-screen overflow-y-auto">
        <LatestStories />
      </div>
    </div>
  );
};

export default Page;
