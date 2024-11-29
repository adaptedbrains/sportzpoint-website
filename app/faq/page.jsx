"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={onClick}
      >
        <h3 className="text-lg font-semibold pr-8">{question}</h3>
        <svg
          className={`w-6 h-6 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`mt-2 text-gray-600 transition-all duration-200 ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = [
    {
      question: "WHICH SPORT DOES SPORTZPOINT.COM COVER?",
      answer: (
        <p>
          SportzPoint.com covers nearly every sports around the globe. From Football to Cricket, 
          from Basketball to Golf; you just name it. We have everything covered for you. Visit our{' '}
          <Link href="/about-us" className="text-[#39803E] hover:underline">
            about page
          </Link>{' '}
          for more information.
        </p>
      )
    },
    {
      question: "HOW TO GET EVERY UPDATES FROM SPORTZPOINT.COM?",
      answer: (
        <p>
          Simply subscribe to our newsletter and we will send our every updates from us directly 
          to your inbox. Additionally follow us on our social media platforms for all of our content.
        </p>
      )
    },
    {
      question: "HOW CAN I WRITE A GUEST POST FOR SPORTZPOINT.COM",
      answer: (
        <p>
          You can write guest post for us by simply writing at{' '}
          <a href="mailto:guestpost@sportzpoint.com" className="text-[#39803E] hover:underline">
            guestpost@sportzpoint.com
          </a>
          <br /><br />
          Visit our{' '}
          <Link href="/sports-guest-post" className="text-[#39803E] hover:underline">
            Guest Post Page
          </Link>{' '}
          for every details.
        </p>
      )
    },
    {
      question: "WHAT IS SPORTZ POINT BOOK STORE?",
      answer: (
        <p>
          Sportz Point Book Store is our exclusive sports book store available to our visitors.
          <br /><br />
          You can buy any sports book from our store. Also, you can sell your books also. Visit our book store for more.
        </p>
      )
    },
    {
      question: "IS SPORTZPOINT.COM HIRING?",
      answer: (
        <p>
          We hire according to our demands and needs. Check our{' '}
          <Link href="/work-with-us" className="text-[#39803E] hover:underline">
            Work With Us
          </Link>{' '}
          page regularly for information regarding the hiring process.
        </p>
      )
    },
    {
      question: "HOW CAN WE ADVERTISE MY PRODUCT/SERVICE ON SPORTZPOINT.COM?",
      answer: (
        <p>
          SportzPoint.com accepts advertisement only if it is non-adult content and not any spammy products. 
          We review your service and products too. Mail us at{' '}
          <a href="mailto:mail@sportzpoint.com" className="text-[#39803E] hover:underline">
            mail@sportzpoint.com
          </a>{' '}
          for details. Visit our{' '}
          <Link href="/advertise" className="text-[#39803E] hover:underline">
            advertise with us
          </Link>{' '}
          page.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
          
          <div className="space-y-2">
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12">
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
