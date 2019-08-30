import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';
import { LeadService } from 'app/crm/services/lead.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

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
  expandedElement: PeriodicElement;
  visibility = 'hidden';
  constructor(private router: Router, private leadService: LeadService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.leadService.list().subscribe((data: any) => {
      this.dataSource = data.data;
    });
  }
  expandElement(element, expandedElement) {
    this.visibility = expandedElement === element ? 'visible' : 'hidden';
  }
}

const ELEMENT_DATA = [
  {
    'Company Name': 'Rokso Pvt Ltd',
    'Assigned To': 'Jatin Parmar',
    'Lead Status': 'Qualified',
    id: 1
  },
  {
    'Company Name': 'Rokso Pvt Ltd',
    'Assigned To': 'Jatin Parmar',
    'Lead Status': 'Qualified',
    id: 1
  },
  {
    'Company Name': 'Rokso Pvt Ltd',
    'Assigned To': 'Jatin Parmar',
    'Lead Status': 'Qualified',
    id: 1
  },
  {
    'Company Name': 'Rokso Pvt Ltd',
    'Assigned To': 'Jatin Parmar',
    'Lead Status': 'Qualified',
    id: 1
  },
  {
    'Company Name': 'Rokso Pvt Ltd',
    'Assigned To': 'Jatin Parmar',
    'Lead Status': 'Qualified',
    id: 1
  },
  {
    'Company Name': 'Rokso Pvt Ltd',
    'Assigned To': 'Jatin Parmar',
    'Lead Status': 'Qualified',
    id: 1
  }
];
