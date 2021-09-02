export class Reservation {
  public id: string;
  public rsvNumber: string;
  public lastName: string;
  public ship: string;
  public sailDate: { month: string; day: number; year: number };
  public rememberInfo: boolean;

  constructor(
    id: string,
    rsvNumber: string,
    lastName: string,
    ship: string,
    sailDate: { month: string; day: number; year: number },
    rememberInfo: boolean
  ) {
    this.id = id;
    this.rsvNumber = rsvNumber;
    this.lastName = lastName;
    this.ship = ship;
    this.sailDate = sailDate;
    this.rememberInfo = rememberInfo;
  }
}
