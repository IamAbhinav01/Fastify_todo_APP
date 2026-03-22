const fp = require('fastify-plugin');
class TodoService {
  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }
  async getAll() {
    return this.todoRepository.getAll();
  }
  async getOne(id) {
    return this.todoRepository.getOne(id);
  }
  async create(todotext) {
    return this.todoRepository.create(todotext);
  }
  async deleteOne(id) {
    return this.todoRepository.deleteOne(id);
  }
  async deleteAll() {
    return this.todoRepository.deleteAll();
  }
}

async function todoService(fastify, options) {
  const { todoRepository } = fastify;
  const service = new TodoService(todoRepository);
  fastify.decorate('todoService', service);
}
module.exports = fp(todoService);
