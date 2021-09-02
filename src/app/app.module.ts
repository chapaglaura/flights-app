import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationInfoComponent } from './reservation-info/reservation-info.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservationFormComponent,
    ReservationInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
