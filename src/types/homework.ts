export interface Homework {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  isCompleted: boolean;
  createdAt: Date;
}

export type HomeworkFormData = Omit<Homework, 'id' | 'createdAt' | 'isCompleted'>;