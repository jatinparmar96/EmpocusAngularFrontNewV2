import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from 'app/crm/services/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  @Input() lead_id;
  @Output() task_status = new EventEmitter();
  task: FormGroup;

  processing = false;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.task = this.fb.group({
      id: ['new'],
      lead_id: [this.lead_id, Validators.required],
      task_type: ['', Validators.required],
      due_date: ['', Validators.required],
      description: []
    });
  }
  get title() {
    return this.task.controls.title;
  }
  get task_type() {
    return this.task.controls.task_type;
  }
  get due_date() {
    return this.task.controls.due_date;
  }

  storeTask() {
    if (this.task.valid) {
      this.processing = true;
      this.taskService
        .store(this.task.value)
        .then((data: any) => {
          if (data.status) {
            this.activeModal.close('saved');
            this.processing = false;
          }
        })
        .catch((error: any) => {
          this.processing = false;
        });
    }
  }
}
