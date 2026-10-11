const API_URL = "https://jsonplaceholder.typicode.com/posts";

async function request(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Error ${response.status}`);
  return response.json();
}

// Load notes (GET)
document.getElementById("load-btn").addEventListener("click", async () => {
  const status = document.getElementById("status");
  const list = document.getElementById("notes-list");
  const btn = document.getElementById("load-btn");

  status.textContent = "Loading notes...";
  btn.disabled = true;
  list.innerHTML = "";

  try {
    const notes = await request(`${API_URL}?_limit=10`);
    if (notes.length === 0) {
      status.textContent = "No notes found.";
    } else {
      status.textContent = `Loaded ${notes.length} notes from the server.`;
      notes.forEach(note => {
        const li = document.createElement("li");
        li.textContent = `${note.title} — ${note.body}`;
        list.appendChild(li);
      });
    }
  } catch (err) {
    status.textContent = `Error loading notes: ${err.message}`;
  } finally {
    btn.disabled = false;
  }
});

// Create note (POST)
document.getElementById("note-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title-input").value.trim();
  const body = document.getElementById("body-input").value.trim();
  const status = document.getElementById("status");
  const submitBtn = document.getElementById("submit-btn");

  if (!title) {
    status.textContent = "Title is required.";
    return;
  }

  submitBtn.disabled = true;
  status.textContent = "Creating note...";

  try {
    const newNote = await request(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, userId: 1 })
    });

    status.textContent = `Note created (status 201, id ${newNote.id}).`;
    const li = document.createElement("li");
    li.textContent = `${newNote.title} — ${newNote.body}`;
    document.getElementById("notes-list").prepend(li);
    e.target.reset();
  } catch (err) {
    status.textContent = `Error creating note: ${err.message}`;
  } finally {
    submitBtn.disabled = false;
  }
});