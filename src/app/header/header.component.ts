import { Component, ViewEncapsulation, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthUser } from '../..//models';
import { AppState } from '../redux/app.state';
import { DeleteAuth } from '../redux/auth.action';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnChanges {
  links = [
    {name: 'First Link', path: '/flat'},
    {name: 'Second Link', path: '/'}
  ];
  @Input () user: AuthUser;
  @Input () isAuth: boolean;
  private authLink = {name: 'Login', path: '/login'};

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isAuth.currentValue !== changes.isAuth.previousValue) {
      if (changes.isAuth.currentValue) {
          this.links = this.links.filter(link => link.name !== this.authLink.name);
      }
      else {
        this.links.push(this.authLink);
      }
    }
  }

  onLogout = () => {
    this.authService.removeTokens();
    this.store.dispatch(new DeleteAuth());
    this.router.navigate(['/']);
  }

  isCurrentRoute(route: string): boolean {
    return this.router.url === route;
  }
}
