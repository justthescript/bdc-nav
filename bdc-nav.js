// bdc-nav.js — desktop nav with portal dropdowns; hidden under 901 so native mobile menu owns phones
(function () {
  const PORTAL_CSS = `
.bdc-portal{position:fixed;inset:0;z-index:2147483647;pointer-events:none}
.bdc-portal .bdc-clone{position:fixed;display:block;margin:0;pointer-events:auto;
  background:#fff;border:1px solid #f4d0da;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.12);min-width:220px}
.bdc-portal .bdc-clone a{display:block;padding:10px 14px;color:#ff4f7b;text-decoration:none;white-space:nowrap;font:16px/1.3 Poppins,system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif}
.bdc-portal .bdc-clone a:hover,.bdc-portal .bdc-clone a:focus{background:#fff4f7;color:#4f8cff;outline:0}
.bdc-backdrop{position:fixed;inset:0;background:transparent;z-index:2147483646;display:none}
`;

  class BdcNav extends HTMLElement {
    constructor(){
      super();
      this._portal = null;
      this._backdrop = null;
      this._openClone = null;

      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
<style>
  :host{
    display:block; position:relative; z-index:2000;
    --pink:#ff4f7b; --hover:#4f8cff; --text:#ff4f7b;
    --font:18px; --gap:40px; --submenu-width:220px;
  }
  .bd-nav{width:100%;display:flex;align-items:center;justify-content:center;padding:10px 8px}
  .bd-menu{list-style:none;display:flex;gap:var(--gap);padding:0;margin:0}
  .bd-link,.bd-toggle{font-family:Poppins,system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;
    font-size:var(--font);line-height:1.25;color:var(--text);background:transparent;border:0;padding:6px 0;cursor:pointer;text-decoration:none;font-weight:400}
  .bd-link:hover,.bd-toggle:hover,.bd-link:focus,.bd-toggle:focus{color:var(--hover);outline:0}
  .has-submenu{position:relative}
  .has-submenu>.bd-toggle::after{content:"▾";font-size:12px;margin-left:6px;position:relative;top:-1px}
  .submenu{display:none;list-style:none;padding:8px 0;margin-top:10px;min-width:var(--submenu-width)}
  .has-submenu:hover > .submenu { display:none !important; } /* click only */

  @media (max-width:900px){
    :host{ display:none !important; } /* let native Wix mobile menu own phones and tablets */
  }
</style>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet">

<div class="bd-nav">
  <ul class="bd-menu" role="menubar">
    <li><a class="bd-link" href="https://www.bigdogsdontcry.com/" target="_top">Home</a></li>

    <li class="has-submenu">
      <button class="bd-toggle" type="button" aria-haspopup="true" aria-expanded="false">Applications</button>
      <ul class="submenu" role="menu">
        <li><a href="https://www.bigdogsdontcry.com/volunteer-application" target="_top">Volunteer</a></li>
        <li><a href="https://www.bigdogsdontcry.com/adoption-application" target="_top">Adoption</a></li>
        <li><a href="https://www.bigdogsdontcry.com/foster-application" target="_top">Foster</a></li>
      </ul>
    </li>

    <li><a class="bd-link" href="https://www.bigdogsdontcry.com/adoptable" target="_top">View Pets</a></li>
    <li><a class="bd-link" href="https://www.bigdogsdontcry.com/events" target="_top">Events</a></li>

    <li class="has-submenu">
      <button class="bd-toggle" type="button" aria-haspopup="true" aria-expanded="false">About Us</button>
      <ul class="submenu" role="menu">
        <li><a href="https://www.bigdogsdontcry.com/contact-us-now" target="_top">Contact Us</a></li>
        <li><a href="https://www.bigdogsdontcry.com/who-we-are" target="_top">Who We Are</a></li>
      </ul>
    </li>

    <li class="has-submenu">
      <button class="bd-toggle" type="button" aria-haspopup="true" aria-expanded="false">Photo Contest</button>
      <ul class="submenu" role="menu">
        <li><a href="https://www.bigdogsdontcry.com/photo-contest-submission" target="_top">Submit Photo</a></li>
        <li><a href="https://www.bigdogsdontcry.com/photo-contest" target="_top">Photo Contest</a></li>
      </ul>
    </li>

    <li class="has-submenu">
      <button class="bd-toggle" type="button" aria-haspopup="true" aria-expanded="false">Partners</button>
      <ul class="submenu" role="menu">
        <li><a href="https://www.bigdogsdontcry.com/dna-my-dog" target="_top">DNA my Dogs</a></li>
        <li><a href="https://www.bigdogsdontcry.com/down-south-doggies" target="_top">Down South Doggies</a></li>
      </ul>
    </li>
  </ul>
</div>
`;
    }

    connectedCallback(){
      // Inject portal style and root only once
      if (!document.querySelector('.bdc-portal')) {
        const style = document.createElement('style'); style.textContent = PORTAL_CSS;
        const portal = document.createElement('div'); portal.className = 'bdc-portal';
        document.head.appendChild(style); document.body.appendChild(portal);
      }
      this._portal = document.querySelector('.bdc-portal');

      // Backdrop
      if (!document.querySelector('.bdc-backdrop')) {
        const bd = document.createElement('div'); bd.className = 'bdc-backdrop';
        document.body.appendChild(bd);
      }
      this._backdrop = document.querySelector('.bdc-backdrop');

      const root = this.shadowRoot;
      const parents = root.querySelectorAll('.has-submenu');

      const closeAll = () => {
        parents.forEach(li => li.classList.remove('open'));
        if (this._openClone) { this._openClone.remove(); this._openClone = null; }
        if (this._backdrop) this._backdrop.style.display = 'none';
      };
      this._closeAll = closeAll;

      const openClone = (btn, originalMenu) => {
        const clone = originalMenu.cloneNode(true);
        clone.classList.add('bdc-clone');

        const r = btn.getBoundingClientRect();
        const width = Math.max(220, originalMenu.offsetWidth || 220);
        const left = Math.max(8, Math.min(Math.round(r.left + r.width/2 - width/2), window.innerWidth - width - 8));
        const top  = Math.round(r.bottom + 8);

        clone.style.minWidth = width + 'px';
        clone.style.left = left + 'px';
        clone.style.top  = top  + 'px';

        this._portal.appendChild(clone);
        this._openClone = clone;
        this._backdrop.style.display = 'block';

        clone.addEventListener('click', e => e.stopPropagation());
      };

      parents.forEach(li => {
        const btn = li.querySelector('.bd-toggle');
        const menu = li.querySelector('.submenu');
        if (!li._bdcClick) {
          li._bdcClick = e => {
            e.stopPropagation();
            const wasOpen = li.classList.contains('open');
            closeAll();
            if (!wasOpen) { li.classList.add('open'); openClone(btn, menu); }
          };
          btn.addEventListener('click', li._bdcClick);
        }
      });

      // Global closers
      this._onDocClick = () => closeAll();
      this._onEsc = e => { if (e.key === 'Escape') closeAll(); };
      this._onReflow = () => closeAll();

      document.addEventListener('click', this._onDocClick);
      document.addEventListener('keydown', this._onEsc);
      window.addEventListener('scroll', this._onReflow, { passive:true });
      window.addEventListener('resize', this._onReflow);

      // Tear down overlays whenever page width is small
      const mql = window.matchMedia('(max-width:900px)');
      const handleSmall = e => {
        if (e.matches) {
          if (this._openClone) { this._openClone.remove(); this._openClone = null; }
          if (this._backdrop) this._backdrop.style.display = 'none';
        }
      };
      handleSmall(mql);
      mql.addEventListener('change', handleSmall);
    }

    disconnectedCallback(){
      document.removeEventListener('click', this._onDocClick);
      document.removeEventListener('keydown', this._onEsc);
      window.removeEventListener('scroll', this._onReflow);
      window.removeEventListener('resize', this._onReflow);
    }
  }

  if (!customElements.get('bdc-nav')) customElements.define('bdc-nav', BdcNav);

  // Auto-mount on DOM ready if you provide a mount element, otherwise prepend to <body>
  document.addEventListener('DOMContentLoaded', () => {
    const preferred = document.getElementById('bdcNavMount') || document.querySelector('header');
    if (!document.querySelector('bdc-nav')) {
      const el = document.createElement('bdc-nav');
      if (preferred) { preferred.prepend(el); } else { document.body.prepend(el); }
    }
  });
})();
