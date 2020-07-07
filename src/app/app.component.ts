import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from './redux/app.state';
import { AuthState, UserPayload, AuthUser } from '../models';
import { AuthService } from './auth/auth.service';
import { AddAuth } from './redux/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public title = 'real-estate-dashboard';
  public authState: Observable<AuthState>;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
  ){}

  ngOnInit(): void {
    this.authState = this.store.select('authPage');
    const authStore: AuthState = this.authService.getUserData();
    if (authStore) {
      this.store.dispatch(new AddAuth(authStore));
    }
    console.log('authStore', authStore)
  }
}
