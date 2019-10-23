import { Injectable } from '@angular/core';
import { AppointmentReq } from 'src/contracts/request';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
    
  }
  getRequests() {
    //get ID from token and make http call
    // console.log(this.requests)
   return this.http.post("api/getAll", { "token": this.cookieService.get("token") })

    

  }

  acceptReq(id) {
    return this.http.post("api/acceptAppointment", { "token": this.cookieService.get("token"), "appointmentId": id })

  }

  rejectReq(id, msg) {
    return this.http.post("api/rejectAppointment", { "token": this.cookieService.get("token"), "appointmentId": id,"reason":msg })

  }

  removeReq(id) {
    return this.http.post("api/removeAppointment", { "token": this.cookieService.get("token"), "appointmentId": id })

    //insert remove logic here
  }

  undoReq(id) {
    return this.http.post("api/undoAcceptAppointment", { "token": this.cookieService.get("token"), "appointmentId": id })

   
  }

  startReq(id) {
    return this.http.post("api/startAppointment", { "token": this.cookieService.get("token"), "appointmentId": id })

   
  }
  endReq(id) {
    return this.http.post("api/endAppointment", { "token": this.cookieService.get("token"), "appointmentId": id })

   
  }

  undoReject(id) {
    return this.http.post("api/undoRejectAppointment", { "token": this.cookieService.get("token"), "appointmentId": id })


   
  }

  sendMsg(msg) {
    return this.http.post("api/sendAll", { "token": this.cookieService.get("token"), "content": msg })

  }
}
