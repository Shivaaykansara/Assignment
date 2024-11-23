import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: { id: string }; // Extend the Request interface to include `user`
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from the Authorization header

    if (!token) {
      res.status(401).json({ message: "Authorization token missing" });
      return;
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (typeof decoded !== "object" || !decoded.id) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    // Attach the user information to the request
    req.user = { id: decoded.id };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
