# Social Connect API

This project is a RESTful API for a social media platform, allowing users to register, create posts, interact with posts, and manage user profiles.

## Features

- **User Authentication:** Register and login functionalities with JWT-based authentication.
- **Post Management:** Create, retrieve, update, and delete posts.
- **User Profile:** Manage user profiles, including creation and updates.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose ORM)
- JSON Web Tokens (JWT) for authentication
- Redis (for optional token blacklisting)

## Getting Started

### Prerequisites

- Node.js (version 18.X.X or higher)
- MongoDB
- Redis (optional, for token blacklisting)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/daviesbrown/social-connect-api.git
   ```

2. Install dependencies:

   ```bash
   cd social-connect-api
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/social_media_api
   JWT_SECRET=your_jwt_secret_key
   ```

### Usage

1. Start the server:

   ```bash
   npm run start-dev
   ```

2. Access the API endpoints using a tool like Postman:

   Base URL: `http://localhost:3000`

   - Register a user: `POST /auth/register`
   - Login: `POST /auth/login`
   - Create, retrieve, update, delete posts: `/posts` endpoints
   - Manage user profiles: `/users` endpoints

### Authentication

- For protected routes, include an `Authorization` header in the request with the `<token>` format.
- Use the JWT token obtained after login for accessing protected routes.

### Additional Notes

- Modify the environment variables and configurations as needed.
- Implement Redis for token blacklisting by following the provided examples in the code.
### App Routes
```
GET /status: Checks status of server
GET /stats: Checks stats of db and redis
```
### Auth Routes
```
POST /auth/register: Register a new user
POST /auth/login: Logs in a user
POST /auth/logout: Logout a user
```
### User Routes
```
GET /users/:id: Gets a user by id
PUT /users/:id: Updates a user's profile
DELETE /users/:id: Delete a user's profile
PUT /users/:id/follow: Follow a user
PUT /users/:id/unfollow: Unfollow a user
```
### Post Routes
```
POST /posts: Creates a new post
GET /posts/:id: Get a post by id
PUT /posts/:id: Update a post by id
DELETE /posts/:id: Delete a post by id
PUT /posts/:id/like: Likes or unlike a post by id
PUT /posts/:id/comment: Comment on a post
GET /posts/:id/timeline: Gets all user's related post
```

## Contributors

- Nwosu David (@nwosudavid)

## License

This project is licensed under the [MIT License](LICENSE).
