<script>
import PrimaryButton from "@/components/PrimaryButton.vue";
import UpgradesGrid from "../UpgradesGrid.vue";
import UpgradeButton from "../UpgradeButton.vue";
import Ranks from "../Ranks.vue";
export default {
    name: "MassTab",
    components: {
        PrimaryButton,
        UpgradesGrid,
        Ranks,
    },
}
</script>
<template>
    <div>
        <Ranks/>
        <br>
        <UpgradesGrid :id="'mass'" />
        <br>
        <UpgradesGrid :id="'rage'" />
    </div>
</template>
<style scoped>

</style>