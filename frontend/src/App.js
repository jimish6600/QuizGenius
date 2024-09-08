import { createBrowserRouter,
  RouterProvider, } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './pages/Auth';
import Layout from './pages/Layout';
import QuizManager from './pages/Createquiz';
import AccessQuiz from './pages/AccessQuiz';
import AttemptedQuizzes from './pages/AttemptedQuizzes';

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout/>
      ),
      children:[
        {
          path:"/auth",
          element:<Auth/>
        },
        {
          path:"/createquiz",
          element:<QuizManager/>
        },
        {
          path:"/accessquiz",
          element:<AccessQuiz/>
        },
        {
          path:"/attemptedquizzes",
          element:<AttemptedQuizzes/>
        },
      ]
    }
  ]);
  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer />
    </>
  );
}

export default App;