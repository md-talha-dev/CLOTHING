import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Instagram, Facebook, Linkedin, MessageCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import luxeraLogo from '../assets/luxera-logo.png'
import heroBanner from '../assets/hero-banner.jpg'
import product1 from '../assets/product-1.jpg'
import product2 from '../assets/product-2.jpg'
import product3 from '../assets/product-3.jpg'

const Homepage = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Luxera Smart Elite",
      price: 45000,
      originalPrice: 65000,
      discount: 30,
      image: product1,
      rating: 4.8
    },
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

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Tagline */}
            <div className="flex items-center space-x-4">
              <img src={luxeraLogo} alt="Luxera" className="h-12 w-auto" />
              <div className="hidden md:block">
                <p className="serif-font text-sm luxury-text-gradient font-medium">
                  Timeless Luxury, Perfected
                </p>
              </div>
            </div>

            {/* Navigation */}
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

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="outline" size="sm">
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Banner Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="serif-font text-5xl md:text-7xl font-bold mb-6 luxury-text-gradient">
            Timeless Luxury
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Discover our exclusive collection of premium watches and gadgets
          </p>
          <Button className="luxury-button text-lg px-8 py-4">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Cash on Delivery Callout */}
      <section className="py-8 bg-secondary/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-medium luxury-gold">
            ✨ Cash on Delivery Available Across Pakistan ✨
          </p>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="serif-font text-4xl md:text-5xl font-bold mb-4 luxury-text-gradient">
              Featured Collection
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked luxury items that define elegance and sophistication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card hover-scale group">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="discount-badge">
                    {product.discount}% OFF
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-primary fill-current' : 'text-gray-400'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">({product.rating})</span>
                  </div>
                  
                  <h3 className="serif-font text-xl font-semibold mb-3 text-foreground">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold luxury-gold">
                        Rs. {product.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <Link to={`/product/${product.id}`}>
                    <Button className="luxury-button w-full">
                      Buy Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <img src={luxeraLogo} alt="Luxera" className="h-12 w-auto mb-4" />
              <p className="serif-font text-sm luxury-text-gradient font-medium mb-4">
                Timeless Luxury, Perfected
              </p>
              <p className="text-muted-foreground mb-6 max-w-md">
                Discover the finest collection of luxury watches and premium gadgets. 
                Each piece is carefully curated to represent the pinnacle of craftsmanship and design.
              </p>
              
              {/* Social Media Links */}
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

            {/* Quick Links */}
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

            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Contact Info</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>📧 info@luxera.com</p>
                <p>📞 +92 326 1300101</p>
                <p>📍 Karachi, Pakistan</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
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

export default Homepage

