import React, { useEffect, useState } from "react";
import "./watch.css"


export default function StopWatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId;

        if (isRunning) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }

        // Cleanup function to clear the interval when the component unmounts or when isRunning changes to false
        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleRestart = () => {
        setTime(0);
    };

    // Format time to display in HH:MM:SS format
    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        const formattedTime = [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0"),
            seconds.toString().padStart(2, "0")
        ].join(":");

        return formattedTime;
    };

    return (
        <div className="stopwatch-container">
            <div className="stopwatch-display">
                <h1>{formatTime(time)}</h1>
            </div>
            <div className="stopwatch-controls">
                {isRunning ? (
                    <button onClick={handleStop} className="btn btn-danger">Stop</button>
                ) : (
                    <button onClick={handleStart} className="btn btn-success">Start</button>
                )}
                <button onClick={handleRestart} className="btn btn-info">Restart</button>
            </div>
        </div>
    );
}
