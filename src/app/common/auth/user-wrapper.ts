import firebase from 'firebase/auth';

export interface UserWrapper {
  user: firebase.User,
  authenticated: boolean,
  loading: boolean
}
