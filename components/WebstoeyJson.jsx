import { useEffect, useState } from "react";
import WebStory from "./WebStory";

function convertStringToJson(inputString) {
    // Parse the string to a JSON object
    const data = JSON.parse(inputString);

    // Map the web_story array to the desired format
    return data.data.web_story.map((item, index) => ({
        id: index + 1, // Assuming a simple incremental id for each story
        title: "Sample Web Story", // You can set this to a static title or extract it from elsewhere
        author: "John Doe", // You can replace this with dynamic data if available
        pages: [
            {
                image: item.img_src,
                heading: item.title, // Replace title with heading
                description: item.desc, // Replace desc with description
            }
        ]
    }));
}

const WebStoriesJson = ({ post }) => {
  // Directly pass 'post' to convertStringToJson without parsing it again
  const [webstorie, setWebstorie] = useState([])
  useEffect(()=>{
      const webs = convertStringToJson(post.content);
    setWebstorie(webs)
  },[post])
  
  
  return (
    <div className="bg-zinc-800 w-full fixed h-full top-0 start-0 z-20">
      <WebStory story={webstorie}/>
      
    </div>
  );
};

export default WebStoriesJson;
