import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import plusIcon from './assets/styles/plus.svg';
import editIcon from './assets/styles/edit.svg';
import deleteIcon from './assets/styles/delete.svg';
import checkmarkIcon from './assets/styles/checkmark.svg';  
import sunIcon from './assets/styles/sun.svg';
import moonIcon from './assets/styles/moon.svg';

function App() {
  const { t, i18n } = useTranslation();

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: Date.now(),
        text: newTask,
        completed: false,
      };
      const updatedTasks = [newTaskObj, ...tasks];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setNewTask('');
    } else {
      alert(t('addTask'));
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const startEdit = (id, text) => {
    setEditTaskId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      const updatedTasks = tasks.map((task) =>
        task.id === editTaskId ? { ...task, text: editText } : task
      );
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setEditTaskId(null);
      setEditText('');
    } else {
      alert(t('editTask'));
    }
  };

  const clearAllTasks = () => {
    if (window.confirm(t('clearAllConfirm'))) {
      setTasks([]);
      localStorage.removeItem('tasks');
    }
  };

 
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div className="header-controls">
        <div className={`theme-toggle ${darkMode ? 'dark' : ''}`} onClick={toggleTheme}>
          <div className="theme-option">
            <img src={sunIcon} alt="Light mode" />
          </div>
          <div className="switch-container">
            <div className={`switch-slider ${darkMode ? 'active' : ''}`}></div>
          </div>
          <div className="theme-option">
            <img src={moonIcon} alt="Dark mode" />
          </div>
        </div>

        <div className="language-switcher">
          <button
            className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
            onClick={() => changeLanguage('en')}
          >
            English
          </button>
          <button
            className={`lang-btn ${i18n.language === 'ru' ? 'active' : ''}`}
            onClick={() => changeLanguage('ru')}
          >
            Русский
          </button>
        </div>
      </div>

      {/* Добавляем класс container-ru, если выбран русский */}
      <div className={`container ${darkMode ? 'dark' : ''} ${i18n.language === 'ru' ? 'container-ru' : ''}`}>
        <h2 className="head">{t('todoList')}</h2>
        <div className="create-todo">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder={t('addPlaceholder')}
          />
          <button className="add-btn" onClick={addTask}>
            <img src={plusIcon} alt="Add Task" />
          </button>
        </div>

        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className={`task ${task.completed ? 'true' : ''}`}>
              <button className="check-btn" onClick={() => toggleTaskCompletion(task.id)}>
                {task.completed ? (
                  <img src={checkmarkIcon} alt="Completed" />
                ) : (
                  <i className="bx bx-circle"></i>
                )}
              </button>

              {editTaskId === task.id ? (
                <div className="edit-task">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button className="save-btn" onClick={saveEdit}>{t('save')}</button>
                </div>
              ) : (
                <span>{task.text}</span>
              )}

              <button className="edit-btn" onClick={() => startEdit(task.id, task.text)} disabled={task.completed}>
                <img src={editIcon} alt="Edit Task" />
              </button>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                <img src={deleteIcon} alt="Delete Task" />
              </button>
            </div>
          ))}
        </div>

        <div className="foot">
          <span>
            {t('pendingTasks', { count: tasks.filter((task) => !task.completed).length })}
          </span>
          <button className="clear-btn" onClick={clearAllTasks}>{t('clearAll')}</button>
        </div>
      </div>
    </>
  );
}

export default App;
