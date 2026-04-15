import { useState } from "react";

const SAMPLE = [
  { _id:"1", name:"Rahul Sharma",   email:"rahul@gmail.com",  phone:"9876543210", joined:"Jan 2024", borrowed:6,  status:"active" },
  { _id:"2", name:"Priya Singh",    email:"priya@gmail.com",  phone:"9812345678", joined:"Feb 2024", borrowed:4,  status:"active" },
  { _id:"3", name:"Amit Kumar",     email:"amit@gmail.com",   phone:"9899001122", joined:"Dec 2023", borrowed:9,  status:"suspended" },
  { _id:"4", name:"Sneha Patel",    email:"sneha@gmail.com",  phone:"9765432109", joined:"Mar 2024", borrowed:2,  status:"active" },
  { _id:"5", name:"Rohit Verma",    email:"rohit@gmail.com",  phone:"9711223344", joined:"Apr 2024", borrowed:7,  status:"active" },
  { _id:"6", name:"Kavya Reddy",    email:"kavya@gmail.com",  phone:"9655443322", joined:"Jan 2024", borrowed:11, status:"active" },
  { _id:"7", name:"Dev Malhotra",   email:"dev@gmail.com",    phone:"9501234567", joined:"Nov 2023", borrowed:3,  status:"suspended" },
];

const EMPTY = { name:"", email:"", phone:"", role:"member" };

export default function Members() {
  const [members, setMembers]   = useState(SAMPLE);
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId]     = useState(null);
  const [form, setForm]         = useState(EMPTY);

  const filtered = members.filter(m => {
    const s = search.toLowerCase();
    const matchS = m.name.toLowerCase().includes(s) || m.email.toLowerCase().includes(s);
    const matchF = filter==="all" || m.status===filter;
    return matchS && matchF;
  });

  const openAdd  = () => { setForm(EMPTY); setEditId(null); setShowModal(true); };
  const openEdit = (m) => { setForm({name:m.name,email:m.email,phone:m.phone,role:"member"}); setEditId(m._id); setShowModal(true); };
  const save = () => {
    if (!form.name||!form.email) return;
    if (editId) setMembers(members.map(m=>m._id===editId?{...m,...form}:m));
    else setMembers([...members,{...form,_id:Date.now().toString(),joined:"Apr 2024",borrowed:0,status:"active"}]);
    setShowModal(false);
  };
  const del    = (id) => setMembers(members.filter(m=>m._id!==id));
  const toggle = (id) => setMembers(members.map(m=>m._id===id?{...m,status:m.status==="active"?"suspended":"active"}:m));

  const avatarColor = (n) => {
    const colors = ["#10b981","#f59e0b","#6366f1","#ec4899","#3b82f6","#14b8a6","#f97316"];
    return colors[n.charCodeAt(0)%colors.length];
  };

  return (
    <>
      <style>{`
        .mb-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;gap:12px;flex-wrap:wrap;}
        .mb-search{flex:1;min-width:200px;padding:10px 16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;font-size:14px;color:#e2e8f0;font-family:'Outfit',sans-serif;outline:none;}
        .mb-search::placeholder{color:rgba(255,255,255,.22);}
        .mb-search:focus{border-color:rgba(16,185,129,.4);}
        .mb-filters{display:flex;gap:8px;}
        .mb-fil{padding:7px 16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:100px;font-size:12px;color:rgba(255,255,255,.45);cursor:pointer;font-family:'Outfit',sans-serif;transition:all .2s;}
        .mb-fil:hover{border-color:rgba(16,185,129,.3);}
        .mb-fil.act{background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.3);color:#10b981;font-weight:500;}
        .mb-add{padding:10px 20px;background:linear-gradient(135deg,#10b981,#059669);border:none;border-radius:10px;font-size:14px;font-weight:600;color:#fff;cursor:pointer;font-family:'Outfit',sans-serif;transition:all .2s;box-shadow:0 4px 14px rgba(16,185,129,.25);white-space:nowrap;}
        .mb-add:hover{transform:translateY(-1px);}

        .mb-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:22px;}
        .mb-stat{background:#131f35;border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:16px 20px;}
        .mb-stat-n{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;color:#10b981;}
        .mb-stat-l{font-size:12px;color:rgba(255,255,255,.4);margin-top:3px;}

        .mb-table-wrap{background:#131f35;border:1px solid rgba(255,255,255,.07);border-radius:14px;overflow:hidden;}
        .mb-table{width:100%;border-collapse:collapse;}
        .mb-table th{padding:13px 18px;text-align:left;font-size:11px;font-weight:500;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid rgba(255,255,255,.05);background:rgba(255,255,255,.02);}
        .mb-table td{padding:13px 18px;font-size:13px;color:rgba(255,255,255,.7);border-bottom:1px solid rgba(255,255,255,.04);}
        .mb-table tr:last-child td{border-bottom:none;}
        .mb-table tr:hover td{background:rgba(255,255,255,.02);}
        .mb-av{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;color:#fff;flex-shrink:0;}
        .mb-nrow{display:flex;align-items:center;gap:12px;}
        .mb-nm{font-weight:500;color:#e2e8f0;}
        .mb-em{font-size:11px;color:rgba(255,255,255,.35);margin-top:2px;}
        .mbadge{padding:3px 10px;border-radius:99px;font-size:11px;font-weight:500;}
        .mbadge.act{background:rgba(16,185,129,.12);color:#10b981;border:1px solid rgba(16,185,129,.2);}
        .mbadge.sus{background:rgba(239,68,68,.1);color:#f87171;border:1px solid rgba(239,68,68,.15);}
        .num-chip{background:rgba(99,102,241,.12);color:#818cf8;padding:2px 10px;border-radius:99px;font-size:12px;font-weight:600;}
        .mb-acts{display:flex;gap:6px;}
        .mb-tbtn{background:none;border:none;cursor:pointer;padding:5px 7px;border-radius:7px;font-size:13px;transition:background .15s;}
        .mb-tbtn:hover{background:rgba(255,255,255,.08);}

        /* MODAL */
        .mb-modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.72);backdrop-filter:blur(4px);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;}
        .mb-modal{background:#131f35;border:1px solid rgba(16,185,129,.15);border-radius:18px;padding:32px;width:100%;max-width:440px;position:relative;animation:mbIn .2s ease;}
        @keyframes mbIn{from{opacity:0;transform:scale(.95);}to{opacity:1;transform:scale(1);}}
        .mb-modal-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:#fff;margin-bottom:22px;}
        .mb-mgrp{margin-bottom:15px;}
        .mb-mlbl{display:block;font-size:11px;font-weight:500;color:rgba(255,255,255,.38);text-transform:uppercase;letter-spacing:.1em;margin-bottom:7px;}
        .mb-minp{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:11px 14px;font-size:14px;color:#e2e8f0;font-family:'Outfit',sans-serif;outline:none;transition:all .2s;}
        .mb-minp::placeholder{color:rgba(255,255,255,.18);}
        .mb-minp:focus{border-color:rgba(16,185,129,.4);background:rgba(16,185,129,.04);}
        .mb-mbtns{display:flex;gap:10px;margin-top:18px;}
        .mb-msave{flex:1;padding:12px;background:linear-gradient(135deg,#10b981,#059669);border:none;border-radius:10px;font-size:14px;font-weight:600;color:#fff;cursor:pointer;font-family:'Outfit',sans-serif;}
        .mb-mcancel{padding:12px 20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:10px;font-size:14px;color:rgba(255,255,255,.5);cursor:pointer;font-family:'Outfit',sans-serif;}
        .mb-mclose{position:absolute;top:16px;right:16px;background:none;border:none;color:rgba(255,255,255,.3);font-size:20px;cursor:pointer;width:32px;height:32px;border-radius:8px;transition:all .2s;}
        .mb-mclose:hover{background:rgba(255,255,255,.08);color:#fff;}
      `}</style>

      {/* STATS */}
      <div className="mb-stats">
        <div className="mb-stat"><div className="mb-stat-n">{members.length}</div><div className="mb-stat-l">Total Members</div></div>
        <div className="mb-stat"><div className="mb-stat-n" style={{color:"#10b981"}}>{members.filter(m=>m.status==="active").length}</div><div className="mb-stat-l">Active</div></div>
        <div className="mb-stat"><div className="mb-stat-n" style={{color:"#f87171"}}>{members.filter(m=>m.status==="suspended").length}</div><div className="mb-stat-l">Suspended</div></div>
      </div>

      {/* TOOLBAR */}
      <div className="mb-top">
        <input className="mb-search" placeholder="🔍  Search members..." value={search} onChange={e=>setSearch(e.target.value)}/>
        <div className="mb-filters">
          {["all","active","suspended"].map(f=>(
            <button key={f} className={`mb-fil ${filter===f?"act":""}`} onClick={()=>setFilter(f)}>
              {f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>
        <button className="mb-add" onClick={openAdd}>+ Add Member</button>
      </div>

      {/* TABLE */}
      <div className="mb-table-wrap">
        <table className="mb-table">
          <thead><tr><th>Member</th><th>Phone</th><th>Joined</th><th>Borrowed</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map(m=>(
              <tr key={m._id}>
                <td>
                  <div className="mb-nrow">
                    <div className="mb-av" style={{background:avatarColor(m.name)}}>{m.name[0]}</div>
                    <div><div className="mb-nm">{m.name}</div><div className="mb-em">{m.email}</div></div>
                  </div>
                </td>
                <td style={{color:"rgba(255,255,255,.45)",fontSize:12}}>{m.phone}</td>
                <td style={{color:"rgba(255,255,255,.45)",fontSize:12}}>{m.joined}</td>
                <td><span className="num-chip">{m.borrowed}</span></td>
                <td><span className={`mbadge ${m.status==="active"?"act":"sus"}`}>{m.status==="active"?"Active":"Suspended"}</span></td>
                <td>
                  <div className="mb-acts">
                    <button className="mb-tbtn" onClick={()=>toggle(m._id)} title={m.status==="active"?"Suspend":"Activate"}>{m.status==="active"?"🔒":"🔓"}</button>
                    <button className="mb-tbtn" onClick={()=>openEdit(m)}>✏️</button>
                    <button className="mb-tbtn" onClick={()=>del(m._id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="mb-modal-bg" onClick={e=>{if(e.target===e.currentTarget)setShowModal(false);}}>
          <div className="mb-modal">
            <button className="mb-mclose" onClick={()=>setShowModal(false)}>✕</button>
            <div className="mb-modal-title">{editId?"Edit Member":"Add New Member"}</div>
            <div className="mb-mgrp"><label className="mb-mlbl">Full Name</label><input className="mb-minp" placeholder="Full name..." value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div>
            <div className="mb-mgrp"><label className="mb-mlbl">Email</label><input className="mb-minp" type="email" placeholder="email@gmail.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
            <div className="mb-mgrp"><label className="mb-mlbl">Phone</label><input className="mb-minp" placeholder="98XXXXXXXX" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
            <div className="mb-mbtns">
              <button className="mb-mcancel" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="mb-msave" onClick={save}>{editId?"Save Changes":"Add Member"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}