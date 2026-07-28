import React from 'react';

export default function MatchViewer({ match }) {
    if (!match) {
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
                <div className="vjs-fwc-empty-text">Select a match to view details</div>
            </div>
        );
    }

    const {
        round,
        num,
        date,
        time,
        team1,
        team2,
        score,
        goals1 = [],
        goals2 = [],
        group,
        ground
    } = match;

    const renderScore = () => {
        const ft = score.ft || [0, 0];
        const et = score.et;

        let scoreText = `${ft[0]} - ${ft[1]}`;
        if (et) {
            scoreText = `${et[0]} - ${et[1]}`;
        }

        return (
            <div className="vjs-fwc-match-viewer-score">
                <div className="vjs-fwc-match-viewer-score-main">{scoreText}</div>
            </div>
        );
    };

    const allGoals = [
        ...goals1.map(g => ({ ...g, team: 1 })),
        ...goals2.map(g => ({ ...g, team: 2 }))
    ].sort((a, b) => {
        const parseMinute = (m) => {
            if (typeof m === 'number') return m;
            const match = String(m).match(/^(\d+)/);
            return match ? parseInt(match[1]) : 0;
        };
        const minA = parseMinute(a.minute);
        const minB = parseMinute(b.minute);
        if (minA !== minB) return minA - minB;
        
        // Secondary sort for extra time (+1, +2 etc)
        const parseExtra = (m) => {
            const match = String(m).match(/\+(\d+)/);
            return match ? parseInt(match[1]) : 0;
        };
        return parseExtra(a.minute) - parseExtra(b.minute);
    });

    return (
        <div className="vjs-fwc-match-viewer">
            <div className="vjs-fwc-match-viewer-header">
                <div className="vjs-fwc-match-viewer-round">{round} {group ? `(${group})` : ''}</div>
                <div className="vjs-fwc-match-viewer-meta">Match {num}</div>
            </div>

            <div className="vjs-fwc-match-viewer-teams">
                <div className="vjs-fwc-match-viewer-team">
                    <div className="vjs-fwc-match-viewer-team-name">{team1}</div>
                </div>
                <div className="vjs-fwc-match-viewer-score-container">
                    {renderScore()}
                </div>
                <div className="vjs-fwc-match-viewer-team">
                    <div className="vjs-fwc-match-viewer-team-name">{team2}</div>
                </div>
            </div>

            {score.p ? (
                <div className="vjs-fwc-match-viewer-score-penalties-extra">
                    ({score.p[0]} - {score.p[1]} pen)
                </div>
            ) : (
                score.et && <div className="vjs-fwc-match-viewer-extra-time">Extra time</div>
            )}

            <div className="vjs-fwc-match-viewer-info">
                <div className="vjs-fwc-match-viewer-info-item">
                    <span className="vjs-fwc-match-viewer-label">Date:</span> {date}
                </div>
                <div className="vjs-fwc-match-viewer-info-item">
                    <span className="vjs-fwc-match-viewer-label">Time:</span> {time}
                </div>
                <div className="vjs-fwc-match-viewer-info-item">
                    <span className="vjs-fwc-match-viewer-label">Stadium:</span> {ground}
                </div>
            </div>

            <div className="vjs-fwc-match-viewer-goals">
                <div className="vjs-fwc-match-viewer-section-title">Goals</div>
                {allGoals.length > 0 ? (
                    <div className="vjs-fwc-match-viewer-goals-list">
                        {allGoals.map((goal, index) => (
                            <div key={index} className={`vjs-fwc-match-viewer-goal-item team-${goal.team}`}>
                                <span className="vjs-fwc-match-viewer-goal-minute">{goal.minute}'</span>
                                <span className="vjs-fwc-match-viewer-goal-name">{goal.name}</span>
                                {goal.penalty && <span className="vjs-fwc-match-viewer-goal-type">(P)</span>}
                                {goal.owngoal && <span className="vjs-fwc-match-viewer-goal-type">(OG)</span>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="vjs-fwc-match-viewer-no-goals">No goals recorded</div>
                )}
            </div>
        </div>
    );
}
