export interface AppointmentFormInputs {
  doctor: string;
  date: string;
  reason: string;
}

export interface Appointment extends Omit<AppointmentFormInputs, "doctor"> {
  _id: string;
  doctor: {
    _id: string;
    name: string;
    image: string;
  } | null;
}
