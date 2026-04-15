import { useState } from "react";

/* ─────────────── SIDEBAR ─────────────── */
const Sidebar = ({ active, setActive, user, onLogout }) => {
  const nav = [
    { id: "dashboard", icon: "⊞",  label: "Dashboard"      },
    { id: "books",     icon: "📚", label: "Books"           },
    { id: "members",   icon: "👥", label: "Members"         },
    { id: "borrow",    icon: "🔄", label: "Borrow Records"  },
    { id: "reports",   icon: "📊", label: "Reports"         },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="s-logo-icon">📚</div>
        <div>
          <div className="s-logo-name">LibraryPro</div>
          <div className="s-logo-tag">Management</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {nav.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${active === item.id ? "nav-active" : ""}`}
            onClick={() => setActive(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {active === item.id && <span className="nav-indicator" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">{user?.name?.[0] || "A"}</div>
          <div className="user-info">
            <div className="user-name">{user?.name || "Admin User"}</div>
            <div className="user-role">Administrator</div>
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>⏻ Logout</button>
      </div>
    </aside>
  );
};

/* ─────────────── STAT CARD ─────────────── */
const StatCard = ({ icon, label, value, change, color }) => (
  <div className="stat-card" style={{ "--accent": color }}>
    <div className="stat-top">
      <div className="stat-icon-box">{icon}</div>
      <span className={`stat-change ${change >= 0 ? "up" : "down"}`}>
        {change >= 0 ? "↑" : "↓"} {Math.abs(change)}%
      </span>
    </div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
    <div className="stat-bar">
      <div className="stat-bar-fill" style={{ width: `${Math.min(value / 150, 1) * 100}%` }} />
    </div>
  </div>
);

/* ─────────────── DATA ─────────────── */
const books = [
  { title: "The Great Gatsby",       author: "F. Scott Fitzgerald", category: "Fiction",  status: "Available", cover: "https://covers.openlibrary.org/b/id/8739161-M.jpg"  },
  { title: "To Kill a Mockingbird",  author: "Harper Lee",           category: "Classic",  status: "Borrowed",  cover: "https://covers.openlibrary.org/b/id/8228691-M.jpg"  },
  { title: "1984",                   author: "George Orwell",        category: "Dystopia", status: "Available", cover: "https://covers.openlibrary.org/b/id/7222246-M.jpg"  },
  { title: "Harry Potter",           author: "J.K. Rowling",         category: "Fantasy",  status: "Borrowed",  cover: "https://covers.openlibrary.org/b/id/10110415-M.jpg" },
  { title: "The Alchemist",          author: "Paulo Coelho",         category: "Fiction",  status: "Available", cover: "https://covers.openlibrary.org/b/id/8479576-M.jpg"  },
];

const records = [
  { member: "Rahul Sharma", book: "1984",          date: "Apr 10", due: "Apr 24", status: "Active"   },
  { member: "Priya Singh",  book: "Harry Potter",  date: "Apr 08", due: "Apr 22", status: "Overdue"  },
  { member: "Amit Kumar",   book: "The Alchemist", date: "Apr 05", due: "Apr 19", status: "Returned" },
  { member: "Sneha Patel",  book: "Mockingbird",   date: "Apr 12", due: "Apr 26", status: "Active"   },
];

const members = [
  "Rahul Sharma", "Priya Singh", "Amit Kumar", "Sneha Patel", "Rohit Verma",
];

/* ─────────────── DASHBOARD PAGE ─────────────── */
const Dashboard = ({ user, onLogout }) => {
  const [active, setActive] = useState("dashboard");

  const pageTitle = {
    dashboard: "Dashboard",
    books:     "Book Catalog",
    members:   "Members",
    borrow:    "Borrow Records",
    reports:   "Reports",
  };

  return (
    <div className="dash-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'DM Sans',sans-serif; background:#080c18; color:#e8eaf6; }

        .dash-root { display:flex; min-height:100vh; background:#080c18; }

        /* ── SIDEBAR ── */
        .sidebar {
          width:240px; min-height:100vh;
          background:#0d1221;
          border-right:1px solid rgba(255,255,255,0.05);
          display:flex; flex-direction:column;
          padding:24px 0;
          position:sticky; top:0; height:100vh;
        }
        .sidebar-logo {
          display:flex; align-items:center; gap:12px;
          padding:0 20px 28px;
          border-bottom:1px solid rgba(255,255,255,0.05);
          margin-bottom:16px;
        }
        .s-logo-icon {
          width:40px; height:40px;
          background:linear-gradient(135deg,#d4af37,#f0c040);
          border-radius:10px; font-size:18px;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 6px 16px rgba(212,175,55,0.25); flex-shrink:0;
        }
        .s-logo-name { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; color:#fff; }
        .s-logo-tag  { font-size:10px; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:0.1em; }

        .sidebar-nav { flex:1; padding:0 12px; display:flex; flex-direction:column; gap:4px; }
        .nav-item {
          display:flex; align-items:center; gap:12px;
          padding:11px 12px; border-radius:10px;
          border:none; background:transparent;
          color:rgba(255,255,255,0.45);
          font-family:'DM Sans',sans-serif;
          font-size:14px; cursor:pointer;
          transition:all 0.2s ease;
          position:relative; text-align:left; width:100%;
        }
        .nav-item:hover { background:rgba(255,255,255,0.05); color:rgba(255,255,255,0.8); }
        .nav-active { background:rgba(212,175,55,0.1) !important; color:#d4af37 !important; font-weight:500; }
        .nav-icon { font-size:16px; width:20px; text-align:center; }
        .nav-indicator {
          position:absolute; right:0; top:50%; transform:translateY(-50%);
          width:3px; height:20px; background:#d4af37; border-radius:3px 0 0 3px;
        }

        .sidebar-footer { padding:16px 12px 0; border-top:1px solid rgba(255,255,255,0.05); margin-top:auto; }
        .user-card {
          display:flex; align-items:center; gap:10px;
          padding:12px; border-radius:10px;
          background:rgba(255,255,255,0.03); margin-bottom:8px;
        }
        .user-avatar {
          width:34px; height:34px; border-radius:50%;
          background:linear-gradient(135deg,#d4af37,#f0c040);
          display:flex; align-items:center; justify-content:center;
          font-size:14px; font-weight:700; color:#0a0e1a; flex-shrink:0;
        }
        .user-name { font-size:13px; font-weight:500; color:#fff; }
        .user-role { font-size:11px; color:rgba(255,255,255,0.35); }
        .logout-btn {
          width:100%; padding:9px;
          background:rgba(239,68,68,0.08);
          border:1px solid rgba(239,68,68,0.15);
          border-radius:8px; color:#f87171;
          font-size:13px; cursor:pointer;
          font-family:'DM Sans',sans-serif; transition:all 0.2s;
        }
        .logout-btn:hover { background:rgba(239,68,68,0.15); }

        /* ── MAIN ── */
        .dash-main { flex:1; display:flex; flex-direction:column; overflow:hidden; }

        .dash-header {
          display:flex; align-items:center; justify-content:space-between;
          padding:24px 32px;
          border-bottom:1px solid rgba(255,255,255,0.05);
          background:#080c18; position:sticky; top:0; z-index:10;
        }
        .dash-title { font-family:'Playfair Display',serif; font-size:24px; font-weight:700; color:#fff; }
        .dash-date  { font-size:13px; color:rgba(255,255,255,0.35); margin-top:2px; }

        .header-right { display:flex; align-items:center; gap:12px; }
        .header-search {
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:10px; padding:8px 16px;
          font-size:13px; color:rgba(255,255,255,0.35);
          font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s;
        }
        .header-search:hover { border-color:rgba(212,175,55,0.3); color:rgba(255,255,255,0.6); }
        .header-notif {
          position:relative; background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:10px; padding:8px 12px;
          font-size:16px; cursor:pointer;
        }
        .notif-dot {
          position:absolute; top:6px; right:6px;
          width:7px; height:7px;
          border-radius:50%; background:#ef4444;
        }
        .header-avatar {
          width:36px; height:36px; border-radius:50%;
          background:linear-gradient(135deg,#d4af37,#f0c040);
          display:flex; align-items:center; justify-content:center;
          font-size:14px; font-weight:700; color:#0a0e1a; cursor:pointer;
        }

        /* ── PAGE ── */
        .page-content { padding:28px 32px; overflow-y:auto; flex:1; }

        /* STATS */
        .stats-grid {
          display:grid; grid-template-columns:repeat(4,1fr);
          gap:16px; margin-bottom:24px;
        }
        .stat-card {
          background:#0d1221;
          border:1px solid rgba(255,255,255,0.06);
          border-radius:16px; padding:20px;
          position:relative; overflow:hidden;
          transition:transform 0.2s, border-color 0.2s;
        }
        .stat-card:hover { transform:translateY(-2px); }
        .stat-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; }
        .stat-icon-box {
          width:40px; height:40px; border-radius:10px;
          background:rgba(255,255,255,0.05);
          display:flex; align-items:center; justify-content:center; font-size:18px;
        }
        .stat-change { font-size:12px; font-weight:500; }
        .stat-change.up   { color:#4ade80; }
        .stat-change.down { color:#f87171; }
        .stat-value { font-family:'Playfair Display',serif; font-size:32px; font-weight:700; color:#fff; line-height:1; margin-bottom:4px; }
        .stat-label { font-size:13px; color:rgba(255,255,255,0.4); margin-bottom:16px; }
        .stat-bar { height:3px; background:rgba(255,255,255,0.06); border-radius:99px; }
        .stat-bar-fill { height:100%; background:var(--accent); border-radius:99px; }

        /* CONTENT GRID */
        .content-grid { display:grid; grid-template-columns:1.2fr 0.8fr; gap:20px; }

        /* CARD */
        .card {
          background:#0d1221;
          border:1px solid rgba(255,255,255,0.06);
          border-radius:16px; overflow:hidden;
        }
        .card-header {
          display:flex; justify-content:space-between; align-items:center;
          padding:18px 20px; border-bottom:1px solid rgba(255,255,255,0.05);
        }
        .card-title  { font-size:15px; font-weight:600; color:#fff; }
        .card-action { font-size:12px; color:#d4af37; background:none; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; }

        /* BOOKS LIST */
        .books-list { padding:8px 0; }
        .book-row {
          display:flex; align-items:center; gap:12px;
          padding:10px 20px; transition:background 0.15s;
        }
        .book-row:hover { background:rgba(255,255,255,0.02); }
        .book-thumb {
          width:36px; height:50px; border-radius:5px;
          object-fit:cover; flex-shrink:0;
          border:1px solid rgba(255,255,255,0.08);
        }
        .book-info { flex:1; min-width:0; }
        .book-title  { font-size:13px; font-weight:500; color:#e8eaf6; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .book-author { font-size:11px; color:rgba(255,255,255,0.35); margin-top:2px; }
        .book-cat    { font-size:11px; color:rgba(255,255,255,0.3); white-space:nowrap; padding-right:8px; }

        /* RECORDS LIST */
        .records-list { padding:8px 0; }
        .record-row {
          display:flex; align-items:center; gap:10px;
          padding:10px 16px; transition:background 0.15s;
        }
        .record-row:hover { background:rgba(255,255,255,0.02); }
        .rec-avatar {
          width:36px; height:36px; border-radius:50%;
          background:linear-gradient(135deg,#4f8ef7,#818cf8);
          display:flex; align-items:center; justify-content:center;
          font-size:14px; font-weight:700; color:#fff; flex-shrink:0;
        }
        .rec-info { flex:1; min-width:0; }
        .rec-name { font-size:13px; font-weight:500; color:#e8eaf6; }
        .rec-book { font-size:11px; color:rgba(255,255,255,0.35); margin-top:1px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
        .rec-dates { text-align:right; }
        .rec-date  { font-size:11px; color:rgba(255,255,255,0.4); }
        .rec-due   { font-size:10px; color:rgba(255,255,255,0.25); margin-top:2px; }

        /* STATUS BADGES */
        .status-badge { padding:3px 10px; border-radius:99px; font-size:11px; font-weight:500; white-space:nowrap; flex-shrink:0; }
        .badge-green  { background:rgba(74,222,128,0.12);  color:#4ade80; border:1px solid rgba(74,222,128,0.2);  }
        .badge-orange { background:rgba(249,115,22,0.12);  color:#fb923c; border:1px solid rgba(249,115,22,0.2);  }
        .badge-red    { background:rgba(248,113,113,0.12); color:#f87171; border:1px solid rgba(248,113,113,0.2); }
        .badge-gray   { background:rgba(255,255,255,0.06); color:rgba(255,255,255,0.4); border:1px solid rgba(255,255,255,0.1); }

        /* TOOLBAR */
        .page-toolbar { display:flex; gap:12px; margin-bottom:20px; }
        .search-input {
          flex:1; padding:10px 16px;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          border-radius:10px; font-size:14px; color:#e8eaf6;
          font-family:'DM Sans',sans-serif; outline:none;
        }
        .search-input::placeholder { color:rgba(255,255,255,0.25); }
        .search-input:focus { border-color:rgba(212,175,55,0.4); }
        .add-btn {
          padding:10px 20px;
          background:linear-gradient(135deg,#d4af37,#f0c040);
          border:none; border-radius:10px;
          font-size:14px; font-weight:600; color:#0a0e1a;
          cursor:pointer; font-family:'DM Sans',sans-serif;
          transition:all 0.2s; box-shadow:0 4px 12px rgba(212,175,55,0.25);
        }
        .add-btn:hover { transform:translateY(-1px); box-shadow:0 6px 16px rgba(212,175,55,0.35); }

        /* BOOKS GRID */
        .books-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:16px; }
        .book-card {
          background:#0d1221;
          border:1px solid rgba(255,255,255,0.06);
          border-radius:14px; overflow:hidden; transition:all 0.2s;
        }
        .book-card:hover { transform:translateY(-4px); border-color:rgba(212,175,55,0.2); }
        .book-card-img-wrap { position:relative; }
        .book-card-img { width:100%; height:180px; object-fit:cover; display:block; }
        .book-card-badge { position:absolute; top:8px; right:8px; }
        .book-card-body  { padding:12px; }
        .book-card-title  { font-size:13px; font-weight:600; color:#fff; margin-bottom:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .book-card-author { font-size:11px; color:rgba(255,255,255,0.4); margin-bottom:4px; }
        .book-card-cat    { font-size:10px; color:#d4af37; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:10px; }
        .book-card-btn {
          width:100%; padding:7px;
          background:rgba(212,175,55,0.1);
          border:1px solid rgba(212,175,55,0.2);
          border-radius:8px; color:#d4af37;
          font-size:12px; font-weight:500; cursor:pointer;
          font-family:'DM Sans',sans-serif; transition:all 0.2s;
        }
        .book-card-btn:hover { background:rgba(212,175,55,0.2); }

        /* MEMBERS TABLE */
        .members-table { width:100%; border-collapse:collapse; }
        .members-table th {
          padding:12px 16px; text-align:left;
          font-size:11px; font-weight:500;
          color:rgba(255,255,255,0.35);
          text-transform:uppercase; letter-spacing:0.08em;
          border-bottom:1px solid rgba(255,255,255,0.05);
        }
        .members-table td {
          padding:12px 16px; font-size:13px;
          color:rgba(255,255,255,0.75);
          border-bottom:1px solid rgba(255,255,255,0.03);
        }
        .members-table tr:hover td { background:rgba(255,255,255,0.02); }
        .td-muted { color:rgba(255,255,255,0.4) !important; }
        .num-badge {
          background:rgba(79,142,247,0.12); color:#4f8ef7;
          padding:2px 10px; border-radius:99px; font-size:12px; font-weight:600;
        }
        .tbl-btn { background:none; border:none; cursor:pointer; padding:4px 6px; border-radius:6px; font-size:14px; transition:background 0.15s; }
        .tbl-btn:hover { background:rgba(255,255,255,0.06); }

        /* COMING SOON */
        .coming-soon { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:60vh; text-align:center; gap:12px; }
        .cs-icon  { font-size:56px; }
        .cs-title { font-family:'Playfair Display',serif; font-size:24px; color:#fff; }
        .cs-sub   { font-size:14px; color:rgba(255,255,255,0.35); }

        /* MEMBER FLEX */
        .mem-flex { display:flex; align-items:center; gap:10px; }

        @media (max-width:1100px) {
          .stats-grid   { grid-template-columns:repeat(2,1fr); }
          .content-grid { grid-template-columns:1fr; }
        }
      `}</style>

      <Sidebar active={active} setActive={setActive} user={user} onLogout={onLogout} />

      <main className="dash-main">

        {/* HEADER */}
        <header className="dash-header">
          <div>
            <h1 className="dash-title">{pageTitle[active]}</h1>
            <p className="dash-date">Monday, 13 April 2026</p>
          </div>
          <div className="header-right">
            <button className="header-search">🔍 Search...</button>
            <button className="header-notif">🔔<span className="notif-dot" /></button>
            <div className="header-avatar">{user?.name?.[0] || "A"}</div>
          </div>
        </header>

        {/* ── DASHBOARD ── */}
        {active === "dashboard" && (
          <div className="page-content">
            <div className="stats-grid">
              <StatCard icon="📚" label="Total Books"    value={1248} change={12}  color="#d4af37" />
              <StatCard icon="👥" label="Active Members" value={342}  change={8}   color="#4f8ef7" />
              <StatCard icon="🔄" label="Books Borrowed" value={89}   change={-3}  color="#f97316" />
              <StatCard icon="⚠️" label="Overdue Books"  value={14}   change={-18} color="#ef4444" />
            </div>
            <div className="content-grid">
              {/* BOOKS */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Recent Books</h3>
                  <button className="card-action" onClick={() => setActive("books")}>View All →</button>
                </div>
                <div className="books-list">
                  {books.map((book, i) => (
                    <div key={i} className="book-row">
                      <img src={book.cover} alt={book.title} className="book-thumb"
                        onError={(e) => { e.target.src = "https://placehold.co/36x50/1a237e/d4af37?text=📚"; }}
                      />
                      <div className="book-info">
                        <div className="book-title">{book.title}</div>
                        <div className="book-author">{book.author}</div>
                      </div>
                      <span className="book-cat">{book.category}</span>
                      <span className={`status-badge ${book.status === "Available" ? "badge-green" : "badge-orange"}`}>
                        {book.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BORROW RECORDS */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Borrow Activity</h3>
                  <button className="card-action" onClick={() => setActive("borrow")}>View All →</button>
                </div>
                <div className="records-list">
                  {records.map((r, i) => (
                    <div key={i} className="record-row">
                      <div className="rec-avatar">{r.member[0]}</div>
                      <div className="rec-info">
                        <div className="rec-name">{r.member}</div>
                        <div className="rec-book">{r.book}</div>
                      </div>
                      <div className="rec-dates">
                        <div className="rec-date">📅 {r.date}</div>
                        <div className="rec-due">Due: {r.due}</div>
                      </div>
                      <span className={`status-badge ${
                        r.status === "Active" ? "badge-green" :
                        r.status === "Overdue" ? "badge-red" : "badge-gray"
                      }`}>{r.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── BOOKS PAGE ── */}
        {active === "books" && (
          <div className="page-content">
            <div className="page-toolbar">
              <input className="search-input" placeholder="🔍  Search books, authors..." />
              <button className="add-btn">+ Add Book</button>
            </div>
            <div className="books-grid">
              {[...books, ...books].map((book, i) => (
                <div key={i} className="book-card">
                  <div className="book-card-img-wrap">
                    <img src={book.cover} alt={book.title} className="book-card-img"
                      onError={(e) => { e.target.src = "https://placehold.co/160x180/0d1221/d4af37?text=📚"; }}
                    />
                    <span className={`book-card-badge status-badge ${book.status === "Available" ? "badge-green" : "badge-orange"}`}>
                      {book.status}
                    </span>
                  </div>
                  <div className="book-card-body">
                    <div className="book-card-title">{book.title}</div>
                    <div className="book-card-author">{book.author}</div>
                    <div className="book-card-cat">{book.category}</div>
                    <button className="book-card-btn">
                      {book.status === "Available" ? "Issue Book" : "Return Book"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MEMBERS PAGE ── */}
        {active === "members" && (
          <div className="page-content">
            <div className="page-toolbar">
              <input className="search-input" placeholder="🔍  Search members..." />
              <button className="add-btn">+ Add Member</button>
            </div>
            <div className="card">
              <table className="members-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Email</th>
                    <th>Joined</th>
                    <th>Books Borrowed</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((name, i) => (
                    <tr key={i}>
                      <td>
                        <div className="mem-flex">
                          <div className="rec-avatar" style={{ width:34, height:34, fontSize:13 }}>{name[0]}</div>
                          {name}
                        </div>
                      </td>
                      <td className="td-muted">{name.toLowerCase().replace(" ", ".")}@gmail.com</td>
                      <td className="td-muted">Jan 2024</td>
                      <td><span className="num-badge">{(i + 1) * 3}</span></td>
                      <td>
                        <span className={`status-badge ${i === 1 ? "badge-red" : "badge-green"}`}>
                          {i === 1 ? "Suspended" : "Active"}
                        </span>
                      </td>
                      <td>
                        <button className="tbl-btn">✏️</button>
                        <button className="tbl-btn">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── COMING SOON ── */}
        {(active === "borrow" || active === "reports") && (
          <div className="page-content coming-soon">
            <div className="cs-icon">🚧</div>
            <div className="cs-title">{active === "borrow" ? "Borrow Records" : "Reports"}</div>
            <div className="cs-sub">This section is under development</div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;