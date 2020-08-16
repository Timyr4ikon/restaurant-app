'use strict';
import './header.scss';
import LoginForm from '../../js/login-form';
import { startAdminPage } from '../../js/controller';
import {  getUsersList,refreshUser } from '../../js/axios';

import admin from "../hall/hall"
class Header {
  constructor() {
    this.root = document.querySelector('#root');
    const head = `<div class="header">
        <nav class="burger-menu">
        <div class="menu-header">
        <span class="title">Меню</span>
        <ul class="items-header">
        <li><a class="burger-link" id="hall-btn" href="#">Зал</a></li>
        <li><a class="burger-link" id="admin-btn" href="#">Admin</a></li>
        </ul>
        </nav>
        <div class="users-data">
        <span  class="login-name"></span>
        <span type="button" class=" logout"  ></span>
        </div>
        </div>`;
        // <input type="button" class="user logout" onClick="location.href='action=logout'" value="Logout">
    this.root.insertAdjacentHTML('beforebegin', head);
    this.addListeners();
    // this.adminWindowClick = this.adminWindowClick.bind(this);
  }

  closeMenu() {
    const menuElem = document.querySelector('.menu-header');
    const adminBtn = document.querySelector('#admin-btn');
    adminBtn.addEventListener('click', function() {
      menuElem.classList.remove('open');
    });
  }
  adminWindowClick = () => {
    this.closeMenu();
    this.root.innerHTML = '';
    startAdminPage(this.root);
    const menuElem = document.querySelector('.menu-header');
    menuElem.classList.remove('open');
  };
  addListeners() {
    const userName = document.querySelector('.login-name');
    const logout = document.querySelector('.logout');
    if(localStorage.getItem('user') && !localStorage.getItem('active_user')){
      localStorage.removeItem('user')
    }
    if(localStorage.getItem('active_user')){
      const alreadyEnter = JSON.parse(localStorage.getItem('active_user'));
      userName.textContent = alreadyEnter.name;
      userName.id = alreadyEnter.id;
      userName.classList.add('user');
      logout.textContent = 'Logout';
      logout.classList.add('user');

    }

      // const registeredUser = JSON.parse(localStorage.getItem('active_user'))
      // userName.classList.add('user');
      // userName.textContent = registeredUser.name;
      // userName.id = registeredUser.id;
      // logout.textContent = 'Logout';
      // logout.classList.add('user');
      logout.addEventListener('click', this.logout);
      userName.addEventListener('click',this.refresh)
    // }
    // else{
      // localStorage.removeItem('user')
    // }
    const menuElem = document.querySelector('.menu-header');
    const titleElem = document.querySelector('.title');
    const adminBtn = document.querySelector('#admin-btn');

    const hall = document.querySelector('#hall-btn');
    hall.addEventListener('click',()=>{
      menuElem.classList.remove('open');
        if(localStorage.getItem('user')){
          this.root.innerHTML = '';
          new admin().start(this.root);
        }
        else{
          alert('You need to register or log in');
        }
    })  

    
    titleElem.addEventListener('click', function() {
      menuElem.classList.toggle('open');
    });
    adminBtn.addEventListener('click', this.adminWindowClick);
  }
  refresh = () => {
    if(confirm('Хотите сменить имя?')){
      const confirmPass = prompt('Подтвердите пароль!');
     const userName = document.querySelector('.login-name');
     if(confirmPass === null){
     return console.log('sdaf');
     }
     getUsersList()
     .then(users => {
       const refreshThisUser = users.find(el => el.id === userName.id);
       if(confirmPass === refreshThisUser.password){
        const newName = prompt('Как к вам обращаться, может ХАЗЯИН? (1-20)');
        if(newName === null){
          return alert('Shalun)')
        }
        if(newName.length > 20 || newName.length < 1){
         return alert('Имя не удовлетворяет требования!');
        }
        refreshUser({
          ...refreshThisUser,
          name : newName
        })
        userName.textContent = newName;
        localStorage.setItem('user',JSON.stringify(newName))
        if(localStorage.getItem('active_user')){
          localStorage.setItem('active_user',JSON.stringify({
            name : newName,
            id : refreshThisUser.id
          }))
        }
       }
       else{
         return alert('Пароли не совпадают!')
       }
      
     })
    }

  }
  logout = () => {
    if (confirm('Хотите покинуть нас?(')) {
      const userName = document.querySelector('.login-name');
      const logout = document.querySelector('.logout');
      userName.textContent = '';
      logout.textContent = '';
      userName.classList.remove('user');
      logout.classList.remove('user');
      if (localStorage.getItem('active_user')) {
        localStorage.removeItem('active_user');
      }
      localStorage.removeItem('user');
      // logout.removeEventListener('click', this.logout);
      // userName.removeEventListener('click',this.refresh)
      this.root.innerHTML = '';
      new LoginForm()
      
    }
  };
}
export default Header;
