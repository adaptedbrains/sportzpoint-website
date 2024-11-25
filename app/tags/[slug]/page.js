"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import usePostStore from "@/store/postStore";
import FeaturedEvents from "@/components/FeaturedEvents";
import LoginSignUp from "@/components/LoginSignUp";
import Follow from "@/components/Follow";
import ArticleListCard from "@/components/ArticleListCard";
import ArticleCard from "@/components/ArticleCard";
import { dummyStory } from "@/util/headerScore";
import ArticleGridCard from "@/components/ArticleGridCard";
import LatestStories from "@/components/LatestStory";

const Page = () => {
    const pathname = usePathname(); // Get the current route path
    const slug = pathname.split("/")[2]; // Extract the slug from the path

    const [currentPage, setCurrentPage] = useState(1); // State to manage the current page
    const { posts, loading, error, fetchPosts, totalPages } = usePostStore();

    // Fetch posts when slug or page changes
    useEffect(() => {
        if (slug) {
            setCurrentPage(1); // Reset page to 1 when slug changes
            const url = `${process.env.NEXT_PUBLIC_API_URL}/articles/tags/${slug}?limit=20&page=1`;
            fetchPosts(url);
        }
    }, [slug, fetchPosts]);
    
    useEffect(() => {
        if (slug) {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/articles/tags/${slug}?limit=20&page=${currentPage}`;
            fetchPosts(url);
        }
    }, [slug, currentPage, fetchPosts]);

    // Generate the page buttons for pagination
    const generatePageButtons = () => {
        const buttons = [];

        // Always show page 1
        buttons.push(1);

        // Show previous page if it's not 1
        if (currentPage > 1) {
            buttons.push(currentPage - 1);
        }

        // Always show the current page
        buttons.push(currentPage);

        // Show next page if it's not the last page
        if (currentPage < totalPages) {
            buttons.push(currentPage + 1);
        }

        // Always show the last page
        if (totalPages) {
            buttons.push(totalPages);
        }

        // Ensure buttons are unique and sorted
        return [...new Set(buttons)].sort((a, b) => a - b);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-10 gap-4 px-4 md:px-28 mt-7">
                {/* First Div (Sidebar) */}
                <div className="hidden md:flex col-span-2 flex-col gap-4 sticky -top-40 h-[120vh]">
                    <LoginSignUp />
                    <FeaturedEvents />
                    <Follow />
                </div>

                {/* Middle Div (Main Content) */}
                <div className="col-span-10  lg:col-span-6">
                    <ArticleCard post={posts && posts[0]} />
                    <div className="grid grid-cols-1 gap-3">
                        {posts.slice(1, 11).map((article, index) => (
                            <ArticleListCard key={index} post={article} />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {posts && posts.slice(11, 20).map((article, index) => (
                            <ArticleGridCard key={index} post={article} />
                        ))}
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-6">
                        <button
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        {/* Render page buttons dynamically */}
                        {generatePageButtons().map((page) => (
                            <button
                                key={page}
                                className={`px-4 py-2 rounded ${page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                            onClick={() =>
                                setCurrentPage((prev) => (totalPages ? Math.min(prev + 1, totalPages) : prev + 1))
                            }
                            disabled={currentPage === totalPages || loading}
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* Last Div (Latest Stories Sidebar) */}
                <div className="lg:col-span-2 col-span-1 sticky lg:top-20 top-0 h-auto  overflow-y-auto mb-4 lg:mb-0">
                <LatestStories />
                </div>
            </div>
        </>
    );
};

export default Page;
