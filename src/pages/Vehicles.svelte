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
					<h3>{v.year} {v.make} {v.model}</h3>
					<p>{v.city} — ${v.price.toLocaleString()} — {v.mileage.toLocaleString()} miles</p>
					<p class="muted">{v.description}</p>
					<div class="actions">
						<button on:click={() => goTo(v.id)}>View Details</button>
					</div>
				</li>
			{/each}
		{/if}
	</ul>
</section>

<style>
	.filters { margin:1rem 0; }
	input { padding:0.4rem; border:1px solid #ccc; border-radius:4px; width:100%; }
	ul { list-style:none; padding:0; }
	.card { padding:0.8rem; border:1px solid #eee; border-radius:6px; margin-bottom:0.6rem; }
	.muted { color:#555; margin:0.4rem 0; }
	.actions { margin-top:0.5rem; }
	button { background:#007acc; color:white; border:none; padding:0.4rem 0.6rem; border-radius:4px; cursor:pointer; }
</style>
