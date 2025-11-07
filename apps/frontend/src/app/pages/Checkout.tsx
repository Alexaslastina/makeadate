import { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../services/authApi';
import { clearFavorites, FavoriteItem } from '../services/favoritesService';
import { createOrder, OrderItem } from '../services/ordersService';
import styles from './Checkout.module.css';

export function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [reservationDates, setReservationDates] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Support both single item and multiple items
    const stateItem = location.state?.item;
    const stateItems = location.state?.items;
    
    if (stateItem) {
      setItems([stateItem]);
      // Initialize reservation date for single item
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setReservationDates({ [stateItem.id]: tomorrow.toISOString().split('T')[0] });
    } else if (stateItems && stateItems.length > 0) {
      setItems(stateItems);
      // Initialize reservation dates for multiple items
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dates: { [key: string]: string } = {};
      stateItems.forEach((item: FavoriteItem) => {
        dates[item.id] = tomorrow.toISOString().split('T')[0];
      });
      setReservationDates(dates);
    } else {
      navigate('/favorites');
    }
  }, [user, location, navigate]);

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return sum + price;
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (itemId: string, date: string) => {
    setReservationDates(prev => ({ ...prev, [itemId]: date }));
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.address || 
        !formData.city || !formData.zipCode || !formData.country ||
        !formData.cardNumber || !formData.cardName || 
        !formData.expiryDate || !formData.cvv) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.cardNumber.length < 16) {
      alert('Please enter a valid card number');
      return;
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      try {
        // Create order with reservation dates
        const itemsWithDates: OrderItem[] = items.map(item => ({
          ...item,
          reservationDate: reservationDates[item.id],
        }));

        const order = createOrder({
          userId: user!._id,
          items: itemsWithDates,
          totalAmount: calculateTotal() + calculateTax(),
          paymentDetails: {
            cardLastFour: formData.cardNumber.slice(-4),
            paymentDate: new Date().toISOString(),
          },
          billingInfo: {
            fullName: formData.fullName,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            zipCode: formData.zipCode,
            country: formData.country,
          },
        });

        console.log('Order created:', order);
        
        setLoading(false);
        setSuccess(true);
        
        // Clear favorites only if buying from favorites
        if (location.state?.items) {
          clearFavorites();
        }
        
        setTimeout(() => {
          navigate('/profile');
        }, 3000);
      } catch (error) {
        setLoading(false);
        alert('Payment failed. Please try again.');
      }
    }, 2000);
  };

  const calculateTax = () => {
    return calculateTotal() * 0.18; // 18% tax
  };

  if (!user || items.length === 0) {
    return null;
  }

  if (success) {
    return (
      <div className={styles.checkoutMain}>
        <Container>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✓</div>
            <h1>Payment Successful!</h1>
            <p>Thank you for your purchase. Your dates have been booked successfully!</p>
            <p className={styles.redirectMessage}>Redirecting to your profile...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className={styles.checkoutMain}>
      <Container>
        <h1 className={styles.title}>Checkout</h1>

        <div className={styles.checkoutGrid}>
          <div className={styles.orderSummary}>
            <h2>Order Summary</h2>
            <div className={styles.itemsList}>
              {items.map((item) => (
                <div key={item.id} className={styles.orderItem}>
                  <img src={item.image} alt={item.title} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <h3>{item.title}</h3>
                    <p className={styles.itemDuration}>⏱️ {item.duration}</p>
                    <div className={styles.dateSelector}>
                      <label htmlFor={`date-${item.id}`}>📅 Reservation Date:</label>
                      <input
                        type="date"
                        id={`date-${item.id}`}
                        value={reservationDates[item.id] || ''}
                        onChange={(e) => handleDateChange(item.id, e.target.value)}
                        min={getMinDate()}
                        className={styles.dateInput}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.itemPrice}>{item.price}</div>
                </div>
              ))}
            </div>
            <div className={styles.totalSection}>
              <div className={styles.totalRow}>
                <span>Subtotal:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Tax (18%):</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className={styles.totalRowFinal}>
                <span>Total:</span>
                <span>${(calculateTotal() + calculateTax()).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className={styles.paymentForm}>
            <h2>Billing Information</h2>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Address *</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="123 Main Street"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>City *</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      placeholder="New York"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Zip Code *</Form.Label>
                    <Form.Control
                      type="text"
                      name="zipCode"
                      placeholder="10001"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Country *</Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      placeholder="USA"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h3 className="mt-4 mb-3">Payment Information</h3>

              <Form.Group className="mb-3">
                <Form.Label>Cardholder Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="cardName"
                  placeholder="John Doe"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Card Number *</Form.Label>
                <Form.Control
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  maxLength={19}
                  required
                />
              </Form.Group>

              <div className={styles.cardDetails}>
                <Form.Group className="mb-3">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    maxLength={5}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    maxLength={3}
                    required
                  />
                </Form.Group>
              </div>

              <Button
                type="submit"
                className={styles.payButton}
                disabled={loading}
              >
                {loading ? 'Processing...' : `Pay $${(calculateTotal() * 1.1).toFixed(2)}`}
              </Button>
            </Form>

            <div className={styles.secureInfo}>
              <span className={styles.lockIcon}>🔒</span>
              Your payment information is secure and encrypted
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

