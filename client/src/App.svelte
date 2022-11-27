<script>
  import logo from "../public/logo.png";
  import {Router, Link, Route, navigate} from "svelte-navigator";
  import Login from "./pages/login.svelte";
  import Signup from "./pages/signup.svelte";
  import Footer from "./components/footer/footer.svelte";
  import ProtectedRoute from "./components/routing/protectedRoutes.svelte";
  import Home from "./pages/home.svelte";
  import HomeAdmin from "./pages/homeAdmin.svelte";
  import adainBoard from "./pages/homeAdmin.svelte";
    import AdminBoard from "./pages/adminBoard.svelte";
    import ProtectedRoutes from "./components/routing/protectedRoutes.svelte";
    import { role } from './store/globals.js';
    import AccesDenied from "./pages/accesDenied.svelte";
    import UserDenied from "./pages/userDenied.svelte";
  import logout from "./components/logOut.svelte"
    import LogOut from "./components/logOut.svelte";
 
  // let p = "";
  // export const getSession = async () => {
  //       const response = await fetch("http://localhost:8080/api/session",{
  //           method: "GET",
  //           credentials: "include"
  //       }).then(res => res.json())
  //       .then(result => {
  //         console.log(result)
  //         const role = result.user.role;
  //         const isLoggedIn = result.isLoggedIn;
  //          p = result.isLoggedIn
          
  //       } )}
  //       console.log("hereee")
  //       console.log(p)
        
        
console.log(localStorage)

$: whatRole = $role;



</script>

<Router>
{#if whatRole == "user"}
<a href="/calender">View Calender</a>
<a href="/tickets">Find Tickets</a>
<a href="/gallery">Gallery</a>
<a href="/contact">Contact</a>
<LogOut></LogOut>
<ProtectedRoute path="/" component={AdminBoard} />
<ProtectedRoute path="/frontpage" component={AdminBoard} />
<ProtectedRoute path="/tickets" component={AdminBoard} />
<ProtectedRoute path="*" component={UserDenied} />

{:else if whatRole == "admin"}
<a href="/updateadmin">Admins</a>
<a href="/users">Users</a>
<LogOut></LogOut>
<ProtectedRoute path="/updateadmin" component={AdminBoard} />
<ProtectedRoute path="/frontpage" component={AdminBoard} />
<ProtectedRoute path="/dashboard" component={HomeAdmin} />

{:else}

<Route path="/" component={Login} />
<Route path="/signup" component={Signup} />
<ProtectedRoute path="*" component={AccesDenied} />
{/if}
</Router>


<!-- <Router>
{#if whatRole == "admin"}
<nav>
  <Link to="/calender">Calender</Link>
  <Link to="/presse">Presse</Link>
  <Link to="/diskografi">Diskografi</Link>
  <Link to="/shop">Shop</Link>
  <Link to="/login">Login</Link>
</nav>

{:else if whatRole == "user"}

<nav>
<Link to="/calender">Calender</Link>
<Link to="/wererterter">Presse</Link>
<Link to="/diskografi">Diskografi</Link>
<Link to="/shop">Shop</Link>
<Link to="/login">Login</Link>
</nav>


{:else}

<Link to="/login"></Link>

{/if}
</Router> -->
















<!-- <Router>
  
  <nav>
    
    <Link to="/" id="homeid" on:click={getSession} >Home</Link>
    <Link to="/calender">Calender</Link>
    <Link to="/presse">Presse</Link>
    <Link to="/diskografi">Diskografi</Link>
    <Link to="/shop">Shop</Link>
    <Link to="/login">Login</Link>
  </nav>
  <div>
      <Route path="/"></Route>
      <Route path="/login"><Login /></Route>
      <Route path="/signup"><Signup /></Route>
  </div>
</Router> -->



<style>
  
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
 
  nav {
    background-color: black;
  }
</style>
