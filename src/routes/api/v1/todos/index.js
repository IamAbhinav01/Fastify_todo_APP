async function todoRouter(fastify, options) {
  fastify.get('/get-todos', () => {
    return 'todos';
  });
}
module.exports = todoRouter;
