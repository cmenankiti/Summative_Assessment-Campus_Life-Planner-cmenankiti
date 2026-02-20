// SAFE regex compiler
export function compileRegex(input, flags = "i") {
  try {
    return input ? new RegExp(input, flags) : null;
  } catch {
    return null;
  }
}


// Highlight matches
export function highlight(text, re) {
  if (!re) return text;
  return text.replace(re, match => `<mark>${match}</mark>`);
}


// MAIN SEARCH FUNCTION
export function searchTasks(tasks, query) {
  const regex = compileRegex(query);

  if (!regex) return tasks; // if no search input

  return tasks.filter(task => regex.test(task.title));
}


// RENDER SEARCH RESULTS
export function renderSearchResults(tasks, query, container) {
  const results = searchTasks(tasks, query);
  const regex = compileRegex(query);

  container.innerHTML = "";

  // If nothing found
  if (results.length === 0) {
    container.innerHTML = `
      <p class="no-results">No task found</p>
    `;
    return;
  }

  // Show matching tasks
  results.forEach(task => {
    const div = document.createElement("div");
    div.className = "task-card";

    div.innerHTML = `
      <h3>${highlight(task.title, regex)}</h3>
      <p>Duration: ${task.duration}</p>
      <p>Tag: ${task.tag}</p>
      <p>Date: ${task.date}</p>
    `;

    container.appendChild(div);
  });
}