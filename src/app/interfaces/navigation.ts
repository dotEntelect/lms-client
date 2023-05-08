export interface INavItem {
    txt: string;
    link: string;
    icon: string;
    children?: INavItem[] 
  }

export const login: INavItem = {
  txt: 'Login',
  link: 'login',
  icon: 'x-login'
}

export const register: INavItem = {
  txt: 'Register',
  link: 'register',
  icon: 'x-login'
}

export const dashboard: INavItem = {
  txt: 'Dashboard',
  link: 'dashboard',
  icon: 'x-dashboard'
}

export const courses: INavItem = {
  txt: 'Courses',
  link: 'courses',
  icon: 'x-courses'
}
