import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Homepage from './components/Homepage'
import ProductPage from './components/ProductPage'
import CheckoutPage from './components/CheckoutPage'
import OrderReviewPage from './components/OrderReviewPage'
import ContactPage from './components/ContactPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-review" element={<OrderReviewPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

