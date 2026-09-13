const WEBHOOK_URL='https://n8n-3ceafyuyasrd.litium.sumopod.my.id/webhook/bfaa35ad-1766-46c1-8376-cbd7d66e4a79';

if(window.lucide) lucide.createIcons();

const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>navbar.classList.toggle('scrolled',window.scrollY>30));

const toggle=document.getElementById('menuToggle');
const menu=document.getElementById('mobileMenu');

toggle?.addEventListener('click',()=>{
  const open=menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded',open);
  toggle.innerHTML=`<i data-lucide="${open?'x':'menu'}"></i>`;
  lucide.createIcons();
});

menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded','false');
  toggle.innerHTML='<i data-lucide="menu"></i>';
  lucide.createIcons();
}));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){
    e.target.classList.add('visible');
    observer.unobserve(e.target);
  }
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.getElementById('year').textContent=new Date().getFullYear();

const form=document.getElementById('contactForm');
const error=document.getElementById('formError');
const success=document.getElementById('formSuccess');
const submit=document.getElementById('submitButton');
const sendAnother=document.getElementById('sendAnother');

form?.addEventListener('submit',async e=>{
  e.preventDefault();
  error.classList.add('hidden');
  submit.disabled=true;
  submit.innerHTML='<i data-lucide="loader-circle"></i><span>Mengirim Pesan...</span>';
  lucide.createIcons();

  const payload={
    name:document.getElementById('name').value,
    email:document.getElementById('email').value,
    message:document.getElementById('message').value,
    timestamp:new Date().toISOString(),
    source:'ECOTECH STORE Website'
  };

  try{
    const res=await fetch(WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    if(!res.ok) throw new Error('Webhook error');
    form.reset();
    form.classList.add('hidden');
    success.classList.remove('hidden');
  }catch(err){
    console.error(err);
    error.classList.remove('hidden');
  }finally{
    submit.disabled=false;
    submit.innerHTML='<i data-lucide="send"></i><span>Kirim Pesan</span>';
    lucide.createIcons();
  }
});

sendAnother?.addEventListener('click',()=>{
  success.classList.add('hidden');
  form.classList.remove('hidden');
  document.getElementById('name').focus();
});
