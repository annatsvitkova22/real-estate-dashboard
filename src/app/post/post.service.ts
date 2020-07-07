import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class PostService {
    constructor(private httpClient: HttpClient) {}

    getEstate(): Observable<any> {
        return this.httpClient.get(`http://localhost:3000/product`);
    }
}
