import React from 'react';
import { Check, Clock, AlertTriangle, Calendar, Trash2, Edit3 } from 'lucide-react';
import { Homework } from '../types/homework';
import { formatDate, formatTime, isOverdue, isDueToday, isDueSoon, getDaysUntilDue } from '../utils/dateUtils';

interface HomeworkItemProps {
  homework: Homework;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (homework: Homework) => void;
}

const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'medium':
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'low':
      return 'bg-green-50 text-green-700 border-green-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

const getStatusStyles = (homework: Homework) => {
  if (homework.isCompleted) {
    return 'bg-green-50 border-green-200';
  }
  if (isOverdue(homework.dueDate)) {
    return 'bg-red-50 border-red-200';
  }
  if (isDueToday(homework.dueDate)) {
    return 'bg-orange-50 border-orange-200';
  }
  if (isDueSoon(homework.dueDate)) {
    return 'bg-yellow-50 border-yellow-200';
  }
  return 'bg-white border-gray-200';
};

const getStatusIcon = (homework: Homework) => {
  if (homework.isCompleted) {
    return <Check className="w-4 h-4 text-green-600" />;
  }
  if (isOverdue(homework.dueDate)) {
    return <AlertTriangle className="w-4 h-4 text-red-600" />;
  }
  return <Clock className="w-4 h-4 text-gray-400" />;
};

const getStatusText = (homework: Homework) => {
  if (homework.isCompleted) {
    return 'Completed';
  }
  if (isOverdue(homework.dueDate)) {
    const daysOverdue = Math.abs(getDaysUntilDue(homework.dueDate));
    return `${daysOverdue} day${daysOverdue === 1 ? '' : 's'} overdue`;
  }
  if (isDueToday(homework.dueDate)) {
    return 'Due today';
  }
  const daysUntil = getDaysUntilDue(homework.dueDate);
  if (daysUntil > 0) {
    return `Due in ${daysUntil} day${daysUntil === 1 ? '' : 's'}`;
  }
  return 'Due today';
};

const HomeworkItem: React.FC<HomeworkItemProps> = ({ homework, onToggleComplete, onDelete, onEdit }) => {
  return (
    <div className={`p-6 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg ${getStatusStyles(homework)} ${homework.isCompleted ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          <button
            onClick={() => onToggleComplete(homework.id)}
            className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
              homework.isCompleted
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
            }`}
          >
            {homework.isCompleted && <Check className="w-4 h-4" />}
          </button>

          <div className="flex-1 space-y-3">
            <div>
              <h3 className={`text-lg font-semibold leading-snug ${homework.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {homework.title}
              </h3>
              {homework.description && (
                <p className={`text-sm mt-1 leading-relaxed ${homework.isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
                  {homework.description}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-4 text-sm">
              <span className={`px-3 py-1 rounded-full font-medium ${getPriorityStyles(homework.priority)}`}>
                {homework.priority.charAt(0).toUpperCase() + homework.priority.slice(1)} Priority
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                {homework.subject}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(homework.dueDate)} at {formatTime(homework.dueDate)}</span>
              </div>

              <div className="flex items-center space-x-2">
                {getStatusIcon(homework)}
                <span className={`text-sm font-medium ${
                  homework.isCompleted ? 'text-green-600' : 
                  isOverdue(homework.dueDate) ? 'text-red-600' :
                  isDueToday(homework.dueDate) ? 'text-orange-600' : 'text-gray-600'
                }`}>
                  {getStatusText(homework)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEdit(homework)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(homework.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeworkItem;