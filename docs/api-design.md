# QuickNotes API Design

## Endpoints
| Method | Path              | Description                     | Success |
|--------|-------------------|---------------------------------|---------|
| GET    | /notes            | List all notes                  | 200     |
| GET    | /notes/{id}       | Get one note by ID              | 200     |
| POST   | /notes            | Create a new note               | 201     |
| PUT    | /notes/{id}       | Update an existing note         | 200     |
| DELETE | /notes/{id}       | Delete a note                   | 204     |
| GET    | /users/{id}/notes | List notes for a specific user  | 200     |

## Example: Create a Note
![API Design Screenshot](../screenshots/api-design.png)  
![API Design Screenshot 2](../screenshots/api-2.png)

...