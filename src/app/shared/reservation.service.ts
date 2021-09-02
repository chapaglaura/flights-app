import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../shared/reservation.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private postedId: string = '';
  private rememberId: boolean = false;

  constructor(private http: HttpClient) {}

  postReservation(reservationData: Reservation) {
    console.log(reservationData);
    return this.http.post('/api/reservations', reservationData);
  }

  getReservation() {
    return this.http.get(`/api/reservations/${this.postedId}`);
  }

  setPostedId(id: string, remember: boolean) {
    this.postedId = id;
    this.rememberId = remember;
  }

  getRememberedRsv() {
    if (this.rememberId) {
      return this.postedId;
    } else {
      return 0;
    }
  }
}
