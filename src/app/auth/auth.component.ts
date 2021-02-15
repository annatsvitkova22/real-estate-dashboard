import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthService } from './auth.service';
import { AuthState } from '../../models';
import { AppState } from '../redux/app.state';
import { AddAuth } from '../redux/auth.action';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    login: string = '';
    password: string = '';
    isError: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router,
        private store: Store<AppState>,
        private auth: AngularFireAuth
    ){}

    ngOnInit() {
        const isLoggedIn: boolean = this.authService.loggedIn();
        if (isLoggedIn) {
            this.router.navigate(['/']);
        }
    }

    onSubmit() {
        const data = {
            username: this.form.value.email,
            password:  this.form.value.password
        };
        this.authService.loginUser(data).subscribe((data) => {
            this.authService.setToken(data);
            const authStore: AuthState = this.authService.getUserByToken(data);
            if (authStore) {
                this.store.dispatch(new AddAuth(authStore));
                this.router.navigate(['/']);
            }
        }, (error) => {
            console.log('error', error);
            this.isError = true;
        });

        this.form.value.email = '';
        this.form.value.password = '';
    }

    onCreate = async () => {
        const {email, password} = this.form.value;
        await this.auth.createUserWithEmailAndPassword(email, password).then(async user => {
            console.log('user', user);
            await this.auth.signInWithEmailAndPassword(email, 'test').then(user => {
                console.log('test');
                console.log(user)
            })
        }).catch(err => {
            console.log('err', err)
        });

        this.form.value.email = '';
        this.form.value.password = '';
    }
}
