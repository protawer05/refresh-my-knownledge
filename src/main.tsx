import ReactDOM from 'react-dom/client'
import { Home, Cart, Product } from './components/pages'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/store'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<PersistGate persistor={persistor} loading={null}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/product/:id' element={<Product />} />
						<Route path='/cart' element={<Cart />} />
					</Routes>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</QueryClientProvider>
)
