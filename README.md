# Food Delivery App

A full-stack food delivery project with a Node.js/Express backend and a static frontend.

## Project structure

- `backend/` - Express API server
  - `server.js` - entry point
  - `src/app.js` - Express application configuration
  - `src/config/ENV.config.js` - environment validation and config
  - `src/controllers/` - auth, order, product controllers
  - `src/routes/` - API routes
  - `src/models/` - Mongoose models
  - `src/middlewares/` - authentication middleware
  - `src/services/` - business logic services
- `frontend/` - static web UI
  - `index.html`, `signin.html`, `signup.html`, `checkout.html`
  - JavaScript files: `main.js`, `script.js`, `checkout.js`, `handleSignUp.js`
  - styles: `style.css`, `styling/my_style.css`

## Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with the required environment variables:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-secret-key>
   ```
4. Run the server in development mode:
   ```bash
   npm run dev
   ```

The backend listens on port `3000` and exposes these route prefixes:

- `POST /api/auth/...`
- `GET|POST /api/product/...`
- `POST /api/order/...`

## API Endpoints

### Authentication

#### POST `/api/auth/signUp`
- Description: register a new user
- Request body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "P@ssw0rd",
    "conformPassword": "P@ssw0rd"
  }
  ```
- Success response:
  ```json
  {
    "success": true,
    "message": "User registration Successfull",
    "data": {
      "_id": "<user id>",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "<jwt token>"
  }
  ```

#### POST `/api/auth/signIn`
- Description: log in an existing user
- Request body:
  ```json
  {
    "email": "john@example.com",
    "password": "P@ssw0rd"
  }
  ```
- Success response:
  ```json
  {
    "success": true,
    "message": "SignIn success",
    "data": {
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
  ```
- Notes: on successful login a `token` cookie is set in the response.

### Products

#### GET `/api/product/get-all-products`
- Description: fetch all available products
- Success response:
  ```json
  {
    "success": true,
    "message": "All product fetch succesull",
    "data": [
      {
        "_id": "<product id>",
        "name": "Burger",
        "price": 5.99,
        "image": "<image url>",
        "category": "fast food",
        "createdAt": "<timestamp>",
        "updatedAt": "<timestamp>",
        "__v": 0
      }
    ]
  }
  ```

#### POST `/api/product/create-new-product`
- Description: create a new product (admin only)
- Authorization: requires valid JWT token in cookie or `Authorization: Bearer <token>` header
- Request body:
  ```json
  {
    "name": "Burger",
    "price": 5.99,
    "image": "https://example.com/burger.jpg",
    "category": "fast food"
  }
  ```
- Success response:
  ```json
  {
    "success": true,
    "message": "Product Add successfully",
    "data": {
      "_id": "<product id>",
      "name": "Burger",
      "price": 5.99,
      "image": "https://example.com/burger.jpg",
      "category": "fast food",
      "createdAt": "<timestamp>",
      "updatedAt": "<timestamp>",
      "__v": 0
    }
  }
  ```

### Orders

#### POST `/api/order/place-order`
- Description: place a new order for the authenticated user
- Authorization: requires valid JWT token in cookie or `Authorization: Bearer <token>` header
- Request body:
  ```json
  {
    "name": "John Doe",
    "address": "123 Main St",
    "phone": "1234567890",
    "cart": [
      {
        "_id": "<product id>",
        "name": "Burger",
        "price": 5.99,
        "quantity": 2
      }
    ]
  }
  ```
- Current behavior: request validation is performed, but the controller does not return a final JSON response on success. In error cases it returns HTTP `400` with a message.

## Response format

Most API responses share this structure:

```json
{
  "success": true | false,
  "message": "<description>",
  "data": <object | array | null>
}
```

- `success`: boolean status of the request
- `message`: human-readable description of the result
- `data`: returned payload, or `null` for errors

## Frontend Usage

The frontend is static and can be opened directly in a browser from `frontend/`.

1. Open `frontend/index.html` in your browser.
2. Alternatively, serve the `frontend/` folder with a simple static server.
3. The frontend expects the backend API to be running at `http://localhost:3000`.

## Environment variables

The backend requires:

- `MONGO_URI` - MongoDB connection URL
- `JWT_SECRET` - JWT signing secret

## Notes

- CORS is configured for `http://localhost:5500` and `http://localhost:5501`.
- If you want to deploy the frontend from a different origin, update CORS origins in `backend/src/app.js`.

## Getting help

If you need to troubleshoot, verify that MongoDB is running and that the `.env` values are correct.
