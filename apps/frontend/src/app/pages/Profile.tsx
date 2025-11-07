import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Tab, Tabs } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { getCurrentUser, logout, User } from '../services/authApi';
import { getOrders, Order } from '../services/ordersService';
import styles from './Profile.module.css';

export function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    
    // Load orders
    const userOrders = getOrders(currentUser._id);
    setOrders(userOrders);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    window.dispatchEvent(new Event('userLoggedOut'));
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <main className={styles.profileMain}>
      <Container>
        <div className={styles.profileHeader}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {(user.name || user.email)[0].toUpperCase()}
            </div>
            <div>
              <h1>{user.name || user.email.split('@')[0]}</h1>
              <p className={styles.email}>{user.email}</p>
              <Badge bg={user.role === 'admin' ? 'danger' : 'primary'}>
                {user.role}
              </Badge>
            </div>
          </div>
          <div className={styles.actions}>
            {user.role === 'admin' && (
              <Link to="/admin" className={styles.adminButton}>
                Admin Panel
              </Link>
            )}
            <button onClick={handleLogout} className={styles.logoutButton}>
              Sign Out
            </button>
          </div>
        </div>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k || 'orders')}
          className="mb-4"
        >
          <Tab eventKey="orders" title={`My Orders (${orders.length})`}>
            <div className={styles.ordersSection}>
              {orders.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>📋</div>
                  <h2>No orders yet</h2>
                  <p>Start booking your dream dates!</p>
                  <Link to="/" className={styles.browseButton}>
                    Browse Dates
                  </Link>
                </div>
              ) : (
                <Row>
                  {orders.map((order) => (
                    <Col key={order.id} lg={12} className="mb-4">
                      <Card className={styles.orderCard}>
                        <Card.Body>
                          <div className={styles.orderHeader}>
                            <div>
                              <h3>Order #{order.id.slice(-8)}</h3>
                              <p className={styles.orderDate}>
                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                            </div>
                            <Badge bg="success" className={styles.statusBadge}>
                              {order.status}
                            </Badge>
                          </div>

                          <div className={styles.orderItems}>
                            {order.items.map((item, index) => (
                              <div key={index} className={styles.orderItem}>
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className={styles.itemImage}
                                />
                                <div className={styles.itemInfo}>
                                  <h4>{item.title}</h4>
                                  <p>⏱️ {item.duration}</p>
                                  {item.reservationDate && (
                                    <p className={styles.reservationDate}>
                                      📅 {new Date(item.reservationDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                      })}
                                    </p>
                                  )}
                                  <p className={styles.rating}>
                                    {'★'.repeat(Math.floor(item.rating))}
                                    {' '}
                                    ({item.rating})
                                  </p>
                                </div>
                                <div className={styles.itemPrice}>{item.price}</div>
                              </div>
                            ))}
                          </div>

                          <div className={styles.orderFooter}>
                            <div className={styles.orderTotal}>
                              <strong>Total Paid:</strong>
                              <span className={styles.totalAmount}>
                                ${order.totalAmount.toFixed(2)}
                              </span>
                            </div>
                            <div className={styles.orderActions}>
                              <button
                                className={styles.viewReceiptButton}
                                onClick={() => setActiveTab('receipt-' + order.id)}
                              >
                                View Receipt
                              </button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </Tab>

          {orders.map((order) => (
            <Tab
              key={`receipt-${order.id}`}
              eventKey={`receipt-${order.id}`}
              title={`Receipt #${order.id.slice(-8)}`}
            >
              <div className={styles.receiptContainer}>
                <Card className={styles.receiptCard}>
                  <Card.Body>
                    <div className={styles.receiptHeader}>
                      <h2>Payment Receipt</h2>
                      <p className={styles.receiptDate}>
                        {new Date(order.paymentDetails.paymentDate).toLocaleString()}
                      </p>
                    </div>

                    <div className={styles.receiptSection}>
                      <h3>Order Information</h3>
                      <div className={styles.receiptRow}>
                        <span>Order ID:</span>
                        <span>{order.id}</span>
                      </div>
                      <div className={styles.receiptRow}>
                        <span>Status:</span>
                        <Badge bg="success">{order.status}</Badge>
                      </div>
                      <div className={styles.receiptRow}>
                        <span>Date:</span>
                        <span>
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>

                    <div className={styles.receiptSection}>
                      <h3>Billing Information</h3>
                      <div className={styles.receiptRow}>
                        <span>Name:</span>
                        <span>{order.billingInfo.fullName}</span>
                      </div>
                      <div className={styles.receiptRow}>
                        <span>Email:</span>
                        <span>{order.billingInfo.email}</span>
                      </div>
                      <div className={styles.receiptRow}>
                        <span>Address:</span>
                        <span>
                          {order.billingInfo.address}, {order.billingInfo.city},{' '}
                          {order.billingInfo.zipCode}, {order.billingInfo.country}
                        </span>
                      </div>
                    </div>

                    <div className={styles.receiptSection}>
                      <h3>Payment Details</h3>
                      <div className={styles.receiptRow}>
                        <span>Payment Method:</span>
                        <span>Card ending in {order.paymentDetails.cardLastFour}</span>
                      </div>
                      <div className={styles.receiptRow}>
                        <span>Payment Date:</span>
                        <span>
                          {new Date(order.paymentDetails.paymentDate).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className={styles.receiptSection}>
                      <h3>Items Purchased</h3>
                      {order.items.map((item, index) => (
                        <div key={index} className={styles.receiptItem}>
                          <div className={styles.receiptItemInfo}>
                            <strong>{item.title}</strong>
                            <span className={styles.receiptItemDuration}>
                              Duration: {item.duration}
                            </span>
                            {item.reservationDate && (
                              <span className={styles.receiptItemDate}>
                                📅 Reservation: {new Date(item.reservationDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </span>
                            )}
                          </div>
                          <span>{item.price}</span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.receiptTotal}>
                      <div className={styles.receiptRow}>
                        <span>Subtotal:</span>
                        <span>
                          $
                          {(order.totalAmount / 1.18).toFixed(2)}
                        </span>
                      </div>
                      <div className={styles.receiptRow}>
                        <span>Tax (18%):</span>
                        <span>
                          $
                          {(order.totalAmount - order.totalAmount / 1.18).toFixed(2)}
                        </span>
                      </div>
                      <div className={styles.receiptRowFinal}>
                        <strong>Total:</strong>
                        <strong>${order.totalAmount.toFixed(2)}</strong>
                      </div>
                    </div>

                    <div className={styles.receiptFooter}>
                      <p>Thank you for your purchase!</p>
                      <p className={styles.receiptNote}>
                        A confirmation email has been sent to {order.billingInfo.email}
                      </p>
                      <button
                        className={styles.printButton}
                        onClick={() => window.print()}
                      >
                        🖨️ Print Receipt
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Tab>
          ))}
        </Tabs>
      </Container>
    </main>
  );
}
