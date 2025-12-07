export interface DecodedUser {
  email: string;
  id: string;
  role: "user" | "admin";
  exp: number;
  iat: number;
}

export interface AuthContextType {
  user: DecodedUser | null;
  login: (token: string) => void;
  logout: () => void;
}
