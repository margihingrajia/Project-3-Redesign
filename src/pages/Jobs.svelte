<script>
  import { jobs } from '../data.js';

  let q = '';
  let filterType = '';

  $: filtered = jobs.filter(j => {
    const hay = `${j.title} ${j.company} ${j.city} ${j.type}`.toLowerCase();
    const matchesQ = q.trim() === '' || hay.includes(q.toLowerCase());
    const matchesType = filterType === '' || j.type.toLowerCase() === filterType.toLowerCase();
    return matchesQ && matchesType;
  });

  function formatPosted(dateStr) {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString();
    } catch (e) { return dateStr; }
  }
</script>

<section>
  <header>
    <h2>Jobs</h2>
  </header>

  <div class="controls">
    <input placeholder="Search jobs, company or city" bind:value={q} />
    <select bind:value={filterType}>
      <option value="">All</option>
      <option value="Full-time">Full-time</option>
      <option value="Part-time">Part-time</option>
      <option value="Contract">Contract</option>
    </select>
  </div>

  <ul>
    {#if filtered.length === 0}
      <li>No jobs found.</li>
    {:else}
      {#each filtered as job}
        <li class="card">
          <h3>{job.title}</h3>
          <p><strong>Company:</strong> {job.company} — <strong>City:</strong> {job.city}</p>
          <p><strong>Type:</strong> {job.type} — <strong>Salary:</strong> {job.salary}</p>
          <p class="muted">{job.description}</p>
          <p class="posted">Posted: {formatPosted(job.posted)}</p>
        </li>
      {/each}
    {/if}
  </ul>
</section>

<style>
  .controls { display:flex; gap:0.5rem; margin:1rem 0; }
  input { flex:1; padding:0.4rem; border:1px solid #ccc; border-radius:4px; }
  select { padding:0.4rem; border:1px solid #ccc; border-radius:4px; }
  ul { list-style:none; padding:0; }
  .card { padding:0.8rem; border:1px solid #eee; border-radius:6px; margin-bottom:0.6rem; }
  .muted { color:#555; margin:0.4rem 0; }
  .posted { font-size:0.9rem; color:#333; }
</style>
