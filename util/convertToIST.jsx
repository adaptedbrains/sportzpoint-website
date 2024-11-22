export const convertToIST = (isoDate) => {
    const date = new Date(isoDate);

    // Convert to IST (GMT+5:30)
    const istDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  
    // Extract individual components
    const day = istDate.getDate().toString().padStart(2, "0"); // Add leading zero
    const month = istDate.toLocaleString("en-US", { month: "short", timeZone: "Asia/Kolkata" }); // Get short month name
    const year = istDate.getFullYear();
    const hours = istDate.getHours().toString().padStart(2, "0"); // Add leading zero
    const minutes = istDate.getMinutes().toString().padStart(2, "0"); // Add leading zero
  
    // Format as "31 Oct 2024 05:56 IST"
    return `${day} ${month} ${year} ${hours}:${minutes} IST`;
  };
  
 
  