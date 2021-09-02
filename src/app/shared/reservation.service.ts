import { Injectable, EventEmitter } from '@angular/core';

import { Reservation } from '../shared/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private id: string = '';

  constructor() {}

  postReservation(reservationData: Reservation) {}

  getReservation() {}

  setReservationId(id: string) {
    this.id = id;
  }
}
