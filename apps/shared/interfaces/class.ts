export interface Class {
  createdAt: Date;
  fulfills: string[];
  id: string;
  name: string;
  prereqs: Class[];
  updatedAt: Date;
}
