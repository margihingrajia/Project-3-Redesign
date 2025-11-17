<script>
  import { onMount } from "svelte";
  import { apartments } from "../data.js";

  export let filters = null;

  let q = "";
  let minBeds = 0;

  // Store first image paths for each apartment
  let firstImages = {};

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

  // Load first image for each apartment asynchronously
  onMount(() => {
    apartments.forEach(async (apt) => {
      const path = `/apartment${apt.id}/img1.webp`;
      try {
        const res = await fetch(path, { method: "HEAD" });
        if (res.ok) firstImages[apt.id] = path;
      } catch {
        firstImages[apt.id] = ""; // fallback if image missing
      }
    });
  });
</script>

<section>
  <header>
    <button class="back" on:click={goBack}>← Back</button>
    <h2>Apartment / Housing</h2>
  </header>

  <div class="filters">
    <input placeholder="Search…" bind:value={q} />
    <input type="number" placeholder="Min Beds" min="0" bind:value={minBeds} />
  </div>

  <div class="cards-container">
    {#each filtered as apt}
      <div class="card" on:click={() => openDetails(apt.id)}>
        {#if firstImages[apt.id]}
          <img src={firstImages[apt.id]} alt={apt.title} />
        {:else}
          <div class="placeholder">No Image</div>
        {/if}
        <div class="card-content">
          <h3>{apt.title}</h3>
          <p class="city">{apt.city}</p>
          <p class="beds">Beds: {apt.beds}</p>
        </div>
      </div>
    {/each}
  </div>
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

  header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.2rem;
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

  .filters {
    display: flex;
    gap: 0.8rem;
    margin-bottom: 1rem;
  }

  input {
    padding: 0.6rem 0.7rem;
    border: 2px solid var(--border);
    border-radius: 8px;
    flex: 1;
    font-size: 0.95rem;
  }

  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1rem;
  }

  .card {
    background: var(--card-bg);
    border-radius: 12px;
    border: 2px solid var(--border);
    overflow: hidden;
    cursor: pointer;
    transition: 0.2s ease, transform 0.2s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  }
  .card:hover {
    transform: translateY(-4px);
    border-color: var(--accent-light);
  }

  .card img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  .placeholder {
    width: 100%;
    height: 150px;
    background: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  .card-content {
    padding: 0.8rem;
  }

  .card-content h3 {
    margin: 0 0 0.3rem;
    color: var(--accent-light);
    font-size: 1.05rem;
  }

  .city {
    color: var(--text-muted);
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .beds {
    display: inline-block;
    padding: 0.3rem 0.6rem;
    border-radius: 6px;
    background: var(--accent-bg);
    border: 1.5px solid var(--accent-light);
    color: var(--accent-light);
    font-weight: 600;
    font-size: 0.85rem;
  }
</style>
