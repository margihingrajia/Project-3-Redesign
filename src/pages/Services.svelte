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
          <h3>{svc.title}</h3>
          <p><strong>Category:</strong> {svc.category} — <strong>City:</strong> {svc.city}</p>
          <p><strong>Price:</strong> {formatPrice(svc)} — <strong>Rating:</strong> {svc.rating ?? '—'}</p>
          <p class="muted">{svc.description}</p>
          <p class="contact">Contact: {svc.contact}</p>
        </li>
      {/each}
    {/if}
  </ul>
</section>

<style>
  .filters { margin:1rem 0; }
  input { padding:0.4rem; border:1px solid #ccc; border-radius:4px; width:100%; }
  ul { list-style:none; padding:0; }
  .card { padding:0.8rem; border:1px solid #eee; border-radius:6px; margin-bottom:0.6rem; }
  .muted { color:#555; margin:0.4rem 0; }
  .contact { font-size:0.9rem; color:#333; }
</style>
