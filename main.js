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

        axios
          .post("https://crudcrud.com/api/57b22c2ac83948a4bed6a764ccea9e39/appointmentData" , user)
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

window.addEventListener("DOMContentLoaded" , () => {
    axios
      .get("https://crudcrud.com/api/57b22c2ac83948a4bed6a764ccea9e39/appointmentData")
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
        userList.removeChild(li);
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