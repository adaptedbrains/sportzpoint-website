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
        const { slug, id } = await params;
        const post = await gettingMainBlogPost(
            `${process.env.NEXT_PUBLIC_API_URL}/article/slug/${id}`
        );

        const getAbsoluteImageUrl = (path) => {
            if (!path) return `${process.env.NEXT_PUBLIC_WEBSITE_URL}/default-og-image.jpg`;
            if (path.startsWith('http')) return path;
            const timestamp = new Date().getTime();
            return `https://dmpsza32x691.cloudfront.net/${path}?v=${timestamp}`;
        };

        const featuredImage = getAbsoluteImageUrl(post.article?.featured_image || post.article?.banner_image);
        try {
            await fetch(featuredImage, { 
                method: 'HEAD',
                cache: 'force-cache'
            });
        } catch (error) {
            console.error('Error pre-fetching image:', error);
        }

        const title = post.article?.title || 'Sportzpoint - Latest Sports News & Updates';
        const description = post.article?.seo_desc || post.article?.excerpt || 'Read the latest sports news and updates on Sportzpoint';
        const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${slug}/${id}`;
        const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://sportzpoint.com';

        // Twitter requires these specific dimensions for summary_large_image
        const twitterImageDimensions = {
            width: 1200,
            height: 600
        };

        return {
            title,
            description,
            metadataBase: new URL(baseUrl),
            openGraph: {
                title,
                description,
                url,
                siteName: 'Sportzpoint',
                images: [
                    {
                        url: featuredImage,
                        width: 1200,
                        height: 630,
                        alt: title,
                        type: 'image/jpeg',
                    }
                ],
                locale: 'en_US',
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                site: '@sportz_point',  // Correct Twitter handle
                creator: '@sportz_point', // Correct Twitter handle
                title: title.substring(0, 70), // Twitter title limit
                description: description.substring(0, 200), // Twitter description limit
                images: [{
                    url: featuredImage,
                    alt: title,
                    width: twitterImageDimensions.width,
                    height: twitterImageDimensions.height,
                }],
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
            // Additional meta tags for Twitter
            other: {
                'twitter:domain': new URL(baseUrl).hostname,
                'twitter:url': url,
                'twitter:image:src': featuredImage,
                'twitter:image': featuredImage,
                'twitter:image:alt': title,
                'twitter:image:width': String(twitterImageDimensions.width),
                'twitter:image:height': String(twitterImageDimensions.height),
            },
        };
    } catch (error) {
        console.error('Error fetching metadata:', error);
        const defaultImage = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/default-og-image.jpg`;
        return {
            title: 'Sportzpoint - Latest Sports News & Updates',
            description: 'Read the latest sports news and updates on Sportzpoint',
            metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://sportzpoint.com'),
            openGraph: {
                title: 'Sportzpoint - Latest Sports News & Updates',
                description: 'Read the latest sports news and updates on Sportzpoint',
                url: process.env.NEXT_PUBLIC_WEBSITE_URL,
                siteName: 'Sportzpoint',
                images: [
                    {
                        url: defaultImage,
                        width: 1200,
                        height: 630,
                        alt: 'Sportzpoint',
                        type: 'image/jpeg',
                    }
                ],
                locale: 'en_US',
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                site: '@sportz_point',
                creator: '@sportz_point',
                title: 'Sportzpoint - Latest Sports News & Updates',
                description: 'Read the latest sports news and updates on Sportzpoint',
                images: [{
                    url: defaultImage,
                    alt: 'Sportzpoint',
                    width: 1200,
                    height: 600,
                }],
            },
        };
    }
}
export default Page;