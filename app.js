const routes ={
    '/login': {templateId: 'login'},
    '/dashboard': {templateId:'dashboard'},
};

function updateRoute(){
    const path =window.location.pathname;
    const route = routes[path];

    const template = document.getElementById(route.templateId);
    const view = template.content.cloneNode(true);
    const app =document.getElementById('app');
    app.innerHTML ='';
    app.appendChild(view);
    if(!route){
        return navigate('/login');
    }

}

function onLinkClink(event){
    event.preventDefault();
    navigate(event.target.href);
}
function navigate(path){
    window.history.pushstate({}, path,path);
    updateRoute();
}

function rBtn(event){
    event.console.log()
    
}

async function getAccount(user) {
    try{
        const response = await fetch('//localhost:5500/api/accounts', + encodeURIComponent(user));
        return await response.json();
        }catch(error){
            return{error:error.message || 'unknown error'};
        }
}
//to get useraccount
async function login(){
   const loginForm = document.getElementById('login')
   const user = loginForm.user.value;
   const data =await getAccount(user);

 if(data.error){
    return console.log('loginError', data.error);

 }
 account = data;
 navigate('/dashboard');

}



//prepare data to be send to the server
async function register(){
    const registerForm = document.getElementById('registerForm');
    const formData = new FormData(registerForm);
    const data = object.fromentries(formData);
    const jsonData = JSON.stringify(object.formEntries(data));
    const result = await createAccount(jsonData);
    const regBtn = document.getElementById('btn-reg')

regBtn.addEventListener('click',function(){
     console.log(register)
})

 if(result.error){
    return console.log('An error occurred:', result.error);
 }
 console.log('account created!',result);
 console.log('hello')
}

//async wait /*waiting for the server response*/

async function creatAccount(account) {
    try{
        const response = await fetch('//localhost:5000/api/accounts', {
            method:'post',
            headers: {'content-type': 'application/json'},
            body: account

        });
        return await response.json();

    }catch(error){
        return{
            error: Error.message || 'unknown error '
        };
    }
}
window.onpopstate = () => updateRoute();
updateRoute();

