<script>
  import { createEventDispatcher, onMount } from "svelte";
  import { fly } from "svelte/transition";

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
  const quickOptions = [
    { id: 1, label: "< $1k", min: null, max: 999 },
    { id: 2, label: "$1k - $2k", min: 1000, max: 1999 },
    { id: 3, label: "$2k - $3k", min: 2000, max: 2999 },
    { id: 4, label: "$3k+", min: 3000, max: null },
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

  // reset filters
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

      // new initial fields
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

  // react to updated initial props
  $: if (initial && open === false) {
    // update local values to reflect initial when overlay closed
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

  // Select price chart option
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

  // section-applied reactive flags
  $: locationApplied =
    (miles !== "" && miles != null) || (zip !== "" && zip != null);
  $: priceApplied =
    (priceMin !== "" && priceMin != null) ||
    (priceMax !== "" && priceMax != null) ||
    selectedChart !== null;
  $: sqftApplied =
    (sqftMin !== "" && sqftMin != null) || (sqftMax !== "" && sqftMax != null);
  $: bedsBathsApplied = Number(beds) > 0 || Number(baths) > 0;
  $: propertyOptionsApplied = !!(
    housingType ||
    rentPeriod ||
    laundry ||
    parking
  );
  $: amenitiesApplied = Object.values(amenities).some(Boolean);
  $: openHouseApplied = !!openHouseDate;
  $: popularResultsApplied =
    !!popularSearch || Object.values(resultOptions).some(Boolean);

  $: appliedCount = [
    locationApplied,
    priceApplied,
    sqftApplied,
    bedsBathsApplied,
    propertyOptionsApplied,
    amenitiesApplied,
    openHouseApplied,
    popularResultsApplied,
  ].filter(Boolean).length;
</script>

<button
  class="filter-btn"
  aria-label="Open filters"
  on:click={openOverlay}
  title="Filters"
>
  <span class="label">Advanced Filters</span>
  {#if appliedCount > 0}
    <span class="badge" aria-hidden="true">{appliedCount}</span>
  {/if}
</button>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
{#if open}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="overlay" role="dialog" aria-modal="true" on:click={backdropClick}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="modal"
      on:click|stopPropagation
      transition:fly={{ x: -800, duration: 320 }}
    >
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
        <!-- filter UI -->
        <div class="filter-grid">
          <!-- Miles -->
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

          <!-- Price (min - max) -->
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
              {#each quickOptions as opt}
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

          <!-- Square feet -->
          <section class="section">
            <h4>Square feet (sqft)</h4>
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

          <!-- Bedrooms / Bathrooms -->
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

          <!-- Housing type, rent period, laundry, parking -->
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

          <!-- Amenities checkboxes -->
          <section class="section">
            <h4>Amenities</h4>
            <div class="checkbox-grid">
              <label class="chk">
                <input
                  type="checkbox"
                  bind:checked={amenities.petsOk}
                  on:change={() => emitChange()}
                />
                <span class="box" aria-hidden="true"></span>
                <span class="lbl">Pets OK</span>
              </label>

              <label class="chk">
                <input
                  type="checkbox"
                  bind:checked={amenities.furnished}
                  on:change={() => emitChange()}
                />
                <span class="box" aria-hidden="true"></span>
                <span class="lbl">Furnished</span>
              </label>

              <label class="chk">
                <input
                  type="checkbox"
                  bind:checked={amenities.noSmoking}
                  on:change={() => emitChange()}
                />
                <span class="box" aria-hidden="true"></span>
                <span class="lbl">No Smoking</span>
              </label>

              <label class="chk">
                <input
                  type="checkbox"
                  bind:checked={amenities.wheelchair}
                  on:change={() => emitChange()}
                />
                <span class="box" aria-hidden="true"></span>
                <span class="lbl">Wheelchair accessible</span>
              </label>

              <label class="chk">
                <input
                  type="checkbox"
                  bind:checked={amenities.ac}
                  on:change={() => emitChange()}
                />
                <span class="box" aria-hidden="true"></span>
                <span class="lbl">Air conditioning</span>
              </label>

              <label class="chk">
                <input
                  type="checkbox"
                  bind:checked={amenities.evCharging}
                  on:change={() => emitChange()}
                />
                <span class="box" aria-hidden="true"></span>
                <span class="lbl">EV charging</span>
              </label>

              <label class="chk">
                <input
                  type="checkbox"
                  bind:checked={amenities.noBrokerFee}
                  on:change={() => emitChange()}
                />
                <span class="box" aria-hidden="true"></span>
                <span class="lbl">No broker fee</span>
              </label>

              <label class="chk">
                <input
                  type="checkbox"
                  bind:checked={amenities.noApplicationFee}
                  on:change={() => emitChange()}
                />
                <span class="box" aria-hidden="true"></span>
                <span class="lbl">No application fee</span>
              </label>
            </div>
          </section>

          <!-- Open House Date -->
          <section class="section">
            <h4>Open House Date</h4>
            <div class="field-row">
                <input
                  type="date"
                  bind:value={openHouseDate}
                  on:input={() => emitChange()}
                />
            </div>
          </section>

          <!-- Quick picks & results -->
          <section class="section">
            <h4>Quick picks & results</h4>
            <div class="field-row">
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
            </div>

            <div class="checkbox-grid">
              <label class="chk">
                <input
                  type="checkbox"
                  bind:checked={resultOptions.titlesOnly}
                  on:change={() => emitChange()}
                />
                <span class="box" aria-hidden="true"></span>
                <span class="lbl">Search titles only</span>
              </label>

              <label class="chk">
                <input
                  type="checkbox"
                  bind:checked={resultOptions.hasImage}
                  on:change={() => emitChange()}
                />
                <span class="box" aria-hidden="true"></span>
                <span class="lbl">Has image</span>
              </label>

              <label class="chk">
                <input
                  type="checkbox"
                  bind:checked={resultOptions.postedToday}
                  on:change={() => emitChange()}
                />
                <span class="box" aria-hidden="true"></span>
                <span class="lbl">Posted today</span>
              </label>

              <label class="chk">
                <input
                  type="checkbox"
                  bind:checked={resultOptions.showDuplicates}
                  on:change={() => emitChange()}
                />
                <span class="box" aria-hidden="true"></span>
                <span class="lbl">Show duplicates</span>
              </label>
            </div>
          </section>
        </div>
      </div>

      <footer class="modal-footer">
        <div class="left-actions">
          <button class="reset" type="button" on:click={reset}>Clear</button>
        </div>

        <div class="right-actions">
          <!-- Filters are emitted on every change; show a saved-as-you-go message -->
          <div class="saved-msg" aria-live="polite">
            <!-- simple check icon -->
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Filters saved as you go!</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
{/if}

<style>
  .filter-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.6rem;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    background: #fff;
    cursor: pointer;
    font-weight: 500;
  }
  .filter-btn .label {
    color: #0f172a;
  }
  .filter-btn .badge {
    display: inline-flex;
    min-width: 15px;
    height: 20px;
    padding: 0 6px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: darkcyan;
    color: #fff;
    font-size: 0.85rem;
    line-height: 1;
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(2, 6, 23, 0.35);
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    z-index: 1000;
    padding: 0;
  }

  .modal {
    width: min(420px, 95vw);
    max-width: 420px;
    height: 100vh;
    background: #fff;
    box-shadow: 6px 0 30px rgba(2, 6, 23, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .modal-header {
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: sandybrown;
  }

  .modal-header h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }

  .close {
    background: transparent;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    margin-left: 0;
  }

  .modal-body {
    padding: 1rem;
    overflow-y: auto;
    max-height: calc(100vh - 120px);
  }

  .filter-grid {
    display: grid;
    gap: 1rem;
  }

  .modal-footer {
    padding: 0.6rem 0.75rem;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .reset {
    border-radius: 4px;
    background-color: #eef2f7;
    padding: 0.35rem 0.6rem;
    cursor: pointer;
  }
  .close {
    background: transparent;
    border: none;
    font-size: 1rem;
    cursor: pointer;
    margin-left: 0;
  }

  .saved-msg {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #065f46;
    background: #ecfdf5;
    padding: 0.35rem 0.6rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
  }
  .saved-msg svg { color: #10b981; }
  .saved-msg span { display:inline-block; line-height:1; }

  .section {
    padding: 0.5rem;
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

  .modal-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #eef2f7;
  }

  /* Add subtle separator lines between sections */
  .section + .section {
    border-top: 0.3px solid gray;
    margin-top: 0.6rem;
    padding-top: 0.75rem;
  }

  /* Rounded box + animation for checkbox controls */
  .chk {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.35rem 0.4rem;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
    transition: background 160ms ease, transform 120ms ease;
  }

  /* hide native checkbox but keep it accessible */
  .chk input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    /* keep pointer events so keyboard focus still works */
  }
 
  /* visual box */
  .chk .box {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 6px;
    border: 1px solid #cbd5e1;
    background: #fff;
    flex: 0 0 20px;
    transition: all 180ms ease;
    box-shadow: inset 0 0 0 rgba(0,0,0,0);
    display: inline-block;
  }

  /* checkmark drawn with borders on a rotated pseudo-element */
  .chk .box::after {
    content: "";
    position: absolute;
    left: 6px;
    top: 2px;
    width: 6px;
    height: 10px;
    border-right: 2px solid transparent;
    border-bottom: 2px solid transparent;
    transform: rotate(40deg) scale(0.8);
    opacity: 0;
    transition: opacity 180ms ease, transform 200ms ease, border-color 180ms ease;
  }

  /* show checkmark when checked */
  .chk input[type="checkbox"]:checked + .box {
    background: #e6ffed;
    border-color: #34d399;
    transform: scale(1.02);
    box-shadow: 0 0 0 3px rgba(52,211,153,0.08);
  }
  .chk input[type="checkbox"]:checked + .box::after {
    border-right-color: #065f46;
    border-bottom-color: #065f46;
    transform: rotate(40deg) scale(1);
    opacity: 1;
  }

  /*light green background + subtle ticker/pulse animation */
  .chk input[type="checkbox"]:checked + .box {
    background: #e6ffed;
    border-color: #34d399;
    transform: scale(1.02);
    box-shadow: 0 0 0 3px rgba(52,211,153,0.08);
    animation: chk-pulse 420ms ease;
  }

  .chk:hover {
    background: rgba(15,23,42,0.03);
  }

  /* checked label text color */
  .chk input[type="checkbox"]:checked + .box + .lbl {
    color: #065f46;
    font-weight: 600;
  }

  @keyframes chk-pulse {
    0% { transform: scale(0.96); box-shadow: 0 0 0 0 rgba(52,211,153,0.08); }
    60% { transform: scale(1.06); box-shadow: 0 0 0 6px rgba(52,211,153,0.06); }
    100% { transform: scale(1.02); box-shadow: 0 0 0 3px rgba(52,211,153,0.03); }
  }

  /* ensure grid spacing still looks good with pill-style labels */
  .checkbox-grid .chk {
    display:flex;
    align-items:center;
    padding:0.35rem 0.6rem;
    margin: 0;
  }

  /* keep responsive layout */
  @media (max-width: 420px) {
    .chk { padding: 0.25rem 0.4rem; }
    .chk .lbl { font-size: 0.9rem; }
  }
</style>
