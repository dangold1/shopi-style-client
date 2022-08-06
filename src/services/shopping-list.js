export const isProductExists = (list, product) => list.findIndex(item =>
    item._id === product._id && item.selectedSize === product.selectedSize
);

export const getProductsAmount = list => {
    let itemsAmount = 0;
    if (list.length) list.forEach(item => { itemsAmount += item.amount; });
    return itemsAmount;
}

export const findIndexByUUID = (list, uuid) => list.findIndex(item => item.uuid === uuid)