<script>
import { onMount } from "svelte";

let users = [];
const getUsers = () => {
        const response = fetch("http://localhost:8080/api/users",{
            method: "GET",
            credentials: "include"
        }).then(res => res.json())
        .then(res => {
        
        console.log(res)
        users = res.data;
        console.log(users)
        })
    }
    onMount(getUsers);
</script>

<button on:click={getUsers}></button>
<h1>Admin board</h1>


{#each users as user }
<div>  
    <p>{user.username}</p>
    <input type="text">
    <p>{user.role}</p>
    <button>Update</button>
</div>
{/each}

<style>
    div {
        background-color: grey;
    }
</style>
