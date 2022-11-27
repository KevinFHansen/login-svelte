<script>

import { token } from "../store/globals.js"
import { navigate } from "svelte-navigator";


const logOut = () => {
    
    localStorage.clear();
    token.set(localStorage.getItem('token'));
    fetch("http://localhost:8080/api/logout",{
        method: "GET",
        credentials: "include"
    })
    .then(res => res.json())
    .then(res => {
    console.log(res)
    })
    setTimeout(() => {
                location.reload();
                navigate('/', { replace: true });
              }, 3000)
}


</script>

<div>
<a  href="/" on:click={logOut}>Logout</a>
</div>