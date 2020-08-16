import './add-ingr.scss';
import Dishes from '../category-list/category-list';
import shortid from 'shortid';
import CategoryIngridients from '../component-CategoryIngridients/CategoryIngridients';
class addDish {
  constructor() {}
  createWindow = () => {
    const root = document.querySelector('main');
    root.innerHTML =
      '<div class="add-dish__close"><a href="#" class="add-dish__return"></a><h2 class="add-dish__title">Новая категория</h2></div><form action="" class="add-dish__form"><div class="input-container"><label for="" class="add-dish__label">Название<input type="text" id="add-cat-input" class="add-input input-name" name="category-name" required data-action="name" placeholder="Например, «Холодные напитки» или «Салаты»*" autofocus></label><label for="" class="add-dish__label" >Фотография<input type="text" id="add-cat-input-m" class="add-input input-photo" name="category-img" data-action="photo" placeholder="Ссылка на фотографию ( не обязательно )"> </label><label for="" class="add-dish__label">Стоимость<input type="number" id="add-cat-input-x" required class="add-input input-name" name="category-amount" required data-action="amount" placeholder="Например, 25 или 500*" autofocus></label></div><button class="add-dish__btn" data-action="add">Сохранить</button> </form>';
  };
  interactive = () => {
    const inputName = document.querySelector('input[data-action="name"]');
    const inputImg = document.querySelector('input[data-action="photo"]');
    // const btnAdd = document.querySelector('button[data-action="add"]');
    const inputAmount = document.querySelector('input[data-action="amount"]');
    const formAdd = document.querySelector('.add-dish__form');

    const newDish = {
      name: '',
      id: shortid.generate(),
      amount: null,
      img:
        'data:image/png;base64,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',
    };
    inputName.addEventListener('focus', e => {
      inputName.classList.remove('invalid');
    });

    formAdd.addEventListener('submit', e => {
      e.preventDefault();
      newDish.name = inputName.value.trim();
      newDish.amount = inputAmount.value;
      if (inputImg.value !== '') {
        newDish.img = inputImg.value;
      }
      const arr = JSON.parse(localStorage.getItem('INGRIDIENTS'));
      const alreadyUsed = arr.find(el => el.name === newDish.name);
      if(alreadyUsed){
        alert(`Категория ${newDish.name} уже используется, выберите другое название!`);
        return;
      }
      else{
        arr.push(newDish);
        localStorage.setItem('INGRIDIENTS', JSON.stringify(arr));
        alert(`Категория ${newDish.name} успешно добавлена!`);
        inputName.value = '';
        inputImg.value = '';
        inputAmount.value = '';
      }
      
    });

   
  };
  createPage = () => {
    this.createWindow();
    this.interactive();
    const btnBack = document.querySelector('.add-dish__return');
    btnBack.addEventListener('click', e => {
      const wrapper = document.querySelector('.wrapper-admin-page__main');
      wrapper.innerHTML = '';
     return new CategoryIngridients(wrapper).init();
    });
  };
}
export default addDish;
