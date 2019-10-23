import { Component, OnInit, Inject, resolveForwardRef, OnDestroy } from '@angular/core';
import { AppointmentReq } from 'src/contracts/request';
import { RequestsService } from '../services/requests.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { interval, Subscription } from 'rxjs';
import { NgProgress } from '@ngx-progressbar-rj/core';

export interface DialogData {
  message: string
  name: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private progress:NgProgress,private reqService: RequestsService, private route: Router, public dialog: MatDialog, private cookieService: CookieService) { }
  requests: AppointmentReq[];

  subscription: Subscription;
  source = interval(5000);
  text = 'Your Text Here';

//////////////////////
startedClass = false;
completedClass = false;
preventAbuse = false;
onStarted() {
  this.startedClass = true;
  setTimeout(() => {
    this.startedClass = false;
  }, 800);
}

onCompleted() {
  this.completedClass = true;
  setTimeout(() => {
    this.completedClass = false;
  }, 800);
}

/////////////////////
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  subscribe() {
    this.subscription = this.source.subscribe(val => {
      this.refreshReq(false);

    });
  }
  ngOnInit() {
    this.subscribe()
    if (this.cookieService.get("token") == "") {
      this.route.navigate(["/"])

    }
    this.refreshReq(true);

  }







  acceptReq(uid) {
    this.progress.start();
    this.subscription.unsubscribe()
    this.reqService.acceptReq(uid).subscribe(data => {
      this.refreshReq(true);
      this.subscribe()
      this.progress.complete()
    })

  }


  rejectReq(uid) {
    this.progress.start();
    
    this.subscription.unsubscribe()

    var name = '';
    this.requests.some(req => {
      if (req.uid === uid) {
        name = req.name;
        return true;
      }
    })

    const dialogRef = this.dialog.open(RejectDialog, {
      width: '25rem',
      data: { name: name, message: "I'm busy!" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reqService.rejectReq(uid, result).subscribe(data => {
      this.progress.complete()
         
          this.refreshReq(true);
          this.subscribe()

        })
      }
    });


  }

  undoReq(uid) {
    this.progress.start();

    this.subscription.unsubscribe()
    this.reqService.undoReq(uid).subscribe(data => {
      this.progress.complete()

      this.refreshReq(true);
      this.subscribe()
    })

  }
  removeReq(uid) {
    this.progress.start();

    this.subscription.unsubscribe()
    this.reqService.removeReq(uid).subscribe(data=>{
      this.refreshReq(true);
      this.subscribe()
    })
    
  }
  startReq(uid) {
    this.progress.start();

    this.subscription.unsubscribe()
    this.reqService.startReq(uid).subscribe(data=>{
      this.refreshReq(true);
      this.subscribe()
    })
    
  }
  endReq(uid) {
    this.progress.start();

    this.subscription.unsubscribe()
    this.reqService.endReq(uid).subscribe(data=>{
      this.refreshReq(true);
      this.subscribe()
    })
    
  }

  undoReject(uid) {
    this.progress.start();

    this.subscription.unsubscribe()
    this.reqService.undoReject(uid).subscribe(data => {
      this.progress.complete()

      this.refreshReq(true);
      this.subscribe()
    })

  }
  refreshReq(b:boolean) {
    if(b){
    this.progress.start()

    }

    this.reqService.getRequests().subscribe(data => {
      var allRequests: AppointmentReq[] = []

      // console.log(data)
      var temp: any[] = data["appoint"]
      temp.forEach(element => {
        var start = new Date(element["startTime"])
        var end = new Date(element["endTime"])
        allRequests.push({
          duration: "" + ((new Date(element["endtime"])).valueOf() - (new Date(element["startTime"])).valueOf()) / 60000,
          name: element["name"],
          startTime: start.getDate() + "/" + (start.getMonth() + 1) + "/" + start.getFullYear() + " " + start.getHours() + ":" + start.getMinutes(),
          uid: element["uuid"],
          isAccepted: element["isAccepted"],
          isRejected: element["isRejected"],
          tou: element["tou"],
          startTimeObj: start
        })
      });
      allRequests.sort(function (a, b) {
        return a.startTimeObj.getTime() - b.startTimeObj.getTime();
      });
      // console.log(allRequests)
      this.requests = allRequests
      if(b){
      this.progress.complete()

      }
    });//remove this and add refresh logic
  }
}

@Component({
  selector: 'reject-message-dialog',
  templateUrl: 'rejectDialog.html',
  styleUrls: ['reject.scss']
})
export class RejectDialog {

  constructor(
    public dialogRef: MatDialogRef<RejectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}