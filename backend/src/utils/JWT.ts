import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
if (!secret) throw new Error("JWT_SECRET not defined");

export const generateToken = (email: string, id: string | Object): string => {
  return jwt.sign({ email, id }, secret, { expiresIn: "3d" });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};
