import { apiUrl } from '@/config/environment';

export async function getServerSideProps({ params }) {
  try {
    const { categoryId } = params;
    const response = await fetch(`${apiUrl}/v1/categories/${categoryId}`);
    const categoryData = await response.json();

    if (!categoryData) {
      return { notFound: true };
    }

    return {
      props: {
        categoryData,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}

const CategoryPage = ({ categoryData }) => {
  // Your category page component
};

export default CategoryPage; 