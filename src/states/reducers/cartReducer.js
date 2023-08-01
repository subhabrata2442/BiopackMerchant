import * as actions from '../actionTypes/actionTypes';

const reducer = (state = [], action) => {
  let done = false;
  switch (action.type) {
    case actions.CART_ADD:
      state.map((item, index) => {
        //console.warn(action.payload.size);
        //console.warn(item._id);

        if (item._id === action.payload.id) {
          done = true;

          //console.warn('eee');

          state[index].size = action.payload.size;
          state[index].price = action.payload.price;
          // state[index].quantity = state[index].quantity + 1;
          // state[index].quantity = state[index].quantity + 1;
          // state[index].quantity = state[index].quantity + 1;

          // if (item.avaiableQuantity > item.quantity) {
          //   state[index].quantity = state[index].quantity + 1;
          // } else {
          //   console.log("out of stock");
          // }

          //return state;
        }
      });
      if (!done) {
        return [
          ...state,
          {
            _id: action.payload.id,
            sellerId: action.payload.sellerId,
            productId: action.payload.productId,
            sizeId: action.payload.sizeId,
            category: action.payload.categoryId,
            //subCategoryId: action.payload.subCategoryId,
            //childCategory: action.payload.childCategory,
            size: action.payload.size,
            image: action.payload.poster,
            unitPrice: action.payload.unitPrice,
            price: action.payload.price,
            title: action.payload.title,
            subTitle: action.payload.subTitle,
            avaiableQuantity: action.payload.quantity,
            quantity: 1,
          },
        ];
      }

    case actions.CART_REMOVE:
      return state.filter(item => item._id !== action.payload);

    case actions.INCREASE_CART_ITEM_QUANTITY:
      if (action.payload.type === 'increase') {
        console.log('f');

        return false;
        state.map((item, index) => {
          if (item._id === action.payload.id) {
            return (state[index].quantity = state[index].quantity + 1);
          }
        });
      }

    case actions.DECREASE_CART_ITEM_QUANTITY:
      if (action.payload.type === 'decrease') {
        state.map((item, index) => {
          if (item._id === action.payload.id) {
            return (state[index].quantity = state[index].quantity - 1);
          }
        });
      }
    case actions.EMPTY_CART:
      if (action.payload === 'empty') {
        state.splice(0, state.length);
        return state;
      }

    case actions.LOGOUT:
      console.log('test5');
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
