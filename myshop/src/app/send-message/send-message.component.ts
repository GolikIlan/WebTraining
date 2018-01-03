import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  private _msg: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(loginForm:any){
    this._msg = `address: ${loginForm.value.email}, subject: ${loginForm.value.subject}, message: ${loginForm.value.message}`;
  }

  onSendDialogResult(args:boolean){
    if(args){
      console.log(this._msg);
    }
  }

}
