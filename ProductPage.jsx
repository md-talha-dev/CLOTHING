import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ShoppingCart, Instagram, Facebook, Linkedin, MessageCircle, Star, Plus, Minus, ZoomIn, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import luxeraLogo from '../assets/luxera-logo.png'
import product1 from '../assets/product-1.jpg'
import product2 from '../assets/product-2.jpg'
import product3 from '../assets/product-3.jpg'
import productDetail1 from '../assets/product-detail-1.jpg'
import productDetail2 from '../assets/product-detail-2.jpg'
import productDetail3 from '../assets/product-detail-3.jpg'

const ProductPage = () => {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [isZoomed, setIsZoomed] = useState(false)

  // Mock product data
  const product = {
    id: 1,
    name: "Luxera Smart Elite",
    price: 45000,
    originalPrice: 65000,
    discount: 30,
    rating: 4.8,
    reviewCount: 127,
    description: "Experience the pinnacle of luxury smartwatch technology with the Luxera Smart Elite. This premium timepiece combines traditional craftsmanship with cutting-edge technology, featuring a stunning black metal case and premium silicone band. Perfect for the modern professional who demands both style and functionality.",
    features: [
      "Premium black metal case with scratch-resistant coating",
      "High-resolution AMOLED display with always-on feature",
      "Advanced health monitoring including heart rate and sleep tracking",
      "Water-resistant up to 50 meters",
      "7-day battery life with fast charging",
      "Bluetooth 5.0 connectivity",
      "Compatible with iOS and Android"
    ],
    specifications: {
      "Case Material": "Premium Black Metal",
      "Band Material": "Silicone",
      "Display": "1.4\" AMOLED",
      "Battery Life": "7 Days",
      "Water Resistance": "50M",
      "Connectivity": "Bluetooth 5.0"
    },
    images: [product1, productDetail1, productDetail2, productDetail3],
    sizes: ["42mm", "46mm"],
    colors: ["Black", "Silver", "Gold"]
  }

  const reviews = [
    {
      id: 1,
      name: "Ahmed Khan",
      rating: 5,
      comment: "Absolutely stunning watch! The build quality is exceptional and the features are amazing.",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Sarah Ali",
      rating: 4,
      comment: "Great smartwatch with excellent battery life. Highly recommended!",
      date: "2024-01-10"
    },
    {
      id: 3,
      name: "Muhammad Hassan",
      rating: 5,
      comment: "Perfect blend of luxury and technology. Worth every penny!",
      date: "2024-01-05"
    }
  ]

  const similarProducts = [
    {
      id: 2,
      name: "Premium Audio Pro",
      price: 25000,
      originalPrice: 35000,
      discount: 28,
      image: product2,
      rating: 4.9
    },
    {
      id: 3,
      name: "Classic Gold Heritage",
      price: 85000,
      originalPrice: 120000,
      discount: 29,
      image: product3,
      rating: 5.0
    }
  ]

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log('Added to cart:', { product, quantity, selectedSize, selectedColor })
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

      {/* Product Details */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className={`w-full h-96 lg:h-[500px] object-cover rounded-lg transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              <button 
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-border'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-primary fill-current' : 'text-gray-400'}`} 
                  />
                ))}
              </div>
              <span className="text-muted-foreground">({product.rating}) • {product.reviewCount} reviews</span>
            </div>

            {/* Product Name */}
            <h1 className="serif-font text-3xl lg:text-4xl font-bold text-foreground">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold luxury-gold">
                Rs. {product.price.toLocaleString()}
              </span>
              <span className="text-xl text-muted-foreground line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {product.discount}% OFF
              </span>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((color) => (
                      <SelectItem key={color} value={color}>{color}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-secondary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Link to="/checkout" state={{ product, quantity, selectedSize, selectedColor }}>
              <Button 
                className="luxury-button w-full text-lg py-6"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - Rs. {(product.price * quantity).toLocaleString()}
              </Button>
            </Link>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Reviews */}
        <div className="mt-16">
          <h2 className="serif-font text-2xl font-bold mb-8 luxury-text-gradient">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="product-card p-6">
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'text-primary fill-current' : 'text-gray-400'}`} 
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">{review.date}</span>
                </div>
                <h4 className="font-semibold mb-2">{review.name}</h4>
                <p className="text-muted-foreground text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-16">
          <h2 className="serif-font text-2xl font-bold mb-8 luxury-text-gradient">Similar Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {similarProducts.map((similarProduct) => (
              <div key={similarProduct.id} className="product-card hover-scale group">
                <div className="relative overflow-hidden">
                  <img 
                    src={similarProduct.image} 
                    alt={similarProduct.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="discount-badge">
                    {similarProduct.discount}% OFF
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(similarProduct.rating) ? 'text-primary fill-current' : 'text-gray-400'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">({similarProduct.rating})</span>
                  </div>
                  
                  <h3 className="serif-font text-xl font-semibold mb-3 text-foreground">
                    {similarProduct.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold luxury-gold">
                        Rs. {similarProduct.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        Rs. {similarProduct.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <Link to={`/product/${similarProduct.id}`}>
                    <Button className="luxury-button w-full">
                      View Product
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <img src={luxeraLogo} alt="Luxera" className="h-12 w-auto mb-4" />
              <p className="serif-font text-sm luxury-text-gradient font-medium mb-4">
                Timeless Luxury, Perfected
              </p>
              <p className="text-muted-foreground mb-6 max-w-md">
                Discover the finest collection of luxury watches and premium gadgets. 
                Each piece is carefully curated to represent the pinnacle of craftsmanship and design.
              </p>
              
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Contact Info</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>📧 info@luxera.com</p>
                <p>📞 +92 326 1300101</p>
                <p>📍 Karachi, Pakistan</p>
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Luxera. All rights reserved. | Crafted with excellence for luxury enthusiasts.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ProductPage

