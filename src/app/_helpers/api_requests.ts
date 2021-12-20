import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import {map,filter, mergeMap,debounceTime,switchMap ,delay,catchError,} from "rxjs/operators";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { of } from 'rxjs';
import { timer } from 'rxjs/observable/timer';
import {AbstractControl,ValidatorFn,ReactiveFormsModule,AsyncValidatorFn,ValidationErrors}  from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class Requests {
  
  constructor(private http:HttpClient,private firebase: AngularFireDatabase) { }
  movieList: AngularFireList<any>;

  checkUrl(Userurl){
    const body = { "url": Userurl };
    return  this.http.post<any>('/validateURL',body);
  } 
}