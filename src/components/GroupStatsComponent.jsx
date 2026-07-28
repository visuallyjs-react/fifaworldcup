import TeamFlag from "./TeamFlag.jsx";

export default function GroupStatsComponent({stats}) {
    if (!stats || !stats.rankedTeams) {
        return <></>;
    }

    return (
        <div className="vjs-fwc-group-stats" style={{padding: "10px", fontFamily: "sans-serif", backgroundColor: "white", margin: "10px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)"}}>
            <table style={{width: "100%", borderCollapse: "collapse", fontSize: "0.85rem"}}>
                <thead>
                    <tr style={{borderBottom: "2px solid #eee", textAlign: "left"}}>
                        <th style={{padding: "8px 4px"}}>#</th>
                        <th style={{padding: "8px 4px"}}>Team</th>
                        <th style={{padding: "8px 4px", textAlign: "center"}}>W</th>
                        <th style={{padding: "8px 4px", textAlign: "center"}}>D</th>
                        <th style={{padding: "8px 4px", textAlign: "center"}}>L</th>
                        <th style={{padding: "8px 4px", textAlign: "center"}}>F</th>
                        <th style={{padding: "8px 4px", textAlign: "center"}}>A</th>
                        <th style={{padding: "8px 4px", textAlign: "center"}}>GD</th>
                        <th style={{padding: "8px 4px", textAlign: "center"}}>P</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.rankedTeams.map((team, index) => {
                        const name = team.name;
                        const gd = stats.goalsFor[name] - stats.goalsAgainst[name];
                        return (
                            <tr key={name} style={{borderBottom: "1px solid #eee"}}>
                                <td style={{padding: "8px 4px"}}>{index + 1}</td>
                                <td style={{padding: "8px 4px"}}>
                                    <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                                        <div style={{width: "20px", height: "20px", borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                            <TeamFlag team={team}/>
                                        </div>
                                        <span>{name}</span>
                                    </div>
                                </td>
                                <td style={{padding: "8px 4px", textAlign: "center"}}>{stats.wins[name]}</td>
                                <td style={{padding: "8px 4px", textAlign: "center"}}>{stats.draws[name]}</td>
                                <td style={{padding: "8px 4px", textAlign: "center"}}>{stats.losses[name]}</td>
                                <td style={{padding: "8px 4px", textAlign: "center"}}>{stats.goalsFor[name]}</td>
                                <td style={{padding: "8px 4px", textAlign: "center"}}>{stats.goalsAgainst[name]}</td>
                                <td style={{padding: "8px 4px", textAlign: "center"}}>{gd > 0 ? `+${gd}` : gd}</td>
                                <td style={{padding: "8px 4px", textAlign: "center", fontWeight: "bold"}}>{stats.points[name]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
