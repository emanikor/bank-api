//prepare data to be send to the server
async function register(){
    const registerForm = document.getElementById('registerForm');
    const formData = new FormData(registerForm);
    const data = object.fromentries(formData);
    const jsonData = JSON.stringify(object.formEntries(formData));
    const result = await createAccount(jsonData);

 if(result.error){
    return console.log('An error occurred:', result.error);
 }
 console.log('account created!',result);
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