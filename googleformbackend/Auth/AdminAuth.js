const jwt = require("jsonwebtoken");

const AdminAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader);
  if (!authHeader) {
    req.isAdminAuth = false;
    return next();
  }
  const token = authHeader;
  // const token = authHeader.split(" ")[1];
  // console.log(jwt.verify(token, "somesupersecretsecret"));

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecretsecret");
    console.log(decodedToken);
  } catch (err) {
    req.isAdminAuth = false;
    console.log("adminAuth", req.isAdminAuth);

    return next();
  }

  if (!decodedToken) {
    req.isAdminAuth = false;
    return next();
  }
  req.userId = decodedToken.userId;

  req.isAdminAuth = true;
  console.log(req.isAdminAuth);
  next();
};

module.exports = AdminAuth;
