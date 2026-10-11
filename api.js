const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Reusable request helper
async function request(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
}

// Status helper with classes
function setStatus(message, type) {
  const statusEl = document.getElementById("status");
  statusEl.textContent = message;
  statusEl.className = ""; // clear old classes
  if (type === "success") statusEl.classList.add("success");
  if (type === "error") statusEl.classList.add("error");
  if (type === "info") statusEl.classList.add("info");
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
        setStatus(`Note deleted successfully (id ${note.id})`, "success");
      } else {
        throw new Error(`Failed to delete note ${note.id}`);
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
    const response = await request(API_URL);
    const notes = await response.json();
    document.getElementById("notes-list").innerHTML = "";
    notes.slice(0, 5).forEach(renderNote); // show first 5
    setStatus("Notes loaded successfully", "success");
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
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const response = await request(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, userId: 1 }),
    });
    const note = await response.json();
    renderNote(note);
    document.getElementById("note-form").reset();
    setStatus("Note created successfully", "success");
  } catch (err) {
    setStatus(err.message, "error");
  } finally {
    btn.disabled = false;
  }
});