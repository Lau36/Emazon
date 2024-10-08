import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() error: boolean = false;
  @Input() message: string = '';
  isVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      // this.isVisible = false;
    }, 3000);
  }



  // show(message: string): void {
  //   this.message = message;
  //   this.isVisible = true;

  //   setTimeout(() => {
  //     this.isVisible = false;
  //   }, 3000);
  // }
}
