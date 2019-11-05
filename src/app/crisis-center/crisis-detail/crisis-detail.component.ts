import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {

  crisis$: Observable<Crisis>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crisisService: CrisisService,
    private location: Location
  ) { }

  ngOnInit() {
    // Observable paramMap and component reuse
    this.crisis$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.crisisService.getCrisis(params.get('id')))
    );

    // Snapshot: the no-observable alternative
    let id = this.route.snapshot.paramMap.get('id');
    this.crisis$ = this.crisisService.getCrisis(id);
  }

  gotoCrises(crisis: Crisis): void {
    let crisisId = crisis ? crisis.id : null;
    // Pass along the crisis id if available
    // so that the crisisList component can select that crisis.
    // Include a junk `foo` property for fun.
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }

}
