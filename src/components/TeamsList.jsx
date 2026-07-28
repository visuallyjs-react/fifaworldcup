import React, { useEffect, useState } from 'react';
import TeamFlag from './TeamFlag.jsx';

export default function TeamsList({ datasource, listener, selectedTeam }) {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        if (datasource) {
            datasource.getTeams().then(t => {
                // Sort teams alphabetically by name
                const sortedTeams = [...t].sort((a, b) => a.name.localeCompare(b.name));
                setTeams(sortedTeams);
            });
        }
    }, [datasource]);

    return (
        <div className="vjs-fwc-teams-list">
            {teams.map(team => {
                const isSelected = selectedTeam && selectedTeam.name === team.name;
                return (
                    <div 
                        key={team.name} 
                        className={`vjs-fwc-teams-list-item${isSelected ? ' vjs-fwc-teams-list-item-selected' : ''}`}
                        onClick={() => {
                            if (listener) {
                                listener.teamTap(team)
                                listener.matchTap(null)
                            }
                        }}
                    >
                        <div className="vjs-fwc-teams-list-item-flag">
                            <TeamFlag team={team} />
                        </div>
                        <div className="vjs-fwc-teams-list-item-details">
                            <div className="vjs-fwc-teams-list-item-name">{team.name}</div>
                            <div className="vjs-fwc-teams-list-item-info">
                                <span>{team.continent}</span>
                                <span className="vjs-fwc-teams-list-item-separator">|</span>
                                <span>{team.confed}</span>
                                <span className="vjs-fwc-teams-list-item-separator">|</span>
                                <span>Group {team.group}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
