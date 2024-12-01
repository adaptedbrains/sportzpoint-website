"use client";
import { useState } from 'react';
import Newsletter from '@/components/Newsletter';

const AboutUs = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        
        <div className="space-y-8">
          <p className="text-lg">
            Sportz Point is world&rsquo;s top rising Sports website with every little facts, stories tutorials, book library of every sport around the globe.
          </p>

          <div>
            <h2 className="text-xl font-bold mb-2">Our Inspiration</h2>
            <p className="text-lg">Sports is Life</p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Our goals</h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="mr-3 text-lg">•</span>
                Best Sports facts from around the globe
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-lg">•</span>
                Make our facts more than stats
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-lg">•</span>
                Bring you the best sport stories with resources
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-lg">•</span>
                Make every sport more interesting
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-lg">•</span>
                Finally, be your all-in-one solution for every sport guide
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Our Features</h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="mr-3 text-lg">•</span>
                Every Sport around the globe
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-lg">•</span>
                Most Updated facts at the earliest
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-lg">•</span>
                Non-biased, free content
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-lg">•</span>
                24*7 Content
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-lg">•</span>
                Guest Posts from aorund the world
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Why we are different?</h2>
            <p className="text-lg">
              We are more than a Sports news or stats website. We bring you more than that. Facts filled with stories and stats. Stories with eomtion and resources. You will also have free sports tutorials or guides from the best of the professionals.
            </p>
          </div>

          {/* Newsletter Subscription */}
          <div className="mt-12">
            <Newsletter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
