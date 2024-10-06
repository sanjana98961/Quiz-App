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
    <div className="App flex flex-col items-center justify-center h-screen bg-gray-100">
      {quizStarted ? (
        <Question
          numQuestions={numQuestions}
          setQuizStarted={setQuizStarted}
          setScore={setScore}
          setShowScoreCard={setShowScoreCard} // Pass function to control scorecard
          difficulty={difficulty}
          category={category}
        />
      ) : showScoreCard ? (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold">Quiz Completed</h3>
          <h4 className="mt-2">Your Score: {score} / {numQuestions}</h4>
          <StaticBtn>
            <button
              onClick={handleRestartQuiz}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Start Quiz Again
            </button>
          </StaticBtn>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <label className="text-lg font-semibold">Please select number of questions: </label>
          <select
            value={numQuestions}
            onChange={handleNumQuestionsChange}
            className="border rounded-md px-4 py-2 ml-2"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select> <br></br>

          <label className="text-lg font-semibold">Category: </label>
          <select value={category} onChange={handleCategory} className="border rounded-md px-4 py-2 ml-2">
            <option value="">Random</option>
            <option value="SQL">SQL</option>
            <option value="DevOps">DevOps</option>
            <option value="Docker">Docker</option>
            <option value="Linux">Linux</option>
            
          </select><br></br>

          <label className="text-lg font-semibold">Difficulty: </label>
          <select value={difficulty} onChange={handleDifficulty} className="border rounded-md px-4 py-2 ml-2">
            <option value="">Random</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            
          </select>
          <StaticBtn>
            <button
              onClick={handleStartQuiz}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Start Quiz
            </button>
          </StaticBtn>
        </div>
      )}
    </div>
  );
}

export default App;
