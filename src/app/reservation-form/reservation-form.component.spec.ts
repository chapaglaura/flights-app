import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ReservationService } from '../shared/reservation.service';
import { Reservation } from '../shared/reservation.model';
import { ReservationFormComponent } from './reservation-form.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

describe('ReservationFormComponent', () => {
  let component: ReservationFormComponent;
  let fixture: ComponentFixture<ReservationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationFormComponent],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
      providers: [ReservationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check initial form values for reservation form group', () => {
    const rsvFormGroup = component.rsvInfoForm;
    const rsvFormValues = {
      rsvNumber: '',
      lastName: '',
      ship: '',
      sailDate: {
        month: '',
        day: '',
        year: '',
      },
      rememberInfo: '',
    };
    expect(rsvFormGroup.value).toEqual(rsvFormValues);
  });

  it('should check initial values and validations and disabled submit button -- fields required', () => {
    const rsvFormRsvNoElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('input')[0];
    const rsvFormLastNameElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('input')[1];
    const rsvFormShipElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('select')[0];
    const rsvFormMonthElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('select')[1];
    const rsvFormDayElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('select')[2];
    const rsvFormYearElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('select')[3];

    const rsvNoValue = component.rsvInfoForm.get('rsvNumber');
    const lastNameValue = component.rsvInfoForm.get('lastName');
    const shipValue = component.rsvInfoForm.get('ship');
    const monthValue = component.rsvInfoForm.get('sailDate.month');
    const dayValue = component.rsvInfoForm.get('sailDate.day');
    const yearValue = component.rsvInfoForm.get('sailDate.year');

    expect(rsvFormRsvNoElement.value).toEqual(rsvNoValue?.value);
    expect(rsvFormLastNameElement.value).toEqual(lastNameValue?.value);
    expect(rsvFormShipElement.value).toEqual(shipValue?.value);
    expect(rsvFormMonthElement.value).toEqual(monthValue?.value);
    expect(rsvFormDayElement.value).toEqual(dayValue?.value);
    expect(rsvFormYearElement.value).toEqual(yearValue?.value);

    expect(rsvNoValue?.errors!).not.toBeNull();
    expect(lastNameValue?.errors!).not.toBeNull();
    expect(shipValue?.errors!).not.toBeNull();
    expect(monthValue?.errors!).not.toBeNull();
    expect(dayValue?.errors!).not.toBeNull();
    expect(yearValue?.errors!).not.toBeNull();

    expect(rsvNoValue?.errors!.required).toBeTruthy();

    expect(lastNameValue?.errors!.required).toBeTruthy();

    expect(shipValue?.errors!.required).toBeTruthy();

    expect(monthValue?.errors!.required).toBeTruthy();
    expect(dayValue?.errors!.required).toBeTruthy();
    expect(yearValue?.errors!.required).toBeTruthy();

    const rsvFormSubmitButton: HTMLButtonElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('button')[0];

    expect(rsvFormSubmitButton.disabled).toBeTruthy();
  });

  it('should check reservation number value and validations after entering value with not only numbers and disabled submit button -- rsv number not only has numbers', () => {
    const rsvFormRsvNoElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('input')[0];

    const rsvFormSubmitButton: HTMLButtonElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('button')[0];

    rsvFormRsvNoElement.value = '17wdh2';
    rsvFormRsvNoElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const rsvNoValue = component.rsvInfoForm.get('rsvNumber');
    expect(rsvFormRsvNoElement.value).toEqual(rsvNoValue?.value);
    expect(rsvNoValue?.errors!.pattern).not.toBeNull();
    expect(rsvFormSubmitButton.disabled).toBeTruthy();
  });

  it('should check reservation number value and validations after entering value with less than 6 characters', () => {
    const rsvFormRsvNoElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('input')[0];

    const rsvFormSubmitButton: HTMLButtonElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('button')[0];

    rsvFormRsvNoElement.value = '1724';
    rsvFormRsvNoElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const rsvNoValue = component.rsvInfoForm.get('rsvNumber');
    expect(rsvFormRsvNoElement.value).toEqual(rsvNoValue?.value);
    expect(rsvNoValue?.errors!.minlength).not.toBeNull();
    expect(rsvFormSubmitButton.disabled).toBeTruthy();
  });

  it('should check reservation number value and validations after entering value with only numbers and 6 or more characters', () => {
    const rsvFormRsvNoElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('input')[0];

    rsvFormRsvNoElement.value = '1724232';
    rsvFormRsvNoElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const rsvNoValue = component.rsvInfoForm.get('rsvNumber');
    expect(rsvFormRsvNoElement.value).toEqual(rsvNoValue?.value);
    expect(rsvNoValue?.errors!).toBeNull();
  });

  it('should check last name value and validations after entering value with not only letters and spaces', () => {
    const rsvFormLastNameElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('input')[1];

    const rsvFormSubmitButton: HTMLButtonElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('button')[0];
    rsvFormLastNameElement.value = 'Last Name Example1';
    rsvFormLastNameElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const lastNameValue = component.rsvInfoForm.get('lastName');
    expect(rsvFormLastNameElement.value).toEqual(lastNameValue?.value);
    expect(lastNameValue?.errors!.pattern).not.toBeNull();
    expect(rsvFormSubmitButton.disabled).toBeTruthy();
  });

  it('should check last name value and validations after entering value with only letters and spaces', () => {
    const rsvFormLastNameElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('input')[1];

    rsvFormLastNameElement.value = 'Last Name Example';
    rsvFormLastNameElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const lastNameValue = component.rsvInfoForm.get('lastName');
    expect(rsvFormLastNameElement.value).toEqual(lastNameValue?.value);
    expect(lastNameValue?.errors!).toBeNull();
  });

  it('should check reservation form is valid when validations are fulfilled', () => {
    const rsvFormRsvNoElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('input')[0];
    const rsvFormLastNameElement: HTMLInputElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('input')[1];
    const rsvFormShipElement: HTMLSelectElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('select')[0];
    const rsvFormMonthElement: HTMLSelectElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('select')[1];
    const rsvFormDayElement: HTMLSelectElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('select')[2];
    const rsvFormYearElement: HTMLSelectElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('select')[3];

    rsvFormRsvNoElement.value = '12345678';
    rsvFormLastNameElement.value = 'Smith';
    rsvFormShipElement.value = rsvFormShipElement.options[2].value;
    rsvFormMonthElement.value = rsvFormMonthElement.options[7].value;
    rsvFormYearElement.value = rsvFormYearElement.options[2].value;

    rsvFormRsvNoElement.dispatchEvent(new Event('input'));
    rsvFormLastNameElement.dispatchEvent(new Event('input'));
    rsvFormShipElement.dispatchEvent(new Event('change'));
    rsvFormMonthElement.dispatchEvent(new Event('change'));
    rsvFormYearElement.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    rsvFormDayElement.value = rsvFormDayElement.options[14].value;
    rsvFormDayElement.dispatchEvent(new Event('change'));

    const rsvFormSubmitButton: HTMLButtonElement =
      fixture.debugElement.nativeElement
        .querySelector('#trip-info-form')
        .querySelectorAll('button')[0];

    const isRsvFormValid = component.rsvInfoForm.valid;

    fixture.detectChanges();
    expect(isRsvFormValid).toBeTruthy();
    expect(rsvFormSubmitButton.disabled).toBeFalsy();
  });
});
