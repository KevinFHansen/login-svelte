<script>
    import { Route } from "svelte-navigator";

    import accessDenied from '../../pages/accesDenied.svelte';
    import { token, role } from '../../store/globals.js';

    export let path;
    
    export let component;

    $: isAuthenticated = $token;
    $: whatRole = $role;
</script>

{#if isAuthenticated}
    <Route path={path} component={component} />

{:else}
    <Route path={path} component={accessDenied} />
{/if}