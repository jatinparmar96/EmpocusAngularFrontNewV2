import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

export interface CanDeactivateComponent {
  canDeactivate;
}
@Injectable({
  providedIn: 'root'
})
export class FormAbandonGuard implements CanDeactivate<CanDeactivateComponent> {
  canDeactivate(component: CanDeactivateComponent): Promise<boolean> | boolean {
    if (component.canDeactivate && component.canDeactivate()) {
      return Swal.fire({
        title: `Are You Sure?`,
        text: `All your changes will be lost!`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(result => {
        if (result.value) {
          return true;
        }
      });
    } else {
      return true;
    }
  }
}
