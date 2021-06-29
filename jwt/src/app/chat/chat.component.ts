import { Component, OnInit } from '@angular/core';
import { ChatModel } from 'src/Models/ChatModel';
import { ChatService } from 'src/Service/Chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  today: number = Date.now();
  username= '';
  // ch: ChatModel;
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    // this.username = sessionStorage.getItem('loggeduser');
// this.username = this.msgDto.user;
    this.chatService.retrieveMappedObject().subscribe( (receivedObj: ChatModel) => { this.addToInbox(receivedObj);}); 
  }
  msgDto: ChatModel = new ChatModel();
  msgInboxArray: ChatModel[] = [];

  send(): void {
    debugger;
    // var x =  document.getElementById('cli');
    // x.nodeValue='';
    if(this.msgDto) {
      if(this.msgDto.user.length == 0 || this.msgDto.message.length == 0){
        window.alert("Both fields are required.");
        return;
      } else {
        this.chatService.broadcastMessage(this.msgDto);        // Send the message via a service
                               
        
      }
    }
  }
  // send(): void {
  //   debugger;

  //   if(this.msgDto) {
  //     if(this.msgDto.message.length == 0 || this.msgDto.message.length == null){
  //       window.alert("Message fields required.");
  //       return;
  //     } else {
  //       this.chatService.broadcastMessage(this.msgDto);                   // Send the message via a service
  //     }
  //    }
  // }
  addToInbox(obj: ChatModel) {
    debugger;
    let newObj = new ChatModel();
    newObj.user = obj.user;
    // newObj.user = this.username;
    newObj.message = obj.message;
    this.msgInboxArray.push(newObj);

  }
}
