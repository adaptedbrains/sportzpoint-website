import { create } from "zustand";

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

    set({ loading: true, error: null }); // Set loading to true at the start
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();

      set({
        posts: data.articles || [], // Assuming 'articles' is the key for posts
        totalPages: data.pagination?.totalPages || 1, // Extract totalPages from API response
        loading: false, // Set loading to false after successful fetch
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false, // Set loading to false in case of an error
      });
    }
  },

  // Function to fetch latest stories
  fetchLatestStory: async (url) => {
    set({ loading: true, error: null }); // Set loading to true at the start
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch latest stories");
      }

      const data = await response.json();

      set({
        latestStory: data.articles || [], // Assuming 'articles' is the key for latest stories
        loading: false, // Set loading to false after successful fetch
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false, // Set loading to false in case of an error
      });
    }
  },

  fetchWebPosts: async (url) => {

    set({ loading: true, error: null }); // Set loading to true at the start
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();

      set({
        webstory: data.articles || [], // Assuming 'articles' is the key for posts
        totalPages: data.pagination?.totalPages || 1, // Extract totalPages from API response
        loading: false, // Set loading to false after successful fetch
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false, // Set loading to false in case of an error
      });
    }
  },

  liveBlogFunction: (data) => {
  
    if (Array.isArray(data)) {
      // If it's an array, replace the existing liveBlogs with the new array
      set(() => ({
        liveBlogs: data, // Replace liveBlogs with the new array
      }));
    } else if (typeof data === "object" && data !== null) {
      alert("object called")
      // If it's an object, add it to the liveBlogs list (or update if already exists)
      set((state) => ({
        liveBlogs: [
          data, // Add the new blog entry
          ...state.liveBlogs.filter((blog) => blog._id !== data._id) // Keep the existing blogs, removing the one with the same _id if any
        ],
      }));
    } else {
      console.warn("Invalid data format for live blog updates");
    }
  }


}));

export default usePostStore;
