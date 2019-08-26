import { Injectable, NgModule } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
@NgModule({
  providers: [ToastrService]
})
export class NotifyService {
  constructor(private toastyservice: ToastrService) {}

  success(message: string) {
    this.toastyservice.success(message, 'Success', {
      progressBar: true
    });
  }
  show(data: any, type: string = 'success', duration: number = 5000) {
    const title: string = data.title;
    const message: string = data.message;
    switch (type) {
      case 'info':
        this.toastyservice.info(message, title);
        break;
      case 'success':
        this.toastyservice.success(message, title);
        break;
      case 'error':
        this.toastyservice.error(message, title);
        break;
      case 'warning':
        this.toastyservice.warning(message, title);
        break;
    }
  }
}
