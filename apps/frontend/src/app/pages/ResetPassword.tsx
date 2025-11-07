import { useState, FormEvent, useEffect } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { resetPassword } from '../services/authApi';
import styles from './ResetPassword.module.css';

export function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      setError('Invalid reset link. Please request a new password reset.');
    } else {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm() || !token) {
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword(token, formData.password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <main className={`container-fluid py-4 ${styles.resetPasswordMain}`}>
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <div className={styles.resetPasswordCard}>
                <Alert variant="danger">
                  Invalid reset link. Please request a new password reset.
                </Alert>
                <div className="text-center mt-3">
                  <Link to="/forgot-password" className={styles.backLink}>
                    Request New Reset Link
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }

  return (
    <main className={`container-fluid py-4 ${styles.resetPasswordMain}`}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className={styles.resetPasswordCard}>
              <h2 className="text-center mb-4">Reset Password</h2>
              <hr />

              {success && (
                <Alert variant="success" className="mb-3">
                  Password has been reset successfully! Redirecting to login...
                </Alert>
              )}

              {error && (
                <Alert variant="danger" dismissible onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}

              {!success && (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>New Password *</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter new password (min. 6 characters)"
                      required
                      disabled={isSubmitting}
                      minLength={6}
                    />
                    <Form.Text className="text-muted">
                      Password must be at least 6 characters long
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm New Password *</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      required
                      disabled={isSubmitting}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className={`w-100 ${styles.submitButton}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Resetting...' : 'Reset Password'}
                  </Button>
                </Form>
              )}

              <div className="text-center mt-3">
                <Link to="/login" className={styles.backLink}>
                  Back to Sign In
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

