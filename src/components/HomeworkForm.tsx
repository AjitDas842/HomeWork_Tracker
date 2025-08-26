import React, { useState } from 'react';
import { X, Calendar, Book, AlertCircle, FileText } from 'lucide-react';
import { HomeworkFormData } from '../types/homework';

interface HomeworkFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (homework: HomeworkFormData) => void;
  initialData?: HomeworkFormData;
}

const subjects = [
  'Mathematics', 'Science', 'English', 'History', 'Geography', 
  'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Art', 'Other'
];

const priorities = [
  { value: 'low' as const, label: 'Low', color: 'text-green-600 bg-green-50' },
  { value: 'medium' as const, label: 'Medium', color: 'text-yellow-600 bg-yellow-50' },
  { value: 'high' as const, label: 'High', color: 'text-red-600 bg-red-50' }
];

const HomeworkForm: React.FC<HomeworkFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<HomeworkFormData>(
    initialData || {
      title: '',
      subject: '',
      description: '',
      dueDate: new Date(),
      priority: 'medium'
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      subject: '',
      description: '',
      dueDate: new Date(),
      priority: 'medium'
    });
    onClose();
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().slice(0, 16);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Add New Homework</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 mr-2 text-gray-400" />
              Assignment Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Enter assignment title..."
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Book className="w-4 h-4 mr-2 text-gray-400" />
              Subject
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
              required
            >
              <option value="">Select a subject</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Add any additional details..."
              rows={3}
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              Due Date & Time
            </label>
            <input
              type="datetime-local"
              value={formatDateForInput(formData.dueDate)}
              onChange={(e) => setFormData(prev => ({ ...prev, dueDate: new Date(e.target.value) }))}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <AlertCircle className="w-4 h-4 mr-2 text-gray-400" />
              Priority Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {priorities.map(priority => (
                <button
                  key={priority.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
                  className={`px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all ${
                    formData.priority === priority.value
                      ? `${priority.color} border-current`
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {priority.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all transform hover:scale-105"
            >
              Add Homework
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeworkForm;