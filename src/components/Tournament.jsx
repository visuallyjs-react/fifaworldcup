import {useEffect, useRef, useState} from "react";
import {SurfaceComponent, BackgroundComponent, ControlsComponent} from "@visuallyjs/browser-ui-react";
import {uuid} from "@visuallyjs/browser-ui";
import MatchSummary from "./MatchSummary.jsx";

export default function Tournament({datasource, listener}) {

    const init = useRef(false)
    const [data, setData] = useState(null)

    async function getMatches(roundName) {
        const m = datasource.getMatchesForRound(roundName)
        return m.then(matches => toNode(matches))
    }
    function toNode(...obj) {
        return obj[0].map(o => Object.assign({id:uuid()}, o))
    }

    async function assemble(){
        const r32 = await getMatches("Round of 32")
        const r16 = await getMatches("Round of 16")
        const qf = await getMatches("Quarter-final")
        const sf = await getMatches("Semi-final")
        //const tp = await getMatches("Match for third place")
        const f = await getMatches("Final")

        const nodes = [f[0], /*tp[0],*/ ...sf, ...qf, ...r16, ...r32]
        const edges = []
        sf.forEach(m => {
            edges.push({source:f[0].id, target:m.id})
            const quarters = findPreviousMatches(m, qf)
            quarters.forEach(q => {
                edges.push({source:m.id, target:q.id})
                const ros = findPreviousMatches(q, r16)
                ros.forEach(rs => {
                    edges.push({source:q.id, target:rs.id})
                    const rot = findPreviousMatches(rs, r32)
                    rot.forEach(rt => {
                        edges.push({source:rs.id, target:rt.id})
                    })
                })
            })
        })

        function findPreviousMatches(focusMatch, matchList) {
            return matchList.filter(m => m.team1 === focusMatch.team1 || m.team2 === focusMatch.team1 || m.team1 === focusMatch.team2 || m.team2 === focusMatch.team2)
        }

        setData({
            nodes,
            edges
        })
    }

    useEffect(() => {
        if (!init.current) {
            init.current = true
            assemble()
        }
    }, []);

    return (
        <div className="vjs-fwc-tournament-placeholder">

                {data && <SurfaceComponent data={data} childProps={{datasource, listener}} renderOptions={{
                    layout: {
                        type:"Hierarchy",
                        options: {
                            invert: true,
                            axis:"vertical",
                            unattachedRootPadding:0,
                            padding:{
                                x:160, y:40
                            }
                        }
                    },
                    edges:{
                        connector:"Orthogonal",
                        overlays:[
                            {
                                type:"PlainArrow",
                                options:{
                                    direction:-1,
                                    location:0
                                }
                            }
                        ]
                    },
                    zoomToFit:true,
                    elementsDraggable:false
                }}
                viewOptions={{
                    nodes: {
                        default: {
                            jsx: (ctx) => <MatchSummary match={ctx.data} datasource={ctx.props.datasource} listener={ctx.props.listener}/>,
                            events:{
                                "tap":(p) => {
                                    listener.matchTap(p.obj.data)
                                    p.model.setSelection(p.obj)
                                }
                            }
                        }
                    }
                }}
                >
                    <ControlsComponent clear={false} undoRedo={false}/>
                    <BackgroundComponent type="grid"/>
                </SurfaceComponent>}

        </div>
    );
}
