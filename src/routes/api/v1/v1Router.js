const todoRouter = require('./todos/index.js');
async function v1Router(fastify, options) {
  fastify.register(todoRouter, { prefix: '/todos' });
}
module.exports = v1Router;
