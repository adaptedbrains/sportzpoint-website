import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [], // Stores fetched posts
  loading: false, // Loading state
  error: null, // Error state
  totalPages: 0, // Total pages from API response

  // Function to fetch posts
  fetchPosts: async (url) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();

      set({
        posts: data.articles || [], // Assuming 'articles' is the key for posts
        totalPages: data.pagination.totalPages || 1, // Extract totalPages from API response
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default usePostStore;
