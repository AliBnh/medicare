const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    {
      email: user.email,
      id: user.id,
      role: user.role,
      clinicDbName: user.clinic_id,
    },
    "jwtsecretplschange"
  );

  return accessToken;
};

const isAuthenticated = (req, res, next) => {
  const accessToken = req.headers["access-token"];

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated!" });

  try {
    const validToken = verify(accessToken, "jwtsecretplschange");
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

const validateTokenClinic = (req, res, next) => {
  const accessToken = req.headers["access-token-clinic"];

  if (!accessToken)
    return res.status(400).json({ error: "Clinic not Authenticated!" });

  try {
    const validToken = verify(accessToken, "jwtsecretplschange");

    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, isAuthenticated, validateTokenClinic };
