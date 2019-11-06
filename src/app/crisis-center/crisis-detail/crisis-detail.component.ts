import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Crisis } from '../crisis';
// import { CrisisService } from '../crisis.service';
import { DialogService } from 'src/app/dialog.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {

  // crisis$: Observable<Crisis>;
  crisis: Crisis;
  editName: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService // for can-deactivate2
  ) { }

  ngOnInit() {

    // Observable paramMap and component reuse (v1)
    // this.crisis$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.crisisService.getCrisis(params.get('id')))
    // );

    // Snapshot: the no-observable alternative
    // let id = this.route.snapshot.paramMap.get('id');
    // this.crisis$ = this.crisisService.getCrisis(id);

    // (v2)
    this.route.data.subscribe((data: { crisis: Crisis }) => {
      this.editName = data.crisis.name;
      this.crisis = data.crisis;
    });

  }

  cancel() {
    this.gotoCrises();
  }

  save() {
    this.crisis.name = this.editName;
    this.gotoCrises();
  }

  // implements the confirmation workflow for unsaved changes.
  canDeactivate(): Observable<boolean> | boolean {

    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged.
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides.
    return this.dialogService.confirm('Discard changes?');

  }

  gotoCrises(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
