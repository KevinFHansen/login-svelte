import {writable} from 'svelte/store';

export const token = writable(localStorage.getItem('token'));
export const role = writable(localStorage.getItem('role'));