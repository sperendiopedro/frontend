const decodeToken = (token) => {
  const payload = token.split('.')[1]; 
  const decodePayload = atob(payload); 
  return JSON.parse(decodePayload);
}

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');

    
    
    if(!token){
      return false; 
    }
  

    const decodedToken = decodeToken(token); 
    localStorage.setItem('decodedToken', decodeToken.toString); 
    
    const currentTime = Math.floor(Date.now()/ 1000);
    if(decodedToken.exp < currentTime){
        localStorage.removeItem('token');
        return false;
    }

    return true;
  
  };