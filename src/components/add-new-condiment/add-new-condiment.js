import './add-new-condiment.scss';
import shortid from 'shortid';
import Admin from '../createOneIngrClass/createOneIngrClass';

class newProduct {
  renderNewWindow = container => {
    container.insertAdjacentHTML(
      'afterbegin',
      `
        <div class="page-product-form">
        <div class="content-header">
            <div class="pull-left" style="display: inline-block; margin-right: 10px;  margin-top: 15px;">
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
            <h2 class="ib" style="display: inline-block; font-weight: bold; font-size: 24px;">Новый ингридиент</h2>
        </div>
        <form class="form-horizontal" id="update_product_save_form">
            <div class="form-group" style="margin: 20px 10px;">
                <div style="display: inline-block; width: 20%">
                    <label for="product_name" class="control-label">Название</label>
                </div>
                <div class="tax-type-change" style="display: inline-block; width: 55%;">
                    <input required type="text" name="product_name" value="" class="form-control" id="title" autofocus="true">
                </div>
            </div>

            <div class="form-group" style="margin: 20px 10px;">
            <div style="display: inline-block; width: 20%">
                <label for="product_amount" class="control-label">Цена ₴</label>
            </div>
            <div class="tax-type-change" style="display: inline-block; width: 20%;">
                <input required type="number" name="product_amount" value="" class="form-control" id="amount">
            </div>
        </div>

        <div class="form-group" style="margin: 20px 10px;">
        <div style="display: inline-block; width: 20%">
            <label for="product_weight" class="control-label">Вес кг</label>
        </div>
        <div class="tax-type-change" style="display: inline-block; width: 20%;">
            <input required type="number" name="product_weight" value="" class="form-control" id="weight" >
        </div>
    </div>
        <section id="details">

        </section>

         <button type="button" class="content-header__button add-tv" >Добавить товар, в котором используется этот ингридиент</button>
         
         <button class="add-dish__btn" type="submit" data-action="add">Сохранить</button>
        </form>
    </div>
        `,
    );
  };
  addDetailsInfo = () => {
    const detailsSection = document.querySelector('#details');
    const btn = document.querySelector('.add-tv');
    detailsSection.addEventListener('click', e => {
      if (e.target.id === 'product-delete') {
        e.target.parentNode.outerHTML = '';
      }
    });
    btn.addEventListener('click', e => {
      detailsSection.insertAdjacentHTML(
        'beforeend',
        `
        <div class="product-add-det">
        <div class="form-group" style="margin: 20px 10px;">
        <div style="display: inline-block; width: 20%">
            <label for="product" class="control-label colorl">Название продукта</label>
        </div>
        <div class="tax-type-change" style="display: inline-block; width: 55%;">
            <input required type="text" name="product" value="" class="form-control" id="product" autofocus="true">
        </div>
    </div>

        <div class="form-group" style="margin: 20px 10px;">
        <div style="display: inline-block; width: 20%">
            <label for="product_brutto" class="control-label colorl">Брутто кг</label>
        </div>
        <div class="tax-type-change" style="display: inline-block; width: 20%;">
            <input required type="number" name="product_brutto" value="" class="form-control" id="brutto" >
        </div>
    </div>

    <div class="form-group" style="margin: 20px 10px;">
    <div style="display: inline-block; width: 20%">
        <label for="product_netto" class="control-label colorl">Нетто кг</label>
    </div>
    <div class="tax-type-change" style="display: inline-block; width: 20%;">
        <input required type="number" name="product_netto" value="" class="form-control" id="netto" >
    </div>
</div>

<div class="form-group" style="margin: 20px 10px;">
<div style="display: inline-block; width: 20%">
    <label for="product_price" class="control-label colorl">Цена ₴</label>
</div>
<div class="tax-type-change" style="display: inline-block; width: 20%;">
    <input required type="number" name="product_price" value="" class="form-control" id="price" >
</div>
</div>
        <button type="button" id="product-delete" class="product-delete">Удалить продукт</button>
</div>
        `,
      );
    });
    const form = document.querySelector('#update_product_save_form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const detailsSection = document.querySelector('#details');
      const name = document.querySelector('#title').value.trim();
      const arr = JSON.parse(localStorage.getItem('CONDIMENTS'));
      const alreadyUsed = arr.find(el => el.name === name);
      if (alreadyUsed) {
        alert(`Ингридиент с названием ${name} уже используется!`);
        return;
      } else {
        const newCondiment = {
          id: shortid.generate(),
          name: document.querySelector('#title').value,
          weight: Number(document.querySelector('#weight').value),
          price: Number(document.querySelector('#amount').value),
          details: [],
        };
        const arr = [...detailsSection.children];
        arr.forEach(el => {
          const product = {
            name: el.querySelector('#product').value,
            brutto: Number(el.querySelector('#brutto').value),
            netto: Number(el.querySelector('#netto').value),
            price: Number(el.querySelector('#price').value),
          };
          newCondiment.details.push(product);
        });

        localStorage.setItem(
          'CONDIMENTS',
          JSON.stringify([
            ...JSON.parse(localStorage.getItem('CONDIMENTS')),
            newCondiment,
          ]),
        );
        alert(`Ингридиент с названием ${name} успешно добавлен!`);
      }
    });
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
  // submit = () => {
  //     const formSubmit = document.querySelector('.form-horizontal');
  //     formSubmit.addEventListener('submit',(e) => {
  //          e.preventDefault();
  //          let img = document.querySelector('#photoLink').value;
  //          const name = document.querySelector('#title').value;
  //         const category = document.querySelector('#add-category').value;
  //         const value = document.querySelector('#primeCost').value;
  //          const priceW = document.querySelector('#totalCost').textContent;
  //          const  profitPercent = document.querySelector('#extraCost').value;
  //          if(img.trim() === ''){
  //              img = 'https://cdn.pixabay.com/photo/2013/07/12/16/50/comics-151341__340.png';
  //          }
  //          const newGood = {
  //              img,
  //              name,
  //              category,
  //              value,
  //             price : Number(priceW).toFixed() ,
  //             profitPercent,
  //             profit : (Number(priceW)-Number(value)).toFixed(),
  //             id : shortid.generate()
  //          }
  //          localStorage.setItem('GOODS',JSON.stringify([...JSON.parse(localStorage.getItem('GOODS')),newGood]))
  //     })
  // }

  start = container => {
    container.innerHTML = '';
    this.renderNewWindow(container);
    this.addDetailsInfo();
    const btnBack = document.querySelector('.btn-back');
    btnBack.addEventListener('click', e => {
      const wrapper = document.querySelector('.wrapper-admin-page__main');
      wrapper.innerHTML = '';

      return new Admin(wrapper).init();
    });
    // this.submit()

    // let calcPrime = document.querySelector('#primeCost');
    // let calcExtra = document.querySelector('#extraCost');
    // let calcTotal = document.querySelector('#totalCost');
    // calcPrime.addEventListener('input', function() {
    //   let newCost = (Number(this.value) * Number(calcExtra.value)) / 100;
    //   calcTotal.textContent = (Number(this.value) + newCost).toFixed(2);
    // });
    // calcExtra.addEventListener('input', function() {
    //   let newCost = (Number(this.value) / 100) * Number(calcPrime.value);
    //   calcTotal.textContent = (Number(calcPrime.value) + newCost).toFixed(2);
    // });
    // const btnBack = document.querySelector('.pull-left');
    // btnBack.addEventListener('click', () => {
    //   container.innerHTML = '';
    //   new GoodsCollection().start(container);
    // });
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
