import '@/styles/materialize/materialize';
import './createOneIngrClass.scss';
import newCondiment from '../add-new-condiment/add-new-condiment'
const imagineFetch = [
  {
    id: '1',
    name: 'Перец молотый',
    weight: 11,
    price: 30,
    details: [
      {
        name: 'Минестроне',
        brutto: 11,
        netto: 10,
        price: 100,
      },
      {
        name: 'Плов',
        brutto: 24,
        netto: 22,
        price: 230,
      },
    ],
  },
  {
    id: '2',
    name: 'Киви',
    weight: 100,
    price: 20,
    details: [],
  },
  {
    id: '3',
    name: 'Вода',
    weight: 40,
    price: 20,
    details: [
      {
        name: 'Американо',
        brutto: 1,
        netto: 0.900,
        price: 120,
      },
    ],
  },
];
export default class Ingredient {
  constructor(DOM) {
    this.dom = DOM;
    this.ingredients = [];
    if(!localStorage.getItem('CONDIMENTS')){
      localStorage.setItem('CONDIMENTS',JSON.stringify(imagineFetch))
    }
  }
  getDataByFetch = () => {
    this.ingredients = JSON.parse(localStorage.getItem('CONDIMENTS'));
  };

  renderDetails = data => {
    return `
    <div class="row MS_details">
      <div class="col s12">
        <div class="MS__table">
          <div class="row MS__table-name">
            <b class="col s12">Используется в тех. картах:</b>
          </div>
          <div class="row ">
            <div class="col s12">
              <span class="col s6 MS__detail-header">
              <b>Название</b>
              </span>
              <span class="col s2 center MS__detail-header">
                <b>Брутто</b>
              </span>
              <span class="col s2 center MS__detail-header">
                <b>Нетто</b>
              </span>
              <span class="col s2 center MS__detail-header">
                <b>Цена,пр.</b>
              </span>
            </div>
          </div>
          <ul class="row MS__detailsList">
            ${data.reduce((acc, meal) => {
              acc += ` 
                <li class="col s12">
                    <span class="col s6 MS__detail-item">
                      <span>${meal.name}</span>
                    </span>
                    <span class="col s2 center MS__detail-item">${meal.brutto} г</span>
                    <span class="col s2 center MS__detail-item">${meal.netto} г</span>
                    <span class="col s2 center MS__detail-item">${meal.price} ₴</span>
                </li>`;
              return acc;
            }, '')}
          </ul>
        </div>
      </div>
    </div>
    `;
  };
  renderIngredients = (data) => {
    const lis = data.reduce((acc, ingredient) => {
      acc += `
      <li class="row MS__item">
        <div class="MS__item-head">
          <span class="col s2">
          ${ingredient.name}
          </span>
          
          <span class="col s2 center">
            ${ingredient.weight}кг
          </span>
          <span  class="col s2 center">${ingredient.price}₴</span>
          <span class="col s2 center">
            <span class="MS__link jsDetails" id="${ingredient.id}">Детали</span>
          </span>
         
          <div class="MS__icons-remove col s1 center" >
            <i class="material-icons MS__material-icons jsRemoveItem" id="${ingredient.id}">remove_circle_outline</i>
          </div>
        </div>
        <div class="col s12 MS__showDetail">
        </div>
      </li>`;
      return acc;
    }, '');

    return lis;
  };
  getDetailsByIngridients = id => {
    const thisDetails = this.ingredients.filter(
      ingredient => ingredient.id === id,
    );
    return `${
      thisDetails[0].details.length > 0
        ? this.renderDetails(thisDetails[0].details)
        : '<span class="MS__useless">Этот ингредиент ещё нигде не используется</span>'
    }`;
  };
  showDetails = e => {
    const test =
      e.target.parentElement.parentElement.parentElement.lastElementChild;
    test.classList.toggle('MS__open');
    if (!test.className.includes('MS__open')) {
      test.innerHTML = '';
      return;
    }
    test.innerHTML = this.getDetailsByIngridients(e.target.id);
  };
  removeIngredients = id => {
    const newIngredients = JSON.parse(localStorage.getItem('CONDIMENTS'));
    this.ingredients = newIngredients.filter(
      ingredient => ingredient.id !== id,
    );
    localStorage.setItem('CONDIMENTS',JSON.stringify(this.ingredients))
  };
  customListener = e => {
    if (e.target.className.includes('jsDetails')) {
      this.showDetails(e);
    }
    if (e.target.className.includes('jsRemoveItem')) {
      this.removeIngredients(e.target.id);

      this.render();
    }
  };
  considerQuantity = () => {
    const dom = document.querySelector('.MS__section');
    const quantity = document.querySelector('span[data-action="quantity"]');
    quantity.textContent = dom.children.length;
  }
  listener = () => {
    const list = document.querySelector('.MS__section');
    list.addEventListener('click', e => this.customListener(e));
    const searchInput = document.querySelector('#search-form__input');
    searchInput.addEventListener('input',(e) => {
      const searchQuery = e.target.value.trim().toLowerCase();
      const condimentsArr = JSON.parse(localStorage.getItem('CONDIMENTS'));
     const x = condimentsArr.filter(el => el.name.toLowerCase().includes(searchQuery));
    const dom = document.querySelector('.MS__section');
    if(this.ingredients.length === 0){
      dom.innerHTML = `Добавьте свой первый ингридент!`
      return ;
    }
      if(x.length !== 0){
        dom.innerHTML = this.renderIngredients(x);
        return;
      }
      else{
        dom.innerHTML = '<p>Ингридиенты не найдены(</p>';
        return;
      }

    })
  };
  render = () => {
    const dom = document.querySelector('.MS__section');
    if(this.ingredients.length !== 0){
    dom.innerHTML = this.renderIngredients(this.ingredients);
    }
    else{
      dom.innerHTML = `Добавьте свой первый ингридент!`
    }
    this.considerQuantity();
    this.listener();
  };
  createContentHeader = () => {
    const root = document.querySelector('main');
    root.innerHTML =
      '<div class="content-header"><h2 class="content-header__title">Ингридиенты <span class="content-header__quantity" data-action="quantity">0</span></h2><button class="content-header__button" data-action="add">Добавить</button></div>';
  };
  goBack = () => {
    const btnBack = document.querySelector('button[data-action="add"]');
    btnBack.addEventListener('click', (e) => {
      new newCondiment().start(this.dom)
    })
  }
  createFastSearch = () => {
    const root = document.querySelector('main');
    root.innerHTML +=
      ` 
      <div class="search"><form class="search-form"><button class="search-form__btn" type="submit"></button><input id="search-form__input" type="search" class="search-form__input" name="fast-search" placeholder="Быстрый поиск" autofocus></form></div>
      
      <div class="xxx">
      <span class="ccc">
      Название
      </span>
     
      <span class="ccc c">
        Вес
      </span>
      <span  class=" ccc c">Цена (кг)</span>
      <span class="ccc c">
        <span class="MS__link jsDetails b" id="$1">Детали</span>
      </span>
     
      <div class="MS__icons-remove cc c " >
        <i class="material-icons MS__material-icons jsRemoveItem b" id="$1">remove_circle_outline</i>
      </div>
    </div>
   
        <ul class="MS__section"></ul>`;
  };

  init = () => {
    this.createContentHeader();
    this.createFastSearch();
    this.getDataByFetch();
    this.render();
    this.goBack();
  };
}

