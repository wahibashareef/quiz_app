import React from "react";
import './result.css';

const Result = ({
    score, 
    totalQuestions,
}) => {
    return (
        <div className="text">
            <h1>Quiz Finished</h1>
            <p>Your score: {score} / {totalQuestions}</p>
            <button 
                className="btn"
                onClick={() => window.location.reload()}
            >
                Restart
            </button>
        </div>
    );
};

export default Result;