<script>
import UpgradeButton from './UpgradeButton.vue';

export default {
    name: "UpgradesGrid",
    components: {
        UpgradeButton,
    },
    data() {
        return {
            UPG_GROUPS,
        }
    },
    props: {
        id: {
            type: String,
            required: true,
        },
        rows: {
            type: Number,
            required: false,
            default: 5,
        },
    },
}
</script>
<template>
    <div class="o-upgrade-grid">
        <UpgradeButton v-for="x in UPG_GROUPS[id]" :id="x"/>
    </div>
</template>
<style scoped>
.o-upgrade-grid {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(v-bind(rows), auto);
    grid-auto-rows: auto;
}
</style>