import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero$: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    // Observable paramMap and component reuse
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.heroService.getHero(params.get('id')))
    );

    // Snapshot: the no-observable alternative
    let id = this.route.snapshot.paramMap.get('id');
    this.hero$ = this.heroService.getHero(id);
  }

  gotoHeroes(hero: Hero): void {
    let heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk `foo` property for fun.
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }

}
