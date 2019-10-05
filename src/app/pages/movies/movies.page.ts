import { SearchType, MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  private subs = new SubSink();

  results = []
  searchTerm = '';
  type: SearchType = SearchType.all

  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  searchChanged(e) {
    console.log(e);
    this.subs.add(this.movieService.searchData(this.searchTerm, this.type).subscribe(data => {
      // console.log(data.Search);
      this.results = data.Search
    }))
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()

  }

}
