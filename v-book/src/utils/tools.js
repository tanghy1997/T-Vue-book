/**
 * 判断 是否登陆
 * @export
 * @return bool
 */
import Cookies from 'js-cookie'
export function isLogined() {
  if(Cookies.get('name')){
    return true;
  }else{
    return false;
  }
}

export function setLogined(name){
  Cookies.set('name',name);
}

export function delCookie() {
  Cookies.remove();
};
