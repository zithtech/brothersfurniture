import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { CartProvider } from './context/CartContext'
import { ProductProvider } from './context/ProductContext'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Cart = lazy(() => import('./pages/Cart'))
const Clients = lazy(() => import('./pages/Clients'))
const Contact = lazy(() => import('./pages/Contact'))
const ErgonomicChairs = lazy(() => import('./pages/ErgonomicChairs'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Shop = lazy(() => import('./pages/Shop'))
const TrackOrder = lazy(() => import('./pages/TrackOrder'))

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-sand/10" />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="ergonomic-chairs" element={<ErgonomicChairs />} />
                <Route path="cart" element={<Cart />} />
                <Route path="track" element={<TrackOrder />} />
                <Route path="about" element={<About />} />
                <Route path="clients" element={<Clients />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  )
}
