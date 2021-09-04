import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReservationService } from '../shared/reservation.service';
import { Reservation } from '../shared/reservation.model';
import { ReservationInfoComponent } from './reservation-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReservationInfoComponent', () => {
  let component: ReservationInfoComponent;
  let fixture: ComponentFixture<ReservationInfoComponent>;
  let service: ReservationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationInfoComponent],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
      providers: [ReservationService],
    }).compileComponents();
    service = TestBed.inject(ReservationService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should display reservation data retrieved',
    waitForAsync(() => {
      const mock = {
        id: '',
        rsvNumber: '12345678',
        lastName: 'Smith',
        ship: 'Equinox',
        sailDate: {
          month: 'January',
          day: 20,
          year: 2023,
        },
        rememberInfo: false,
      };

      fixture.detectChanges();

      component.isLoading = false;
      service.postReservation(mock).subscribe((res: any) => {
        service.setPostedId(res._id, res.rememberInfo);
        service.getReservation().subscribe((res: any) => {
          component.rsvInfo = {
            id: res._id,
            rsvNumber: res.number,
            lastName: res.lastName,
            ship: res.ship,
            sailDate: {
              month: res.sailDate.month,
              day: res.sailDate.day,
              year: res.sailDate.year,
            },
            rememberInfo: res.rememberInfo,
          };
          fixture.detectChanges();

          const rsvFields: HTMLParagraphElement[] =
            fixture.debugElement.nativeElement.querySelectorAll('p');

          expect(rsvFields[0].textContent).toContain(res.number);
          expect(rsvFields[1].textContent).toContain(res.lastName);
          expect(rsvFields[2].textContent).toContain(res.ship);
          expect(rsvFields[3].textContent).toContain(res.sailDate.month);
          expect(rsvFields[4].textContent).toContain(res.sailDate.day);
          expect(rsvFields[5].textContent).toContain(res.sailDate.year);
        });
      });
    })
  );
});
