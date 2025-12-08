export interface LoginFormInputs {
  email: string;
  password: string;
}
export interface RegisterFormInputs extends LoginFormInputs {
  name: string;
}
