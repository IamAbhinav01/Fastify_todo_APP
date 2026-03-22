const {
  getAllTodos,
  createTodo,
  getOneTodo,
  deleteOneTodo,
  deleteAllTodos,
} = require('../../../../controllers/todo.controller');

async function todoRouter(fastify, options) {
  fastify.get('/', getAllTodos);
  fastify.post('/', createTodo);
  fastify.get('/:id', getOneTodo);
  fastify.delete('/:id', deleteOneTodo);
  fastify.delete('/', deleteAllTodos);
}
module.exports = todoRouter;
