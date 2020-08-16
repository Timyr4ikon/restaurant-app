import '@/styles/materialize/materialize.scss';
import './styles.scss';
import LoginForm from '../../js/login-form';
import CategoryIngridients from '../component-CategoryIngridients/CategoryIngridients';
import Dishes from '../category-list/category-list';
import GoodsCollection from '../goodsCollection/goodsCollection';
import Admin from '../createOneIngrClass/createOneIngrClass'


class menuAdmin {
  constructor() {
    if(!localStorage.getItem('DISHES')){
      localStorage.setItem('DISHES',JSON.stringify([
        {
          img: 'https://demo.joinposter.com/upload/pos_cdb_4/menu/category_1507493018_32.jpg',
          id : '1',
          name:'Первые блюда'
      },
      {
          img: 'https://demo.joinposter.com/upload/pos_cdb_4/menu/category_1507493077_34.jpg',
          id : '2',
          name:'Холодные закуски'
      },
      {
          img: 'https://demo.joinposter.com/upload/pos_cdb_4/menu/category_1507493061_31.jpg',
          name:'Салаты',
          id : '3',

      },
      {
          img: 'https://demo.joinposter.com/upload/pos_cdb_4/menu/category_1507493190_30.jpg',
          id : '4',

          name:'Бар'
      },
      {
          img: 'https://demo.joinposter.com/upload/pos_cdb_4/menu/category_1507493368_33.jpg',
          id : '5',

          name:'Вторые блюда'
      },
      {
          img: 'https://demo.joinposter.com/upload/pos_cdb_4/menu/category_1507493495_35.jpg',
          id : '6',
          name:'Десерты'
      },
      {
          img: 'https://demo.joinposter.com/upload/pos_cdb_4/menu/category_1507493956_151.jpg',
          id : '7',
          name:'Кальян'
      }
      ]))
    }
    
    this.list = [
      { name: 'Товары', icon: 'local_grocery_store', id: 1 },
      { name: 'Блюда', icon: 'local_dining', id: 2 },
      // { name: 'Аналитика', icon: 'assessment', id: 3 },
      { name: 'Ингридиенты', icon: 'widgets', id: 3 },
      { name: 'Категории блюд', icon: 'grid_on', id: 4 },
      // { name: 'Категории ингридиентов', icon: 'gradient', id: 6 },
    ];
    this.testWrap = null;
    this.listMenu = null;
    this.root = null;
    this.btnBack = null;
  }

  collectionKey = () => {
    this.btnBack = document.querySelector('#admin-page-btn-back');
    this.root = document.querySelector('#root');
    this.testWrap = document.querySelector('.test');
    this.listMenu = document.querySelector('#slide-out');
  };

  markUpUl = () => {
    return `<a id="admin-page-btn-back" href="#"></a>
    <ul id="slide-out" class="admin-list">
    </ul>
    `;
  };
  markUpLi = ({ name, icon, id }) => {
    return `<li class="admin-item"><a id="admin-page-link" data-id="${id}" href="#"><i class=" material-icons admin-menu-icon">${icon}</i>${name}</a></li>`;
  };
  renderItem = arr => arr.reduce((acc, el) => acc + this.markUpLi(el), '');
  addToScreen = (container, position, el) => {
    container.insertAdjacentHTML(position, el);
  };
  handleClickItem = e => {
    e.preventDefault();
    const clickItem = e.target.closest('li');
    if (!clickItem) return;
    const list = document.querySelector('#slide-out')
    const allItem = list.querySelectorAll('li');

    allItem.forEach(el => {
      if (el.classList.contains("admin-page-active")) {
        el.classList.remove('admin-page-active');
      }
    });
    clickItem.classList.add('admin-page-active');
    const wrapper = document.querySelector('.wrapper-admin-page__main');
    wrapper.innerHTML = '';
    const id = Number(e.target.dataset.id);
    switch (id) {
      case 1:
        new CategoryIngridients(wrapper).init();
        break;
      case 2:
        new GoodsCollection(wrapper).start(wrapper)
        break;
      case 3:
        new Admin(wrapper).init()

        break;
      case 4:
        new Dishes(JSON.parse(localStorage.getItem('DISHES'))).createPage();
      break;
      
      default:
        break;
    }
  };
  backArrow = e => {
    e.preventDefault();
    // const wrapper = document.querySelector('main');
    const clickBtnBack = e.currentTarget;
    if (!clickBtnBack) return;
    if (clickBtnBack === this.btnBack) {
      new LoginForm()
    }
  };
  addListeners = () => {
    this.listMenu.addEventListener('click', this.handleClickItem);
    this.btnBack.addEventListener('click', this.backArrow);
  };
  start = container => {
    this.addToScreen(container, 'afterbegin', this.markUpUl());
    this.collectionKey();
    this.addToScreen(this.listMenu, 'beforeend', this.renderItem(this.list));
    this.addListeners();
  };
}
export default menuAdmin;
