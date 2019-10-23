import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DialogData } from './home/home.component';
import { RequestsService } from './services/requests.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BIU portal';
  constructor(private router: Router, private cookieService: CookieService, public dialog: MatDialog, private reqService:RequestsService) {


  }
  isHomeRoute() {
    return this.router.url === '/home';
  }

  logout() {
    console.log("asdfsd")
    this.router.navigate(["/"]);
    this.cookieService.delete("name")
    this.cookieService.delete("token")


  }

  getName() {
    return this.cookieService.get("name")
  }

  sendMsg() {
    const dialogRef = this.dialog.open(SendMsgComponent, {
      width: '25rem',
      data: { name: this.cookieService.get("name"), message: "I'm busy!" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.reqService.sendMsg(result).subscribe(data=>{
         console.log(data)
       })
      }
    });
  }
}


@Component({
  selector: 'reject-message-dialog',
  templateUrl: 'sendMsg.html',
  styleUrls: ['sendMsg.scss']
})
export class SendMsgComponent {

  constructor(
    public dialogRef: MatDialogRef<SendMsgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
