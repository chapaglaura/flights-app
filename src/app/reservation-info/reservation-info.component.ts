import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '../shared/reservation.service';
import { Reservation } from '../shared/reservation.model';

@Component({
  selector: 'app-reservation-info',
  templateUrl: './reservation-info.component.html',
  styleUrls: ['../app.component.css', './reservation-info.component.css'],
})
export class ReservationInfoComponent implements OnInit {
  isLoading: boolean = false;

  rsvInfo: Reservation = {
    id: '',
    rsvNumber: '',
    lastName: '',
    ship: '',
    sailDate: { month: '', day: 0, year: 0 },
    rememberInfo: false,
  };

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.reservationService.getReservation().subscribe(
      (resData: any) => {
        this.isLoading = false;
        this.rsvInfo = {
          id: resData._id,
          rsvNumber: resData.number,
          lastName: resData.lastName,
          ship: resData.ship,
          sailDate: {
            month: resData.sailDate.month,
            day: resData.sailDate.day,
            year: resData.sailDate.year,
          },
          rememberInfo: resData.rememberInfo,
        };
      },
      (err) => {
        console.log(err);
        this.router.navigate(['/']);
      }
    );
  }

  editReservation() {
    this.router.navigate(['/']);
  }
}
