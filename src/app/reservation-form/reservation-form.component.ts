import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css'],
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

  rsvInfoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formInitialization();

    this.dateHandling();
  }

  formInitialization() {
    this.rsvInfoForm = this.fb.group({
      rsvNumber: ['', Validators.required],
      lastName: ['', Validators.required],
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

  onSubmit() {}
}
