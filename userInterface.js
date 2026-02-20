import { highlight } from "./search.js";

export function render(tasks, re) {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  tasks.forEach(t => {
    container.innerHTML += `
      <div class="task">
        <h3>${highlight(t.title, re)}</h3>
        <small>${t.tag} • ${t.date}</small>
        <p>${t.duration} mins</p>
        <button data-id="${t.id}" class="del">Delete</button>
      </div>
    `;
  });
}