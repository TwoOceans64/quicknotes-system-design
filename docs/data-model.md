 # QuickNotes Data Model

## Entities
- **users**: id, name, email
- **notes**: id, title, body, user_id
- **tags**: id, name
- **note_tags**: note_id, tag_id

## Relationships
- One-to-many: users → notes
- Many-to-many: notes ↔ tags via note_tags

## ER Diagrams
![Data Model Screenshot](../screenshots/data-model.png)  
![Data Model Screenshot 2](../screenshots/data-model-2.png)  
![Data Model Screenshot 3](../screenshots/data-model-3.png)

---

## SQL Schema

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE notes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  body TEXT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE tags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE note_tags (
  note_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (note_id, tag_id),
  FOREIGN KEY (note_id) REFERENCES notes(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);

Example Queries
List all notes for a user

sql
SELECT id, title, body
FROM notes
WHERE user_id = 1;
Find all tags for a note (JOIN)

sql
SELECT t.name
FROM tags t
JOIN note_tags nt ON t.id = nt.tag_id
WHERE nt.note_id = 5;
Search notes by tag

sql
SELECT n.title, n.body
FROM notes n
JOIN note_tags nt ON n.id = nt.note_id
JOIN tags t ON nt.tag_id = t.id
WHERE t.name = 'urgent';

Index
CREATE INDEX idx_user_notes ON notes(user_id);
Reason: Speeds up queries that fetch notes by user, which is a common operation.

SQL vs NoSQL Justification
QuickNotes uses SQL because:

Strong relational structure (users, notes, tags, relationships).

Enforces constraints (e.g., foreign keys prevent orphaned notes).

Transactions ensure correctness (no duplicate or lost notes).

Queries often involve joins (e.g., notes by tag), which SQL handles efficiently.

NoSQL could be considered for scalability and flexible schemas, but the need for relationships and consistency makes SQL the better fit for this project.