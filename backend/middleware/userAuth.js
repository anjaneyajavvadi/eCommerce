import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Token not found" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!req.body) {
      req.body = {};
    }
    
    req.body.userId = decoded.id;
    
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default userAuth;
