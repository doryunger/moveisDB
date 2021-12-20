import { Component, OnInit,Inject,Injectable } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {Genres} from '../../_helpers/genre/genrelist';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {AbstractControl,ValidatorFn,ReactiveFormsModule,AsyncValidatorFn,ValidationErrors}  from '@angular/forms';
import {formatDate} from '@angular/common';
import {Requests} from '../../_helpers/api_requests';
import './dialog.component.css';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html'
})
@Injectable({
  providedIn: 'root'
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data:any,library: FaIconLibrary,private genree:Genres,private firebase: AngularFireDatabase,private api:Requests, private http:HttpClient,public dialogRef: MatDialogRef<DialogComponent>) {
    library.addIconPacks(fab,far);
   }
  //init global varaibles
  genrelist:Array<any>;
  movieList: AngularFireList<any>;
  movies:Array<any>;

  ngOnInit() {
    //Listnes to the movies collection on firebae
    this.firebase.list('movies').valueChanges().subscribe(result=>{
      this.movies=result;
    })
    //Reciving the updated genre list
    this.genree.curretGenres.subscribe(list => {this.genrelist = list})
  }

  //Setting form object
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    moviename: new FormControl('', [Validators.required, Validators.maxLength(30),Validators.pattern('[a-zA-Z 0-9]*'),this.checkMovieName()]),
    genre: new FormControl('', Validators.required),
    imdblink: new FormControl('', [Validators.required,Validators.pattern('(https?:\/\/.*(?:imdb.com).*)')]),
    image: new FormControl('',[Validators.required,Validators.pattern('(https?:\/\/.*(?:amazon).*\.(?:png|jpg))')])
  });
  // Setting default values for form's varaibles
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      moviename: '',
      genre: '',
      imdblink: '',
      image: ''
    });
  }
 
 // Validates unique movie names 
checkMovieName():ValidatorFn{
  return (control:AbstractControl):{[key:string]:any}|null=>{
  let overlap=null;
  if(this.movies!=undefined){
    this.movies.forEach((movie) => {
    if (control.value==movie.title){
      overlap=movie.title
      }
    });
  }
  return overlap?{title:{value:overlap}}:null;
  };
}
//Insert movie entry to firebase
insertMovie(movie) {
  this.api.movieList.push({
    title: movie.moviename,
    genre: movie.genre,
    link: movie.imdblink,
    img: movie.image,
    update: formatDate(new Date(), 'dd/MM/yyyy', 'en')
  });
}
//Setting submit event function
onSubmit() {
    this.insertMovie(this.form.value);
    this.initializeFormGroup();
    this.onClose();
}
//Setting close event function
onClose(){
  this.dialogRef.close();
}
 //Validates that the URL exists
checkUrl(control: AbstractControl): Promise<any> | Observable<any> {
  if (control.value.length>1){
  console.log(control.value);
  const params = new HttpParams().set("url", control.value);
  return this.http.get<any>('/validateURL',{params})
    .pipe(
      map(res => {
        return res.usernameAvailable ? null : {existingUsername: true};
      })
    );
  }
}

}
