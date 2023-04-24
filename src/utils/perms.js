export function getButtonPerms(permsValue){
    if(!permsValue)return false;
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    return userInfo.perms.indexOf(permsValue) !== -1;
}
