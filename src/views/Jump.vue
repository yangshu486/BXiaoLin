<template>

</template>

<script>

export default {
    data() {
        return {
            id
        }
    },
    mounted() {
        this.id=this.$route.query.id
        this.$router.push({ path: "/detail", query: { id:  this.id } })
    }
}
</script>

<style>

</style>