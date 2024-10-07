import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StaticBtn } from './StaticBtn';

function Question({ numQuestions, setQuizStarted, setScore, setShowScoreCard, difficulty, category }) {
  const [ques, setQues] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log({ques})

  const handleSelectedAnswer = (event, id, answer) => {
    setQues((prev) => {
      const updatedQues = [...prev];
      const index = updatedQues.findIndex((item) => item.id === id);

      if (index !== -1) {
        updatedQues[index] = { ...updatedQues[index], selected: answer };
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
    <div className="p-8 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      {loading ? (
        <div>Loading questions...</div>
      ) : (
        <div className="w-full max-w-2xl mx-auto">
          <div key={question?.id} className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              Q.No {questionIndex + 1}: {question?.question}
            </h2>
            <div className="flex items-center mb-4">
              <span className={`text-white text-sm px-2 py-1 rounded-lg ${
                question.difficulty === 'Hard'
                  ? 'bg-red-500'
                  : question.difficulty === 'Medium'
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}>
                {question?.difficulty}
              </span>
              {question?.category && (
                <span className={`ml-2 text-sm px-2 py-1 rounded-lg border ${
                  question.difficulty === 'Hard'
                    ? 'text-red-500 border-red-500'
                    : question.difficulty === 'Medium'
                    ? 'text-yellow-500 border-yellow-500'
                    : 'text-green-500 border-green-500'
                }`}>
                  {question?.category}
                </span>
              )}
            </div>

            {/* Answers */}
            {question?.answers &&
              Object.entries(question.answers)
                .filter(([, value]) => value !== null)
                .map(([key, answer], i) => (
                  <div 
                    key={i}
                    onClick={() => handleSelectedAnswer(null, question.id, answer)}
                    className={`cursor-pointer block w-full text-lg font-medium bg-gray-100 hover:bg-blue-100 text-gray-800 px-6 py-2 rounded-md mb-2 transition-all ${
                      ques[questionIndex]?.selected === answer
                        ? 'border-2 border-blue-600'
                        : ''
                    } flex items-center justify-between`}
                  >
                    <span>{answer}</span>
                    {ques[questionIndex]?.selected === answer && (
                      <span className="text-blue-600 font-bold text-xl">✓</span>
                    )}
                  </div>
                ))}
          </div>
        </div>
      )}

      {/* Static buttons at the bottom */}
      <StaticBtn>
        <button
          onClick={handlePrevQuestion}
          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 mr-2"
        >
          Prev
        </button>
        <button
          onClick={handleNextQuestion}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          {questionIndex === ques.length - 1 ? 'Submit' : 'Next'}
        </button>
      </StaticBtn>
    </div>
  );
}

export default Question;
