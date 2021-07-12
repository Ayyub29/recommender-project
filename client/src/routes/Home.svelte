<script>
	// export let name;
	import Card from './../components/Card.svelte';
	import { onMount } from 'svelte';
  	import { getContent, updateCount } from "./../content";
	import { getKue, createkue } from "./../cookie";
	let contentList = [];
	let user = localStorage.getItem("user");
	// Get the data from the api, after the page is mounted.
	onMount(async () => {
		const res = await getContent();
		contentList = res;
		createTracker();
		handleClick();
	});

	function createTracker(){
		let kue = getKue("khongguan");
		if (kue == "" || kue == null || kue == undefined) {
			createkue("khongguan","0a0a0a0a0a0",365);
			console.log("berhasil!");
		} else {
			console.log("siap jualan!");
		}
	}

	function getMax(arr, prop) {
		var max;
		for (var i=0 ; i<arr.length ; i++) {
			if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
				max = arr[i];
		}
		return max;
	}

	function getMaxArr(arr, prop) {
		var max;
		for (var i=0 ; i<arr.length ; i++) {
			if (max == null || parseInt(arr[i]) > parseInt(max))
				max = arr[i];
		}
		return max;
	}

	async function handleClick() {
		const res = await getContent();
		contentList = res;
		var biskuit = getKue("khongguan");
		var biskuitkemasan = biskuit.split("a");
		var maxAmt = getMax(res, "amount_click");
		console.log("kucing garong" + maxAmt["amount_click"]);
		if (user != null){
			for (var i in contentList){
				contentList[i].amount_click = (res[i].amount_click/maxAmt["amount_click"]) * 0.25 + (biskuitkemasan[i]/getMaxArr(biskuitkemasan)) * 0.75;
			}
		}
		console.log(contentList);
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