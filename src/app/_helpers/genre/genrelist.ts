import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class Genres {
    private genreList = new BehaviorSubject(['1','2','3']);
    curretGenres = this.genreList.asObservable();

  constructor() {}

  changeList(genree: Array<any>) {
    this.genreList.next(genree)
  }



}
