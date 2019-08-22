import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-lead-data-row',
  templateUrl: './lead-data-row.component.html',
  styleUrls: ['./lead-data-row.component.scss'],
  animations: [
    trigger('fade', [
      state('void, hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden <=> visible', [
        animate(150)
      ])
    ])
  ]
})
export class LeadDataRowComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() visibility: string;
  localVisibility: string = "hidden";

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)

    setTimeout(() => {
      this.localVisibility = changes.visibility.currentValue;
    }, 500)

  }
}
