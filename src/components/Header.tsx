import React from 'react';
import { BookOpen, Plus } from 'lucide-react';

interface HeaderProps {
  onAddHomework: () => void;
  totalHomework: number;
  completedHomework: number;
}

const Header: React.FC<HeaderProps> = ({ onAddHomework, totalHomework, completedHomework }) => {
  const completionPercentage = totalHomework > 0 ? Math.round((completedHomework / totalHomework) * 100) : 0;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-xl">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Homework Tracker</h1>
                <p className="text-sm text-gray-500">Stay organized and never miss a deadline</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{completionPercentage}%</div>
              <div className="text-xs text-gray-500">
                {completedHomework} of {totalHomework} completed
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            <button
              onClick={onAddHomework}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">Add Homework</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;