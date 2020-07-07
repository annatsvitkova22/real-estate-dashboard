import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Estate, Estates, IdEstate } from '../../models';
import { AppState } from '../redux/app.state';
import { Observable } from 'rxjs';

import { PostService } from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public estates: Estate[] = [];
  public estateState: Observable<Estates>;
  public idState: Observable<IdEstate>;

  constructor(
    private store: Store<AppState>,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.estateState = this.store.select('estatePage');
    this.idState = this.store.select('idCounterPage');
    this.postService.getEstate().subscribe(res => {
      console.log('res', res);
    });
  }

  // onAdd(estate: Estate) {
  //   this.estates.push(estate);
  // }

  // onDelete(estate: Estate) {
  //   this.estates = this.estates.filter(es => es.id !== estate.id);
  // }
}
