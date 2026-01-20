# 📝 To-Do List Backend

A simple, innovative RESTful API for managing to-do tasks using only Node.js core modules. No frameworks, no database—just pure Node.js!


## 🚀 Features
- **CRUD operations**: Create, Read, Update, Delete tasks
- **In-memory storage**: All data is stored in an array (no database required)
- **RESTful API**: Follows best practices for HTTP methods and status codes
- **Minimal dependencies**: Uses only Node.js core modules
- **Task History**: Every update or delete is logged for auditability
- **Notifications**: See a log of recent actions (created, updated, deleted)


## 📚 API Endpoints

| Method | Endpoint                | Description                        |
|--------|-------------------------|------------------------------------|
| GET    | /tasks                  | List all tasks                     |
| POST   | /tasks                  | Create a new task                  |
| GET    | /tasks/:id              | Get a specific task                |
| PUT    | /tasks/:id              | Update a task                      |
| DELETE | /tasks/:id              | Delete a task                      |
| GET    | /tasks/history          | View recent task history (innovative) |
| GET    | /tasks/notifications    | View recent notifications (innovative) |


### Task Object
```json
{
  "id": "string",
  "title": "string",
  "completed": false
}
```

### 🔔 Innovation in Every Operation
- **Create**: Notifies and logs every new task creation.
- **Read**: Access not just tasks, but also history and notifications for transparency.
- **Update**: Every change is logged and notified, so you never lose track of edits.
- **Delete**: Deletions are logged and notified, supporting audit and recovery scenarios.


## 🛠️ Usage
1. Clone the repo and install Node.js (no dependencies needed).
2. Run the server:
  ```bash
  node server.js
  ```
3. Use tools like Postman or curl to interact with the API.


## 👤 Author
- **idrissbado**

---

> Crafted with ❤️ using Node.js core modules only! Now with history and notifications for a smarter, more transparent backend.
