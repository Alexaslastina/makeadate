import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authApi';
import { getAllUsers, getUserStats, updateUserRole, deleteUser, User, UserStats } from '../services/adminApi';
import { getOrders } from '../services/ordersService';
import styles from './Admin.module.css';

export function Admin() {
  const navigate = useNavigate();
  const [currentUser] = useState(getCurrentUser());
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<'customer' | 'admin'>('customer');

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/');
      return;
    }

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usersData, statsData] = await Promise.all([
        getAllUsers(),
        getUserStats(),
      ]);
      setUsers(usersData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load admin data:', error);
      alert('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditRole = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowEditModal(true);
  };

  const handleSaveRole = async () => {
    if (!selectedUser) return;

    try {
      await updateUserRole(selectedUser._id, newRole);
      alert('User role updated successfully!');
      setShowEditModal(false);
      loadData();
    } catch (error) {
      console.error('Failed to update role:', error);
      alert('Failed to update user role. Please try again.');
    }
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser._id);
      alert('User deleted successfully!');
      setShowDeleteModal(false);
      loadData();
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  const getTotalOrders = () => {
    let totalOrders = 0;
    users.forEach(u => {
      const userOrders = getOrders(u._id);
      totalOrders += userOrders.length;
    });
    return totalOrders;
  };

  const getTotalRevenue = () => {
    let totalRevenue = 0;
    users.forEach(u => {
      const userOrders = getOrders(u._id);
      userOrders.forEach(order => {
        totalRevenue += order.totalAmount;
      });
    });
    return totalRevenue;
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return null;
  }

  if (loading) {
    return (
      <div className={styles.adminMain}>
        <Container>
          <div className={styles.loading}>Loading admin panel...</div>
        </Container>
      </div>
    );
  }

  return (
    <main className={styles.adminMain}>
      <Container fluid>
        <div className={styles.adminHeader}>
          <h1>🛡️ Admin Dashboard</h1>
          <p>Welcome back, {currentUser.name || currentUser.email}</p>
        </div>

        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col md={3}>
            <Card className={styles.statCard}>
              <Card.Body>
                <div className={styles.statIcon}>👥</div>
                <div className={styles.statValue}>{stats?.totalUsers || 0}</div>
                <div className={styles.statLabel}>Total Users</div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className={styles.statCard}>
              <Card.Body>
                <div className={styles.statIcon}>🛒</div>
                <div className={styles.statValue}>{getTotalOrders()}</div>
                <div className={styles.statLabel}>Total Orders</div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className={styles.statCard}>
              <Card.Body>
                <div className={styles.statIcon}>💰</div>
                <div className={styles.statValue}>${getTotalRevenue().toFixed(2)}</div>
                <div className={styles.statLabel}>Total Revenue</div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className={styles.statCard}>
              <Card.Body>
                <div className={styles.statIcon}>👨‍💼</div>
                <div className={styles.statValue}>{stats?.totalAdmins || 0}</div>
                <div className={styles.statLabel}>Total Admins</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Users Table */}
        <Row>
          <Col>
            <Card className={styles.tableCard}>
              <Card.Header>
                <h3>Users Management</h3>
              </Card.Header>
              <Card.Body>
                <Table responsive hover className={styles.usersTable}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Email</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Orders</th>
                      <th>Registered</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, index) => {
                      const userOrders = getOrders(u._id);
                      return (
                        <tr key={u._id}>
                          <td>{index + 1}</td>
                          <td>{u.email}</td>
                          <td>{u.name || '-'}</td>
                          <td>
                            <Badge bg={u.role === 'admin' ? 'danger' : 'primary'}>
                              {u.role}
                            </Badge>
                          </td>
                          <td>{userOrders.length}</td>
                          <td>
                            {new Date(u.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>
                          <td>
                            <Button
                              size="sm"
                              variant="outline-primary"
                              className="me-2"
                              onClick={() => handleEditRole(u)}
                            >
                              Edit Role
                            </Button>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={() => handleDeleteUser(u)}
                              disabled={u._id === currentUser._id}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Edit Role Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User Role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <>
                <p>
                  <strong>User:</strong> {selectedUser.email}
                </p>
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as 'customer' | 'admin')}
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveRole}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete User Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <>
                <p>Are you sure you want to delete this user?</p>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p className="text-danger">
                  <strong>Warning:</strong> This action cannot be undone!
                </p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete User
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </main>
  );
}
