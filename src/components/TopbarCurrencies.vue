<script>
import TopbarCurrency from './TopbarCurrency.vue';

export default {
    name: "TopbarCurrencies",
    components: {
        TopbarCurrency,
    },
    data() {
        return {
            keys: Object.keys(TOPBAR_CURRENCIES),
        }
    }
}
</script>
<template>
    <div class="o-topbar">
        <TopbarCurrency class="o-topbar--currency" v-for="x in keys" :id="x"/>
    </div>
</template>
<style scoped>
.o-topbar {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: auto;

    width: 100%;
    min-height: 100px;
}
</style>