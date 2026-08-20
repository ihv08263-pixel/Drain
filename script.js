const items=document.querySelectorAll('.steps article,.benefits article,.product-card,.ready,.feature,.hero-card');
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
items.forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=(i%3)*70+'ms';obs.observe(el)});
document.querySelectorAll('.bottom-nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelectorAll('.bottom-nav a').forEach(x=>x.classList.remove('active'));a.classList.add('active')}));
