import TeamFlag from "./TeamFlag.jsx";

export default function TeamViewer({team}) {

    if (team != null) {
        return <div className="vjs-wc-team-info" style={{padding: "10px", fontFamily: "sans-serif"}}>
            <div style={{display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px", backgroundColor:"#f3f3f3", padding: "10px"}}>
                <TeamFlag team={team}/>
            </div>
            <table style={{width: "100%", borderCollapse: "collapse", fontSize: "0.9rem"}}>
                <tbody>
                <tr style={{borderBottom: "1px solid #eee"}}>
                    <td style={{padding: "8px 0", color: "#666", fontWeight: "bold"}}>Name</td>
                    <td style={{padding: "8px 0", textAlign: "right"}}>{team.name_normalised || team.name}</td>
                </tr>
                <tr style={{borderBottom: "1px solid #eee"}}>
                    <td style={{padding: "8px 0", color: "#666", fontWeight: "bold"}}>Continent</td>
                    <td style={{padding: "8px 0", textAlign: "right"}}>{team.continent}</td>
                </tr>
                <tr style={{borderBottom: "1px solid #eee"}}>
                    <td style={{padding: "8px 0", color: "#666", fontWeight: "bold"}}>FIFA Code</td>
                    <td style={{padding: "8px 0", textAlign: "right"}}>{team.fifa_code}</td>
                </tr>
                <tr style={{borderBottom: "1px solid #eee"}}>
                    <td style={{padding: "8px 0", color: "#666", fontWeight: "bold"}}>Confederation</td>
                    <td style={{padding: "8px 0", textAlign: "right"}}>{team.confed}</td>
                </tr>
                <tr style={{borderBottom: "1px solid #eee"}}>
                    <td style={{padding: "8px 0", color: "#666", fontWeight: "bold"}}>Group</td>
                    <td style={{padding: "8px 0", textAlign: "right"}}>{team.group}</td>
                </tr>
                {/*<tr>
                    <td style={{padding: "8px 0", color: "#666", fontWeight: "bold"}}>Group Ranking</td>
                    <td style={{padding: "8px 0", textAlign: "right"}}>{groupRanking}</td>
                </tr>*/}
                </tbody>
            </table>
        </div>
    }

    return <></>
}
