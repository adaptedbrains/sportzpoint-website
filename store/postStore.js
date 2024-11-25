import { create } from "zustand";

const usePostStore = create((set) => ({
  posts: [],
  webstory:[],
  liveBlogs: [],
  blogUpdates:[],
  loading: false,
  error: null,
  totalPages: 0,

  
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

  liveBlogFunction: (data, type) => {
    
     
        if (Array.isArray(data)) {
          set(() => ({
            liveBlogs: data, // Replace liveBlogs with the new array
          }));
         
          
        } else if (typeof data === "object" && data !== null) {

          set((state) => ({
            liveBlogs: [
              data,
              ...state.liveBlogs.filter((blog) => blog._id !== data._id)
            ], 
          }));

          
          set(() => ({
            liveBlogs: uniqueLiveBlogs, // Replace liveBlogs with the new array
          }));

          
        } else {
          console.warn("Invalid data format for live blog updates");
          return state;
        }
      
    
  }




}));

export default usePostStore;
