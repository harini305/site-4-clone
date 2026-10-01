// Free delivery on orders over $30 (matches the homepage "Free Delivery" promise).
export const FREE_SHIPPING_THRESHOLD = 30;
export const FLAT_SHIPPING = 5;

export const shippingFor = (subtotal) => (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING);
