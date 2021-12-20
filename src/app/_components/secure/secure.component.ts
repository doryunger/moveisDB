import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {Genres} from '../../_helpers/genre/genrelist';
import {Requests} from '../../_helpers/api_requests';
import {Router} from "@angular/router"
import {MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import {MatDialog, MatDialogModule} from "@angular/material";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {DialogComponent } from '../dialog/dialog.component';
import './secure.component.css';
import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html'
})
export class SecureComponent implements OnInit {

	constructor(private api:Requests,private router: Router,public dialog: MatDialog,private form:DialogComponent,private genree:Genres,private firebase: AngularFireDatabase, private authenticationService: AuthenticationService){
		this.currentUser = this.authenticationService.currentUserValue;
  }
  
  //Init global varaibles
  currentUser: User;
  movies:Array<any>;
  sortedArray:Array<any>;
  genreList:Array<any>;
  currentGenre="All";
  
  ngOnInit() {
	//Pulling movies list from firebase
    this.getMovies().map(actions => {
			return actions.map(action => ({ key: action.key, ...action.payload.val() }));
		  }).subscribe( result => {
			let resArray:Array<any>;
			resArray=result;
			let listOfgenres=[];
			let movieArray=[];
			resArray.forEach((element) => {
				
				if(!listOfgenres.includes(element.genre))
				{
					listOfgenres.push(element.genre);
				}
				if(this.currentGenre!="All"){
					if(element.genre==this.currentGenre){
						movieArray.push(element)
					}
				}
				else{
					movieArray.push(element)
				}
			});
			this.genree.changeList(listOfgenres);
			this.genreList=listOfgenres;
			this.sortedArray =movieArray.sort(function(a, b){
				return <any>new Date(b.update.split('/').reverse().join('/')) - <any>new Date(a.update.split('/').reverse().join('/'));
		  });
			this.movies=this.sortedArray;
			console.log(this.movies);
			setTimeout(()=>{
				let header=document.getElementsByClassName('mat-card-header-text');
				for (let i=0; i<header.length;i++){
					header[i].setAttribute('style', 'margin: 1.5px 1.5px');
					header[i].setAttribute('style', 'word-break: break-word');
				}
			},2000)


			});
  }
  getMovies() {
		this.api.movieList = this.firebase.list('movies');
		return this.api.movieList.snapshotChanges();
  }
  //Filters movie by genre
  changeGenre(val){
	this.currentGenre=val;
	this.getMovies().map(actions => {
		return actions.map(action => ({ key: action.key, ...action.payload.val() }));
	  }).subscribe( result => {
		let resArray:Array<any>;
		resArray=result;
		let listOfgenres=[];
		let movieArray=[];
		resArray.forEach((element) => {
			
			if(!listOfgenres.includes(element.genre))
			{
				listOfgenres.push(element.genre);
			}
			if(this.currentGenre!="All"){
				if(element.genre==this.currentGenre){
					movieArray.push(element)
				}
			}
			else{
				movieArray.push(element)
			}
		});
		this.genree.changeList(listOfgenres);
		this.genreList=listOfgenres;
		this.sortedArray =movieArray.sort(function(a, b){
			return <any>new Date(b.update.split('/').reverse().join('/')) - <any>new Date(a.update.split('/').reverse().join('/'));
	  });
		this.movies=this.sortedArray;
		setTimeout(()=>{
			let header=document.getElementsByClassName('mat-card-header-text');
			for (let i=0; i<header.length;i++){
				header[i].setAttribute('style', 'margin: 1.5px 1.5px');
				header[i].setAttribute('style', 'word-break: break-word');
			}
		},2000)


		});
	}
//Opens the add movie form
openDialog(){
		this.form.initializeFormGroup();
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.width = "60%";
		this.dialog.open(DialogComponent,dialogConfig);
}
//Deletes movie from firebase and the screen
deleteMovie($key: string) {
	if(confirm('Are you sure to delete this record ?')){
	this.api.movieList.remove($key);
	}
  }
  logout() {
	this.authenticationService.logout();
	this.router.navigate(['/login']);
}
    

}
