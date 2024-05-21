const userService = require("../services/userService");

exports.createUser = async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;
  const clinicDbName = req.headers["clinic-database"];

  try {
    const result = await userService.createUser(
      first_name,
      last_name,
      email,
      password,
      role,
      clinicDbName
    );
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUsers = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];
  try {
    const result = await userService.getAllUsers(clinicDbName);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  const clinicDbName = req.headers["clinic-database"];
  try {
    const result = await userService.getUserById(id, clinicDbName);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.searchUser = async (req, res) => {
  const { term } = req.params;
  const clinicDbName = req.headers["clinic-database"];
  try {
    const result = await userService.searchUser(term, clinicDbName);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, role } = req.body;
  console.log(req.body);
  const clinicDbName = req.headers["clinic-database"];
  try {
    const result = await userService.updateUserById(
      id,
      first_name,
      last_name,
      email,
      role,
      clinicDbName
    );
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const clinicDbName = req.headers["clinic-database"];
  try {
    const result = await userService.deleteUserById(id, clinicDbName);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
