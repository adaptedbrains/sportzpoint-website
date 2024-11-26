'use client';

import React, { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import usePostStore from "@/store/postStore";
import FeaturedEvents from "@/components/FeaturedEvents";
import LoginSignUp from "@/components/LoginSignUp";
import Follow from "@/components/Follow";
import ArticleCard from "@/components/ArticleCard";
import ArticleGridCard from "@/components/ArticleGridCard";
import LatestStories from "@/components/LatestStory";
import WebStoriesList from "@/components/WebStoryList";
import SectionArticleCard from "@/components/SectionArticleCard";

const PaginationControls = ({ currentPage, setCurrentPage, totalPages, loading }) => {
    const pageButtons = useMemo(() => {
        const buttons = [1]; // Always show page 1
        if (currentPage > 1) buttons.push(currentPage - 1);
        buttons.push(currentPage);
        if (currentPage < totalPages) buttons.push(currentPage + 1);
        if (totalPages) buttons.push(totalPages);
        return [...new Set(buttons)].sort((a, b) => a - b);
    }, [currentPage, totalPages]);

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || loading}
            >
                Previous
            </button>
            {pageButtons.map((page) => (
                <button
                    key={page}
                    className={`px-4 py-2 rounded ${page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => (totalPages ? Math.min(prev + 1, totalPages) : prev + 1))}
                disabled={currentPage === totalPages || loading}
            >
                Next
            </button>
        </div>
    );
};

const Page = () => {
    const pathname = usePathname();
    const slug = pathname.split("/")[1];

    const [currentPage, setCurrentPage] = useState(1);
    const { posts, loading, fetchPosts, totalPages, fetchWebPosts, webstory } = usePostStore();

    const url = useMemo(() => {
        if (!slug) return null;
        if (slug === "live") {
            return `${process.env.NEXT_PUBLIC_API_URL}/articles/type/LiveBlog?limit=20&page=${currentPage}`;

        } else {

            return `${process.env.NEXT_PUBLIC_API_URL}/articles/category/${slug}?limit=20&page=${currentPage}`;
        }
    }, [slug, currentPage]);

    useEffect(() => {
        if (url) fetchPosts(url);
        if (posts.length !== 0) {

        }
        if (slug !== "live"){ fetchWebPosts(`${process.env.NEXT_PUBLIC_API_URL}/articles/category/${slug}/type/Web Story?limit=3&page=1`)
        }

    }, [url, fetchPosts]);




    return (
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-4 2xl:px-0 max-w-[1920px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
                {/* Left Sidebar */}
                <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
                    <div className="flex flex-col gap-4 sticky top-[64px]">
                        <FeaturedEvents />
                        <Follow />
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-6 xl:col-span-7 col-span-1">
                    {/* Featured Articles - First two posts */}
                    {posts?.length > 0 && (
                        <>
                            <SectionArticleCard post={posts[0]} />
                            <div className="mt-6">
                                <ArticleCard 
                                    mainPost={posts[1]} 
                                    secondaryPost={posts[2]} 
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                                {posts?.slice(3).map((article, index) => (
                                    <ArticleGridCard key={index} post={article} />
                                ))}
                            </div>
                        </>
                    )}
                    
                    {/* Web Stories if available */}
                    {webstory?.length > 0 && slug !== "live" && (
                        <div className="my-4">
                            <WebStoriesList webStories={webstory} />
                        </div>
                    )}

                    {/* Pagination */}
                    <PaginationControls
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                        loading={loading}
                    />
                </main>

                {/* Right Sidebar */}
                <aside className="lg:col-span-3 col-span-1">
                    <div className="sticky top-[64px] space-y-4">
                        <LatestStories />
                        <div className="lg:hidden">
                            <Follow />
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Page;
