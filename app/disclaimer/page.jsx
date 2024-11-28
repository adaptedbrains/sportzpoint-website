"use client";

import React from 'react';
import Link from 'next/link';

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
          
          <div className="space-y-6 text-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900">Disclaimers For SportzPoint</h2>
            
            <p>
              All the information on this website – <Link href="/" className="text-[#39803E] hover:underline">https://sportzpoint.com/</Link> – 
              is published in good faith and for general information purpose only. SportzPoint does not make any warranties about the completeness, 
              reliability and accuracy of this information. Any action you take upon the information you find on this website (SportzPoint), 
              is strictly at your own risk. SportzPoint will not be liable for any losses and/or damages in connection with the use of our website.
            </p>

            <p>
              Some of the books, services that we sell or advertise are affiliate products. While we try to give right information, but we do not 
              take any guarantee on any of the services or product. Buy them on our own knowledge and risk. Moreover, we might earn some commission 
              if you buy any affiliate service or product via our website.
            </p>

            <p>
              From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality 
              links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do 
              not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur 
              before we have the opportunity to remove a link which may have gone &apos;bad&apos;.
            </p>

            <p>
              Please be also aware that when you leave our website, other sites may have different privacy policies and terms that are beyond our control. 
              Please be sure to check the Privacy Policies of these sites as well as their &quot;Terms of Service&quot; before engaging in any business 
              or uploading any information.
            </p>
          </div>

          {/* Newsletter Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
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
    </div>
  );
}
