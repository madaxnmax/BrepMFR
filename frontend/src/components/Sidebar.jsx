import React from 'react';

export default function Sidebar({ features, onHighlight, highlightedId }) {
    return (
        <div className="feature-list">
            <h3>Identified Features</h3>
            <ul>
                {features.map(f => (
                    <li
                        key={f.id}
                        className={highlightedId === f.id ? 'active' : ''}
                        onMouseEnter={() => onHighlight(f.id)}
                        onMouseLeave={() => onHighlight(null)}
                    >
                        {f.name} ({f.type})
                    </li>
                ))}
            </ul>
        </div>
    );
}
