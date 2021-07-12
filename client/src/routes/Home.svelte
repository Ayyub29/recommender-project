<script>
	// export let name;
	import Card from './../components/Card.svelte';
	import { onMount } from 'svelte';
  	import { getContent, updateCount } from "./../content";
	import { getKue, createkue } from "./../cookie";
	let contentList = [];
	// Get the data from the api, after the page is mounted.
	onMount(async () => {
		const res = await getContent();
		contentList = res;
		createTracker();
	});

	function createTracker(){
		let kue = getKue("khongguan");
		if (kue != "") {
			createkue("khongguan","000000",365);
			console.log("berhasil!");
		} else {
			console.log("siap jualan!");
		}
	}

	async function handleClick() {
		const res = await getContent();
		contentList = res;
		contentList = contentList.sort(function(a, b){return b.amount_click - a.amount_click});
	}
</script>

<main>
	<div class="contentList">
		{#each contentList as { title, description, image_source, amount_click, id }, i}
			<Card on:message={handleClick} bind:title={title} imageSource={image_source} description={description} v={amount_click} i={id}/>
		{/each}
	</div>
</main>

<style>
	.contentList{
		background-color: beige;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		text-align: center;
		justify-content: center;
	}
</style>