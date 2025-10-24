// bdc-nav.js — Big Dogs Don't Cry desktop navigation bar test
(function(){
  class BdcNav extends HTMLElement {
    constructor(){
      super();
      const root = this.attachShadow({mode:'open'});
      root.innerHTML = `
<style>
:host{
  display:block;
  --pink:#ff4f7b; --hover:#4f8cff; --text:#ff4f7b;
  --font:18px; --gap:40px;
}
.bdc-nav{width:100%;display:flex;align-items:center;justify-content:center;padding:10px 8px}
.bdc-menu{list-style:none;display:flex;gap:var(--gap);padding:0;margin:0}
.bdc-link,.bdc-toggle{font-family:Poppins,system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;
  font-size:var(--font);line-height:1.25;color:var(--text);background:transparent;border:0;padding:6px 0;
  cursor:pointer;text-decoration:none;font-weight:400}
.bdc-link:hover,.bdc-toggle:hover,.bdc-link:focus,.bdc-toggle:focus{color:var(--hover);outline:0}
.has-submenu>.bdc-toggle::after{content:"▾";font-size:12px;margin-left:6px;position:relative;top:-1px}
.submenu{display:none;list-style:none;padding:8px 0;margin-top:10px;position:absolute;background:#fff;
  border:1px solid #f1d3dc;border-radius:8px;box-shadow:0 6px 20px rgba(0,0,0,.12)}
.has-submenu.open>.submenu{display:block}
@media (max-width:900px){:host{display:none !important}}
</style>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet">

<div class="bdc-nav">
  <ul class="bdc-menu">
    <li><a class="bdc-link" href="https://www.bigdogsdontcry.com/" target="_top">Home</a></li>

    <li class="has-submenu">
      <button class="bdc-toggle">Applications</button>
      <ul class="submenu">
        <li><a class="bdc-link" href="https://www.bigdogsdontcry.com/volunteer-application" target="_top">Volunteer</a></li>
        <li><a class="bdc-link" href="https://www.bigdogsdontcry.com/adoption-application" target="_top">Adoption</a></li>
        <li><a class="bdc-link" href="https://www.bigdogsdontcry.com/foster-application" target="_top">Foster</a></li>
      </ul>
    </li>

    <li><a class="bdc-link" href="https://www.bigdogsdontcry.com/adoptable" target="_top">View Pets</a></li>
    <li><a class="bdc-link" href="https://www.bigdogsdontcry.com/events" target="_top">Events</a></li>

    <li class="has-submenu">
      <button class="bdc-toggle">About Us</button>
      <ul class="submenu">
        <li><a class="bdc-link" href="https://www.bigdogsdontcry.com/contact-us-now" target="_top">Contact Us</a></li>
        <li><a class="bdc-link" href="https://www.bigdogsdontcry.com/who-we-are" target="_top">Who We Are</a></li>
      </ul>
    </li>

    <li class="has-submenu">
      <button class="bdc-toggle">Photo Contest</button>
      <ul class="submenu">
        <li><a class="bdc-link" href="https://www.bigdogsdontcry.com/photo-contest-submission" target="_top">Submit Photo</a></li>
        <li><a class="bdc-link" href="https://www.bigdogsdontcry.com/photo-contest" target="_top">Photo Contest</a></li>
      </ul>
    </li>

    <li class="has-submenu">
      <button class="bdc-toggle">Partners</button>
      <ul class="submenu">
        <li><a class="bdc-link" href="https://www.bigdogsdontcry.com/dna-my-dog" target="_top">DNA my Dog</a></li>
        <li><a class="bdc-link" href="https://www.bigdogsdontcry.com/down-south-doggies" target="_top">Down South Doggies</a></li>
      </ul>
    </li>
  </ul>
</div>
`;
    }

    connectedCallback(){
      const root = this.shadowRoot;
      root.querySelectorAll('.has-submenu').forEach(li=>{
        const btn=li.querySelector('.bdc-toggle');
        btn.addEventListener('click',()=>{
          li.classList.toggle('open');
        });
      });
    }
  }

  if(!customElements.get('bdc-nav')) customElements.define('bdc-nav',BdcNav);

  document.addEventListener('DOMContentLoaded',()=>{
    if(!document.querySelector('bdc-nav')){
      const el=document.createElement('bdc-nav');
      const mount=document.getElementById('bdcNavMount')||document.querySelector('header')||document.body;
      mount.prepend(el);
    }
  });
})();
