import { useState } from 'react';

const AccessQuiz = () => {
  const [quizCode, setQuizCode] = useState('');
  const [quizzes, setQuizzes] = useState([
    { name: 'Math Quiz', code: '1234-5678-9012', totalMarks: 100, canNavigate: true },
    { name: 'Science Quiz', code: '5678-9012-3456', totalMarks: 80, canNavigate: false },
    { name: 'History Quiz', code: '9012-3456-7890', totalMarks: 90, canNavigate: true },
    { name: 'Geography Quiz', code: '3456-7890-1234', totalMarks: 70, canNavigate: false },
    // Add more quiz data for testing scroll behavior
  ]);

  const handleAddQuiz = () => {
    // Function to add quiz to the list
    // Add logic here to validate and add quiz
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 py-10">
      {/* Quiz Code Input Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 w-full max-w-lg text-center">
        <h2 className="text-3xl font-semibold mb-4">Add Quiz</h2>
        <div className="flex items-center justify-center space-x-4">
          <input
            type="text"
            placeholder="Enter Quiz Code"
            value={quizCode}
            onChange={(e) => setQuizCode(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full max-w-xs"
          />
          <button
            onClick={handleAddQuiz}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Quiz
          </button>
        </div>
      </div>

      {/* Quizzes List Section */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold mb-4 text-center">Your Quizzes</h2>
        <div className="max-h-96 overflow-y-auto">
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center">Quiz Name</th>
                <th className="px-4 py-2 text-center">Quiz Code</th>
                <th className="px-4 py-2 text-center">Total Marks</th>
                <th className="px-4 py-2 text-center">Navigation</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 text-center">{quiz.name}</td>
                  <td className="px-4 py-2 text-center">{quiz.code}</td>
                  <td className="px-4 py-2 text-center">{quiz.totalMarks}</td>
                  <td className="px-4 py-2 text-center">
                    {quiz.canNavigate ? (
                      <span className="inline-block w-4 h-4 bg-green-500 rounded-full"></span>
                    ) : (
                      <span className="inline-block w-4 h-4 bg-red-500 rounded-full"></span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                      Attempt Quiz
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccessQuiz;
