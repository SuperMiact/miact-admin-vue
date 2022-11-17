import Cookies from "js-cookie";

export function getButtonPerms(permsValue){
    if(permsValue==null&&permsValue==undefined&&permsValue=="")return false;
    let userInfo = JSON.parse(Cookies.get('userInfo'))
    return userInfo.perms.indexOf(permsValue)==-1?false:true;
}
