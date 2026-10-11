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

...