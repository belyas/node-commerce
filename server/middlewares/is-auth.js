const jwt = require("jsonwebtoken");

export const hasUserSession = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }

  return next();
};

export const isAuthenticatedApi = (req, res, next) => {
  const authorization = req.get("Authorization");

  if (!authorization) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  const token = authorization.replace(/^Bearer\s+/, "");
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ error: true });
  }

  if (!decodedToken) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  req.userId = decodedToken.userId;

  return next();
};
