import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { TaskService } from 'app/crm/services/task.service';
import Swal from 'sweetalert2';
import { ContactCreateComponent } from '../contact-create/contact-create.component';

@Component({
  selector: 'app-lead-data-row',
  templateUrl: './lead-data-row.component.html',
  styleUrls: ['./lead-data-row.component.scss'],
  animations: [
    trigger('fade', [
      state(
        'void, hidden',
        style({
          opacity: 0
          // transform: 'translateX(-100%)',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1
          // transform: 'translateX(0%)',
        })
      ),
      transition('hidden => visible', [animate('300ms ease')])
    ])
  ]
})
export class LeadDataRowComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() visibility: string;
  @Output() changeRow = new EventEmitter();
  localVisibility = 'hidden';

  constructor(
    private modalService: NgbModal,
    private taskService: TaskService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      if (changes.visibility) {
        this.localVisibility = changes.visibility.currentValue;
      }
    }, 100);
  }
  openTaskModal() {
    const taskModal = this.modalService.open(TaskCreateComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
    taskModal.componentInstance.lead_id = this.data.id;
    taskModal.result.then(val => {
      if (val === 'saved') {
        Swal.fire('Success', 'Task Created Successfully', 'success').then(
          () => {
            this.changeRow.emit(true);
          }
        );
      }
    });
  }

  markTaskAsDone(taskId) {
    Swal.fire({
      title: `Are You Sure?`,
      text: `Mark this Task as Done`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result: any) => {
      if (result.value) {
        this.taskService.markTaskAsDone(taskId).subscribe((data: any) => {
          Swal.fire('Good Job', 'Task Marked As Done', 'success').then(() =>
            this.changeRow.emit(true)
          );
        });
      }
    });
  }
  openContactModal() {
    const contactModal = this.modalService.open(ContactCreateComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static'
    });
    contactModal.componentInstance.lead_id = this.data.id;
  }
}
