import React from 'react';

export default function HeaderComponent({ year, onViewChange }) {
    return (
        <header className="vjs-fwc-header">
            <div className="vjs-fwc-header-title">
                FIFA World Cup {year}
            </div>
            <nav className="vjs-fwc-header-nav">
                <button onClick={() => onViewChange('teams')} className="vjs-fwc-header-link">
                    Teams
                </button>
                <button onClick={() => onViewChange('group-stage')} className="vjs-fwc-header-link">
                    Group Stage
                </button>
                <button onClick={() => onViewChange('tournament')} className="vjs-fwc-header-link">
                    Tournament
                </button>
            </nav>
        </header>
    );
}
