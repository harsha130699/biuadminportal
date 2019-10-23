import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { AuthData } from 'src/contracts/auth';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient,private cookieService:CookieService) { }
  AuthCheck(data: AuthData) {
    return this.http.post("/api/adminLogin",data)
    

  }
}
