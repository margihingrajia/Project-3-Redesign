<script>
  import { onMount } from "svelte";
  import { vehicles } from "../data.js";

  export let id;

  let vehicle = vehicles.find((a) => a.id == id);
  let images = [];
  let mainImage = "";
  let showLightbox = false;
  let showContact = false;
  let showVisit = false;
  let isFavorited = false;

  /* --------------------------------------------------------
     📌 LOAD ALL IMAGES LIKE ApartmentDetails
     -------------------------------------------------------- */
  async function fetchAllImages() {
    const arr = [];
    let index = 1;

    while (true) {
      const path = `/vehicles/vehicle${id}/img${index}.jpg`;

      try {
        const res = await fetch(path, { method: "HEAD" });
        if (!res.ok) break;
        arr.push(path);
        index++;
      } catch {
        break;
      }
    }
    return arr;
  }

  /* --------------------------------------------------------
     📌 SWIPE FOR MOBILE (slideshow)
     -------------------------------------------------------- */
  let touchStartX = 0;

  function startSwipe(e) {
    touchStartX = e.touches[0].clientX;
  }

  function endSwipe(e) {
    const delta = e.changedTouches[0].clientX - touchStartX;

    if (Math.abs(delta) > 50) {
      const idx = images.indexOf(mainImage);

      if (delta < 0 && idx < images.length - 1) {
        mainImage = images[idx + 1];
      } else if (delta > 0 && idx > 0) {
        mainImage = images[idx - 1];
      }
    }
  }

  /* --------------------------------------------------------
     📌 Load vehicle + images
     -------------------------------------------------------- */
  onMount(async () => {
    vehicle = vehicles.find((v) => v.id == id);

    images = await fetchAllImages();
    mainImage = images[0] || "/images/no-image.jpg";
  });

  function goBack() {
    history.back();
  }
</script>

<!-- ========================== -->
<!--     BREADCRUMB NAV         -->
<!-- ========================== -->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<nav class="breadcrumbs">
  <span on:click={goBack}>Vehicles</span> »
  <span>{vehicle?.make} {vehicle?.model}</span>
</nav>

<section class="container">
  <button class="back" on:click={goBack}>← Back</button>

  <!-- svelte-ignore a11y-no-static-element-interactions -->
  {#if vehicle}
    <header>
      <h2>{vehicle.year} {vehicle.make} {vehicle.model}</h2>
      <button class="favorite" on:click={() => (isFavorited = !isFavorited)}>
        {isFavorited ? "❤️ Saved" : "🤍 Save"}
      </button>
    </header>

    <p class="city">{vehicle.city}</p>

    <!-- ⭐ MAIN IMAGE (click to open lightbox) -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="main-image"
      on:click={() => (showLightbox = true)}
      on:touchstart={startSwipe}
      on:touchend={endSwipe}
    >
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src={mainImage} alt="Vehicle photo" />
    </div>

    <!-- ⭐ IMAGE GALLERY THUMBNAILS -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <div class="gallery">
      {#each images as img}
        <img
          src={img}
          alt="Vehicle image"
          class:selected={img === mainImage}
          on:click={() => (mainImage = img)}
        />
      {/each}
    </div>

    <!-- ⭐ PRICE + INFO -->
    <div class="info">
      <h3>Price: ${vehicle.price.toLocaleString()}</h3>
      <p><strong>Mileage:</strong> {vehicle.mileage.toLocaleString()} miles</p>

      <h3>Description</h3>
      <p>{vehicle.description}</p>

      <h3>Features</h3>
      <ul>
        {#each vehicle.features as f}
          <li>✔ {f}</li>
        {/each}
      </ul>

      <div class="actions">
        <button on:click={() => (showContact = true)}>📞 Contact Seller</button>
        <button on:click={() => (showVisit = true)}>📅 Schedule a Visit</button>
      </div>
    </div>
  {/if}
</section>

<!-- ========================== -->
<!--       LIGHTBOX MODAL       -->
<!-- ========================== -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if showLightbox}
  <div class="lightbox" on:click={() => (showLightbox = false)}>
    <img src={mainImage} alt="Zoomed" />
  </div>
{/if}

<!-- ========================== -->
<!--      CONTACT SELLER        -->
<!-- ========================== -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if showContact}
  <div class="modal-bg" on:click={() => (showContact = false)}>
    <div class="modal" on:click|stopPropagation>
      <h3>Contact Seller</h3>
      <input placeholder="Your Name" />
      <input placeholder="Your Email" />
      <textarea placeholder="Message"></textarea>
      <button>Send Message</button>
    </div>
  </div>
{/if}

<!-- ========================== -->
<!--     SCHEDULE A VISIT       -->
<!-- ========================== -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if showVisit}
  <div class="modal-bg" on:click={() => (showVisit = false)}>
    <div class="modal" on:click|stopPropagation>
      <h3>Schedule a Visit</h3>
      <input type="date" />
      <input type="time" />
      <button>Confirm</button>
    </div>
  </div>
{/if}

<style>
  .container {
    padding: 1.5rem;
    font-family: system-ui;
  }

  .breadcrumbs {
    color: #666;
    margin: 1rem 0;
    cursor: pointer;
    font-size: 0.9rem;
  }
  .breadcrumbs span:hover {
    text-decoration: underline;
  }

  .back {
    background: #eef0ff;
    border: 2px solid #6366f1;
    padding: 0.4rem 0.7rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .favorite {
    background: white;
    border: 2px solid #ff507a;
    padding: 0.4rem 0.8rem;
    border-radius: 8px;
    cursor: pointer;
  }

  h2 {
    margin: 0;
    color: #4f46e5;
  }

  .city {
    color: #444;
    margin-bottom: 0.8rem;
  }

  /* Main Image */
  .main-image img {
    width: 100%;
    height: 340px;
    object-fit: cover;
    border-radius: 12px;
    border: 2px solid #ddd;
  }

  /* Gallery */
  .gallery {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    margin: 1rem 0;
  }

  .gallery img {
    width: 80px;
    height: 60px;
    border-radius: 8px;
    cursor: pointer;
    border: 2px solid transparent;
    object-fit: cover;
  }

  .gallery img.selected {
    border-color: #4f46e5;
  }

  /* Info */
  .info ul {
    padding-left: 1rem;
  }

  .actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .actions button {
    padding: 0.6rem 1rem;
    border: none;
    background: #4f46e5;
    color: white;
    border-radius: 8px;
    cursor: pointer;
  }

  /* Lightbox */
  .lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .lightbox img {
    width: 90%;
    max-width: 650px;
    border-radius: 10px;
  }

  /* Modal UI */
  .modal-bg {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: white;
    padding: 1rem;
    border-radius: 12px;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }
  .modal input,
  .modal textarea {
    padding: 0.6rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    width: 100%;
  }
  .modal button {
    padding: 0.6rem;
    background: #4f46e5;
    color: white;
    border-radius: 8px;
    cursor: pointer;
  }
</style>
