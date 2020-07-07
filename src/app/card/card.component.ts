import { Component, Input } from '@angular/core';
import { Estate } from 'src/models';
import { Store } from '@ngrx/store';
import { DeleteEstate, EstateAction, EditEstate } from '../redux/estate.action';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input () estate: Estate;
  // @Output () deleteEstate = new EventEmitter<Estate>();

  constructor(
    private store: Store<EstateAction>
  ) { }

  onDelete() {
    this.store.dispatch(new DeleteEstate(this.estate));
    // this.deleteEstate.emit(this.estate);
  }

  onBuy() {
    // this.estate.isSold = true;
    this.store.dispatch(new EditEstate(this.estate));
  }
}
