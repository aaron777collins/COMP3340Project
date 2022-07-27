export type UserModel = {
    username: string;
    password: string; // base 64 encoded
    email: string;
}

export type UserLoginInfo = {
    username: string;
    password: string; // base 64 encoded
}