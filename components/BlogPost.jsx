// components/BlogPost.js
import { convertToIST } from "@/util/convertToIST";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUserCircle, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import IframeComponent from "./IframeComponent";

const socialMedia = [
  {
    icon: <FaWhatsapp size={20} />,
    href: "https://api.whatsapp.com/send?text=https://sportzpoint.com/cricket/exclusive-felt-like-my-debut-bengal-pacer-ishan-porel-now-wants-to-enjoy-his-cricket-after-a-solid-comeback-to-first-class-cricket-7375215",
  },
  {
    icon: <FaFacebook size={20} />,
    href: "http://www.facebook.com/sharer/sharer.php?u=https://sportzpoint.com/cricket/exclusive-felt-like-my-debut-bengal-pacer-ishan-porel-now-wants-to-enjoy-his-cricket-after-a-solid-comeback-to-first-class-cricket-7375215&t=Exclusive | &quot;Felt like my debut:&quot; Bengal pacer Ishan Porel now wants to enjoy his cricket after a solid comeback to first-class cricket",
  },
  {
    icon: <FaXTwitter size={20} />,
    href: "http://www.twitter.com/intent/tweet?url=https://sportzpoint.com/cricket/exclusive-felt-like-my-debut-bengal-pacer-ishan-porel-now-wants-to-enjoy-his-cricket-after-a-solid-comeback-to-first-class-cricket-7375215&text=Exclusive%20%7C%20%22Felt%20like%20my%20debut%3A%22%20Bengal%20pacer%20Ishan%20Porel%20now%20wants%20to%20enjoy%20his%20cricket%20after%20a%20solid%20comeback%20to%20first-class%20cricket",
  },
  {
    icon: <FaLinkedin size={20} />,
    href: "https://www.linkedin.com/sharing/share-offsite/?url=https://sportzpoint.com/cricket/exclusive-felt-like-my-debut-bengal-pacer-ishan-porel-now-wants-to-enjoy-his-cricket-after-a-solid-comeback-to-first-class-cricket-7375215&title=Exclusive | &quot;Felt like my debut:&quot; Bengal pacer Ishan Porel now wants to enjoy his cricket after a solid comeback to first-class cricket",
  },
];

const BlogPost = ({ postData }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <Link
        href={`/${postData.categories[0].slug}`}
        className="bg-green-200 rounded text-green-800 font-semibold px-4 py-1"
      >
        {postData.categories[0].name}
      </Link>
      <h2 className="text-3xl font-semibold text-start my-4">
        {postData.title}
      </h2>
      <p className="font-semibold text-start my-4 text-zinc-600">
        {postData.summary && postData.summary}
      </p>

      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center gap-2">
          <FaUserCircle size={35} color="gray" />
          <div className="flex flex-col">
            <h3 className="font-semibold">
              {postData.author && postData.author.name}
            </h3>
            <p className="text-zinc-500 text-xs font-semibold">
              {postData.published_at_datetime &&
                convertToIST(postData.published_at_datetime)}
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          <Link
            href="https://news.google.com/publications/CAAqBwgKMKDuqAswkvnAAw?ceid=IN:en&amp;oc=3"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="follow us google news"
            className="mx-2 flex border border-blue-800 gap-1 px-3 py-1 rounded-full text-xs font-semibold text-blue-800"
          >
            <Image
              src="/icon/google_news.png"
              alt="google icon"
              width={15}
              height={15}
            />
            Follow Us
          </Link>
          {socialMedia.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="mx-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>

      {postData.banner_image && (
        <div className="w-full h-[340px] relative my-6">
          <Image
            src={`https://img-cdn.thepublive.com/fit-in/1280x720/filters:format(webp)/${postData.banner_image}`}
            alt={postData.title || "Banner Image"}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
          />
        </div>
      )}

      {/* <div
        className="post-description text-lg text-gray-800 overflow-hidden"
        dangerouslySetInnerHTML={{ __html: postData.content }}
        
      /> */}
      <IframeComponent content={postData.content} />
    </div>
  );
};

export default BlogPost;
