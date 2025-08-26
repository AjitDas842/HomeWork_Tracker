import { useState, useEffect } from 'react';
import { Homework, HomeworkFormData } from '../types/homework';

const STORAGE_KEY = 'homework-tracker-data';

export const useHomework = () => {
  const [homework, setHomework] = useState<Homework[]>([]);

  // Load data from localStorage on initial mount
  useEffect(() => {
    const savedHomework = localStorage.getItem(STORAGE_KEY);
    if (savedHomework) {
      try {
        const parsed = JSON.parse(savedHomework);
        const homeworkWithDates = parsed.map((hw: any) => ({
          ...hw,
          dueDate: new Date(hw.dueDate),
          createdAt: new Date(hw.createdAt)
        }));
        setHomework(homeworkWithDates);
      } catch (error) {
        console.error('Error loading homework from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever homework changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(homework));
  }, [homework]);

  const addHomework = (homeworkData: HomeworkFormData) => {
    const newHomework: Homework = {
      id: crypto.randomUUID(),
      ...homeworkData,
      isCompleted: false,
      createdAt: new Date()
    };
    setHomework(prev => [...prev, newHomework]);
  };

  const updateHomework = (id: string, updates: Partial<Homework>) => {
    setHomework(prev => prev.map(hw => 
      hw.id === id ? { ...hw, ...updates } : hw
    ));
  };

  const deleteHomework = (id: string) => {
    setHomework(prev => prev.filter(hw => hw.id !== id));
  };

  const toggleComplete = (id: string) => {
    updateHomework(id, { 
      isCompleted: !homework.find(hw => hw.id === id)?.isCompleted 
    });
  };

  return {
    homework,
    addHomework,
    updateHomework,
    deleteHomework,
    toggleComplete
  };
};