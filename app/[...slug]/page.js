import BlogPost from '@/components/BlogPost';

async function getPost(slug) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/slug/${slug}`,
      { next: { revalidate: 60 } }
    );
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  try {
    // Get the actual slug from the array
    const slug = params.slug[params.slug.length - 1];
    const post = await getPost(slug);
    
    if (!post) {
      return {
        title: 'Post Not Found - Sportzpoint',
        description: 'The requested article could not be found.',
      };
    }

    const description = post.excerpt || (post.content ? `${post.content.substring(0, 160)}...` : '');
    const imageUrl = post.banner_image ? `https://sportzpoint.s3.ap-south-1.amazonaws.com/${post.banner_image}` : null;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sportzpoint.com';
    const postUrl = `${baseUrl}/${post.categories?.[0]?.slug}/${post.slug}`;

    return {
      title: `${post.title} - Sportzpoint`,
      description,
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: postUrl,
      },
      openGraph: {
        title: post.title,
        description,
        url: postUrl,
        siteName: 'Sportzpoint',
        ...(imageUrl && {
          images: [{
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          }],
        }),
        type: 'article',
        publishedTime: post.published_at,
        modifiedTime: post.updated_at,
        authors: post.author ? [post.author] : undefined,
        section: post.categories?.[0]?.name,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description,
        ...(imageUrl && {
          images: [imageUrl],
        }),
        site: '@sportzpoint',
        creator: '@sportzpoint',
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
    console.error('Error generating metadata:', error);
    return {
      title: 'Sportzpoint - Latest Sports News',
      description: 'Get the latest sports news, live scores, and updates from the world of Cricket, Football, Tennis, Hockey, and more at Sportzpoint.',
    };
  }
}

export default async function PostPage({ params }) {
  const slug = params.slug[params.slug.length - 1];
  const post = await getPost(slug);
  
  if (!post) {
    return <div>Post not found</div>;
  }

  return <BlogPost postData={post} />;
}
