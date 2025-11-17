<script>
  // import pictures for each category
  import communityImg from "../Community.png";
  import housingImg from "../Housing.png";
  import jobsImg from "../Jobs.png";
  import servicesImg from "../Services.png";
  import forSaleImg from "../For Sale.png";
  import discussionImg from "../Discussion Forums.png";
  import gigsImg from "../Gigs.png";
  import resumeImg from "../Resume.png";

  // category name + matching picture
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

  // today's date
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0–11
  const currentMonthName = monthNames[currentMonth];

  // build list of cells for the calendar grid
  function buildCalendar(year, month) {
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0–6
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];

    // empty cells before day 1 so the month starts on the correct weekday
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(null);
    }

    // one object per calendar day
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
</script>

<div class="page">
  <!-- top bar -->
  <header class="top-bar">
    <div class="logo-area">
      <span class="logo">☮</span>
      <span class="site-name">craigslist – Cincinnati</span>
    </div>

    <div class="search-area">
      <input
        type="text"
        placeholder="Search Craigslist"
        aria-label="Search Craigslist"
      />
    </div>

    <div class="top-buttons">
      <button>Favs</button>
      <button>Post</button>
      <button>Acct</button>
    </div>
  </header>

  <div class="main">
    <!-- left column -->
    <aside class="left">
      <ul class="left-links">
        <li>Community</li>
        <li>Housing</li>
        <li>Jobs</li>
        <li>Services</li>
        <li>For Sale</li>
        <li>Gigs</li>
        <li>Resumes</li>
        <li>Discussion Forums</li>
      </ul>

      <!-- simple calendar -->
      <aside class="left">
  <!-- main category links -->
  <ul class="left-links">
    <li>Community</li>
    <li>Housing</li>
    <li>Jobs</li>
    <li>Services</li>
    <li>For Sale</li>
    <li>Gigs</li>
    <li>Resumes</li>
    <li>Discussion Forums</li>
  </ul>

  <!-- NEW craigslist info links -->
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

  <!-- calendar stays as-is below -->
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


    <!-- middle column -->
    <main class="center">
      <div class="category-grid">
        {#each categories as category}
          <div class="category-card">
            <h3>{category.name}</h3>
            <div class="pic-box">
              <img src={category.image} alt={category.name} />
            </div>
          </div>
        {/each}
      </div>
    </main>

    <!-- right column -->
    <aside class="right">
      <button class="filter">English ▼</button>
      <button class="filter">Nearby ▼</button>
      <button class="filter">US Cities ▼</button>
      <button class="filter">US States ▼</button>
      <button class="filter">Canada ▼</button>
      <button class="filter">Worldwide ▼</button>
    </aside>
  </div>

  <!-- footer -->
  <footer class="footer">
    <a href="#">Help</a>
    <a href="#">Safety</a>
    <a href="#">Privacy</a>
    <a href="#">Terms</a>
    <a href="#">About</a>
    <a href="#">App</a>
    <a href="#">Sitemap</a>
  </footer>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: system-ui, sans-serif;
    background: #e5e7eb;
  }

  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* top bar */

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
    border-radius: 4px;
    border: 1px solid #d1d5db;
  }

  .top-buttons button {
    margin-left: 8px;
    padding: 4px 10px;
  }

  /* main layout */

  .main {
    flex: 1;
    display: grid;
    grid-template-columns: 200px 1fr 180px;
    gap: 16px;
    padding: 16px;
  }

  /* left column */

  .left-links {
    list-style: none;
    padding: 8px;
    margin: 0 0 16px 0;
    background: #f9fafb;
    border: 1px solid #d1d5db;
  }

  .left-links li {
    padding: 4px 0;
    border-bottom: 1px solid #e5e7eb;
    font-size: 14px;
  }

  .left-links li:last-child {
    border-bottom: none;
  }

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
    padding: 2px 0;
  }

  .days .day {
    text-align: center;
    padding: 4px 0;
    border-radius: 4px;
  }

  .days .day.today {
    background: #2563eb;
    color: white;
    font-weight: 600;
  }

  .days .day.empty {
    background: transparent;
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
  color: #1d4ed8; /* Craigslist blue */
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

  /* middle column */

  .center {
    background: #f9fafb;
    border: 1px solid #d1d5db;
    padding: 16px;
  }

  .category-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  .category-card {
    background: white;
    border: 1px solid #d1d5db;
    padding: 8px;
  }

  .category-card h3 {
    margin: 0 0 6px 0;
    font-size: 14px;
  }

  .pic-box {
    border: 1px dashed #9ca3af;
    text-align: center;
    padding: 4px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pic-box img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  /* right column */

  .right .filter {
    display: block;
    width: 100%;
    margin-bottom: 6px;
    padding: 4px 6px;
  }

  /* footer */

  .footer {
    background: white;
    border-top: 1px solid #d1d5db;
    padding: 8px 16px 12px;
    font-size: 13px;
  }

  .footer a {
    margin-right: 12px;
    color: #4b5563;
    text-decoration: none;
  }
</style>
