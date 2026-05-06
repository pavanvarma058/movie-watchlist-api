import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

// Read the token from the reqest
// check if token is valid

export const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }

  try {
    // verify token and extract user id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user; // Attach user info to request object
    next();
  } catch (err) {
    return res.status(401).json({ error: "Not authorized, invalid token" });
  }
};
