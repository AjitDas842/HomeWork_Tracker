import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import HomeworkForm from './components/HomeworkForm';
import HomeworkItem from './components/HomeworkItem';
import FilterBar from './components/FilterBar';
import EmptyState from './components/EmptyState';
import { useHomework } from './hooks/useHomework';
import { Homework } from './types/homework';

function App() {
  const { homework, addHomework, updateHomework, deleteHomework, toggleComplete } = useHomework();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHomework, setEditingHomework] = useState<Homework | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortBy, setSortBy] = useState('dueDate');

  const subjects = useMemo(() => {
    const subjectSet = new Set(homework.map(hw => hw.subject));
    return Array.from(subjectSet).sort();
  }, [homework]);

  const filteredAndSortedHomework = useMemo(() => {
    let filtered = homework.filter(hw => {
      const matchesSearch = hw.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hw.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = !selectedSubject || hw.subject === selectedSubject;
      const matchesPriority = !selectedPriority || hw.priority === selectedPriority;
      const matchesCompleted = showCompleted || !hw.isCompleted;
      
      return matchesSearch && matchesSubject && matchesPriority && matchesCompleted;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return a.dueDate.getTime() - b.dueDate.getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'subject':
          return a.subject.localeCompare(b.subject);
        case 'created':
          return b.createdAt.getTime() - a.createdAt.getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [homework, searchTerm, selectedSubject, selectedPriority, showCompleted, sortBy]);

  const completedCount = homework.filter(hw => hw.isCompleted).length;

  const handleEdit = (homeworkToEdit: Homework) => {
    setEditingHomework(homeworkToEdit);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (homeworkData: any) => {
    if (editingHomework) {
      updateHomework(editingHomework.id, homeworkData);
      setEditingHomework(null);
    } else {
      addHomework(homeworkData);
    }
    setIsFormOpen(false);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingHomework(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onAddHomework={() => setIsFormOpen(true)}
        totalHomework={homework.length}
        completedHomework={completedCount}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {homework.length > 0 && (
          <div className="mb-8">
            <FilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedSubject={selectedSubject}
              onSubjectChange={setSelectedSubject}
              selectedPriority={selectedPriority}
              onPriorityChange={setSelectedPriority}
              showCompleted={showCompleted}
              onShowCompletedChange={setShowCompleted}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              subjects={subjects}
            />
          </div>
        )}

        {homework.length === 0 ? (
          <EmptyState onAddHomework={() => setIsFormOpen(true)} />
        ) : (
          <div className="space-y-4">
            {filteredAndSortedHomework.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No homework matches your current filters.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSubject('');
                    setSelectedPriority('');
                    setShowCompleted(true);
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filteredAndSortedHomework.map((hw) => (
                <HomeworkItem
                  key={hw.id}
                  homework={hw}
                  onToggleComplete={toggleComplete}
                  onDelete={deleteHomework}
                  onEdit={handleEdit}
                />
              ))
            )}
          </div>
        )}
      </main>

      <HomeworkForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        initialData={editingHomework ? {
          title: editingHomework.title,
          subject: editingHomework.subject,
          description: editingHomework.description,
          dueDate: editingHomework.dueDate,
          priority: editingHomework.priority
        } : undefined}
      />
    </div>
  );
}

export default App;