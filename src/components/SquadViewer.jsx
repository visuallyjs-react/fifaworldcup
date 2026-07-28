import TeamFlag from "./TeamFlag.jsx";
import Player from "./Player.jsx";

export default function SquadViewer({squad}) {

    if (squad != null) {
        return <div className="vjs-wc-squad-info" style={{padding:"10px"}}>
            <h3>PLAYERS</h3>
            {squad && <div style={{display:"flex", flexWrap:"wrap"}}>

                {squad.players.map(p => <Player player={p}/>)}

            </div>}
        </div>
    }

    return <></>
}
