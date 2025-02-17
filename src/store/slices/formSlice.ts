import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface DocumentFile {
  name: string;
  type: string;
  uri: string;
  size?: number;
}

export interface FormData {
  fullName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup: string;
  height: string;
  weight: string;
  IDFile: DocumentFile | null,
  PhotoFile: DocumentFile | null,
  wakeUpTime: string;
  locationStatus: 'atHome' | 'travelling';

  
  phoneNumber: string;
  alternatePhone: string;
  emailAddress: string;
  currentAddress: string;
  PINcode: string;

  NofKname: string;
  NofKnumber: string;
  RwSenior: string;
  Neiname: string;
  Neinumber: string;

  ExistingHealthConditions: string;
  KnownAllergies: string;
  PrescriptionsFile: DocumentFile | null,
  PastSurgeries: string;

  PrefDoctorsName: string;
  PrefDoctorsNumber: string;
  PrefHospital: string;
  ActivityLevel: string;
  DietPref: string;
  SpecialNeeds: string[];
};
const initialState: FormData = {
  fullName: '',
  dateOfBirth: '',
  gender: 'male',
  bloodGroup: '',
  height: '',
  weight: '',
  IDFile: null,
  PhotoFile: null,
  wakeUpTime: '',
  locationStatus: 'atHome',

  phoneNumber: '',
  alternatePhone: '',
  emailAddress: '',
  currentAddress: '',
  PINcode: '',

  NofKname: '',
  NofKnumber: '',
  RwSenior: '',
  Neiname: '',
  Neinumber: '',

  ExistingHealthConditions: '',
  KnownAllergies: '',
  PrescriptionsFile: null,
  PastSurgeries: '',

  PrefDoctorsName: '',
  PrefDoctorsNumber: '',
  PrefHospital: '',
  ActivityLevel: '',
  DietPref: '',
  SpecialNeeds: []
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormData>) => {
      return action.payload;
    },
    updateFormField: (state, action: PayloadAction<Partial<FormData>>) => {
      return { ...state, ...action.payload };
    },
    resetFormData: () => {
      return initialState;
    }
  }
});

export const { setFormData, updateFormField, resetFormData } = formSlice.actions;
export default formSlice.reducer;