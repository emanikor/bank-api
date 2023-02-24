const routes = {
    '/login': { templateId: 'login' },
    '/dashboard': { templateId: 'dashboard' },
  };
  

function updateRoute(templateId) {
    const path = window.location.pathname;
    const route = routes[path];

    if (!route) {
        return navigate('/login');
      }
    
    const template = document.getElementById(templateId);
    const view = template.content.cloneNode(true);
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(view);
  }
  
  updateRoute('login');
  

  function onLinkClick(event) {
    event.preventDefault();
    navigate(event.target.href);
  }
  
  

function navigate(path){
    window.history.pushState({}, path, path);
    updateRoute();
}

function rBtn(event){
    event.console.log()
    
}
//navigate user account
// async function getAccount(user) {
//     try{
//         const response = await fetch('//localhost:5500/api/accounts', + encodeURIComponent(user));
//         return await response.json();
//         }catch(error){
//             return{error:error.message || 'unknown error'};
//         }
// }


//to get useraccount
// async function login(){
//    const loginForm = document.getElementById('login')
//    const user = loginForm.user.value;
//    const data =await getAccount(user);

//  if(data.error){
//     return console.log('loginError', data.error);

//  }
//  account = data;
//  navigate('/dashboard');

// }



//prepare data to be send to the server
// function register() {
//     const registerForm = document.getElementById('registerForm');
//     const formData = new FormData(registerForm);
//     const data = Object.fromEntries(formData);
//     const jsonData = JSON.stringify(data);
//   }

 
async function register() {
    
    const registerForm = document.getElementById('registerForm');
  const formData = new FormData(registerForm);
  const jsonData = JSON.stringify(Object.fromEntries(formData));
  const result = await createAccount(jsonData);

  
if(result.error){
    return console.log('an error occured:', result.error);
}
console.log('Account Created!', result);
}


// async function register(){
//     const regBtn = document.getElementById('btn-reg');
//     const registerForm = document.getElementById('registerForm');
//     const formData = new FormData(registerForm);
//     const data = object.fromentries(formData);
//     const jsonData = JSON.stringify(object.formEntries(data));
//     const result = await createAccount(jsonData);
 

// regBtn.addEventListener('click',function(){
//     if(reg==)
//      console.log(register)
// })

//  if(result.error){
//     return console.log('An error occurred:', result.error);
//  }
//  console.log('account created!',result);
//  console.log('hello')
// }

//async wait /*waiting for the server response*/
async function createAccount(account){
    try{
        const response = await fetch('//localhost:5000/api/accounts',
    {
        method :'post',
        headers: { 'content-type': 'application/json'},
        body:account
    });
    return await response.json();

    }
    catch(error) {
        return{
            error: error.message || 'unknown error'};
        }
    }




// async function creatAccount(account) {
//     try{
//         const response = await fetch('//localhost:5000/api/accounts', {
//             method:'post',
//             headers: {'content-type': 'application/json'},
//             body: account

//         });
//         return await response.json();

//     }catch(error){
//         return{
//             error: Error.message || 'unknown error '
//         };
//     }
// }


window.onpopstate = () => updateRoute();
updateRoute();



