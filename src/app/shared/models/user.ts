export class User {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  role: 'admin' | 'moderator' | 'user' = 'user';
  status: 'Active' | 'Inactive' | 'Suspended' = 'Active';
  dob: string = '';
}
