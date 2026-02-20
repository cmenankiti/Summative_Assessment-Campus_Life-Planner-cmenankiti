import { load, save } from "./storage.js";
import { validate } from "./validators.js";
import { renderSearchResults, compileRegex } from "./search.js";
import { render } from "./userInterface.js";
import { statsHTML } from "./stats.js";

// STATE MANAGEMENT
let tasks = load();

const form = document.getElementById("taskForm");
const status = document.getElementById("status");
const searchInput = document.getElementById("search"); // Matches your index.html ID
const tasksList = document.getElementById("tasksList");
const liveStatus = document.getElementById("liveStatus");

// ACCESSIBILITY ANNOUNCER
function announce(msg) {
  if (liveStatus) liveStatus.textContent = msg;
}

// SECTION SWITCHING (Swaps the 3rd column content)
function showSubSection(id) {
  const sections = ["tasksSection", "searchSection", "aboutSection"];
  sections.forEach(secId => {
    const el = document.getElementById(secId);
    if (el) el.style.display = "none";
  });
  const target = document.getElementById(id);
  if (target) target.style.display = "block";
}

// UNIFIED UPDATE & RENDER
function update() {
  save(tasks);
  render(tasks, null);
  const statsContainer = document.getElementById("stats");
  if (statsContainer) statsContainer.innerHTML = statsHTML(tasks);
  renderTasksList();
}

// RENDER "MY TASKS" SECTION
function renderTasksList() {
  if (!tasksList) return;
  tasksList.innerHTML = "";

  if (tasks.length === 0) {
    tasksList.innerHTML = "<p>No tasks yet. Your hustle starts here!</p>";
    return;
  }

  tasks.forEach(task => {
    // Calculate Time Remaining for the display
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const dueDate = new Date(task.date);
    dueDate.setHours(0, 0, 0, 0);

    const diffInTime = dueDate.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

    let dueStatus = "";
    if (diffInDays === 0) dueStatus = "Due Today!";
    else if (diffInDays > 0) dueStatus = `${diffInDays} day(s) remaining`;
    else dueStatus = `${Math.abs(diffInDays)} day(s) overdue`;

    const div = document.createElement("div");
    div.className = "task"; 
    div.innerHTML = `
      <h3 style="margin-top: 0; color: #333;">${task.title}</h3>
      
      <p><small>${task.tag} • ${task.date}</small></p>
      
      <p style="margin: 5px 0; font-weight: bold; font-size: 0.9em; color: ${diffInDays < 0 ? '#d9534f' : '#28a745'}">
        ${dueStatus}
      </p>

      <button class="del" data-id="${task.id}" style="background: #d9534f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
        Delete
      </button>
    `;
    tasksList.appendChild(div);
  });
}

// --- NEW: EXPORT JSON FUNCTION [Milestone 6] ---
function exportTasks() {
  if (tasks.length === 0) return alert("No tasks to export!");
  
  const dataStr = JSON.stringify(tasks, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = "campus_planner_tasks.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  announce("Tasks exported to JSON file.");
}

// --- NEW: IMPORT JSON FUNCTION [Milestone 6] ---
function importTasks(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const importedData = JSON.parse(event.target.result);
      
      // Basic validation: Ensure imported data is an array
      if (Array.isArray(importedData)) {
        tasks = importedData;
        update(); // Re-renders the Dashboard and Task List with new data
        announce("Data imported successfully from " + file.name);
        alert("Import successful!");
      } else {
        throw new Error("Invalid format");
      }
    } catch (err) {
      alert("Error: Failed to parse JSON file. Please ensure it is a valid seed.json file.");
      console.error(err);
    }
  };
  reader.readAsText(file);
}

// IMPORT EVENT LISTENER
const importFile = document.getElementById("importFile");
if (importFile) {
  importFile.addEventListener("change", importTasks);
}

// ADD TASK EVENT
form.addEventListener("submit", e => {
  e.preventDefault();
  const title = form.title.value.trim();
  const now = new Date().toISOString();

  if (!validate("title", title)) return (status.textContent = "Invalid title");
  if (!validate("duration", form.duration.value)) return (status.textContent = "Invalid duration");

  tasks.push({
    id: "task_" + Date.now(),
    title,
    duration: Number(form.duration.value),
    tag: form.tag.value,
    date: form.date.value,
    createdAt: now,
    updatedAt: now
  });

  form.reset();
  status.textContent = "Task added successfully!";
  announce("Task " + title + " added.");
  update();
});

// --- NEW: SEARCH BY TITLE EVENT ---
if (searchInput) {
  searchInput.addEventListener("input", () => {
    // Uses your search.js renderSearchResults to filter and highlight
    renderSearchResults(tasks, searchInput.value, document.getElementById("searchResults"));
  });
}

// DELETE TASK EVENT
document.addEventListener("click", e => {
  if (e.target.classList.contains("del")) {
    const taskId = e.target.dataset.id;
    tasks = tasks.filter(t => t.id.toString() !== taskId.toString());
    update();
    announce("Task deleted successfully.");
  }
});

// NAVIGATION BUTTONS
document.getElementById("homeBtn").addEventListener("click", () => showSubSection("tasksSection"));
document.getElementById("searchBtn").addEventListener("click", () => showSubSection("searchSection"));
document.getElementById("myTasksBtn").addEventListener("click", () => showSubSection("tasksSection"));
if (document.getElementById("aboutBtn")) {
  document.getElementById("aboutBtn").addEventListener("click", () => showSubSection("aboutSection"));
}

// EXPORT BUTTON EVENT
const exportBtn = document.getElementById("exportBtn");
if (exportBtn) {
  exportBtn.addEventListener("click", exportTasks);
}

// INITIAL RUN
update();