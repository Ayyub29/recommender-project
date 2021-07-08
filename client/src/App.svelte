<script>
	import router from 'page'
	import Navbar from './components/Navbar.svelte';
	// Include our Routes
	import Home from './routes/Home.svelte'
	import Login from './routes/Login.svelte'
	import Register from './routes/Register.svelte'
	// Variables
	let page;
	let params;
  
	// Set up the pages to watch for
	router('/', () => (page = Home))
	router('/login', () => (page = Login))
	router('/register', () => (page = Register))
	// Set up the router to start and actively watch for changes
	router.start()
	console.log("Starting Router..")
  </script>
  
  
<main>
	<Navbar/>
	<svelte:component this="{page}" params="{params}" />
</main>

<style>
	main{
		background-color: white;
		max-width:600px;
		margin: 0px auto;
		align-items: center;
	}
</style>