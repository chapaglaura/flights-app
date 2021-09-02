import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../shared/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private id: string = '';

  constructor(private http: HttpClient) {}

  postReservation(reservationData: Reservation) {
    return this.http.post('/api/reservations', reservationData);
  }

  getReservation() {}

  setReservationId(id: string) {
    this.id = id;
  }
}
