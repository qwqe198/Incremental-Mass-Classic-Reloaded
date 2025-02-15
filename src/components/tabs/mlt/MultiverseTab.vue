<script>
import UpgradesGrid from '../../UpgradesGrid.vue';

export default {
    name: "MultiverseTab",
    components: {
        UpgradesGrid
    },
    data() {
        return {
            energy: DC.D0,
            total_energy: DC.D0,
            energy_gain: DC.D0,
            energy_effect: [DC.D1],
        }
    },
    computed: {
        get_effect() {
            let h = `You have <h3>${format(this.total_energy)}</h3> total multiversal energy, which boosts the exponent of the normal mass by <h3>${formatMult(this.energy_effect[0],4)}</h3>.`
            return h
        },
    },
    methods: {
        update() {
            this.energy = player.mlt.energy
            this.total_energy = player.mlt.total_energy
            this.energy_gain = temp.currency_gain['mlt-energy']
            this.energy_effect = temp.mlt_effect
        },
    },
}
</script>
<template>
    <div>
        <div style="margin: 10px 0;">
            <div>You have <h2 class="o-currency--mlt">{{ format(energy) }}</h2> {{ formatGain(energy,energy_gain) }} multiversal energy.</div>
            <div v-html="get_effect"></div>
        </div>
        <UpgradesGrid :id="'mlt'" />
    </div>
</template>
<style scoped>

</style>