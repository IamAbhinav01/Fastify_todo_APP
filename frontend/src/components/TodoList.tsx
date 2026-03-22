import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import type { Todo } from '../services/api';

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
  if (todos.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 text-slate-500"
      >
        <p className="text-xl font-medium">Your list is empty</p>
        <p className="text-sm">Add a task to get started!</p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-2xl space-y-3">
      <AnimatePresence mode="popLayout">
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:border-slate-600/50 transition-all glass"
          >
            <div className="flex-1 flex items-center gap-3">
               <span className="text-slate-100 font-medium">{todo.text}</span>
            </div>
            
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button 
                 onClick={() => onDelete(todo.id)}
                 className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer"
                 title="Delete task"
               >
                 <Trash2 size={18} />
               </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TodoList;
