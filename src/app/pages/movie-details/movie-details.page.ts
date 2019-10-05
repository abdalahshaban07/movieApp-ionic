import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink'


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  private subs = new SubSink();
  info: any

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.subs.add(this.movieService.getDetails(id).subscribe(result => {
      // console.log('details', result);
      this.info = result
    }))
  }

  openWebsite() {
    window.open(this.info.Website, '_blank')
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()

  }

}
