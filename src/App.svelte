<script>
  import Navbar from "./components/Navbar.svelte";

  import Homepage from './components/Homepage.svelte';
  import ApartmentHousing from './pages/ApartmentHousing.svelte';
  import ApartmentDetails from './pages/ApartmentDetails.svelte';

  import Vehicles from './pages/Vehicles.svelte';
  import VehicleDetails from './pages/VehicleDetails.svelte';

  import Jobs from './pages/Jobs.svelte';
  import JobDetails from './pages/JobDetails.svelte';

  import ForSale from './pages/ForSale.svelte';
  import ForSaleDetails from './pages/ForSaleDetails.svelte';

  import Services from './pages/Services.svelte';
  import ServiceDetails from './pages/ServiceDetails.svelte';

  import More from './pages/More.svelte';
  import MoreDetails from './pages/MoreDetails.svelte';

  // ROUTER STATE
  let route = window.location.hash || '';
  window.addEventListener('hashchange', () => {
    route = window.location.hash || '';
  });

  // FILTERS FOR HOUSING
  let apartmentFilters = null;

  function onFilterChange(event) {
    apartmentFilters = event.detail;
  }

  function getId(section) {
    const match = route.match(new RegExp(`#/${section}/details/(\\d+)`));
    return match ? Number(match[1]) : null;
  }
</script>

<Navbar {route} />

<main>
  {#if route.startsWith('#/apartment-housing/details/')}
    <ApartmentDetails id={getId('apartment-housing')} />

  {:else if route === '#/apartment-housing'}
    <ApartmentHousing filters={apartmentFilters} on:change={onFilterChange} />

  {:else if route.startsWith('#/vehicles/details/')}
    <VehicleDetails id={getId('vehicles')} />

  {:else if route === '#/vehicles'}
    <Vehicles />

  {:else if route.startsWith('#/jobs/details/')}
    <JobDetails id={getId('jobs')} />

  {:else if route === '#/jobs'}
    <Jobs />

  {:else if route.startsWith('#/for-sale/details/')}
    <ForSaleDetails id={getId('for-sale')} />

  {:else if route === '#/for-sale'}
    <ForSale />

  {:else if route.startsWith('#/services/details/')}
    <ServiceDetails id={getId('services')} />

  {:else if route === '#/services'}
    <Services />

  {:else if route.startsWith('#/more/details/')}
    <MoreDetails id={getId('more')} />

  {:else if route === '#/more'}
    <More />

  {:else}
    <Homepage />
  {/if}
</main>

<style>
  main {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial;
    padding: 2rem 1rem;
    max-width: 1200px;
    margin: 0 auto;
    color: #222;
  }
</style>
