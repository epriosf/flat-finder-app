export interface UserOutput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: Date;
  profile: string;
  isAdmin: boolean;
}
export interface UserOrderBy {
  email: string;
  firstName: string;
  lastName: string;
}
