// bdc-nav.js — Big Dogs Don't Cry desktop navigation bar
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
  --green:#28a745; --green-hover:#218838;
  --font:16px; --gap:32px;
}

* {
  box-sizing: border-box;
}

.bdc-nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.bdc-logo {
  flex-shrink: 0;
  margin-right: 24px;
}

.bdc-logo img {
  height: 50px;
  width: auto;
  display: block;
}

.bdc-menu {
  list-style: none;
  display: flex;
  gap: var(--gap);
  padding: 0;
  margin: 0;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}

.bdc-link, .bdc-toggle {
  font-family: Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
  font-size: var(--font);
  line-height: 1.25;
  color: var(--text);
  background: transparent;
  border: 0;
  padding: 8px 0;
  cursor: pointer;
  text-decoration: none;
  font-weight: 400;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.bdc-link:hover, .bdc-toggle:hover, .bdc-link:focus, .bdc-toggle:focus {
  color: var(--hover);
  outline: 0;
}

.has-submenu {
  position: relative;
}

.has-submenu > .bdc-toggle::after {
  content: "▾";
  font-size: 12px;
  margin-left: 6px;
  position: relative;
  top: -1px;
}

.submenu {
  display: none;
  list-style: none;
  padding: 12px 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
  background: #fff;
  border: 1px solid #f1d3dc;
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0,0,0,.12);
  min-width: 180px;
  z-index: 1000;
}

.submenu li {
  padding: 0;
}

.submenu .bdc-link {
  display: block;
  padding: 10px 20px;
  width: 100%;
  text-align: left;
}

.has-submenu.open > .submenu {
  display: block;
}

.bdc-donate-btn {
  flex-shrink: 0;
  margin-left: 24px;
  padding: 12px 28px;
  background: var(--green);
  color: #fff;
  font-family: Poppins, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
  font-size: var(--font);
  font-weight: 500;
  text-decoration: none;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.25);
  white-space: nowrap;
}

.bdc-donate-btn:hover, .bdc-donate-btn:focus {
  background: var(--green-hover);
  box-shadow: 0 6px 16px rgba(40, 167, 69, 0.35);
  transform: translateY(-2px);
  outline: 0;
}

.bdc-donate-btn:active {
  transform: translateY(0);
}

/* Tablet responsive */
@media (max-width: 1100px) {
  .bdc-nav {
    padding: 14px 20px;
  }

  .bdc-logo img {
    height: 45px;
  }

  :host {
    --font: 15px;
    --gap: 24px;
  }

  .bdc-donate-btn {
    padding: 10px 24px;
    font-size: 15px;
  }
}

@media (max-width: 950px) {
  .bdc-nav {
    padding: 12px 16px;
  }

  .bdc-logo img {
    height: 40px;
  }

  :host {
    --font: 14px;
    --gap: 18px;
  }

  .bdc-donate-btn {
    padding: 10px 20px;
    font-size: 14px;
    margin-left: 16px;
  }
}

/* Hide on mobile - let native menu handle */
@media (max-width: 900px) {
  :host {
    display: none !important;
  }
}
</style>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap" rel="stylesheet">

<div class="bdc-nav">
  <div class="bdc-logo">
    <a href="https://www.bigdogsdontcry.com/" target="_top">
      <img src="https://static.wixstatic.com/media/4cb683_a8d649d3589846568a30460f1d077d32~mv2.png" alt="Big Dogs Don't Cry Logo">
    </a>
  </div>

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

  <a class="bdc-donate-btn" href="https://www.bigdogsdontcry.com/donations" target="_top">Donate</a>
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
