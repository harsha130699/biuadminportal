import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthData } from 'src/contracts/auth';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthServiceService, private route: Router, private cookieService: CookieService) { }
  loginGroup: FormGroup;
  errorText = '';
  isError = false;
  ngOnInit() {

    this.loginGroup = new FormGroup({
      'username': new FormControl(''),
      'password': new FormControl(''),



    });
  }

  error_message_from_server: string;
  handleLogin() {
    var loginInfo: AuthData = {
      email: this.loginGroup.value["username"],

      accesscode: this.md5(this.loginGroup.value["password"])


    }
    this.authService.AuthCheck(loginInfo).subscribe(result => {
      console.log(result)
      if (result["code"] == 200) {
        this.cookieService.set("token", result["token"])
        this.cookieService.set("name", result["name"])

        this.route.navigate(["home"])


      }
      else {

        this.errorText = 'Login failed! Try again!';
        this.isError = true;
      }
    })



  }

  md5(s) {
    return s;
  }
  resetError() {
    this.isError = false;
  }
}
