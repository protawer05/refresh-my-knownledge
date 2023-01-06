import { FC, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ProductService } from '../../../services/product.service'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useActions } from '../../../hooks/useActions'

import Layout from '../../ui/layout/Layout'
import Button from '../../ui/button/Button'
import Gallery from './gallery/Gallery'
import backArrow from '../../../assets/Back_Arrow.svg'

import styles from './Product.module.scss'

const Product: FC = () => {
	const { id: productId } = useParams()
	const navigate = useNavigate()
	const [onButton, setOnButton] = useState(false)
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
			<div className='flex items-center'>
				<div
					className='mt-1 mr-3 cursor-pointer'
					onClick={() => navigate('../')}
				>
					<img className={styles.backArrow} src={backArrow} alt={'back'} />
				</div>
				<h1 className={'text-3xl font-semibold mb-3 mt-4'}>{product.title}</h1>
			</div>
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
				onMouseEnter={() => setOnButton(true)}
				onMouseLeave={() => setOnButton(false)}
			>
				{isInCart
					? !onButton
						? 'This product is already in cart'
						: 'Delete this from card?'
					: 'Add to cart'}
			</Button>
		</Layout>
	)
}

export default Product
