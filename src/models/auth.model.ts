export interface TokensModel {
    refreshToken?: string;
    accessToken?: string;
}

export interface AuthState {
    isAuth: boolean;
    user: AuthUser;
}

export interface UserPayload {
    firstName: string;
    userId: string;
    role: string;
    iat: Date;
    exp: Date;
}

export interface AuthUser {
    firstName: string;
    userId: string;
    role: string;
}
