import { writable } from 'svelte/store'

export const IntersectionWorker = writable<new () => Worker>()
