export default function Reports() {
  const monthData = [
    {m:"Jan",issued:42,returned:38},{m:"Feb",issued:56,returned:51},
    {m:"Mar",issued:48,returned:45},{m:"Apr",issued:63,returned:40},
  ];
  const topBooks = [
    {title:"Atomic Habits",      borrows:28},
    {title:"Sapiens",            borrows:24},
    {title:"Harry Potter",       borrows:21},
    {title:"The Alchemist",      borrows:19},
    {title:"1984",               borrows:16},
  ];
  const maxB = Math.max(...topBooks.map(b=>b.borrows));
  const maxM = Math.max(...monthData.map(m=>m.issued));

  return (
    <>
      <style>{`
        .rp-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}
        .rp-card{background:#131f35;border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:22px;}
        .rp-card-title{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:#fff;margin-bottom:20px;}
        .rp-stat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;}
        .rp-sbox{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:14px;}
        .rp-snum{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;}
        .rp-slbl{font-size:11px;color:rgba(255,255,255,.35);margin-top:3px;text-transform:uppercase;letter-spacing:.08em;}

        .bar-chart{display:flex;flex-direction:column;gap:10px;}
        .bar-row{display:flex;align-items:center;gap:12px;}
        .bar-label{font-size:12px;color:rgba(255,255,255,.45);width:48px;flex-shrink:0;text-align:right;}
        .bar-wrap{flex:1;height:24px;background:rgba(255,255,255,.04);border-radius:6px;overflow:hidden;position:relative;}
        .bar-fill{height:100%;border-radius:6px;position:relative;transition:width .5s ease;}
        .bar-fill2{height:100%;border-radius:6px;position:absolute;top:0;left:0;opacity:.4;}
        .bar-val{font-size:11px;color:rgba(255,255,255,.4);width:24px;flex-shrink:0;}

        .top-list{display:flex;flex-direction:column;gap:12px;}
        .top-row{display:flex;align-items:center;gap:12px;}
        .top-rank{width:24px;height:24px;border-radius:50%;background:rgba(16,185,129,.12);border:1px solid rgba(16,185,129,.2);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#10b981;flex-shrink:0;}
        .top-title{flex:1;font-size:13px;color:rgba(255,255,255,.72);}
        .top-bar-wrap{width:120px;height:8px;background:rgba(255,255,255,.05);border-radius:99px;overflow:hidden;}
        .top-bar-fill{height:100%;background:linear-gradient(90deg,#10b981,#059669);border-radius:99px;}
        .top-count{font-size:12px;color:#10b981;font-weight:600;width:28px;text-align:right;}

        .rp-full{grid-column:1/-1;}
        .activity-list{display:flex;flex-direction:column;gap:1px;}
        .act-row{display:flex;align-items:center;gap:14px;padding:11px 0;border-bottom:1px solid rgba(255,255,255,.04);}
        .act-row:last-child{border-bottom:none;}
        .act-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
        .act-text{flex:1;font-size:13px;color:rgba(255,255,255,.65);}
        .act-time{font-size:11px;color:rgba(255,255,255,.28);}
      `}</style>

      <div className="rp-grid">

        {/* SUMMARY */}
        <div className="rp-card">
          <div className="rp-card-title">📊 Summary</div>
          <div className="rp-stat-grid">
            <div className="rp-sbox"><div className="rp-snum" style={{color:"#10b981"}}>1,248</div><div className="rp-slbl">Total Books</div></div>
            <div className="rp-sbox"><div className="rp-snum" style={{color:"#6366f1"}}>342</div><div className="rp-slbl">Members</div></div>
            <div className="rp-sbox"><div className="rp-snum" style={{color:"#f59e0b"}}>89</div><div className="rp-slbl">Active Borrows</div></div>
            <div className="rp-sbox"><div className="rp-snum" style={{color:"#ef4444"}}>14</div><div className="rp-slbl">Overdue</div></div>
          </div>
        </div>

        {/* TOP BOOKS */}
        <div className="rp-card">
          <div className="rp-card-title">🏆 Most Borrowed Books</div>
          <div className="top-list">
            {topBooks.map((b,i)=>(
              <div key={i} className="top-row">
                <div className="top-rank">{i+1}</div>
                <div className="top-title">{b.title}</div>
                <div className="top-bar-wrap"><div className="top-bar-fill" style={{width:`${(b.borrows/maxB)*100}%`}}/></div>
                <div className="top-count">{b.borrows}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MONTHLY CHART */}
        <div className="rp-card">
          <div className="rp-card-title">📅 Monthly Activity</div>
          <div style={{display:"flex",gap:16,marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"rgba(255,255,255,.45)"}}><div style={{width:10,height:10,borderRadius:2,background:"#10b981"}}/>Issued</div>
            <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"rgba(255,255,255,.45)"}}><div style={{width:10,height:10,borderRadius:2,background:"rgba(16,185,129,.35)"}}/>Returned</div>
          </div>
          <div className="bar-chart">
            {monthData.map((m,i)=>(
              <div key={i} className="bar-row">
                <div className="bar-label">{m.m}</div>
                <div className="bar-wrap">
                  <div className="bar-fill" style={{width:`${(m.issued/maxM)*100}%`,background:"linear-gradient(90deg,#10b981,#059669)"}}/>
                  <div className="bar-fill2" style={{width:`${(m.returned/maxM)*100}%`,background:"#10b981"}}/>
                </div>
                <div className="bar-val">{m.issued}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="rp-card">
          <div className="rp-card-title">🕐 Recent Activity</div>
          <div className="activity-list">
            {[
              {text:"Rahul borrowed '1984'",          time:"2 hrs ago",  color:"#10b981"},
              {text:"Priya returned 'Harry Potter'",   time:"4 hrs ago",  color:"#6366f1"},
              {text:"New member: Dev Malhotra",        time:"6 hrs ago",  color:"#f59e0b"},
              {text:"Overdue alert: Rohit Verma",      time:"1 day ago",  color:"#ef4444"},
              {text:"Sneha borrowed 'Mockingbird'",    time:"1 day ago",  color:"#10b981"},
              {text:"Book added: 'Atomic Habits'",     time:"2 days ago", color:"#14b8a6"},
            ].map((a,i)=>(
              <div key={i} className="act-row">
                <div className="act-dot" style={{background:a.color}}/>
                <div className="act-text">{a.text}</div>
                <div className="act-time">{a.time}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}