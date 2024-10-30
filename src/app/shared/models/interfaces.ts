import { JwtPayload } from "jwt-decode";

export interface listCategories{
  page: number;
  size: number;
  sort: string;
  sortDirection: string;
}



export interface userAux{
  name: string,
  lastName: string,
  identification: number,
  phoneNumber: string,
  birthDate: string,
  email: string,
  password: string
}




export interface TokenPayload extends JwtPayload{
  role: string,
  User_id: number
}
