export type UserModel = {
  username: string;
  password: string; // base 64 encoded
  email: string;
};

export type UserModelSecure = {
  username: string;
  email: string;
};

export type UserTaken = {
  taken: boolean;
};

export type UserLoginInfo = {
  username: string;
  password: string; // base 64 encoded
};

export type UserUpdateInfo = {
  username: string;
  newUsername: string;
  email: string;
  password: string; // base 64 encoded
};

export type UserShippingInfo = {
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zip: string;
};

export type UserPaymentInfo = {
    cardName: string;
    cardNumber: string;
    expDate: string;
    cvv: string;
}