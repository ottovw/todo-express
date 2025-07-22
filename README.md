# Todo Express API

A simple REST API for managing todos built with Express.js.

## Features

- Create new todos
- Get all todos
- Get a specific todo by ID
- Update existing todos
- Delete todos
- Mark todos as completed/incomplete

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on port 3000 by default.

## Testing the API

Use the `api-tests.http` file to test all endpoints with httpYac or JetBrains IDEs (IntelliJ IDEA, WebStorm, etc.).

## API Endpoints

### Get all todos
```
GET /api/todos
```

### Get a specific todo
```
GET /api/todos/:id
```

### Create a new todo
```
POST /api/todos
Content-Type: application/json

{
  "title": "Todo title",
  "description": "Todo description"
}
```

### Update a todo
```
PUT /api/todos/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true
}
```

### Delete a todo
```
DELETE /api/todos/:id
```

## Todo Structure

```json
{
  "id": "unique-uuid",
  "title": "Todo title",
  "description": "Todo description",
  "completed": false,
  "createdAt": "2025-07-22T10:00:00.000Z",
  "updatedAt": "2025-07-22T10:00:00.000Z"
}
```

## License

MIT
