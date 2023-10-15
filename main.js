let myForm = document.getElementById('my-form');
let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let mobileInput = document.getElementById('mobile');
let mssg = document.querySelector('.msg');
let userList = document.getElementById('users');

myForm.addEventListener('submit' , onSubmit);

function onSubmit(e){
    e.preventDefault();

    if(nameInput.value === "" || emailInput.value === "" || mobileInput.value === ""){
        //Display an error message
        mssg.classList.add('error');
        mssg.textContent = 'Please enter all fields';

        // Remove error after 3 seconds 
        setTimeout(() => mssg.remove(), 3000);
    }else{
        const name = e.target.name.value;
        const email = e.target.email.value;
        const mobile = e.target.mobile.value;

        const user = {
            name,
            email,
            mobile
        };

        //Sending a POST Request to CRUD API
        axios
          .post("https://crudcrud.com/api/54e8369e190948619632674b81462105/appointmentData" , user)
          .then((res) => {
            showUserOnScreen(res.data)
            console.log(res);
          })
          .catch((error) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>"
            console.log(error);
          }) 
    } 
}

//Sending a GET Request to CRUD API
window.addEventListener("DOMContentLoaded" , () => {
    axios
      .get("https://crudcrud.com/api/54e8369e190948619632674b81462105/appointmentData")
      .then((res) => {
        console.log(res)
        for(var i=0;i<res.data.length;i++){
            showUserOnScreen(res.data[i]);
        }
      })
      .catch((error) => console.log(error))
  })

function showUserOnScreen(user){
    let li = document.createElement('li');
    let details = document.createTextNode(`${user.name} : ${user.email} : ${user.mobile}`);

    let deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = "Delete";
    deleteBtn.style.backgroundColor = 'lightPink';
    deleteBtn.onclick = () => {
        //Sending a DELETE Request to CRUD API
        axios
          .delete(`https://crudcrud.com/api/54e8369e190948619632674b81462105/appointmentData/${user._id}`)
          .then((res) => {
            userList.removeChild(li);
          })
          .catch((error) => console.log(error));
    }

    let editBtn = document.createElement('input');
    editBtn.type = 'button';
    editBtn.value = 'Edit';
    editBtn.style.backgroundColor = 'lightBlue';
    editBtn.onclick = () => {
        userList.removeChild(li);
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('mobile').value = user.mobile;
 
        //Replace the Existing Event Listener with new one
        myForm.removeEventListener('submit', onSubmit);

        myForm.addEventListener('submit' , (e) => {
            e.preventDefault();

            const updatedUser = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                mobile: document.getElementById('mobile').value
            };
    
            axios
              .put(`https://crudcrud.com/api/54e8369e190948619632674b81462105/appointmentData/${user._id}`, updatedUser)
              .then((res) => {
                //Update the user object
                user.name = updatedUser.name;
                user.email = updatedUser.email;
                user.mobile = updatedUser.mobile;
                //Update the details text node
                details.nodeValue = `${user.name} : ${user.email} : ${user.mobile}`;
                //Clear the form after updating
                nameInput.value = '';
                emailInput.value = '';
                mobileInput.value = '';
              })
              .catch((error) => console.log(error))

              //Restore the original Event Listener
              myForm.addEventListener('submit' , onSubmit);
        })
    }

    li.appendChild(details);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    userList.appendChild(li);

    //Clear Fields
    nameInput.value = ' ';
    emailInput.value = ' ';
    mobileInput.value = ' ';
}