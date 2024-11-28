import BlogPost from '@/components/BlogPost';
import { apiUrl } from '@/config/environment';

export async function getServerSideProps({ params }) {
  try {
    const { categoryId, articleId } = params;
    
    // Fetch article data with both category and slug
    const response = await fetch(`${apiUrl}/v1/articles/${categoryId}/${articleId}`);
    const postData = await response.json();

    if (!postData) {
      return { notFound: true };
    }

    // Verify category matches
    if (postData.categories?.[0]?.slug !== categoryId) {
      return { notFound: true };
    }

    return {
      props: {
        postData,
        index: 0,
      },
    };
  } catch (error) {
    console.error('Error fetching article:', error);
    return { notFound: true };
  }
}

const ArticlePage = (props) => {
  return <BlogPost {...props} />;
};

export default ArticlePage; 