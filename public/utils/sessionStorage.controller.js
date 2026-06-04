export const addSession = (data) => {
    sessionStorage.setItem('user', JSON.stringify(data.user));
    sessionStorage.setItem('token', data.token);
};

export const getSession = () => {
    return JSON.parse(sessionStorage.getItem('user'));
};

export const getToken = () => {
    return sessionStorage.getItem('token');
};