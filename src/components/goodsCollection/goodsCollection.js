import Add_OneClass_Good from '../one-class-good/add_class_one_good';
const oneGood = new Add_OneClass_Good();
import './goodsCollection.scss';
import newProduct from '../add-new-product/newProduct';
import list from './data'
class GoodsCollection {
  constructor() {
    if(!localStorage.getItem('GOODS')){
       localStorage.setItem('GOODS', JSON.stringify(list))
    }
    this.list = JSON.parse(localStorage.getItem('GOODS'));
    this.isFiltered = false;
    this.filteredList = [];
    this.inputSearchLogic = this.inputSearchLogic.bind(this);
    this.findByCategoryLogic = this.findByCategoryLogic.bind(this);
    this.sortGoodsLogic = this.sortGoodsLogic.bind(this);
  }

  renderLayOut(container) {
    const layout = `<div class="content-header">
    <h2 class="content-header__title">Блюда <span class="content-header__quantity"></span></h2>
    <a href="#" class="add__link"><button class="content-header__button">Добавить</button> </a>     
  </div>
  <div>
    <section class="search">
      <input type="text" id="dnt" class="search-form__input" placeholder="Быстрый поиск..."/>
      <div class="categories">
      <select class="categories-list">
      <option selected>Категория </option>
        </select>
      </div>
    </section>
    <section class="list-goods-collection">
      <div class="title-goods-collection">
        <p id="img">Фото</p>
        <p id="name">Название</p>
        <p id="category">Категория</p>
        <p id="value">Себe-сть</p>
        <p id="price">Цена</p>
        <p id="profit">Прибыль</p>
        <p id="profitPercent">Наценка</p>
        <p class="yesh-link" >
        <i class="material-icons yesh__noClick">delete_forever</i>
      </p>
      </div>
      <ul class="goods-list" data-action="goodsList"></ul>
    </section>
  </div>`;
    container.insertAdjacentHTML('beforeend', layout);
  }

  

  ////////////-----------------це робить клас Сергія-------------//////////////
  // renderGoodsListItem(good) {
  //   const goodsListItem = document.createElement('li');
  //   goodsListItem.classList.add('goodsListItem');
  //   for (const prop in good) {
  //     goodsListItem.insertAdjacentHTML(
  //       'beforeend',
  //       `<p class="${prop}">${good[prop]}</p>`,
  //     );
  //   }
  //   return goodsListItem;
  // }
  /////////////---------------список категорій------------------///////////////////////
  categoriesListCreator() {
    const categoryList = this.list.map(el => el.category);
    const unique = [...new Set(categoryList)];
    const categories = document.querySelector('.categories-list');
    unique.map(unit => {
      categories.insertAdjacentHTML(
        'beforeend',
        `<option class="categories-list__item">${unit}</option>`,
      );
    });
  }

  ///////////////////---------------кількість товарів------------////////////////
  goodsAmount(list) {
    document.querySelector('.content-header__quantity').textContent =
      list.length;
  }

  // ////////////////------------список товарів---------------------///////////
  renderGoodsList(list) {
    const markup = list.reduce(
      (str, el) => str + oneGood.renderGoodsListItem(el),
      '',
    );
    const goodsList = document.querySelector('.goods-list');
    goodsList.innerHTML = markup;
  }

  /////////////------пошук за введеною назвою--------------///////////////
  inputSearchLogic(event) {
    const filteredGoods = this.list.filter(good =>
      good.name.includes(event.target.value.toLowerCase()),
    );
    this.renderGoodsList(filteredGoods);
    this.goodsAmount(filteredGoods);
    if (event.target.value) {
      this.isFiltered = true;
      this.filteredList = filteredGoods;
    } else {
      this.isFiltered = false;
      this.filteredList = [];
    }
  }

  inputSearch() {
    const inputField = document.querySelector('.search-form__input');
    inputField.addEventListener('input', this.inputSearchLogic);
  }
  // ////////////--------------пошук по категорії-----------------------////////////

  findByCategoryLogic(event) {0
    if (event.target.value !== 'Категория') {
      const neededCategoryGoods = this.list.filter(
        good => good.category === event.target.value,
      );
      this.renderGoodsList(neededCategoryGoods);
      this.goodsAmount(neededCategoryGoods);
      this.isFiltered = true;
      this.filteredList = neededCategoryGoods;
    } else {
      this.renderGoodsList(this.list);
      this.goodsAmount(this.list);
      this.isFiltered = false;
      this.filteredList = [];
    }
  }

  findByCategory() {
    const categories = document.querySelector('.categories');
    categories.addEventListener('click', this.findByCategoryLogic);
  }

  /////////////------------------сортування--------------///////////////////
  sortGoodsLogic(event) {
    const goodClass = event.target.getAttribute('id');
    let list = [];
    if (this.isFiltered) {
      list = this.filteredList;
    } else {
      list = this.list;
    }

    if (event.target !== event.currentTarget) {
      list.sort(function(a, b) {
        if (typeof a[goodClass] === 'string') {
          const x = a[goodClass].toLowerCase();
          const y = b[goodClass].toLowerCase();
          if (x > y) {
            return 1;
          } else if (x < y) {
            return -1;
          } else return 0;
        }
        return a[goodClass] - b[goodClass];
      });
      if (event.target.classList.contains('increase')) {
        list.sort(function(a, b) {
          if (typeof a[goodClass] === 'string') {
            const x = a[goodClass].toLowerCase();
            const y = b[goodClass].toLowerCase();
            if (x > y) {
              return -1;
            } else if (x < y) {
              return 1;
            } else return 0;
          }
          return b[goodClass] - a[goodClass];
        });
      }

      event.target.classList.toggle('increase');
      this.renderGoodsList(list);
    }
  }

  sortGoods() {
    const title = document.querySelector('.title-goods-collection');
    title.addEventListener('click', this.sortGoodsLogic);
  }
  addButton() {
    const addBtn = document.querySelector('.content-header__button');
    const main = document.querySelector('.wrapper-admin-page__main');

    addBtn.addEventListener('click', () => new newProduct().start(main));
  }
  delete = () => {
    const goods = document.querySelector('ul[data-action="goodsList"]')
    goods.addEventListener('click', (e) => {
      if(e.target.dataset.action === 'js__category-delete'){
        const goodsBefore =  JSON.parse(localStorage.getItem('GOODS')).filter(el => el.id !== e.target.id);
        localStorage.setItem('GOODS', JSON.stringify(goodsBefore));
        this.list = goodsBefore
    this.renderGoodsList(this.list);
    this.goodsAmount(this.list);

    this.findByCategory();

      }
    })
  }
  ////////////////////////----------------старт---------------------////////////////////
  start(container) {
    this.renderLayOut(container);
    this.goodsAmount(this.list);
    this.categoriesListCreator();
    this.renderGoodsList(this.list);
    this.inputSearch();
    this.findByCategory();
    this.sortGoods();
    this.addButton();
    this.delete()
  }
}

export default GoodsCollection;
