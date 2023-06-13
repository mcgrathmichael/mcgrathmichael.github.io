import "./GameLogic.scss";
import React, { useState, useEffect } from "react";
import { shuffle, _ } from "lodash";
import PropTypes from "prop-types";
import Restart from "../Restart/Restart";
import StopWatch from "../StopWatch/StopWatch";
import Score from "../Score/Score";
import Countdown from "../Countdown/Countdown";
import GamePopUp from "../GameOver/GamePopUp";
import SoundManager from "../SoundManager/SoundManager";

function GameLogic({ apiName, apiData, apiList }) {
  //  Shuffle the apiData to not get the same image over and over you can modify the "15" value to change number of cards
  const maxIndex = apiData.length - 14;
  const startIndex = Math.floor(Math.random() * (maxIndex + 1));
  const [cards] = useState(
    shuffle([
      ...apiData.slice(startIndex, startIndex + 14),
      ...apiData.slice(startIndex, startIndex + 14),
    ])
  ); // shuffle cards everytime
  const [clickedImg, setClickedImg] = useState([]); // the chosen img
  const [matchedCards, setMatchedCards] = useState([]); // array of identical imgs
  const [turns, setTurns] = useState(0); // this shows how many times the player clicked (2 clicks = 1 turn)
  const [score, setScore] = useState(0);
  // when a card is selected, it stays open until we make a second choice.
  // It no match, both cards flip back
  const [finished, setFinished] = useState(false);
  const [win, setWin] = useState();
  const [endGame, setEndGame] = useState(false);
  const [time, setTime] = useState(120);

  const isFinished = (value) => {
    setFinished(value);
  };

  const [showComponent, setShowComponent] = useState(false);
  const flipCard = (index) => {
    if (!matchedCards.includes(index)) {
      if (showComponent && finished !== true) {
        if (clickedImg.length === 0) {
          setClickedImg([index]);
        } else if (clickedImg.length === 1) {
          const firstChoice = clickedImg[0];
          const secondChoice = index;

          if (firstChoice !== secondChoice) {
            setTurns(turns + 1);
            if (cards[firstChoice] === cards[secondChoice]) {
              setMatchedCards([...matchedCards, firstChoice, secondChoice]);
              console.warn("match !");
              setScore(score + 500);
              SoundManager("pairfound");
            } else {
              console.warn("not a match !");
              SoundManager("badpair");

              if (score === 0 || score <= 150) {
                setScore(0);
              } else {
                setScore(score - 150);
              }
            }
            setClickedImg([...clickedImg, index]);
          }
        } else if (clickedImg.length === 2) {
          setClickedImg([index]);
        }
      }
    }
  };
  const hideaddons = () => {
    setShowComponent(!showComponent);
    SoundManager("gamestart");
  };

  // show certain components after 5 sec
  useEffect(() => {
    SoundManager("10sec");
    const timeoutId = setTimeout(hideaddons, 5000);
    return () => clearTimeout(timeoutId); // Clear the timeout when the component unmounts
  }, []);

  //  When Timer End
  useEffect(() => {
    if (showComponent && win !== true && endGame !== true) {
      setWin(false);
      setEndGame(true);
      SoundManager("losepopup");
    }
  }, [finished]);

  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setEndGame(true);
      setWin(true);
      SoundManager("gamewin");
    }
  }, [score]);

  return (
    <>
      {endGame && (
        <GamePopUp win={win} score={score} turns={turns} finished={finished} />
      )}
      {!showComponent && <Countdown />}
      {!endGame && showComponent && <Restart show={false} />}
      {!endGame && showComponent && (
        <StopWatch
          isFinished={isFinished}
          win={win}
          endGame={endGame}
          time={time}
          setTime={setTime}
        />
      )}
      {!endGame && showComponent && <Score score={score} />}
      {!endGame && (
        <div className="imageGrid">
          {cards.map((card, index) => {
            const displayedCard =
              clickedImg.indexOf(index) !== -1 ||
              matchedCards.indexOf(index) !== -1;
            return (
              <div
                /* eslint-disable */
                key={`card_id_${index}`}
                role="presentation"
                className={`card-outer ${displayedCard ? "flipped" : ""} ${
                  !showComponent ? "flipped" : ""
                }`}
                onClick={() => {
                  flipCard(index);
                }}
              >
                <div className="card">
                  <div className="front">
                    <input
                      className="front"
                      type="image"
                      onDragStart={(e) => e.preventDefault()}
                      alt="memorycard"
                      src={
                        apiList?.find((api) => api.name === apiName)
                          ?.path_to_image &&
                        _.get(
                          card,
                          apiList?.find((api) => api.name === apiName)
                            ?.path_to_image
                        )
                      }
                    />
                  </div>
                  <div className="back">
                    <input type="image" src="" alt="" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className="ClickCounterBtn">
        {!endGame && showComponent && (
          <span className="turns">{turns} Turns</span>
        )}
      </div>
    </>
  );
}
GameLogic.propTypes = {
  apiName: PropTypes.string.isRequired,
  apiData: PropTypes.instanceOf(Array).isRequired,
  apiList: PropTypes.instanceOf(Array).isRequired,
};
export default GameLogic;
