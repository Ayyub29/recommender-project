<script>
    import Api from "./../api";
    import { getKue, createkue } from "./../cookie";
    let email = "";
    let password = "";
    let isLoading = false;
    let isSuccess = false;
    export let submit;
    let errors = {};
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    const handleSubmit = () => {
      errors = {};
      if (user != null){
        errors.account = "You already log in!";
        window.location.href = '/';
      }
      if (email.length === 0) {
        errors.email = "Field should not be empty";
      }
      if (password.length === 0) {
        errors.password = "Field should not be empty";
      }
      if (Object.keys(errors).length === 0) {
        isLoading = true;
        var loginField = {
          email,
          password
        };
        var kue = getKue("khongguan");
        Api.post("/api/auth/login", loginField)
          .then((result) => {
            localStorage.setItem('user', JSON.stringify(result.data));
            Api.post("/api/user/belikue", kue);
            window.location.href = '/';
            isSuccess = true;
            isLoading = false;
          })
          .catch(err => {
            errors.server = err;
            console.log(err);
            isLoading = false;
          });
      }
    };
  </script>
  
  <style>
    form {
        background-color: beige;
        padding: 50px;
        max-width: 600px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    label {
        margin: 10px 0;
        align-self: flex-start;
        font-weight: 500;
    }
    input {
        border: none;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        transition: all 300ms ease-in-out;
        width: 100%;
    }
    input:focus {
        outline: 0;
        border-bottom: 1px solid #666;
    }
    button {
        margin-top: 20px;
        background: black;
        color: white;
        padding: 10px 0;
        width: 200px;
        border-radius: 25px;
        text-transform: uppercase;
        font-weight: bold;
        cursor: pointer;
        transition: all 300ms ease-in-out;
    }
    button:hover {
        transform: translateY(-2.5px);
        box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.58);
    }
    h1 {
        margin: 10px 20px 30px 20px;
        font-size: 40px;
    }
    .errors {
        list-style-type: none;
        padding: 10px;
        margin: 0;
        border: 2px solid #be6283;
        color: #be6283;
        background: rgba(190, 98, 131, 0.3);
    }
    .success {
        font-size: 24px;
        text-align: center;
    }
  </style>
  
  <form on:submit|preventDefault={handleSubmit} enctype="multipart/form-data" id="loginform" method="POST">
    {#if isSuccess}
      <div class="success">
        🔓
        <br />
        You've been successfully logged in.
      </div>
    {:else}
      <h1>👤</h1>
  
      <label>Email</label>
      <input name="email" placeholder="name@example.com" bind:value={email} />
  
      <label>Password</label>
      <input name="password" type="password" bind:value={password} />
  
      <button type="submit">
        {#if isLoading}Logging in...{:else}Log in 🔒{/if}
      </button>
  
      {#if Object.keys(errors).length > 0}
        <ul class="errors">
          {#each Object.keys(errors) as field}
            <li>{field}: {errors[field]}</li>
          {/each}
        </ul>
      {/if}
    {/if}
    <br>
    <br>
    {#if isSuccess} 
    <br>
    {:else}
    <p>Don't have an account? <a href="/register">Sign Up</a>.</p>
    {/if}
    <br>
    <br>
    <br>
    <br>
  </form>