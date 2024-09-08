const UserQuiz = require("../../models/Sharetest");

// Function to get all quiz codes for a specific user
const getUserQuizCodes = async (req, res) => {
  try {
    // Retrieve userId from the request (assuming authentication middleware provides it)
    const userId = req.userId;

    // Query to find all quizzes associated with this userId
    const quizzes = await UserQuiz.find({ userId }).select('quizCode -_id'); // Only select quizCode

    // Extract the quiz codes from the result
    const quizCodes = quizzes.map(quiz => quiz.quizCode);

    // Send the quiz codes as the response
    res.status(200).json({ quizCodes });
  } catch (error) {
    // Handle errors (e.g., database issues)
    res.status(500).json({ error: 'Failed to retrieve quiz codes for the user.' });
  }
};

module.exports = { getUserQuizCodes };
