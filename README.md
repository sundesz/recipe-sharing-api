# My Recipe API

This is a RESTful API for a recipe sharing platform that allows users to create, view, update, delete and search for recipes. It uses NEXT.js API Routes with TypeScript, Prisma and PostgreSQL for server-side handling.

## API Endpoints

The API has the following endpoints:

### Recipes

- `GET /api/v1/recipes`
  - Get All Recipes
  - Method: GET
  - Request Params: { "q" } _to search recipe by title_
  - Response: Array of recipes.
- `GET /api/v1/recipes/:id`
  - Get a specific recipe by ID.
  - Method: GET
  - Response: Recipe object.
- `POST /api/v1/recipes`
  - Create a new recipe.
  - Method: POST
  - Request Body: { "title", "category", "instruction", "tags", "ingredients" }
  - Response: Created recipe object.
- `PUT /api/v1/recipes/:id`
  - Update a recipe by ID.
  - Method: PUT
  - Request Body: { "title", "category", "instruction", "tags", "ingredients" } **all optionals**
  - Response: Update recipe object.
- `DELETE /api/v1/recipes/:id`
  - Delete a recipe by ID.
  - Method: DELETE
  - Response: 204

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/recipe-sharing-api.git
   cd recipe-sharing-api
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set environment variables:
   ```bash
   Create a `.env` file with following setting
    - POSTGRES_URL
    - POSTGRES_PRISMA_URL
    - POSTGRES_URL_NON_POOLING
    - POSTGRES_USER
    - POSTGRES_HOST
    - POSTGRES_PASSWORD
    - POSTGRES_DATABASE
   ```

### Usage

Start the development server:

```bash
npm run dev
```

The server will run at `http://localhost:5000` (or the specified port) by default.

## Built With

- Next.js - The React Framework for Production
- Prisma - Modern Database Access for TypeScript & Node.js
- PostgreSQL - Powerful, Open Source Object-Relational Database System
- TypeScript - Superset of JavaScript that adds types to the language
- Axios - Promise-based HTTP client for Node.js and the browser
