import { useState } from "react";

// ══════════════════════════════════════════
//  DATA STORE
// ══════════════════════════════════════════
const initUsers = [
  { id:"1", name:"Admin User",  email:"admin@lexicon.com", password:"123456", role:"admin",  phone:"9876543210", address:"Mumbai, India",  joinDate:"Jan 2024" },
  { id:"2", name:"Rahul Sharma",email:"rahul@lexicon.com", password:"123456", role:"member", phone:"9812345678", address:"Delhi, India",   joinDate:"Feb 2024" },
  { id:"3", name:"Priya Singh", email:"priya@lexicon.com", password:"123456", role:"member", phone:"9899001122", address:"Pune, India",    joinDate:"Mar 2024" },
];

const initBooks = [
  { id:"1", title:"The Great Gatsby",      author:"F. Scott Fitzgerald", cat:"Fiction",   isbn:"978-0743273565", total:3, available:2, cover:"https://covers.openlibrary.org/b/id/8739161-M.jpg",  desc:"A story of the fabulously wealthy Jay Gatsby." },
  { id:"2", title:"To Kill a Mockingbird", author:"Harper Lee",           cat:"Classic",   isbn:"978-0061935466", total:2, available:2, cover:"https://covers.openlibrary.org/b/id/8228691-M.jpg",  desc:"A classic of modern American literature." },
  { id:"3", title:"1984",                  author:"George Orwell",        cat:"Dystopia",  isbn:"978-0451524935", total:4, available:3, cover:"https://covers.openlibrary.org/b/id/7222246-M.jpg",  desc:"A dystopian novel set in a totalitarian society." },
  { id:"4", title:"Harry Potter",          author:"J.K. Rowling",         cat:"Fantasy",   isbn:"978-0439708180", total:5, available:4, cover:"https://covers.openlibrary.org/b/id/10110415-M.jpg", desc:"The story of a young wizard Harry Potter." },
  { id:"5", title:"The Alchemist",         author:"Paulo Coelho",         cat:"Fiction",   isbn:"978-0062315007", total:3, available:3, cover:"https://covers.openlibrary.org/b/id/8479576-M.jpg",  desc:"A philosophical novel about following your dreams." },
  { id:"6", title:"Atomic Habits",         author:"James Clear",          cat:"Self-Help", isbn:"978-0735211292", total:4, available:4, cover:"https://covers.openlibrary.org/b/id/10519478-M.jpg", desc:"An easy and proven way to build good habits." },
  { id:"7", title:"Sapiens",               author:"Yuval Noah Harari",    cat:"History",   isbn:"978-0062316097", total:2, available:1, cover:"https://covers.openlibrary.org/b/id/9255566-M.jpg",  desc:"A brief history of humankind." },
  { id:"8", title:"The Hobbit",            author:"J.R.R. Tolkien",       cat:"Fantasy",   isbn:"978-0547928227", total:3, available:2, cover:"https://covers.openlibrary.org/b/id/8406786-M.jpg",  desc:"A fantasy novel and children's book." },
];

// ══════════════════════════════════════════
//  STYLES
// ══════════════════════════════════════════
const C = {
  bg:"#0b1120", card:"#131f35", side:"#0f1729",
  em:"#10b981", em2:"#059669", amber:"#f59e0b",
  red:"#ef4444", purple:"#6366f1",
  text:"#e2e8f0", muted:"rgba(226,232,240,.4)",
  border:"rgba(255,255,255,.07)", borderEm:"rgba(16,185,129,.2)",
};
const inp = { width:"100%", background:"rgba(255,255,255,.05)", border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 14px", fontSize:14, color:C.text, outline:"none", boxSizing:"border-box", fontFamily:"inherit", transition:"border-color .2s" };
const lbl = { display:"block", fontSize:11, color:C.muted, textTransform:"uppercase", letterSpacing:".09em", marginBottom:7, fontWeight:500 };
const greenBtn = { background:`linear-gradient(135deg,${C.em},${C.em2})`, border:"none", borderRadius:11, color:"#fff", fontWeight:700, cursor:"pointer", fontFamily:"inherit", transition:"all .2s" };
const ghostBtn = { background:"rgba(255,255,255,.05)", border:`1px solid ${C.border}`, borderRadius:10, color:C.muted, cursor:"pointer", fontFamily:"inherit" };
const errBox   = { background:"rgba(239,68,68,.1)", border:"1px solid rgba(239,68,68,.2)", borderRadius:9, padding:"10px 14px", fontSize:13, color:"#f87171", marginBottom:14, display:"flex", alignItems:"center", gap:8 };
const sucBox   = { background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.2)", borderRadius:9, padding:"10px 14px", fontSize:13, color:C.em, marginBottom:14, display:"flex", alignItems:"center", gap:8 };

const badge = (s) => {
  const m = { active:{bg:"rgba(16,185,129,.12)",c:"#10b981",b:"rgba(16,185,129,.2)"}, Available:{bg:"rgba(16,185,129,.12)",c:"#10b981",b:"rgba(16,185,129,.2)"}, overdue:{bg:"rgba(239,68,68,.1)",c:"#f87171",b:"rgba(239,68,68,.2)"}, Borrowed:{bg:"rgba(245,158,11,.12)",c:"#f59e0b",b:"rgba(245,158,11,.2)"}, returned:{bg:"rgba(148,163,184,.1)",c:"#94a3b8",b:"rgba(148,163,184,.15)"}, suspended:{bg:"rgba(239,68,68,.1)",c:"#f87171",b:"rgba(239,68,68,.2)"}, admin:{bg:"rgba(99,102,241,.12)",c:"#818cf8",b:"rgba(99,102,241,.2)"}, member:{bg:"rgba(16,185,129,.1)",c:"#10b981",b:"rgba(16,185,129,.18)"} };
  const x = m[s]||m.returned;
  return { padding:"3px 10px", borderRadius:99, fontSize:11, fontWeight:600, background:x.bg, color:x.c, border:`1px solid ${x.b}` };
};

const AC = ["#10b981","#6366f1","#f59e0b","#ec4899","#3b82f6","#14b8a6"];
const Modal = ({ children, onClose }) => (
  <div onClick={e=>{if(e.target===e.currentTarget)onClose();}} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.75)",backdropFilter:"blur(4px)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
    <div style={{background:C.card,border:`1px solid rgba(16,185,129,.2)`,borderRadius:18,padding:32,width:"100%",maxWidth:460,position:"relative",maxHeight:"90vh",overflowY:"auto"}}>
      <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"none",border:"none",color:C.muted,fontSize:20,cursor:"pointer"}}>✕</button>
      {children}
    </div>
  </div>
);
const Toast = ({ msg, type }) => (
  <div style={{position:"fixed",top:20,right:20,zIndex:300,background:type==="success"?C.card:"rgba(239,68,68,.9)",border:`1px solid ${type==="success"?C.em:"rgba(239,68,68,.5)"}`,borderRadius:12,padding:"12px 20px",color:type==="success"?C.em:"#fff",fontSize:14,fontWeight:600,boxShadow:"0 8px 24px rgba(0,0,0,.3)",display:"flex",alignItems:"center",gap:10}}>
    {type==="success"?"✅":"❌"} {msg}
  </div>
);

// ══════════════════════════════════════════
//  LOGIN
// ══════════════════════════════════════════
function LoginPage({ users, onLogin, onGoRegister, onForgotPassword }) {
  const [email,setEmail]=useState(""); const [pass,setPass]=useState(""); const [show,setShow]=useState(false); const [err,setErr]=useState("");
  const go=()=>{ setErr(""); if(!email||!pass){setErr("Please fill in all fields");return;} const u=users.find(u=>u.email===email&&u.password===pass); if(!u){setErr("Wrong email or password");return;} onLogin(u); };
  return (
    <div style={{minHeight:"100vh",display:"flex",background:C.bg,fontFamily:"'Segoe UI',sans-serif"}}>
      <div style={{flex:1,position:"relative",overflow:"hidden",display:"flex",alignItems:"flex-end",padding:52}}>
        <img src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80" alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(11,17,32,.97) 0%,rgba(11,17,32,.6) 55%,transparent 100%)"}}/>
        <div style={{position:"relative",zIndex:2,maxWidth:420}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(16,185,129,.13)",border:`1px solid rgba(16,185,129,.3)`,borderRadius:100,padding:"5px 14px",marginBottom:22}}>
            <div style={{width:7,height:7,borderRadius:"50%",background:C.em}}/><span style={{fontSize:11,color:C.em,textTransform:"uppercase",letterSpacing:".1em",fontWeight:600}}>LEXICON Library</span>
          </div>
          <h1 style={{fontSize:"clamp(30px,4vw,50px)",fontWeight:700,color:"#fff",lineHeight:1.1,margin:"0 0 16px"}}>Where Every Book<br/>Finds Its <span style={{color:C.em}}>Reader</span></h1>
          <p style={{fontSize:14,color:"rgba(255,255,255,.48)",lineHeight:1.75,margin:"0 0 32px"}}>Complete digital library — manage books, members and borrowings with ease.</p>
          <div style={{display:"flex",gap:28}}>{[["24K+","Books"],["5.2K","Members"],["99%","Uptime"]].map(([n,l])=><div key={l}><div style={{fontSize:26,fontWeight:700,color:C.amber,lineHeight:1}}>{n}</div><div style={{fontSize:10,color:"rgba(255,255,255,.32)",textTransform:"uppercase",letterSpacing:".08em",marginTop:3}}>{l}</div></div>)}</div>
        </div>
      </div>
      <div style={{width:460,background:C.side,display:"flex",alignItems:"center",justifyContent:"center",padding:"48px 40px",borderLeft:`1px solid rgba(16,185,129,.1)`}}>
        <div style={{width:"100%",maxWidth:360}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:36}}><div style={{width:46,height:46,background:`linear-gradient(135deg,${C.em},${C.em2})`,borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:21}}>📖</div><div><div style={{fontSize:19,fontWeight:700,color:"#fff",lineHeight:1}}>LEXICON</div><div style={{fontSize:9,color:"rgba(255,255,255,.28)",textTransform:"uppercase",letterSpacing:".12em",marginTop:3}}>The Grand Library</div></div></div>
          <h2 style={{fontSize:26,fontWeight:700,color:"#fff",margin:"0 0 5px"}}>Sign In</h2>
          <p style={{fontSize:13,color:C.muted,margin:"0 0 26px"}}>Welcome back — your books are waiting</p>
          {err&&<div style={errBox}>⚠️ {err}</div>}
          <div style={{marginBottom:14}}><label style={lbl}>Email</label><input style={inp} type="email" placeholder="admin@lexicon.com" value={email} onChange={e=>{setEmail(e.target.value);setErr("");}}/></div>
          <div style={{marginBottom:6}}>
            <label style={lbl}>Password</label>
            <div style={{position:"relative"}}><input style={inp} type={show?"text":"password"} placeholder="Enter password" value={pass} onChange={e=>{setPass(e.target.value);setErr("");}}/><button onClick={()=>setShow(!show)} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:15,color:C.muted}}>{show?"🙈":"👁️"}</button></div>
          </div>
          <div style={{textAlign:"right",marginBottom:16}}><span onClick={onForgotPassword} style={{fontSize:12,color:C.em,cursor:"pointer",textDecoration:"underline",textUnderlineOffset:3}}>Forgot password?</span></div>
          <button style={{...greenBtn,width:"100%",padding:14,fontSize:15}} onClick={go}>Sign In →</button>
          <div style={{margin:"16px 0",background:"rgba(16,185,129,.06)",border:`1px solid rgba(16,185,129,.12)`,borderRadius:10,padding:"12px 14px"}}>
            <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:".08em",marginBottom:8,textAlign:"center"}}>Quick Demo Login</div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>{setEmail("admin@lexicon.com");setPass("123456");setErr("");}} style={{flex:1,padding:8,background:"rgba(16,185,129,.12)",border:`1px solid rgba(16,185,129,.25)`,borderRadius:8,color:C.em,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>👑 Admin</button>
              <button onClick={()=>{setEmail("rahul@lexicon.com");setPass("123456");setErr("");}} style={{flex:1,padding:8,background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:8,color:"rgba(255,255,255,.55)",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>👤 Member</button>
            </div>
          </div>
          <div style={{textAlign:"center",fontSize:14,color:C.muted}}>New to LEXICON? <span onClick={onGoRegister} style={{color:C.em,cursor:"pointer",fontWeight:600,textDecoration:"underline",textUnderlineOffset:3}}>Create account</span></div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  FORGOT PASSWORD
// ══════════════════════════════════════════
function ForgotPage({ users, onBack, onReset }) {
  const [step,setStep]=useState(1); const [email,setEmail]=useState(""); const [newPass,setNewPass]=useState(""); const [conf,setConf]=useState(""); const [err,setErr]=useState(""); const [suc,setSuc]=useState("");
  const checkEmail=()=>{ setErr(""); const u=users.find(u=>u.email===email); if(!u){setErr("Email not found. Please register.");return;} setStep(2); };
  const resetPass=()=>{ setErr(""); if(!newPass||!conf){setErr("Fill all fields");return;} if(newPass.length<6){setErr("Min 6 characters");return;} if(newPass!==conf){setErr("Passwords do not match");return;} onReset(email,newPass); setSuc("Password reset! Redirecting..."); setTimeout(onBack,2000); };
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:C.bg,fontFamily:"'Segoe UI',sans-serif",padding:20}}>
      <div style={{width:"100%",maxWidth:420,background:C.side,borderRadius:20,padding:40,border:`1px solid rgba(16,185,129,.12)`}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:32}}><div style={{width:44,height:44,background:`linear-gradient(135deg,${C.em},${C.em2})`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>📖</div><div><div style={{fontSize:18,fontWeight:700,color:"#fff"}}>LEXICON</div><div style={{fontSize:9,color:"rgba(255,255,255,.28)",textTransform:"uppercase",letterSpacing:".12em",marginTop:2}}>The Grand Library</div></div></div>
        <h2 style={{fontSize:24,fontWeight:700,color:"#fff",margin:"0 0 6px"}}>Reset Password</h2>
        <p style={{fontSize:13,color:C.muted,margin:"0 0 24px"}}>{step===1?"Enter your registered email":"Set your new password"}</p>
        {err&&<div style={errBox}>⚠️ {err}</div>}
        {suc&&<div style={sucBox}>✅ {suc}</div>}
        {step===1?(
          <>
            <div style={{marginBottom:18}}><label style={lbl}>Registered Email</label><input style={inp} type="email" placeholder="your@email.com" value={email} onChange={e=>{setEmail(e.target.value);setErr("");}}/></div>
            <button style={{...greenBtn,width:"100%",padding:13,fontSize:15}} onClick={checkEmail}>Verify Email →</button>
          </>
        ):(
          <>
            <div style={{marginBottom:14}}><label style={lbl}>New Password</label><input style={inp} type="password" placeholder="Min 6 characters" value={newPass} onChange={e=>{setNewPass(e.target.value);setErr("");}}/></div>
            <div style={{marginBottom:18}}><label style={lbl}>Confirm Password</label><input style={inp} type="password" placeholder="Repeat password" value={conf} onChange={e=>{setConf(e.target.value);setErr("");}}/></div>
            <button style={{...greenBtn,width:"100%",padding:13,fontSize:15}} onClick={resetPass}>Reset Password →</button>
          </>
        )}
        <div style={{textAlign:"center",marginTop:16,fontSize:14,color:C.muted}}><span onClick={onBack} style={{color:C.em,cursor:"pointer",fontWeight:600,textDecoration:"underline",textUnderlineOffset:3}}>← Back to Login</span></div>
      </div>
    </div>
  );
}
// ══════════════════════════════════════════
//  REGISTER
// ══════════════════════════════════════════
function RegisterPage({ users, onRegister, onGoLogin }) {
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [pass,setPass]=useState(""); const [conf,setConf]=useState(""); const [role,setRole]=useState("member"); const [phone,setPhone]=useState(""); const [show,setShow]=useState(false); const [err,setErr]=useState("");
  const go=()=>{ setErr(""); if(!name||!email||!pass||!conf){setErr("Please fill all fields");return;} if(pass.length<6){setErr("Password min 6 characters");return;} if(pass!==conf){setErr("Passwords do not match");return;} if(users.find(u=>u.email===email)){setErr("Email already registered. Please sign in.");return;} onRegister({name,email,pass,role,phone}); };
  return (
    <div style={{minHeight:"100vh",display:"flex",background:C.bg,fontFamily:"'Segoe UI',sans-serif"}}>
      <div style={{flex:1,position:"relative",overflow:"hidden",display:"flex",alignItems:"flex-end",padding:52}}>
        <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80" alt="" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(11,17,32,.97) 0%,rgba(11,17,32,.65) 55%,transparent 100%)"}}/>
        <div style={{position:"relative",zIndex:2,maxWidth:420}}>
          <h1 style={{fontSize:"clamp(30px,4vw,48px)",fontWeight:700,color:"#fff",lineHeight:1.1,margin:"0 0 16px"}}>Begin Your<br/><span style={{color:C.em}}>Reading Journey</span></h1>
          <p style={{fontSize:14,color:"rgba(255,255,255,.48)",lineHeight:1.75,margin:"0 0 24px"}}>Create your account and unlock thousands of books.</p>
          {["Register with email & password","Choose role — Member or Admin","Browse & borrow books instantly"].map((t,i)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:14}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:"rgba(16,185,129,.12)",border:`1px solid rgba(16,185,129,.3)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:C.em,flexShrink:0}}>{i+1}</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,.48)",lineHeight:1.55,paddingTop:3}}>{t}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{width:500,background:C.side,display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 44px",borderLeft:`1px solid rgba(16,185,129,.1)`,overflowY:"auto"}}>
        <div style={{width:"100%",maxWidth:390,padding:"12px 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:28}}><div style={{width:44,height:44,background:`linear-gradient(135deg,${C.em},${C.em2})`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>📖</div><div><div style={{fontSize:18,fontWeight:700,color:"#fff",lineHeight:1}}>LEXICON</div><div style={{fontSize:9,color:"rgba(255,255,255,.28)",textTransform:"uppercase",letterSpacing:".12em",marginTop:2}}>The Grand Library</div></div></div>
          <h2 style={{fontSize:24,fontWeight:700,color:"#fff",margin:"0 0 5px"}}>Create Account</h2>
          <p style={{fontSize:13,color:C.muted,margin:"0 0 22px"}}>Fill in your details to get started</p>
          {err&&<div style={errBox}>⚠️ {err}</div>}
          <div style={{marginBottom:13}}><label style={lbl}>Full Name</label><input style={inp} type="text" placeholder="Rahul Sharma" value={name} onChange={e=>{setName(e.target.value);setErr("");}}/></div>
          <div style={{marginBottom:13}}><label style={lbl}>Email Address</label><input style={inp} type="email" placeholder="rahul@gmail.com" value={email} onChange={e=>{setEmail(e.target.value);setErr("");}}/></div>
          <div style={{marginBottom:13}}><label style={lbl}>Phone (optional)</label><input style={inp} type="tel" placeholder="98XXXXXXXX" value={phone} onChange={e=>setPhone(e.target.value)}/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:13,marginBottom:13}}>
            <div><label style={lbl}>Password</label><div style={{position:"relative"}}><input style={inp} type={show?"text":"password"} placeholder="Min 6 chars" value={pass} onChange={e=>{setPass(e.target.value);setErr("");}}/><button onClick={()=>setShow(!show)} style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:13,color:C.muted}}>{show?"🙈":"👁️"}</button></div></div>
            <div><label style={lbl}>Confirm</label><input style={inp} type="password" placeholder="Repeat" value={conf} onChange={e=>{setConf(e.target.value);setErr("");}}/></div>
          </div>
          <div style={{marginBottom:20}}>
            <label style={lbl}>Account Role</label>
            <div style={{display:"flex",gap:10}}>
              {[["member","👤 Member"],["admin","👑 Admin"]].map(([r,l])=>(
                <button key={r} onClick={()=>setRole(r)} style={{flex:1,padding:11,background:role===r?"rgba(16,185,129,.12)":"rgba(255,255,255,.04)",border:role===r?`1px solid rgba(16,185,129,.45)`:`1px solid ${C.border}`,borderRadius:10,color:role===r?C.em:"rgba(255,255,255,.45)",fontSize:13,fontWeight:role===r?700:400,cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}>{l}</button>
              ))}
            </div>
          </div>
          <button style={{...greenBtn,width:"100%",padding:14,fontSize:15}} onClick={go}>Create Account →</button>
          <div style={{textAlign:"center",marginTop:16,fontSize:14,color:C.muted}}>Already have an account? <span onClick={onGoLogin} style={{color:C.em,cursor:"pointer",fontWeight:600,textDecoration:"underline",textUnderlineOffset:3}}>Sign in here</span></div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
//  PROFILE MODAL
// ══════════════════════════════════════════
function ProfileModal({ user, borrows, books, onClose, onUpdate }) {
  const [tab,setTab]=useState("info");
  const [name,setName]=useState(user.name); const [phone,setPhone]=useState(user.phone||""); const [address,setAddress]=useState(user.address||"");
  const [oldPass,setOldPass]=useState(""); const [newPass,setNewPass]=useState(""); const [confPass,setConfPass]=useState("");
  const [err,setErr]=useState(""); const [suc,setSuc]=useState("");
  const myBorrows = borrows.filter(b=>b.userId===user.id);
  const saveInfo=()=>{ setErr(""); setSuc(""); if(!name){setErr("Name required");return;} onUpdate({...user,name,phone,address}); setSuc("Profile updated!"); setTimeout(()=>setSuc(""),2000); };
  const savePass=()=>{ setErr(""); setSuc(""); if(!oldPass||!newPass||!confPass){setErr("Fill all fields");return;} if(oldPass!==user.password){setErr("Current password wrong");return;} if(newPass.length<6){setErr("Min 6 characters");return;} if(newPass!==confPass){setErr("Passwords do not match");return;} onUpdate({...user,password:newPass}); setSuc("Password changed!"); setOldPass(""); setNewPass(""); setConfPass(""); setTimeout(()=>setSuc(""),2000); };
  const tabs=[{id:"info",label:"My Info"},{id:"pass",label:"Change Password"},{id:"history",label:"Borrow History"}];
  return (
    <Modal onClose={onClose}>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:24}}>
        <div style={{width:56,height:56,borderRadius:"50%",background:`linear-gradient(135deg,${C.em},${C.em2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,color:"#fff",flexShrink:0}}>{user.name[0]}</div>
        <div><div style={{fontSize:18,fontWeight:700,color:"#fff"}}>{user.name}</div><div style={{fontSize:12,color:C.muted,marginTop:3}}>{user.email}</div><span style={{...badge(user.role),marginTop:4,display:"inline-block"}}>{user.role==="admin"?"👑 Admin":"👤 Member"}</span></div>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:24,background:"rgba(255,255,255,.04)",borderRadius:10,padding:4}}>
        {tabs.map(t=><button key={t.id} onClick={()=>{setTab(t.id);setErr("");setSuc("");}} style={{flex:1,padding:"8px",background:tab===t.id?C.em:"transparent",border:"none",borderRadius:8,color:tab===t.id?"#fff":C.muted,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}>{t.label}</button>)}
      </div>
      {err&&<div style={errBox}>⚠️ {err}</div>}
      {suc&&<div style={sucBox}>✅ {suc}</div>}
      {tab==="info"&&<>
        <div style={{marginBottom:14}}><label style={lbl}>Full Name</label><input style={inp} value={name} onChange={e=>setName(e.target.value)}/></div>
        <div style={{marginBottom:14}}><label style={lbl}>Email</label><input style={{...inp,opacity:.6}} value={user.email} disabled/></div>
        <div style={{marginBottom:14}}><label style={lbl}>Phone</label><input style={inp} placeholder="98XXXXXXXX" value={phone} onChange={e=>setPhone(e.target.value)}/></div>
        <div style={{marginBottom:18}}><label style={lbl}>Address</label><input style={inp} placeholder="City, State" value={address} onChange={e=>setAddress(e.target.value)}/></div>
        <button style={{...greenBtn,width:"100%",padding:12,fontSize:14}} onClick={saveInfo}>Save Changes</button>
      </>}
      {tab==="pass"&&<>
        <div style={{marginBottom:14}}><label style={lbl}>Current Password</label><input style={inp} type="password" placeholder="Current password" value={oldPass} onChange={e=>{setOldPass(e.target.value);setErr("");}}/></div>
        <div style={{marginBottom:14}}><label style={lbl}>New Password</label><input style={inp} type="password" placeholder="Min 6 chars" value={newPass} onChange={e=>{setNewPass(e.target.value);setErr("");}}/></div>
        <div style={{marginBottom:18}}><label style={lbl}>Confirm New Password</label><input style={inp} type="password" placeholder="Repeat new password" value={confPass} onChange={e=>{setConfPass(e.target.value);setErr("");}}/></div>
        <button style={{...greenBtn,width:"100%",padding:12,fontSize:14}} onClick={savePass}>Change Password</button>
      </>}
      {tab==="history"&&<>
        {myBorrows.length===0?<div style={{textAlign:"center",padding:"30px 0",color:C.muted}}>No borrow history yet</div>:
        myBorrows.map((b,i)=>{
          const book=books.find(bk=>bk.id===b.bookId);
          return <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
            <img src={book?.cover} alt="" style={{width:32,height:44,borderRadius:4,objectFit:"cover",border:`1px solid ${C.border}`,flexShrink:0}} onError={e=>{e.target.style.display="none";}}/>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:500,color:C.text}}>{book?.title}</div><div style={{fontSize:11,color:C.muted,marginTop:2}}>Due: {b.dueDate}</div></div>
            <span style={badge(b.status)}>{b.status.charAt(0).toUpperCase()+b.status.slice(1)}</span>
          </div>;
        })}
      </>}
    </Modal>
  );
}

// ══════════════════════════════════════════
//  ISSUE BOOK MODAL
// ══════════════════════════════════════════
function IssueModal({ book, users, onIssue, onClose }) {
  const members=users.filter(u=>u.role==="member");
  const [memberId,setMemberId]=useState(""); const [dueDate,setDueDate]=useState(""); const [err,setErr]=useState("");
  const go=()=>{ setErr(""); if(!memberId){setErr("Select a member");return;} if(!dueDate){setErr("Select due date");return;} if(new Date(dueDate)<=new Date()){setErr("Due date must be in future");return;} onIssue(book,memberId,dueDate); };
  return <Modal onClose={onClose}>
    <div style={{fontSize:18,fontWeight:700,color:"#fff",marginBottom:20}}>📤 Issue Book</div>
    <div style={{display:"flex",gap:12,background:"rgba(255,255,255,.03)",borderRadius:10,padding:12,marginBottom:20,border:`1px solid ${C.border}`}}>
      <img src={book.cover} alt="" style={{width:44,height:60,borderRadius:5,objectFit:"cover",flexShrink:0}} onError={e=>{e.target.style.display="none";}}/>
      <div><div style={{fontSize:14,fontWeight:600,color:C.text}}>{book.title}</div><div style={{fontSize:12,color:C.muted,marginTop:3}}>{book.author}</div><div style={{fontSize:11,color:C.em,marginTop:3}}>Available: {book.available}/{book.total}</div></div>
    </div>
    {err&&<div style={errBox}>⚠️ {err}</div>}
    <div style={{marginBottom:14}}>
      <label style={lbl}>Select Member</label>
      <select style={{...inp,cursor:"pointer"}} value={memberId} onChange={e=>setMemberId(e.target.value)}>
        <option value="">-- Choose member --</option>
        {members.map(m=><option key={m.id} value={m.id}>{m.name} — {m.email}</option>)}
      </select>
    </div>
    <div style={{marginBottom:20}}><label style={lbl}>Due Date</label><input style={inp} type="date" value={dueDate} min={new Date().toISOString().split("T")[0]} onChange={e=>setDueDate(e.target.value)}/></div>
    <div style={{display:"flex",gap:10}}>
      <button style={{...ghostBtn,padding:"11px 20px",fontSize:14}} onClick={onClose}>Cancel</button>
      <button style={{...greenBtn,flex:1,padding:11,fontSize:14}} onClick={go}>Issue Book</button>
    </div>
  </Modal>;
}
// ══════════════════════════════════════════
//  ADD / EDIT BOOK MODAL
// ══════════════════════════════════════════
function BookFormModal({ book, onSave, onClose }) {
  const [f,setF]=useState(book||{title:"",author:"",isbn:"",cat:"Fiction",total:1,cover:"",desc:""});
  const [err,setErr]=useState("");
  const go=()=>{ setErr(""); if(!f.title||!f.author){setErr("Title and Author required");return;} onSave({...f,total:Number(f.total),available:book?f.available:Number(f.total),id:book?book.id:Date.now().toString()}); };
  return <Modal onClose={onClose}>
    <div style={{fontSize:18,fontWeight:700,color:"#fff",marginBottom:20}}>{book?"✏️ Edit Book":"📚 Add New Book"}</div>
    {err&&<div style={errBox}>⚠️ {err}</div>}
    <div style={{marginBottom:13}}><label style={lbl}>Book Title *</label><input style={inp} placeholder="Enter title" value={f.title} onChange={e=>setF({...f,title:e.target.value})}/></div>
    <div style={{marginBottom:13}}><label style={lbl}>Author *</label><input style={inp} placeholder="Author name" value={f.author} onChange={e=>setF({...f,author:e.target.value})}/></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:13,marginBottom:13}}>
      <div><label style={lbl}>ISBN</label><input style={inp} placeholder="978-..." value={f.isbn} onChange={e=>setF({...f,isbn:e.target.value})}/></div>
      <div><label style={lbl}>Total Copies</label><input style={inp} type="number" min="1" value={f.total} onChange={e=>setF({...f,total:e.target.value})}/></div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:13,marginBottom:13}}>
      <div><label style={lbl}>Category</label><select style={{...inp,cursor:"pointer"}} value={f.cat} onChange={e=>setF({...f,cat:e.target.value})}>{["Fiction","Classic","Dystopia","Fantasy","History","Self-Help","Science","Biography","Other"].map(c=><option key={c}>{c}</option>)}</select></div>
      <div><label style={lbl}>Cover URL</label><input style={inp} placeholder="https://..." value={f.cover} onChange={e=>setF({...f,cover:e.target.value})}/></div>
    </div>
    <div style={{marginBottom:18}}><label style={lbl}>Description</label><input style={inp} placeholder="Short description..." value={f.desc} onChange={e=>setF({...f,desc:e.target.value})}/></div>
    <div style={{display:"flex",gap:10}}>
      <button style={{...ghostBtn,padding:"11px 20px",fontSize:14}} onClick={onClose}>Cancel</button>
      <button style={{...greenBtn,flex:1,padding:11,fontSize:14}} onClick={go}>{book?"Save Changes":"Add Book"}</button>
    </div>
  </Modal>;
}

// ══════════════════════════════════════════
//  ADD MEMBER MODAL
// ══════════════════════════════════════════
function MemberFormModal({ onSave, onClose, existingUsers }) {
  const [f,setF]=useState({name:"",email:"",phone:"",role:"member"});
  const [err,setErr]=useState("");
  const go=()=>{ setErr(""); if(!f.name||!f.email){setErr("Name and Email required");return;} if(existingUsers.find(u=>u.email===f.email)){setErr("Email already exists");return;} onSave({...f,id:Date.now().toString(),password:"123456",address:"",joinDate:new Date().toLocaleDateString("en-IN",{month:"short",year:"numeric"})}); };
  return <Modal onClose={onClose}>
    <div style={{fontSize:18,fontWeight:700,color:"#fff",marginBottom:6}}>👤 Add New Member</div>
    <div style={{fontSize:12,color:C.muted,marginBottom:20}}>Default password will be <strong style={{color:C.em}}>123456</strong></div>
    {err&&<div style={errBox}>⚠️ {err}</div>}
    {[["Full Name","text","Rahul Sharma","name"],["Email","email","rahul@gmail.com","email"],["Phone","tel","98XXXXXXXX","phone"]].map(([l,t,p,k])=>
      <div key={k} style={{marginBottom:13}}><label style={lbl}>{l}</label><input style={inp} type={t} placeholder={p} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})}/></div>
    )}
    <div style={{marginBottom:20}}>
      <label style={lbl}>Role</label>
      <div style={{display:"flex",gap:10}}>
        {[["member","👤 Member"],["admin","👑 Admin"]].map(([r,lb])=>(
          <button key={r} onClick={()=>setF({...f,role:r})} style={{flex:1,padding:10,background:f.role===r?"rgba(16,185,129,.12)":"rgba(255,255,255,.04)",border:f.role===r?`1px solid rgba(16,185,129,.45)`:`1px solid ${C.border}`,borderRadius:9,color:f.role===r?C.em:"rgba(255,255,255,.45)",fontSize:13,fontWeight:f.role===r?700:400,cursor:"pointer",fontFamily:"inherit"}}>{lb}</button>
        ))}
      </div>
    </div>
    <div style={{display:"flex",gap:10}}>
      <button style={{...ghostBtn,padding:"11px 20px",fontSize:14}} onClick={onClose}>Cancel</button>
      <button style={{...greenBtn,flex:1,padding:11,fontSize:14}} onClick={go}>Add Member</button>
    </div>
  </Modal>;
}

// ══════════════════════════════════════════
//  DASHBOARD
// ══════════════════════════════════════════
function DashboardPage({ user, users, setUsers, books, setBooks, borrows, setBorrows, onLogout, onUpdateUser }) {
  const [page,setPage]=useState("home");
  const [modal,setModal]=useState(null);
  const [search,setSearch]=useState("");
  const [toast,setToast]=useState(null);
  const [filterCat,setFilterCat]=useState("All");
  const [filterStatus,setFilterStatus]=useState("all");

  const showToast=(msg,type="success")=>{ setToast({msg,type}); setTimeout(()=>setToast(null),3000); };

  // ISSUE BOOK
  const handleIssue=(book,memberId,dueDate)=>{
    if(book.available<1){showToast("No copies available!","error");return;}
    setBooks(books.map(b=>b.id===book.id?{...b,available:b.available-1}:b));
    setBorrows([...borrows,{id:Date.now().toString(),bookId:book.id,userId:memberId,issueDate:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short"}),dueDate,status:"active",returnDate:null}]);
    setModal(null); showToast(`Book "${book.title}" issued successfully!`);
  };

  // RETURN BOOK
  const handleReturn=(borrowId)=>{
    const borrow=borrows.find(b=>b.id===borrowId);
    if(!borrow)return;
    setBorrows(borrows.map(b=>b.id===borrowId?{...b,status:"returned",returnDate:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"short"})}:b));
    setBooks(books.map(b=>b.id===borrow.bookId?{...b,available:b.available+1}:b));
    showToast("Book returned successfully!");
  };

  // DELETE BOOK
  const handleDeleteBook=(bookId)=>{ if(borrows.find(b=>b.bookId===bookId&&b.status==="active")){showToast("Cannot delete — book is borrowed!","error");return;} setBooks(books.filter(b=>b.id!==bookId)); showToast("Book deleted!"); };

  // DELETE USER
  const handleDeleteUser=(userId)=>{ if(borrows.find(b=>b.userId===userId&&b.status==="active")){showToast("Cannot delete — member has active borrows!","error");return;} setUsers(users.filter(u=>u.id!==userId)); showToast("Member deleted!"); };

  const NAV=[{id:"home",icon:"⊞",label:"Dashboard"},{id:"books",icon:"📚",label:"Books"},{id:"members",icon:"👥",label:"Members"},{id:"borrow",icon:"🔄",label:"Borrow Records"},{id:"reports",icon:"📊",label:"Reports"}];
  const filteredBooks=books.filter(b=>(filterCat==="All"||b.cat===filterCat)&&(b.title.toLowerCase().includes(search.toLowerCase())||b.author.toLowerCase().includes(search.toLowerCase())));
  const filteredMembers=users.filter(u=>u.role==="member"&&(u.name.toLowerCase().includes(search.toLowerCase())||u.email.toLowerCase().includes(search.toLowerCase())));
  const filteredBorrows=borrows.filter(b=>filterStatus==="all"||b.status===filterStatus);
  const cats=["All","Fiction","Classic","Dystopia","Fantasy","History","Self-Help","Science","Biography","Other"];

  return (
    <div style={{display:"flex",minHeight:"100vh",background:C.bg,fontFamily:"'Segoe UI',sans-serif",color:C.text}}>
      {toast&&<Toast msg={toast.msg} type={toast.type}/>}

      {/* SIDEBAR */}
      <aside style={{width:228,background:C.side,borderRight:`1px solid rgba(16,185,129,.08)`,display:"flex",flexDirection:"column",padding:"22px 0",position:"sticky",top:0,height:"100vh",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:11,padding:"0 16px 22px",borderBottom:`1px solid ${C.border}`,marginBottom:14}}>
          <div style={{width:40,height:40,background:`linear-gradient(135deg,${C.em},${C.em2})`,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>📖</div>
          <div><div style={{fontSize:16,fontWeight:700,color:"#fff"}}>LEXICON</div><div style={{fontSize:9,color:"rgba(255,255,255,.28)",textTransform:"uppercase",letterSpacing:".12em",marginTop:2}}>Grand Library</div></div>
        </div>
        <nav style={{flex:1,padding:"0 10px",display:"flex",flexDirection:"column",gap:2}}>
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>{setPage(n.id);setSearch("");}} style={{display:"flex",alignItems:"center",gap:10,padding:"11px 12px",borderRadius:9,border:"none",background:page===n.id?"rgba(16,185,129,.12)":"transparent",color:page===n.id?C.em:"rgba(255,255,255,.42)",fontSize:13,cursor:"pointer",textAlign:"left",width:"100%",fontWeight:page===n.id?600:400,position:"relative",fontFamily:"inherit",transition:"all .15s"}}>
              <span style={{fontSize:15,width:17,textAlign:"center",flexShrink:0}}>{n.icon}</span>{n.label}
              {page===n.id&&<span style={{position:"absolute",right:0,top:"50%",transform:"translateY(-50%)",width:3,height:18,background:C.em,borderRadius:"3px 0 0 3px"}}/>}
            </button>
          ))}
        </nav>
        <div style={{padding:"14px 10px 0",borderTop:`1px solid ${C.border}`,marginTop:"auto"}}>
          <button onClick={()=>setModal({type:"profile"})} style={{display:"flex",alignItems:"center",gap:9,padding:10,borderRadius:9,background:"rgba(255,255,255,.03)",marginBottom:8,border:`1px solid ${C.border}`,width:"100%",cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}
            onMouseOver={e=>{e.currentTarget.style.borderColor="rgba(16,185,129,.3)";}} onMouseOut={e=>{e.currentTarget.style.borderColor=C.border;}}>
            <div style={{width:33,height:33,borderRadius:"50%",background:`linear-gradient(135deg,${C.em},${C.em2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#fff",flexShrink:0}}>{user.name[0]}</div>
            <div style={{minWidth:0,textAlign:"left"}}>
              <div style={{fontSize:13,fontWeight:500,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user.name}</div>
              <div style={{fontSize:10,color:C.muted,textTransform:"capitalize"}}>{user.role} · View Profile</div>
            </div>
          </button>
          <button onClick={onLogout} style={{width:"100%",padding:9,background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.14)",borderRadius:8,color:"#f87171",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>⏻ Logout</button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 28px",borderBottom:`1px solid ${C.border}`,background:C.bg,position:"sticky",top:0,zIndex:10}}>
          <div>
            <div style={{fontSize:22,fontWeight:700,color:"#fff"}}>{{home:"Dashboard",books:"Book Catalog",members:"Members",borrow:"Borrow Records",reports:"Reports"}[page]}</div>
            <div style={{fontSize:12,color:C.muted,marginTop:2}}>{new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button onClick={()=>setModal({type:"profile"})} style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${C.em},${C.em2})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#fff",cursor:"pointer",border:"none"}}>{user.name[0]}</button>
          </div>
        </header>

        <div style={{padding:"24px 28px",overflowY:"auto",flex:1}}>

          {/* ─── HOME ─── */}
          {page==="home"&&<>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:22}}>
              {[{icon:"📚",label:"Total Books",val:books.length,chg:"+12%",c:C.em},{icon:"📖",label:"Available",val:books.reduce((a,b)=>a+b.available,0),chg:"+5%",c:C.purple},{icon:"🔄",label:"Borrowed",val:borrows.filter(b=>b.status==="active").length,chg:"-3%",c:C.amber},{icon:"⚠️",label:"Overdue",val:borrows.filter(b=>b.status==="overdue").length,chg:"-18%",c:C.red}].map((s,i)=>(
                <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:18}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <div style={{width:38,height:38,borderRadius:9,background:"rgba(255,255,255,.05)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17}}>{s.icon}</div>
                    <span style={{fontSize:11,fontWeight:600,color:s.chg.startsWith("+")?"#10b981":"#f87171"}}>{s.chg}</span>
                  </div>
                  <div style={{fontSize:28,fontWeight:700,color:"#fff",lineHeight:1,marginBottom:3}}>{s.val}</div>
                  <div style={{fontSize:12,color:C.muted,marginBottom:12}}>{s.label}</div>
                  <div style={{height:3,background:"rgba(255,255,255,.06)",borderRadius:99}}><div style={{height:"100%",width:"60%",background:s.c,borderRadius:99}}/></div>
                </div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1.2fr 0.8fr",gap:18}}>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"15px 18px",borderBottom:`1px solid ${C.border}`}}>
                  <span style={{fontSize:14,fontWeight:600,color:"#fff"}}>Recent Books</span>
                  <button onClick={()=>setPage("books")} style={{fontSize:12,color:C.em,background:"none",border:"none",cursor:"pointer"}}>View All →</button>
                </div>
                {books.slice(0,5).map((b,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:11,padding:"9px 18px",borderBottom:`1px solid rgba(255,255,255,.03)`}}>
                    <img src={b.cover} alt="" style={{width:32,height:45,borderRadius:4,objectFit:"cover",border:`1px solid ${C.border}`,flexShrink:0}} onError={e=>{e.target.style.display="none";}}/>
                    <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:500,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{b.title}</div><div style={{fontSize:11,color:C.muted,marginTop:2}}>{b.author}</div></div>
                    <span style={badge(b.available>0?"Available":"Borrowed")}>{b.available>0?"Available":"Borrowed"}</span>
                  </div>
                ))}
              </div>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"15px 16px",borderBottom:`1px solid ${C.border}`}}>
                  <span style={{fontSize:14,fontWeight:600,color:"#fff"}}>Recent Borrows</span>
                  <button onClick={()=>setPage("borrow")} style={{fontSize:12,color:C.em,background:"none",border:"none",cursor:"pointer"}}>View All →</button>
                </div>
                {borrows.slice(-4).reverse().map((b,i)=>{
                  const u=users.find(u=>u.id===b.userId); const bk=books.find(bk=>bk.id===b.bookId);
                  return <div key={i} style={{display:"flex",alignItems:"center",gap:9,padding:"9px 14px",borderBottom:`1px solid rgba(255,255,255,.03)`}}>
                    <div style={{width:33,height:33,borderRadius:"50%",background:AC[i%6],display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"#fff",flexShrink:0}}>{u?.name?.[0]||"?"}</div>
                    <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:500,color:C.text}}>{u?.name}</div><div style={{fontSize:11,color:C.muted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{bk?.title}</div></div>
                    <span style={badge(b.status)}>{b.status.charAt(0).toUpperCase()+b.status.slice(1)}</span>
                  </div>;
                })}
              </div>
            </div>
          </>}

          {/* ─── BOOKS ─── */}
          {page==="books"&&<>
            <div style={{display:"flex",gap:12,marginBottom:16,flexWrap:"wrap"}}>
              <input placeholder="🔍  Search books or authors..." style={{flex:1,minWidth:200,...inp}} value={search} onChange={e=>setSearch(e.target.value)}/>
              {user.role==="admin"&&<button onClick={()=>setModal({type:"addBook"})} style={{...greenBtn,padding:"10px 20px",fontSize:14}}>+ Add Book</button>}
            </div>
            <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
              {cats.map(c=><button key={c} onClick={()=>setFilterCat(c)} style={{padding:"5px 14px",background:filterCat===c?"rgba(16,185,129,.12)":"rgba(255,255,255,.04)",border:filterCat===c?`1px solid rgba(16,185,129,.35)`:`1px solid ${C.border}`,borderRadius:100,fontSize:12,color:filterCat===c?C.em:C.muted,cursor:"pointer",fontFamily:"inherit",fontWeight:filterCat===c?600:400}}>{c}</button>)}
            </div>
            {filteredBooks.length===0?<div style={{textAlign:"center",padding:"60px 0",color:C.muted,fontSize:15}}>No books found</div>:
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:16}}>
              {filteredBooks.map((b,i)=>(
                <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:13,overflow:"hidden",transition:"all .2s",cursor:"default"}}
                  onMouseOver={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.borderColor="rgba(16,185,129,.25)";}}
                  onMouseOut={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor=C.border;}}>
                  <div style={{position:"relative",height:195,overflow:"hidden",background:"#0b1120"}}>
                    <img src={b.cover} alt={b.title} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} onError={e=>{e.target.src="https://placehold.co/180x195/131f35/10b981?text=📖";}}/>
                    <span style={{position:"absolute",top:8,right:8,...badge(b.available>0?"Available":"Borrowed")}}>{b.available>0?`${b.available} left`:"Out"}</span>
                  </div>
                  <div style={{padding:13}}>
                    <div style={{fontSize:13,fontWeight:600,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginBottom:3}}>{b.title}</div>
                    <div style={{fontSize:11,color:C.muted,marginBottom:3}}>{b.author}</div>
                    <div style={{fontSize:10,color:C.em,textTransform:"uppercase",letterSpacing:".08em",marginBottom:10}}>{b.cat}</div>
                    <div style={{display:"flex",gap:6}}>
                      {b.available>0
                        ? <button onClick={()=>user.role==="admin"?setModal({type:"issue",book:b}):showToast("Contact admin to issue books","error")} style={{flex:1,padding:7,background:"rgba(16,185,129,.1)",border:`1px solid rgba(16,185,129,.2)`,borderRadius:7,color:C.em,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>📤 Issue</button>
                        : <button style={{flex:1,padding:7,background:"rgba(255,255,255,.04)",border:`1px solid ${C.border}`,borderRadius:7,color:C.muted,fontSize:11,cursor:"not-allowed",fontFamily:"inherit"}}>Not Available</button>
                      }
                      {user.role==="admin"&&<>
                        <button onClick={()=>setModal({type:"editBook",book:b})} style={{padding:"7px 9px",background:"rgba(255,255,255,.05)",border:`1px solid ${C.border}`,borderRadius:7,cursor:"pointer",fontSize:12}}>✏️</button>
                        <button onClick={()=>handleDeleteBook(b.id)} style={{padding:"7px 9px",background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.15)",borderRadius:7,cursor:"pointer",fontSize:12}}>🗑️</button>
                      </>}
                    </div>
                  </div>
                </div>
              ))}
            </div>}
          </>}

          {/* ─── MEMBERS ─── */}
          {page==="members"&&<>
            <div style={{display:"flex",gap:12,marginBottom:20}}>
              <input placeholder="🔍  Search members..." style={{flex:1,...inp}} value={search} onChange={e=>setSearch(e.target.value)}/>
              {user.role==="admin"&&<button onClick={()=>setModal({type:"addMember"})} style={{...greenBtn,padding:"10px 20px",fontSize:14}}>+ Add Member</button>}
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{background:"rgba(255,255,255,.02)"}}>{["Member","Phone","Joined","Borrowed","Status","Actions"].map(h=><th key={h} style={{padding:"12px 16px",textAlign:"left",fontSize:11,fontWeight:500,color:C.muted,textTransform:"uppercase",letterSpacing:".08em",borderBottom:`1px solid ${C.border}`}}>{h}</th>)}</tr></thead>
                <tbody>
                  {filteredMembers.map((m,i)=>{
                    const mb=borrows.filter(b=>b.userId===m.id&&b.status==="active").length;
                    return <tr key={i}>
                      <td style={{padding:"13px 16px",borderBottom:`1px solid rgba(255,255,255,.03)`}}>
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <div style={{width:36,height:36,borderRadius:"50%",background:AC[i%6],display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:"#fff",flexShrink:0}}>{m.name[0]}</div>
                          <div><div style={{fontSize:13,fontWeight:500,color:C.text}}>{m.name}</div><div style={{fontSize:11,color:C.muted,marginTop:2}}>{m.email}</div></div>
                        </div>
                      </td>
                      <td style={{padding:"13px 16px",fontSize:12,color:C.muted,borderBottom:`1px solid rgba(255,255,255,.03)`}}>{m.phone||"—"}</td>
                      <td style={{padding:"13px 16px",fontSize:12,color:C.muted,borderBottom:`1px solid rgba(255,255,255,.03)`}}>{m.joinDate}</td>
                      <td style={{padding:"13px 16px",borderBottom:`1px solid rgba(255,255,255,.03)`}}><span style={{background:"rgba(99,102,241,.12)",color:"#818cf8",padding:"2px 10px",borderRadius:99,fontSize:12,fontWeight:600}}>{mb}</span></td>
                      <td style={{padding:"13px 16px",borderBottom:`1px solid rgba(255,255,255,.03)`}}><span style={badge("active")}>Active</span></td>
                      <td style={{padding:"13px 16px",borderBottom:`1px solid rgba(255,255,255,.03)`}}>
                        {user.role==="admin"&&<button onClick={()=>handleDeleteUser(m.id)} style={{background:"rgba(239,68,68,.08)",border:"1px solid rgba(239,68,68,.15)",borderRadius:7,cursor:"pointer",padding:"5px 9px",fontSize:12,color:"#f87171",fontFamily:"inherit"}}>🗑️ Delete</button>}
                      </td>
                    </tr>;
                  })}
                </tbody>
              </table>
              {filteredMembers.length===0&&<div style={{textAlign:"center",padding:"40px 0",color:C.muted}}>No members found</div>}
            </div>
          </>}

          {/* ─── BORROW RECORDS ─── */}
          {page==="borrow"&&<>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
              {[["Total",borrows.length,"#e2e8f0"],["Active",borrows.filter(b=>b.status==="active").length,C.em],["Overdue",borrows.filter(b=>b.status==="overdue").length,C.red],["Returned",borrows.filter(b=>b.status==="returned").length,"#94a3b8"]].map(([l,v,c])=>(
                <div key={l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 20px"}}><div style={{fontSize:26,fontWeight:700,color:c,lineHeight:1}}>{v}</div><div style={{fontSize:12,color:C.muted,marginTop:4}}>{l}</div></div>
              ))}
            </div>
            <div style={{display:"flex",gap:8,marginBottom:16}}>
              {["all","active","overdue","returned"].map(f=><button key={f} onClick={()=>setFilterStatus(f)} style={{padding:"6px 14px",background:filterStatus===f?"rgba(16,185,129,.12)":"rgba(255,255,255,.04)",border:filterStatus===f?`1px solid rgba(16,185,129,.35)`:`1px solid ${C.border}`,borderRadius:100,fontSize:12,color:filterStatus===f?C.em:C.muted,cursor:"pointer",fontFamily:"inherit",fontWeight:filterStatus===f?600:400}}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>)}
            </div>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{background:"rgba(255,255,255,.02)"}}>{["Member","Book","Issue Date","Due Date","Return Date","Status","Action"].map(h=><th key={h} style={{padding:"11px 14px",textAlign:"left",fontSize:11,fontWeight:500,color:C.muted,textTransform:"uppercase",letterSpacing:".08em",borderBottom:`1px solid ${C.border}`}}>{h}</th>)}</tr></thead>
                <tbody>
                  {filteredBorrows.length===0?<tr><td colSpan={7} style={{textAlign:"center",padding:"40px",color:C.muted}}>No records found</td></tr>:
                  filteredBorrows.map((b,i)=>{
                    const u=users.find(u=>u.id===b.userId); const bk=books.find(bk=>bk.id===b.bookId);
                    return <tr key={i}>
                      <td style={{padding:"11px 14px",borderBottom:`1px solid rgba(255,255,255,.03)`}}>
                        <div style={{display:"flex",alignItems:"center",gap:9}}><div style={{width:30,height:30,borderRadius:"50%",background:AC[i%6],display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#fff",flexShrink:0}}>{u?.name?.[0]||"?"}</div><span style={{fontSize:13,fontWeight:500,color:C.text}}>{u?.name||"Unknown"}</span></div>
                      </td>
                      <td style={{padding:"11px 14px",fontSize:13,color:"rgba(255,255,255,.7)",borderBottom:`1px solid rgba(255,255,255,.03)`,maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{bk?.title||"Unknown"}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:C.muted,borderBottom:`1px solid rgba(255,255,255,.03)`}}>{b.issueDate}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:b.status==="overdue"?"#f87171":C.muted,borderBottom:`1px solid rgba(255,255,255,.03)`}}>{b.dueDate}</td>
                      <td style={{padding:"11px 14px",fontSize:12,color:C.muted,borderBottom:`1px solid rgba(255,255,255,.03)`}}>{b.returnDate||"—"}</td>
                      <td style={{padding:"11px 14px",borderBottom:`1px solid rgba(255,255,255,.03)`}}><span style={badge(b.status)}>{b.status.charAt(0).toUpperCase()+b.status.slice(1)}</span></td>
                      <td style={{padding:"11px 14px",borderBottom:`1px solid rgba(255,255,255,.03)`}}>
                        {b.status!=="returned"
                          ?<button onClick={()=>handleReturn(b.id)} style={{padding:"5px 12px",background:"rgba(16,185,129,.1)",border:`1px solid rgba(16,185,129,.2)`,borderRadius:8,color:C.em,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>✓ Return</button>
                          :<span style={{fontSize:12,color:C.muted}}>✓ Done</span>
                        }
                      </td>
                    </tr>;
                  })}
                </tbody>
              </table>
            </div>
          </>}

          {/* ─── REPORTS ─── */}
          {page==="reports"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:22}}>
                <div style={{fontSize:16,fontWeight:600,color:"#fff",marginBottom:18}}>📊 Summary</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                  {[[books.length,"Total Books",C.em],[users.filter(u=>u.role==="member").length,"Members",C.purple],[borrows.filter(b=>b.status==="active").length,"Active Borrows",C.amber],[borrows.filter(b=>b.status==="overdue").length,"Overdue",C.red]].map(([v,l,c],i)=>(
                    <div key={i} style={{background:"rgba(255,255,255,.03)",border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 16px"}}><div style={{fontSize:24,fontWeight:700,color:c,lineHeight:1}}>{v}</div><div style={{fontSize:11,color:C.muted,marginTop:4,textTransform:"uppercase",letterSpacing:".07em"}}>{l}</div></div>
                  ))}
                </div>
              </div>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:22}}>
                <div style={{fontSize:16,fontWeight:600,color:"#fff",marginBottom:18}}>📚 Books by Category</div>
                {cats.filter(c=>c!=="All").map((c,i)=>{
                  const count=books.filter(b=>b.cat===c).length;
                  if(!count)return null;
                  return <div key={i} style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                    <div style={{fontSize:12,color:C.muted,width:80,flexShrink:0}}>{c}</div>
                    <div style={{flex:1,height:8,background:"rgba(255,255,255,.05)",borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",width:`${(count/books.length)*100}%`,background:C.em,borderRadius:99}}/></div>
                    <div style={{fontSize:12,color:C.em,fontWeight:600,width:20,textAlign:"right"}}>{count}</div>
                  </div>;
                })}
              </div>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:22,gridColumn:"1/-1"}}>
                <div style={{fontSize:16,fontWeight:600,color:"#fff",marginBottom:16}}>🕐 Recent Activity</div>
                {borrows.slice(-6).reverse().map((b,i)=>{
                  const u=users.find(u=>u.id===b.userId); const bk=books.find(bk=>bk.id===b.bookId);
                  return <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:b.status==="returned"?"#94a3b8":b.status==="overdue"?C.red:C.em,flexShrink:0}}/>
                    <div style={{flex:1,fontSize:13,color:"rgba(255,255,255,.65)"}}><strong style={{color:C.text}}>{u?.name}</strong> {b.status==="returned"?"returned":"borrowed"} <strong style={{color:C.text}}>{bk?.title}</strong></div>
                    <div style={{fontSize:11,color:C.muted}}>{b.issueDate}</div>
                  </div>;
                })}
                {borrows.length===0&&<div style={{textAlign:"center",padding:"20px 0",color:C.muted}}>No activity yet</div>}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ─── MODALS ─── */}
      {modal?.type==="profile"&&<ProfileModal user={user} borrows={borrows} books={books} onClose={()=>setModal(null)} onUpdate={(updated)=>{onUpdateUser(updated);setModal(null);showToast("Profile updated!");}}/>}
      {modal?.type==="issue"&&<IssueModal book={modal.book} users={users} onIssue={handleIssue} onClose={()=>setModal(null)}/>}
      {modal?.type==="addBook"&&<BookFormModal onSave={(b)=>{setBooks([...books,b]);setModal(null);showToast("Book added!");}} onClose={()=>setModal(null)}/>}
      {modal?.type==="editBook"&&<BookFormModal book={modal.book} onSave={(b)=>{setBooks(books.map(bk=>bk.id===b.id?b:bk));setModal(null);showToast("Book updated!");}} onClose={()=>setModal(null)}/>}
      {modal?.type==="addMember"&&<MemberFormModal existingUsers={users} onSave={(m)=>{setUsers([...users,m]);setModal(null);showToast("Member added!");}} onClose={()=>setModal(null)}/>}
    </div>
  );
}

// ══════════════════════════════════════════
//  MAIN APP
// ══════════════════════════════════════════
export default function App() {
  const [screen,setScreen]   = useState("login");
  const [user,setUser]       = useState(null);
  const [users,setUsers]     = useState(initUsers);
  const [books,setBooks]     = useState(initBooks);
  const [borrows,setBorrows] = useState([]);

  const handleLogin    = (u) => { setUser(u); setScreen("dashboard"); };
  const handleRegister = (f) => { const nu={id:Date.now().toString(),name:f.name,email:f.email,password:f.pass,role:f.role,phone:f.phone||"",address:"",joinDate:new Date().toLocaleDateString("en-IN",{month:"short",year:"numeric"})}; setUsers(p=>[...p,nu]); setUser(nu); setScreen("dashboard"); };
  const handleLogout   = () => { setUser(null); setScreen("login"); };
  const handleUpdateUser=(updated)=>{ setUsers(p=>p.map(u=>u.id===updated.id?updated:u)); setUser(updated); };
  const handleResetPassword=(email,newPass)=>{ setUsers(p=>p.map(u=>u.email===email?{...u,password:newPass}:u)); };

  if(screen==="dashboard"&&user) return <DashboardPage user={user} users={users} setUsers={setUsers} books={books} setBooks={setBooks} borrows={borrows} setBorrows={setBorrows} onLogout={handleLogout} onUpdateUser={handleUpdateUser}/>;
  if(screen==="forgot") return <ForgotPage users={users} onBack={()=>setScreen("login")} onReset={handleResetPassword}/>;
  if(screen==="register") return <RegisterPage users={users} onRegister={handleRegister} onGoLogin={()=>setScreen("login")}/>;
  return <LoginPage users={users} onLogin={handleLogin} onGoRegister={()=>setScreen("register")} onForgotPassword={()=>setScreen("forgot")}/>;
}