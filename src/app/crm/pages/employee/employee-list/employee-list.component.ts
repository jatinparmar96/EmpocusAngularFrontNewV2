import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
    const list = this.route.snapshot.data['employeeList'];
    console.log(list);
  }

  ngOnInit() {}
}
