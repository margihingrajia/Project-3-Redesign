<script>
  import { onMount } from "svelte";
  import { apartments } from "../data.js";

  export let id;

  let apt = apartments.find(a => a.id == id);
  let images = [];

  onMount(async () => {
    const loaded = [];
    let index = 1;

    while (true) {
      const path = `/apartment${id}/img${index}.webp`;
      try {
        const res = await fetch(path, { method: "HEAD" });
        if (!res.ok) break;
        loaded.push(path);
        index++;
      } catch {
        break;
      }
    }

    images = loaded;
  });

  function goBack() {
    history.back();
  }

  let showLightbox = false;
  let currentIndex = 0;

  function openLightbox(i) {
    currentIndex = i;
    showLightbox = true;
  }

  function nextImg() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  function prevImg() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  /* --------------------------
      TABS
  --------------------------- */
  let activeTab = "description";

  const tabs = ["description", "details", "shipping", "seller"];
</script>

<!-- ======================================================
     FULL PAGE WRAPPER → One Big Card, Full Width
====================================================== -->
<div class="page">

  <div class="card">

    <!-- BREADCRUMB -->
    <nav class="breadcrumb">
      <a href="#/">Home</a> /
      <a href="#/apartment-housing">Apartments</a> /
      <span>{apt.title}</span>
    </nav>

    <!-- HEADER -->
    <div class="header-row">
      <button class="back" on:click={goBack}>← Back</button>

      <div class="title-block">
        <h2>{apt.title}</h2>
        <h4>{apt.city} — {apt.beds} Beds</h4>
      </div>

      <div class="price-block">
        <h3>${apt.price}/month</h3>
      </div>
    </div>

    <!-- ======================================================
         IMAGE CAROUSEL (Full width inside card)
    ======================================================= -->
    <div class="carousel">
      <button class="nav prev" on:click={prevImg}>❮</button>

      <img
        class="main-image"
        src={images[currentIndex]}
        alt="Main Photo"
        on:click={() => openLightbox(currentIndex)}
      />

      <button class="nav next" on:click={nextImg}>❯</button>
    </div>

    <!-- THUMBNAILS -->
    <div class="thumbnails">
      {#each images as img, i}
        <img
          src={img}
          alt="Thumbnail"
          class:selected={i === currentIndex}
          on:click={() => (currentIndex = i)}
        />
      {/each}
    </div>

    <!-- ======================================================
         TABS
    ======================================================= -->
    <div class="tabs">
      {#each tabs as t}
        <button
          class:selected={activeTab === t}
          on:click={() => (activeTab = t)}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      {/each}
    </div>

    <!-- ======================================================
         TAB CONTENT
    ======================================================= -->

    {#if activeTab === "description"}
      <div class="tab-content">
        <h3>Description</h3>
        <p>{apt.description}</p>
      </div>
    {/if}

    {#if activeTab === "details"}
      <div class="tab-content">
        <h3>Details</h3>
        <ul>
          {#each apt.features as feature}
            <li>✔ {feature}</li>
          {/each}
        </ul>
      </div>
    {/if}

    {#if activeTab === "shipping"}
      <div class="tab-content">
        <h3>Shipping / Move-in</h3>
        <p>Move-in date: Flexible</p>
        <p>Lease options: 12-month or 6-month</p>
        <p>Utilities: Water + trash included</p>
      </div>
    {/if}

    {#if activeTab === "seller"}
      <div class="tab-content">
        <h3>Seller / Landlord Info</h3>
        <p><strong>Landlord:</strong> {apt.seller}</p>
        <p><strong>Phone:</strong> {apt.phone}</p>

        <input placeholder="Your name" />
        <input placeholder="Your email" />
        <textarea placeholder="Message"></textarea>
        <button class="send">Send Inquiry</button>
      </div>
    {/if}

    <!-- MAP -->
    <div class="map">
      <h3>Location</h3>
      <iframe
        width="100%"
        height="260"
        style="border:0; border-radius: 12px;"
        loading="lazy"
        allowfullscreen
        src="https://maps.google.com/maps?q={encodeURIComponent(apt.city)}&z=13&output=embed">
      </iframe>
    </div>

  </div>
</div>

<style>

:root {
  --card-bg: #ffffff;
  --border: #e4e4e4;
  --accent: #4f46e5;
  --accent-light: #6366f1;
  --text-muted: #666;
}

/* ======================================================
   PAGE WRAPPER → CENTER CONTENT + SIDE MARGINS
====================================================== */
.page {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem 0;       /* top/bottom spacing */
  box-sizing: border-box;
}

.card {
  width: 100%;
  max-width: 1200px;     /* nicely centered layout */
  background: var(--card-bg);
  padding: 0 1rem 3rem;  /* side margins + bottom spacing */
  box-sizing: border-box;
  border-radius: 12px;
  border: 1px solid var(--border);
}

/* ======================================================
   BREADCRUMB
====================================================== */
.breadcrumb {
  font-size: 0.9rem;
  padding: 1rem 0;
}
.breadcrumb a {
  color: var(--accent-light);
  text-decoration: none;
}

/* ======================================================
   HEADER
====================================================== */
.header-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding-bottom: 1rem;
  gap: 1rem;
}

.title-block h2 {
  margin: 0;
  font-size: 1.8rem;
  color: var(--accent);
}
.title-block h4 {
  margin-top: 4px;
  color: var(--text-muted);
}

.price-block h3 {
  font-size: 1.4rem;
  color: #16a34a;
}

/* Back button */
.back {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: var(--accent);
}

/* ======================================================
   CAROUSEL
====================================================== */
.carousel {
  position: relative;
  width: 100%;
  margin-top: 1rem;
}

.main-image {
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 10px;
}

/* Arrows */
.carousel .nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  font-size: 2rem;
  padding: 0.4rem 0.8rem;
  border-radius: 50%;
  cursor: pointer;
}
.carousel .prev { left: 1rem; }
.carousel .next { right: 1rem; }

/* ======================================================
   THUMBNAILS
====================================================== */
.thumbnails {
  margin-top: 0.8rem;
  display: flex;
  gap: 0.6rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.thumbnails img {
  width: 110px;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid transparent;
  cursor: pointer;
}
.thumbnails img.selected {
  border-color: var(--accent-light);
}

/* ======================================================
   TABS
====================================================== */
.tabs {
  display: flex;
  border-bottom: 1px solid var(--border);
  margin-top: 1.5rem;
  gap: 0.3rem;
}

.tabs button {
  flex: 1;
  padding: 0.9rem;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: var(--text-muted);
  border-bottom: 3px solid transparent;
}
.tabs button.selected {
  color: var(--accent);
  border-color: var(--accent-light);
  font-weight: 600;
}

/* ======================================================
   TAB CONTENT
====================================================== */
.tab-content {
  padding: 1rem 0;
}

.send {
  background: var(--accent-light);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1rem;
  cursor: pointer;
}

/* ======================================================
   MAP
====================================================== */
.map {
  margin-top: 2rem;
}

</style>

