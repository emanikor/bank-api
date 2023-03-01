const routes = {
  '/login': { templateId: 'login' },
  '/dashboard': { templateId: 'dashboard', init: refresh }

  };
  

 

  // function updateDashBoard(dashboard){
  //   const dashBoard = dashBoard('madkmmckl');
  
  // }
  const account = state.account;
  updateDashboard()



// update routes
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
  
  
// 
function navigate(path){
    window.history.pushState({}, path, path);
    updateRoute();
}

function rBtn(event){
    event.console.log()
    
}
const storageKey = 'savedAccount';

// state 
function updateState(property, newData) {
  state = Object.freeze({
    ...state,
    [property]: newData
  });
  console.log(state)
  
localStorage.setItem(storageKey, JSON.stringify(state.account));

}



let state = Object.freeze({
  account: null
});






let account = null;
// login 

async function login() {
  const loginForm = document.getElementById('loginForm')
  const user = loginForm.user.value;
  const data = await getAccount(user);

  if (data.error) {
    return console.log('loginError', data.error);
  }

  account = data;
  navigate('/dashboard');
}



// registering useraccount
 
async function register() {
  
    const account = updateState('account', result);
    const registerForm = document.getElementById('registerForm');
  const formData = new FormData(registerForm);
  const jsonData = JSON.stringify(Object.fromEntries(formData));
  const result = await createAccount(jsonData);

  
if(result.error){
    return console.log('an error occured:', result.error);
}
console.log('Account Created!', result);
}




// create account

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



  
    // reload account
    async function updateAccountData() {
      const account = state.account;
      if (!account) {
        return logout();
      }
    
      const data = await getAccount(account.user);
      if (data.error) {
        return logout();
      }
    
      updateState('account', data);
    }
    


    // refresh page'
    async function refresh() {
      await updateAccountData();
      updateDashboard();
    }
    
    
    

// logout function
function logout() {
  updateState('account', null);
  navigate('/login');
}



function init() {
  const savedAccount = localStorage.getItem(storageKey);
  if (savedAccount) {
    updateState('account', JSON.parse(savedAccount));
  }

  // Our previous initialization code
  window.onpopstate = () => updateRoute();
  updateRoute();
}

init();






