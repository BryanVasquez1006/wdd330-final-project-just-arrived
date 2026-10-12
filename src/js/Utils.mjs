const cart = [
        { productId: 101, quantity: 2 },
        { productId: 102, quantity: 1 }
    ];
    setLocalStorage("ja-cart", cart);


export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


