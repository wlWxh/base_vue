export function login(data) {
    return {
        url: '/loginCheck',
        method: 'post',
        data: data
    }
}