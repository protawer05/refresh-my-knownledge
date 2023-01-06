import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '../types/product.interface'
import { IInitialState } from './types'

const initialState: IInitialState = {
	items: []
}

export const CartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<IProduct>) => {
			state.items.push(action.payload)
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			state.items = state.items.filter(item => item.id !== action.payload)
		}
	}
})
