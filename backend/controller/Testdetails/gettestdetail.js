const UserQuiz = require("../../models/Sharetest");
// Function to get all quiz data for a specific user and quizCode
const getTestDetails = async (req, res) => {
  try {
    // Retrieve userId from the request (assuming authentication middleware provides it)
    const userId = req.userId;

    // Retrieve quizCode from the request parameters
    const { quizCode } = req.params;

    // Query to find the quiz associated with this userId and quizCode
    const quiz = await UserQuiz.findOne({ userId, quizCode });

    // Check if the quiz exists
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found for this user.' });
    }

    // Send the quiz data as the response
    res.status(200).json(quiz);
  } catch (error) {
    // Handle errors (e.g., database issues)
    res.status(500).json({ error: 'Failed to retrieve quiz data for the user.' });
  }
};

module.exports = { getTestDetails };