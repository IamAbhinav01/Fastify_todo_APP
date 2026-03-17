const Fastify = require('fastify');
const { PORT } = require('./config/server.config');
const app = require('./app');

const fastify = Fastify({
  logger: true,
});

fastify.register(app);
fastify.get('/', (req, res) => {
  res.send({ hello: 'world' });
});

fastify.listen({ port: PORT }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`server is running on PORT ${PORT}`);
});
