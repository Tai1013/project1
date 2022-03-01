<template>
    <h1>this is a game page {{ $route.params.type }}</h1>
</template>

<script>
export default {
    name: 'LivePage',
    // validate({ params }) {
    //     console.log(params.type)
    //     if (params.type === 'type') return params.games
    //     // return new Promise((resolve) => setTimeout(() => resolve()))
    // },
}
</script>