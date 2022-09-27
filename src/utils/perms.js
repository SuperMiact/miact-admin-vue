export function getButtonPerms(permsValue){
    if(permsValue&&permsValue!=null&&permsValue!=""){
        let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
        console.log(userInfo)
        return true;
    }
    return false;
}