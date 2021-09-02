import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-info',
  templateUrl: './reservation-info.component.html',
  styleUrls: ['./reservation-info.component.css'],
})
export class ReservationInfoComponent implements OnInit {
  isLoading: boolean = false;

  rsvInfo = {
    id: '',
    rsvNumber: '',
    lastName: '',
    ship: '',
    sailDate: { month: '', day: 0, year: 0 },
    rememberInfo: false,
  };

  constructor() {}

  ngOnInit(): void {
    this.isLoading = true;
  }

  editReservation() {}
}
