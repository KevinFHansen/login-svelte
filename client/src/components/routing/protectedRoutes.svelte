<script>
    import { Route } from "svelte-navigator";

    import accessDenied from '../../pages/AccesDenied.svelte';
    import { token } from '../../store/globals.js';

    export let path;
    
    export let component;

    $: isAuthenticated = $token;
    
</script>

{#if isAuthenticated}
    <Route path={path} component={component} />

{:else}
    <Route path={path} component={accessDenied} />
{/if}