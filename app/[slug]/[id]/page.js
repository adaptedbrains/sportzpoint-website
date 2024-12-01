import Follow from '@/components/Follow';
import FeaturedEvents from '@/components/FeaturedEvents';
import LatestStories from '@/components/LatestStory';
// import WebStoriesJson from '@/components/WebstoeyJson';
import Newsletter from '@/components/Newsletter';
import { gettingMainBlogPost } from '@/lib/gettingMainBlogPost';
import BlogPost from '@/components/BlogPost';
import WebStoriesJson from '@/components/WebstoeyJson';
import { BlinkBlur } from 'react-loading-indicators';

const Page = async ({ params }) => {
    const {  id } = await params;
    const post = await gettingMainBlogPost(`${process.env.NEXT_PUBLIC_API_URL}/article/slug/${id}`);

    const renderMainContent = () => {
        if (!post || !post.article) {
            return (

                <div className="flex justify-center mt-20">
                    <BlinkBlur color="#32cd32" size="medium" />
                </div>

            );
        }

        switch (post.article.type) {
            case 'Web Story':
                return <div>
                    <WebStoriesJson post={post.article} /> 
                </div>;

            default:
                return (
                    <div>
                        {post.latestArticles.length !== 0 &&





                            [post.article, ...post.latestArticles].map((p, index) => (
                                <div className="blog-post" key={p.index || index} data-slug={p.slug}>

                                     <BlogPost postData={p} index={index} /> 
                                </div>
                            ))
                        }
                    </div>
                );
        }
    };

    return (
        <div className="w-full px-4 md:px-6 lg:px-8 xl:px-4 2xl:px-0 max-w-[1920px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
                <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
                    <div className="flex flex-col gap-4 sticky top-[64px]">
                        <FeaturedEvents />
                        <Follow />
                    </div>
                </aside>

                <div className="lg:col-span-7 xl:col-span-7 col-span-1">
                    {renderMainContent()}
                </div>

                <div className="lg:col-span-3 col-span-1">
                    <div className="sticky top-[64px] space-y-4">
                        <LatestStories />
                        <Newsletter />
                    </div>
                </div>
            </div>
        </div>
    );
};




export async function generateMetadata({ params }) {
    try {
        // Await the params object before accessing its properties
        const { slug, id } = await params;

        // Fetch post data based on the `id`
        const post = await gettingMainBlogPost(
            `${process.env.NEXT_PUBLIC_API_URL}/article/slug/${id}`
        );

        // Get the featured image URL - ensure it's an absolute URL
        const getAbsoluteImageUrl = (path) => {
            if (!path) return `${process.env.NEXT_PUBLIC_WEBSITE_URL}/default-og-image.jpg`;
            if (path.startsWith('http')) return path;
            return `https://dmpsza32x691.cloudfront.net/${path}`;
        };

        const featuredImage = getAbsoluteImageUrl(post.article?.featured_image || post.article?.cover_image);
        const description = post.article?.seo_desc || post.article?.excerpt || 'Read the latest sports news and updates on Sportzpoint';
        const title = post.article?.title || 'Sportzpoint - Latest Sports News & Updates';
        const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${slug}/${id}`;

        return {
            title: title,
            description: description,
            metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL),
            openGraph: {
                title: title,
                description: description,
                url: url,
                siteName: 'Sportzpoint',
                images: [
                    {
                        url: featuredImage,
                        width: 1200,
                        height: 630,
                        alt: title,
                    },
                ],
                locale: 'en_US',
                type: 'article',
                publishedTime: post.article?.published_at_datetime,
                authors: post.article?.author?.name,
                tags: post.article?.tags?.map(tag => tag.name),
            },
            twitter: {
                card: 'summary_large_image',
                title: title,
                description: description,
                images: [featuredImage],
                creator: '@sportzpoint',
                site: '@sportzpoint',
            },
            alternates: {
                canonical: url,
            },
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },
        };
    } catch (error) {
        console.error('Error fetching metadata:', error);
        const defaultTitle = 'Sportzpoint - Latest Sports News & Updates';
        const defaultDesc = 'Read the latest sports news and updates on Sportzpoint';
        const defaultImage = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/default-og-image.jpg';
        
        return {
            title: defaultTitle,
            description: defaultDesc,
            metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL),
            openGraph: {
                title: defaultTitle,
                description: defaultDesc,
                url: process.env.NEXT_PUBLIC_WEBSITE_URL,
                siteName: 'Sportzpoint',
                images: [
                    {
                        url: defaultImage,
                        width: 1200,
                        height: 630,
                        alt: 'Sportzpoint',
                    },
                ],
                locale: 'en_US',
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: defaultTitle,
                description: defaultDesc,
                images: [defaultImage],
                creator: '@sportzpoint',
                site: '@sportzpoint',
            },
            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-video-preview': -1,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },
        };
    }
}

export default Page;