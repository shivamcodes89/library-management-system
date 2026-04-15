import { useState } from "react";

const Register = ({ onRegister, onGoLogin }) => {
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "", role: "member"
  });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onRegister) onRegister(form);
    }, 1500);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        .reg-root {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #0a0e1a;
        }

        /* LEFT */
        .reg-left {
          flex: 1.1; position: relative;
          overflow: hidden; display: flex;
          align-items: flex-end; padding: 48px;
        }
        .reg-bg {
          position: absolute; inset: 0;
          background: url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80') center/cover no-repeat;
        }
        .reg-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top,
            rgba(5,8,20,0.96) 0%,
            rgba(5,8,20,0.65) 50%,
            rgba(5,8,20,0.25) 100%
          );
        }
        .reg-left-content { position: relative; z-index: 2; max-width: 440px; }

        .reg-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(212,175,55,0.15);
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 100px; padding: 6px 14px; margin-bottom: 24px;
        }
        .reg-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #d4af37; animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.5; transform:scale(1.3); }
        }
        .reg-badge span {
          font-size: 12px; color: #d4af37;
          font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
        }
        .reg-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px, 3.5vw, 48px);
          font-weight: 700; color: #fff;
          line-height: 1.15; margin-bottom: 16px; letter-spacing: -0.02em;
        }
        .reg-heading .gold { color: #d4af37; }
        .reg-sub {
          font-size: 15px; color: rgba(255,255,255,0.5);
          line-height: 1.7; margin-bottom: 36px; font-weight: 300;
        }
        .reg-steps { display: flex; flex-direction: column; gap: 16px; }
        .reg-step  { display: flex; align-items: flex-start; gap: 14px; }
        .step-num  {
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(212,175,55,0.15);
          border: 1px solid rgba(212,175,55,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: #d4af37; flex-shrink: 0;
        }
        .step-text { font-size: 14px; color: rgba(255,255,255,0.55); line-height: 1.5; padding-top: 4px; }

        /* RIGHT */
        .reg-right {
          width: 520px; background: #0d1221;
          display: flex; align-items: center; justify-content: center;
          padding: 40px; border-left: 1px solid rgba(255,255,255,0.05);
          position: relative; overflow-y: auto;
        }
        .reg-right::before {
          content: ''; position: absolute;
          top: -200px; right: -200px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .reg-form { width: 100%; max-width: 380px; padding: 20px 0; }

        .reg-logo {
          display: flex; align-items: center;
          gap: 12px; margin-bottom: 32px;
        }
        .reg-logo-icon {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, #d4af37, #f0c040);
          border-radius: 12px; font-size: 20px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 24px rgba(212,175,55,0.3);
        }
        .reg-logo-text { font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:#fff; }
        .reg-logo-sub  { font-size:11px; color:rgba(255,255,255,0.35); text-transform:uppercase; letter-spacing:0.1em; margin-top:3px; }

        .reg-title    { font-family:'Playfair Display',serif; font-size:26px; font-weight:700; color:#fff; margin-bottom:6px; }
        .reg-subtitle { font-size:14px; color:rgba(255,255,255,0.4); font-weight:300; margin-bottom:28px; }

        .input-group  { margin-bottom: 16px; }
        .input-label  {
          display: block; font-size: 12px; font-weight: 500;
          color: rgba(255,255,255,0.5); text-transform: uppercase;
          letter-spacing: 0.08em; margin-bottom: 8px;
        }
        .input-wrap   { position: relative; }
        .input-icon   {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          font-size: 15px; color: rgba(255,255,255,0.25); pointer-events: none;
        }
        .form-input {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08); border-radius: 12px;
          padding: 13px 13px 13px 42px; font-size: 14px; color: #fff;
          font-family: 'DM Sans', sans-serif; outline: none; transition: all 0.2s;
        }
        .form-input::placeholder { color: rgba(255,255,255,0.2); }
        .form-input:focus {
          border-color: rgba(212,175,55,0.5);
          background: rgba(212,175,55,0.04);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.08);
        }
        .pass-toggle {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          background: none; border: none; color: rgba(255,255,255,0.3);
          cursor: pointer; font-size: 15px; padding: 4px; transition: color 0.2s;
        }
        .pass-toggle:hover { color: rgba(255,255,255,0.7); }

        /* ROLE SELECT */
        .role-select {
          display: flex; gap: 10px; margin-top: 4px;
        }
        .role-option {
          flex: 1; padding: 11px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          gap: 8px; font-size: 13px; color: rgba(255,255,255,0.5);
          font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .role-option:hover { border-color: rgba(212,175,55,0.3); color: rgba(255,255,255,0.7); }
        .role-option.selected {
          background: rgba(212,175,55,0.1);
          border-color: rgba(212,175,55,0.4);
          color: #d4af37; font-weight: 500;
        }

        .error-msg {
          background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2);
          border-radius: 10px; padding: 10px 14px; font-size: 13px;
          color: #f87171; margin-bottom: 14px;
          display: flex; align-items: center; gap: 8px;
        }

        .reg-btn {
          width: 100%; padding: 14px;
          background: linear-gradient(135deg, #d4af37, #f0c040);
          border: none; border-radius: 12px;
          font-size: 15px; font-weight: 600; color: #0a0e1a;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.25s ease; margin-top: 6px;
          letter-spacing: 0.02em;
          box-shadow: 0 8px 24px rgba(212,175,55,0.25);
        }
        .reg-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(212,175,55,0.35);
        }
        .reg-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .spinner {
          display: inline-block; width: 15px; height: 15px;
          border: 2px solid rgba(10,14,26,0.3); border-top-color: #0a0e1a;
          border-radius: 50%; animation: spin 0.7s linear infinite;
          vertical-align: middle; margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .login-link {
          text-align: center; margin-top: 20px;
          font-size: 14px; color: rgba(255,255,255,0.4);
        }
        .login-link span {
          color: #d4af37; cursor: pointer; font-weight: 500; transition: opacity 0.2s;
        }
        .login-link span:hover { opacity: 0.7; }

        @media (max-width: 768px) {
          .reg-left  { display: none; }
          .reg-right { width: 100%; }
        }
      `}</style>

      <div className="reg-root">

        {/* LEFT */}
        <div className="reg-left">
          <div className="reg-bg" />
          <div className="reg-overlay" />
          <div className="reg-left-content">
            <div className="reg-badge">
              <div className="reg-badge-dot" />
              <span>Join LibraryPro Today</span>
            </div>
            <h1 className="reg-heading">
              Start Your <br />
              <span className="gold">Reading Journey</span>
            </h1>
            <p className="reg-sub">
              Create your account and get access to thousands of books,
              track your reading history, and manage borrowings easily.
            </p>
            <div className="reg-steps">
              <div className="reg-step">
                <div className="step-num">1</div>
                <div className="step-text">Create your account with email & password</div>
              </div>
              <div className="reg-step">
                <div className="step-num">2</div>
                <div className="step-text">Choose your role — Member or Admin</div>
              </div>
              <div className="reg-step">
                <div className="step-num">3</div>
                <div className="step-text">Browse books and start borrowing instantly</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="reg-right">
          <div className="reg-form">

            <div className="reg-logo">
              <div className="reg-logo-icon">📚</div>
              <div>
                <div className="reg-logo-text">LibraryPro</div>
                <div className="reg-logo-sub">Management System</div>
              </div>
            </div>

            <h2 className="reg-title">Create Account</h2>
            <p className="reg-subtitle">Fill in the details to get started</p>

            {error && (
              <div className="error-msg"><span>⚠️</span> {error}</div>
            )}

            {/* NAME */}
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <div className="input-wrap">
                <span className="input-icon">👤</span>
                <input
                  className="form-input" type="text"
                  name="name" placeholder="Rahul Sharma"
                  value={form.name} onChange={handleChange}
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="input-group">
              <label className="input-label">Email Address</label>
              <div className="input-wrap">
                <span className="input-icon">✉️</span>
                <input
                  className="form-input" type="email"
                  name="email" placeholder="rahul@gmail.com"
                  value={form.email} onChange={handleChange}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  className="form-input"
                  type={showPass ? "text" : "password"}
                  name="password" placeholder="Min. 6 characters"
                  value={form.password} onChange={handleChange}
                />
                <button className="pass-toggle" onClick={() => setShowPass(!showPass)}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="input-group">
              <label className="input-label">Confirm Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  className="form-input" type="password"
                  name="confirmPassword" placeholder="Repeat password"
                  value={form.confirmPassword} onChange={handleChange}
                />
              </div>
            </div>

            {/* ROLE */}
            <div className="input-group">
              <label className="input-label">Select Role</label>
              <div className="role-select">
                <button
                  className={`role-option ${form.role === "member" ? "selected" : ""}`}
                  onClick={() => setForm({ ...form, role: "member" })}
                >
                  👤 Member
                </button>
                <button
                  className={`role-option ${form.role === "admin" ? "selected" : ""}`}
                  onClick={() => setForm({ ...form, role: "admin" })}
                >
                  👑 Admin
                </button>
              </div>
            </div>

            <button className="reg-btn" onClick={handleSubmit} disabled={loading}>
              {loading
                ? <><span className="spinner" />Creating Account...</>
                : "Create Account →"
              }
            </button>

            <div className="login-link">
              Already have an account?{" "}
              <span onClick={onGoLogin}>Sign In here</span>
            </div>

          </div>
        </div>

      </div>
    </>
  );
};

export default Register;