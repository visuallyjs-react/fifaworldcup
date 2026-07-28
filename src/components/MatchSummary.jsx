import TeamFlag from "./TeamFlag";
import useTeam from "../use-team.jsx";

export default function MatchSummary({ match, datasource, listener }) {

    const team1 = useTeam(match.team1, 2026, datasource)
    const team2 = useTeam(match.team2, 2026, datasource)

    if (!match) return null;

    const renderTeamRow = (team, score, penalties) => {

        return (
            <div className="vjs-fwc-match-team-row" onClick={() => listener?.teamTap(team)}>
                <div className="vjs-fwc-group-team"><TeamFlag team={team}/></div>
                <span className="vjs-fwc-match-team-name">{team?.name}</span>
                <span className="vjs-fwc-match-team-score">
                    {score}
                    {penalties !== undefined && penalties !== null && ` (${penalties})`}
                </span>
            </div>
        );
    };

    function finalScore(idx) {
        return match.score.et ? match.score.et[idx] : match.score.ft[idx]
    }

    return (
        <div className="vjs-fwc-match-summary">
            {renderTeamRow(team1, finalScore(0), match.score.p ? match.score.p[0] : null)}
            {renderTeamRow(team2, finalScore(1), match.score.p ? match.score.p[1] : null)}
        </div>
    );
}
