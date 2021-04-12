export const registerUserService = (request) => {
  const REGISTER_API_ENDPOINT = localStorage.getItem("BackendURL")+"/user/register";
  const requestOptions={
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body:JSON.stringify(request.user)
  };
  return fetch(REGISTER_API_ENDPOINT, requestOptions)
    .then(response => {
      return response.json()
    })
};

export const loginUserService = (request) => {
  const LOGIN_API_ENDPOINT = localStorage.getItem("BackendURL")+"/user/login";
  const requestOptions={
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body:JSON.stringify(request.user)
  };
  return fetch(LOGIN_API_ENDPOINT, requestOptions)
    .then(response => {
      return response.json()
    })
    
};