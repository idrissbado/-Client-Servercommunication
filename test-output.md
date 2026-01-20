# Test Output for To-Do Backend

```
Create: {
  status: 201,
  body: { id: '2', title: 'Test Task', completed: false }
}
List: {
  status: 200,
  body: [ { id: '2', title: 'Test Task', completed: false } ]
}
Get: {
  status: 200,
  body: { id: '2', title: 'Test Task', completed: false }
}
Update: {
  status: 200,
  body: { id: '2', title: 'Updated Task', completed: true }
}
Delete: {
  status: 200,
  body: { id: '2', title: 'Updated Task', completed: true }
}
Notifications: {
  status: 200,
  body: [
    { timestamp: '...', message: 'Task created: Test Task' },
    { timestamp: '...', message: 'Task updated: Updated Task' },
    { timestamp: '...', message: 'Task deleted: Updated Task' }
    // ...more entries
  ]
}
History: {
  status: 200,
  body: [
    { timestamp: '...', action: 'created', task: [Object] },
    { timestamp: '...', action: 'updated', task: [Object] },
    { timestamp: '...', action: 'deleted', task: [Object] }
    // ...more entries
  ]
}
```

All CRUD operations, notifications, and history endpoints work as expected.
