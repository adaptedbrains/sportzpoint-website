'use client'
import { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';
import BlogPost from '@/components/BlogPost';
import LatestStories from '@/components/LatestStory';
import LoginSignUp from '@/components/LoginSignUp';
import Follow from '@/components/Follow';
import FeaturedEvents from '@/components/FeaturedEvents';

const BlogPage = () => {
    const pathname = usePathname();
    const id = pathname.split("/")[2]; // Extract the slug from the path


    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data from the API based on the ID
    useEffect(() => {
        if (id) {  // Ensure ID is available before fetching data
            const fetchPost = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/article/${id}`);
                    const data = await response.json();
                    setPost(data);  // Assuming API returns a single post object
                } catch (error) {
                    console.error('Error fetching post:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchPost();
        }
    }, [id]); // Fetch when the `id` changes
    if (isLoading) return <div>Loading...</div>;
    console.log(post.latestArticles);

    if (!post) return <div>Post not found</div>;

    return (

        <div className="grid grid-cols-10 gap-4 px-28 mt-7">
            {/* First Div */}
            <div className="col-span-2 flex flex-col gap-4 sticky -top-40 h-[120vh] ">
                <LoginSignUp />
                <FeaturedEvents />
                <Follow />
            </div>

            {/* Middle Div */}
            <div className="col-span-5 ">
                <BlogPost postData={post.article} />
                <div className='grid grid-cols-5 justify-between items-center mb-5' >
                    <div className='bg-green-800 h-[1px] col-span-2'>

                    </div>
                    <p className='border col-span-1 border-green-800 text-center  px-2'>Next Article</p>
                    <div className='bg-green-800 h-[1px] col-span-2'>

                    </div>

                </div>
                    {post.latestArticles.map((p, index) => (
                        <BlogPost postData={p} key={p._id || index} />
                    ))}

            </div>



            {/* Last Div */}
            <div className="col-span-3 sticky top-20 h-screen overflow-y-auto">
                <LatestStories stories={post.latestArticles.slice(0, 3)} />
            </div>
        </div>

    );
};

export default BlogPage;
