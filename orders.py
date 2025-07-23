from flask import Blueprint, request, jsonify
from datetime import datetime
import urllib.parse
import json

orders_bp = Blueprint('orders', __name__)

# In-memory storage for orders (in production, use a proper database)
orders_storage = []

@orders_bp.route('/orders', methods=['POST'])
def create_order():
    """Create a new order and prepare WhatsApp message"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['product', 'quantity', 'customerDetails']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Extract order data
        product = data['product']
        quantity = data['quantity']
        customer_details = data['customerDetails']
        selected_size = data.get('selectedSize', '')
        selected_color = data.get('selectedColor', '')
        
        # Validate customer details
        customer_required_fields = ['fullName', 'mobileNumber', 'email', 'address', 'city', 'province']
        for field in customer_required_fields:
            if field not in customer_details or not customer_details[field]:
                return jsonify({'error': f'Missing required customer field: {field}'}), 400
        
        # Calculate totals
        subtotal = product['price'] * quantity
        shipping = 0  # Free shipping
        total = subtotal + shipping
        
        # Create order object
        order = {
            'id': len(orders_storage) + 1,
            'product': product,
            'quantity': quantity,
            'selectedSize': selected_size,
            'selectedColor': selected_color,
            'customerDetails': customer_details,
            'subtotal': subtotal,
            'shipping': shipping,
            'total': total,
            'status': 'pending',
            'createdAt': datetime.now().isoformat(),
            'whatsappSent': False
        }
        
        # Store order
        orders_storage.append(order)
        
        # Generate WhatsApp message
        whatsapp_message = generate_whatsapp_message(order)
        whatsapp_url = generate_whatsapp_url(whatsapp_message)
        
        return jsonify({
            'success': True,
            'order': order,
            'whatsappUrl': whatsapp_url,
            'message': 'Order created successfully'
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    """Get order by ID"""
    try:
        order = next((o for o in orders_storage if o['id'] == order_id), None)
        if not order:
            return jsonify({'error': 'Order not found'}), 404
        
        return jsonify({'order': order}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/orders', methods=['GET'])
def get_orders():
    """Get all orders"""
    try:
        return jsonify({'orders': orders_storage}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/orders/<int:order_id>/whatsapp-sent', methods=['POST'])
def mark_whatsapp_sent(order_id):
    """Mark order as WhatsApp message sent"""
    try:
        order = next((o for o in orders_storage if o['id'] == order_id), None)
        if not order:
            return jsonify({'error': 'Order not found'}), 404
        
        order['whatsappSent'] = True
        order['whatsappSentAt'] = datetime.now().isoformat()
        
        return jsonify({
            'success': True,
            'message': 'Order marked as WhatsApp sent'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def generate_whatsapp_message(order):
    """Generate formatted WhatsApp message for order"""
    customer = order['customerDetails']
    product = order['product']
    
    message = f"""🌟 *New Order from Luxera Website!* 🌟

*Customer Name:* {customer['fullName']}
*Mobile Number:* {customer['mobileNumber']}
*WhatsApp Number:* {customer.get('whatsappNumber', 'Not provided')}
*Email:* {customer['email']}
*Address:* {customer['address']}, {customer['city']}, {customer['province']}

*--- Order Summary ---*
*Product:* {product['name']}
*Quantity:* {order['quantity']}"""

    if order['selectedSize']:
        message += f"\n*Size:* {order['selectedSize']}"
    
    if order['selectedColor']:
        message += f"\n*Color:* {order['selectedColor']}"
    
    message += f"""

*Total Bill:* Rs. {order['total']:,}

-----------------------------------
This order has been confirmed by the customer.

*Ordered from:* https://luxera.netlify.app"""
    
    return message

def generate_whatsapp_url(message):
    """Generate WhatsApp URL with encoded message"""
    phone_number = "923261300101"
    encoded_message = urllib.parse.quote(message)
    
    whatsapp_url = f"https://api.whatsapp.com/send/?phone={phone_number}&text={encoded_message}&type=phone_number&app_absent=0"
    
    return whatsapp_url

@orders_bp.route('/contact', methods=['POST'])
def submit_contact_form():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Create contact submission object
        contact_submission = {
            'id': len(orders_storage) + 1000,  # Different ID range for contacts
            'name': data['name'],
            'email': data['email'],
            'message': data['message'],
            'submittedAt': datetime.now().isoformat(),
            'type': 'contact_form'
        }
        
        # In a real application, you would save this to a database
        # and possibly send an email notification
        
        return jsonify({
            'success': True,
            'message': 'Contact form submitted successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

