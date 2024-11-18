import { JwtPayload } from "jwt-decode";

export interface TokenPayload extends JwtPayload{
  role: string,
  User_id: number
}
