import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  @Input() error: boolean = false;
  @Input() message: string = '';
  isVisible: boolean = false;

  constructor() {}

}
