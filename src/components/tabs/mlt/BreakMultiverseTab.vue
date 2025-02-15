<script>
import PrimaryButton from '../../PrimaryButton.vue';
import UpgradesGrid from '../../UpgradesGrid.vue';

export default {
    name: "BreakMultiverseTab",
    components: {
        UpgradesGrid,
        PrimaryButton,
    },
    data() {
        return {
            broken: false,
            fragments: DC.D0,
            total_fragments: DC.D0,
            fragments_gain: DC.D0,
            fragments_effect: [DC.D1],

            mlt: mlt(1),
        }
    },
    computed: {
        get_effect() {
            let h = `You have <h3>${format(this.total_fragments)}</h3> total multiversal fragments, which strengthens total multiversal energy's effect and the <b>mlt1-2</b> upgrades <h3>${formatPercent(this.fragments_effect[0].sub(1),4)}</h3>.`
            return h
        },
    },
    methods: {
        update() {
            this.broken = player.mlt.broken

            this.fragments = player.mlt.fragments
            this.total_fragments = player.mlt.total_fragments
            this.fragments_gain = temp.currency_gain['mlt-fragments']
            this.fragments_effect = temp.break_mlt_effect
        },
        break_mlt() {
            if (this.broken || player.mass.lt(this.mlt)) return;

            player.mlt.broken = true
            giveAchievement(61)

            MULTIVERSE.break.doBreak()
        },
    },
}
</script>
<template>
    <div>
        <div style="margin-bottom: 15px;">
            <PrimaryButton style="width: 300px; height: 100px;" @click.native="break_mlt" :bought="broken">
                <div style="font-size: 16px;"><b>{{ broken ? `The multiverse is broken` : `Break the multiverse` }}</b></div>
                <div v-if="!broken" style="margin-top: 5px;">You must reach <b>{{ formatMass(mlt) }}</b> of normal mass.</div>
            </PrimaryButton>
        </div>
        
        <div v-if="!broken" style="font-size: 12px;">
            Breaking the multiverse <b>ONCE</b> resets everything multiverse does, as well as multiversal energy, total multiversal energy, multiverse upgrades, and L2 challenges to unlock new feature.
        </div>

        <div style="margin: 10px 0;">
            <div>You have <h2 class="o-currency--mlt">{{ format(fragments) }}</h2> {{ formatGain(fragments,fragments_gain) }} multiversal fragments.</div>
            <div v-html="get_effect"></div>
        </div>
        <UpgradesGrid :id="'break_mlt'" />
    </div>
</template>
<style scoped>

</style>