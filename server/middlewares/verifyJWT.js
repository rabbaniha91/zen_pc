import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (!authHeader.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .json({ message: "unauthorized access token! denied access." });

    req.userId = decoded.id;
    next();
  });
};

export default verifyJWT;
