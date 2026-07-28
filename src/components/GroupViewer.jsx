
import {AnchorLocations, CircularLayout, LabelOverlay} from "@visuallyjs/browser-ui";
import {PaperComponent} from "@visuallyjs/browser-ui-react";
import {useEffect, useRef, useState} from "react";
import GroupTeam from "./GroupTeam.jsx";
import GroupStatsComponent from "./GroupStatsComponent.jsx";

export default function GroupViewer({year, groupName, datasource, listener, showStatsTable:initialShowStatsTable}) {

    const initialized = useRef(false)
    const [data, setData] = useState({})
    const [stats, setStats] = useState({})
    const [showStatsTable, setShowStatsTable] = useState(initialShowStatsTable)

    const modelOptions = {
        groupProperty:"vjsGroup"
    }

    const renderOptions = {
        layout:{
            type:CircularLayout.type,
            options:{
                _centerContent:true
            }
        },
        zoomToFit:true,
        elementsDraggable:false,
        height:450
    }

    const view = {
        nodes:{
            default:{
                jsx:(ctx) => <GroupTeam team={ctx.data} stats={ctx.props.stats} showStatsTable={ctx.props.showStatsTable}/>,
                events:{
                    "mouseover":(p) => {
                        p.model.addToSelection(p.obj.getAllEdges())
                    },
                    "mouseout":(p) => {
                        p.model.removeFromSelection(p.obj.getAllEdges())
                    },
                    "tap":(p) => listener.teamTap(p.obj.data)
                }
            }
        },
        edges:{
            default:{
                detachable:false,
                anchor:AnchorLocations.Center,
                overlays:[
                    {
                        type:LabelOverlay.type,
                        options:{
                            label:"{{team1Score}}",
                            location:0.35
                        }
                    },
                    {
                        type:LabelOverlay.type,
                        options:{
                            label:"{{team2Score}}",
                            location:0.65
                        }
                    }
                ],
                events:{
                    "tap":(p) => {
                        listener.matchTap(p.obj.data.match)
                    },
                    "mouseover":(p) => {
                        p.model.addToSelection(p.obj)
                    },
                    "mouseout":(p) => {
                        p.model.removeFromSelection(p.obj)
                    },
                }
            }
        }
    }

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            datasource.getGroupStats(groupName).then(stats => {
                const nodes = stats.teams.slice()
                const edges = stats.matches.map(match => {
                    return {
                        source:match.team1,
                        target:match.team2,
                        data:{
                            team1Score:`${match.score.ft[0]}`,
                            team2Score:`${match.score.ft[1]}`,
                            match
                        }
                    }
                })
                setData({nodes, edges})

                setStats(stats.stats)
            })
        }
    })

    return <div className={`vjs-fwc-group` + (showStatsTable ? ` vjs-fwc-group-with-stats` : ``)} style={{position: 'relative'}}>
        <div className="vjs-fwc-group-title">{groupName}</div>
        <div 
            className="vjs-fwc-group-stats-toggle" 
            onClick={() => setShowStatsTable(!showStatsTable)}
            style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: showStatsTable ? '#d0d0d0' : 'transparent',
                transition: 'background-color 0.2s'
            }}
            title={showStatsTable ? "Hide stats table" : "Show stats table"}
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="3" y1="15" x2="21" y2="15" />
                <line x1="9" y1="3" x2="9" y2="21" />
            </svg>
        </div>
        <PaperComponent childProps={{stats, showStatsTable}} modelOptions={modelOptions} data={data} renderOptions={renderOptions} viewOptions={view}/>
        {showStatsTable && <GroupStatsComponent stats={stats}/>}
    </div>
}
