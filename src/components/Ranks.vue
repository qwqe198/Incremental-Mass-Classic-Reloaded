<script>
import PrimaryButton from './PrimaryButton.vue';

export default {
    name: "TestTab",
    data() {
        let s = {
            ranks_data: [],
            RANKS_LEN,
        }

        for (let i = 0; i < RANKS_LEN; i++) s.ranks_data[i] = {
            isUnlocked: false,
            isAfford: false,
            amount: DC.D0,
            require: EINF,
            bulk: DC.D0,
        }

        return s
    },
    components: {
        PrimaryButton,
    },
    computed: {
        getRankAmount() {
            return i => {
                const RD = this.ranks_data[i]

                return `${RANKS[i].name} <h3>${RD.amount.format(0)}</h3>` + (RD.bulk.gt(0) ? ` (+${RD.bulk.format(0)})` : "")
            }
        },
        getRankResetDescription() {
            return i => {
                const R = RANKS[i], RD = this.ranks_data[i], RN = Object.keys(R.rewards).find(x => RD.amount.lt(x))
                let h = i === 0 ? `Resets your normal mass, but <b>Rank</b> up.` : `Resets your ${RANKS[i-1].name}, but <b>${R.name}</b> up.`

                if (RN) h += `<br class='sub-line'>At <b>${R.name} ${format(RN,0)}</b>: ${R.rewards[RN][0]}`;

                return h
            }
        },
        getRankReqirement() {
            return i => `Require: ${i === 0 ? formatMass(this.ranks_data[i].require) : RANKS[i-1].name + " " + format(this.ranks_data[i].require,0)}`
        }
    },
    methods: {
        update() {
            for (let i = 0; i < RANKS_LEN; i++) {
                const R = RANKS[i], RD = this.ranks_data[i]

                if (RD.isUnlocked = R.unl()) {
                    RD.isAfford = R.res.gte(RD.require = R.require(RD.amount = R.amount))
                    RD.bulk = R.bulk(R.res).sub(RD.amount).max(0)
                }
            }
        },
        rankUp(x) { rankUp(x) },
    },
}
</script>
<template>
    <div class="c-table-center">
        <div v-for="x in RANKS_LEN" class="o-rank--container" v-if="ranks_data[x-1].isUnlocked">
            <div>
                <div v-html="getRankAmount(x-1)"></div>
                <PrimaryButton
                class="o-rank--btn"
                :enabled="ranks_data[x-1].isAfford"
                @click.native="rankUp(x-1)"
                >
                <div v-html="getRankResetDescription(x-1)"></div>
                <div class="o-rank--require" v-html="getRankReqirement(x-1)"></div>
                </PrimaryButton>
            </div>
        </div>
    </div>
</template>
<style scoped>
.o-rank--container {
    width: 300px;
}

.o-rank--btn {
    position: relative;
    padding: 5px 5px 15px 5px;
    width: 250px;
    min-height: 120px;
    font-size: 10px;
}

.o-rank--require {
    position: absolute;
    bottom: 0px;
    width: calc(100% - 10px);
}
</style>