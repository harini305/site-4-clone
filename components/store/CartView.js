'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PiHandbag, PiTrash } from 'react-icons/pi';
import Button from '@/components/ui/Button';
import Price from '@/components/ui/Price';
import ProductImage from '@/components/ui/ProductImage';
import QuantityInput from '@/components/ui/QuantityInput';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/format';
import { shippingFor } from '@/lib/checkout';
import styles from './StoreTables.module.css';

export default function CartView() {
  const { cartItems, cartTotal, hydrated, updateQty, removeFromCart, toast } = useStore();
  const [coupon, setCoupon] = useState('');

  if (!hydrated) return <p className={styles.loading}>Loading your cart…</p>;

  if (!cartItems.length) {
    return (
      <div className={styles.empty}>
        <PiHandbag aria-hidden="true" className={styles.emptyIcon} />
        <p>Your cart is currently empty.</p>
        <Button href="/shop">Return to shop</Button>
      </div>
    );
  }

  const shipping = shippingFor(cartTotal);

  return (
    <div className={styles.cartLayout}>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Remove</span>
              </th>
              <th scope="col">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(({ slug, qty, product, lineTotal }) => (
              <tr key={slug}>
                <td>
                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() => removeFromCart(slug)}
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    <PiTrash aria-hidden="true" />
                  </button>
                </td>
                <td>
                  <Link href={`/product/${slug}`} className={styles.thumb} tabIndex={-1} aria-hidden="true">
                    <ProductImage src={product.images[0]} alt="" sizes="90px" />
                  </Link>
                </td>
                <td data-label="Product">
                  <Link href={`/product/${slug}`} className={styles.name}>
                    {product.name}
                  </Link>
                </td>
                <td data-label="Price">
                  <Price product={product} size="sm" />
                </td>
                <td data-label="Quantity">
                  <QuantityInput
                    size="sm"
                    value={qty}
                    onChange={(n) => updateQty(slug, n)}
                    label={`${product.name} quantity`}
                  />
                </td>
                <td data-label="Subtotal" className={styles.strong}>
                  {formatPrice(lineTotal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <form
          className={styles.coupon}
          onSubmit={(e) => {
            e.preventDefault();
            toast(coupon.trim() ? `Coupon “${coupon.trim()}” is not valid (demo store).` : 'Please enter a coupon code.', 'error');
          }}
        >
          <label htmlFor="coupon" className="sr-only">
            Coupon code
          </label>
          <input
            id="coupon"
            className="input"
            placeholder="Coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button type="submit" className={styles.action}>
            Apply coupon
          </button>
        </form>
      </div>

      <aside className={styles.totals} aria-labelledby="cart-totals">
        <h2 id="cart-totals" className={styles.totalsTitle}>
          Cart totals
        </h2>
        <dl>
          <div>
            <dt>Subtotal</dt>
            <dd>{formatPrice(cartTotal)}</dd>
          </div>
          <div>
            <dt>Shipping</dt>
            <dd>{shipping === 0 ? 'Free shipping' : formatPrice(shipping)}</dd>
          </div>
          <div className={styles.grand}>
            <dt>Total</dt>
            <dd>{formatPrice(cartTotal + shipping)}</dd>
          </div>
        </dl>
        <Button href="/checkout" block size="lg">
          Proceed to checkout
        </Button>
      </aside>
    </div>
  );
}
