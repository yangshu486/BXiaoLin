<template>

</template>

<script>

export default {
    data() {
        return {
            classify:''
        }
    },
    mounted() {
        this.classify=this.$route.query.classify
        console.log(this.$route.query.classify);
        this.$router.push({ path: "/classify", query: { classify:  this.classify } })
    }
}
</script>

<style>

</style>