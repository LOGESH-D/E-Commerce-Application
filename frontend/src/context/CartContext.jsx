import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const exist = cart.find((item) => item._id === product._id);
        if (exist) {
            setCart(
                cart.map((item) =>
                    item._id === product._id ? { ...item, qty: item.qty + 1 } : item
                )
            );
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
        }
    }
    const removeFromCart = (id) => {
      setCart(cart.filter((item) => item._id !== id));
    };
    const updateQty = (id, qty) => {
        setCart(
            cart.map((item) => item._id === id ? {...item, qty } : item)
        )
    };
    
    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQty }}>{children}</CartContext.Provider>
    )
}