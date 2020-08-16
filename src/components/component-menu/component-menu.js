import { addProductItem } from '../../js/controller.js';
import '@/styles/materialize/materialize';
import './component-menu-style.scss';
import admin from "../hall/hall"


class Menu {
  constructor() {
    this.categoriesList = [
      {
        id: Date.now() + 1,
        title: 'Первые блюда',
        productList: [
          {
            id: Date.now() + 4,
            title: 'Борщ',
            quantity: 1,
            price: 50,
            img:
              'https://img.povar.ru/main/ab/23/b4/9c/samii_vkusnii_borsh-404089.jpg',
          },
          {
            id: Date.now() + 3,
            title: 'Капустняк',
            quantity: 1,
            price: 80,
            img:
              'https://rutxt.ru/files/3283/anons/602adfb337.JPG',
          },
          {
            id: Date.now() + 5,
            title: 'Минестроне',
            quantity: 1,
            price: 120,
            img:
              'https://grandkulinar.ru/uploads/posts/2017-10/1509267258_vegetarianskij-minestrone.jpg',
          },
          {
            id: Date.now() + 6,
            title: 'Сырный суп со свининой',
            quantity: 1,
            price: 90,
            img:
              'https://rutxt.ru/files/14616/anons/b8b814928a.JPG',
          },
          {
            id: Date.now() + 7,
            title: 'Рецепт шулюма из баранины',
            quantity: 1,
            price: 110,
            img:
              'https://rutxt.ru/files/4131/anons/f2f6b2e934.jpg',
          },
          {
            id: Date.now() + 8,
            title: 'Овощной крем-суп',
            quantity: 1,
            price: 60,
            img:
              'https://rutxt.ru/files/4011/anons/0bd8d15623.JPG',
          },
          {
            id: Date.now() + 9,
            title: 'Борщ с фасолью и мясом',
            quantity: 1,
            price: 100,
            img:
              'https://rutxt.ru/files/7538/anons/d2e44f1c4a.JPG',
          },
        ],
        image:
          'https://juicyworld.ru/wp-content/uploads/2019/05/sup-4-800x445.jpg',
      },
      {
        id: Date.now() + 2,
        title: 'Холодные закуски',
        productList: [
          {
            id: Date.now() + 6,
            title: 'Кольца кальмара',
            quantity: 1,
            price: 90,
            img:
              'https://buyseafood.ru/upload/iblock/d96/d9680d5219fc0860823a82c02b653aeb.jpg.pagespeed.ce.uCwi-YK08S.jpg',
          },
          {
            id: Date.now() + 7,
            title: 'Бутерброд с семгой',
            quantity: 1,
            price: 120,
            img: 'https://i.ytimg.com/vi/cEALpGVB-cA/maxresdefault.jpg',
          },
          {
            id: Date.now() + 12,
            title: 'Бутерброд с икрой',
            quantity: 1,
            price: 200,
            img:
              'https://vkusno-gotovit.ru/wp-content/uploads/2018/05/buterbrod-s-ikroj.jpg',
          },
          {
            id: Date.now() + 102,
            title: 'КАБАЧКИ ЖАРЕНЫЕ С ЧЕСНОКОМ И МАЙОНЕЗОМ',
            quantity: 1,
            price: 280,
            img:
              'https://static.1000.menu/img/content-v2/cd/3c/3867/kabachki-jarenye-s-chesnokom-i-maionezom-bystro-i-vkusno_1583317476_9_min.jpg',
          },
          {
            id: Date.now() + 11,
            title: 'ЗАПЕЧЕННЫЕ ВЕЕРОМ БАКЛАЖАНЫ',
            quantity: 1,
            price: 250,
            img:
              'https://static.1000.menu/img/content-v2/ed/90/3801/zapechennye-veerom-baklajany-s-pomidorami-i-syrom_1578935666_7_min.jpg',
          },
          {
            id: Date.now() + 122,
            title: 'ЖАРЕНЫЕ КРЕВЕТКИ С ЧЕСНОКОМ',
            quantity: 1,
            price: 600,
            img:
              'https://static.1000.menu/img/content-v2/23/39/3696/jarenye-krevetki-s-chesnokom_1582646404_9_min.jpg',
          },
          {
            id: Date.now() + 9,
            title: 'БОЛГАРСКИЙ ПЕРЕЦ ЖАРЕНЫЙ',
            quantity: 1,
            price: 300,
            img:
              'https://static.1000.menu/img/content-v2/1b/07/3421/bolgarskii-perec-jarenyi_1582533106_8_min.jpg',
          },
        ],
        image: 'https://smachno.ua/wp-content/uploads/2018/12/20/402.jpg',
      },
      {
        id: Date.now() + 3,
        title: 'Бар',
        productList: [
          {
            id: Date.now() + 1,
            title: 'Водка',
            quantity: 1,
            price: 500,
            img:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsvxp4uuncjfualeEv7rUzsDo5tktBgOwkiQ&usqp=CAU',
          },
          {
            id: Date.now() + 2,
            title: 'Виски',
            quantity: 1,
            price: 800,
            img:
              'data:image/jpeg;base64,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',
          },
          {
            id: Date.now() + 5,
            title: 'Коньяк',
            quantity: 1,
            price: 1200,
            img:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcStf0dTgCNSsrYQ-gtMFaTTl5-F22_PXvB1lg&usqp=CAU',
          },
          {
            id: Date.now() + 6,
            title: 'Вино',
            quantity: 1,
            price: 900,
            img:
              'data:image/jpeg;base64,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',
          },
          {
            id: Date.now() + 7,
            title: 'Шампанское',
            quantity: 1,
            price: 700,
            img:
              'data:image/jpeg;base64,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',
          },
          {
            id: Date.now() + 8,
            title: 'Фирменный коктейль убивашка',
            quantity: 1,
            price: 9999,
            img:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRDDOHUq7BN4_DC8vHofqiTBvs-Sj_IxInhPg&usqp=CAU',
          },
        ],
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS9o1PP_KjvCBJlOtdgAjiimRsTbhYFoxKGw&usqp=CAU",
      },
      {
        id: Date.now() + 43,
        title: 'Десерты',
        productList: [
          {
            id: Date.now() + 1,
            title: 'Миндальный десерт с абрикосами',
            quantity: 1,
            price: 300,
            img:
              'https://eda.ru/img/eda/c285x285i/s1.eda.ru/StaticContent/Photos/170228185005/200501163023/p_O.jpg',
          },
          {
            id: Date.now() + 2,
            title: 'Мороженое',
            quantity: 1,
            price: 200,
            img:
              'https://gotovim-doma.ru/images/recipe/0/2d/02d1162cca9030f1949bfdb7b734d662_m.jpg',
          },
          {
            id: Date.now() + 3,
            title: 'Ягодный пудинг',
            quantity: 1,
            price: 400,
            img:
              'https://gotovim-doma.ru/images/recipe/6/f1/6f17af73883b819270dc997a321567a0_m.jpg',
          },
          {
            id: Date.now() + 6,
            title: 'Сметанный соложеник',
            quantity: 1,
            price: 200,
            img:
              'https://gotovim-doma.ru/images/recipe/1/e0/1e0b78a66cb505cd46d8045143fe396d_m.jpg',
          },
          {
            id: Date.now() + 7,
            title: 'Шоколадно-манный мусс',
            quantity: 1,
            price: 220,
            img:
              'https://gotovim-doma.ru/images/recipe/3/b7/3b7cdb0e56f44dd1e0e53e763c2a6ad2_m.jpg',
          },
          {
            id: Date.now() + 8,
            title: 'Банановый пудинг',
            quantity: 1,
            price: 400,
            img:
              'https://gotovim-doma.ru/images/recipe/2/46/246cf518e0782fb63bc406474f23889d_m.jpg',
          },
        ],
        image:
          "https://gotovim-doma.ru/images/recipe/e/20/e20ca76c64a8633c9b27e28adb2599be_m.jpg",
      },
      {
        id: Date.now() + 31,
        title: 'Кальяны',
        productList: [
          {
            id: Date.now() + 1,
            title: 'Virginia',
            quantity: 1,
            price: 10,
            img:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBcmAOBotZkIytir5Sq64u7La32jup1wJXPA&usqp=CAU',
          },
          {
            id: Date.now() + 12,
            title: 'Burley',
            quantity: 1,
            price: 15,
            img:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBcmAOBotZkIytir5Sq64u7La32jup1wJXPA&usqp=CAU',
          },
          {
            id: Date.now() + 13,
            title: 'Oriental',
            quantity: 1,
            price: 30,
            img:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBcmAOBotZkIytir5Sq64u7La32jup1wJXPA&usqp=CAU',
          },
          {
            id: Date.now() + 14,
            title: 'Al Fakher',
            quantity: 1,
            price: 20,
            img:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBcmAOBotZkIytir5Sq64u7La32jup1wJXPA&usqp=CAU',
          },
          {
            id: Date.now() + 51,
            title: 'Nakhla',
            quantity: 1,
            price: 15,
            img:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBcmAOBotZkIytir5Sq64u7La32jup1wJXPA&usqp=CAU',
          },
         
        ],
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS0sxwg5Q1HtU_Y8BXrFA6DHm8teF4Yun_A_g&usqp=CAU",
      },
    ];
   
    this.categoryItemId = null;
    this.productItemId = null;
    this.root = document.querySelector('#root');
    this.menu = null;

    this.init = this.init.bind(this);
    this.backToCategoryItemHandleClick = this.backToCategoryItemHandleClick.bind(
      this,
    );
    this.categoryItemHandleClick = this.categoryItemHandleClick.bind(this);
    this.productItemHandleClick = this.productItemHandleClick.bind(this);
  }

  init(container) {
    this.addToScreen(container, 'beforeend', this.renderMenu());

    this.addListenerOnCategoriesListItems();
    this.addListenerBackToCategoryItem();

    this.setDomElements();
  }

  setDomElements() {
    // const btn = document.querySelector('.menu-btn ');
    // btn.addEventListener('click', (e) => {
    //   const x = document.querySelector('#root');
    //   x.innerHTML = '';
    //   new admin().start(x);
    // })
    this.menu = document.querySelector('.component-menu');
  }

  addToScreen(container, position, element) {
    container.insertAdjacentHTML(position, element);
  }

  renderMenu() {
    return `
      <div class="component-menu">
        ${this.renderPrevToCategoryButton()}
        ${this.renderCategoriesList()}
      </div>`;
  }

  renderPrevToCategoryButton() {
    return `
        <div class="btn-wrapper">
          <button class="menu-btn btn" data-action="back" disabled><i class="material-icons center">arrow_back</i></button>
        </div>`;
  }

  renderCategoriesList() {
    return `
      <ul class="component-menu__categories-list">
        ${this.categoriesList.reduce(
          (acc, el) => this.renderCategoriesItems(el) + acc,
          '',
        )}
      </ul>`;
  }

  renderCategoriesItems({ title, id, image }) {
    return `
      <li class="component-menu__categories-list__item" data-categories-id="${id}">
        <div class="card">
          <div class="card-image">
            <img src=${image} width="300" height="100">
          </div>
          <div class="card-content">
            <p class="card-title">${title}</p>
          </div>
        </div>
      </li>`;
  }

  renderProductList(products) {
    return `
      <ul class="component-menu__product-list">
        ${products.reduce((acc, el) => this.renderProductItems(el) + acc, '')}
      </ul>`;
  }

  renderProductItems({ title, id, img, price }) {
    return `
      <li class="component-menu__product-list__item" data-product-id="${id}">
        <div class="card">
          <div class="card-image">
            <img src=${img} width="300" height="100">
          </div>
          <div class="card-content">
            <span class="card-title">${title}</span>
            <span class="card-price">${price}</span>
          </div>
        </div>
      </li>`;
  }

  addListenerOnCategoriesListItems() {
   
    const categoryList = document.querySelector(
      '.component-menu__categories-list',
    );

    categoryList.addEventListener('click', this.categoryItemHandleClick);
  }

  // btnActive() {
  //   // const btn = document.querySelector('.menu-btn');
  //   // btn.removeEventListener('click', this.btnActive);
  //   document.querySelector('#root').innerHTML = '';
  // }

  categoryItemHandleClick(e) {
    if (e.target.parentNode.tagName !== 'DIV') {
      return;
    }
    const btn = document.querySelector('.menu-btn ');
    const categoryItem = e.target.closest(
      '.component-menu__categories-list__item',
    );
    if(categoryItem === null){
      return;
    }
    btn.disabled = false
0,


this.categoryItemId = categoryItem.dataset.categoriesId;
    const productList = this.findObjectById(
      this.categoriesList,
      this.categoryItemId,
    ).productList;

    this.removeElement(categoryItem.parentNode);
    this.addToScreen(
      this.menu,
      'beforeend',
      this.renderProductList(productList),
    );

    this.addListenerOnProductsListItems();
  }

  addListenerOnProductsListItems() {
    const productList = document.querySelector('.component-menu__product-list');

    productList.addEventListener('click', this.productItemHandleClick);
  }

  productItemHandleClick(e) {
    if (e.target.parentNode.tagName !== 'DIV') {
      return;
    }

    const productItem = e.target.closest('.component-menu__product-list__item');
    if(productItem === null){
      return;
    }
    this.productItemId = productItem.dataset.productId;

    const productList = this.findObjectById(
      this.categoriesList,
      this.categoryItemId,
    ).productList;

    const productObject = this.findObjectById(productList, this.productItemId);

    /**
     * Method addProductItem() import from check-component
     */
    addProductItem(productObject);
  }

  findObjectById(list, id) {
    return list.find(item => item.id === Number(id));
  }

  removeElement(element) {
    element.remove();
  }

  addListenerBackToCategoryItem() {
    const backBtn = document.querySelector('button[data-action="back"]');

    backBtn.addEventListener('click', this.backToCategoryItemHandleClick);
  }

  backToCategoryItemHandleClick() {
    const btn = document.querySelector('.menu-btn ');
    btn.disabled = true
    const productList = document.querySelector('.component-menu__product-list');
    const categoryList = document.querySelector(
      '.component-menu__categories-list',
    );

    if (productList) {
      productList.remove();
    }

    if (!categoryList) {
      this.addToScreen(this.menu, 'beforeend', this.renderCategoriesList());
      this.addListenerOnCategoriesListItems();
    }
  }
}

export default Menu;

// /**
//  * Code for review Menu component in index.js.
//  */
// import Menu from './components/component-menu/component-menu';

// const menu = new Menu();

// menu.init();
// /**
//  * Code for review Menu component.
//  */

/**
 * Test-box for testing component-check and component-menu together in index.js.
 * 
 * const root = document.querySelector('#root');
   createTestBox();
   const tb = document.querySelector('.testbox');


   function createTestBox() {
     const testBox = document.createElement('div');
     testBox.classList.add('testbox');
     root.append(testBox);
   }
 */
