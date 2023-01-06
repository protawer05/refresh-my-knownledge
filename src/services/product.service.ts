import axios from 'axios'
import { IProduct, IProductsResponse } from '../types/product.interface'

axios.defaults.baseURL = 'https://dummyjson.com'
export const ProductService = {
	async getProducts() {
		const res = await axios.get<IProductsResponse>('/products', {
			params: { limit: 7 }
		})
		return res.data
	},

	async getProductsById(id: string) {
		const res = await axios.get<IProduct>(`/products/${id}`)
		return res.data
	}
}
