import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import Quiz from './components/quiz';
import Result from './components/result';
import CreateQuiz from './components/createQuiz';
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

const App = () => {
  const[questions, setQuestions] = useState([]);
  const[currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const[score, setScore] = useState(0);
  const[answers, setAnswers] = useState({});
  const[isFinished, setIsFinished] = useState(false);

  useEffect (() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
        );
        const Questions = response.data.results.map((q) => ({
          ...q,
          options: shuffleOptions([...q.incorrect_answers, q.correct_answer]),
        }));
        setQuestions(Questions);
      }catch (e) {
        console.error("Failed tofetch questions", e);
      }
    };
    fetchQuestions();
  }, []);

  const shuffleOptions = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };
  
  const handleAnswer = (answer) => {
    setAnswers((Answers) => {
      const isPreviouslyAnswered = Answers[currentQuestionIndex];
      const wasCorrectBefore = questions[currentQuestionIndex].correct_answer === isPreviouslyAnswered;
      const isCorrectNow = questions[currentQuestionIndex].correct_answer === answer;
      
      if (!wasCorrectBefore && isCorrectNow) {
        setScore(score + 1);
      }
      else if (wasCorrectBefore && !isCorrectNow) {
        setScore(score - 1);
      }

      return {
        ...Answers,
      [currentQuestionIndex] : answer,
      }
    });
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }else {
      setIsFinished(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleCreateQuiz = (newQuiz) => {
    setQuestions([newQuiz]); //new quiz is set to current question
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <Router>
      <div className='App'>
      <h1>Quizzz</h1>

      <Routes>
        <Route path="/create" element={<CreateQuiz onCreateQuiz={handleCreateQuiz}/>}/>

        <Route path="/" element = {
        !isFinished ? (
        questions.length > 0 && (
          <Quiz
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={answers[currentQuestionIndex]}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
          />
        )
      ) : (
        <Result score={score} totalQuestions={questions.length}/>
      )}
        />
      </Routes>

      <div>
        <p>Create your own Quiz</p>
        <Link to="/create">
          <button className='create-button'>Create</button>
        </Link>
      </div>
    </div>
    </Router>

  );
};


export default App;
