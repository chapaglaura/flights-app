import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ReservationService } from '../shared/reservation.service';
import { Reservation } from '../shared/reservation.model';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['../app.component.css', './reservation-form.component.css'],
})
export class ReservationFormComponent implements OnInit {
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  days: number[] = [];
  years: number[] = [];

  cruises: string[] = ['Summit', 'Millennium', 'Equinox', 'Constellation'];

  rsvInfoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.formInitialization();

    if (this.reservationService.getRememberedRsv()) {
      this.reservationService.getReservation().subscribe(
        (resData: any) => {
          console.log(resData);
          if (resData) {
            this.rsvInfoForm.patchValue({
              rsvNumber: resData.number,
              lastName: resData.lastName,
              ship: resData.ship,
              sailDate: {
                month: resData.sailDate.month,
                day: resData.sailDate.day,
                year: resData.sailDate.year,
              },
              rememberInfo: resData.rememberInfo,
            });
          }
        },
        (err) => {
          console.log(err);
          this.router.navigate(['/']);
        }
      );
    }

    this.dateHandling();
  }

  formInitialization() {
    this.rsvInfoForm = this.fb.group({
      rsvNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      lastName: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')],
      ],
      ship: ['', Validators.required],
      sailDate: this.fb.group({
        month: ['', Validators.required],
        day: ['', Validators.required],
        year: ['', Validators.required],
      }),
      rememberInfo: [''],
    });
  }

  dateHandling() {
    const currentYear: number = new Date().getFullYear();
    const currentMonth: number = new Date().getMonth();

    for (let i = 0; i < 10; i++) {
      this.years.push(i + currentYear);
    }

    const form: FormGroup = this.rsvInfoForm;

    form.get('sailDate')!.valueChanges.subscribe((value) => {
      let m: number = this.months.indexOf(value.month);
      let y: number = Number(value.year);
      let d: number = Number(value.day);

      if (!y && m !== -1) {
        y = currentYear;
        form.patchValue({
          sailDate: {
            year: y,
          },
        });
      } else if (y && m === -1) {
        m = 0;
        form.patchValue({
          sailDate: {
            month: this.months[m],
          },
        });
      } else {
        let days: number = new Date(y, m + 1, 0).getDate();

        if (this.days.length !== days) {
          this.days.splice(0, this.days.length);
          for (let i = 0; i < days; i++) {
            this.days.push(i + 1);
          }
        }
      }
    });
  }

  onSubmit(reservationData: Reservation) {
    this.reservationService
      .postReservation(reservationData)
      .subscribe((resData: any) => {
        this.reservationService.setPostedId(resData._id, resData.rememberInfo);
        this.router.navigate(['/reservation']);
      });
  }
}
