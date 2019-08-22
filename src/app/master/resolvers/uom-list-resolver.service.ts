import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { uom } from '../models/uom.model';
import { Observable } from 'rxjs';
import { UomService } from '../services/uom.service';

@Injectable({
  providedIn: 'root'
})
export class UomListResolverService implements Resolve<uom[]> {


  constructor(
    private uomService: UomService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, ): uom[] | Observable<uom[]> | Promise<uom[]> {
    return this.uomService.full_list();
  }
}
