import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  id: any
  data: any
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] == 'new') {
        this.id = "new";
      } else {
        this.id = +params['id']; // (+) converts string 'id' to a number
        this.getData(this.id);
      }
    });
  }
  getData(id: any) {
    this.apiService.get("admin/raw_product/" + id)
      .then(data => {
        let l_data: any = data;
        this.data = l_data.data
      })
  }
}
