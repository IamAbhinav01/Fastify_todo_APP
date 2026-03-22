import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
      className="flex gap-2 w-full max-w-2xl mb-8"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-6 py-4 rounded-2xl bg-slate-800/50 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all glass"
      />
      <button
        type="submit"
        className="px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl transition-all flex items-center gap-2 font-semibold shadow-lg shadow-blue-500/20 active:scale-95"
      >
        <Plus size={20} />
        <span className="hidden sm:inline">Add Task</span>
      </button>
    </motion.form>
  );
};

export default AddTodo;
