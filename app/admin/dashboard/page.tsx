
"use client";
import { useEffect,useState } from "react";
export default function Dashboard(){
  const [ok,setOk]=useState<boolean|null>(null);
  useEffect(()=>{ fetch("/api/auth/session").then(r=>r.json()).then(s=>setOk(Boolean(s?.user))).catch(()=>setOk(false)) },[]);
  if(ok===null) return <main className="container">Verificando sessão…</main>;
  if(!ok){ if(typeof window!=="undefined") window.location.href="/admin/login"; return <main className="container">Redirecionando…</main>; }
  return (<main className="container"><h1>Dashboard</h1><p>Login OK. Sessão válida.</p></main>);
}
