'use client';
import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';
import BlogPost from '@/components/BlogPost';
import LoginSignUp from '@/components/LoginSignUp';
import Follow from '@/components/Follow';
import FeaturedEvents from '@/components/FeaturedEvents';
import { BlinkBlur } from 'react-loading-indicators';
import LatestStories from "@/components/LatestStory";
import WebStoriesJson from '@/components/WebstoeyJson';

const BlogPage = () => {
    const pathname = usePathname();
    const id = pathname.split("/")[2]; // Extract the slug from the path

    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/slug/${id}`);
                    const data = await response.json();
                    setPost(data); // Assuming API returns a single post object
                } catch (error) {
                    console.error('Error fetching post:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchPost();
        }
    }, [id]);

    const renderMainContent = () => {
        if (!post || !post.article) return null;

        switch (post.article.type) {
            case "Web Story":
                return (
                    <WebStoriesJson post={post.article}/>
                );
            // case "Live Blog":
            //     return (
            //         <div>
            //             <h1 className="text-2xl font-bold">Live Blog</h1>
            //             <p>{post.article.content}</p>
            //         </div>
            //     );
            default:
                return (
                    <div>
                        <BlogPost postData={post.article} />
                        <div className='grid grid-cols-5 justify-between items-center mb-5'>
                            <div className='bg-green-800 h-[1px] col-span-2'></div>
                            <p className='border col-span-1 border-green-800 text-center px-2'>Next Article</p>
                            <div className='bg-green-800 h-[1px] col-span-2'></div>
                        </div>
                        {post.latestArticles.map((p, index) => (
                            <BlogPost postData={p} key={p._id || index} />
                        ))}
                    </div>
                );
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 px-4 lg:px-28 mt-7">
            {/* Sidebar - hidden on md and smaller screens */}
            <div className="hidden lg:flex lg:col-span-2 flex-col gap-4 sticky -top-40 h-[120vh] mb-4 lg:mb-0">
                <LoginSignUp />
                <FeaturedEvents />
                <Follow />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-5 col-span-1">
                {isLoading ? (
                    <div className='flex justify-center mt-20'>
                        <BlinkBlur color="#32cd32" size="medium" />
                    </div>
                ) : (
                    renderMainContent()
                )}
            </div>

            {/* Latest Stories - sticky on large screens, normal block on mobile */}
            <div className="hidden lg:block lg:col-span-3 sticky top-20 h-screen overflow-y-auto mb-4 lg:mb-0">
                <LatestStories />
            </div>
        </div>
    );
};

export default BlogPage;
