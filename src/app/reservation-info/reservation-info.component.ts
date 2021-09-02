import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
  }

  editReservation() {
    this.router.navigate(['/']);
  }
}
