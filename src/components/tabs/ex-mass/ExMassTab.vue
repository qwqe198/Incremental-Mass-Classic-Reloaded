<script>
import PrimaryButton from "@/components/PrimaryButton.vue";
import Prestiges from "./Prestiges.vue";
import UpgradesGrid from "../../UpgradesGrid.vue";
import { CURRENCIES } from "../../../core/currencies";

export default {
    name: "ExMassTab",
    components: {
        PrimaryButton,
        Prestiges,
        UpgradesGrid,
    },
    data() {
        return {
            mass: DC.D0,
            mass_gain: DC.D0,

            formula_unls: {
                ranks: false,
            },

            formula_units: {
                mass_exp: DC.D1,
                rank_exp: DC.D1,
            },
        }
    },
    computed: {
        get_formula() {
            let h = [], exp = this.formula_units.mass_exp

            h.push(`[ Log10(Mass) / ${format(1e30)} ]` + (exp.neq(1) ? `<sup>${format(exp,3)}</sup>` : ""));

            exp = this.formula_units.rank_exp

            if (this.formula_unls.ranks) h.push(`[ Product of Ranks / ${format(1e9)} ]` + (exp.neq(1) ? `<sup>${format(exp,3)}</sup>` : ""));

            return h.join(" × ")
        }
    },
    methods: {
        update() {
            this.mass = player.exmass;
            this.mass_gain = temp.currency_gain['ex-mass'];

            this.formula_unls.ranks = player.prestiges[1].gte(1)

            this.formula_units.mass_exp = CURRENCIES["ex-mass"].mass_exp
            this.formula_units.rank_exp = CURRENCIES["ex-mass"].rank_exp
        },
    },
}
</script>
<template>
    <div>
        <div style="margin: 10px 0;">
            <div>You have <h2>{{ formatMass(mass) }}</h2> {{ formatGain(mass,mass_gain,true) }} of Ex-Mass.</div>
            <div><b>Base Formula:</b> <span v-html="get_formula"></span></div>
        </div>
        <Prestiges/>
        <br>
        <UpgradesGrid :id="'exmass'" />
    </div>
</template>
<style scoped>

</style>