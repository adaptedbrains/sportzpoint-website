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

        // Get the featured image URL - ensure it's an absolute URL and properly cached
        const getAbsoluteImageUrl = (path) => {
            if (!path) return `${process.env.NEXT_PUBLIC_WEBSITE_URL}/default-og-image.jpg`;
            if (path.startsWith('http')) return path;
            // Add a timestamp to force social media platforms to refresh the image
            const timestamp = new Date().getTime();
            return `https://dmpsza32x691.cloudfront.net/${path}?v=${timestamp}`;
        };

        // Pre-fetch the image to ensure it's in CloudFront's cache
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
                        // Force social platforms to fetch a fresh copy
                        'og:image:url': featuredImage,
                    }
                ],
                locale: 'en_US',
                type: 'article',
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: [featuredImage],
                // Additional Twitter-specific image properties
                'twitter:image': featuredImage,
                'twitter:image:src': featuredImage,
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
            // Additional image-specific meta tags
            other: {
                'og:image:secure_url': featuredImage,
                'og:image:type': 'image/jpeg',
                'og:image:width': '1200',
                'og:image:height': '630',
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
                        'og:image:url': defaultImage,
                    }
                ],
                locale: 'en_US',
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: 'Sportzpoint - Latest Sports News & Updates',
                description: 'Read the latest sports news and updates on Sportzpoint',
                images: [defaultImage],
                'twitter:image': defaultImage,
                'twitter:image:src': defaultImage,
            },
        };
    }
}
export default Page;