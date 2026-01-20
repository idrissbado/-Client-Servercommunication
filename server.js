
// Import Node.js core modules
const http = require('http');
const { parse } = require('url');
const { StringDecoder } = require('string_decoder');


// In-memory data stores
let tasks = [];
let nextId = 1;
let history = [];
let notifications = [];


// Helper: Send JSON response
const sendJSON = (res, status, data) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};


// Helper: Log task history for auditability
const logHistory = (action, task) => {
  history.push({
    timestamp: new Date().toISOString(),
    action,
    task: { ...task }
  });
};


// Helper: Add a notification message
const notify = message => {
  notifications.push({
    timestamp: new Date().toISOString(),
    message
  });
};


// Helper: Send 404 response
const notFound = res => sendJSON(res, 404, { error: 'Not found' });


// Helper: Parse JSON body from request
const parseBody = (req, callback) => {
  const decoder = new StringDecoder('utf8');
  let buffer = '';
  req.on('data', chunk => { buffer += decoder.write(chunk); });
  req.on('end', () => {
    buffer += decoder.end();
    try {
      callback(JSON.parse(buffer));
    } catch {
      callback(null);
    }
  });
};


// Main HTTP server: handles all RESTful API routes
const server = http.createServer((req, res) => {
  const { pathname } = parse(req.url, true);
  const path = pathname.replace(/\/$/, '');
  const { method } = req;

  // GET /tasks/notifications (innovative: see recent notifications)
  if (method === 'GET' && path === '/tasks/notifications') {
    // Return the 10 most recent notifications
    return sendJSON(res, 200, notifications.slice(-10));
  }

  // GET /tasks/history (innovative: see recent task history)
  if (method === 'GET' && path === '/tasks/history') {
    // Return the 10 most recent task history events
    return sendJSON(res, 200, history.slice(-10));
  }

  // GET /tasks - List all tasks
  if (method === 'GET' && path === '/tasks') {
    return sendJSON(res, 200, tasks);
  }

  // POST /tasks - Create a new task
  if (method === 'POST' && path === '/tasks') {
    return parseBody(req, body => {
      if (!body || typeof body.title !== 'string' || !body.title.trim()) {
        return sendJSON(res, 400, { error: 'Title is required' });
      }
      const task = {
        id: `${nextId++}`,
        title: body.title.trim(),
        completed: Boolean(body.completed)
      };
      tasks = [...tasks, task];
      logHistory('created', task);
      notify(`Task created: ${task.title}`);
      sendJSON(res, 201, task);
    });
  }

  // GET /tasks/:id - Get a specific task
  if (method === 'GET' && path.startsWith('/tasks/')) {
    const [, , id] = path.split('/');
    const task = tasks.find(({ id: tid }) => tid === id);
    if (!task) return notFound(res);
    return sendJSON(res, 200, task);
  }

  // PUT /tasks/:id - Update a task
  if (method === 'PUT' && path.startsWith('/tasks/')) {
    const [, , id] = path.split('/');
    const idx = tasks.findIndex(({ id: tid }) => tid === id);
    if (idx === -1) return notFound(res);
    return parseBody(req, body => {
      if (!body || typeof body.title !== 'string' || !body.title.trim()) {
        return sendJSON(res, 400, { error: 'Title is required' });
      }
      const updated = {
        ...tasks[idx],
        title: body.title.trim(),
        completed: Boolean(body.completed)
      };
      tasks = tasks.map((t, i) => (i === idx ? updated : t));
      logHistory('updated', updated);
      notify(`Task updated: ${updated.title}`);
      sendJSON(res, 200, updated);
    });
  }

  // DELETE /tasks/:id - Delete a task
  if (method === 'DELETE' && path.startsWith('/tasks/')) {
    const [, , id] = path.split('/');
    const idx = tasks.findIndex(({ id: tid }) => tid === id);
    if (idx === -1) return notFound(res);
    const [deleted] = tasks.splice(idx, 1);
    logHistory('deleted', deleted);
    notify(`Task deleted: ${deleted.title}`);
    return sendJSON(res, 200, deleted);
  }

  // Not found for all other routes
  notFound(res);
});


// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`To-Do backend running on port ${PORT}`);
});
