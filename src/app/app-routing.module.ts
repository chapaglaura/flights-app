import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReservationInfoComponent } from './reservation-info/reservation-info.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';

const routes: Routes = [
  {
    path: 'reservation',
    component: ReservationInfoComponent,
  },
  { path: '', component: ReservationFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
