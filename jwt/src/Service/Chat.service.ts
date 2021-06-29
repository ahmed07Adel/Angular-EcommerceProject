import { ChatModel } from './../Models/ChatModel';
import { RegisterModel } from './../Models/RegisterModel';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from "rxjs";
import { LoginModel } from 'src/Models/LoginModel';
import * as signalR from '@microsoft/signalr';  



@Injectable({
  providedIn: 'root'
})

export class ChatService{
  private  connection: any = new signalR.HubConnectionBuilder().withUrl("https://localhost:44379/chatsocket")   // mapping to the chathub as in startup.cs
  .configureLogging(signalR.LogLevel.Information)
  .build();
readonly POST_URL = "https://localhost:44379/api/Chat/SendMsg"
ch:ChatModel;
private receivedMessageObject: ChatModel = new ChatModel();
private sharedObj = new Subject<ChatModel>();
  constructor(private http: HttpClient){
    this.connection.onclose(async () => {
      await this.start();
    });
     sessionStorage.getItem('loggeduser');
     var x = sessionStorage.getItem('userId');

    // this.ch.user = x;
    this.connection.on("ReceiveOne", (user, message) => { this.mapReceivedMessage(user, message); });
   this.start();  

  }
  //start connection
  public async start() {
    try {
      
      await this.connection.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    } 
  }
  private mapReceivedMessage(user: string, message: string): void {
   var UserEmail = sessionStorage.getItem('loggeduser');
user = UserEmail;
    this.receivedMessageObject.user = UserEmail;
    this.receivedMessageObject.message = message;
    this.sharedObj.next(this.receivedMessageObject);
 }
 public broadcastMessage(msgDto: any) {
   debugger;
   this.http.post(this.POST_URL, msgDto).subscribe(data => console.log(data));
  // this.connection.invoke("SendMessage", msgDto.user, msgDto.msgText).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
}

public retrieveMappedObject(): Observable<ChatModel> {
  return this.sharedObj.asObservable();
}

  // headers = {
  //   headers : new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   }),
  //   withCredentials: true
  // };

}
