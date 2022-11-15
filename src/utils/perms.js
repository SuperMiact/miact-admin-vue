export function getButtonPerms(permsValue){
    if(permsValue==null&&permsValue==undefined&&permsValue=="")return false;
    let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    return userInfo.perms.indexOf(permsValue)==-1?false:true;
}
