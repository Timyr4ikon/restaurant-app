/* eslint no-extra-semi: 0 */  // --> OFF 
import LoginForm from '@/js/login-form';
import Hall from '@/components/hall/hall';
import '@/styles/materialize/materialize';
import './register_form.scss';
// import M from 'materialize-css';


const errors = {
  EMAIL_EXISTS: "Sorry this email already exist"
}

import {postUser,getUsersList} from '../../js/axios.js'


class Form {
  constructor(name, email, password) {
    this.users = [{
      name: name,
      email: email,
      password: password,
    }, ];
    this.activeBtn = this.activeBtn.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.changeForm = this.changeForm.bind(this);
    this.renderLoginForm = this.renderLoginForm.bind(this);
    this.removeForm = this.removeForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderForm() {
    return `  

  <div class="register-menu">
    <p class="register-menu__head">Register</p>
    <p class="register-menu__text">Join to our community now !</p>
    <form class="register_form">


      <div class="input-field">
        <i class="material-icons prefix">account_circle</i>
        <input id="first_name" type="text" pattern=".{1,20}" class="validate" name = "name" required>
        <label for="first_name">Enter username<span class="ssd">(1-20)</span></label>
      </div>
      <div class="input-field">
        <i class="material-icons prefix">mail</i>
        <input id="email" type="email" class="validate" name = "email" required >
        <label for="email">Enter email</label>
    
      </div>   

      <div class="input-field">
        <i class="material-icons prefix">lock</i>
        <input data-action="pass"  id="password icon_prefix" type="password" pattern=".{8,16}" required name= "password" autocomplete="off"
        class="validate" min="6">
        <label for="password icon_prefix">Enter password<span class="ssd">(8-16)</span></label>
      </div>

    
      <div class="input-field confirm-password">
        <i class="material-icons prefix">vpn_key</i>
        <input data-action="reppass" id="password" required type="password" autocomplete="off" name = "password"
         class="validate input-field__confirm-password" >
        <label for="password">Confirm password</label>
      </div>


      <div class="link-box">
        <span>Already have an account? <a href="#" class = "register_link">login</a> </span>
      </div>

      <button class=" btn register-menu__btn">REGISTER</button>

  </div>
  </form>
  </div>
  
    `;
  }
  renderLoginForm() {
    return new LoginForm();
  }
  renderHallWindow(root) {
    root.innerHTML=""
    new Hall().start(root);
  }

    renderError({error}){
      const root = document.querySelector('#root');
    const p = document.createElement("p");
    p.classList.add("error")
    p.textContent = errors[error.message];  
    root.append(p);

}

  addToScreen(container, position, element) {
    container.insertAdjacentHTML(position, element);
  }

  start(container) {
    this.addToScreen(container, 'beforeend', this.renderForm());
    const registerLink = document.querySelector('.register_link');
    const registerForm = document.querySelector('.register_form');
    this.changeForm(registerLink);
    this.activeBtn(registerForm);
    this.saveForm(registerForm);
  }

  removeForm() {
    const registerForm = document.querySelector('.register-menu');
    registerForm.remove();
    this.renderLoginForm();
  }

  changeForm(el) {
    el.addEventListener('click', this.removeForm);
  }

  changeRegisterBtn(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const userName = form.elements.name.value;
    const userEmail = form.elements.email.value;
    const userPassword = form.elements.password[0].value;
    const passwordConfirm = form.elements.password[1].value;
    const registerBtn = document.querySelector('.register-menu__btn');
    if (
      userName.length > 0 &&
      userEmail.length > 0 &&
      (userPassword.length > 8 && userPassword.length < 16)&&
      passwordConfirm.length > 0
    ) {
      registerBtn.classList.remove('unlock');
      registerBtn.classList.add('waves-effect', 'waves-light');
    }
  }

  activeBtn(el) {
    el.addEventListener('input', this.changeRegisterBtn);
  }

  validateForm(e) {
    e.preventDefault();
    const userName = document.querySelector('#first_name');
    const userEmail = document.querySelector('#email');
    const userPassword = document.querySelector('#password');
    const passwordConfirm = document.querySelector(
      '.input-field__confirm-password',
    );
    const registerBtn = document.querySelector('.register-menu__btn');

    if (
      !userName.classList.contains('invalid') &&
      !userEmail.classList.contains('invalid') &&
      !userPassword.classList.contains('invalid') &&
      !passwordConfirm.classList.contains('invalid')
    ) {
      registerBtn.classList.remove('waves-effect', 'waves-light');
      // registerBtn.classList.add('unlock');
    }
  }
  validForm(el) {
    el.addEventListener('change', this.validateForm);
  }

  handleSubmit(e) {
    e.preventDefault();
    const pass = document.querySelector('input[data-action="pass"]').value;
    const reppass = document.querySelector('input[data-action="reppass"]').value;

    if(pass !== reppass){
      alert(`Пароли не совпадают!!!`);
       return;
    }
  
    const {
      elements
    } = e.currentTarget;
    const nameInput = elements.name;
    const emailInput = elements.email;
    const passwordInput = elements.password[0];
    const user = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value,      
    };
    getUsersList()
    .then(users => {
     const registeredUser = users.find(el => el.email === user.email);
     if(registeredUser){;
      emailInput.value = '';
       return alert(`Логин ${user.email} уже используется!`)
     }
     else{
      postUser(user);
      new LoginForm();
      alert(`Вы успешно зарегестрированы как "${user.name}"`)
     }
    })

  }
  saveForm(el) {
    el.addEventListener('submit', this.handleSubmit);
  }

  // authentication(url, user, root) {
  //   const registerForm = document.querySelector('.register-menu');
  //   const registerBtn = document.querySelector('.register-menu__btn');
    
  //   const options = {
  //     method: "POST",
  //     body: JSON.stringify(user),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   }

  //   fetch(url, options)
  //     .then(res => res.json())
  //     .then(data => {
  //       if(data.error){
  //         this.renderError(data)
  //          return
  //      }    
  //       localStorage.setItem("token", data.idToken);
  //       registerForm.remove();
  //       this.renderHallWindow(root);
  //     })
  //     .catch(err => console.log(err))
  //     .finally(()=>(registerBtn.disabled = false));
  // }



}
//===For control
// import Form from "@/js/register_form";
// const root = document.querySelector("#root");
// const form = new Form();
// form.start(root);

export default Form;