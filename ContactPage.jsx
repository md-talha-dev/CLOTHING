import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Mail, Phone, MapPin, Send, MessageCircle, Instagram, Facebook, Linkedin, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import luxeraLogo from '../assets/luxera-logo.png'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // Simulate form submission
      console.log('Contact form submitted:', formData)
      setIsSubmitted(true)
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: '', email: '', message: '' })
      }, 3000)
    }
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
              <Link to="/contact" className="text-primary font-medium">
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

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="serif-font text-4xl lg:text-6xl font-bold luxury-text-gradient mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="product-card p-8">
              <div className="flex items-center mb-8">
                <MessageCircle className="w-8 h-8 text-primary mr-4" />
                <h2 className="serif-font text-2xl font-bold">Send us a Message</h2>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-500 mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                  </div>

                  <Button type="submit" className="luxury-button w-full text-lg py-6">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="product-card p-8">
                <h2 className="serif-font text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground">+92 326 1300101</p>
                      <p className="text-sm text-muted-foreground">Available 9 AM - 9 PM (PKT)</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">info@luxera.com</p>
                      <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-muted-foreground">
                        Luxury Plaza, Block 5<br />
                        Clifton, Karachi<br />
                        Sindh, Pakistan
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <div className="text-muted-foreground text-sm space-y-1">
                        <p>Monday - Friday: 9:00 AM - 9:00 PM</p>
                        <p>Saturday: 10:00 AM - 8:00 PM</p>
                        <p>Sunday: 12:00 PM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="product-card p-8">
                <h2 className="serif-font text-2xl font-bold mb-6">Follow Us</h2>
                <p className="text-muted-foreground mb-6">
                  Stay connected with us on social media for the latest updates, exclusive offers, and luxury lifestyle content.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="#" 
                    className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    <Instagram className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium">Instagram</p>
                      <p className="text-sm text-muted-foreground">@luxera_official</p>
                    </div>
                  </a>

                  <a 
                    href="#" 
                    className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    <Facebook className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium">Facebook</p>
                      <p className="text-sm text-muted-foreground">Luxera Pakistan</p>
                    </div>
                  </a>

                  <a 
                    href="#" 
                    className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    <MessageCircle className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">+92 326 1300101</p>
                    </div>
                  </a>

                  <a 
                    href="#" 
                    className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    <Linkedin className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-muted-foreground">Luxera</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <div className="product-card p-8">
              <h2 className="serif-font text-2xl font-bold mb-6 text-center">Visit Our Store</h2>
              <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Experience our luxury collection in person at our flagship store in Karachi. 
                Our expert staff will help you find the perfect timepiece or gadget.
              </p>
              
              {/* Map Placeholder */}
              <div className="relative h-96 bg-secondary/20 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Luxera Flagship Store</h3>
                    <p className="text-muted-foreground">
                      Luxury Plaza, Block 5, Clifton<br />
                      Karachi, Sindh, Pakistan
                    </p>
                    <Button className="luxury-button mt-4">
                      Get Directions
                    </Button>
                  </div>
                </div>
                
                {/* Map overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
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

export default ContactPage

