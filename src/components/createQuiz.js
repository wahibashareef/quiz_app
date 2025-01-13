import React, {useState} from "react";
import './createQuiz.css';

const CreateQuiz = ({onCreateQuiz}) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState('');

    const handleOptions = (option, index) => {
        const newOptions = [...options];
        newOptions[index] = option.target.value;
        setOptions(newOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); //this prevents the  default form submission

        if(question && options.every(opt => opt) && correctAnswer) {
            const newQuiz = {
                question,
                options,
                correct_answer: correctAnswer
            };

            if (typeof onCreateQuiz === 'function') {
                onCreateQuiz(newQuiz);
            }else {
                console.error('onCreateQuiz is not a function');
            }
            
        }else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="create-quiz">
            <h2>Create Quiz</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Question</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Options</label>
                    {options.map((option, index) => (
                        <input 
                            key={index}
                            type="text"
                            value={option}
                            onChange={(e) => handleOptions(e, index)}
                            placeholder={`Option ${index + 1}`}
                            required
                        />
                    ))}
                </div>

                <div>
                    <label>Correct Answer</label>
                    <select
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                        required
                    >
                        <option value="">Select Correct Answer</option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateQuiz;
