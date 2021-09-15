export interface Token {
  token : string
}
export interface userLogin {
  username : string ,
  password : string
}
export interface userSignUp {
  username : string ,
  email : string ,
  password : string ,
  fullName : string,
  avatar?: string;
}
export interface UserEditData {
  user : {
    avatar?: string | undefined;
    username : string ,
    email : string ,
    password : string ,
    fullName : string
  }
}
