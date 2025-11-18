<script>
	import { vehicles } from '../data.js';

	let q = '';

	$: filtered = vehicles.filter(v => {
		const hay = `${v.make} ${v.model} ${v.year} ${v.city}`.toLowerCase();
		return q.trim() === '' || hay.includes(q.toLowerCase());
	});

	function goTo(id) {
		// navigate using the app's hash-based routing convention
		location.hash = `/vehicles/details/${id}`;
	}
</script>

<section>
	<header>
		<h2>Vehicles</h2>
	</header>

	<div class="filters">
		<input placeholder="Search make, model or city" bind:value={q} />
	</div>

	<ul>
		{#if filtered.length === 0}
			<li>No vehicles match your search.</li>
		{:else}
			{#each filtered as v}
				<li class="card">
					<div class="thumb" aria-hidden></div>
					<div class="content">
						<div class="row">
							<h3>{v.year} {v.make} {v.model}</h3>
							<div class="price">${v.price.toLocaleString()}</div>
						</div>
						<div class="meta">{v.city} — {v.mileage.toLocaleString()} mi</div>
						<p class="muted">{v.description}</p>
						<div class="actions">
							<button on:click={() => goTo(v.id)}>View Details</button>
						</div>
					</div>
				</li>
			{/each}
		{/if}
	</ul>
</section>

<style>
	:root{ --accent:#007acc; --muted:#555; }
	.filters { margin:1rem 0; }
	input { padding:0.6rem 0.8rem; border:1px solid #e6eaee; border-radius:8px; width:100%; }
	ul { list-style:none; padding:0; }
	.card { display:flex; gap:0.9rem; padding:0.8rem; background:#fff; border-radius:10px; box-shadow:0 8px 20px rgba(15,20,25,0.04); margin-bottom:0.75rem; align-items:flex-start; }
	.thumb { width:96px; height:64px; background:linear-gradient(135deg,#f6f8fa,#eef3f7); border-radius:8px; flex:0 0 96px; }
	.content { flex:1; }
	.row{ display:flex; align-items:center; justify-content:space-between; }
	h3{ margin:0; font-size:1.05rem; }
	.price{ color:var(--accent); font-weight:600; }
	.meta{ font-size:0.9rem; color:var(--muted); margin:0.25rem 0 }
	.muted{ color:var(--muted); margin:0.4rem 0 }
	.actions{ margin-top:0.5rem }
	button{ background:var(--accent); color:#fff; border:none; padding:0.4rem 0.6rem; border-radius:6px; cursor:pointer }
</style>
