import { FC } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../ui/layout/Layout'
import { useQuery } from '@tanstack/react-query'
import { ProductService } from '../../../services/product.service'
import Button from '../../ui/button/Button'
import Gallery from './gallery/Gallery'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useActions } from '../../../hooks/useActions'

const Product: FC = () => {
	const { id: productId } = useParams()
	const {
		data: product,
		isError,
		isLoading
	} = useQuery(['product', productId], () =>
		ProductService.getProductsById(productId || '')
	)
	const { items } = useTypedSelector(state => state.cart)
	const { addToCart, removeFromCart } = useActions()
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
	const isInCart = items.some(item => item.id === Number(productId))

	return (
		<Layout>
			<h1 className={'text-3xl font-semibold mb-3 mt-4'}>{product.title}</h1>
			<Gallery images={product?.images} />
			<div className={'text-xl text-center mt-3'}>
				{new Intl.NumberFormat('en-US', {
					style: 'currency',
					currency: 'USD'
				}).format(product.price)}
			</div>
			<Button
				style={isInCart ? { backgroundColor: 'red' } : {}}
				onClick={() =>
					isInCart ? removeFromCart(Number(productId)) : addToCart(product)
				}
			>
				{isInCart ? 'This product is already in cart' : 'Add to cart'}
			</Button>
		</Layout>
	)
}

export default Product
