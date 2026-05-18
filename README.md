# Mini CRM MERN Assignment

Mini CRM built with React, React Router, Axios, MUI, Node.js, Express.js, MongoDB, Mongoose, JWT access tokens, and bcrypt.

## Modules

- Authentication with JWT access token and bcrypt password hashing
- Dashboard with aggregation APIs
- Leads CRUD with status updates, pagination, search, filters, and soft delete
- Companies list/detail pages with associated leads
- Tasks for leads, task assignment to users, and assigned-user-only task status updates

## Local Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mini_crm
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

`MONGO_URI` is the backend MongoDB connection string. Use the local URI above if MongoDB is running on your machine, or replace it with a MongoDB Atlas URI.

3. Seed demo users and records:

```bash
npm run seed
```

4. Start the app:

```bash
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000/api`

## Demo Login

- Admin: `admin@minicrm.com` / `Password@123`
- Sales user: `john@minicrm.com` / `Password@123`
- Sales user: `anita@minicrm.com` / `Password@123`

You can also create a new sales user from the signup option on the login page.

## Authorization Logic

All protected routes require an `Authorization: Bearer <token>` header. The backend verifies the JWT, loads the active user, and attaches it to `req.user`.

Task status updates are restricted in `PATCH /api/tasks/:id/status`: only the task's assigned user can update its status. Admins can create and assign tasks, but the assignment rule is still enforced for status changes to match the assignment note. Lead deletion is a soft delete that sets `isDeleted=true` and `deletedAt`; normal lead queries always include `isDeleted: false`.

## Deployment Notes

- Deploy `frontend` to Netlify with build command `npm run build` and publish directory `dist`.
- Set `VITE_API_URL` in Netlify to the deployed backend API URL, for example `https://your-api.onrender.com/api`.
- Deploy `backend` to Render/Railway/Fly with `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL` environment variables.
