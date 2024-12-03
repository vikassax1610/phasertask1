import React, { useState, useEffect } from 'react';
import GameScene from './GameScence';
import './GameScence.css';

function Game() {
  const [sessionId, setSessionId] = useState(null);
  const [counter, setCounter] = useState(null);
  const [session, setSession] = useState(null);
  const [gameVisible, setGameVisible] = useState(false);
  const [clockSound, setClockSound] = useState(null);

  useEffect(() => {
    return () => {
      if (clockSound) {
        clockSound.pause();
        clockSound.currentTime = 0;
      }
    };
  }, [clockSound]);

  const startSession = () => {
    const newSessionId = Math.random().toString(36).substr(2, 9);
    const newCounter = Math.floor(Math.random() * (120 - 30 + 1)) + 30;
    const startTime = new Date().getTime();

    setSessionId(newSessionId);
    setCounter(newCounter);
    setGameVisible(true);

    const audio = new Audio('/assets/ClickSound.mp3');
    audio.loop = true;
    audio.play();
    setClockSound(audio);

    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(interval);
          const endTime = new Date().getTime();
          setSession({
            sessionId: newSessionId,
            startTime,
            endTime,
          });
          setSessionId(null);
          setGameVisible(false);
          audio.pause();
          audio.currentTime = 0;
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);
  };

  return (
    <div className="game-container">
      <h2>Session History:</h2>
      {sessionId ? (
        <div>
          <p>Session ID: {sessionId}</p>
          <p className="counter">Counter: {counter}</p>
        </div>
      ) : (
        <button onClick={startSession} className="start-button">
          Start Game
        </button>
      )}
      {session && (
        <p className="session-info">
          Session ID: {session.sessionId}, Started at{' '}
          {new Date(session.startTime).toLocaleString()}, Ended at{' '}
          {new Date(session.endTime).toLocaleString()}
        </p>
      )}
      {gameVisible && <GameScene />}
    </div>
  );
}

export default Game;
