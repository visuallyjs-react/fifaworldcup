import TeamFlag from "./TeamFlag";
import {useMemo} from "react";

export default function GroupTeam({team, stats, showStatsTable}) {

    const rank = useMemo(() => {
        if (stats == null) {
            return -1
        } else {
            return stats.rankings[team.name]
        }
    }, [stats])

    return <div className="vjs-fwc-group-team-node" data-ranking={rank}>
        <div className="vjs-fwc-group-team" title={team.name}><TeamFlag team={team}/></div>
        {!showStatsTable && <div className="vjs-fwc-group-team-stats">
            <span style={{whiteSpace:"nowrap"}}>{team.name}</span>
            {stats && <table style={{color:"#555555"}}>
                <thead>
                <tr>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>F</th>
                    <th>A</th>
                    <th>P</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{stats.wins[team.name]}</td><td>{stats.draws[team.name]}</td>
                    <td>{stats.losses[team.name]}</td>
                    <td>{stats.goalsFor[team.name]}</td>
                    <td>{stats.goalsAgainst[team.name]}</td>
                    <td>{stats.points[team.name]}</td>
                </tr>
                </tbody>
            </table>}
        </div>}
        {showStatsTable && <span style={{marginLeft:"10px"}}>{team.name}</span>}
    </div>
}
