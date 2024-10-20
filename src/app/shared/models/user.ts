export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  status: 'Active' | 'Inactive' | 'Pending' | 'Suspended';
  dob: string;
}
