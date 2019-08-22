import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, concat, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-contact-selector',
  templateUrl: './contact-selector.component.html',
  styleUrls: ['./contact-selector.component.scss']
})
export class ContactSelectorComponent implements OnInit {
  @Input() parentForm: string;
  @Input() controlName: string;
  @Output() value = new EventEmitter()

  contact: Observable<any>
  contactLoading: boolean = false;
  contactInput = new Subject<string>();

  constructor(

  ) { }

  ngOnInit() {

  }

}
