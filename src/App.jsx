
import GroupStage from "./components/GroupStage.jsx";
import Tournament from "./components/Tournament.jsx";
import HeaderComponent from "./components/HeaderComponent.jsx";
import {useMemo, useRef, useState} from "react";
import {WorldCupDatasource} from "@visuallyjs/open-football-worldcup-datasource";
import GroupViewer from "./components/GroupViewer.jsx";
import TeamViewer from "./components/TeamViewer.jsx";
import SquadViewer from "./components/SquadViewer.jsx";
import TeamJourney from "./components/TeamJourney.jsx";
import TeamsList from "./components/TeamsList.jsx";
import MatchViewer from "./components/MatchViewer.jsx";
import SelectSomething from "./components/SelectSomething.jsx";

function App() {

    const year = useRef(2026)
    const ds = useMemo(() => new WorldCupDatasource({year:year.current}))

    const [selectedTeam, setSelectedTeam] = useState(null)
    const [selectedSquad, setSelectedSquad] = useState(null)
    const [selectedMatch, setSelectedMatch] = useState(null)
    const [currentView, setCurrentView] = useState('group-stage')

    const listener = {
        teamTap:(team) => {
            setSelectedTeam(team)
            ds.getSquad(team.name).then(s => {
                setSelectedSquad(s)
            })
        },
        matchTap:(match) => {
            setSelectedMatch(match)
            console.log("tap match ", match)
        }
    }

    function _doSetCurrentView(view) {
        setSelectedSquad(null)
        setSelectedTeam(null)
        setSelectedMatch(null)
        setCurrentView(view)
    }

  return <div className="vjs-fwc-app-container">
      <HeaderComponent year={year.current} onViewChange={_doSetCurrentView} />
      <div className="vjs-fwc-main">
          <div className="vjs-fwc-main-body">
              {currentView === 'group-stage' && <GroupStage year={year.current} datasource={ds} listener={listener} showStatsTable={false}/>}
              {currentView === 'tournament' && <Tournament year={year.current} datasource={ds} listener={listener}/>}
              {currentView === 'teams' && <div style={{display:"flex", height:"100%"}}>
                  <div style={{flex:"1 0 50%", height:"100%", border:"1px solid", "borderRadius":"5px", overflow:"auto"}}>
                  <TeamsList datasource={ds} listener={listener} selectedTeam={selectedTeam} />
                  </div>
                  <div style={{flex:"1 0 50%", height:"100%", border:"1px solid", "borderRadius":"5px", overflow:"auto", margin:"0 0.5rem"}}>
                    <TeamJourney team={selectedTeam} datasource={ds} title={"Journey"} listener={listener}/>
                      {selectedTeam == null && (
                          <SelectSomething msg="Select a team to view details" />
                      )}
                  </div>
              </div>}
          </div>
          <div className="vjs-fwc-main-sidebar">

              {(currentView === 'group-stage') && <>
                  <TeamViewer team={selectedTeam}/>
                  <SquadViewer squad={selectedSquad}/>
                  {selectedTeam == null && selectedSquad == null && (
                      <SelectSomething msg="Select a team to view details" />
                  )}
              </>}

              {(currentView === 'teams') && <>
                  {selectedMatch && <><MatchViewer match={selectedMatch}/><hr/></>}
                  <TeamViewer team={selectedTeam}/>
                  <SquadViewer squad={selectedSquad}/>
                  {selectedTeam == null && selectedSquad == null && (
                      <SelectSomething msg="Select a team to view details" />
                  )}
              </>}

              {currentView === 'tournament' && <>
                    <MatchViewer match={selectedMatch}/>
              </>}
          </div>
      </div>
  </div>
}

export default App
