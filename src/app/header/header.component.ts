import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  links = [
    {name: 'First Link', path: '/flat'},
    {name: 'Second Link', path: '/'}
  ];

  constructor(private router : Router){}

  ngOnInit(): void {
  }

  isCurrentRoute(route : string) : boolean {
    return this.router.url === route;
  }
}
