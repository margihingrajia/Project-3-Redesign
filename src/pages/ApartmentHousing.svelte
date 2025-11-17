<script>
  import { apartments } from "../data.js";

  export let filters = null;

  let q = "";
  let minBeds = 0;

  $: filtered = apartments.filter(a => {
    const matchesText =
      q.trim() === "" ||
      `${a.title} ${a.city}`.toLowerCase().includes(q.toLowerCase());

    const matchesBeds = a.beds >= minBeds;
    const matchesCity =
      !filters?.city || a.city === filters.city;

    return matchesText && matchesBeds && matchesCity;
  });

  function openDetails(id) {
    location.hash = `/apartment-housing/details/${id}`;
  }

  function goBack() {
    location.hash = "";
  }
</script>

<section>
  <!-- 🔙 BACK BUTTON restored -->
  <header>
    <button class="back" on:click={goBack}>← Back</button>
    <h2>Apartment / Housing</h2>
  </header>

  <div class="filters">
    <input placeholder="Search…" bind:value={q} />

  </div>

  <ul>
    {#each filtered as apt}
      <li>
        <h3>{apt.title}</h3>
        <p class="city">{apt.city}</p>

        <button class="beds" on:click={() => openDetails(apt.id)}>
          Beds: {apt.beds}
        </button>
      </li>
    {/each}
  </ul>
</section>

<style>
  :root {
    --accent: #4f46e5;
    --accent-light: #6366f1;
    --accent-bg: #eef0ff;
    --text-main: #1a1a1a;
    --text-muted: #555;
    --border: #d9d9d9;
    --card-bg: #fff;
  }

  section {
    padding: 1.5rem;
    font-family: system-ui, sans-serif;
  }

  /* ======================== */
  /* 🔙 BACK BUTTON + HEADER  */
  /* ======================== */
  header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.1rem;
  }

  .back {
    background: var(--accent-bg);
    border: 2px solid var(--accent-light);
    padding: 0.4rem 0.7rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--accent-light);
    transition: 0.2s ease;
  }

  .back:hover {
    background: var(--accent-light);
    color: white;
  }

  header h2 {
    color: var(--accent);
    font-size: 1.4rem;
    font-weight: 700;
  }

  /* Filters */
  .filters {
    display: flex;
    gap: 0.8rem;
    margin-bottom: 1rem;
  }

  input,
  select {
    padding: 0.6rem 0.7rem;
    border: 2px solid var(--border);
    border-radius: 8px;
    flex: 1;
    font-size: 0.95rem;
  }

  ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* ⭐ 4 columns */
  gap: 1rem; /* spacing between cards */
}

  li {
  background: var(--card-bg);
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid var(--border);
  transition: 0.15s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

  li:hover {
    transform: translateY(-3px);
    border-color: var(--accent-light);
  }

  li h3 {
    margin: 0 0 0.3rem;
    color: var(--accent-light);
  }

  .city {
    color: var(--text-muted);
    margin-bottom: 0.5rem;
  }

  .beds {
    border: 2px solid var(--accent-light);
    background: var(--accent-bg);
    padding: 0.35rem 0.6rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    color: var(--accent-light);
    transition: 0.2s;
  }

  .beds:hover {
    background: var(--accent-light);
    color: white;
  }
</style>
