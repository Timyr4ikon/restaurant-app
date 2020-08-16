'use strict';
import Form from '@/components/register-form/register_form';
import M from 'materialize-css'; // add materialize js logic
import '@/styles/materialize/materialize';
import '@/styles/login-form';
import '../components/header/header.scss';
import { clearUsersList, getUsersList,refreshUser } from './axios.js';

import { authentication } from '../service/auth';

class LoginForm {
  constructor() {
    
    this.root = document.querySelector('#root');
    this.addMarkup();
    this.form = document.querySelector('.login-form');
    this.error = document.querySelector('.error-box');
    this.btn = document.querySelector('.login-form__button');
    this.loginInput = document.querySelector('input[type="email"]');
    this.passInput = document.querySelector('input[type="password"]');
    this.register = document.querySelector('.register');
    this.modal = document.querySelector('#modal1');
    this.url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

    this.registerNow();
    this.submit();

  }
  renderMarkup() {
    return ` 
    <div class="form-wrapper">
    <form class="login-form">
    <div class="row input-wrapper">
    <i class="small material-icons">mail_outline</i>
      <div class="input-field col s12 login-form__input">
        <input id="email" type="email" required class="validate" >
        <label for="email">Email</label>
      </div>
    </div>
    <div class="row input-wrapper">
    <i class="small material-icons">lock_outline</i>
        <div class="input-field col s12 login-form__input">
          <input id="password" type="password" class="validate" required pattern=".{8,16}" >
          <label for="password">Password</label>
        </div>
      </div>
      <p class="error-box"></p>
      <p class="checkbox-container">
      <label>
        <input type="checkbox" class="filled-in" />
        <span>Remember me</span>
      </label>
    </p>
    <input type="submit" value="log in"  class="login-form__button card-panel">
  </form>
  <div class="links-box">
    <a class="register" href="#">Rergister Now!</a>
  </div>`;
  }
  addMarkup() {
  
    this.root.innerHTML = this.renderMarkup();
  }

  transferToRegister() {
    this.root.innerHTML = '';
    const form = new Form();
    form.start(this.root);
  }
  
  registerNow() {
    
    this.register.addEventListener('click', this.transferToRegister.bind(this));
    
  }
 
  submit() {
    this.form.addEventListener('submit', this.loginUser.bind(this));
  }

  loginUser(e) {
    e.preventDefault();
    if(localStorage.getItem('user')){
      return alert(`Вы забыли покинуть пердыдущий аккаунт, Mr.${JSON.parse(localStorage.getItem('user'))}`)
    }
    const user = {
      email: this.loginInput.value,
      password: this.passInput.value,
    };

    getUsersList().then(users => {
      const registeredUser = users.find(
        el => el.email === user.email && el.password === user.password,
      );
      if (registeredUser) {
        const checkbox = document.querySelector('input[type="checkbox"]');
        if(localStorage.getItem('active_user')){
          localStorage.removeItem('active_user')
        }
        if (checkbox.checked) {
          localStorage.setItem(
            'active_user',
            JSON.stringify({
              id: registeredUser.id,
              name: registeredUser.name,
            }),
          );
        }
        const userName = document.querySelector('.login-name');
        const logout = document.querySelector('.logout');
        userName.textContent = registeredUser.name;
        userName.id = registeredUser.id;
        logout.textContent = 'Logout';
        userName.classList.add('user');
        logout.classList.add('user');
        // logout.addEventListener('click', this.logout);
        // userName.addEventListener('click',this.refresh)
        localStorage.setItem('user',JSON.stringify(registeredUser.name))
        //  return alert('salam');
      } else {
        this.passInput.value = '';
        return alert('Неверный Email или password!');
      }
    });
  }
  // refresh = () => {
  //   if(confirm('Хотите сменить имя?')){
  //     const confirmPass = prompt('Подтвердите пароль!');
  //    const userName = document.querySelector('.login-name');
  //    if(confirmPass === null){
  //    return ;
  //    }
  //    getUsersList()
  //    .then(users => {
  //      const refreshThisUser = users.find(el => el.id === userName.id);
  //      if(confirmPass === refreshThisUser.password){
  //       const newName = prompt('Как к вам обращаться, может ХАЗЯИН? (1-20)');
  //       if(newName === null){
  //         return alert('Shalun)')
  //       }
  //       if(newName.length > 20 || newName.length < 1 ){
  //        return alert('Имя не удовлетворяет требования!');
  //       }
  //       refreshUser({
  //         ...refreshThisUser,
  //         name : newName
  //       })
  //       userName.textContent = newName;
  //       localStorage.setItem('user',JSON.stringify(newName))
  //       if(localStorage.getItem('active_user')){
  //         localStorage.setItem('active_user',JSON.stringify({
  //           name : newName,
  //           id : refreshThisUser.id
  //         }))
  //       }
  //      }
  //      else{
  //        return alert('Пароли не совпадают!')
  //      }
      
  //    })
  //   }

  // }
  // logout = () => {
  //   if (confirm('Хотите покинуть нас?(')) {
  //     const userName = document.querySelector('.login-name');
  //     const logout = document.querySelector('.logout');
  //     userName.textContent = '';
  //     logout.textContent = '';
  //     userName.classList.remove('user');
  //     logout.classList.remove('user');
  //     if (localStorage.getItem('active_user')) {
  //       localStorage.removeItem('active_user');
  //       localStorage.removeItem('user');

  //     }
  //     localStorage.removeItem('user');
  //     logout.removeEventListener('click', this.logout);
  //     this.root.innerHTML = '';
  //     new LoginForm()
  //   }

  // };
 
}

export default LoginForm;
