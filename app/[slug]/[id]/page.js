'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import BlogPost from '@/components/BlogPost';
import LoginSignUp from '@/components/LoginSignUp';
import Follow from '@/components/Follow';
import FeaturedEvents from '@/components/FeaturedEvents';
import { BlinkBlur } from 'react-loading-indicators';
import LatestStories from '@/components/LatestStory';
import WebStoriesJson from '@/components/WebstoeyJson';

const BlogPage = () => {
    const pathname = usePathname();
    const id = pathname.split('/')[2];
    const category = pathname.split('/')[1] || null;
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentSlug, setCurrentSlug] = useState(""); // State for the current slug

    useEffect(() => {
        // Fetch post data only if id changes (initial load)
        if (id && currentSlug !== id) {
            const fetchPost = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/slug/${id}`);
                    const data = await response.json();
                    setPost(data);
                } catch (error) {
                    console.error('Error fetching post:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchPost();
            setCurrentSlug(id); // Set currentSlug to prevent re-fetching the same post
        }
    }, [id, currentSlug]); // Ensure this runs when id or currentSlug changes

    // Handle scroll event to update the slug of the div that occupies the most visible height
    const handleScroll = () => {
        const posts = document.querySelectorAll('.blog-post');
        let maxVisibleHeight = 0;
        let largestVisibleSlug = id;

        posts.forEach((postElement) => {
            const rect = postElement.getBoundingClientRect();

            // Calculate visible height of the element
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

            // If the visible height is greater than the current max, update the slug
            if (visibleHeight > maxVisibleHeight) {
                maxVisibleHeight = visibleHeight;
                largestVisibleSlug = postElement.getAttribute('data-slug') || '';
            }
        });

        // Only update the URL if it is different from the current slug
        const newUrl = category ? `/${category}/${largestVisibleSlug}` : `/${largestVisibleSlug}`;
        if (largestVisibleSlug !== currentSlug && window.location.pathname !== newUrl) {
            window.history.replaceState(null, '', newUrl); // Update the browser URL
            setCurrentSlug(largestVisibleSlug); // Update the slug without triggering re-fetch
        }
    };

    useEffect(() => {
        // Listen for scroll events
        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Dependency on currentSlug

    const renderMainContent = () => {
        if (!post || !post.article) return null;

        switch (post.article.type) {
            case 'Web Story':
                return <WebStoriesJson post={post.article} />;

            default:
                return (
                    <div>
                        {/* <div className="blog-post" data-slug={id}>
                            <BlogPost postData={post.article} />
                        </div> */}
                        {/* <div className="grid grid-cols-5 justify-between items-center mb-5">
                            <div className="bg-green-800 h-[1px] col-span-2"></div>
                            <p className="border col-span-1 border-green-800 text-center px-2">Next Article</p>
                            <div className="bg-green-800 h-[1px] col-span-2"></div>
                        </div> */}

                        {post.latestArticles.length !== 0 &&
                            [post.article, ...post.latestArticles].map((p, index) => (
                                <div className="blog-post" key={p.index || index} data-slug={p.slug}  >
                                    <BlogPost postData={p} index={index} />
                                </div>
                            ))
                        }
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
            <div className="lg:col-span-6 col-span-1">
                {isLoading ? (
                    <div className="flex justify-center mt-20">
                        <BlinkBlur color="#32cd32" size="medium" />
                    </div>
                ) : (
                    renderMainContent()
                )}
            </div>

            {/* Latest Stories - sticky on large screens, normal block on mobile */}
            <div className="lg:col-span-2 col-span-1 sticky lg:top-20 top-0 h-auto  overflow-y-auto mb-4 lg:mb-0">
                <LatestStories />
            </div>
        </div>
    );
};

export default BlogPage;
