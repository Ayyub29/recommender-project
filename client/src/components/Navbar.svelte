<script lang="ts">
    import Api from "./../utils/api"
    import {
      Collapse,
      Navbar,
      NavbarToggler,
      NavbarBrand,
      Nav,
      NavItem,
      NavLink
    } from 'sveltestrap';
  
    let isOpen = false;
    let user = localStorage.getItem("user");
    user = JSON.parse(user);

    function handleLogout() {
      Api.post("/api/auth/logout")
      .then((result) => {
        localStorage.removeItem('user');
        window.location.href = '/';
      });
    }
    
    function handleUpdate(event) {
      isOpen = event.detail.isOpen;
    }
    
  </script>

    <!-- svelte-ignore missing-declaration -->
    <Navbar light class="navbar" expand="md">
        <NavbarBrand href="/"><img class="image" alt="logo" src="https://media-exp3.licdn.com/dms/image/C560BAQExXoxrMzrDIQ/company-logo_200_200/0/1613449675547?e=2159024400&v=beta&t=x0obkjYM3fj153PSWwcX6IfWUNZiLUc0yhTFItqF0iQ"/></NavbarBrand>
        <NavbarToggler class="toggleButton" style="border-color:black; color:black; background-color:khaki;" on:click={() => (isOpen = !isOpen)} />
        <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
            <Nav class="ms-auto" navbar>
            {#if user == null}
            <NavItem class="linkss">
              <NavLink href="/login" class="linkss">Login</NavLink>
            </NavItem>
            <NavItem class="linkss">
              <NavLink href="/register" class="linkss">Register</NavLink>
            </NavItem>
            {:else}
            <NavItem class="linkss">
              <NavLink class="linkss">{user.username}</NavLink>
            </NavItem>
            <NavItem class="linkss">
              <NavLink class="linkss" on:click="{handleLogout}">Logout</NavLink>
            </NavItem>
            {/if}
            <NavItem class="linkss">
                <NavLink href="https://github.com/Ayyub29/SvelteXNode" class="linkss">Code</NavLink>
            </NavItem>
            </Nav>
        </Collapse>
    </Navbar>
  
  <style>
    .image{
      height: 60px;
      margin-left: 45px;
    }
  </style>