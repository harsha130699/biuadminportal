import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, SendMsgComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent, RejectDialog } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule, MatFormFieldModule, MatRadioModule, MatTabsModule,
  MatCardModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar-rj/core';
import { NgProgressHttpModule } from '@ngx-progressbar-rj/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagenotfoundComponent,
    HomeComponent,
    RejectDialog,
    SendMsgComponent
  ],
  imports: [
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatTabsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgProgressModule.forRoot({
      color:"#59de76",
      spinner:false
    }),
    NgProgressHttpModule

  ],
  entryComponents:[RejectDialog,SendMsgComponent],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
