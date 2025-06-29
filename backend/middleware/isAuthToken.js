import jwt from "jsonwebtoken";
const isAuthtoken = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(500)
        .json({ success: false, message: "Token is not found" });
    }
    const verifytoken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verifytoken.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Is Auth error!" });
  }
};

export default isAuthtoken;
