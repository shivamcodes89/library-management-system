import { useState } from "react";

const Login = ({ onLogin }) => {
  const [form, setForm]       = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = () => {
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onLogin) onLogin(form);
    }, 1500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .login-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #0a0e1a;
        }

        /* ── LEFT PANEL ── */
        .left-panel {
          flex: 1.1;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding: 48px;
        }
        .bg-image {
          position: absolute; inset: 0;
          background: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80') center/cover no-repeat;
        }
        .bg-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top,
            rgba(5,8,20,0.95) 0%,
            rgba(5,8,20,0.6) 50%,
            rgba(5,8,20,0.2) 100%
          );
        }
        .left-content {
          position: relative;
          z-index: 2;
          max-width: 460px;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(212,175,55,0.15);
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 100px;
          padding: 6px 14px;
          margin-bottom: 24px;
        }
        .badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #d4af37;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity:1; transform:scale(1); }
          50%       { opacity:0.5; transform:scale(1.3); }
        }
        .badge span {
          font-size: 12px; color: #d4af37;
          font-weight: 500; letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .left-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 700; color: #ffffff;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        .left-heading .gold { color: #d4af37; }
        .left-sub {
          font-size: 15px;
          color: rgba(255,255,255,0.55);
          line-height: 1.7;
          margin-bottom: 36px;
          font-weight: 300;
        }
        .stats-row { display: flex; gap: 32px; }
        .stat-item  { text-align: left; }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 28px; font-weight: 700;
          color: #d4af37; line-height: 1;
        }
        .stat-label {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          font-weight: 400; margin-top: 4px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        /* ── RIGHT PANEL ── */
        .right-panel {
          width: 480px;
          background: #0d1221;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
          border-left: 1px solid rgba(255,255,255,0.05);
          position: relative;
        }
        .right-panel::before {
          content: '';
          position: absolute;
          top: -200px; right: -200px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .form-box { width: 100%; max-width: 360px; }
        .form-logo {
          display: flex; align-items: center;
          gap: 12px; margin-bottom: 40px;
        }
        .logo-icon {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, #d4af37, #f0c040);
          border-radius: 12px;
          display: flex; align-items: center;
          justify-content: center; font-size: 20px;
          box-shadow: 0 8px 24px rgba(212,175,55,0.3);
        }
        .logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 18px; font-weight: 600; color: #fff; line-height: 1;
        }
        .logo-sub {
          font-size: 11px; color: rgba(255,255,255,0.35);
          font-weight: 400; letter-spacing: 0.1em;
          text-transform: uppercase; margin-top: 3px;
        }
        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px; font-weight: 700;
          color: #fff; margin-bottom: 6px;
        }
        .form-subtitle {
          font-size: 14px; color: rgba(255,255,255,0.4);
          font-weight: 300; margin-bottom: 36px;
        }
        .input-group { margin-bottom: 20px; }
        .input-label {
          display: block; font-size: 12px;
          font-weight: 500; color: rgba(255,255,255,0.5);
          text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;
        }
        .input-wrap { position: relative; }
        .input-icon {
          position: absolute; left: 14px;
          top: 50%; transform: translateY(-50%);
          font-size: 16px; color: rgba(255,255,255,0.25);
          pointer-events: none;
        }
        .form-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 14px 14px 14px 44px;
          font-size: 14px; color: #fff;
          font-family: 'DM Sans', sans-serif;
          outline: none; transition: all 0.2s ease;
        }
        .form-input::placeholder { color: rgba(255,255,255,0.2); }
        .form-input:focus {
          border-color: rgba(212,175,55,0.5);
          background: rgba(212,175,55,0.04);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.08);
        }
        .pass-toggle {
          position: absolute; right: 14px;
          top: 50%; transform: translateY(-50%);
          background: none; border: none;
          color: rgba(255,255,255,0.3);
          cursor: pointer; font-size: 16px;
          padding: 4px; transition: color 0.2s;
        }
        .pass-toggle:hover { color: rgba(255,255,255,0.7); }
        .forgot-link {
          display: block; text-align: right;
          font-size: 12px; color: #d4af37;
          margin-top: 8px; cursor: pointer;
          opacity: 0.8; transition: opacity 0.2s;
          text-decoration: none;
        }
        .forgot-link:hover { opacity: 1; }
        .error-msg {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 10px;
          padding: 10px 14px; font-size: 13px;
          color: #f87171; margin-bottom: 16px;
          display: flex; align-items: center; gap: 8px;
        }
        .login-btn {
          width: 100%; padding: 15px;
          background: linear-gradient(135deg, #d4af37, #f0c040);
          border: none; border-radius: 12px;
          font-size: 15px; font-weight: 600;
          color: #0a0e1a; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.25s ease; margin-top: 8px;
          letter-spacing: 0.02em;
          box-shadow: 0 8px 24px rgba(212,175,55,0.25);
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(212,175,55,0.35);
        }
        .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .spinner {
          display: inline-block;
          width: 16px; height: 16px;
          border: 2px solid rgba(10,14,26,0.3);
          border-top-color: #0a0e1a;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle; margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .divider {
          display: flex; align-items: center;
          gap: 12px; margin: 24px 0;
          color: rgba(255,255,255,0.25); font-size: 12px;
        }
        .divider::before, .divider::after {
          content: ''; flex: 1; height: 1px;
          background: rgba(255,255,255,0.08);
        }
        .role-hint {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          padding: 12px 16px;
          display: flex; gap: 12px;
        }
        .role-item { flex: 1; text-align: center; }
        .role-item-label {
          font-size: 10px; color: rgba(255,255,255,0.3);
          text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 3px;
        }
        .role-item-value {
          font-size: 12px; color: rgba(255,255,255,0.6); font-weight: 500;
        }
        .role-divider { width: 1px; background: rgba(255,255,255,0.08); }

        @media (max-width: 768px) {
          .left-panel  { display: none; }
          .right-panel { width: 100%; }
        }
      `}</style>

      <div className="login-root">

        {/* ── LEFT ── */}
        <div className="left-panel">
          <div className="bg-image" />
          <div className="bg-overlay" />
          <div className="left-content">
            <div className="badge">
              <div className="badge-dot" />
              <span>Library Management System</span>
            </div>
            <h1 className="left-heading">
              Your Gateway to <br />
              <span className="gold">Knowledge & Learning</span>
            </h1>
            <p className="left-sub">
              Manage books, members, and borrowing records seamlessly.
              A complete digital solution for modern libraries.
            </p>
            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-num">12K+</div>
                <div className="stat-label">Books</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">3.4K</div>
                <div className="stat-label">Members</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">98%</div>
                <div className="stat-label">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="right-panel">
          <div className="form-box">

            <div className="form-logo">
              <div className="logo-icon">📚</div>
              <div>
                <div className="logo-text">LibraryPro</div>
                <div className="logo-sub">Management System</div>
              </div>
            </div>

            <h2 className="form-title">Welcome back</h2>
            <p className="form-subtitle">Sign in to your account to continue</p>

            {error && (
              <div className="error-msg"><span>⚠️</span> {error}</div>
            )}

            <div className="input-group">
              <label className="input-label">Email Address</label>
              <div className="input-wrap">
                <span className="input-icon">✉️</span>
                <input
                  className="form-input"
                  type="email" name="email"
                  placeholder="admin@library.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  className="form-input"
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                />
                <button className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
              <span className="forgot-link">Forgot password?</span>
            </div>

            <button className="login-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? <><span className="spinner" />Signing in...</> : "Sign In →"}
            </button>

            <div className="divider">Demo Credentials</div>

            <div className="role-hint">
              <div className="role-item">
                <div className="role-item-label">Admin</div>
                <div className="role-item-value">admin@library.com</div>
              </div>
              <div className="role-divider" />
              <div className="role-item">
                <div className="role-item-label">Member</div>
                <div className="role-item-value">user@library.com</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default Login;