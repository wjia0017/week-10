import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  actorsDB: any[] = [];
  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";

  
  moviesDB: any[] = [];
  title: string = "";
  year: number = 0;
  movieId: string = "";
  aYear: number = 0;
  


  constructor(private dbService: DatabaseService) { }

  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }

  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }

  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
    this.title = "";
    this.year = 0;
  }
  
  //Get all Movies
  onGetMovies() {
    this.dbService.getMovie().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  

  //Create a new Actor, POST request
  onSaveMovie() {
    let obj = { title: this.title, year: this.year };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete Movie
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
      this.onGetActors();
    });
  }

  onAddActor(){
    let obj = {title: this.title, name: this.fullName};
    this.dbService.addActor(obj.title, obj.name).subscribe(result => {
      this.onGetActors();
      this.onGetMovies();

    });
  }

  onGetAllMoviesBeforeAYear(){
    this.dbService.getMovie().subscribe((data: any[]) => {
      this.moviesDB = data;
    });

  }

  // onGetMoviesProducedBeforeAYear() {
  //   this.dbService.getMovieBeforeAYear().subscribe((data: any[]) => {
  //     this.moviesDB = data;
  //   });
  // }
  
  onDeleteAllMovies(aYear){
    this.dbService.deleteAllMovies(aYear).subscribe(result => {
      this.onGetMovies();
  });
  }


}