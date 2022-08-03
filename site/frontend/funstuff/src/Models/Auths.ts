export const ADMIN_USER = "admin";

export type AuthData = {
    auth: string;
};

export enum AUTH_LEVEL {
    regular="regular",
    admin="admin",
    rejected="rejected"
}

export type UserAuth = {
    username: string;
    authLevel: AUTH_LEVEL;
}