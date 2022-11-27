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

<h1>Admin Board</h1>

<table>
    <th>Username</th>
    <th>Role</th>
    {#each users as user }
<tr>  
    <td>{user.username}</td>
    <td>{user.role}</td>
</tr>
{/each}
</table>



<style>
    table{
        width:100%;
        margin: 0 auto; 
        border: 2px groove red;
    }
    td, tr, th{
        text-align: left;
        font-size: 1.5em;
        line-height: 1.5em;
        background-color: black;
    }
</style>
