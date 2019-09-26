import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Router } from '@angular/router';
import { LeadService } from 'app/crm/services/lead.service';
import { PaginationData } from 'app/crm/Models/pagination.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms ease-in'))
    ])
  ]
})
export class LeadListComponent implements OnInit, AfterViewInit {
  dataSource = [];
  columnsToDisplay = ['company_name', 'lead_status', 'assigned_to'];
  expandedElement;
  visibility = 'hidden';
  paginationData: PaginationData = {
    current_page: 0,
    data: null,
    first_page_url: '',
    from: 0,
    last_page: 0,
    last_page_url: '',
    next_page_url: null,
    path: '',
    per_page: 0,
    prev_page_url: null,
    to: 0,
    total: 0
  };
  constructor(private router: Router, private leadService: LeadService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.leadService.list().subscribe((data: any) => {
      this.paginationData = data;
      this.dataSource = data.data;
    });
  }
  expandElement(element, expandedElement) {
    this.visibility = expandedElement === element ? 'visible' : 'hidden';
  }
  reloadDetails(event) {
    if (event) {
      this.leadService
        .list(this.paginationData.current_page)
        .subscribe((data: any) => {
          this.paginationData = data;
          this.dataSource = data.data;
        });
    }
  }

  pageChange(event: PageEvent) {
    this.leadService.list(event.pageIndex + 1).subscribe((data: any) => {
      this.paginationData = data;
      this.dataSource = data.data;
    });
  }
}
