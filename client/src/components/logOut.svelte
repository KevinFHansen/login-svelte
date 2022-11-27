<script>

import { token } from "../store/globals.js"


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
    })}


</script>

<div>
<a href="/" on:click={logOut}>Logout</a>
</div>