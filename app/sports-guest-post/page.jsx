"use client";

import React from 'react';
import Link from 'next/link';

export default function SportsGuestPost() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-8">Sports Guest Post</h1>
          
          <div className="space-y-8 text-gray-700">
            <p className="text-lg">
              Love to write Sports Guest Post for any prominent website? Then, you are at the right place. 
              SportzPoint allows and accepts Sports Guest Post from sports enthusiasts around the globe.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Write For Us?</h2>
              <p className="text-lg">
                Sportz Point is world&apos;s one of the rising sports websites. Writing as a guest author here 
                will give you a great reputation as a sportswriter. Moreover, your social and professional 
                image will reach their peak. Our reach around the globe will help you reach millions of 
                people around the web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Eligibility Of Acceptance Of Sports Guest Post
              </h2>
              <p className="mb-4">
                There are few eligibility criteria to be matched before we accept your guest post.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The article should be on anything but sport; any sport.</li>
                <li>The article must be more than 800+ words.</li>
                <li>The article should be unique and no plagiarism will be allowed.</li>
                <li>The title and article should have focused keywords.</li>
                <li>Only one link per article is allowed. The link must be related to the author or the article.</li>
                <li>
                  No copyright issues should be there when you use any image. Read this article to know about 
                  image copyright issues and uses. Credit must be given to the original creator incase it is 
                  a downloaded image.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                How To Write A Sports Guest Post?
              </h2>
              <p className="mb-4">
                Submitting a sports guest post at SportzPoint.com is as easy as it gets. When your article 
                has the previous requirements you can submit your guest post by following the next steps-
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Mail us at –{' '}
                  <a 
                    href="mailto:koushik@sportzpoint.com" 
                    className="text-[#39803E] hover:underline"
                  >
                    koushik@sportzpoint.com
                  </a>
                </li>
                <li>Write your article&apos;s title in the subject line.</li>
                <li>Write down the article exactly as you want to be posted on our site.</li>
                <li>At the end include the list of focused keywords</li>
                <li>Mention every image&apos;s alternate titles also.</li>
                <li>Insert your link.</li>
                <li>Insert your bio and a image (optional) for the author box area</li>
              </ul>
            </section>

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <p className="mb-4">
                That&apos;s it. You are ready to be featured on our site. We will get back to you via e-mail 
                within next 3-4 days.
              </p>
              <p className="mb-4">
                We will also share the link of your article. Moreover, we will share it with tons of social 
                media fans and e-mail subscribers also.
              </p>
              <p className="font-medium">
                Keep coming your writings.
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-6">Stay updated with our latest sports news and updates</p>
            
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#39803E]"
                />
                <button
                  type="submit"
                  className="bg-[#39803E] text-white px-6 py-2 rounded-md hover:bg-[#2d6230] transition-colors duration-200"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
