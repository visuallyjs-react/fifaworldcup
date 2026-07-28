import {useState} from "react";

export default function useTeam(name, year, datasource) {
    const [team, setTeam] = useState(null)

    if (name != null) {
        datasource.getTeam(name).then(setTeam)
    }

    return team
}
