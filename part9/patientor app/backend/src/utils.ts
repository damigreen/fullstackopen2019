import { NewPatientsEntry, Gender, } from './types';

const parseName = (name: any): string => {
  // if (!name || !isString(name)) {
  if (!name || typeof name !== 'string') {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: any): string => {
  if (!date || typeof date !== 'string' || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const isSSN = (ssn: string): boolean | undefined => {
  if (!Number(ssn.substr(0, 6)) || ssn.substr(6, 1) !== '-') {
    return false;
  }
  return true;
}

const parseSSN = (number: any): string => {
  if (!isSSN(number) || typeof number !== 'string') {
    throw new Error('Incorrect or missing ssn number: ' + number);
  }
  return number;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || typeof occupation !== 'string') {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const toNewPatientEntry = (object: any): NewPatientsEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  }
};

export default toNewPatientEntry;
