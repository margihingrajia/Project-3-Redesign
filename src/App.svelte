<script>
  import Homepage from './components/HomePage.svelte';
  import Filter from './components/Filter.svelte';
  import ApartmentHousing from './pages/ApartmentHousing.svelte';

  let route = window.location.hash || '';
  const onHashChange = () => (route = window.location.hash || '');
  window.addEventListener('hashchange', onHashChange);

  let apartmentFilters = null;

  const cities = ['CityA', 'CityB'];

  function onFilterChange(event) {
    apartmentFilters = event.detail;
  }
</script>

<main>
  {#if route === '#/apartment-housing'}
    <div style="display:flex; gap:1rem; align-items:flex-start;">

      <div style="width:72px; display:flex; align-items:flex-start; justify-content:center;">
        <Filter on:change={onFilterChange} cities={cities} initial={apartmentFilters} />
      </div>

      <section style="flex:1;">
        <ApartmentHousing filters={apartmentFilters} />
      </section>
    </div>
  {:else}
    <h1>Project 3 Redesign</h1>

    <!-- Categories -->
    <nav>
      <ul>
        <li><button on:click={() => (location.hash = '/apartment-housing')}>Apartment/Housing</button></li>
      </ul>
    </nav>
    <Homepage />
  {/if}
</main>

<style>
  main {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    padding: 2rem;
    max-width: 640px;
    margin: 0 auto;
  }
  h1 { margin-bottom: 1rem; }
  nav ul { list-style: none; padding: 0; display:flex; gap:0.5rem; }
  nav button { background:transparent; border:1px solid #ccc; padding:0.4rem 0.6rem; cursor:pointer; border-radius:4px; }
</style>
