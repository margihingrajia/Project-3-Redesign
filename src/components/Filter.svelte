<script>
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  export let initial = {}; //initial filter values

  // local state
  let q = "";
  let minBeds = 0;
  let maxPrice = "";
  let city = "";
  let petsAllowed = false;

  // properties of filter
  let miles = "";
  let zip = "";
  let priceMin = "";
  let priceMax = "";
  let sqftMin = "";
  let sqftMax = "";
  let beds = "0";
  let baths = "0";
  let housingType = "";
  let rentPeriod = "";
  let laundry = "";
  let parking = "";
  let amenities = {
    petsOk: false,
    furnished: false,
    noSmoking: false,
    wheelchair: false,
    ac: false,
    evCharging: false,
    noBrokerFee: false,
    noApplicationFee: false,
  };

  let openHouseDate = "";
  let popularSearch = "";
  let resultOptions = {
    titlesOnly: false,
    hasImage: false,
    postedToday: false,
    showDuplicates: false,
  };

  // dummy price chart data
  const priceChartOptions = [
    { id: 1, label: "< $1k", min: 0, max: 999 },
    { id: 2, label: "$1k - $2k", min: 1000, max: 1999 },
    { id: 3, label: "$2k - $3k", min: 2000, max: 2999 },
    { id: 4, label: "$3k+", min: 3000, max: 999999 },
  ];
  let selectedChart = null;

  let open = false;

  // updated emitChange includes new fields
  function emitChange() {
    dispatch("change", {
      q: q.trim(),
      minBeds: Number(minBeds) || 0,
      maxPrice: maxPrice === "" ? null : Number(maxPrice),
      city: city || null,
      petsAllowed: !!petsAllowed,
      // new fields
      miles: miles === "" ? null : Number(miles),
      zip: zip || null,
      priceMin: priceMin === "" ? null : Number(priceMin),
      priceMax: priceMax === "" ? null : Number(priceMax),
      sqftMin: sqftMin === "" ? null : Number(sqftMin),
      sqftMax: sqftMax === "" ? null : Number(sqftMax),
      beds: Number(beds) || 0,
      baths: Number(baths) || 0,
      housingType: housingType || null,
      rentPeriod: rentPeriod || null,
      laundry: laundry || null,
      parking: parking || null,
      amenities: { ...amenities },
      openHouseDate: openHouseDate || null,
      popularSearch: popularSearch || null,
      resultOptions: { ...resultOptions },
      priceChartSelection: selectedChart ? { ...selectedChart } : null,
    });
  }

  // reset all filters
  function reset() {
    q = "";
    minBeds = 0;
    maxPrice = "";
    city = "";
    petsAllowed = false;

    miles = "";
    zip = "";
    priceMin = "";
    priceMax = "";
    sqftMin = "";
    sqftMax = "";
    beds = "0";
    baths = "0";
    housingType = "";
    rentPeriod = "";
    laundry = "";
    parking = "";
    amenities = {
      petsOk: false,
      furnished: false,
      noSmoking: false,
      wheelchair: false,
      ac: false,
      evCharging: false,
      noBrokerFee: false,
      noApplicationFee: false,
    };
    openHouseDate = "";
    popularSearch = "";
    resultOptions = {
      titlesOnly: false,
      hasImage: false,
      postedToday: false,
      showDuplicates: false,
    };
    selectedChart = null;

    emitChange();
  }

  onMount(() => {
    if (initial) {
      q = initial.q ?? q;
      minBeds = initial.minBeds ?? minBeds;
      maxPrice = initial.maxPrice ?? maxPrice;
      city = initial.city ?? city;
      petsAllowed = initial.petsAllowed ?? petsAllowed;

      // new initial assignments (defensive)
      miles = initial.miles ?? miles;
      zip = initial.zip ?? zip;
      priceMin = initial.priceMin ?? priceMin;
      priceMax = initial.priceMax ?? priceMax;
      sqftMin = initial.sqftMin ?? sqftMin;
      sqftMax = initial.sqftMax ?? sqftMax;
      beds = initial.beds != null ? String(initial.beds) : beds;
      baths = initial.baths != null ? String(initial.baths) : baths;
      housingType = initial.housingType ?? housingType;
      rentPeriod = initial.rentPeriod ?? rentPeriod;
      laundry = initial.laundry ?? laundry;
      parking = initial.parking ?? parking;
      amenities = { ...amenities, ...(initial.amenities || {}) };
      openHouseDate = initial.openHouseDate ?? openHouseDate;
      popularSearch = initial.popularSearch ?? popularSearch;
      resultOptions = { ...resultOptions, ...(initial.resultOptions || {}) };
      selectedChart = initial.priceChartSelection ?? selectedChart;

      emitChange();
    }

    const onKey = (e) => {
      if (e.key === "Escape" && open) {
        open = false;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // react to updated initial prop (if parent changes filters)
  $: if (initial && open === false) {
    // update local values to reflect initial when overlay closed (avoid overwriting while user edits)
    q = initial.q ?? q;
    minBeds = initial.minBeds ?? minBeds;
    maxPrice = initial.maxPrice ?? maxPrice;
    city = initial.city ?? city;
    petsAllowed = initial.petsAllowed ?? petsAllowed;

    miles = initial.miles ?? miles;
    zip = initial.zip ?? zip;
    priceMin = initial.priceMin ?? priceMin;
    priceMax = initial.priceMax ?? priceMax;
    sqftMin = initial.sqftMin ?? sqftMin;
    sqftMax = initial.sqftMax ?? sqftMax;
    beds = initial.beds != null ? String(initial.beds) : beds;
    baths = initial.baths != null ? String(initial.baths) : baths;
    housingType = initial.housingType ?? housingType;
    rentPeriod = initial.rentPeriod ?? rentPeriod;
    laundry = initial.laundry ?? laundry;
    parking = initial.parking ?? parking;
    amenities = { ...amenities, ...(initial.amenities || {}) };
    openHouseDate = initial.openHouseDate ?? openHouseDate;
    popularSearch = initial.popularSearch ?? popularSearch;
    resultOptions = { ...resultOptions, ...(initial.resultOptions || {}) };
    selectedChart = initial.priceChartSelection ?? selectedChart;
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

  // helper: select price chart option
  function selectChart(opt) {
    if (selectedChart && selectedChart.id === opt.id) {
      selectedChart = null;
      priceMin = "";
      priceMax = "";
    } else {
      selectedChart = opt;
      priceMin = String(opt.min);
      priceMax = String(opt.max);
    }
    emitChange();
  }
</script>

<button
  class="filter-icon"
  aria-label="Open filters"
  on:click={openOverlay}
  title="Filters"
>
  <!-- filter SVG -->
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
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
          <button
            class="close"
            type="button"
            on:click={closeOverlay}
            aria-label="Close">✕</button
          >
        </div>
      </header>

      <div class="modal-body">
        <!-- extended filter UI -->
        <div class="filter-grid">
          <!-- 1. Miles from location / Zip -->
          <section class="section">
            <h4>Location</h4>
            <div class="field-row">
              <label>
                Miles from location
                <input
                  type="number"
                  min="0"
                  placeholder="Miles"
                  bind:value={miles}
                  on:input={() => emitChange()}
                />
              </label>
              <label>
                Zip code
                <input
                  type="text"
                  placeholder="ZIP"
                  bind:value={zip}
                  on:input={() => emitChange()}
                />
              </label>
            </div>
          </section>

          <!-- 2. Price (min - max) + chart selection -->
          <section class="section">
            <h4>Price</h4>
            <div class="field-row">
              <label>
                Min price
                <input
                  type="number"
                  min="0"
                  placeholder="Min"
                  bind:value={priceMin}
                  on:input={() => {
                    selectedChart = null;
                    emitChange();
                  }}
                />
              </label>
              <label>
                Max price
                <input
                  type="number"
                  min="0"
                  placeholder="Max"
                  bind:value={priceMax}
                  on:input={() => {
                    selectedChart = null;
                    emitChange();
                  }}
                />
              </label>
            </div>

            <div class="chart-row">
              {#each priceChartOptions as opt}
                <button
                  type="button"
                  class:selected={selectedChart && selectedChart.id === opt.id}
                  on:click={() => selectChart(opt)}
                >
                  {opt.label}
                </button>
              {/each}
            </div>
          </section>

          <!-- 3. Sqft -->
          <section class="section">
            <h4>Sqft</h4>
            <div class="field-row">
              <label>
                Min sqft
                <input
                  type="number"
                  min="0"
                  placeholder="Min"
                  bind:value={sqftMin}
                  on:input={() => emitChange()}
                />
              </label>
              <label>
                Max sqft
                <input
                  type="number"
                  min="0"
                  placeholder="Max"
                  bind:value={sqftMax}
                  on:input={() => emitChange()}
                />
              </label>
            </div>
          </section>

          <!-- 4. Bedrooms / Bathrooms -->
          <section class="section">
            <h4>Beds / Baths</h4>
            <div class="field-row">
              <label>
                Bedrooms
                <select bind:value={beds} on:change={() => emitChange()}>
                  <option value="0">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </label>
              <label>
                Bathrooms
                <select bind:value={baths} on:change={() => emitChange()}>
                  <option value="0">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
              </label>
            </div>
          </section>

          <!-- 5. Dropdowns: housing type, rent period, laundry, parking -->
          <section class="section">
            <h4>Property Options</h4>
            <div class="field-row">
              <label>
                Housing type
                <select bind:value={housingType} on:change={() => emitChange()}>
                  <option value="">Any</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Condo</option>
                  <option>Townhouse</option>
                  <option>Studio</option>
                </select>
              </label>

              <label>
                Rent period
                <select bind:value={rentPeriod} on:change={() => emitChange()}>
                  <option value="">Any</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </label>
            </div>

            <div class="field-row">
              <label>
                Laundry
                <select bind:value={laundry} on:change={() => emitChange()}>
                  <option value="">Any</option>
                  <option>Onsite</option>
                  <option>In unit</option>
                  <option>Shared</option>
                </select>
              </label>
              <label>
                Parking
                <select bind:value={parking} on:change={() => emitChange()}>
                  <option value="">Any</option>
                  <option>Off-street</option>
                  <option>Garage</option>
                  <option>Street</option>
                </select>
              </label>
            </div>
          </section>

          <!-- 6. Amenities checkboxes -->
          <section class="section">
            <h4>Amenities</h4>
            <div class="checkbox-grid">
              <label
                ><input
                  type="checkbox"
                  bind:checked={amenities.petsOk}
                  on:change={() => emitChange()}
                /> Pets OK</label
              >
              <label
                ><input
                  type="checkbox"
                  bind:checked={amenities.furnished}
                  on:change={() => emitChange()}
                /> Furnished</label
              >
              <label
                ><input
                  type="checkbox"
                  bind:checked={amenities.noSmoking}
                  on:change={() => emitChange()}
                /> No Smoking</label
              >
              <label
                ><input
                  type="checkbox"
                  bind:checked={amenities.wheelchair}
                  on:change={() => emitChange()}
                /> Wheelchair accessible</label
              >
              <label
                ><input
                  type="checkbox"
                  bind:checked={amenities.ac}
                  on:change={() => emitChange()}
                /> Air conditioning</label
              >
              <label
                ><input
                  type="checkbox"
                  bind:checked={amenities.evCharging}
                  on:change={() => emitChange()}
                /> EV charging</label
              >
              <label
                ><input
                  type="checkbox"
                  bind:checked={amenities.noBrokerFee}
                  on:change={() => emitChange()}
                /> No broker fee</label
              >
              <label
                ><input
                  type="checkbox"
                  bind:checked={amenities.noApplicationFee}
                  on:change={() => emitChange()}
                /> No application fee</label
              >
            </div>
          </section>

          <!-- 7. Open House Date -->
          <section class="section">
            <h4>Open House</h4>
            <div class="field-row">
              <label>
                Open house date
                <input
                  type="date"
                  bind:value={openHouseDate}
                  on:input={() => emitChange()}
                />
              </label>
            </div>
          </section>

          <!-- 8. Popular searches + result properties -->
          <section class="section">
            <h4>Quick picks & results</h4>
            <div class="field-row">
              <label>
                Popular searches
                <select
                  bind:value={popularSearch}
                  on:change={() => emitChange()}
                >
                  <option value="">Choose preset</option>
                  <option>One bedroom apartment for rent</option>
                  <option>Studio</option>
                  <option>Two bedroom near downtown</option>
                  <option>Pet friendly</option>
                </select>
              </label>
            </div>

            <div class="checkbox-grid">
              <label
                ><input
                  type="checkbox"
                  bind:checked={resultOptions.titlesOnly}
                  on:change={() => emitChange()}
                /> Search titles only</label
              >
              <label
                ><input
                  type="checkbox"
                  bind:checked={resultOptions.hasImage}
                  on:change={() => emitChange()}
                /> Has image</label
              >
              <label
                ><input
                  type="checkbox"
                  bind:checked={resultOptions.postedToday}
                  on:change={() => emitChange()}
                /> Posted today</label
              >
              <label
                ><input
                  type="checkbox"
                  bind:checked={resultOptions.showDuplicates}
                  on:change={() => emitChange()}
                /> Show duplicates</label
              >
            </div>
          </section>
        </div>
      </div>

      <footer class="modal-footer">
        <div class="left-actions">
          <button class="reset" type="button" on:click={reset}>Reset</button>
        </div>

        <div class="right-actions">
          <button type="button" class="apply" on:click={closeOverlay}
            >Apply</button
          >
        </div>
      </footer>
    </div>
  </div>
{/if}

<style>
  .filter-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    background: #fff;
    cursor: pointer;
  }
  .filter-icon svg {
    color: #0f172a;
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(2, 6, 23, 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }
  .modal {
    width: 100%;
    max-width: 720px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(2, 6, 23, 0.2);
    display: flex;
    flex-direction: column;
  }
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px 0 15px;
    border-bottom: 1px solid #eef2f7;
  }
  .modal-body {
    padding: 1rem;
    max-height: 450px;
    overflow-y: auto;
  }
  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-top: 1px solid #eef2f7;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .reset {
    background: transparent;
    border: 1px solid #e6eef5;
    padding: 0.35rem 0.6rem;
    border-radius: 4px;
    cursor: pointer;
  }
  .close {
    background: transparent;
    border: none;
    font-size: 1rem;
    cursor: pointer;
  }
  .apply {
    padding: 0.5rem 0.8rem;
    border-radius: 4px;
    border: 1px solid #0f172a;
    background: #0f172a;
    color: #fff;
    cursor: pointer;
  }

  /* layout for extended filter body */
  .filter-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
  }
  .section {
    border-radius: 6px;
    padding: 0.5rem;
    background: #fafafa;
  }
  .section h4 {
    margin: 0 0 0.5rem 0;
    font-size: 0.95rem;
  }
  .field-row {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
  }
  .field-row label {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    min-width: 120px;
  }
  input[type="number"],
  input[type="text"],
  input[type="date"],
  select {
    padding: 0.4rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .chart-row {
    display: flex;
    gap: 0.4rem;
    margin-top: 0.5rem;
    flex-wrap: wrap;
  }
  .chart-row button {
    padding: 0.35rem 0.6rem;
    border-radius: 999px;
    border: 1px solid #e6eef5;
    background: #fff;
    cursor: pointer;
  }
  .chart-row button.selected {
    background: #0f172a;
    color: #fff;
    border-color: #0f172a;
  }

  .checkbox-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.4rem;
  }
  .checkbox-grid label {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    font-size: 0.9rem;
  }

  /* keep modal footer left/right layout */
  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #eef2f7;
  }
</style>
