<script>
  import Homepage from './components/Homepage.svelte';
  import Filter from './components/Filter.svelte';
  import ApartmentHousing from './pages/ApartmentHousing.svelte';
  import ApartmentDetails from './pages/ApartmentDetails.svelte';

  // current hash-based route
  let route = window.location.hash || '';

  const onHashChange = () => {
    route = window.location.hash || '';
  };

  window.addEventListener('hashchange', onHashChange);

  // filters passed into ApartmentHousing
  let apartmentFilters = null;

  const cities = ['CityA', 'CityB'];

  function onFilterChange(event) {
    apartmentFilters = event.detail;
  }

  // extract dynamic apartment ID when viewing details
  function getApartmentId() {
    const match = route.match(/#\/apartment-housing\/details\/(\d+)/);
    return match ? Number(match[1]) : null;
  }
</script>

<main>
  {#if route.startsWith('#/apartment-housing/details/')}
    <!-- --------------------------
         DETAILS PAGE
    --------------------------- -->
    <ApartmentDetails id={getApartmentId()} />

  {:else if route === '#/apartment-housing'}
    <!-- --------------------------
         LIST + FILTER PAGE
    --------------------------- -->
    <div class="layout">

      <div class="side">
        <Filter 
          on:change={onFilterChange} 
          cities={cities} 
          initial={apartmentFilters} 
        />
      </div>

      <section class="content">
        <ApartmentHousing filters={apartmentFilters} />
      </section>
    </div>

  {:else}
    <!-- --------------------------
         HOME PAGE
    --------------------------- -->
    <h1>Project 3 Redesign</h1>

    <nav>
      <ul>
        <li>
          <button on:click={() => (location.hash = '/apartment-housing')}>
            Apartment / Housing
          </button>
        </li>
      </ul>
    </nav>

    <Homepage />
  {/if}
</main>

<style>
  main {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial;
    padding: 2rem;
    max-width: 900px;
    margin: 0 auto;
    color: #222;
  }

  /* Home */
  h1 {
    margin-bottom: 1.2rem;
    font-size: 1.9rem;
    color: #4f46e5;
  }

  nav ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 0.6rem;
  }

  nav button {
    background: #eef0ff;
    border: 1px solid #c7c9ff;
    padding: 0.5rem 0.8rem;
    cursor: pointer;
    border-radius: 8px;
    font-size: 0.95rem;
    transition: 0.2s ease;
    color: #4f46e5;
  }

  nav button:hover {
    background: #4f46e5;
    color: white;
  }

  /* Layout for filter + list */
  .layout {
    display: flex;
    gap: 1.4rem;
    align-items: flex-start;
  }

  .side {
    width: 75px;
    display: flex;
    justify-content: center;
  }

  .content {
    flex: 1;
  }
</style>
