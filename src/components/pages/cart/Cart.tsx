import { FC } from 'react'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import styles from './Cart.module.scss'
import Layout from '../../ui/layout/Layout'
import Button from '../../ui/button/Button'

const Cart: FC = () => {
	const { items } = useTypedSelector(state => state.cart)
	const { removeFromCart } = useActions()
	return (
		<Layout title={'Cart'}>
			{items.length ? (
				<div className={styles.cart}>
					{items.map(product => (
						<div key={product.id}>
							<div>
								<span className='mr-3 font-semibold'>{product.title}</span>
								<span>{product.price}$</span>
							</div>
							<button
								className='text-[#dc2626]'
								onClick={() => removeFromCart(product.id)}
							>
								Remove
							</button>
						</div>
					))}
				</div>
			) : (
				<div className={styles.emptyCart}>Cart is empty</div>
			)}
			{items.length ? <Button>Checkout</Button> : null}
		</Layout>
	)
}

export default Cart
