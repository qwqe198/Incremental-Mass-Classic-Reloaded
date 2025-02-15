<script>
export default {
    name: "ChallengesTab",
    data() {
        let s = {
            CHALLENGES,
            CHALLENGES_MAP,

            selected: "",

            layers: 1,

            active: {},
            comp: {},
            bulk: {},
            best: {},
            trapped: {},
            strength: {},

            selected_desc: "",
            selected_reward: "",
            selected_goal: DC.D0,
            selected_next: DC.D0,
        }
        for (let id in CHALLENGES) {
            s.active[id] = false
            s.trapped[id] = false
            s.comp[id] = DC.D0
            s.bulk[id] = DC.D0
            s.best[id] = DC.D0
            s.strength[id] = DC.D1
        }
        return s
    },
    computed: {
        classObject() {
            return x => ({
                'selected': !this.active[x] && !this.trapped[x] && this.selected === x,
                'active': this.active[x],
                'trapped': !this.active[x] && this.trapped[x],
            })
        },
        get_completion() {
            const C = CHALLENGES[this.selected]
            var comp = this.comp[this.selected], best = this.best[this.selected]

            var h = `${C.name} <h2>${C.symbol}</h2><br>[Completions: ${format(comp,0) + (comp.lt(best) ? ` (${format(best,0)})` : "")}]`

            return h
        },
        get_goal() {
            const C = CHALLENGES[this.selected], CR = CHAL_RESOURCES[C.res]

            return `Goal: <b>${CR.format(this.selected_goal)}</b> ${CR.name}`
        },
        get_reward() {
            return "<b>Reward:</b> " + this.selected_reward
        },
        get_cause() {
            const C = CHALLENGES[this.selected]

            return [
                "How did you get this challenge?",
                `Entering this challenge forces the black hole reset.`,
                `Entering this challenge forces the multiverse reset.`,
                `Entering this challenge forces the multiverse reset, resetting multiversal energy and multiverse upgrades.`,
            ][C.layer]
        },
        get_chal_button() {
            const C = CHALLENGES[this.selected]
            return this.active[this.selected] ? `Exit the <b>${C.symbol}</b> challenge for <b>+${format(this.bulk[this.selected],0)}</b>. (next at <b>${CHAL_RESOURCES[C.res].format(this.selected_next)}</b>)` : `Enter the <b>${C.symbol}</b> challenge.`
        },
    },
    methods: {
        update() {
            this.layers = getChallengeLayersUnlocked()

            for (let id in CHALLENGES) {
                const C = CHALLENGES[id]

                this.comp[id] = player.chal.completions[id]
                this.best[id] = player.chal.best[id]
                this.trapped[id] = temp.trapped_chal[id]
                this.strength[id] = C.strength ?? 1

                if (this.active[id] = player.chal.active[id]) {
                    let amt = CHAL_RESOURCES[C.res].amount
                    this.bulk[id] = amt.gte(C.goal(this.comp[id])) ? C.bulk(amt).sub(this.comp[id]).max(0) : DC.D0
                }
            }

            if (this.selected !== "") {
                const C = CHALLENGES[this.selected]
                this.selected_desc = C.desc
                this.selected_reward = C.reward(temp.chal_effect[this.selected])
                this.selected_goal = C.goal(this.comp[this.selected])
                this.selected_next = C.goal(this.comp[this.selected].add(this.bulk[this.selected]))
            }
        },
        chooseChallenge(id) {
            if (this.selected === id) {
                enterChallenge(id)
            }

            this.selected = id

            this.update()
        },
        enter(id) {
            enterChallenge(id)
        },
    },
}
</script>
<template>
    <div>
        <div id="o-chal--status">
            <div id="o-chal--grid" v-if="selected !== ''">
                <div v-html="get_completion"></div>
                <div v-html="selected_desc"></div>
                <button class="o-primary-btn" @click="enter(selected)" v-html="get_chal_button"></button>
                <div v-html="get_goal"></div>
                <div v-html="get_reward"></div>
                <div v-html="get_cause"></div>
            </div>
        </div>
        <div v-for="x in layers">
            <div class="c-table-center">
                <button v-for="y in CHALLENGES_MAP[x]" class="o-chal--button" :class="classObject(y)" @click="chooseChallenge(y)">
                    <div class="o-chal--button-strength">{{ formatPercent(strength[y]) }}</div>
                    <div class="o-chal--button-symbol">{{ CHALLENGES[y].symbol }}</div>
                    <div class="o-chal--button-completion">{{ format(comp[y],0) }} <span v-if="active[y]">(+{{ format(bulk[y],0) }})</span></div>
                </button>
            </div>
            <br class="sub-line" v-if="x < layers">
        </div>
    </div>
</template>
<style scoped>
#o-chal--status {
    width: calc(100% - 4px);
    min-height: 150px;
    border: outset 2px #888;
    background-color: #2222;
    border-radius: 5px;
    font-size: 12px;
}
#o-chal--grid {
    width: 100%;
    min-height: 150px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);

    align-items: center;
}

#o-chal--grid > .o-primary-btn {
    height: 100%;
}

.o-chal--button {
    position: relative;
    width: 100px;
    height: 100px;
    color: black;
    border-radius: 10px;
    margin: 3px 3px 10px 3px;

    background-color: #ddd;
    border: solid 2px #888;
    box-shadow: 0px 12px #888;

    cursor: pointer;

    transition-duration: 0.2s;
}
.o-chal--button-strength {
    position: absolute;
    top: 5px;
    left: 0px;
    width: 100%;
    font-size: 9px;
}
.o-chal--button-symbol {
    font-size: 32px;
    font-weight: bold;
}
.o-chal--button-completion {
    position: absolute;
    bottom: 5px;
    left: 0px;
    width: 100%;
    font-size: 9px;
}

.o-chal--button.trapped,
.o-chal--button.selected {
    transform: translateY(4px);
}

.o-chal--button.active {
    background-color: #dd0;
    border-color: #880;
    box-shadow: 0px 4px #880;
    transform: translateY(8px);
}
.o-chal--button.trapped {
    background-color: #dd7;
    border-color: #884;
    box-shadow: 0px 8px #884;
}
.o-chal--button.selected {
    box-shadow: 0px 8px #888;
}
</style>