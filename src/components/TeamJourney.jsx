import { useEffect, useRef, useState } from "react";
import { PaperComponent } from "@visuallyjs/browser-ui-react";
import { ColumnLayout, uuid } from "@visuallyjs/browser-ui";
import TeamJourneyMatch from "./TeamJourneyMatch.jsx";

export default function TeamJourney({ team, datasource, listener, title }) {
    const [data, setData] = useState(null);

    const currentTeam = useRef(null)

    async function getTeamJourney() {
        // 1. loads the team, and finds out which group it was in
        // const team = await datasource.getTeam(team.name);
        const groupName = `Group ${team.group}`;

        // 2. loads the group statistics
        const groupStats = await datasource.getGroupStats(groupName);

        // 3. loads the matches the team played in in its group and adds them to a list, sorted by date
        const teamGroupMatches = groupStats.matches
            .filter(m => m.team1 === team.name || m.team2 === team.name)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        const journeyMatches = [...teamGroupMatches];

        // Helper to find team in knockout rounds
        async function findMatchInRound(roundName) {
            const matches = await datasource.getMatchesForRound(roundName);
            const match = matches.find(m => m.team1 === team.name || m.team2 === team.name);
            if (match) {
                journeyMatches.push(match);
            }
        }

        // 4-9. looks for the team in various rounds
        await findMatchInRound("Round of 32");
        await findMatchInRound("Round of 16");
        await findMatchInRound("Quarter-final");
        await findMatchInRound("Semi-final");
        await findMatchInRound("Final");
        await findMatchInRound("Match for third place");

        // Prepare nodes and edges for the component
        const nodes = journeyMatches.map(m => ({ ...m, id: uuid() }));
        const edges = [];
        for (let i = 0; i < nodes.length - 1; i++) {
            edges.push({
                source: nodes[i].id,
                target: nodes[i + 1].id
            });
        }

        currentTeam.current = team
        setData({ nodes, edges})//, groups });
    }

    useEffect(() => {
        if (team && datasource && team !== currentTeam.current) {
            getTeamJourney();
        }
    }, [team, datasource]);

    if (!data) return <></>;

    return (
        <div className="vjs-fwc-team-journey">
            <h3 style={{margin: "0.5rem auto", textAlign: "center"}}>{title || team?.name}</h3>
            { data && <PaperComponent
                data={data}
                modelOptions={{groupProperty:"vjsGroup"}}
                childProps={{ datasource, listener }}
                renderOptions={{
                    scale:false,
                    layout: {
                        type: ColumnLayout.type,
                        options: {
                            padding: { x: 50, y: 20 }
                        }
                    },
                    edges: {
                        connector: "Straight",
                        targetMarker:{
                            type:"PlainArrow",
                            options:{width:10, length:10}
                        }
                    }
                }}
                viewOptions={{
                    nodes: {
                        default: {
                            jsx: (ctx) => <TeamJourneyMatch ctx={ctx} />,
                            events:{
                                tap:(p) => {
                                    p.model.setSelection(p.obj)
                                    listener.matchTap(p.obj.data)
                                }
                            }
                        }
                    }
                }}
            />}
        </div>
    );
}
