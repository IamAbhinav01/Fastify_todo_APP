const fp = require('fastify-plugin');
const apiRouter = require('./routes/api/apiRouter');
const db = require('./db/index');
const todoRepository = require('./repositories/todo.repository');
const todoService = require('./services/Todo.service');

async function app(fastify, options) {
  await fastify.register(db);
  await fastify.register(todoRepository);
  await fastify.register(todoService);
  await fastify.register(apiRouter, { prefix: '/api' });
}
module.exports = fp(app);
