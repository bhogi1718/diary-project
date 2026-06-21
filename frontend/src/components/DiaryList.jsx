import { useState, useEffect } from 'react';
import { getEntries, deleteEntry } from '../utils/api';
import '../styles/DiaryList.css';

export default function DiaryList({ onSelectEntry, onNewEntry, refreshTrigger }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

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
      const entryDate = new Date(entry.date || entry.createdAt);

      let matchesDateFilter = true;
      if (filterStartDate || filterEndDate) {
        const startDate = filterStartDate ? new Date(filterStartDate) : new Date('1900-01-01');
        const endDate = filterEndDate ? new Date(filterEndDate) : new Date('2099-12-31');
        matchesDateFilter = entryDate >= startDate && entryDate <= endDate;
      }

      return matchesSearch && matchesDateFilter;
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
          placeholder="Start Date"
          value={filterStartDate}
          onChange={(e) => setFilterStartDate(e.target.value)}
          className="filter-date-input"
          title="Start Date"
        />
        <input
          type="date"
          placeholder="End Date"
          value={filterEndDate}
          onChange={(e) => setFilterEndDate(e.target.value)}
          className="filter-date-input"
          title="End Date"
        />
        {(searchQuery || filterStartDate || filterEndDate) && (
          <button
            className="clear-filter-btn"
            onClick={() => {
              setSearchQuery('');
              setFilterStartDate('');
              setFilterEndDate('');
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
          (() => {
            const dateGroups = {};
            filteredEntries.forEach(entry => {
              const entryDate = new Date(entry.date || entry.createdAt);
              const dateKey = `${String(entryDate.getDate()).padStart(2, '0')}/${String(entryDate.getMonth() + 1).padStart(2, '0')}/${entryDate.getFullYear()}`;
              if (!dateGroups[dateKey]) {
                dateGroups[dateKey] = [];
              }
              dateGroups[dateKey].push(entry);
            });

            return Object.entries(dateGroups).flatMap(([date, entriesForDate]) =>
              entriesForDate.map((entry, index) => (
                <div
                  key={entry._id}
                  className="entry-item"
                  onClick={() => onSelectEntry(entry)}
                >
                  <div className="entry-header">
                    <h3>{date}-{index + 1}</h3>
                    <button
                      className="delete-btn"
                      onClick={(e) => handleDelete(entry._id, e)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            );
          })())
          })
        )}
      </div>
    </div>
  );
}
