export function compareDates(inputDate) {
    const currentDate = new Date();
    const inputDateTime = new Date(inputDate);
  
    const timeDiff = Math.abs(currentDate - inputDateTime);
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    const hoursDiff = Math.floor(minutesDiff / 60);
    const daysDiff = Math.floor(hoursDiff / 24);
    const weeksDiff = Math.floor(daysDiff / 7);
    const monthsDiff = Math.floor(daysDiff / 30);
    const yearsDiff = Math.floor(daysDiff / 365);
  
    if (minutesDiff < 1) {
      return "just now";
    } else if (minutesDiff < 60) {
      return `${minutesDiff} minute${minutesDiff > 1 ? "s" : ""} ago`;
    } else if (hoursDiff < 24) {
      return `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;
    } else if (daysDiff < 7) {
      return `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
    } else if (weeksDiff < 4) {
      return `${weeksDiff} week${weeksDiff > 1 ? "s" : ""} ago`;
    } else if (monthsDiff < 12) {
      return `${monthsDiff} month${monthsDiff > 1 ? "s" : ""} ago`;
    } else {
      return `${yearsDiff} year${yearsDiff > 1 ? "s" : ""} ago`;
    }
  }