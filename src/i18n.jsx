import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      todoList: 'To-Do List',
      addPlaceholder: 'Add some todo ...',
      addTask: 'Please enter a task!',
      editTask: 'Please enter text for the task!',
      clearAll: 'Clear All',
      clearAllConfirm: 'Clear all tasks?',
      save: 'Save',
      pendingTasks_one: 'You have {{count}} pending task',
      pendingTasks_other: 'You have {{count}} pending tasks'
    }
  },
  ru: {
    translation: {
      todoList: 'Список дел',
      addPlaceholder: 'Добавьте задачу ...',
      addTask: 'Пожалуйста, введите задачу!',
      editTask: 'Пожалуйста, введите текст задачи!',
      clearAll: 'Очистить все',
      clearAllConfirm: 'Очистить все задачи?',
      save: 'Сохранить',
      pendingTasks_one: 'У вас {{count}} незавершённая задача',
      pendingTasks_few: 'У вас {{count}} незавершённые задачи',
      pendingTasks_many: 'У вас {{count}} незавершённых задач'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;