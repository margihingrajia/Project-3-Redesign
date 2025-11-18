<script>
  // Current route from parent (passed as `route`)
  export let route = "";

  // Login modal state
  let showLogin = false;
  let email = "";
  let password = "";

  function openLogin() {
    showLogin = true;
  }

  function closeLogin() {
    showLogin = false;
    email = "";
    password = "";
  }

  // Navigation tabs
  const tabs = [
    { name: "Vehicles", hash: "#/vehicles" },
    { name: "Housing", hash: "#/apartment-housing" },
    { name: "Jobs", hash: "#/jobs" },
    { name: "For Sale", hash: "#/for-sale" },
    { name: "Services", hash: "#/services" },
    { name: "More", hash: "#/more" }
  ];

  function go(hash) {
    location.hash = hash;
  }

  // Fixed highlighting logic for all sections
  function isActive(tabHash) {
    switch(tabHash) {
      case "#/apartment-housing":
        return route === "#/apartment-housing" || route.startsWith("#/apartment-housing/details/");
      case "#/vehicles":
        return route === "#/vehicles" || route.startsWith("#/vehicles/details/");
      case "#/jobs":
        return route === "#/jobs" || route.startsWith("#/jobs/details/");
      case "#/for-sale":
        return route === "#/for-sale" || route.startsWith("#/for-sale/details/");
      case "#/services":
        return route === "#/services" || route.startsWith("#/services/details/");
      case "#/more":
        return route === "#/more" || route.startsWith("#/more/details/");
      default:
        return false;
    }
  }
</script>

<!-- NAVBAR -->
<nav class="navbar">
  <!-- LEFT SECTION -->
  <div class="left">
    <div class="logo" on:click={() => (location.hash = "")}>
      <img src="/favicon.ico" alt="Logo" class="logo-img" />
      Craigslist
    </div>

    <ul class="tabs">
      {#each tabs as tab}
        <li
          class:selected={isActive(tab.hash)}
          on:click={() => go(tab.hash)}
        >
          {tab.name}
        </li>
      {/each}
    </ul>
  </div>

  <!-- RIGHT SECTION -->
  <div class="right">
    <button class="small-btn" on:click={openLogin}>Sign In</button>
    <button class="post-btn" on:click={openLogin}>Post</button>
  </div>
</nav>

<!-- LOGIN MODAL -->
{#if showLogin}
  <div class="modal-backdrop" on:click={closeLogin}></div>

  <div class="modal">
    <h2>Sign In</h2>

    <input placeholder="Email" bind:value={email} />
    <input type="password" placeholder="Password" bind:value={password} />

    <button class="submit-btn" on:click={closeLogin}>Continue</button>
    <button class="close-btn" on:click={closeLogin}>Close</button>
  </div>
{/if}

<style>
  /* NAVBAR BASE */
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border-bottom: 1px solid #ddd;
    padding: 0.7rem 1rem;
    font-family: system-ui, sans-serif;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .left {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.4rem;
    font-weight: 700;
    cursor: pointer;
    color: #a020f0;
  }

  .logo-img {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }

  .tabs {
    display: flex;
    gap: 1rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .tabs li {
    padding: 0.4rem 0.6rem;
    cursor: pointer;
    border-radius: 6px;
    font-size: 0.95rem;
    transition: 0.2s;
  }

  .tabs li:hover {
    background: #eeeeff;
  }

  .tabs li.selected {
    background: #a020f0;
    color: white;
    font-weight: 600;
  }

  .right {
    display: flex;
    gap: 0.6rem;
  }

  .small-btn {
    padding: 0.4rem 0.7rem;
    border: 1px solid #777;
    border-radius: 6px;
    cursor: pointer;
    background: none;
    font-size: 0.9rem;
  }

  .small-btn:hover {
    background: #ededed;
  }

  .post-btn {
    padding: 0.42rem 0.9rem;
    border-radius: 6px;
    cursor: pointer;
    background: #a020f0;
    color: white;
    border: none;
    font-size: 0.9rem;
  }

  .post-btn:hover {
    opacity: 0.9;
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    box-shadow: 0 5px 18px rgba(0, 0, 0, 0.2);
  }

  .modal input {
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }

  .submit-btn {
    background: #a020f0;
    border: none;
    padding: 0.6rem;
    color: white;
    border-radius: 6px;
    cursor: pointer;
  }

  .close-btn {
    background: #eee;
    border: none;
    padding: 0.5rem;
    border-radius: 6px;
    cursor: pointer;
  }
</style>
