import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ApiService } from 'app/shared/services/api.service';

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
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class LeadListComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ["Company Name", "Lead Status", "Assigned To"];
  expandedElement: PeriodicElement;
  visibility: string = 'hidden';
  constructor(
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
  }

  expandElement(element, expandedElement) {
    this.visibility = expandedElement == element ? 'visible' : 'hidden';
  }
}

const ELEMENT_DATA = [
  {
    "Company Name": "Rokso Pvt Ltd",
    "Assigned To": "Jatin Parmar",
    "Lead Status": "Qualified",
    "id": 1
  },
  {
    "Company Name": "Rokso Pvt Ltd",
    "Assigned To": "Jatin Parmar",
    "Lead Status": "Qualified",
    "id": 1
  },
  {
    "Company Name": "Rokso Pvt Ltd",
    "Assigned To": "Jatin Parmar",
    "Lead Status": "Qualified",
    "id": 1
  },
  {
    "Company Name": "Rokso Pvt Ltd",
    "Assigned To": "Jatin Parmar",
    "Lead Status": "Qualified",
    "id": 1
  },
  {
    "Company Name": "Rokso Pvt Ltd",
    "Assigned To": "Jatin Parmar",
    "Lead Status": "Qualified",
    "id": 1
  },
  {
    "Company Name": "Rokso Pvt Ltd",
    "Assigned To": "Jatin Parmar",
    "Lead Status": "Qualified",
    "id": 1
  },
];
