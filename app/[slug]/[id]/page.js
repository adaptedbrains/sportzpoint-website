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
            return `https://dmpsza32x691.cloudfront.net/${path}`;
        };

        // Clean up the base URL to avoid double slashes
        const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL?.replace(/\/+$/, '') || 'https://sportzpoint.com';
        const cleanSlug = slug?.replace(/^\/+|\/+$/g, '');
        const cleanId = id?.replace(/^\/+|\/+$/g, '');
        const url = `${baseUrl}/${cleanSlug}/${cleanId}`;

        const title = post.article?.title || 'Sportzpoint - Latest Sports News & Updates';
        const description = post.article?.seo_desc || post.article?.excerpt || 'Read the latest sports news and updates on Sportzpoint';
        const featuredImage = getAbsoluteImageUrl(post.article?.featured_image || post.article?.banner_image);

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
                    }
                ],
                type: 'article',
            },
            // Using Next.js head tags for Twitter Cards
            other: {
                // Required Twitter Card tags
                'twitter:card': 'summary_large_image',
                'twitter:site': '@sportz_point',
                // Optional but recommended tags
                'twitter:title': title.substring(0, 70), // Twitter recommends title < 70 chars
                'twitter:description': description.substring(0, 200), // Twitter recommends description < 200 chars
                'twitter:image': featuredImage,
                // Additional engagement tags
                'twitter:creator': '@sportz_point',
                // Ensure proper URL parsing
                'twitter:url': url,
            },
            alternates: {
                canonical: url,
            },
        };
    } catch (error) {
        console.error('Error fetching metadata:', error);
        const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL?.replace(/\/+$/, '') || 'https://sportzpoint.com';
        const defaultImage = `${baseUrl}/default-og-image.jpg`;
        const defaultTitle = 'Sportzpoint - Latest Sports News & Updates';
        const defaultDesc = 'Read the latest sports news and updates on Sportzpoint';
        
        return {
            title: defaultTitle,
            description: defaultDesc,
            metadataBase: new URL(baseUrl),
            openGraph: {
                title: defaultTitle,
                description: defaultDesc,
                url: baseUrl,
                siteName: 'Sportzpoint',
                images: [
                    {
                        url: defaultImage,
                        width: 1200,
                        height: 630,
                        alt: 'Sportzpoint',
                    }
                ],
                type: 'website',
            },
            other: {
                // Required Twitter Card tags
                'twitter:card': 'summary_large_image',
                'twitter:site': '@sportz_point',
                // Optional but recommended tags
                'twitter:title': defaultTitle.substring(0, 70),
                'twitter:description': defaultDesc.substring(0, 200),
                'twitter:image': defaultImage,
                // Additional engagement tags
                'twitter:creator': '@sportz_point',
                // Ensure proper URL parsing
                'twitter:url': baseUrl,
            },
            alternates: {
                canonical: baseUrl,
            },
        };
    }
}
export default Page;