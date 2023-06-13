import "./GamePage.scss";
import { useLocation } from "react-router";
import GameLogic from "../../components/GameLogic/GameLogic";

function GamePage() {
  const location = useLocation();
  const apiData = location.state?.apiData;
  const apiName = location.state?.apiName;
  const apiList = location.state?.apiList;

  // hide these components for 5 seconds at the start of the game

  return (
    <div className="game" onDragStart={(e) => e.preventDefault()}>
      <GameLogic apiName={apiName} apiData={apiData} apiList={apiList} />
    </div>
  );
}

export default GamePage;
