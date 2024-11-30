import { create } from "zustand";

// Helper function to process article data
const processArticle = (article) => {
  // Debug log to see incoming article data
  console.log('Processing article:', {
    title: article.title,
    originalCategories: article.categories,
    category: article.category
  });

  let categories;
  if (article.categories?.length > 0) {
    categories = article.categories;
  } else if (article.category) {
    // If we have a single category object
    if (typeof article.category === 'object' && article.category.name) {
      categories = [article.category];
    } 
    // If category is a string
    else if (typeof article.category === 'string') {
      categories = [{
        name: article.category,
        slug: article.category.toLowerCase().replace(/\s+/g, '-')
      }];
    }
    else {
      categories = [{ slug: 'sports', name: 'Sports' }];
    }
  } else {
    categories = [{ slug: 'sports', name: 'Sports' }];
  }

  // Debug log processed categories
  console.log('Processed categories:', categories);

  return {
    ...article,
    categories,
    slug: article.slug || article._id?.toString() || 'article',
    published_date: article.published_date || article.createdAt || new Date().toISOString(),
    updated_at_datetime: article.updated_at_datetime || article.published_date || article.createdAt || new Date().toISOString()
  };
};

const usePostStore = create((set) => ({
  posts: [],
  webstory: [],
  liveBlogs: [],
  blogUpdates: [],
  loading: false,
  error: null,
  totalPages: 0,
  latestStory: [],

  fetchPosts: async (url) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();

      // Debug log raw data
      console.log('Raw posts data:', {
        firstArticle: data.articles?.[0]
      });

      // Process articles to ensure consistent data structure
      const processedArticles = (data.articles || []).map(processArticle);

      // Debug log processed data
      console.log('Processed posts:', {
        firstArticle: processedArticles[0]
      });

      set({
        posts: processedArticles,
        totalPages: data.pagination?.totalPages || 1,
        loading: false,
      });
    } catch (error) {
      console.error('Posts fetch error:', error);
      set({ error: error.message, loading: false });
    }
  },

  fetchLatestStory: async (url) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch latest stories");
      const data = await response.json();

      // Debug log raw data
      console.log('Raw latest stories data:', {
        firstArticle: data.articles?.[0]
      });

      // Process articles to ensure consistent data structure
      const processedArticles = (data.articles || []).map(processArticle);

      // Debug log processed data
      console.log('Processed latest stories:', {
        firstArticle: processedArticles[0]
      });

      set({
        latestStory: processedArticles,
        loading: false,
      });
    } catch (error) {
      console.error('Latest stories fetch error:', error);
      set({ error: error.message, loading: false });
    }
  },

  fetchWebPosts: async (url) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();

      // Debug log raw data
      console.log('Raw web posts data:', {
        firstArticle: data.articles?.[0]
      });

      // Process articles to ensure consistent data structure
      const processedArticles = (data.articles || []).map(processArticle);

      // Debug log processed data
      console.log('Processed web posts:', {
        firstArticle: processedArticles[0]
      });

      set({
        webstory: processedArticles,
        totalPages: data.pagination?.totalPages || 1,
        loading: false,
      });
    } catch (error) {
      console.error('Web posts fetch error:', error);
      set({ error: error.message, loading: false });
    }
  },

  liveBlogFunction: (data) => {
    if (Array.isArray(data)) {
      set(() => ({
        liveBlogs: data.map(processArticle),
      }));
    } else if (typeof data === "object" && data !== null) {
      set((state) => ({
        liveBlogs: [
          processArticle(data),
          ...state.liveBlogs.filter((blog) => blog._id !== data._id)
        ],
      }));
    }
  }
}));

export default usePostStore;
