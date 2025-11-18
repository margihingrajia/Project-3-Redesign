<script>
  // import pictures for each category
  import communityImg from "../../public/Community.png";
  import housingImg from "../../public/Housing.png";
  import jobsImg from "../../public/Jobs.png";
  import servicesImg from "../../public/Services.png";
  import forSaleImg from "../../public/For Sale.png";
  import discussionImg from "../../public/Discussion Forums.png";
  import gigsImg from "../../public/Gigs.png";
  import resumeImg from "../../public/Resume.png";

  // CATEGORY → ROUTE MAP
  const routeMap = {
    "Community": "#/community",
    "Housing": "#/apartment-housing",
    "Jobs": "#/jobs",
    "Services": "#/services",
    "For Sale": "#/for-sale",
    "Discussion Forums": "#/forums",
    "Gigs": "#/gigs",
    "Resumes": "#/resumes"
  };

  // category name + picture
  const categories = [
    { name: "Community", image: communityImg },
    { name: "Housing", image: housingImg },
    { name: "Jobs", image: jobsImg },
    { name: "Services", image: servicesImg },
    { name: "For Sale", image: forSaleImg },
    { name: "Discussion Forums", image: discussionImg },
    { name: "Gigs", image: gigsImg },
    { name: "Resumes", image: resumeImg }
  ];

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentMonthName = monthNames[currentMonth];

  function buildCalendar(year, month) {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstDayOfMonth; i++) cells.push(null);

    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({
        number: d,
        isToday:
          year === currentYear &&
          month === currentMonth &&
          d === today.getDate()
      });
    }
    return cells;
  }

  const calendarDays = buildCalendar(currentYear, currentMonth);

  // Redirect function
  function goTo(category) {
    const hash = routeMap[category];
    if (hash) location.hash = hash;
  }
</script>

<div class="page">
  <!-- top bar -->
  <header class="top-bar">
    <div class="logo-area">
      <span class="logo">☮</span>
      <span class="site-name">Craigslist</span>
    </div>

    <div class="search-area">
      <input type="text" placeholder="Search Craigslist" aria-label="Search Craigslist" />
    </div>

    <div class="top-buttons">
      <button>Favs</button>
      <button>Post</button>
      <button>Acct</button>
    </div>
  </header>

  <div class="main">
    <!-- LEFT COLUMN -->
    <aside class="left">
      <ul class="left-links">
        <li on:click={() => goTo("Community")}>Community</li>
        <li on:click={() => goTo("Housing")}>Housing</li>
        <li on:click={() => goTo("Jobs")}>Jobs</li>
        <li on:click={() => goTo("Services")}>Services</li>
        <li on:click={() => goTo("For Sale")}>For Sale</li>
        <li on:click={() => goTo("Gigs")}>Gigs</li>
        <li on:click={() => goTo("Resumes")}>Resumes</li>
        <li on:click={() => goTo("Discussion Forums")}>Discussion Forums</li>
      </ul>

      <div class="info-links">
        <a href="#">help, faq, abuse, legal</a>
        <a href="#">avoid scams & fraud</a>
        <a href="#">personal safety tips</a>

        <br />

        <a href="#">about craigslist</a>
        <a href="#">best-of-craigslist</a>
        <a href="#">craigslist is hiring</a>
        <a href="#">what's new</a>
        <a href="#">system status</a>

        <br />

        <div class="charity-title">craigslist charitable</div>

        <br />

        <a href="#">craig newmark philanthropies</a>
      </div>

      <div class="calendar">
        <div class="calendar-header">
          <span>{currentMonthName} {currentYear}</span>
        </div>

        <div class="calendar-row day-names">
          {#each dayNames as d}
            <div>{d}</div>
          {/each}
        </div>

        <div class="calendar-row days">
          {#each calendarDays as day}
            {#if day === null}
              <div class="day empty"></div>
            {:else}
              <div class="day {day.isToday ? 'today' : ''}">
                {day.number}
              </div>
            {/if}
          {/each}
        </div>
      </div>
    </aside>

    <!-- CENTER COLUMN -->
    <main class="center">
      <div class="category-grid">
        {#each categories as category}
          <div
            class="category-card"
            on:click={() => goTo(category.name)}
          >
            <h3>{category.name}</h3>
            <div class="pic-box">
              <img src={category.image} alt={category.name} />
            </div>
          </div>
        {/each}
      </div>
    </main>

    <!-- RIGHT COLUMN -->
    <aside class="right">
      <button class="filter" on:click={() => showMap = true}>
    {selectedLocation} ▼
  </button>
    </aside>
    {#if showMap}
  <div class="map-overlay">
    <div class="map-box">
      <h3>Select Location</h3>
      <div bind:this={mapContainer} class="map"></div>

      <button class="close-btn" on:click={() => showMap = false}>
        Close
      </button>
    </div>
  </div>
{/if}
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: system-ui, sans-serif;
    background: #e5e7eb;
  }

  /************ TOP BAR ************/
  .top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    background: white;
    border-bottom: 1px solid #d1d5db;
  }

  .logo-area {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .logo {
    border: 1px solid #9ca3af;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .site-name {
    font-weight: 600;
  }

  .search-area {
    flex: 1;
    padding: 0 16px;
  }

  .search-area input {
    width: 100%;
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid #d1d5db;
  }

  .top-buttons button {
    margin-left: 8px;
    padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid #9ca3af;
    background: #f3f4f6;
    cursor: pointer;
  }

  /************ MAIN LAYOUT ************/
  .main {
    flex: 1;
    display: grid;
    grid-template-columns: 200px 1fr 180px;
    gap: 16px;
    padding: 16px;
  }

  /************ LEFT COLUMN ************/
  .left-links {
    list-style: none;
    padding: 8px;
    margin: 0 0 16px 0;
    background: #f9fafb;
    border: 1px solid #d1d5db;
  }

  .left-links li {
    padding: 6px 0;
    border-bottom: 1px solid #e5e7eb;
    cursor: pointer;
    transition: 0.2s;
    font-size: 14px;
  }

  .left-links li:hover {
    color: #2563eb;
  }

  .info-links {
    display: flex;
    flex-direction: column;
    padding: 8px;
    margin-bottom: 16px;
    background: #ffffff;
    border: 1px solid #d1d5db;
    font-size: 13px;
  }

  .info-links a {
    color: #1d4ed8;
    text-decoration: none;
    padding: 2px 0;
  }

  .info-links a:hover {
    text-decoration: underline;
  }

  .charity-title {
    margin-top: 6px;
    color: #1d4ed8;
    font-weight: 600;
  }

  /************ CALENDAR ************/
  .calendar {
    border: 1px solid #d1d5db;
    background: white;
    padding: 8px;
    font-size: 12px;
  }

  .calendar-header {
    text-align: center;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .calendar-row {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .day-names div {
    text-align: center;
    font-weight: 600;
  }

  .days .day {
    text-align: center;
    padding: 4px 0;
    border-radius: 4px;
  }

  .day.today {
    background: #2563eb;
    color: white;
    font-weight: 700;
  }

  /************ CENTER COLUMN ************/
  .center {
    background: #f9fafb;
    border: 1px solid #d1d5db;
    padding: 16px;
  }

  /* UPDATED → 3 cards per row */
  .category-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  .category-card {
    background: white;
    border: 1px solid #d1d5db;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s ease;
  }

  .category-card:hover {
    transform: translateY(-3px);
    border-color: #2563eb;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  }

  /* UPDATED → heading color purple (#a020f0) */
  .category-card h3 {
    margin: 0 0 6px 0;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    color: #a020f0;
  }

  .pic-box {
    text-align: center;
    padding: 6px;
  }

  .pic-box img {
    max-width: 100%;
    max-height: 90px;
    object-fit: contain;
  }

  /************ RIGHT COLUMN ************/
  .right .filter {
    display: block;
    width: 100%;
    margin-bottom: 6px;
    padding: 6px 8px;
    border-radius: 6px;
    border: 1px solid #9ca3af;
    background: #f3f4f6;
    cursor: pointer;
  }
</style>
