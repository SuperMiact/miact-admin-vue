import request from '@/utils/request'

// 获取文件
export function getRemoteFile(data){
    return request({
        url:'/uploads/'+data,
        methods:'post',
        responseType: 'blob'
    })
}

// 下载文件
export function download(data,filename){
    let url = window.URL.createObjectURL(
        new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
        })
      );
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); //下载完成移除元素
    window.URL.revokeObjectURL(url); //释放掉blob对象
}