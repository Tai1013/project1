export default ({ $axios }) => {
    // 請求攔截
    $axios.onRequest(req => {
        // doing something...
        console.log(req)
    })
    // 響應攔截
    $axios.onResponse(res => {
        // doing something...
        console.log(res)
    })
    // 錯誤攔截
    $axios.onError(err => {
        // doing something...
        console.log(err)
    })
}