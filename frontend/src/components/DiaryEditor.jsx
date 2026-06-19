import { useState, useEffect } from 'react';
import { createEntry, updateEntry } from '../utils/api';
import { encryptData, decryptData } from '../utils/encryption';
import '../styles/DiaryEditor.css';

export default function DiaryEditor({ entry, password, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      try {
        const decrypted = decryptData(entry.encryptedContent, password);
        setContent(decrypted);
      } catch (err) {
        setError('Failed to decrypt entry. Wrong password?');
        setContent('');
      }
    } else {
      setTitle('');
      setContent('');
    }
  }, [entry, password]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const encryptedContent = encryptData(content, password);

      if (entry) {
        await updateEntry(entry._id, title, encryptedContent);
      } else {
        await createEntry(title, encryptedContent);
      }

      onSave();
    } catch (err) {
      setError('Failed to save entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="diary-editor">
      <div className="editor-header">
        <button className="close-btn" onClick={onClose}>← Back</button>
        <h2>{entry ? 'Edit Entry' : 'New Entry'}</h2>
        <button
          className="save-btn"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <input
        type="text"
        placeholder="Entry Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
      />

      <textarea
        placeholder="Write your thoughts here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="content-textarea"
      />
    </div>
  );
}
