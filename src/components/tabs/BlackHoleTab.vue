<script>
import PrimaryButton from "@/components/PrimaryButton.vue";
import UpgradesGrid from "../UpgradesGrid.vue";
export default {
    name: "BlackHoleTab",
    components: {
        PrimaryButton,
        UpgradesGrid
    },
    data() {
        return {
            bh: DC.D0,
            bh_gain: DC.D0,

            bh_effect: [],

            abh_unlocked: false,
            abh: DC.D0,
            abh_gain: DC.D0,
        
            abh_effect: [],
        }
    },
    computed: {
        get_bh_effect() {
            var h = []

            for (let i = 0; i < BH_effects.length; i++) if (this.bh_effect[i]) h.push(BH_effects[i](this.bh_effect[i]));

            return h.join(', ')
        },
        get_abh_effect() {
            var h = []

            for (let i = 0; i < ABH_effects.length; i++) if (this.abh_effect[i]) h.push(ABH_effects[i](this.abh_effect[i]));

            return h.join(', ')
        },
    },
    methods: {
        update() {
            this.bh = player.bh.mass;
            this.bh_gain = temp.currency_gain['black-hole'];

            this.bh_effect = temp.bh_effect;

            this.abh_unlocked = hasUpgrade('bh8')

            if (this.abh_unlocked) {
                this.abh = player.bh.anti_mass;
                this.abh_gain = temp.currency_gain['anti-black-hole'];
            
                this.abh_effect = temp.abh_effect;
            }
        },
    },
}
</script>
<template>
    <div>
        <div style="margin: 10px 0;">
            <div>You have <h2 class="o-black-hole">{{ formatMass(bh) }}</h2> {{ formatGain(bh,bh_gain,true) }} of Black Hole.</div>
            <div>Which boosts <span v-html="get_bh_effect"></span>.</div>
        </div><div style="margin: 10px 0;" v-if="abh_unlocked">
            <div>You have <h2 class="o-anti-black-hole">{{ formatMass(abh) }}</h2> {{ formatGain(abh,abh_gain,true) }} of Anti-Black Hole.</div>
            <div>Which boosts <span v-html="get_abh_effect"></span>.</div>
        </div>
        <UpgradesGrid :id="'bh'" />
    </div>
</template>
<style scoped>
.o-black-hole {
    font-weight: bold;
    color: #111;
    text-shadow: 0 0 3px #fa0, 0 0 5px #fc0, 0 0 10px #fe0, 0 0 20px #ff0;
}
.o-anti-black-hole {
    font-weight: bold;
    color: #111;
    text-shadow: 0 0 3px #0af, 0 0 5px #0cf, 0 0 10px #0ef, 0 0 20px #0ff;
}
</style>