const http = require('http');
const { parse } = require('url');
const { StringDecoder } = require('string_decoder');

let tasks = [];
let nextId = 1;

function sendJSON(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function notFound(res) {
  sendJSON(res, 404, { error: 'Not found' });
}

function parseBody(req, callback) {
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
}

const server = http.createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const path = parsedUrl.pathname.replace(/\/$/, '');
  const method = req.method;

  // GET /tasks
  if (method === 'GET' && path === '/tasks') {
    return sendJSON(res, 200, tasks);
  }

  // POST /tasks
  if (method === 'POST' && path === '/tasks') {
    return parseBody(req, body => {
      if (!body || typeof body.title !== 'string' || !body.title.trim()) {
        return sendJSON(res, 400, { error: 'Title is required' });
      }
      const task = {
        id: String(nextId++),
        title: body.title.trim(),
        completed: !!body.completed
      };
      tasks.push(task);
      sendJSON(res, 201, task);
    });
  }

  // GET /tasks/:id
  if (method === 'GET' && path.startsWith('/tasks/')) {
    const id = path.split('/')[2];
    const task = tasks.find(t => t.id === id);
    if (!task) return notFound(res);
    return sendJSON(res, 200, task);
  }

  // PUT /tasks/:id
  if (method === 'PUT' && path.startsWith('/tasks/')) {
    const id = path.split('/')[2];
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return notFound(res);
    return parseBody(req, body => {
      if (!body || typeof body.title !== 'string' || !body.title.trim()) {
        return sendJSON(res, 400, { error: 'Title is required' });
      }
      tasks[idx] = {
        ...tasks[idx],
        title: body.title.trim(),
        completed: !!body.completed
      };
      sendJSON(res, 200, tasks[idx]);
    });
  }

  // DELETE /tasks/:id
  if (method === 'DELETE' && path.startsWith('/tasks/')) {
    const id = path.split('/')[2];
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return notFound(res);
    const deleted = tasks.splice(idx, 1)[0];
    return sendJSON(res, 200, deleted);
  }

  // Not found
  notFound(res);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`To-Do backend running on port ${PORT}`);
});
