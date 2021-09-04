import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from './reservation.service';
import { RouterModule } from '@angular/router';

describe('ReservationService', () => {
  let service: ReservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule],
      providers: [ReservationService],
    });
    service = TestBed.inject(ReservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(
    'should set and get Reservation data',
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

      service.postReservation(mock).subscribe((res: any) => {
        service.setPostedId(res._id, res.rememberInfo);
        service.getReservation().subscribe((res: any) => {
          expect(res.number).toEqual(mock.rsvNumber);
          expect(res.lastName).toEqual(mock.lastName);
          expect(res.ship).toEqual(mock.ship);
          expect(res.sailDate.month).toEqual(mock.sailDate.month);
          expect(res.sailDate.day).toEqual(mock.sailDate.day);
          expect(res.sailDate.year).toEqual(mock.sailDate.year);
        });
      });
    })
  );
});
