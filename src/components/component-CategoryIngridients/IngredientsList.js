class IngredientsList {
    constructor(data, routes) {
      this.data = data;
      this.routes = routes;
    }
    render = () => {
      if (this.data.length > 0) {
        return this.data.reduce((acc, item) => {
          acc += `
                <li class="yesh__item" id='${item.id}'>
                    <div class="yesh__item--name" id="js-category">
                    <img alt="dsf" class="yesh__img" src='${item.img}'/>
                      <p>${item.name}</p>
                    </div>
                      <div class="yesh__item-amount">${item.amount}</div>
                    <div class=" yesh__item-btn" id='${item.id}' >
                      <span class="yesh-link" id="js__category-delete">
                        <i class="material-icons yesh__noClick">delete_forever</i>
                      </span>
                    </div>
                </li>`;
          return acc;
        }, '');
      } else {
        return `
          <li class="yesh__item yesh__item-empty" id='js__list-empty'>
              Не найдено ни одной категории ингредиентов.
          </li>`;
      }
    };
    init = () => {
      return this.render();
    };
  }
  export default IngredientsList;