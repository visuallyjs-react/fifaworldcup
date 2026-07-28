import MatchSummary from "./MatchSummary.jsx";

export default function TeamJourneyMatch({ ctx }) {
    const { data } = ctx;
    const { datasource } = ctx.props;

    return (
        <div className="vjs-fwc-team-journey-item" style={{width: "400px"}}>
            <div className="vjs-fwc-team-journey-item-summary">
                <MatchSummary match={data} datasource={datasource}/>
            </div>
            <div className="vjs-fwc-team-journey-item-details">
                <div className="vjs-fwc-team-journey-item-round">
                    {data.group ? `${data.group} - ${data.round}` : data.round}
                </div>
                <div className="vjs-fwc-team-journey-item-info">
                    <span>{data.date}</span>
                    <span className="vjs-fwc-team-journey-item-separator">|</span>
                    <span>{data.time}</span>
                </div>
                <div className="vjs-fwc-team-journey-item-ground">
                    {data.ground}
                </div>
            </div>
        </div>
    );
}
