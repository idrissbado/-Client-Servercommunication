# 📝 To-Do List Backend

A simple, innovative RESTful API for managing to-do tasks using only Node.js core modules. No frameworks, no database—just pure Node.js!

## 🚀 Features
- **CRUD operations**: Create, Read, Update, Delete tasks
- **In-memory storage**: All data is stored in an array (no database required)
- **RESTful API**: Follows best practices for HTTP methods and status codes
- **Minimal dependencies**: Uses only Node.js core modules

## 📚 API Endpoints

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| GET    | /tasks           | List all tasks             |
| POST   | /tasks           | Create a new task          |
| GET    | /tasks/:id       | Get a specific task        |
| PUT    | /tasks/:id       | Update a task              |
| DELETE | /tasks/:id       | Delete a task              |

### Task Object
```json
{
  "id": "string",
  "title": "string",
  "completed": false
}
```

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

> Crafted with ❤️ using Node.js core modules only!
