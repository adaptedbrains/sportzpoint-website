import { convertToIST } from "@/util/convertToIST";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaUserCircle, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { sanitizeContent } from "@/utils/sanitize";
import Script from "next/script";
import { useWebSocket } from "@/utils/websocket";
import usePostStore from "@/store/postStore";

const socialMedia = [
  {
    icon: <FaWhatsapp size={20} />,
    href: "https://api.whatsapp.com/send?text=https://sportzpoint.com/cricket/exclusive-felt-like-my-debut-bengal-pacer-ishan-porel-now-wants-to-enjoy-his-cricket-after-a-solid-comeback-to-first-class-cricket-7375215",
  },
  {
    icon: <FaFacebook size={20} />,
    href: "http://www.facebook.com/sharer/sharer.php?u=https://sportzpoint.com/cricket/exclusive-felt-like-my-debut-bengal-pacer-ishan-porel-now-wants-to-enjoy-his-cricket-after-a-solid-comeback-to-first-class-cricket-7375215",
  },
  {
    icon: <FaXTwitter size={20} />,
    href: "http://www.twitter.com/intent/tweet?url=https://sportzpoint.com/cricket/exclusive-felt-like-my-debut-bengal-pacer-ishan-porel-now-wants-to-enjoy-his-cricket-after-a-solid-comeback-to-first-class-cricket-7375215",
  },
  {
    icon: <FaLinkedin size={20} />,
    href: "https://www.linkedin.com/sharing/share-offsite/?url=https://sportzpoint.com/cricket/exclusive-felt-like-my-debut-bengal-pacer-ishan-porel-now-wants-to-enjoy-his-cricket-after-a-solid-comeback-to-first-class-cricket-7375215",
  },
];

const BlogPost = ({ postData, index }) => {
  const { liveBlogs, liveBlogFunction } = usePostStore();
  const { messages } = useWebSocket();

  useEffect(() => {
    if (postData.type === "LiveBlog") {
      liveBlogFunction(
        (postData &&
          postData.live_blog_updates &&
          postData.live_blog_updates) ||
          []
      );
    }

    const loadInstagramEmbeds = () => {
      const existingScript = document.getElementById("instagram-embed-script");
      if (existingScript) existingScript.remove();

      const script = document.createElement("script");
      script.id = "instagram-embed-script";
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      script.onload = () => window.instgrm?.Embeds.process();
      document.body.appendChild(script);
    };

    loadInstagramEmbeds();
    const interval = setInterval(() => window.instgrm?.Embeds.process(), 1000);

    return () => {
      clearInterval(interval);
      const script = document.getElementById("instagram-embed-script");
      if (script) script.remove();
    };
  }, [postData.content, postData.type]);

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="flex gap-2">
          {postData.isLive && <div className="text-xl text-red-500  tracking-wider "> <span className="font-bold">L</span>I<span className="font-bold">V</span>E    </div>}
          {postData.categories.map((category, index) => (
            <Link
              href={`/${category.slug}`}
              key={index}
              className="bg-green-200 rounded text-green-800 font-semibold px-4 py-1"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <h2 className="text-3xl font-semibold text-start my-4">
          {postData.title}
        </h2>
        {postData.summary && (
          <p className="font-semibold text-start my-4 text-zinc-600">
            {postData.summary}
          </p>
        )}

        <div className="flex justify-between items-center flex-wrap">
          <div className="flex items-center gap-2">
            <FaUserCircle size={35} color="gray" />
            <div className="flex flex-col">
              <h3 className="font-semibold">{postData.author?.name}</h3>
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
                priority
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
              src={`https://sportzpoint-media.s3.ap-south-1.amazonaws.com/${postData.banner_image}`}
              alt={postData.title || "Banner Image"}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              priority
            />
          </div>
        )}

        <article
          className="blog-content"
          dangerouslySetInnerHTML={{
            __html: sanitizeContent("Article", postData.content),
          }}
        />

        <Script
          src="//www.instagram.com/embed.js"
          strategy="afterInteractive"
          onLoad={() => window.instgrm?.Embeds.process()}
        />

        <div className="rounded flex flex-col gap-7 mt-8">
          {postData.type === "LiveBlog" && liveBlogs && liveBlogs.length > 0 && (
            <>
              <div className="grid grid-cols-5 justify-between items-center mb-5">
                <div className="bg-green-800 h-[1px] col-span-2"></div>
                <p className="border col-span-1 border-green-800 text-center px-2 font-semibold">
                  Live Updates
                </p>
                <div className="bg-green-800 h-[1px] col-span-2"></div>
              </div>

              {liveBlogs.map((live, i) => (
                <div 
                  key={i} 
                  className="shadow-md bg-gray-50 p-6 flex flex-col gap-3 rounded-lg border-l-4 border-green-800"
                >
                  <p className="text-gray-600 italic text-sm">
                    {convertToIST(live.created_at)}
                  </p>

                  <h2 className="font-bold text-xl text-gray-800">
                    {live.title}
                  </h2>

                  <div className="prose max-w-none">
                    <article
                      className="blog-content text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeContent("LiveBlog", live.content),
                      }}
                    />
                  </div>

                  {live.images && live.images.length > 0 && (
                    <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2">
                      {live.images.map((image, index) => (
                        <div key={index} className="relative h-[200px] rounded-lg overflow-hidden">
                          <Image
                            src={`https://sportzpoint-media.s3.ap-south-1.amazonaws.com/${image}`}
                            alt={`Update image ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {index === 0 && (
        <div className="grid grid-cols-5 justify-between items-center mb-5">
          <div className="bg-green-800 h-[1px] col-span-2"></div>
          <p className="border col-span-1 border-green-800 text-center px-2">
            Next Article
          </p>
          <div className="bg-green-800 h-[1px] col-span-2"></div>
        </div>
      )}
    </>
  );
};

export default BlogPost;
