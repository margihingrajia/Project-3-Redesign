<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { apartments } from "../data.js";
  import Filter from "../components/Filter.svelte"; // advanced filter component

  export let filters = null;
  const dispatch = createEventDispatcher();

  let showFilters = true;
  let firstImages = {};
  let activeFilters = {};

  // Basic filter inputs
  let q = "";
  let minBeds = 0;
  let city = "";
  let apartmentType = "";

  // Dynamic filter options
  $: cities = Array.from(new Set(apartments.map(a => a.city))).sort();
  $: bedOptions = Array.from(new Set(apartments.map(a => a.beds))).sort((a,b)=>a-b);
  $: typeOptions = Array.from(new Set(apartments.map(a => a.type))).sort();

  $: filtered = apartments.filter(a => {
    const matchesText = !activeFilters.q || `${a.title} ${a.city}`.toLowerCase().includes(activeFilters.q?.toLowerCase());
    const matchesBeds = !activeFilters.minBeds || a.beds >= activeFilters.minBeds;
    const matchesCity = !activeFilters.city || a.city === activeFilters.city;
    const matchesType = !activeFilters.apartmentType || a.type === activeFilters.apartmentType;
    const matchesPrice = !activeFilters.priceMax || a.price <= activeFilters.priceMax;
    const matchesPets = !activeFilters.petsAllowed || a.petsAllowed === activeFilters.petsAllowed;

    return matchesText && matchesBeds && matchesCity && matchesType && matchesPrice && matchesPets;
  });

  function openDetails(id) {
    location.hash = `/apartment-housing/details/${id}`;
  }

  function goBack() {
    location.hash = "";
  }

  function toggleFilters() {
    showFilters = !showFilters;
  }

  function onFilterChange(event) {
    activeFilters = { ...event.detail };
    dispatch("change", activeFilters);
  }

  onMount(() => {
    apartments.forEach(async (apt) => {
      const path = `/apartments/apartment${apt.id}/img1.webp`;
      try {
        const res = await fetch(path, { method: "HEAD" });
        if (res.ok) firstImages[apt.id] = path;
      } catch {
        firstImages[apt.id] = "";
      }
    });

    if (filters) {
      q = filters.q || "";
      minBeds = filters.minBeds || 0;
      city = filters.city || "";
      apartmentType = filters.apartmentType || "";
      activeFilters = { q, minBeds, city, apartmentType };
    }
  });
</script>

<section>
  <!-- TOP BAR -->
  <header class="top-bar">
    <div class="left">
      <button class="back" on:click={goBack}>← Back</button>
      <h2>Apartment / Housing</h2>
      <button class="filter-btn" on:click={toggleFilters}>Filter</button>
    </div>
  </header>

  <!-- BASIC FILTERS -->
  {#if showFilters}
    <div class="filters">
      <input placeholder="Search…" bind:value={q} on:input={() => onFilterChange({ detail: { ...activeFilters, q } })} />

      <select bind:value={minBeds} on:change={() => onFilterChange({ detail: { ...activeFilters, minBeds } })}>
        <option value={0}>Min Beds</option>
        {#each bedOptions as b}
          <option value={b}>{b} Beds</option>
        {/each}
      </select>

      <select bind:value={city} on:change={() => onFilterChange({ detail: { ...activeFilters, city } })}>
        <option value="">All Cities</option>
        {#each cities as c}
          <option value={c}>{c}</option>
        {/each}
      </select>

      <select bind:value={apartmentType} on:change={() => onFilterChange({ detail: { ...activeFilters, apartmentType } })}>
        <option value="">All Types</option>
        {#each typeOptions as t}
          <option value={t}>{t}</option>
        {/each}
      </select>
    </div>
  {/if}

  <!-- ADVANCED FILTERS ALWAYS RENDERED -->
  <div class="advanced-filters-wrapper">
    <Filter {activeFilters} on:change={onFilterChange} />
  </div>

  <!-- APARTMENT CARDS -->
  <div class="cards-container">
    {#each filtered as apt}
      <div class="card" on:click={() => openDetails(apt.id)}>
        <div class="image-wrapper">
          {#if firstImages[apt.id]}
            <img src={firstImages[apt.id]} alt={apt.title} />
            <div class="price-badge">${apt.price}/mo</div>
          {:else}
            <div class="placeholder">No Image</div>
          {/if}
        </div>
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
  --accent: #6a1b9a ;
  --accent-light: #6a1b9a;
  --accent-bg: #eef0ff;
  --text-main: #1a1a1a;
  --text-muted: #555;
  --border: #d9d9d9;
  --card-bg: #fff;
}

section {
  padding: 1.5rem 1rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
}

.top-bar {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
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
}
.back:hover { background: var(--accent-light); color: white; }

h2 {
  margin: 0;
  font-size: 1.45rem;
  font-weight: 700;
  color: var(--accent);
}

/* BUTTONS */
.filter-btn, .adv-filter-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background: var(--accent-light);
  color: white;
  padding: 0.45rem 0.8rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.25s ease;
}
.filter-btn:hover, .adv-filter-btn:hover { background: var(--accent); }

.filters {
  display: flex;
  gap: 0.8rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}
.filters input, .filters select {
  padding: 0.6rem 0.7rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  font-size: 0.95rem;
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

  input {
    padding: 0.6rem 0.7rem;
    border: 2px solid var(--border);
    border-radius: 8px;
    flex: 1;
    font-size: 0.95rem;
  }

.advanced-filters-wrapper {
  margin-bottom: 1rem;
}

/* CARDS */
.cards-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
@media (max-width: 1200px) { .cards-container { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 900px) { .cards-container { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .cards-container { grid-template-columns: 1fr; } }

.card {
  background: var(--card-bg);
  border-radius: 12px;
  border: 2px solid var(--border);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.25s ease;
}
.card:hover { box-shadow: 0 8px 20px rgba(0,0,0,0.12); }

.image-wrapper { position: relative; }
.image-wrapper img { width: 100%; height: 150px; object-fit: cover; transition: transform 0.3s ease; }
.card:hover .image-wrapper img { transform: scale(1.05); }

.price-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #2ecc71; /* GREEN */
  color: white;
  padding: 0.3rem 0.6rem;
  font-weight: 700;
  border-radius: 8px;
  font-size: 0.85rem;
}


.placeholder { height: 150px; background: #eee; display: flex; justify-content: center; align-items: center; color: var(--text-muted); }

.card-content { padding: 0.8rem; }
.card-content h3 { margin: 0 0 0.3rem; color: var(--accent-light); font-size: 1.05rem; }
.city { color: var(--text-muted); margin-bottom: 0.5rem; }
.beds {
  display: inline-block; padding: 0.3rem 0.6rem;
  background: var(--accent-bg); border: 1.5px solid var(--accent-light);
  border-radius: 6px; font-size: 0.85rem; color: var(--accent-light); font-weight: 600;
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
