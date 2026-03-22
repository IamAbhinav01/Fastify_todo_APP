import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare } from 'lucide-react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { todoService } from './services/api';
import type { Todo } from './services/api';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getAll();
      setTodos(data || []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      setError('Could not connect to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (text: string) => {
    try {
      const updatedTodos = await todoService.create(text);
      setTodos(updatedTodos);
      setError(null);
    } catch (err) {
      console.error('Failed to create todo:', err);
      setError('Failed to add task. Is the server running?');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const updatedTodos = await todoService.delete(id);
      setTodos(updatedTodos);
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all tasks?')) return;
    try {
      const updatedTodos = await todoService.clearAll();
      setTodos(updatedTodos);
    } catch (err) {
      console.error('Failed to clear todos:', err);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-12 px-6 bg-[#0f172a] text-slate-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center mb-12"
      >
        <div className="p-3 bg-blue-500/20 rounded-2xl mb-4 border border-blue-500/30">
          <CheckSquare className="text-blue-400" size={40} />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight mb-2">
          Todo <span className="gradient-text">Fastify</span>
        </h1>
        <p className="text-slate-400 text-lg">A premium task management experience</p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      <AddTodo onAdd={handleAddTodo} />

      {loading ? (
        <div className="flex flex-col items-center gap-4 py-20">
          <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-500 animate-pulse">Syncing with server...</p>
        </div>
      ) : (
        <>
          <TodoList todos={todos} onDelete={handleDeleteTodo} />
          {todos.length > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleClearAll}
              className="mt-8 text-slate-500 hover:text-red-400 text-sm font-medium transition-colors cursor-pointer"
            >
              Clear All Tasks
            </motion.button>
          )}
        </>
      )
      }

      <footer className="mt-auto pt-20 text-slate-600 text-sm">
        Built with Fastify, React & Tailwind CSS
      </footer>
    </div>
  );
}

export default App;
