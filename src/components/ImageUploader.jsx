import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { uploadImage } from '../services/api';
import './ImageUploader.css';

function ImageUploader({ images, onChange }) {
  const { token } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    setError('');

    for (const file of files) {
      if (!file.type.startsWith('image/')) continue;
      if (file.size > 10 * 1024 * 1024) {
        setError('Each image must be under 10MB');
        continue;
      }
      const result = await uploadImage(file, token);
      if (result.url) {
        onChange([...images, result.url]);
      } else {
        setError(result.error || 'Upload failed');
      }
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemove = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="image-uploader">
      <div className="image-uploader__grid">
        {images.map((img, i) => (
          <div key={i} className="image-uploader__item">
            <img src={img} alt={`Property ${i + 1}`} />
            <button
              type="button"
              className="image-uploader__remove"
              onClick={() => handleRemove(i)}
            >
              ×
            </button>
          </div>
        ))}
        <label className="image-uploader__add">
          {uploading ? (
            <span className="image-uploader__spinner">Uploading...</span>
          ) : (
            <>
              <span className="image-uploader__icon">+</span>
              <span>Add Photos</span>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </label>
      </div>
      {error && <p className="image-uploader__error">{error}</p>}
      <p className="image-uploader__hint">Upload up to 10 photos. JPG or PNG, max 10MB each.</p>
    </div>
  );
}

export default ImageUploader;