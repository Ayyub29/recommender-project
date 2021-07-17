<script>
	// export let name;
	import Card from './../components/Card.svelte';
	import { onMount } from 'svelte';
  	import { getContent, updateCount } from "./../content";
	import { getKue, createkue } from "./../cookie";
	import { getSimilarity, getSimilarityList }  from "./../similarity";
	
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

	function getMaxArr(arr) {
		var max;
		for (var i=0 ; i<arr.length ; i++) {
			if (max == null || parseInt(arr[i]) > parseInt(max))
				max = arr[i];
		}
		return max;
	}

	function getMinArr(arr) {
		var min;
		for (var i=0 ; i<arr.length ; i++) {
			if (min == null || parseInt(arr[i]) < parseInt(min))
				min = arr[i];
		}
		return min;
	}

	function getMeanArr(arr) {
		var sum = 0;
		for (var i=0 ; i < arr.length ; i++) {
			sum += parseInt(arr[i]);
		}
		return sum/(arr.length);
	}

	function prepareToken(token){
		var biskuitkemasan = token.split("a");
		var new_token = [0,0,0,0,0,0];
		var max = getMaxArr(biskuitkemasan);
		var min = getMinArr(biskuitkemasan);
		var mean = getMeanArr(biskuitkemasan);
		for (var i in biskuitkemasan){
			new_token[i] = ((biskuitkemasan[i] - mean) / (max-min)).toFixed(3);
		}
		return new_token;
	}

	async function handleClick() {
		const res = await getContent();
		const similarity_list = await getSimilarityList();
		contentList = res;
		var biskuit = getKue("khongguan");
		var biskuitkemasan = prepareToken(biskuit);
		console.log(biskuitkemasan);
		console.log(similarity_list);
		var maxAmt = getMax(res, "amount_click");

		if (user != null){
			for (var i in contentList){
				contentList[i].amount_click = (res[i].amount_click/maxAmt["amount_click"]) * 0.25 + (biskuitkemasan[i]/getMaxArr(biskuitkemasan)) * 0.75;
			}
		}
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