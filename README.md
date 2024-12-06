# Blog API

A RESTful API for managing blog posts, built with NestJS, TypeORM, PostgreSQL, and Firebase Authentication. This project includes support for CRUD operations, file uploads, and secure access with Firebase Authentication.

---

## **Features**
- CRUD operations for blog posts.
- Role-based access control (Admin, Writer).
- Image upload and storage.
- Secure API endpoints with Firebase Authentication.
- Database schema management using TypeORM migrations.

---

 
## **Database Migrations**

### **1. Run Migrations**
Apply existing migrations to set up your database schema:
```bash
npm run typeorm -- migration:run -d ./data-source.ts
```

### **2. Generate New Migrations**
If you've updated or added new entities and need to create a new migration file, run:
```bash
npm run typeorm -- migration:generate src/migrations/CreatePostsTable -d ./data-source.ts
```

---

## **API Testing**

### **1. Generate Test Token**
To test secured API endpoints, you need a Firebase Authentication token. Use the following command to generate a token:
```bash
node generate-token.mjs
```

The generated token will appear in the terminal. Use it in Swagger or Postman to authenticate API requests.

### **2. Swagger Documentation**
The API documentation is available in Swagger.

1. Start the server:
   ```bash
   npm run start
   ```
2. Open Swagger in your browser at [http://localhost:3000/api](http://localhost:3000/api).
3. Click on the "Authorize" button and paste the token generated from `node generate-token.mjs`.
4. Test the available endpoints.

---




 
