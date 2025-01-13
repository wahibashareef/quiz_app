import React from "react";
import './quiz.css';

const Quiz = ({
    question,
    questionNumber,
    totalQuestions,
    selectedAnswer,
    onAnswer,
    onNext,
    onPrevious,
}) => {
    return (
        <div className="container">
            <h2 dangerouslySetInnerHTML={{__html: question.question}}/>
            <div className="options">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        className={selectedAnswer === option ? 'selected' : ''}
                        onClick={() => onAnswer(option)}
                    >
                        <p dangerouslySetInnerHTML={{__html: option}}/>
                    </button>
                ))}
            </div>

            <div className="navigation">
                <button onClick={onPrevious} disabled = {questionNumber === 1}>
                    Previous
                </button>

                <button onClick={onNext}>
                    {questionNumber === totalQuestions ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default Quiz;