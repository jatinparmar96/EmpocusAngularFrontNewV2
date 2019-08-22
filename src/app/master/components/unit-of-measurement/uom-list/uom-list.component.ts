import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';
import { PaginationData } from 'app/master/models/pagination.model';

@Component({
  selector: 'app-uom-list',
  templateUrl: './uom-list.component.html',
  styleUrls: ['./uom-list.component.scss']
})
export class UomListComponent implements OnInit {

  paginationData: PaginationData = new PaginationData();
  rows: any;
  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.getData()
  }
  edit(id) {
    this.router.navigateByUrl('/dashboard/unit-of-measurement/' + id);
  }
  toCreate() {
    this.router.navigateByUrl('/dashboard/unit-of-measurement/new');
  }
  getData(page = 1) {
    this.apiService.get('admin/uom?page=' + page)
      .then(data => {

        let l_data: any = data;
        l_data = l_data.data;
        this.rows = l_data.data;
        this.paginationData = {
          total: l_data.total,
          from: l_data.from,
          to: l_data.to,
          prev_page_url: l_data.prev_page_url,
          next_page_url: l_data.next_page_url,
          per_page: l_data.per_page,
          current_page: l_data.current_page,
          id: 'get_list'
        }
      })
  }
}
