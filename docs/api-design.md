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

---

## Example: Create a Note
**Request**
```json
POST /notes
{
  "title": "Meeting notes",
  "body": "Discuss project milestones",
  "userId": 1
}
Response

{
  "id": 101,
  "title": "Meeting notes",
  "body": "Discuss project milestones",
  "userId": 1,
  "createdAt": "2026-10-12T19:00:00Z"
}
Example: List Notes
Request

GET /notes

Response

[
  {
    "id": 1,
    "title": "Shopping list",
    "body": "Milk, bread, eggs",
    "userId": 1
  },
  {
    "id": 2,
    "title": "Todo",
    "body": "Finish QuickNotes project",
    "userId": 1
  }
]
Error Codes
400 Bad Request — invalid input (e.g., missing title)

401 Unauthorized — user not logged in

403 Forbidden — user not allowed to access this note

404 Not Found — note does not exist

500 Internal Server Error — unexpected server issue

Example Error Response

{
  "error": "Note not found",
  "status": 404
}

Screenshots
![API Design Screenshot](../screenshots/api-design.png)  
![API Design Screenshot 2](../screenshots/api-2.png)

...