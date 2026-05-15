(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`esportify-session`;function t(){let t=sessionStorage.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return n(),null}}function n(){sessionStorage.removeItem(e),localStorage.removeItem(e)}function r(e){let n=t();return n?n.role===`admin`?!0:n.role===e:!1}var i=document.querySelector(`#roleBanner`),a=document.querySelector(`#sessionNav`);function o(){window.location.href=`/inscription.html`}function s(e){return e===`admin`?`Admin`:e===`organizer`?`Organisateur`:`Player`}function c(){let e=document.body.dataset.requiredRole;e&&(r(e)||o())}function l(){if(!i)return;let e=t();if(!e){i.innerHTML=`<span>Mode visiteur</span>`;return}i.innerHTML=`
    <span>
      Connecté : ${e.username} (${s(e.role)})
    </span>

    <button
      class="btn btn--ghost btn--small"
      type="button"
      data-logout
    >
      Déconnexion
    </button>
  `}function u(){if(!a)return;let e=t();if(!e){a.innerHTML=`
      <a href="/inscription.html">Connexion</a>
    `;return}a.innerHTML=`
    <div class="nav-dropdown nav-dropdown--session">
      <button
        class="nav-dropdown__button"
        type="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        ${s(e.role)} ▾
      </button>

      <div class="nav-dropdown__menu nav-dropdown__menu--right">
        <a href="/admin.html" data-protected-role="admin">
          Espace admin
        </a>

        <a href="/organisateur.html" data-protected-role="organizer">
          Espace organisateur
        </a>

        <button
          class="nav-dropdown__logout"
          type="button"
          data-change-role
        >
          Changer de rôle
        </button>

        <button
          class="nav-dropdown__logout"
          type="button"
          data-logout
        >
          Déconnexion
        </button>
      </div>
    </div>
  `}function d(){document.querySelectorAll(`.nav-dropdown`).forEach(e=>{let t=e.querySelector(`.nav-dropdown__button`);e.classList.remove(`is-open`),t?.setAttribute(`aria-expanded`,`false`)})}function f(){let e=document.querySelectorAll(`.nav-dropdown`);e.forEach(e=>{let t=e.querySelector(`.nav-dropdown__button`);t&&t.addEventListener(`click`,n=>{n.stopPropagation();let r=e.classList.contains(`is-open`);d(),r||(e.classList.add(`is-open`),t.setAttribute(`aria-expanded`,`true`))})}),document.addEventListener(`click`,t=>{let n=t.target;n instanceof Node&&(Array.from(e).some(e=>e.contains(n))||d())})}function p(){document.querySelectorAll(`[data-protected-role]`).forEach(e=>{let t=e.dataset.protectedRole;t&&(r(t)||(e.setAttribute(`aria-disabled`,`true`),e.setAttribute(`title`,`Accès réservé`)),e.addEventListener(`click`,e=>{if(r(t)){d();return}e.preventDefault(),window.alert(`Accès réservé à ce rôle.`)}))})}function m(){let e=document.querySelectorAll(`[data-logout]`),t=document.querySelectorAll(`[data-change-role]`);e.forEach(e=>{e.addEventListener(`click`,()=>{n(),o()})}),t.forEach(e=>{e.addEventListener(`click`,()=>{n(),o()})})}u(),l(),c(),f(),p(),m();var h=document.querySelector(`#sessionLink`),g=document.querySelector(`#roleTestLink`);function _(e){return e===`admin`?`Administrateur`:e===`organizer`?`Organisateur`:`Utilisateur`}function v(e){return e===`admin`?`/admin.html`:e===`organizer`?`/organisateur.html`:`/events.html`}function y(){let e=t();if(!e){h&&(h.textContent=`Connexion`,h.href=`/inscription.html`),g&&(g.textContent=`Se connecter`,g.href=`/inscription.html`);return}let n=_(e.role),r=v(e.role);h&&(h.textContent=n,h.href=r),g&&(g.textContent=`Connecté : ${e.username}`,g.href=r)}y(),document.body.classList.add(`is-ready`);