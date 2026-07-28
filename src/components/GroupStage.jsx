import {useEffect, useState} from "react";
import GroupViewer from "./GroupViewer";

export default function GroupStage({year, datasource, listener, showStatsTable}) {

    const [groups, setGroups] = useState([])

    useEffect(() => {
        datasource.getGroups().then(g => setGroups(g))
    });

    return <div className="vjs-fwc-groups">
        {groups.map(group => <GroupViewer year={year} groupName={group.name} datasource={datasource} listener={listener} showStatsTable={showStatsTable}/>)}
    </div>

}
