import { useState, useEffect } from 'react';
import { getEntries, deleteEntry } from '../utils/api';
import '../styles/DiaryList.css';

export default function DiaryList({ onSelectEntry, onNewEntry, refreshTrigger }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEntries();
  }, [refreshTrigger]);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await getEntries();
      setEntries(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load entries');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteEntry(id);
        setEntries(entries.filter(e => e._id !== id));
      } catch (err) {
        setError('Failed to delete entry');
      }
    }
  };

  return (
    <div className="diary-list">
      <div className="list-header">
        <h2>My Diary</h2>
        <button className="new-btn" onClick={onNewEntry}>+ New Entry</button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading && <p>Loading entries...</p>}

      <div className="entries-container">
        {entries.length === 0 ? (
          <p className="no-entries">No entries yet. Start writing!</p>
        ) : (
          entries.map(entry => (
            <div
              key={entry._id}
              className="entry-item"
              onClick={() => onSelectEntry(entry)}
            >
              <div className="entry-header">
                <h3>{entry.title}</h3>
                <button
                  className="delete-btn"
                  onClick={(e) => handleDelete(entry._id, e)}
                >
                  Delete
                </button>
              </div>
              <p className="entry-date">
                {new Date(entry.date || entry.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
