import {FIFACountryCode} from "../fifa-converter.js";

export default function TeamFlag({team}) {
    if (team != null) {
        const isoCode = FIFACountryCode(team.fifa_code)?.ISO2?.toLowerCase()
        return isoCode ? <img className="vjs-fwc-team-flag" src={`https://static.visuallyjs.com/img/flags/1x1/${isoCode}.svg`}/> :
            <span>{team.fifa_code}</span>
    } else {
        return <></>
    }
}
