'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Login(){
  const [email,setEmail]=useState('admin@paranhospr.com.br')
  const [password,setPassword]=useState('admin123')
  const [err,setErr]=useState<string|null>(null)
  const r=useRouter()
  async function submit(e:any){
    e.preventDefault(); setErr(null)
    const res=await signIn('credentials',{redirect:false,email,password,callbackUrl:'/admin/dashboard'})
    if(res?.ok){ r.push('/admin/dashboard') } else { setErr('Credenciais inválidas') }
  }
  return (
    <main style={{minHeight:'100vh',display:'grid',placeItems:'center',fontFamily:'system-ui'}}>
      <form onSubmit={submit} style={{width:360}}>
        <h1 style={{fontSize:24,fontWeight:700,marginBottom:12}}>Acesso Administrativo</h1>
        <label style={{fontSize:12,opacity:.7}}>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:10,border:'1px solid #ddd',borderRadius:10,marginBottom:10}}/>
        <label style={{fontSize:12,opacity:.7}}>Senha</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',padding:10,border:'1px solid #ddd',borderRadius:10,marginBottom:12}}/>
        {err && <div style={{color:'#b00',fontSize:12,marginBottom:10}}>{err}</div>}
        <button style={{width:'100%',padding:12,borderRadius:10,background:'#111',color:'#fff',fontWeight:700}}>Entrar</button>
      </form>
    </main>
  )
}