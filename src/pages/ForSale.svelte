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
    <input placeholder="Search title or city" bind:value={q} />
    <input type="number" min="0" placeholder="Min price" bind:value={minPrice} />
  </div>

  <ul>
    {#if filtered.length === 0}
      <li>No properties match your filters.</li>
    {:else}
      {#each filtered as prop}
        <li class="card">
          <h3>{prop.title}</h3>
          <p>{prop.city} — {prop.beds} bd • {prop.baths} ba • {prop.sqft} sqft</p>
          <p><strong>Price:</strong> {fmt(prop.price)}</p>
          <p class="muted">{prop.description}</p>
          {#if prop.features && prop.features.length}
            <p><strong>Features:</strong> {prop.features.join(', ')}</p>
          {/if}
        </li>
      {/each}
    {/if}
  </ul>
</section>

<style>
  .controls { display:flex; gap:0.5rem; margin:1rem 0; }
  input[type="number"], input[type="text"] { padding:0.4rem; border:1px solid #ccc; border-radius:4px; }
  input[type="number"] { width:140px; }
  ul { list-style:none; padding:0; }
  .card { padding:0.8rem; border:1px solid #eee; border-radius:6px; margin-bottom:0.6rem; }
  .muted { color:#555; margin:0.4rem 0; }
</style>
