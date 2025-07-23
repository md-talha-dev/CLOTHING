import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, ArrowLeft, CreditCard, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import luxeraLogo from '../assets/luxera-logo.png'

const CheckoutPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { product, quantity = 1, selectedSize, selectedColor } = location.state || {}

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    whatsappNumber: '',
    email: '',
    address: '',
    city: '',
    province: ''
  })

  const [errors, setErrors] = useState({})

  const pakistaniCities = [
    'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 
    'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Gujranwala'
  ]

  const pakistaniProvinces = [
    'Sindh', 'Punjab', 'Khyber Pakhtunkhwa', 'Balochistan', 'Gilgit-Baltistan'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required'
    } else if (!/^(\+92|0)?[0-9]{10}$/.test(formData.mobileNumber.replace(/\s/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid Pakistani mobile number'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.city) {
      newErrors.city = 'City is required'
    }

    if (!formData.province) {
      newErrors.province = 'Province is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      navigate('/order-review', {
        state: {
          product,
          quantity,
          selectedSize,
          selectedColor,
          customerDetails: formData
        }
      })
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Product Selected</h1>
          <Link to="/">
            <Button className="luxury-button">Return to Homepage</Button>
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = product.price * quantity
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

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

      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link 
          to={`/product/${product.id}`}
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Product
        </Link>

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="serif-font text-3xl lg:text-4xl font-bold luxury-text-gradient mb-4">
            Checkout
          </h1>
          <p className="text-muted-foreground">
            Complete your order details below
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Customer Information */}
              <div className="product-card p-8">
                <div className="flex items-center mb-6">
                  <CreditCard className="w-6 h-6 text-primary mr-3" />
                  <h2 className="text-xl font-semibold">Customer Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      className={errors.fullName ? 'border-red-500' : ''}
                    />
                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobileNumber">Mobile Number *</Label>
                    <Input
                      id="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                      placeholder="+92 300 1234567"
                      className={errors.mobileNumber ? 'border-red-500' : ''}
                    />
                    {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsappNumber">WhatsApp Number (Optional)</Label>
                    <Input
                      id="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                      placeholder="+92 300 1234567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="product-card p-8">
                <div className="flex items-center mb-6">
                  <Truck className="w-6 h-6 text-primary mr-3" />
                  <h2 className="text-xl font-semibold">Delivery Information</h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="address">Complete Delivery Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="House/Flat No, Street, Area"
                      className={errors.address ? 'border-red-500' : ''}
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Select value={formData.city} onValueChange={(value) => handleInputChange('city', value)}>
                        <SelectTrigger className={errors.city ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent>
                          {pakistaniCities.map((city) => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="province">Province *</Label>
                      <Select value={formData.province} onValueChange={(value) => handleInputChange('province', value)}>
                        <SelectTrigger className={errors.province ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select your province" />
                        </SelectTrigger>
                        <SelectContent>
                          {pakistaniProvinces.map((province) => (
                            <SelectItem key={province} value={province}>{province}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.province && <p className="text-red-500 text-sm">{errors.province}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="luxury-button w-full text-lg py-6">
                Review Order
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="product-card p-8 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              {/* Product Details */}
              <div className="flex items-start space-x-4 mb-6">
                <img 
                  src={product.image || product.images?.[0]} 
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  {selectedSize && (
                    <p className="text-muted-foreground text-sm">Size: {selectedSize}</p>
                  )}
                  {selectedColor && (
                    <p className="text-muted-foreground text-sm">Color: {selectedColor}</p>
                  )}
                  <p className="text-muted-foreground text-sm">Qty: {quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold luxury-gold">
                    Rs. {(product.price * quantity).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-border pt-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-border pt-3">
                  <span>Total</span>
                  <span className="luxury-gold">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Cash on Delivery Notice */}
              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-center">
                  <span className="font-semibold luxury-gold">Cash on Delivery</span>
                  <br />
                  Pay when you receive your order
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage

