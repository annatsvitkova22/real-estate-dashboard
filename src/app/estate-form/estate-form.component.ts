import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { transliterate as tr, slugify } from 'transliteration';

import { Estate } from '../../models';
import { AddEstate, EstateAction } from '../redux/estate.action';
import { IdEstateAction, AddIdEstate } from '../redux/id.action';

@Component({
    selector: 'app-estate-form',
    templateUrl: './estate-form.component.html',
    styleUrls: ['./estate-form.component.scss']
    })
    export class EstateFormComponent implements OnChanges {
    // private id: number = 2;
    estateName: string = '';
    estateInfo: string = '';
    @Input () id: number;

    // @Output() addEstate = new EventEmitter<Estate>();

    constructor(
        private store: Store<EstateAction>,
        private idStore: Store<IdEstateAction>,
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.id.previousValue !== changes.id.currentValue) {
            if ( this.estateInfo === '' || this.estateName === '') {
                return;
            }

            const estate = new Estate(
                this.estateName,
                moment().format('DD.MM.YY'),
                this.estateInfo,
                false,
                this.id
            );

            // this.addEstate.emit(estate);
            this.store.dispatch(new AddEstate(estate));
            this.estateInfo = '';
            this.estateName = '';
        }
    }

    onAdd() {
        if ( this.estateInfo === '' || this.estateName === '') {
            return;
        }
        const ttest = slugify(this.estateInfo);
        console.log('ttest', ttest)
        this.idStore.dispatch(new AddIdEstate());
    }
}
