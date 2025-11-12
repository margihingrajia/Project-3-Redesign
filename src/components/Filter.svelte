<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';

  const dispatch = createEventDispatcher();

  export let initial = {}; //initial filter values
  export let cities = [];

  // local state
  let q = '';
  let minBeds = 0;
  let maxPrice = '';
  let city = '';
  let petsAllowed = false;

  let open = false;

  function emitChange() {
    dispatch('change', {
      q: q.trim(),
      minBeds: Number(minBeds) || 0,
      maxPrice: maxPrice === '' ? null : Number(maxPrice),
      city: city || null,
      petsAllowed: !!petsAllowed
    });
  }

  function reset() {
    q = '';
    minBeds = 0;
    maxPrice = '';
    city = '';
    petsAllowed = false;
    emitChange();
  }

  onMount(() => {
    if (initial) {
      q = initial.q ?? q;
      minBeds = initial.minBeds ?? minBeds;
      maxPrice = initial.maxPrice ?? maxPrice;
      city = initial.city ?? city;
      petsAllowed = initial.petsAllowed ?? petsAllowed;
      emitChange();
    }

    const onKey = (e) => {
      if (e.key === 'Escape' && open) {
        open = false;
      }
    };
    window.addEventListener('keydown', onKey);
    onDestroy(() => window.removeEventListener('keydown', onKey));
  });

  // react to updated initial prop (if parent changes filters)
  $: if (initial && open === false) {
    // update local values to reflect initial when overlay closed (avoid overwriting while user edits)
    q = initial.q ?? q;
    minBeds = initial.minBeds ?? minBeds;
    maxPrice = initial.maxPrice ?? maxPrice;
    city = initial.city ?? city;
    petsAllowed = initial.petsAllowed ?? petsAllowed;
  }

  function openOverlay() {
    open = true;
  }
  function closeOverlay() {
    open = false;
  }

  function backdropClick() {
    closeOverlay();
  }
</script>

<button class="filter-icon" aria-label="Open filters" on:click={openOverlay} title="Filters">
  <!-- simple filter SVG -->
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M22 3H2l7 9v7l6-3v-4l7-9z"></path>
  </svg>
</button>

{#if open}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div class="overlay" role="dialog" aria-modal="true" on:click={backdropClick}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal" on:click|stopPropagation>
      <header class="modal-header">
        <h3>Filters</h3>
        <div class="actions">
          <button class="close" type="button" on:click={closeOverlay} aria-label="Close">✕</button>
        </div>
      </header>

      <div class="modal-body">
        <!-- filter UI (unchanged controls) -->
        <div class="filter">
          <div class="row">
            <input
              placeholder="Search title / city"
              bind:value={q}
              on:input={() => emitChange()} />
            <select bind:value={city} on:change={() => emitChange()}>
              <option value=''>All cities</option>
              {#each cities as c}
                <option value={c}>{c}</option>
              {/each}
            </select>
          </div>

          <div class="row">
            <label>
              Min beds
              <select bind:value={minBeds} on:change={() => emitChange()}>
                <option value="0">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </label>

            <label>
              Max price
              <input type="number" min="0" placeholder="No limit" bind:value={maxPrice} on:input={() => emitChange()} />
            </label>

            <label class="checkbox">
              <input type="checkbox" bind:checked={petsAllowed} on:change={() => emitChange()} />
              Pets allowed
            </label>
          </div>
        </div>
      </div>

      <footer class="modal-footer">
        <div class="left-actions">
          <button class="reset" type="button" on:click={reset}>Reset</button>
        </div>

        <div class="right-actions">
          <button type="button" class="apply" on:click={closeOverlay}>Apply</button>
        </div>
      </footer>
    </div>
  </div>
{/if}

<style>
  .filter-icon {
    display:inline-flex;
    align-items:center;
    justify-content:center;
    width:40px;
    height:40px;
    border-radius:8px;
    border:1px solid #e2e8f0;
    background: #fff;
    cursor:pointer;
  }
  .filter-icon svg { color: #0f172a; }

  .overlay {
    position:fixed;
    inset:0;
    background: rgba(2,6,23,0.55);
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:1000;
    padding:1rem;
  }
  .modal {
    width:100%;
    max-width:720px;
    background:#fff;
    border-radius:8px;
    box-shadow:0 10px 30px rgba(2,6,23,0.2);
    display:flex;
    flex-direction:column;
    overflow:hidden;
  }
  .modal-header {
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:0.75rem 1rem;
    border-bottom:1px solid #eef2f7;
  }
  .modal-body { padding:1rem; }
  .modal-footer {
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:0.75rem 1rem;
    border-top:1px solid #eef2f7;
  }

  .filter { padding: 0; background:transparent; border: none; }
  .row { display:flex; gap:0.5rem; margin-bottom:0.5rem; align-items:center; }
  .checkbox { display:flex; align-items:center; gap:0.3rem; }
  .actions { display:flex; gap:0.5rem; align-items:center; }
  .reset { background:transparent; border:1px solid #e6eef5; padding:0.35rem 0.6rem; border-radius:4px; cursor:pointer; }
  .close { background:transparent; border:none; font-size:1rem; cursor:pointer; }
  .apply { padding:0.5rem 0.8rem; border-radius:4px; border:1px solid #0f172a; background:#0f172a; color:#fff; cursor:pointer; }

  /* optional spacing for left/right wrapper */
  .left-actions { display:flex; gap:0.5rem; }
  .right-actions { display:flex; gap:0.5rem; }
</style>
