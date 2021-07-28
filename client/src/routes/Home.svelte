<script>
	// export let name;
	import Card from './../components/Card.svelte';
	import { onMount } from 'svelte';
  	import { getContent, updateCount } from "../utils/content";
	import { get_cookies, create_cookies, createTracker, prepareToken } from "../utils/cookie";
	import { getSimilarity, getSimilarityList,getMax,getMaxArr,getMeanArr,getMinArr,getSimilarityScore}  from "../utils/similarity";
	
	let contentList = [];
	
	let user = localStorage.getItem("user");

	// Get the data from the api & create click tracker & sort the data after the page is mounted. 
	onMount(async () => {
		const res = await getContent();
		contentList = res;
		createTracker();
		handleClick();
	});

	//function to sort data value after program click
	async function handleClick() {
		const res = await getContent();
		const similarity_list = await getSimilarityList();

		contentList = res;
		var click_tracker = getCookies("khongguan"); //tracker cookies
		var std_tracker = prepareToken(click_tracker); //standardized value of tracker cookies
		var maxAmt = getMax(res, "amount_click"); //max amount of amount click
		var sim_score = getSimilarityScore(std_tracker,similarity_list); //similarity score of program

		if (user != null){ //if user logged in, sort data by similarity metric
			for (var i in contentList){
				contentList[i].amount_click = (res[i].amount_click/maxAmt["amount_click"]) * 0.25 + sim_score[i] * 0.75;
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