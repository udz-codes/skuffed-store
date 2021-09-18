export const additemToCart = (item, next) => {
    let cart = []

    if(typeof window != undefined) {
        var cartData = localStorage.getItem("cart");
        
        if(cartData) {
            cart = JSON.parse(cartData);
        }

        cart.push({
            ...item
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
}

export const loadCart = () => {
    if(typeof window != undefined) {
        var cartData = localStorage.getItem("cart");
        
        if(cartData) {
            return JSON.parse(cartData);
        }
    }
}

export const removeItemFromCart = (productId) => {
    let cart = []

    if(typeof window != undefined) {
        var cartData = localStorage.getItem("cart");
        
        if(cartData) {
            cart = JSON.parse(cartData);
        }

        cart.map((product, index) => {
            if(product.id === productId) {
                cart.splice(index, 1);
            }
            return product;
        })

        localStorage.setItem("cart", JSON.stringify(cart));

        return cart;
    }
}

export const cartEmpty = (next) => {
    if(typeof window != undefined) {
        localStorage.removeItem("cart");

        let cart = []

        localStorage.setItem("cart", JSON.stringify(cart));
    }
}