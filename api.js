const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Reusable request helper
async function request(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response;
}

// Status helper with classes
function setStatus(message, type) {
  const statusEl = document.getElementById("status");
  statusEl.textContent = message;
  statusEl.className = "";
  if (type) statusEl.classList.add(type);
}

// Render a note with Delete button
function renderNote(note) {
  const li = document.createElement("li");
  li.textContent = `${note.title}: ${note.body}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", async () => {
    try {
      setStatus("Deleting note...", "info");
      const response = await request(`${API_URL}/${note.id}`, { method: "DELETE" });
      if (response.ok) {
        li.remove();
        setStatus(`Note deleted (id ${note.id})`, "success");
      }
    } catch (err) {
      setStatus(err.message, "error");
    }
  });

  li.appendChild(deleteBtn);
  document.getElementById("notes-list").appendChild(li);
}

// Load notes
document.getElementById("load-btn").addEventListener("click", async () => {
  const btn = document.getElementById("load-btn");
  btn.disabled = true;
  setStatus("Loading notes...", "info");
  try {
    const response = await request(`${API_URL}?_limit=10`);
    const notes = await response.json();
    const list = document.getElementById("notes-list");
    list.innerHTML = "";
    if (notes.length === 0) {
      setStatus("No notes found.", "info");
    } else {
      notes.forEach(renderNote);
      setStatus(`Loaded ${notes.length} notes from the server.`, "success");
    }
  } catch (err) {
    setStatus(err.message, "error");
  } finally {
    btn.disabled = false;
  }
});

// Create note
document.getElementById("note-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = document.getElementById("submit-btn");
  btn.disabled = true;
  setStatus("Creating note...", "info");
  try {
    const title = document.getElementById("title-input").value.trim();
    if (!title) throw new Error("Title is required (max 100 chars).");
    const body = document.getElementById("body-input").value;
    const response = await request(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, userId: 1 }),
    });
    const note = await response.json();
    renderNote(note);
    document.getElementById("note-form").reset();
    setStatus(`Note created (status ${response.status}, id ${note.id})`, "success");
  } catch (err) {
    setStatus(err.message, "error");
  } finally {
    btn.disabled = false;
  }
});