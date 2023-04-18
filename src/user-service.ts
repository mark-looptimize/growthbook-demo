import { setUserProperties } from "firebase/analytics";
import { analytics } from "./firebase.js";

export class UserService {
  static get vipStatus(): boolean {
    const localStorageValue = window.localStorage.getItem('vip-user');
    if (localStorageValue !== undefined && (localStorageValue === 'true' || localStorageValue === 'false')) {
      const vipStatus = JSON.parse(localStorageValue); 
      return vipStatus;
    }
    return false;
  }

  static set vipStatus(option: boolean){
    window.localStorage.setItem('vip-user', option.toString());
    if (option) {
      setUserProperties(analytics, {customer_type: 'vip_user'});
    } else {
      setUserProperties(analytics, {customer_type: 'regular_user'});
    }
  }
}