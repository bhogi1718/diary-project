import { useState, useEffect } from 'react';
import Auth from './components/Auth';
import DiaryList from './components/DiaryList';
import DiaryEditor from './components/DiaryEditor';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedPassword = localStorage.getItem('password');
    if (token && savedPassword) {
      setUser({ id: localStorage.getItem('userId') });
      setPassword(savedPassword);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setPassword(localStorage.getItem('password'));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('password');
    localStorage.removeItem('userId');
    setUser(null);
    setSelectedEntry(null);
    setIsEditing(false);
  };

  const handleSelectEntry = (entry) => {
    setSelectedEntry(entry);
    setIsEditing(true);
  };

  const handleNewEntry = () => {
    setSelectedEntry(null);
    setIsEditing(true);
  };

  const handleSaveEntry = () => {
    setIsEditing(false);
    setSelectedEntry(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleCloseEditor = () => {
    setIsEditing(false);
    setSelectedEntry(null);
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📓 My Secure Diary</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <main className="app-main">
        {isEditing ? (
          <DiaryEditor
            entry={selectedEntry}
            password={password}
            onClose={handleCloseEditor}
            onSave={handleSaveEntry}
          />
        ) : (
          <DiaryList
            onSelectEntry={handleSelectEntry}
            onNewEntry={handleNewEntry}
            refreshTrigger={refreshTrigger}
          />
        )}
      </main>
    </div>
  );
}

export default App;
