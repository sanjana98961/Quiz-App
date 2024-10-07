import './App.css';
import Question from './COMPONENTS/Question';
import { useState } from 'react';
import { StaticBtn } from './COMPONENTS/StaticBtn';

function App() {
  const [quizStarted, setQuizStarted] = useState(false); // Track if quiz is started
  const [numQuestions, setNumQuestions] = useState(5);   // Track selected number of questions
  const [showScoreCard, setShowScoreCard] = useState(false); // Control scorecard visibility
  const [score, setScore] = useState(0);  // Track the user's score
  const [difficulty, setDifficulty] = useState("")
  const [category, setCategory] = useState("")


  const handleStartQuiz = () => {
    setQuizStarted(true);  // Start the quiz
    setShowScoreCard(false); // Hide the scorecard when quiz is restarted
  };

  const handleNumQuestionsChange = (event) => {
    setNumQuestions(event.target.value);  // Dynamically change the number of questions
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false); // Stop the current quiz
    setShowScoreCard(false); // Hide the scorecard
    // Do not reset numQuestions statically, user will be able to choose again
  };

  const handleDifficulty=(event)=>{
    setDifficulty(event.target.value)
  }

  const handleCategory =(event)=>{
    setCategory(event.target.value)
  }

  return (
    <div className="App flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-blue-500 to-green-400">
      {quizStarted ? (
        <Question
          numQuestions={numQuestions}
          setQuizStarted={setQuizStarted}
          setScore={setScore}
          setShowScoreCard={setShowScoreCard}
          difficulty={difficulty}
          category={category}
        />
      ) : showScoreCard ? (
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-xl w-full mx-auto">
          <h3 className="text-3xl font-bold text-gray-800">Quiz Completed</h3>
          <h4 className="mt-4 text-2xl font-semibold text-gray-600">
            Your Score: <span className="text-blue-600 font-bold">{score}</span> / {numQuestions}
          </h4>
          <button
            onClick={handleRestartQuiz}
            className="mt-6 bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
          >
            Start Quiz Again
          </button>
        </div>


      ) : (
        <div className="bg-white p-10 rounded-xl shadow-2xl max-w-xl w-full">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Start a New Quiz</h1>
          <div className="mb-4 flex items-center">
            <label className=" flex text-lg font-semibold text-gray-600 w-48">Number of Questions</label>
            <select
              value={numQuestions}
              onChange={handleNumQuestionsChange}
              className="flex-grow border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <label className="flex text-lg font-semibold text-gray-600 w-48">Category</label>
            <select
              value={category}
              onChange={handleCategory}
              className="flex-grow border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">Random</option>
              <option value="SQL">SQL</option>
              <option value="DevOps">DevOps</option>
              <option value="Docker">Docker</option>
              <option value="Linux">Linux</option>
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <label className="flex text-lg font-semibold text-gray-600 w-48">Difficulty</label>
            <select
              value={difficulty}
              onChange={handleDifficulty}
              className="flex-grow block border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="">Random</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
  
          <button
            onClick={handleStartQuiz}
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 w-full transition-all"
          >
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
  
  
}

export default App;
