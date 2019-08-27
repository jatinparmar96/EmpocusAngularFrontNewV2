import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanDeactivateComponent {
  canDeactivate;
}
@Injectable({
  providedIn: 'root'
})
export class FormAbandonGuard implements CanDeactivate<CanDeactivateComponent> {
  canDeactivate(component: CanDeactivateComponent): boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
