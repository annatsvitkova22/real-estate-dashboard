import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    async canActivate(): Promise<boolean> {
        let isAuth = false;
        await this.authService.updateToken().then(async res => {
            isAuth = await res;
        });
        if (isAuth) {
            return true;
        } else {
            this.router.navigate(['/login']);

            return false;
        }
    }
}
