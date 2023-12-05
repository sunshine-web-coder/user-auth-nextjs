import jwt from "jsonwebtoken";

const secret = process.env.JWT_ACCESS_SECRET;

const withAuth = (handler) => async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default withAuth;
