import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Sample Quiz Data
const sampleQuizData = {
  questions: [
    {
      text: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"]
    },
    {
      text: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"]
    },
    {
      text: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"]
    }
  ]
};

const Quizruning = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [sizeOfQuiz , setSizeOfQuiz] = useState(Array(25).fill(false));
  const params = useParams();

  const handleAnswerChange = (e, questionIndex) => {
    const selectedAnswer = e.target.value;
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedAnswer;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < sampleQuizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Handle quiz submission
    console.log('Quiz submitted:', answers);
    alert('Quiz submitted! Check console for answers.');
  };

  const { questions } = sampleQuizData;
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(()=>{
    console.log(params.quizCode);
  },[])
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 p-4 bg-gray-100 border-r border-gray-300 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Questions</h2>
        <ul className='flex items-center flex-wrap'>
          {sizeOfQuiz.map((value, index) => (
            <li
              key={index}
              className={` cursor-pointer p-2 pl-1 pr-1 mb-2 rounded-lg transition ${index === currentQuestionIndex ? 'bg-blue-500 text-white' : value?'bg-green-500 text-white': 'hover:bg-gray-200'}`}
            >
              <div className={`w-8 h-8 flex items-center justify-center m-1 font-semibold rounded-full ${index === currentQuestionIndex ? 'bg-blue-700 text-white' : 'bg-gray-300 text-gray-700'}`}>
                {index + 1}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Question Area */}
      <div className="w-3/4 p-8">
        <h2 className="text-2xl font-bold mb-6">Question {currentQuestionIndex + 1}</h2>
        <div className="mb-6">
          <p className="text-lg mb-4">{currentQuestion.text}</p>
          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => (
              <div key={idx} className="flex items-center">
                <input
                  type="radio"
                  id={`option${idx}`}
                  name={`question${currentQuestionIndex}`}
                  value={option}
                  checked={answers[currentQuestionIndex] === option}
                  onChange={(e) => handleAnswerChange(e, currentQuestionIndex)}
                  className="form-radio text-blue-500"
                />
                <label htmlFor={`option${idx}`} className="ml-3 text-lg">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Previous
          </button>
          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quizruning;
