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
          <div class="thumb" aria-hidden></div>
          <div class="content">
            <div class="row">
              <h3>{job.title}</h3>
              <div class="type">{job.type}</div>
            </div>
            <div class="meta"><strong>{job.company}</strong> — {job.city} — <span class="salary">{job.salary}</span></div>
            <p class="muted">{job.description}</p>
            <div class="row footer">
              <div class="posted">Posted: {formatPosted(job.posted)}</div>
            </div>
          </div>
        </li>
      {/each}
    {/if}
  </ul>
</section>

<style>
  :root{ --muted:#555; --accent:#007acc }
  .controls{ display:flex; gap:0.5rem; margin:1rem 0 }
  input{ flex:1; padding:0.6rem 0.8rem; border:1px solid #e6eaee; border-radius:8px }
  select{ padding:0.5rem; border:1px solid #e6eaee; border-radius:8px }
  ul{ list-style:none; padding:0 }
  .card{ display:flex; gap:0.9rem; padding:0.8rem; background:#fff; border-radius:10px; box-shadow:0 8px 20px rgba(15,20,25,0.04); margin-bottom:0.75rem; }
  .thumb{ width:76px; height:64px; background:linear-gradient(135deg,#f6f8fa,#eef3f7); border-radius:8px; flex:0 0 76px }
  .content{ flex:1 }
  h3{ margin:0; font-size:1.05rem }
  .type{ background:#eef6ff; color:var(--accent); padding:0.25rem 0.5rem; border-radius:6px; font-size:0.85rem }
  .meta{ font-size:0.9rem; color:var(--muted); margin:0.25rem 0 }
  .muted{ color:var(--muted); margin:0.4rem 0 }
  .footer{ margin-top:0.25rem }
  .posted{ font-size:0.9rem; color:#333 }
  .salary{ font-weight:600 }
</style>
