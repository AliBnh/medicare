const { login } = require("../services/authService");

const loginController = async (req, res) => {
  const { username, password } = req.body;
  try {
    const loginService = await login(username, password);
    res.json({ loginService, role: "superadmin" });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { loginController };
