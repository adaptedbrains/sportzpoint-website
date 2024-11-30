'use client'
import { useEffect, useState } from "react";
import WebStory from "./WebStory";

function convertWebStories(story) {
    if (!story) return null;
    
    // If the story already has pages array, use it
    if (story.pages) {
        return story;
    }

    // Otherwise, create pages array from story data
    return {
        ...story,
        pages: [{
            image: story.banner_image || '',
            heading: story.title || '',
            description: story.description || ''
        }]
    };
}

const WebStoryJson = ({ post }) => {
    const [webStories, setWebStories] = useState(null);

    useEffect(() => {
        let storyData = post;
        
        if (!storyData) {
            // Try to get from sessionStorage if not provided as prop
            const storedStory = sessionStorage.getItem('currentWebStory');
            if (storedStory) {
                try {
                    storyData = JSON.parse(storedStory);
                } catch (error) {
                    console.error('Error parsing stored story:', error);
                    return;
                }
            }
        }

        const convertedStory = convertWebStories(storyData);
        if (convertedStory) {
            setWebStories(convertedStory);
        }
    }, [post]);

    if (!webStories || !webStories.pages) return null;
    
    return <WebStory story={webStories.pages} />;
};

export default WebStoryJson;
