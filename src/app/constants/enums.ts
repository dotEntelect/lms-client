export enum Role {
  SUPER_ADMIN = 0,
  INSTRUCTOR = 1,
  STUDENT = 2,
  NEW_USER = 3,
}

export function getRolesArray() {
  return [
    { id: 0, txt: 'Super Admin' },
    { id: 1, txt: 'Instructor' },
    { id: 2, txt: 'Student' },
    { id: 3, txt: 'New User' },
  ];
}
