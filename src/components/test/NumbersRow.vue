<script>
import PrimaryButton from "@/components/PrimaryButton.vue";

export default {
    name: "NumbersRow",
    props: ['tier'],
    components: {
        PrimaryButton,
    },
    data() {
        return {
            isUnlocked: false,
            isAfford: false,

            amount: new Decimal(0),
            bought: new Decimal(0),
            prefix: "",
            multiplier: new Decimal(1),
            cost: new Decimal(0),
            gain: new Decimal(0),
        }
    },
    computed: {
        getPrefix() {
            let x = this.prefix + "Number"

            return x
        },
    },
    methods: {
        update() {
            const NG = NumberGenerator(this.tier)

            this.isUnlocked = NG.isUnlocked

            this.amount = NG.amount
            this.bought = NG.bought
            this.prefix = NG.prefix

            this.cost = NG.cost
            this.isAfford = NG.isAfford

            this.multiplier = NG.multiplier
            this.gain = NG.gain
        },
        buyNG() { purchaseNumberGenerator(this.tier) },
    },
}
</script>
<template>
    <div v-if="isUnlocked" class="o-number-row">
        <div>
            <h3>{{ getPrefix }}</h3><br>
            ({{ format(bought,0) }})
        </div><div>
            {{ formatMult(multiplier) }}
        </div><div class="o-number-amount">
            {{ format(amount,1) }}<br>
            <span v-if="gain.gt(0)">{{ formatGain(amount,gain) }}</span>
        </div><div class="o-number-cost">
            <PrimaryButton
            class="o-number-btn"
            :enabled="isAfford"
            @click.native="buyNG"
            >
                Cost: {{ format(cost,0) }} Points
            </PrimaryButton>
        </div>
    </div>
</template>
<style scope>
.o-number-row {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    align-items: center;

    width: calc(100% - 20px);
    height: 50px;
    margin: 5px 0px;
    padding: 0px 10px;
    background-color: #6661;
}

.o-number-row > div:not(:last-child) {
    text-align: left;
}

.o-number-amount {
    grid-column: 3 / 6;
}

.o-number-cost {
    text-align: right;
    grid-column: 6 / 8;
    height: 100%;
}

.o-number-btn {
    max-width: 400px;
    min-width: 300px;
    width: 100%;
    height: calc(100% - 4px);
}
</style>