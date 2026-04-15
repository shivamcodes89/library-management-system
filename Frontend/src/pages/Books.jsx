import { useState } from "react";

const SAMPLE_BOOKS = [
  { _id:"1", title:"The Great Gatsby",       author:"F. Scott Fitzgerald", category:"Fiction",   isbn:"978-0743273565", totalCopies:3, available:2, cover:"https://covers.openlibrary.org/b/id/8739161-M.jpg" },
  { _id:"2", title:"To Kill a Mockingbird",  author:"Harper Lee",           category:"Classic",   isbn:"978-0061935466", totalCopies:2, available:0, cover:"https://covers.openlibrary.org/b/id/8228691-M.jpg" },
  { _id:"3", title:"1984",                   author:"George Orwell",        category:"Dystopia",  isbn:"978-0451524935", totalCopies:4, available:3, cover:"https://covers.openlibrary.org/b/id/7222246-M.jpg" },
  { _id:"4", title:"Harry Potter & Sorcerer",author:"J.K. Rowling",         category:"Fantasy",   isbn:"978-0439708180", totalCopies:5, available:2, cover:"https://covers.openlibrary.org/b/id/10110415-M.jpg"},
  { _id:"5", title:"The Alchemist",          author:"Paulo Coelho",         category:"Fiction",   isbn:"978-0062315007", totalCopies:3, available:3, cover:"https://covers.openlibrary.org/b/id/8479576-M.jpg" },
  { _id:"6", title:"Sapiens",               author:"Yuval Noah Harari",    category:"History",   isbn:"978-0062316097", totalCopies:2, available:1, cover:"https://covers.openlibrary.org/b/id/9255566-M.jpg" },
  { _id:"7", title:"Atomic Habits",         author:"James Clear",          category:"Self-Help", isbn:"978-0735211292", totalCopies:4, available:4, cover:"https://covers.openlibrary.org/b/id/10519478-M.jpg"},
  { _id:"8", title:"The Hobbit",            author:"J.R.R. Tolkien",       category:"Fantasy",   isbn:"978-0547928227", totalCopies:3, available:1, cover:"https://covers.openlibrary.org/b/id/8406786-M.jpg" },
];

const EMPTY = { title:"", author:"", isbn:"", category:"Fiction", totalCopies:1 };

export default function Books() {
  const [books, setBooks]       = useState(SAMPLE_BOOKS);
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [form, setForm]         = useState(EMPTY);
  const [view, setView]         = useState("grid"); // grid | table

  const categories = ["All","Fiction","Classic","Dystopia","Fantasy","History","Self-Help"];

  const filtered = books.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
                        b.author.toLowerCase().includes(search.toLowerCase());
    const matchCat    = filter === "All" || b.category === filter;
    return matchSearch && matchCat;
  });

  const openAdd  = () => { setForm(EMPTY); setEditBook(null); setShowModal(true); };
  const openEdit = (b) => { setForm({title:b.title,author:b.author,isbn:b.isbn,category:b.category,totalCopies:b.totalCopies}); setEditBook(b._id); setShowModal(true); };

  const save = () => {
    if (!form.title || !form.author) return;
    if (editBook) {
      setBooks(books.map(b => b._id===editBook ? {...b,...form} : b));
    } else {
      setBooks([...books, {...form, _id:Date.now().toString(), available:form.totalCopies, cover:"https://covers.openlibrary.org/b/id/8739161-M.jpg"}]);
    }
    setShowModal(false);
  };

  const del = (id) => setBooks(books.filter(b => b._id !== id));

  return (
    <>
      <style>{`
        .bk-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px;}
        .bk-search-wrap{display:flex;gap:10px;flex:1;min-width:240px;}
        .bk-search{flex:1;padding:10px 16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;font-size:14px;color:#e2e8f0;font-family:'Outfit',sans-serif;outline:none;}
        .bk-search::placeholder{color:rgba(255,255,255,.22);}
        .bk-search:focus{border-color:rgba(16,185,129,.4);}
        .bk-add{padding:10px 20px;background:linear-gradient(135deg,#10b981,#059669);border:none;border-radius:10px;font-size:14px;font-weight:600;color:#fff;cursor:pointer;font-family:'Outfit',sans-serif;transition:all .2s;box-shadow:0 4px 14px rgba(16,185,129,.25);white-space:nowrap;}
        .bk-add:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(16,185,129,.35);}
        .bk-filters{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap;}
        .bk-filter{padding:6px 14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:100px;font-size:12px;color:rgba(255,255,255,.45);cursor:pointer;font-family:'Outfit',sans-serif;transition:all .2s;}
        .bk-filter:hover{border-color:rgba(16,185,129,.3);color:rgba(255,255,255,.7);}
        .bk-filter.act{background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.35);color:#10b981;font-weight:500;}
        .bk-view{display:flex;gap:6px;margin-bottom:20px;}
        .bk-vbtn{padding:7px 12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:8px;cursor:pointer;font-size:14px;transition:all .2s;}
        .bk-vbtn.act{background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.3);}

        /* GRID */
        .bk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:18px;}
        .bk-card{background:#131f35;border:1px solid rgba(255,255,255,.07);border-radius:14px;overflow:hidden;transition:all .25s;cursor:pointer;}
        .bk-card:hover{transform:translateY(-5px);border-color:rgba(16,185,129,.25);box-shadow:0 12px 32px rgba(0,0,0,.35);}
        .bk-img-w{position:relative;height:200px;overflow:hidden;}
        .bk-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s;}
        .bk-card:hover .bk-img{transform:scale(1.04);}
        .bk-badge{position:absolute;top:9px;right:9px;padding:3px 9px;border-radius:99px;font-size:10px;font-weight:600;}
        .bk-avail{background:rgba(16,185,129,.18);color:#10b981;border:1px solid rgba(16,185,129,.25);}
        .bk-out{background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(239,68,68,.2);}
        .bk-body{padding:14px;}
        .bk-title{font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .bk-auth{font-size:11px;color:rgba(255,255,255,.38);margin-bottom:4px;}
        .bk-cat{font-size:10px;color:#10b981;text-transform:uppercase;letter-spacing:.08em;margin-bottom:11px;}
        .bk-row2{display:flex;gap:7px;}
        .bk-ibtn{flex:1;padding:7px;background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.2);border-radius:8px;color:#10b981;font-size:11px;font-weight:500;cursor:pointer;font-family:'Outfit',sans-serif;transition:all .2s;}
        .bk-ibtn:hover{background:rgba(16,185,129,.2);}
        .bk-ebtn{padding:7px 9px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:8px;color:rgba(255,255,255,.4);font-size:12px;cursor:pointer;transition:all .2s;}
        .bk-ebtn:hover{background:rgba(255,255,255,.1);color:#fff;}

        /* TABLE */
        .bk-table-wrap{background:#131f35;border:1px solid rgba(255,255,255,.07);border-radius:14px;overflow:hidden;}
        .bk-table{width:100%;border-collapse:collapse;}
        .bk-table th{padding:13px 16px;text-align:left;font-size:11px;font-weight:500;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:.08em;border-bottom:1px solid rgba(255,255,255,.05);background:rgba(255,255,255,.02);}
        .bk-table td{padding:13px 16px;font-size:13px;color:rgba(255,255,255,.72);border-bottom:1px solid rgba(255,255,255,.04);}
        .bk-table tr:last-child td{border-bottom:none;}
        .bk-table tr:hover td{background:rgba(255,255,255,.02);}
        .bk-timg{width:34px;height:46px;border-radius:5px;object-fit:cover;border:1px solid rgba(255,255,255,.08);}
        .bk-trow{display:flex;align-items:center;gap:12px;}
        .tbadge{padding:3px 9px;border-radius:99px;font-size:11px;font-weight:500;}
        .tbadge.av{background:rgba(16,185,129,.12);color:#10b981;border:1px solid rgba(16,185,129,.2);}
        .tbadge.na{background:rgba(239,68,68,.1);color:#f87171;border:1px solid rgba(239,68,68,.15);}
        .t-act{display:flex;gap:6px;}
        .t-btn{background:none;border:none;cursor:pointer;padding:5px 7px;border-radius:7px;font-size:13px;transition:background .15s;}
        .t-btn:hover{background:rgba(255,255,255,.08);}

        /* MODAL */
        .bk-modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(4px);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;}
        .bk-modal{background:#131f35;border:1px solid rgba(16,185,129,.15);border-radius:18px;padding:32px;width:100%;max-width:460px;position:relative;animation:modalIn .2s ease;}
        @keyframes modalIn{from{opacity:0;transform:scale(.95);}to{opacity:1;transform:scale(1);}}
        .bk-modal-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:#fff;margin-bottom:24px;}
        .bk-mgrp{margin-bottom:16px;}
        .bk-mlbl{display:block;font-size:11px;font-weight:500;color:rgba(255,255,255,.38);text-transform:uppercase;letter-spacing:.1em;margin-bottom:7px;}
        .bk-minp{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:11px 14px;font-size:14px;color:#e2e8f0;font-family:'Outfit',sans-serif;outline:none;transition:all .2s;}
        .bk-minp::placeholder{color:rgba(255,255,255,.18);}
        .bk-minp:focus{border-color:rgba(16,185,129,.4);background:rgba(16,185,129,.04);}
        .bk-mrow{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .bk-mbtns{display:flex;gap:10px;margin-top:20px;}
        .bk-msave{flex:1;padding:12px;background:linear-gradient(135deg,#10b981,#059669);border:none;border-radius:10px;font-size:14px;font-weight:600;color:#fff;cursor:pointer;font-family:'Outfit',sans-serif;transition:all .2s;}
        .bk-msave:hover{transform:translateY(-1px);}
        .bk-mcancel{padding:12px 20px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:10px;font-size:14px;color:rgba(255,255,255,.5);cursor:pointer;font-family:'Outfit',sans-serif;transition:all .2s;}
        .bk-mcancel:hover{background:rgba(255,255,255,.1);}
        .bk-mclose{position:absolute;top:16px;right:16px;background:none;border:none;color:rgba(255,255,255,.3);font-size:20px;cursor:pointer;width:32px;height:32px;border-radius:8px;transition:all .2s;}
        .bk-mclose:hover{background:rgba(255,255,255,.08);color:#fff;}
        .bk-empty{text-align:center;padding:60px 20px;color:rgba(255,255,255,.3);}
        .bk-empty-ico{font-size:48px;margin-bottom:12px;}
      `}</style>

      {/* TOOLBAR */}
      <div className="bk-top">
        <div className="bk-search-wrap">
          <input className="bk-search" placeholder="🔍  Search books or authors..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button className={`bk-vbtn ${view==="grid"?"act":""}`} onClick={()=>setView("grid")}>▦ Grid</button>
          <button className={`bk-vbtn ${view==="table"?"act":""}`} onClick={()=>setView("table")}>☰ Table</button>
          <button className="bk-add" onClick={openAdd}>+ Add Book</button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bk-filters">
        {categories.map(c=>(
          <button key={c} className={`bk-filter ${filter===c?"act":""}`} onClick={()=>setFilter(c)}>{c}</button>
        ))}
      </div>

      {/* GRID VIEW */}
      {view==="grid" && (
        filtered.length === 0
          ? <div className="bk-empty"><div className="bk-empty-ico">📚</div><div>No books found</div></div>
          : <div className="bk-grid">
              {filtered.map(b=>(
                <div key={b._id} className="bk-card">
                  <div className="bk-img-w">
                    <img src={b.cover} alt={b.title} className="bk-img" onError={e=>{e.target.src="https://placehold.co/180x200/131f35/10b981?text=📖";}}/>
                    <span className={`bk-badge ${b.available>0?"bk-avail":"bk-out"}`}>{b.available>0?`${b.available} left`:"Out"}</span>
                  </div>
                  <div className="bk-body">
                    <div className="bk-title">{b.title}</div>
                    <div className="bk-auth">{b.author}</div>
                    <div className="bk-cat">{b.category}</div>
                    <div className="bk-row2">
                      <button className="bk-ibtn">{b.available>0?"Issue":"Return"}</button>
                      <button className="bk-ebtn" onClick={()=>openEdit(b)}>✏️</button>
                      <button className="bk-ebtn" onClick={()=>del(b._id)}>🗑️</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
      )}

      {/* TABLE VIEW */}
      {view==="table" && (
        <div className="bk-table-wrap">
          <table className="bk-table">
            <thead><tr><th>Book</th><th>Category</th><th>ISBN</th><th>Copies</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(b=>(
                <tr key={b._id}>
                  <td><div className="bk-trow"><img src={b.cover} className="bk-timg" onError={e=>{e.target.src="https://placehold.co/34x46/131f35/10b981?text=📖";}}/><div><div style={{fontWeight:500,color:"#e2e8f0"}}>{b.title}</div><div style={{fontSize:11,color:"rgba(255,255,255,.38)",marginTop:2}}>{b.author}</div></div></div></td>
                  <td style={{color:"#10b981",fontSize:12}}>{b.category}</td>
                  <td style={{color:"rgba(255,255,255,.38)",fontSize:12}}>{b.isbn}</td>
                  <td>{b.available}/{b.totalCopies}</td>
                  <td><span className={`tbadge ${b.available>0?"av":"na"}`}>{b.available>0?"Available":"Out of Stock"}</span></td>
                  <td><div className="t-act"><button className="t-btn">📤</button><button className="t-btn" onClick={()=>openEdit(b)}>✏️</button><button className="t-btn" onClick={()=>del(b._id)}>🗑️</button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="bk-modal-bg" onClick={e=>{if(e.target===e.currentTarget)setShowModal(false);}}>
          <div className="bk-modal">
            <button className="bk-mclose" onClick={()=>setShowModal(false)}>✕</button>
            <div className="bk-modal-title">{editBook?"Edit Book":"Add New Book"}</div>
            <div className="bk-mgrp"><label className="bk-mlbl">Book Title</label><input className="bk-minp" placeholder="Enter title..." value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></div>
            <div className="bk-mgrp"><label className="bk-mlbl">Author</label><input className="bk-minp" placeholder="Author name..." value={form.author} onChange={e=>setForm({...form,author:e.target.value})}/></div>
            <div className="bk-mrow">
              <div className="bk-mgrp"><label className="bk-mlbl">ISBN</label><input className="bk-minp" placeholder="978-..." value={form.isbn} onChange={e=>setForm({...form,isbn:e.target.value})}/></div>
              <div className="bk-mgrp"><label className="bk-mlbl">Copies</label><input className="bk-minp" type="number" min="1" value={form.totalCopies} onChange={e=>setForm({...form,totalCopies:parseInt(e.target.value)||1})}/></div>
            </div>
            <div className="bk-mgrp">
              <label className="bk-mlbl">Category</label>
              <select className="bk-minp" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                {["Fiction","Classic","Dystopia","Fantasy","History","Self-Help","Science","Biography"].map(c=><option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="bk-mbtns">
              <button className="bk-mcancel" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="bk-msave" onClick={save}>{editBook?"Save Changes":"Add Book"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}