import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { CrisisDetailComponent } from './crisis-center/crisis-detail/crisis-detail.component';

/**
 * Alternativaly, make a component-specific CanDeactivate guard for the CrisisDetailComponent.
 * The canDeactivate() method provides you with the current instance of component, the
 * current ActivatedRoute, and RouterStateSnapshot in case you needed to access some external
 * information.
 * This would be useful if you only wanted to use this guard for this component and needed to
 * get the component's properties or confirm whether the router should allow navigation away
 */

@Injectable({
  providedIn: 'root'
})
export class CanDeactivate2Guard implements CanDeactivate<CrisisDetailComponent> {
  canDeactivate(
    component: CrisisDetailComponent,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    // Get the Crisis Center ID
    console.log(next.paramMap.get('id'));

    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!component.crisis || component.crisis.name === component.editName) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return component.dialogService.confirm('Discard changes?');
  }

}
