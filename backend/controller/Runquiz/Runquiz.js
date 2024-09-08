const RunQuiz = require("../../models/Runquiz");
const UserQuiz = require("../../models/Sharetest");

const copyQuizData = async (req, res) => {
  try {
    // Extract quizCode properly from the URL params
    const { quizCode } = req.params; // Correct destructuring
    const userId = req.userId;

    // Check if the quiz has already been taken by the user
    const existingQuiz = await RunQuiz.findOne({ quizCode: quizCode, userId: userId });

    if (existingQuiz) {
      return res.status(400).send({
        message: "Quiz already taken by this user.",
        data: existingQuiz
      });
    }

    // Fetch the quiz from the UserQuiz model using quizCode
    const quiz = await UserQuiz.findOne({ quizCode });

    if (!quiz) {
      return res.status(404).send({ message: "Quiz not found" });
    }

    // Copy the data from UserQuiz to RunQuiz
    const newRunQuiz = new RunQuiz({
      quizCode: quizCode, // Correct key and value
      quizCreatorId: quiz.userId,
      userId: userId, 
      questions: quiz.questions.map((q) => ({
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        userAnswer: "NaN" // Initially empty
      })),
      navigate: quiz.navigate,
      score: 0
    });

    await newRunQuiz.save();

    res.status(200).send({
      message: "Quiz copied successfully",
      body : {
        quizCode: quizCode, // Send the quizCode
        numberOfQuestions: newRunQuiz.questions.length, // Send the number of questions
        navigate: newRunQuiz.navigate
      }
    });
  } catch (error) {
    console.error("Error copying quiz data:", error.message);
    res.status(500).send({
      message: "Error copying quiz data",
      error: error.message,
    });
  }
};

module.exports = copyQuizData;
