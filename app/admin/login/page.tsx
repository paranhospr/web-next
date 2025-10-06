
"use client";
import { useState } from "react";
export default function Login() {
  const [email,setEmail]=useState("admin@paranhospr.com.br");
  const [password,setPassword]=useState("Admin2024Paranhos");
  async function onSubmit(e:React.FormEvent){
    e.preventDefault();
    const csrf = await fetch("/api/auth/csrf").then(r=>r.json());
    await fetch("/api/auth/callback/credentials",{
      method:"POST",
      headers:{ "Content-Type":"application/x-www-form-urlencoded" },
      body:new URLSearchParams({ csrfToken:csrf.csrfToken,email,password,json:"true" }),
      redirect:"follow"
    });
    location.href="/admin/dashboard";
  }
  return (
    <main className="container">
      <h1>Login admin</h1>
      <form onSubmit={onSubmit}>
        <div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/></div>
        <div style={{marginTop:8}}><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Senha"/></div>
        <div style={{marginTop:12}}><button type="submit">Entrar</button></div>
      </form>
    </main>
  );
}
