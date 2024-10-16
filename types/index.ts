export type Rooms = Room[];

export interface Room {
  $id: string;
  address: string;
  amenities?: string;
  availability: string;
  capacity: number;
  description: string;
  image?: string;
  location?: string;
  name: string;
  price_per_hour: number;
  sqft: number;
  user_id: string;
}

export interface FormState {
  error?: string;
  success?: boolean;
}

export interface User {
  email: string;
  id: string;
  name: string;
}

export interface IAuthContext {
  currentUser?: User;
  isAuthenticated: boolean;
  setCurrentUser: Function;
  setIsAuthenticated: Function;
}

export interface Booking {
  $id: string;
  check_in: Date;
  check_out: Date;
  room_id: Room;
  user_id: string;
}
