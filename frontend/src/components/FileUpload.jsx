import React, { useState } from 'react';
import axios from 'axios';

export default function FileUpload({ onUploadSuccess }) {
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const res = await axios.post(`${apiUrl}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            onUploadSuccess(res.data);
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-section">
            <input type="file" accept=".step,.stp" onChange={handleFileChange} />
            {loading && <p>Processing...</p>}
        </div>
    );
}
