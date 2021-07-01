<script lang="ts">
    export let title, imageSource, description, v, i;
    import { createEventDispatcher } from 'svelte';
    import { updateCount } from './../content';

    const dispatch = createEventDispatcher();
    function handleClick() {
      console.log("Clicked " + title + ": " + v);
      updateCount(i);
      dispatch('message');
    }
</script>

<main>
  <button on:click="{handleClick}" class="card">
    <img class="image" alt="gambar" src={imageSource}/>
    <div class="text">
        <p class="desc">{title}</p>
    </div>
  </button>
</main>

<style>
  .card{
    padding: 0px 0px;
    border-radius: 20px;
    display: inline-block;
    margin: 5px 5px;
    font-size: 1rem;
    font-weight:600;
    align-items: center;
    text-align: center;
    width: 250px !important;
    height: 250px;
  }
  .desc {
    text-align: center;
    color:black;
    font-weight:500;
    margin-top: 5px;
    font: 'Montserrat';
  }
	.image{
    display: inline-block;
    width: 250px;
    height: 200px;
    border-radius: 20px 20px 0px 0px;
  }
  .button{
    background-color:khaki;
    border-radius: 8px;
    border-color:black;
  }
</style>