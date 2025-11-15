<script>
  // sample data; replace with real data source as needed
  const apartments = [
    { id: 1, title: 'Cozy Studio Downtown', beds: 0, city: 'CityA' },
    { id: 2, title: 'Two Bedroom Suburb', beds: 2, city: 'CityB' }
  ];

  let q = ''; // text query
  let minBeds = 0; // minimum bedrooms

  // reactive filtered list
  $: filtered = apartments.filter(a => {
    const matchesText = q.trim() === '' || `${a.title} ${a.city}`.toLowerCase().includes(q.toLowerCase());
    const matchesBeds = a.beds >= minBeds;
    return matchesText && matchesBeds;
  });

  function goBack() {
    location.hash = '';
  }
</script>

<section>
  <header>
    <button on:click={goBack}>← Back</button>
    <h2>Apartment / Housing</h2>
  </header>

  <div class="filters">
    <input placeholder="Search by title or city" bind:value={q} />
  </div>

  <ul>
    {#if filtered.length === 0}
      <li>No results</li>
    {:else}
      {#each filtered as apt}
        <li>
          <h3>{apt.title}</h3>
          <p>Beds: {apt.beds} — {apt.city}</p>
        </li>
      {/each}
    {/if}
  </ul>
</section>

<style>
  section { padding: 1rem; }
  header { display:flex; align-items:center; gap:1rem; }
  .filters { margin:1rem 0; display:flex; gap:0.5rem; align-items:center; }
  input { padding:0.4rem; border:1px solid #ccc; border-radius:4px; }
  ul { padding:0; list-style:none; }
  li { padding:0.6rem; border:1px solid #eee; border-radius:6px; margin-bottom:0.5rem; }
</style>
