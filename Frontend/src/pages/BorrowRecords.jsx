import { useState } from "react";

const RECORDS = [
  { _id:"1", member:"Rahul Sharma",  book:"1984",                date:"Apr 10, 2026", due:"Apr 24, 2026", returned:null,           status:"active"   },
  { _id:"2", member:"Priya Singh",   book:"Harry Potter",        date:"Apr 02, 2026", due:"Apr 16, 2026", returned:null,           status:"overdue"  },
  { _id:"3", member:"Amit Kumar",    book:"The Alchemist",       date:"Mar 28, 2026", due:"Apr 11, 2026", returned:"Apr 10, 2026", status:"returned" },
  { _id:"4", member:"Sneha Patel",   book:"To Kill a Mockingbird",date:"Apr 12, 2026",due:"Apr 26, 2026", returned:null,           status:"active"   },
  { _id:"5", member:"Rohit Verma",   book:"Sapiens",             date:"Mar 20, 2026", due:"Apr 03, 2026", returned:null,           status:"overdue"  },
  { _id:"6", member:"Kavya Reddy",   book:"Atomic Habits",       date:"Apr 08, 2026", due:"Apr 22, 2026", returned:null,           status:"active"   },
  { _id:"7", member:"Dev Malhotra",  book:"The Hobbit",          date:"Mar 15, 2026", due:"Mar 29, 2026", returned:"Mar 27, 2026", status:"returned" },
  { _id:"8", member:"Rahul Sharma",  book:"The Great Gatsby",    date:"Apr 01, 2026", due:"Apr 15, 2026", returned:"Apr 13, 2026", status:"returned" },
];

export default function BorrowRecords() {
  const [records, setRecords] = useState(RECORDS);
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("all");

  const filtered = records.filter(r => {
    const s = search.toLowerCase();
    const matchS = r.member.toLowerCase().includes(s) || r.book.toLowerCase().includes(s);
    const matchF = filter==="all" || r.status===filter;
    return matchS && matchF;
  });

  const markReturned = (id) => {
    setRecords(records.map(r => r._id===id ? {...r, status:"returned", returned:"Apr 14, 2026"} : r));
  };

  const stats = {
    total:    records.length,
    active:   records.filter(r=>r.status==="active").length,
    overdue:  records.filter(r=>r.status==="overdue").length,
    returned: records.filter(r=>r.status==="returned").length,
  };

  const statusStyle = {
    active:   { bg:"rgba(16,185,129,.12)",  color:"#10b981",  border:"rgba(16,185,129,.2)"  },
    overdue:  { bg:"rgba(239,68,68,.1)",    color:"#f87171",  border:"rgba(239,68,68,.15)"  },
    returned: { bg:"rgba(148,163,184,.1)",  color:"#94a3b8",  border:"rgba(148,163,184,.15)"},
  };

  return (
    <>
      <style>{`
        .br-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px;}
        .br-stat{background:#131f35;border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:16px 20px;}
        .br-stat-n{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;}
        .br-stat-l{font-size:12px;color:rgba(255,255,255,.38);margin-top:3px;}
        .br-top{display:flex;align-items:center;gap:12px;margin-bottom:18px;flex-wrap:wrap;}
        .br-search{flex:1;min-width:200px;padding:10px 16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;font-size:14px;color:#e2e8f0;font-family:'Outfit',sans-serif;outline:none;}
        .br-search::placeholder{color:rgba(255,255,255,.22);}
        .br-search:focus{border-color:rgba(16,185,129,.4);}
        .br-filters{display:flex;gap:8px;}
        .br-fil{padding:7px 14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:100px;font-size:12px;color:rgba(255,255,255,.45);cursor:pointer;font-family:'Outfit',sans-serif;transition:all .2s;}
        .br-fil:hover{border-color:rgba(16,185,129,.3);}
        .br-fil.act{background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.3);color:#10b981;font-weight:500;}

        .br-table-wrap{background:#131f35;border:1px solid rgba(255,255,255,.07);border-radius:14px;overflow:hidden;}
        .br-table{width:100%;border-collapse:collapse;}
        .br-table th{padding:12px 16px;text-align:left;font-size:11px;font-weight:500;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid rgba(255,255,255,.05);background:rgba(255,255,255,.02);}
        .br-table td{padding:13px 16px;font-size:13px;color:rgba(255,255,255,.68);border-bottom:1px solid rgba(255,255,255,.04);}
        .br-table tr:last-child td{border-bottom:none;}
        .br-table tr:hover td{background:rgba(255,255,255,.02);}
        .br-av{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#10b981,#059669);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0;}
        .br-mrow{display:flex;align-items:center;gap:10px;}
        .br-ret-btn{padding:5px 12px;background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.2);border-radius:8px;color:#10b981;font-size:11px;font-weight:500;cursor:pointer;font-family:'Outfit',sans-serif;transition:all .2s;white-space:nowrap;}
        .br-ret-btn:hover{background:rgba(16,185,129,.2);}
        .br-done{font-size:12px;color:rgba(255,255,255,.3);}
      `}</style>

      {/* STATS */}
      <div className="br-stats">
        <div className="br-stat"><div className="br-stat-n" style={{color:"#e2e8f0"}}>{stats.total}</div><div className="br-stat-l">Total Records</div></div>
        <div className="br-stat"><div className="br-stat-n" style={{color:"#10b981"}}>{stats.active}</div><div className="br-stat-l">Active Borrows</div></div>
        <div className="br-stat"><div className="br-stat-n" style={{color:"#f87171"}}>{stats.overdue}</div><div className="br-stat-l">Overdue</div></div>
        <div className="br-stat"><div className="br-stat-n" style={{color:"#94a3b8"}}>{stats.returned}</div><div className="br-stat-l">Returned</div></div>
      </div>

      {/* TOOLBAR */}
      <div className="br-top">
        <input className="br-search" placeholder="🔍  Search member or book..." value={search} onChange={e=>setSearch(e.target.value)}/>
        <div className="br-filters">
          {["all","active","overdue","returned"].map(f=>(
            <button key={f} className={`br-fil ${filter===f?"act":""}`} onClick={()=>setFilter(f)}>
              {f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="br-table-wrap">
        <table className="br-table">
          <thead><tr><th>Member</th><th>Book</th><th>Issued</th><th>Due Date</th><th>Returned</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {filtered.map(r => {
              const s = statusStyle[r.status];
              return (
                <tr key={r._id}>
                  <td>
                    <div className="br-mrow">
                      <div className="br-av">{r.member[0]}</div>
                      <span style={{fontWeight:500,color:"#e2e8f0"}}>{r.member}</span>
                    </div>
                  </td>
                  <td style={{color:"rgba(255,255,255,.75)"}}>{r.book}</td>
                  <td style={{color:"rgba(255,255,255,.42)",fontSize:12}}>{r.date}</td>
                  <td style={{color:r.status==="overdue"?"#f87171":"rgba(255,255,255,.42)",fontSize:12}}>{r.due}</td>
                  <td style={{color:"rgba(255,255,255,.38)",fontSize:12}}>{r.returned || "—"}</td>
                  <td>
                    <span style={{padding:"3px 10px",borderRadius:99,fontSize:11,fontWeight:500,background:s.bg,color:s.color,border:`1px solid ${s.border}`}}>
                      {r.status.charAt(0).toUpperCase()+r.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    {r.status !== "returned"
                      ? <button className="br-ret-btn" onClick={()=>markReturned(r._id)}>✓ Mark Returned</button>
                      : <span className="br-done">✓ Done</span>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}