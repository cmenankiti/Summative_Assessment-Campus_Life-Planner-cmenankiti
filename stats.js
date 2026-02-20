export function statsHTML(tasks) {
  let total = tasks.length;
  let minutes = tasks.reduce((a,t)=>a + t.duration,0);

  return `
    <p><strong>Total Tasks:</strong> ${total}</p>
    <p><strong>Total Study Time:</strong> ${minutes} mins</p>
  `;
}