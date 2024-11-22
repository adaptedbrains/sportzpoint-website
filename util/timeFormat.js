export const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    // Format the date as "11 Nov 2024"
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }); // "Nov"
    const year = date.getFullYear();
  
    // Format the time as "7.30 am"
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    
    // Convert 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero for minutes if needed
  
    // Return formatted string
    return `${day} ${month} ${year} at ${hours}:${minutes} ${ampm}`;
  };
  
 
  