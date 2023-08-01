class ShoppingCartService {
  // static calculateDiscountAmount = (cartItems, total, promoCode) => {
  //     let discountAmount = 0;
  //     if (promoCode === 'RRD4D32' && total > 1000) {
  //         discountAmount = Number((total * 0.1).toFixed(2));
  //     } else if (promoCode === '44F4T11' && total > 1500) {
  //         discountAmount = Number((total * 0.15).toFixed(2));
  //     } else if (promoCode === 'FF9543D1') {
  //         const docgen = cartItems.find(item => item.product.id === 'docgen');
  //         if (docgen && docgen.quantity >= 10) {
  //             discountAmount = docgen.quantity; // $1 discount for each dogen.
  //         }
  //     } else if (promoCode === 'YYGWKJD') {
  //         const wf = cartItems.find(item => item.product.id === 'wf');
  //         const form = cartItems.find(item => item.product.id === 'form');
  //         if (wf && form) {
  //             discountAmount = form.quantity * 10; // $10 discount for each form.
  //         }
  //     }
  //     return discountAmount;
  // };

  static calculateDiscountAmount = (promeType, promeAmount, totalCost) => {
    let discountAmount = 0;

    if (promeType == 'flat') {
      discountAmount = promeAmount;
    } else {
      //discountAmount = Number((total * 0.15).toFixed(2));
      discountAmount = ((totalCost * promeAmount) / 100).toFixed(2);
    }

    //console.warn(promeAmount);
    // if (promoCode === 'RRD4D32' && total > 1000) {
    //   discountAmount = Number((total * 0.1).toFixed(2));
    // } else if (promoCode === '44F4T11' && total > 1500) {
    //   discountAmount = Number((total * 0.15).toFixed(2));
    // } else if (promoCode === 'FF9543D1') {
    //   const docgen = cartItems.find(item => item.product.id === 'docgen');
    //   if (docgen && docgen.quantity >= 10) {
    //     discountAmount = docgen.quantity; // $1 discount for each dogen.
    //   }
    // } else if (promoCode === 'YYGWKJD') {
    //   const wf = cartItems.find(item => item.product.id === 'wf');
    //   const form = cartItems.find(item => item.product.id === 'form');
    //   if (wf && form) {
    //     discountAmount = form.quantity * 10; // $10 discount for each form.
    //   }
    // }
    return discountAmount;
  };
  static calculateTotalGrossAmount = (
    totalSubCost,
    shippingRate,
    vatRate,
    discountAmount,
  ) => {
    let totalGrossAmount = 0;

    // totalGrossAmount = (
    //   totalSubCost +
    //   shippingRate +
    //   vatRate -
    //   discountAmount
    // ).toFixed(2);
    totalGrossAmount = totalSubCost.toFixed(2);

    return totalGrossAmount;
  };
}

export default ShoppingCartService;
