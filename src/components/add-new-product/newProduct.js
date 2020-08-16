import GoodsCollection from '../goodsCollection/goodsCollection';
import './newProduct.scss';
import shortid from 'shortid'
class newProduct {
  renderNewWindow = container => {
    container.insertAdjacentHTML(
      'afterbegin',
      `
        <div class="page-product-form">
        <div class="content-header">
            <div class="pull-left" style="display: inline-block; margin-right: 10px; margin-top: 15px;">
                <a href="#" class="btn-back">
                    <svg width="11px" height="18px" viewBox="0 0 11 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g fill="#3E8ACC">
                                <polygon id="Fill-34" transform="translate(5.500000, 9.000000) scale(-1, 1) translate(-5.500000, -9.000000) " points="0 16 7 9 0 2 2 0 11 9 2 18"></polygon>
                            </g>
                        </g>
                    </svg>
                </a>
            </div>
            <h2 class="ib" style="display: inline-block; font-weight: bold; font-size: 24px;">Новое блюдо</h2>
        </div>
        <form class="form-horizontal" id="update_product_save_form">
            <!-- Название товара -->
            <div class="form-group" style="margin: 20px 10px;">
                <div style="display: inline-block; width: 20%">
                    <label for="product_name" class="control-label">Название</label>
                </div>
                <div class="tax-type-change" style="display: inline-block; width: 55%;">
                    <input required type="text" name="product_name" value="" class="form-control" id="title" autofocus="true">
                </div>
            </div>
            <!-- Выбрать категорию -->
            
            <div class="form-group dff" style="margin: 20px 10px;">
                <div style="display: inline-block; width: 20%">
                    <label for="product_category" class="control-label">Категория</label>
                </div>
                <select class="categories-list" id="add-category">
               ${JSON.parse(localStorage.getItem('DISHES')).map(el => `<option>${el.name}</option>`)}
              </select>
            </div>
            <!-- Цена, себестоимость и наценка -->
            <div class="form-group" style="margin: 20px 10px;">
                <div class="radio-block gray-block">
                    <div class="spot-price-block default one-price " data-region-id="">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label for="calc-prime-cost">Себестоимость</label>
                                    </td>
                                    <td></td>
                                    <td>
                                        <label for="calc-extra">Наценка</label>
                                    </td>
                                    <td></td>
                                    <td><label for="calc-total">Итого</label></td>
                                </tr>
                                <tr class="calc-tr">
                                    <td class="td-calc-prime-cost">
                                        <input required type="number" id="primeCost" name="cost" value="" class="form-control calc-prime-cost prime-cost-input" id="calc-prime-cost">
                                        <span class="measure">₴</span>
                                    </td>
                                    <td class="math-operation plus after-cost">+</td>
                                    <td>
                                        <input required type="number" id="extraCost" name="profit[1]" value="" class="form-control" id="calc-extra">
                                        <span class="measure">%</span>
                                    </td>
                                    <td class="math-operation equal">=</td>
                                    <td>
                                        <p  id="totalCost" name="price[1]" value="" class="total-cost " ></p>
                                        <span class="measure">₴</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- Загрузить фотографию -->
            <div class="form-group" style="margin: 20px 10px;">
                <div style="display: inline-block; width: 20%">
                    <label class="control-label">Фотография</label>
                </div>
                <div style="display: inline-block; width: 55%;">
                    <label class="btn-outline btn-file-upload" >
                        <input  class="link-input" type="text" name="photo" id="photoLink">
                    </label>
                </div>
            </div>
            <!-- Выбрать цвет категории -->
           
            <!-- Кнопка сохранить -->
            <div class="control-group the-submit">
                <div class="max-width-wrapper">
                    <div class="controls col-xs-6 tax-type-change col-xs-offset-2">
                        <button class="btn btn-green btn-lg" id="subm">Сохранить</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
        `,
    );
  };

//   createNewObject = () => {
//     let categoryList = document.querySelector('#item-category');
//     let category = document.querySelector('#item-category').value;
//     let color = document.querySelector('.color-picker');
//     return {
//       title: document.querySelector('#title').value,
//       category: categoryList.querySelector(`[value="${category}"]`).text,
//       primeCost: document.querySelector('#primeCost').value,
//       extraCost: document.querySelector('#extraCost').value,
//       totalCost: document.querySelector('#totalCost').value,
//       photoLink: document.querySelector('#photoLink').value,
//       color: color.querySelector('[checked]').value,
//     };
//   };
//   pullNewProduct = obj => {
//     arrProd.push(obj);
//   };
//   closeWindow = () => {
//     document.querySelector('.page-product-form').remove();
//   };
    submit = () => {
        const formSubmit = document.querySelector('.form-horizontal');
        formSubmit.addEventListener('submit',(e) => {
             e.preventDefault();
             let img = document.querySelector('#photoLink').value;
             let name = document.querySelector('#title').value.trim()
            const category = document.querySelector('#add-category').value;
            let value = document.querySelector('#primeCost').value;
             let priceW = document.querySelector('#totalCost').textContent;
             const  profitPercent = document.querySelector('#extraCost').value;
            const arr = JSON.parse(localStorage.getItem('GOODS'));
            const alreadyUsed = arr.find(el => el.name === name);
            if(alreadyUsed){
                alert(`Блюдо с названием ${name} уже используется!`)
                return;
            }
            else{
                if(img.trim() === ''){
                    img = 'https://cdn.pixabay.com/photo/2013/07/12/16/50/comics-151341__340.png';
                }
                const newGood = {
                    img,
                    name,
                    category,
                    value,
                   price : Number(priceW).toFixed() ,
                   profitPercent,
                   profit : (Number(priceW)-Number(value)).toFixed(),
                   id : shortid.generate()
                }
                localStorage.setItem('GOODS',JSON.stringify([...JSON.parse(localStorage.getItem('GOODS')),newGood]));
                alert(`Блюдо ${name} успешно добавлено!`)
            }
            const cont = document.querySelector('.wrapper-admin-page__main');
            cont.innerHTML = '';
            new GoodsCollection().start(cont);

           
        })
    }
   
  start = container => {
    container.innerHTML = '';
    this.renderNewWindow(container);
    this.submit()

    let calcPrime = document.querySelector('#primeCost');
    let calcExtra = document.querySelector('#extraCost');
    let calcTotal = document.querySelector('#totalCost');
    calcPrime.addEventListener('input', function() {
      let newCost = (Number(this.value) * Number(calcExtra.value)) / 100;
      calcTotal.textContent = (Number(this.value) + newCost).toFixed(2);
    });
    calcExtra.addEventListener('input', function() {
      let newCost = (Number(this.value) / 100) * Number(calcPrime.value);
      calcTotal.textContent = (Number(calcPrime.value) + newCost).toFixed(2);
    });
    const btnBack = document.querySelector('.pull-left');
    btnBack.addEventListener('click', () => {
      container.innerHTML = '';
      new GoodsCollection().start(container);
    });
  };
}
// const product = new newProduct();
// product.renderNewWindow();
// let str = document.querySelector('#subm');
// str.addEventListener('click', function(e) {
//   e.preventDefault(),
//     product.pullNewProduct(product.createNewObject()),
//     product.closeWindow();
// });

// let calcPrime = document.querySelector('#primeCost');
// let calcExtra = document.querySelector('#extraCost');
// let calcTotal = document.querySelector('#totalCost');
// calcPrime.addEventListener('input', function() {
//   let newCost = (Number(this.value) * Number(calcExtra.value)) / 100;
//   calcTotal.value = Number(this.value) + newCost;
// });
// calcExtra.addEventListener('input', function() {
//   let newCost = (Number(this.value) / 100) * Number(calcPrime.value);
//   calcTotal.value = Number(calcPrime.value) + newCost;
// });
export default newProduct;
