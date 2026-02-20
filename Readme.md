# **Campus Life Planner**

## **Chosen Theme**

The Campus Life Planner is a specialized task management system designed for students. It focuses on the academic hustle, allowing users to track study sessions, group meetings, and personal errands within a high-performance, three-column academic dashboard.

---

## **Features List**

* Three-Column Responsive Dashboard: Modular layout that adapts from mobile to a full desktop productivity suite.  
* Real-time Task Logic: Automated calculation of time remaining (Today, Upcoming, or Overdue) for every task.  
* Advanced Search: Safe Regex-powered search with real-time mark highlighting.  
* Data Persistence: Full integration with localStorage so data survives page refreshes.  
* Data Portability: Ability to export current tasks to JSON and import pre-made datasets (like seed.json).  
* Live Analytics: A stats dashboard that aggregates total tasks and cumulative study/activity duration.

---

## **Regex Catalog**

The application uses strict validation patterns to ensure data integrity and catch common user errors.

**Title Pattern**

Pattern: /^\\S(?:.\*\\S)?$/

Example: "Web Dev Lab"

Purpose: Ensures non-empty strings without leading or trailing spaces.

**Duration Pattern**

Pattern: /^(0|\[1-9\]\\d\*)$/

Example: "90"

Purpose: Validates whole numbers only (minutes).

**Tag Pattern**

Pattern: /^\[A-Za-z\]+(?:\[ \-\]\[A-Za-z\]+)\*$/

Example: "Study-Session"

Purpose: Allows alphabetic tags with single spaces or hyphens.

**Date Pattern**

Pattern: /^\\d{4}-\\d{2}-\\d{2}$/

Example: "2026-02-21"

Purpose: Validates ISO standard date format (YYYY-MM-DD).

**Advanced Back-reference**

Pattern: /\\b(\\w+)\\s+\\1\\b/

Example: "Meeting Meeting"

Purpose: Specifically used to detect and flag repeated words in titles.

---

## **Keyboard Map**

The interface is designed for full keyboard operability to support accessibility and power users.

* Tab: Cycle through navigation buttons, form inputs, and Delete buttons.  
* Shift \+ Tab: Reverse cycle through elements.  
* Enter / Space: Activate buttons (Add Task, Delete, Import/Export, Navigation).  
* Esc: Standard browser action to clear focus from the search input.

---

## **Accessibility (a11y) Notes**

* ARIA Live Regions: Uses a hidden div with aria-live="polite" (accessed via the announce function in app.js) to notify screen readers of dynamic changes like "Task added" or "Tasks imported."  
* Semantic Landmarks: Organized using header, main, section, and footer to provide a clear map for assistive technologies.  
* Contrast & Readability: High-contrast colors (Green/White/Red) are used for status indicators, ensuring readability for users with visual impairments.  
* Focus Management: Outlines are preserved for all interactive elements to ensure clear visual feedback during keyboard navigation.

---

## **LINKS**

Link to my video: [https://www.loom.com/share/7b9e1c88b76344268de24e4a27699bc6](https://www.loom.com/share/7b9e1c88b76344268de24e4a27699bc6)

Link to my live website: [https://cmenankiti.github.io/Summative\_Assessment-Campus\_Life-Planner-cmenankiti/](https://cmenankiti.github.io/Summative_Assessment-Campus_Life-Planner-cmenankiti/)  
---

## **How to Run Tests**

1. Click the link to the live website([https://cmenankiti.github.io/Summative\_Assessment-Campus\_Life-Planner-cmenankiti/](https://cmenankiti.github.io/Summative_Assessment-Campus_Life-Planner-cmenankiti/)) in LINKS section of the Readme file  
2. Add 3 tasks manually in the “Add New Tasks” section.  
3. Click Export JSON.  
4. Clear your local storage (Dashboard/ My Tasks) and refresh the page.  
5. Click Import JSON and select the file you just downloaded.  
6. Verify the Dashboard Stats match your original 3 tasks.  
   **OR**  
1. Clone the github in your local terminal  
2. Take note of the location/path the repository is being clone in  
3. Come back to the Readme file, go to the LINKS section of the file  
4. Click on the url for the live website ([https://cmenankiti.github.io/Summative\_Assessment-Campus\_Life-Planner-cmenankiti/](https://cmenankiti.github.io/Summative_Assessment-Campus_Life-Planner-cmenankiti/))    
5. Click Import JSON   
6. After clicking it, go to the repository you just cloned in your terminal and select the seed.json file  
7. You should see an alert that it was added  
8. You can click the  Export JSON button to export/download the task as a json file  
9. Explore the other features

**I highly recommend watching the video in the in the link to my video  for better understanding of how the general website works**

**The video link:**  [https://www.loom.com/share/7b9e1c88b76344268de24e4a27699bc6](https://www.loom.com/share/7b9e1c88b76344268de24e4a27699bc6)

---

## **Author**

Menankiti Chigozirim King-David

ALU Student \- c.menankiti@alustudent.com

GitHub Profile: [https://github.com/cmenankiti](https://www.google.com/search?q=https://github.com/cmenankiti)

