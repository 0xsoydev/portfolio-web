import GitHubCalendar from "react-github-calendar";

import React from 'react'
import RecentActivity from "./RecentActivity";

const Contributions = () => {
  // Function to filter data to show only the last 9 months
  const selectLast9Months = (contributions: any[]) => {
    const currentDate = new Date();
    const elevenMonthsAgo = new Date();
    elevenMonthsAgo.setMonth(currentDate.getMonth() - 11);
    
    return contributions.filter((activity) => {
      const activityDate = new Date(activity.date);
      return activityDate >= elevenMonthsAgo;
    });
  };

  return (
    <div className="flex justify-center">
      <GitHubCalendar
        username="0xsoydev"
        transformData={selectLast9Months}
      />
    </div>
  )
}

export default Contributions