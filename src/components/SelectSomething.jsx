import React from 'react';

function SelectSomething({ msg }) {
    return (
        <div className="vjs-fwc-empty-state">
            <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="vjs-fwc-empty-icon"
            >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div className="vjs-fwc-empty-text">{msg}</div>
        </div>
    );
}

export default SelectSomething;
