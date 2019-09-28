import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';

@Component({
  selector: 'app-view-category-master',
  templateUrl: './view-category-master.component.html',
  styleUrls: ['./view-category-master.component.scss']
})
export class ViewCategoryMasterComponent implements OnInit {
  rows: any;
  link: any = '/dashboard/category/new';
  paginationData: any = {
    total: 0,
    from: 0,
    to: 0,
    prev_page_url: null,
    next_page_url: null,
    per_page: 20,
    current_page: 1
  };
  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.getData();
  }
  edit(id) {
    this.router.navigateByUrl('/dashboard/category/' + id);
  }
  toCreate() {
    this.router.navigateByUrl('/dashboard/category/new');
  }

  getData(page = 1) {
    this.apiService.get('admin/product_category?page=' + page).then(data => {
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
      };
    });
  }
}
