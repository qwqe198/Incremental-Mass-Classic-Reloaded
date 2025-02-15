<script>
import PrimaryButton from "@/components/PrimaryButton.vue";
import UpgradesGrid from "../UpgradesGrid.vue";
export default {
    name: "PrestigesTab",
    components: {
        PrimaryButton,
        UpgradesGrid
    },
    data() {
        let s = {
            PRESTIGES_LEN,
            PRESTIGES,
            ranks: {},
            rank_names: PRESTIGES.map(x => x.name),
            rank_rewards: {},
            rank_effects: {},
        }
        for (let i = 0; i < PRESTIGES_LEN; i++) {
            s.ranks[i] = DC.D0

            s.rank_rewards[i] = Object.keys(PRESTIGES[i].rewards) 
            s.rank_effects[i] = {}

            for (let j in PRESTIGES[i].rewards) if (PRESTIGES[i].rewards[j][3]) {
                s.rank_effects[i][j] = PRESTIGES[i].rewards[j][2]
            }
        }
        return s
    },
    computed: {
        get_desc() {
            return (x,y) => {
                let r = PRESTIGES[x].rewards[y], h = r[0]
                if (r[3]) h += `<br class='sub-line'> Effect: ` + r[3](this.rank_effects[x][y]).bold();
                return h
            }
        },
    },
    methods: {
        update() {
            for (let i = 0; i < PRESTIGES_LEN; i++) {
                this.ranks[i] = PRESTIGES[i].amount

                for (let j = 0; j < this.rank_rewards[i].length; j++) {
                    let k = this.rank_rewards[i][j]
                    if (this.rank_effects[i][k]) this.rank_effects[i][k] = temp.prestige_effects[i][j];
                } 
            }
        },
    },
}
</script>
<template>
    <div>
        <div v-for="x in PRESTIGES_LEN" v-if="ranks[x-1].gte(1)" style="margin: 5px 0;">
            <h3>{{ rank_names[x-1] }}</h3>
            <div class="c-table-center">
                <button v-for="y in rank_rewards[x-1]" v-if="ranks[x-1].gte(y)" class="o-primary-btn o-rank-reward">
                    <div class="o-rank-reward--amount">{{ rank_names[x-1] }} {{ format(y,0) }}</div>
                    <div v-html="get_desc(x-1,y)"></div>
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.o-rank-reward--amount {
    position: absolute;
    top: 0px;
    width: calc(100% - 10px);
    text-align: left;
    font-size: 8px;
}
</style>