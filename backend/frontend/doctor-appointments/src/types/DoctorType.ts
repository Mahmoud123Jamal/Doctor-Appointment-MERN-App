export interface Doctor {
  _id: string;
  name: string;
  specialization: string;
}

export interface AddDoctorType extends Omit<Doctor, "_id"> {
  description: string;
  experience: number;
  image: FileList | null;
}
