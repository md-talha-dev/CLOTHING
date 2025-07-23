import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, MessageCircle, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import luxeraLogo from '../assets/luxera-logo.png'
import api from '../utils/api'

const OrderReviewPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderCreated, setOrderCreated] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState('')
  
  // Get order data from location state
  const orderData = location.state

  useEffect(() => {
    // Redirect to checkout if no order data
    if (!orderData) {
      navigate('/checkout')
    }
  }, [orderData, navigate])

  if (!orderData) {
    return null
  }

  const { product, quantity, selectedSize, selectedColor, customerDetails } = orderData

  const handleConfirmOrder = async () => {
    setIsSubmitting(true)
    
    try {
      // Prepare order data for API
      const apiOrderData = {
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        },
        quantity,
        selectedSize,
        selectedColor,
        customerDetails: {
          fullName: customerDetails.fullName,
          mobileNumber: customerDetails.mobileNumber,
          whatsappNumber: customerDetails.whatsappNumber,
          email: customerDetails.email,
          address: customerDetails.address,
          city: customerDetails.city,
          province: customerDetails.province
        }
      }

      // Create order via API
      const response = await api.createOrder(apiOrderData)
      
      if (response.success) {
        setWhatsappUrl(response.whatsappUrl)
        setOrderCreated(true)
        
        // Open WhatsApp in new tab
        window.open(response.whatsappUrl, '_blank')
        
        // Mark WhatsApp as sent
        await api.markWhatsAppSent(response.order.id)
      }
    } catch (error) {
      console.error('Error creating order:', error)
      alert('There was an error processing your order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const subtotal = product.price * quantity
  const shipping = 0
  const total = subtotal + shipping

  if (orderCreated) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link to="/">
                  <img src={luxeraLogo} alt="Luxera" className="h-12 w-auto" />
                </Link>
                <div className="hidden md:block">
                  <p className="serif-font text-sm luxury-text-gradient font-medium">
                    Timeless Luxury, Perfected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Order Confirmation */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-8" />
            <h1 className="serif-font text-4xl lg:text-6xl font-bold luxury-text-gradient mb-6">
              Order Confirmed!
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your order has been successfully submitted and sent to our team via WhatsApp. 
              We'll contact you within 24 hours to confirm your order and provide tracking information.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.open(whatsappUrl, '_blank')}
                className="luxury-button"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Open WhatsApp Again
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <img src={luxeraLogo} alt="Luxera" className="h-12 w-auto" />
              </Link>
              <div className="hidden md:block">
                <p className="serif-font text-sm luxury-text-gradient font-medium">
                  Timeless Luxury, Perfected
                </p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-foreground hover:text-primary transition-colors">
                Products
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/checkout', { state: orderData })}
          className="text-primary hover:text-primary/80"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back & Edit
        </Button>
      </div>

      {/* Order Review Content */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="serif-font text-3xl lg:text-5xl font-bold luxury-text-gradient mb-4">
              Review Your Order
            </h1>
            <p className="text-muted-foreground">
              Please review your order details before confirmation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Customer Details */}
            <div className="product-card p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">👤</span>
                </div>
                <h2 className="serif-font text-2xl font-bold">Customer Details</h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Full Name</span>
                  <span className="font-medium">{customerDetails.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mobile Number</span>
                  <span className="font-medium">{customerDetails.mobileNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">WhatsApp Number</span>
                  <span className="font-medium">{customerDetails.whatsappNumber || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{customerDetails.email}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-start justify-between">
                    <span className="text-muted-foreground">📍 Delivery Address</span>
                  </div>
                  <p className="font-medium mt-2">
                    {customerDetails.address}<br />
                    {customerDetails.city}, {customerDetails.province}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="product-card p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-bold">📦</span>
                </div>
                <h2 className="serif-font text-2xl font-bold">Order Details</h2>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">Quantity: {quantity}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Unit Price</span>
                  <span className="font-medium">Rs. {product.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                {selectedSize && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size</span>
                    <span className="font-medium">{selectedSize}</span>
                  </div>
                )}
                {selectedColor && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Color</span>
                    <span className="font-medium">{selectedColor}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-green-500">Free</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="luxury-text-gradient">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="product-card p-8 mb-8">
            <h2 className="serif-font text-2xl font-bold mb-6">Payment Method</h2>
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Cash on Delivery</h3>
              <p className="text-center text-muted-foreground">
                Pay when you receive your order at your doorstep
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline"
              onClick={() => navigate('/checkout', { state: orderData })}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back & Edit
            </Button>
            <Button 
              onClick={handleConfirmOrder}
              disabled={isSubmitting}
              className="luxury-button text-lg px-8 py-6"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Processing...' : 'Confirm & Send to WhatsApp'}
            </Button>
          </div>

          {/* Order Confirmation Process */}
          <div className="mt-12 product-card p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              <h3 className="font-bold text-green-500">Order Confirmation Process</h3>
            </div>
            <p className="text-muted-foreground">
              When you click "Confirm & Send to WhatsApp", your order details will be sent to our team via WhatsApp. 
              Our customer service representative will contact you within 24 hours to confirm your order and provide 
              tracking information once your item is shipped.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OrderReviewPage

