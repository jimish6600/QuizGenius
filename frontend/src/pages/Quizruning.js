import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const Quizruning = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({
    text : "NaN",
    options : []
  });
  const [navigate , setNavigate] = useState(false);
  const [fetchData,setFetchData] = useState(false);
  const [answers, setAnswers] = useState("nan");
  const [sizeOfQuiz , setSizeOfQuiz] = useState([]);
  const [currentStatus , setCurrentStatus] = useState("running");
  const params = useParams();
  const authToken = localStorage.getItem('authToken');
  const navigateto = useNavigate();

  const handleAnswerChange = (e, questionIndex) => {
    const selectedAnswer = e.target.value;
    setAnswers(selectedAnswer);
  };

  const handleNext = async() => {
    
    if (currentQuestionIndex < sizeOfQuiz.length - 1) {
      setFetchData(true);
      await fetchqueationsdetials(currentQuestionIndex+1);
      setFetchData(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = async() => {
    
    if (currentQuestionIndex > 0) {
      setFetchData(true);
      await fetchqueationsdetials(currentQuestionIndex-1);
      setFetchData(false);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async() => {
    // Handle quiz submission
    setFetchData(true);
    try {
      const response = await axios({
        method: 'post', // Switch to 'post' to send a body
        url: `${process.env.REACT_APP_BACKEND_URL}/runtest/handlequizupdate/${params.quizCode}`,
        data: {
          question: currentQuestion.text,
          answer: answers,
          nextQuestionNumber: 1,
          status: "submitted",
        },
        headers: {
          authorization: authToken, // Set your authentication token here
        },
      });
      
        // Handle the response
        if(response.data.success){
          toast.success("Quiz submitted successfully.")
          navigateto("/attemptedquizzes")
        }else{
          toast.error(response?.data?.message || 'An error occurred')
        }
        
      } catch (error) {
        // Handle errors
        toast.error(error.response?.data?.message || 'An error occurred')
      }
      setFetchData(false);
  };

  const fetchqueationsdetials = async(indexq) => {
    try {
      const response = await axios({
        method: 'post', // Switch to 'post' to send a body
        url: `${process.env.REACT_APP_BACKEND_URL}/runtest/handlequizupdate/${params.quizCode}`,
        data: {
          question: currentQuestion.text,
          answer: answers,
          nextQuestionNumber: indexq + 1,
          status: currentStatus,
        },
        headers: {
          authorization: authToken, // Set your authentication token here
        },
      });
      
        // Handle the response
        console.log(response.data)
        if(response.data.success){
          
          setCurrentQuestion({
            text : response.data.data.nextQuestion.question,
            options : response.data.data.nextQuestion.options
          })
        }else{
          toast.error(response?.data?.message || 'An error occurred')
        }
        
      } catch (error) {
        // Handle errors
        toast.error(error.response?.data?.message || 'An error occurred')
      }
}

  useEffect(()=>{
    const fetchbasicinfomation = async() => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/runtest/getBasicinfomation/${params.quizCode}`, 
            {
              headers: {
                authorization: authToken, // Set your authentication token here
              },
            });
        
            // Handle the response
            console.log('Response Data:', response.data);
            setSizeOfQuiz(Array(response.data.numberOfQuestions).fill(false))
            setNavigate(response.data.navigate)
          } catch (error) {
            // Handle errors
            toast.error(error.response?.data?.message || 'An error occurred')
          }
    }


    fetchbasicinfomation();
    fetchqueationsdetials(0);
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
                  checked={answers === option}
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
          {
            navigate ? (
              fetchData ? (<button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                waiting..
              </button>) : (<button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Previous
          </button>)
            ):(<> </>)
          }
          
          {currentQuestionIndex === sizeOfQuiz.length - 1 ? (
            fetchData ? (<button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              waiting..
            </button>):<button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Submit
            </button>
          ) : (
            fetchData ? (<button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              waiting..
            </button>) :
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
