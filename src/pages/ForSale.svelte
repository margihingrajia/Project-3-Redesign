<script>
  import { forSale } from '../data.js';

  let q = '';
  let minPrice = 0;

  $: filtered = forSale.filter(p => {
    const hay = `${p.title} ${p.city}`.toLowerCase();
    const matchesQ = q.trim() === '' || hay.includes(q.toLowerCase());
    const matchesPrice = p.price >= minPrice;
    return matchesQ && matchesPrice;
  });

  function fmt(n) { return `$${n.toLocaleString()}`; }
</script>

<section>
  <header>
    <h2>For Sale</h2>
  </header>

  <div class="controls">
    <input type="text" placeholder="Search title or city" bind:value={q} />
    <input type="number" min="0" placeholder="Min price" bind:value={minPrice} />
  </div>

  <ul>
    {#if filtered.length === 0}
      <li>No properties match your filters.</li>
    {:else}
      {#each filtered as prop}
        <li class="card">
          <div class="content">
            <div class="row">
              <h3>{prop.title}</h3>
              <div class="price">{fmt(prop.price)}</div>
            </div>
            <div class="meta">{prop.city} — {prop.beds} bd • {prop.baths} ba • {prop.sqft} sqft</div>
            <p class="muted">{prop.description}</p>
            {#if prop.features && prop.features.length}
              <p class="features">{prop.features.join(' · ')}</p>
            {/if}
          </div>
        </li>
      {/each}
    {/if}
  </ul>
</section>

<style>
  :root{ --muted:#555; --accent:#007acc }
  .controls{ display:flex; gap:0.5rem; margin:1rem 0 }
  input[type="number"], input[type="text"]{ padding:0.6rem 0.8rem; border:1px solid #e6eaee; border-radius:8px }
  input[type="number"]{ width:140px }
  ul{ list-style:none; padding:0 }
  .card{ padding:0.9rem; background:#fff; border-radius:10px; box-shadow:0 8px 20px rgba(15,20,25,0.04); margin-bottom:0.75rem }
  .row{ display:flex; align-items:center; justify-content:space-between }
  h3{ margin:0; font-size:1.05rem }
  .price{ color:var(--accent); font-weight:700 }
  .meta{ font-size:0.9rem; color:var(--muted); margin:0.25rem 0 }
  .muted{ color:var(--muted); margin:0.4rem 0 }
  .features{ font-size:0.9rem; color:#333 }
</style>
