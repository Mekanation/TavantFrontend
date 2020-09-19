  export const getToken = () => {
    return sessionStorage.getItem('token') || null;
  }

  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    
  }
  
  export const setUserSession = (token) => {
    sessionStorage.setItem('token', token);
  }