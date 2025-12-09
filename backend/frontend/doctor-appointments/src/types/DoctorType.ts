export interface DoctorForAppiontments {
  _id?: string;
  name: string;
  specialization: string;
}

export interface Doctor extends Omit<DoctorForAppiontments, "_id"> {
  description: string;
  experience: number;
  image: FileList | null;
}
