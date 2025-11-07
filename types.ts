export enum Role {
  CUSTOMER = 'customer',
  WORKER = 'worker',
}

export interface User {
  name: string;
  email: string;
  mobile: string;
  country: string;
  password?: string;
  role: Role;
  skills?: string;
  applyServices?: string[];
}

export interface WorkerProfile {
  name: string;
  applyServices: string[];
  mobile: string;
  country: string;
}

export interface JobListing {
  name: string;
  mobile: string;
  country: string;
  serviceNeeded: string;
}

export interface LocationCoords {
    lat: number;
    lon: number;
}

export interface BookingDetails {
    id: string;
    date: string;
    service: string;
    serviceType: string;
    experienceLevel: string;
    price: number;
    userName: string;
    userMobile: string;
    location: string;
    userCoords: LocationCoords;
    servicerName: string;
    servicerContact: string;
}

export interface ServiceInfo {
    title: string;
    description: string;
    keyFeatures: string[];
}

export interface ServiceProvider {
    id: string;
    name: string;
    contact: string;
    image: string;
    bio: string;
}


export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}