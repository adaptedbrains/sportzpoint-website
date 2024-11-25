import { convertToIST } from "@/util/convertToIST";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaUserCircle, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { sanitizeContent } from "@/utils/sanitize";
import Script from "next/script";
import { useWebSocket } from "@/utils/websocket"

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
 
  const [liveBlog, setLiveBlog] = useState([]);

  useEffect(() => {
    if (postData.type === "LiveBlog") {
      setLiveBlog(postData.live_blog_updates || []);
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

      {postData.type === "LiveBlog" && liveBlog.length > 0 && (
        <>
          <div className="grid grid-cols-5 justify-between items-center mb-5">
            <div className="bg-green-800 h-[1px] col-span-2"></div>
            <p className="border col-span-1 border-green-800 text-center px-2">
              Live Updates
            </p>
            <div className="bg-green-800 h-[1px] col-span-2"></div>
          </div>

          <div className="rounded   flex flex-col gap-7">
            {liveBlog.map((live, i) => (
              <div key={i} className="shadow-md bg-gray-100 p-4 flex flex-col">
                <h1 className="font-semibold text-xl">{live.title}</h1>
                <article
                  className="blog-content"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeContent("LiveBlog", live.content),
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}

     
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