import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IProduct } from '../../../types/product.interface'
import styles from './ProductItem.module.scss'
const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
	return (
		<Link className={styles.item} to={`/product/${product.id}`}>
			<div
				className={styles.image}
				style={{ backgroundImage: `url(${product.thumbnail})` }}
			/>

			<div className={styles.heading}>{product.title}</div>
			<div className={styles.price}>
				{new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD'
				}).format(product.price)}
			</div>
		</Link>
	)
}

export default ProductItem
