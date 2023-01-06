import { FC } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../ui/layout/Layout'
import { useQuery } from '@tanstack/react-query'
import { ProductService } from '../../../services/product.service'
import Button from '../../ui/button/Button'
import Gallery from './gallery/Gallery'

const Product: FC = () => {
	const { id } = useParams()
	const {
		data: product,
		isError,
		isLoading
	} = useQuery(['product', id], () => ProductService.getProductsById(id || ''))

	if (isLoading) {
		return (
			<Layout>
				<div className='font-semibold text-3xl'>Loading...</div>
			</Layout>
		)
	}
	if (isError) {
		return (
			<Layout>
				<div>Sometime went wrong...</div>
			</Layout>
		)
	}

	return (
		<Layout>
			<h1 className={'text-3xl font-semibold mb-3 mt-4'}>{product.title}</h1>
			<Gallery images={product?.images} />
			<div className={'text-lg text-center'}>
				{new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD'
				}).format(product.price)}
			</div>
			<Button>Add to cart</Button>
		</Layout>
	)
}

export default Product
