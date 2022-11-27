<script>
  import {Router, Route} from "svelte-navigator";
  import Login from "./pages/Login.svelte";
  import Signup from "./pages/Signup.svelte";
  import ProtectedRoute from "./components/routing/ProtectedRoutes.svelte";
  import AdminBoard from "./pages/AdminBoard.svelte";
  import { role } from './store/globals.js';
  import AccesDenied from "./pages/AccesDenied.svelte";
  import UserDenied from "./pages/UserDenied.svelte";
  import LogOut from "./components/LogOut.svelte";
  import Calendar from "./pages/Calendar.svelte";
  import Gallery from "./pages/Gallery.svelte";
    import Contact from "./pages/Contact.svelte";
    import Frontpage from "./pages/Frontpage.svelte";
    import Tickets from "./pages/Tickets.svelte";
    import AdminFrontPage from "./pages/AdminFrontPage.svelte";
    import LogginIn from "./components/LogginIn.svelte";
 
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
<nav>
  <a href="/calender">View Calender</a>
  <a href="/tickets">Find Tickets</a>
  <a href="/gallery">Gallery</a>
  <a href="/contact">Contact</a>
  <LogOut></LogOut>
</nav>
<Route path="/dashboard" component={LogginIn} />
<ProtectedRoute path="/" component={Frontpage} />
<ProtectedRoute path="/gallery" component={Gallery} />
<ProtectedRoute path="/contact" component={Contact} />
<ProtectedRoute path="/calender" component={Calendar} />
<ProtectedRoute path="/frontpage" component={Frontpage} />
<ProtectedRoute path="/tickets" component={Tickets} />
<ProtectedRoute path="*" component={UserDenied} />

{:else if whatRole == "admin"}
<nav>
  <a href="/updateadmin">Users</a>
  <LogOut></LogOut>
</nav>
<Route path="/dashboard" component={LogginIn} />
<ProtectedRoute path="/updateadmin" component={AdminBoard} />
<ProtectedRoute path="/" component={AdminFrontPage} />

{:else}

<Route path="/" component={Login} />
<Route path="/login" component={LogginIn} />
<Route path="/signup" component={Signup} />
<ProtectedRoute path="*" component={AccesDenied} />
{/if}
</Router>



<style>
  nav {
    margin: 0 auto;
    display:flex;
    width:800px;
    border: red 2px solid;
    justify-content: space-evenly;
    background-color: black;
    animation: breath 5s infinite alternate;
  }
</style>
