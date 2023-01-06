import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { ProductService } from '../../../services/product.service'
import { IProduct } from '../../../types/product.interface'
import Layout from '../../ui/layout/Layout'
import ProductItem from '../../ui/product-item/ProductItem'
import styles from './Home.module.scss'
const Home: FC = () => {
	const { data: products, isLoading } = useQuery(
		['products'],
		() => ProductService.getProducts(),
		{
			select: ({ products }) => products
		}
	)

	return (
		<Layout title='Shop the collection'>
			{isLoading ? (
				<h1 className='text-blue-400 text-2xl'>Loading...</h1>
			) : products?.length ? (
				<div className={styles.wrapper}>
					{products.map(product => (
						<ProductItem key={product.id} product={product} />
					))}
				</div>
			) : (
				<div>Products not found!</div>
			)}
		</Layout>
	)
}

export default Home
