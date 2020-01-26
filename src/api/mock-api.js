import { Server, Model, Factory } from "miragejs";
import faker from "faker";

export const createMockApi = () => {
  // Create server instance
  const server = new Server({
    /**
     * Models
     */
    models: {
      todo: Model.extend(),
    },

    /**
     * Factories
     */
    factories: {
      todo: Factory.extend({
        title(_) {
          return faker.lorem.sentence();
        },
        isCompleted(i) {
          return i % 2 === 0;
        },
      }),
    },

    /**
     * Seeding data
     */
    seeds(server) {
      server.createList("todo", 8);
    },

    // Routes
    routes() {
      this.namespace = "api";

      // Fetch todos
      this.get("/todos/:status", (schema, request) => {
        const status = request.params.status;

        switch (status) {
          case "complete":
            return schema.todos.where({ isCompleted: true });
          case "incomplete":
            return schema.todos.where({ isCompleted: false });
          default:
            return schema.todos.all();
        }
      });

      // Create a to-do
      this.post("/todos", (schema, request) => {
        const { title = "" } = JSON.parse(request.requestBody);
        return schema.todos.create({ title, isCompleted: false })
      });

      // Update a to-do
      this.put("/todos/:id", (schema, request) => {
        const todo = schema.todos.find(request.params.id);
        const body = JSON.parse(request.requestBody);
        return todo.update(body);
      })

      // Delete a to-do
      this.del("/todos/:id", (schema, request) => {
        const todo = schema.todos.find(request.params.id);
        return todo.destroy();
      })
    },
  });

  return server;
};
