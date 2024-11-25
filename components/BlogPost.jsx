import { convertToIST } from "@/util/convertToIST";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { FaUserCircle, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { sanitizeContent } from "@/utils/sanitize";
import Script from "next/script";

const socialMedia = [
  { icon: <FaWhatsapp size={20} />, href: "https://api.whatsapp.com/send?text=YOUR_LINK" },
  { icon: <FaFacebook size={20} />, href: "http://www.facebook.com/sharer/sharer.php?u=YOUR_LINK" },
  { icon: <FaXTwitter size={20} />, href: "http://www.twitter.com/intent/tweet?url=YOUR_LINK" },
  { icon: <FaLinkedin size={20} />, href: "https://www.linkedin.com/sharing/share-offsite/?url=YOUR_LINK" },
];

const BlogPost = ({ postData, index }) => {
  const [liveBlog, setLiveBlog] = useState([]);
  const twitterScriptLoaded = useRef(false);
  const wsRef = useRef(null); // Reference to WebSocket

  useEffect(() => {
    if (postData.type === "LiveBlog" && postData.liveBlog && index === 0) {
      const wsUrl = `${process.env.NEXT_PUBLIC_API_URL}/article/slug/${postData.slug}`;
      console.log(`Attempting to connect to WebSocket at ${wsUrl}`);
      
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connection established");
      };

      ws.onmessage = (message) => {
        console.log("WebSocket message received:", message.data);
        try {
          const newUpdate = JSON.parse(message.data);
          setLiveBlog((prev) => [newUpdate, ...prev]); // Add new updates
        } catch (err) {
          console.error("Error parsing WebSocket message:", err);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = (event) => {
        if (event.wasClean) {
          console.log(`WebSocket connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
          console.warn("WebSocket connection died unexpectedly");
        }
      };

      return () => {
        if (wsRef.current) {
          console.log("Closing WebSocket connection");
          wsRef.current.close(); // Cleanup WebSocket on unmount
        }
      };
    }
  }, [postData.liveBlog, postData.type, postData.slug, index]);

  useEffect(() => {
    const loadTwitterWidgets = () => {
      const existingScript = document.getElementById('twitter-widget-script');
      if (existingScript) {
        existingScript.remove();
        console.log("Removed existing Twitter widget script");
      }
      const script = document.createElement('script');
      script.id = 'twitter-widget-script';
      script.src = 'https://platform.twitter.com/widgets.js';
      script.charset = 'utf-8';
      script.async = true;

      script.onload = () => {
        if (window.twttr) {
          window.twttr.widgets.load();
          console.log("Twitter widgets loaded");
        }
      };

      script.onerror = (err) => {
        console.error("Failed to load Twitter widgets script:", err);
      };

      document.body.appendChild(script);
      console.log("Added Twitter widget script");
    };

    const loadInstagramEmbeds = () => {
      const existingScript = document.getElementById('instagram-embed-script');
      if (existingScript) {
        existingScript.remove();
        console.log("Removed existing Instagram embed script");
      }

      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = '//www.instagram.com/embed.js';
      script.async = true;

      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
          console.log("Instagram embeds processed");
        }
      };

      script.onerror = (err) => {
        console.error("Failed to load Instagram embed script:", err);
      };

      document.body.appendChild(script);
      console.log("Added Instagram embed script");
    };

    loadTwitterWidgets();
    loadInstagramEmbeds();

    const interval = setInterval(() => {
      if (window.twttr) {
        window.twttr.widgets.load();
        console.log("Reloaded Twitter widgets");
      }
      if (window.instgrm) {
        window.instgrm.Embeds.process();
        console.log("Reloaded Instagram embeds");
      }
    }, 2000);

    return () => {
      clearInterval(interval);
      const twitterScript = document.getElementById('twitter-widget-script');
      const instagramScript = document.getElementById('instagram-embed-script');
      if (twitterScript) {
        twitterScript.remove();
        console.log("Removed Twitter widget script on cleanup");
      }
      if (instagramScript) {
        instagramScript.remove();
        console.log("Removed Instagram embed script on cleanup");
      }
    };
  }, [postData.content, postData.type]);

  return (
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

      <h2 className="text-3xl font-semibold text-start my-4">{postData.title}</h2>
      {postData.summary && <p className="font-semibold text-start my-4 text-zinc-600">{postData.summary}</p>}

      <div className="flex justify-between items-center flex-wrap">
        <div className="flex items-center gap-2">
          <FaUserCircle size={35} color="gray" />
          <div className="flex flex-col">
            <h3 className="font-semibold">{postData.author?.name}</h3>
            <p className="text-zinc-500 text-xs font-semibold">
              {postData.published_at_datetime && convertToIST(postData.published_at_datetime)}
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
            <Image src="/icon/google_news.png" alt="google icon" width={15} height={15} priority />
            Follow Us
          </Link>
          {socialMedia.map((link, index) => (
            <Link key={index} href={link.href} className="mx-2" target="_blank" rel="noopener noreferrer">
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
        dangerouslySetInnerHTML={{ __html: sanitizeContent("Article", postData.content) }}
      />

      <Script src="//www.instagram.com/embed.js" strategy="afterInteractive" onLoad={() => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
          console.log("Instagram embeds processed via Script onLoad");
        }
      }} />

      {postData.type === "LiveBlog" && liveBlog.length > 0 && (
        <>
          <div className="grid grid-cols-5 justify-between items-center mb-5">
            <div className="bg-green-800 h-[1px] col-span-2"></div>
            <p className="border col-span-1 border-green-800 text-center px-2">Live Updates</p>
            <div className="bg-green-800 h-[1px] col-span-2"></div>
          </div>

          <div className="rounded flex flex-col gap-7">
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

      {index === 0 && (
        <div className="grid grid-cols-5 justify-between items-center mb-5">
          <div className="bg-green-800 h-[1px] col-span-2"></div>
          <p className="border col-span-1 border-green-800 text-center px-2">Next Article</p>
          <div className="bg-green-800 h-[1px] col-span-2"></div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
