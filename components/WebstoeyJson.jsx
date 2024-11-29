import { useEffect, useState } from "react";
import WebStory from "./WebStory";

function convertWebStories(webStoriesArray) {
    // Map the web_story array to the desired format
    return webStoriesArray.map((item, index) => ({
        id: item._id || index + 1, // Use the _id if available, otherwise fallback to an incremental id
        title: item.title || "Untitled Web Story", // Use the item's title or a default
        author: "John Doe", // Replace this with dynamic data if available
        pages: [
            {
                image: item.img_src || "placeholder.png", // Fallback to placeholder if img_src is missing
                heading: item.title || "Untitled Page", // Replace title with heading
                description: item.desc || "No description provided", // Replace desc with description
            },
        ],
    }));
}

const WebStoriesJson = ({ post }) => {
    const [webStories, setWebStories] = useState([]);

    useEffect(() => {
        if (post.web_story && Array.isArray(post.web_story)) {
            const stories = convertWebStories(post.web_story);
            setWebStories(stories);
        }
    }, [post]);

    return (
        <div className="bg-zinc-800 w-full fixed h-full top-0 start-0 z-20">
            <WebStory story={webStories} />
        </div>
    );
};

export default WebStoriesJson;
