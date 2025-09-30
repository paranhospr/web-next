export default function Section({ title, children }:{ title:string; children:React.ReactNode }) {
  return (
    <section style={{padding:'28px 0',borderTop:'1px solid #e5e7eb'}}>
      <div className="container">
        <h2 style={{margin:'0 0 10px 0'}}>{title}</h2>
        {children}
      </div>
    </section>
  )
}