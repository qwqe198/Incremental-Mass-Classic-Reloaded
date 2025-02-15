<script>
import { DC } from "@/core/decimal"
import PrimaryButton from "@/components/PrimaryButton.vue";
import NumbersRow from "./NumbersRow.vue";

export default {
    name: "NumbersTab",
    components: {
        PrimaryButton,
        NumbersRow,
    },
    data() {
        return {
            universalPeak: {
                amount: DC.D0,
                require: DC.D0,
                isAfford: false,
            },
            universalMult: {
                isUnlocked: false,
                amount: DC.D0,
                cost: DC.D0,
                isAfford: false,

                base: DC.D1,
                mult: DC.D1,
            },
        }
    },
    computed: {
        universalPeakRequireText() {
            return `
            To extend Universal Peak, you must require<br>
            <b>${this.universalPeak.require.format(0)}</b> Points<br>
            Universal Peak resets Points and Numbers
            `
        },
        getUMCost() {
            return `
            To increase all Numbers, you must cost<br>
            <b>${this.universalMult.cost.format(0)}</b> Points<br>
            `;
        },
        getUMEffect() {
            return `
            <b>${formatMult(this.universalMult.base)}</b> per upgrade<br>
            <b>${formatMult(this.universalMult.mult)}</b> to Numbers
            `
        },
    },
    methods: {
        update() {
            const UP = this.universalPeak

            UP.amount = UniversalPeak.amount
            UP.require = UniversalPeak.require

            UP.isAfford = UniversalPeak.isAfford

            const UM = this.universalMult

            UM.isUnlocked = UniversalMult.isUnlocked

            UM.amount = UniversalMult.amount
            UM.cost = UniversalMult.cost

            UM.isAfford = UniversalMult.isAfford

            UM.base = UniversalMult.base
            UM.mult = UniversalMult.multiplier
        },
        getUniversalPeak() { purchaseUniversalPeak() },
        getUniversalMult() { purchaseUniversalMult() },
    },
};
</script>

<template>
  <div>
    <div class="c-table-center o-numbers-table">
        <div>
            <div>Universal Peak: <h3>{{ universalPeak.amount.format(0) }}</h3></div>
            <PrimaryButton
            class="o-universal-peak-btn"
            :enabled="universalPeak.isAfford"
            v-html="universalPeakRequireText"
            @click.native="getUniversalPeak"
            ></PrimaryButton>
        </div><div>
            <div>Universal Multiplier: <h3>{{ universalMult.amount.format(0) }}</h3></div>
            <PrimaryButton
            class="o-universal-mult-btn"
            :enabled="universalMult.isAfford"
            v-html="getUMCost"
            @click.native="getUniversalMult"
            ></PrimaryButton>
            <div v-html="getUMEffect"></div>
        </div>
    </div>
    <div v-for="x in 10"><NumbersRow :tier="x" /></div>
    
  </div>
</template>

<style scoped>
.o-universal-peak-btn {
    width: 300px;
    height: 70px;
}

.o-universal-mult-btn {
    width: 300px;
    height: 50px;
}

.o-numbers-table {
    min-height: 150px;
}

.o-numbers-table > div {
    width: 400px;
}
</style>