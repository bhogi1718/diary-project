import { useState, useEffect } from 'react';
import { getEntries, deleteEntry } from '../utils/api';
import '../styles/DiaryList.css';

export default function DiaryList({ onSelectEntry, onNewEntry, refreshTrigger }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');

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

  const getFilteredAndSortedEntries = () => {
    let filtered = entries.filter(entry => {
      const matchesSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase());
      const entryDate = new Date(entry.date || entry.createdAt).toISOString().split('T')[0];
      const matchesFilter = !filterDate || entryDate === filterDate;
      return matchesSearch && matchesFilter;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt);
      const dateB = new Date(b.date || b.createdAt);
      return dateB - dateA;
    });
  };

  const filteredEntries = getFilteredAndSortedEntries();

  return (
    <div className="diary-list">
      <div className="list-header">
        <h2>My Diary</h2>
        <button className="new-btn" onClick={onNewEntry}>+ New Entry</button>
      </div>

      <div className="filter-section">
        <input
          type="text"
          placeholder="Search entries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="filter-date-input"
        />
        {(searchQuery || filterDate) && (
          <button
            className="clear-filter-btn"
            onClick={() => {
              setSearchQuery('');
              setFilterDate('');
            }}
          >
            Clear
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading && <p>Loading entries...</p>}

      <div className="entries-container">
        {filteredEntries.length === 0 ? (
          <p className="no-entries">
            {entries.length === 0 ? 'No entries yet. Start writing!' : 'No entries match your filter.'}
          </p>
        ) : (
          filteredEntries.map((entry) => {
            const entryDate = new Date(entry.date || entry.createdAt);
            const formattedDate = `${String(entryDate.getDate()).padStart(2, '0')}/${String(entryDate.getMonth() + 1).padStart(2, '0')}/${entryDate.getFullYear()}`;
            return (
              <div
                key={entry._id}
                className="entry-item"
                onClick={() => onSelectEntry(entry)}
              >
                <div className="entry-header">
                  <h3>{formattedDate}</h3>
                  <button
                    className="delete-btn"
                    onClick={(e) => handleDelete(entry._id, e)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
