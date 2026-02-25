
const fmt = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
let amount = 50000;
const slider = document.getElementById('months');
function updateCalc(){
  const months = Number(slider?.value || 12);
  const pill = document.getElementById('months-pill');
  if(pill) pill.textContent = `${months} months`;
  document.querySelectorAll('.result-card strong').forEach(el=>{
    const r = Number(el.dataset.rate);
    el.textContent = fmt.format(amount * Math.pow(1+r, months));
  });
}
document.querySelectorAll('.segmented .amt').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.segmented .amt').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active'); amount = Number(btn.dataset.amount); updateCalc();
}));
slider?.addEventListener('input',updateCalc);updateCalc();

function closeAllLang(){document.querySelectorAll('.lang-dropdown').forEach(d=>{d.classList.remove('open');d.querySelector('.lang-trigger')?.setAttribute('aria-expanded','false');});}
document.querySelectorAll('.lang-trigger').forEach(btn=>btn.addEventListener('click',e=>{e.stopPropagation();const p=btn.closest('.lang-dropdown');const open=p.classList.toggle('open');btn.setAttribute('aria-expanded',open);}))
document.addEventListener('click',closeAllLang);

const drawer = document.querySelector('.mobile-drawer'); const burger = document.querySelector('.burger'); const closeBtn = document.querySelector('.drawer-close');
let trapNodes=[];
function setTrap(container){trapNodes=[...container.querySelectorAll('a,button,input,[tabindex]:not([tabindex="-1"])')];}
function handleTrap(e){if(!drawer?.classList.contains('open')||e.key!=='Tab'||trapNodes.length===0)return;const f=trapNodes[0],l=trapNodes.at(-1);if(e.shiftKey&&document.activeElement===f){e.preventDefault();l.focus();}else if(!e.shiftKey&&document.activeElement===l){e.preventDefault();f.focus();}}
function openDrawer(){drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');burger.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';setTrap(drawer.querySelector('.drawer-panel'));trapNodes[0]?.focus();}
function closeDrawer(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');burger.setAttribute('aria-expanded','false');document.body.style.overflow='';burger.focus();}
burger?.addEventListener('click',openDrawer);closeBtn?.addEventListener('click',closeDrawer);
drawer?.addEventListener('click',e=>{if(e.target===drawer)closeDrawer();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDrawer();closeModal();}handleTrap(e);});

document.querySelectorAll('.faq-q').forEach(btn=>btn.addEventListener('click',()=>{
  const item = btn.closest('.faq-item'); document.querySelectorAll('.faq-item').forEach(i=>{if(i!==item){i.classList.remove('open');i.querySelector('.faq-q').setAttribute('aria-expanded','false');}});
  const open = item.classList.toggle('open'); btn.setAttribute('aria-expanded',open);
}));

const modal=document.getElementById('privacy-modal'); const modalOpen=document.querySelector('[data-modal-open]');
function openModal(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';modal.querySelector('.modal-x').focus();}
function closeModal(){modal?.classList.remove('open');modal?.setAttribute('aria-hidden','true');document.body.style.overflow='';}
modalOpen?.addEventListener('click',openModal);document.querySelectorAll('[data-modal-close]').forEach(b=>b.addEventListener('click',closeModal));modal?.addEventListener('click',e=>{if(e.target===modal)closeModal();});

const io = new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
