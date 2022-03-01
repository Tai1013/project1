<template>
    <div>
        <!-- <Tutorial /> -->
        {{ project }}
    </div>
</template>

<script>
export default {
    name: 'IndexPage',
    // async asyncData({ store }) {
    //     store.dispatch("getIsLogin", 'a')
    //     const hasToken = await store.getters.isLogin;
    //     console.log(hasToken)
    // },
    data() {
        return {
            project: 'default',
        }
    },
    mounted() {
    },
}
</script>
