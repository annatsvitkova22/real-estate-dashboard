import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

import { TokensModel, UserPayload, AuthState, AuthUser } from '../../models';

@Injectable()
export class AuthService {
    private loginPath: string = 'http://localhost:3000/api/login';
    private updateTokenPath: string = 'http://localhost:3000/api/refresh';

    constructor(private httpClient: HttpClient) {}

    loggedIn() {
        const isLoggedIn = !!localStorage.getItem('accessToken');

        return isLoggedIn;
    }

    checkToken(data: TokensModel): Observable<any> {
        const tokens = this.httpClient.post(this.updateTokenPath, data)
                        .pipe(catchError(this.errorHandler));
        return tokens;
    }

    updateToken = async (): Promise<boolean> => {
        const token = this.getTokens();
        if (!token) {
            this.removeTokens();

            return false;
        }
        const data: TokensModel = {
            refreshToken: token.refreshToken
        };

        await this.checkToken(data).toPromise().then(res => {
            this.setToken(res);
        }).catch(e => {
            this.removeTokens();
            console.log('error', e);
        });
        const isAuth: boolean = await this.loggedIn();

        return isAuth;
    }

    loginUser(data: any): Observable<any> {
        return this.httpClient.post(this.loginPath, data)
            .pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || 'Server Error');
    }

    setToken(tokens: TokensModel): void {
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
    }

    getTokens(): TokensModel {
        const refreshToken: string = localStorage.getItem('refreshToken');
        const accessToken: string = localStorage.getItem('accessToken');
        if (!refreshToken || !accessToken) {
            return;
        }
        const data: TokensModel = {
            refreshToken,
            accessToken
        };

        return data;
    }

    removeTokens = (): void => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
    }

    getUserData = (): AuthState => {
        const tokens: TokensModel = this.getTokens();
        if (!tokens) {
            return;
        }
        const authStore: AuthState = this.getUserByToken(tokens);

        return authStore;
    }

    getUserByToken = (tokens: TokensModel): AuthState => {
        const user: UserPayload = jwt_decode(tokens.accessToken);
        if (user) {
            const createUserStore: AuthUser = {} as AuthUser;
            createUserStore.firstName = user.firstName;
            createUserStore.role = user.role;
            createUserStore.userId = user.userId;
            const authStore: AuthState = {} as AuthState;
            authStore.isAuth = true;
            authStore.user = createUserStore;

            return authStore;
        }
    }
}
