'use client';

import Link from 'next/link';
import { PiHandbag, PiTrash } from 'react-icons/pi';
import Drawer from '@/components/ui/Drawer';
import Button from '@/components/ui/Button';
import Price from '@/components/ui/Price';
import ProductImage from '@/components/ui/ProductImage';
import QuantityInput from '@/components/ui/QuantityInput';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/format';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, cartTotal, updateQty, removeFromCart } = useStore();
  const close = () => setCartOpen(false);

  return (
    <Drawer open={cartOpen} onClose={close} side="right" labelledBy="cart-title">
      <div className={styles.wrap}>
        <h2 id="cart-title" className={styles.title}>
          Shopping Basket
        </h2>

        {cartItems.length === 0 ? (
          <div className={styles.empty}>
            <PiHandbag aria-hidden="true" className={styles.emptyIcon} />
            <p>Cart is empty</p>
            <Button href="/shop" onClick={close} size="sm">
              Return to shop
            </Button>
          </div>
        ) : (
          <>
            <ul className={styles.items}>
              {cartItems.map(({ slug, qty, product, lineTotal }) => (
                <li key={slug} className={styles.item}>
                  <Link href={`/product/${slug}`} className={styles.thumb} onClick={close}>
                    <ProductImage src={product.images[0]} alt={product.name} sizes="80px" />
                  </Link>
                  <div className={styles.info}>
                    <Link href={`/product/${slug}`} className={styles.name} onClick={close}>
                      {product.name}
                    </Link>
                    <Price product={product} size="sm" />
                    <div className={styles.row}>
                      <QuantityInput
                        size="sm"
                        value={qty}
                        onChange={(n) => updateQty(slug, n)}
                        label={`${product.name} quantity`}
                      />
                      <span className={styles.line}>{formatPrice(lineTotal)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() => removeFromCart(slug)}
                    aria-label={`Remove ${product.name} from basket`}
                  >
                    <PiTrash aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles.footer}>
              <p className={styles.total}>
                <span>Subtotal</span>
                <strong>{formatPrice(cartTotal)}</strong>
              </p>
              <div className={styles.buttons}>
                <Button href="/cart" variant="outline" onClick={close} block>
                  View cart
                </Button>
                <Button href="/checkout" onClick={close} block>
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
}
