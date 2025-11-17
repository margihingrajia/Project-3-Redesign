<script>
  import { onMount } from "svelte";
  import { apartments } from "../data.js";

  export let id;

  let apt = apartments.find(a => a.id == id);
  let images = [];

  /* ---------------------------
     AUTO-LOAD ALL IMAGES
  --------------------------- */
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

  /* ---------------------------
     LIGHTBOX
  --------------------------- */
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
</script>

<!-- ---------------------------------------------
     BREADCRUMB NAVIGATION
---------------------------------------------- -->
<nav class="breadcrumb">
  <a href="#/">Home</a> /
  <a href="#/apartment-housing">Apartments</a> /
  <span>{apt.title}</span>
</nav>

<section>
  <button class="back" on:click={goBack}>← Back</button>

  <h2>{apt.title}</h2>
  <h4>{apt.city} — {apt.beds} Beds</h4>
  <h3 class="price">${apt.price}/month</h3>

  <!-- ---------------------------------------------
       IMAGE GALLERY (click to expand)
  ---------------------------------------------- -->
  <div class="gallery">
    {#each images as img, i}
      <img src={img} alt="Apartment Photo" on:click={() => openLightbox(i)} />
    {/each}
  </div>

  <!-- ---------------------------------------------
       LIGHTBOX
  ---------------------------------------------- -->
  {#if showLightbox}
    <div class="lightbox" on:click={() => (showLightbox = false)}>
      <button class="prev" on:click|stopPropagation={prevImg}>❮</button>
      <img src={images[currentIndex]} />
      <button class="next" on:click|stopPropagation={nextImg}>❯</button>
    </div>
  {/if}

  <!-- ---------------------------------------------
       DESCRIPTION / AMENITIES
  ---------------------------------------------- -->
  <div class="info">
    <h3>Description</h3>
    <p>{apt.description}</p>

    <h3>Amenities</h3>
    <ul>
      {#each apt.features as feature}
        <li>✔ {feature}</li>
      {/each}
    </ul>
  </div>

  <!-- ---------------------------------------------
       CONTACT LANDLORD UI
  ---------------------------------------------- -->
  <div class="contact">
    <h3>Contact Landlord</h3>
    <input placeholder="Your name" />
    <input placeholder="Your email" />
    <textarea placeholder="Message"></textarea>
    <button>Send Inquiry</button>
  </div>

  <!-- ---------------------------------------------
       MAP PREVIEW (STATIC PREVIEW OR IFRAME)
  ---------------------------------------------- -->
  <div class="map">
    <h3>Location</h3>
    <iframe
      title = "Images"
      width="100%"
      height="250"
      style="border:0; border-radius: 12px;"
      loading="lazy"
      allowfullscreen
      src="https://maps.google.com/maps?q={encodeURIComponent(apt.city)}&z=13&output=embed">
    </iframe>
  </div>
</section>

<style>
/* Breadcrumb */
.breadcrumb {
  font-size: 0.9rem;
  margin-bottom: 1rem;
}
.breadcrumb a {
  color: var(--accent-light);
  text-decoration: none;
}

/* Back Button */
.back {
  background: var(--accent-bg);
  border: 2px solid var(--accent-light);
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  color: var(--accent-light);
  margin-bottom: 1rem;
}
.back:hover {
  background: var(--accent-light);
  color: white;
}

/* Titles */
h2 {
  font-size: 1.8rem;
  color: var(--accent);
  margin-bottom: 0.4rem;
}
h4 {
  margin-top: 0;
  color: var(--text-muted);
}
.price {
  margin-top: 0.3rem;
  color: #16a34a;
  font-size: 1.3rem;
  font-weight: 700;
}

/* Image Gallery */
.gallery {
  margin-top: 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
.gallery img {
  width: 100%;
  border-radius: 14px;
  border: 2px solid var(--accent-light);
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform .15s ease;
}
.gallery img:hover {
  transform: scale(1.03);
}

/* Lightbox */
.lightbox {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  backdrop-filter: blur(4px);
  background: rgba(0,0,0,0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
}
.lightbox img {
  max-width: 90%;
  max-height: 80%;
  border-radius: 12px;
}
.lightbox button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  padding: 0.5rem 0.8rem;
  font-size: 2rem;
  cursor: pointer;
  border-radius: 10px;
}
.prev { left: 2rem; }
.next { right: 2rem; }

/* Info */
.info {
  margin-top: 2rem;
}

/* Contact Box */
.contact {
  margin-top: 2rem;
  background: #f8f8ff;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid var(--border);
}
.contact input,
.contact textarea {
  width: 100%;
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin: 0.4rem 0;
}
.contact button {
  padding: 0.6rem 1rem;
  background: var(--accent-light);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

/* Map */
.map {
  margin-top: 2rem;
}
</style>
