// Simple test suite for the To-Do backend using Node.js core modules
// Run with: node test.js (server must be running)

const http = require('http');

const BASE = 'http://localhost:3000';

const request = (method, path, data) => new Promise((resolve, reject) => {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };
  const req = http.request(BASE + path, opts, res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      try {
        resolve({ status: res.statusCode, body: JSON.parse(body) });
      } catch {
        resolve({ status: res.statusCode, body });
      }
    });
  });
  req.on('error', reject);
  if (data) req.write(JSON.stringify(data));
  req.end();
});

(async () => {
  // 1. Create a task
  const create = await request('POST', '/tasks', { title: 'Test Task' });
  console.log('Create:', create);

  // 2. List all tasks
  const list = await request('GET', '/tasks');
  console.log('List:', list);

  // 3. Get the created task
  const id = create.body.id;
  const get = await request('GET', `/tasks/${id}`);
  console.log('Get:', get);

  // 4. Update the task
  const update = await request('PUT', `/tasks/${id}`, { title: 'Updated Task', completed: true });
  console.log('Update:', update);

  // 5. Delete the task
  const del = await request('DELETE', `/tasks/${id}`);
  console.log('Delete:', del);

  // 6. Check notifications
  const notifications = await request('GET', '/tasks/notifications');
  console.log('Notifications:', notifications);

  // 7. Check history
  const history = await request('GET', '/tasks/history');
  console.log('History:', history);
})();
