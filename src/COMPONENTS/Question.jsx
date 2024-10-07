import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StaticBtn } from './StaticBtn';

function Question({ numQuestions, setQuizStarted, setScore, setShowScoreCard, difficulty, category }) {
  const [ques, setQues] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log({ques})

  const handleSelectedAnswer = (event, id) => {
    const selectedAnswer = event.target.value;
    setQues((prev) => {
      const updatedQues = [...prev];
      const index = updatedQues.findIndex((item) => item.id === id);

      if (index !== -1) {
        updatedQues[index] = { ...updatedQues[index], selected: selectedAnswer };
      }
      return updatedQues;
    });
  };

  const handleNextQuestion = () => {
    const currentQuestion = ques[questionIndex];
    if (currentQuestion) {
      const correctAnswer = Object?.entries(currentQuestion?.correct_answers)
        ?.find(([key, value]) => value === 'true')[0]
        ?.replace('_correct', '');
      const correctAnswerValue = currentQuestion?.answers[correctAnswer];

      setQues((prev) => {
        const updatedQues = [...prev];
        const index = updatedQues.findIndex((item) => item.id === currentQuestion.id);

        if (index !== -1) {
          updatedQues[index] = {
            ...updatedQues[index],
            isCorrect: correctAnswerValue === currentQuestion.selected,
          };
        }
        if(questionIndex === ques.length -1){
          handleSubmit(updatedQues);
        }
        return updatedQues;
      });

      if (questionIndex < ques.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setQuestion(ques[questionIndex + 1]);
      } 
    }
  };

  const handleSubmit = (updatedQues) => {
    const correctAnswersCount = updatedQues?.filter((x) => x.isCorrect)?.length;
    setScore(correctAnswersCount); // Update the score
    setShowScoreCard(true); // Show scorecard
    setQuizStarted(false);  // End quiz
  };

  const handlePrevQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setQuestion(ques[questionIndex - 1]);
    }
  };

  const fetchQuestions = () => {
    setLoading(true);
    axios
      .get(`https://quizapi.io/api/v1/questions?apiKey=7fbC13VRtJWNwhJpF3s59zFqvERac4Y7as8xXKBD&limit=${numQuestions}&difficulty=${difficulty}&category=${category}`)
      .then((response) => {
        setQues(response.data);
        setQuestion(response.data[questionIndex]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {loading ? (
        <div>Loading questions...</div>
      ) : (
        <div>
          <div key={question?.id} className="mb-2 flex flex-col justify-start text-start">
            <span className="text-lg font-semibold">
              {`Q.No ${questionIndex + 1}: ${question?.question} ` }
            <span className={`${question.difficulty == "Hard" ? "bg-red-500" : (question.difficulty == "Medium" ? "bg-yellow-500" : "bg-green-500") } text-white border rounded-lg text-sm px-2 py-1`}>
            {question?.difficulty}
            </span>
            {question?.category && <span className={`${question.difficulty == "Hard" ? "text-red-500" : (question.difficulty == "Medium" ? "text-yellow-500" : "text-green-500") } ml-1 border rounded-lg text-sm px-2 py-1`}>
            {question?.category}
            </span>}
            </span>

            {question?.answers &&
              Object.entries(question.answers)
                .filter(([, value]) => value !== null)
                .map(([key, answer], i) => (
                  <div key={i} className="mt-2">
                    <input
                      id={`answer-${key}`}  // Add unique id for each input
                      name={question.id}
                      type="radio"
                      value={answer}
                      onChange={(e) => handleSelectedAnswer(e, question.id)}
                      className="mr-2 cursor-pointer"
                    />
                    <label className='cursor cursor-pointer' htmlFor={`answer-${key}`}>
                      {answer}
                    </label>
                  </div>
                ))}
          </div>
        </div>
      )}

      {/* Static buttons at the bottom */}
      <StaticBtn>
        <button
          onClick={handlePrevQuestion}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 mr-2"
        >
          Prev
        </button>
        <button
          onClick={handleNextQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {questionIndex === ques.length - 1 ? 'Submit' : 'Next'}
        </button>
      </StaticBtn>
    </div>
  );
}

export default Question;
