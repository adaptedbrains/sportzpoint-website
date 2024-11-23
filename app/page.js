"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import usePostStore from "@/store/postStore";
import FeaturedEvents from "@/components/FeaturedEvents";
import LoginSignUp from "@/components/LoginSignUp";
import Follow from "@/components/Follow";
import ArticleListCard from "@/components/ArticleListCard";
import ArticleCard from "@/components/ArticleCard";
import ArticleGridCard from "@/components/ArticleGridCard";
import LatestStories from "@/components/LatestStory";

const Sidebar = () => (
    <div className="col-span-2  flex-col gap-4 sticky top-0 h-screen hidden lg:flex">
        {/* Sidebar is hidden on screens smaller than 'lg' */}
        <LoginSignUp />
        <FeaturedEvents />
        <Follow />
    </div>
);

const PaginationControls = ({ currentPage, setCurrentPage, totalPages, loading }) => {
    const pageButtons = useMemo(() => {
        if (!totalPages) return [];
        const buttons = [1];
        if (currentPage > 1) buttons.push(currentPage - 1);
        buttons.push(currentPage);
        if (currentPage < totalPages) buttons.push(currentPage + 1);
        if (currentPage !== totalPages) buttons.push(totalPages);
        return [...new Set(buttons)].sort((a, b) => a - b);
    }, [currentPage, totalPages]);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <button
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1 || loading}
            >
                Previous
            </button>
            {pageButtons.map((page) => (
                <button
                    key={page}
                    className={`px-4 py-2 rounded ${
                        page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                onClick={() => handlePageChange(totalPages ? Math.min(currentPage + 1, totalPages) : currentPage + 1)}
                disabled={currentPage === totalPages || loading}
            >
                Next
            </button>
        </div>
    );
};

const Page = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { posts, loading, fetchPosts, totalPages } = usePostStore();
    useEffect(() => {
        fetchPosts(`${process.env.NEXT_PUBLIC_API_URL}/article/publish?limit=20&page=${currentPage}`);
    }, [currentPage]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 px-4 lg:px-28 mt-7">
            {/* Sidebar hidden on small screens */}
            <Sidebar />
            <div className="col-span-1 lg:col-span-5">
                {posts?.[0] && <ArticleCard post={posts[0]} />}
                <div className="grid grid-cols-1 gap-3">
                    {posts?.slice(1, 11).map((article, index) => (
                        <ArticleListCard key={index} post={article} />
                    ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {posts?.slice(11, 20).map((article, index) => (
                        <ArticleGridCard key={index} post={article} />
                    ))}
                </div>
                <PaginationControls
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    loading={loading}
                />
            </div>
            <div className="col-span-1 lg:col-span-3 sticky top-20 h-screen overflow-y-auto">
                {/* Latest Stories hidden on small screens */}
                <LatestStories />
            </div>
        </div>
    );
};

export default Page;
