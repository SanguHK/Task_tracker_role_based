import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Scalable API Assignment",
      version: "1.0.0",
      description: "Auth + Tasks CRUD with RBAC"
    },
    servers: [{ url: "http://localhost:8080" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: []
};

const spec = swaggerJSDoc(options);

// Define minimal paths programmatically to keep single-file example
spec.paths = {
  "/api/v1/auth/register": {
    post: {
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                email: { type: "string", format: "email" },
                password: { type: "string" },
                role: { type: "string", enum: ["user", "admin"] }
              },
              required: ["name", "email", "password"]
            }
          }
        }
      },
      responses: { "201": { description: "Created" } }
    }
  },
  "/api/v1/auth/login": {
    post: {
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string", format: "email" },
                password: { type: "string" }
              },
              required: ["email", "password"]
            }
          }
        }
      },
      responses: { "200": { description: "OK" } }
    }
  },
  "/api/v1/tasks": {
    get: { tags: ["Tasks"], responses: { "200": { description: "OK" } } },
    post: {
      tags: ["Tasks"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                status: { type: "string", enum: ["todo", "in_progress", "done"] }
              },
              required: ["title"]
            }
          }
        }
      },
      responses: { "201": { description: "Created" } }
    }
  },
  "/api/v1/tasks/{id}": {
    get: {
      tags: ["Tasks"],
      parameters: [{ in: "path", name: "id", schema: { type: "string" } }],
      responses: { "200": { description: "OK" }, "404": { description: "Not found" } }
    },
    put: {
      tags: ["Tasks"],
      parameters: [{ in: "path", name: "id", schema: { type: "string" } }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                status: { type: "string", enum: ["todo", "in_progress", "done"] }
              }
            }
          }
        }
      },
      responses: { "200": { description: "OK" } }
    },
    delete: {
      tags: ["Tasks"],
      parameters: [{ in: "path", name: "id", schema: { type: "string" } }],
      responses: { "204": { description: "No Content" } }
    }
  }
};

export default spec;
