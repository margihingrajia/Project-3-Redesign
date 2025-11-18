<script>
  import { services } from '../data.js';

  let q = '';

  // reactive filtered list
  $: filtered = services.filter(s => {
    const hay = `${s.title} ${s.category} ${s.city}`.toLowerCase();
    return q.trim() === '' || hay.includes(q.toLowerCase());
  });

  function formatPrice(item) {
    if (item.price_per_hour) return `$${item.price_per_hour}/hr`;
    if (item.price_per_job) return `$${item.price_per_job}`;
    if (item.price_per_session) return `$${item.price_per_session}/session`;
    if (item.price_per_visit) return `$${item.price_per_visit}`;
    if (item.price_per_call) return `$${item.price_per_call}`;
    return 'Price on request';
  }
</script>

<section>
  <header>
    <h2>Services</h2>
  </header>

  <div class="filters">
    <input placeholder="Search services, category or city" bind:value={q} />
  </div>

  <ul>
    {#if filtered.length === 0}
      <li>No services found</li>
    {:else}
      {#each filtered as svc}
        <li class="card">
          <div class="thumb" aria-hidden></div>
          <div class="content">
            <div class="row">
              <h3>{svc.title}</h3>
              <div class="badge">{formatPrice(svc)}</div>
            </div>
            <div class="meta"><span class="category">{svc.category}</span> — <span class="city">{svc.city}</span></div>
            <p class="muted">{svc.description}</p>
            <div class="row footer">
              <div class="rating">⭐ {svc.rating ?? '—'}</div>
              <div class="contact">{svc.contact}</div>
            </div>
          </div>
        </li>
      {/each}
    {/if}
  </ul>
</section>

<style>
  :root { --accent:#007acc; --card-bg:#fff; --muted:#555; }
  .filters { margin:1rem 0; }
  input { padding:0.6rem 0.8rem; border:1px solid #e3e7ea; border-radius:8px; width:100%; box-shadow:inset 0 1px 0 rgba(0,0,0,0.02); }
  ul { list-style:none; padding:0; }
  .card { display:flex; gap:0.9rem; padding:0.75rem; background:var(--card-bg); border-radius:10px; box-shadow:0 6px 18px rgba(20,24,28,0.04); border:1px solid rgba(20,24,28,0.04); margin-bottom:0.75rem; align-items:flex-start; }
  .thumb { width:72px; height:72px; background:linear-gradient(135deg,#f3f5f7,#eef2f6); border-radius:8px; flex:0 0 72px; }
  .content { flex:1; }
  .row { display:flex; align-items:center; justify-content:space-between; gap:0.5rem; }
  h3 { margin:0; font-size:1.05rem; }
  .badge { background:var(--accent); color:#fff; padding:0.25rem 0.5rem; border-radius:6px; font-size:0.85rem; }
  .meta { font-size:0.9rem; color:var(--muted); margin:0.25rem 0; }
  .muted { color:var(--muted); margin:0.25rem 0; }
  .footer { margin-top:0.4rem; font-size:0.9rem; color:#333; }
  .rating { color:#b8860b; }
  .contact { color:var(--muted); }
</style>
