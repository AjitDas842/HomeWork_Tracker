import React from 'react';
import { BookOpen, Plus } from 'lucide-react';

interface EmptyStateProps {
  onAddHomework: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddHomework }) => {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-12 h-12 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No homework assignments yet</h3>
        <p className="text-gray-500 mb-6 leading-relaxed">
          Get started by adding your first homework assignment. Stay organized and never miss a deadline!
        </p>
        <button
          onClick={onAddHomework}
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-4 h-4" />
          <span>Add Your First Homework</span>
        </button>
      </div>
    </div>
  );
};

export default EmptyState;