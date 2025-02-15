<script>
import SubTabButton from './SubTabButton.vue';

export default {
    name: "Tabs",
    components: {
        SubTabButton,
    },
    data() {
        let s = {
            tab_length: TabSystem.length,
            tab_names: TabSystem.map(x => x.name ?? TabContents[x.stab].name),
            isUnlocked: {},
            choosed: 0,

            subtab: {},
        }
        for (let i = 0; i < s.tab_length; i++) {
            s.isUnlocked[i] = false;

            let stab = TabSystem[i].stab

            if (Array.isArray(stab)) {
                let g = {
                    length: stab.length,
                    names: stab.map(x => TabContents[x[0]].name),
                    isUnlocked: {},
                    choosed: 0,
                }

                for (let i = 0; i < stab.length; i++) g.isUnlocked[i] = false;

                s.subtab[i] = g
            }
        }
        return s
    },
    computed: {
        
    },
    methods: {
        update() {
            for (let i = 0; i < this.tab_length; i++) {
                let ts = TabSystem[i]

                this.isUnlocked[i] = ts.unl();

                let stab = this.subtab[i]

                if (stab) {
                    for (let j = 0; j < stab.length; j++) stab.isUnlocked[j] = ts.stab[j][1]?.() ?? true;

                    stab.choosed = Tab.subtab[i];
                }
            }

            this.choosed = Tab.tab
        },
        chooseTab(i,j) { Tab.choose(i,j) },
    },
};
</script>
<template>
    <div style="min-height: 100px;">
        <div class="c-table-center">
            <button class="o-primary-btn o-tab-btn" v-for="x in tab_length" v-if="isUnlocked[x-1]" v-html="tab_names[x-1]" @click="chooseTab(x-1)"></button>
        </div><div class="c-table-center" v-if="subtab[choosed]">
            <button class="o-primary-btn o-subtab-btn" v-for="x in subtab[choosed].length" v-if="subtab[choosed].isUnlocked[x-1]" @click="chooseTab(choosed,x-1)">{{ subtab[choosed].names[x-1] }}</button>
        </div>
    </div>
</template>
<style scoped>
.o-tab-btn {
    min-width: 200px;
    height: 35px;
    font-size: 16px
}
.o-subtab-btn {
    min-width: 150px;
    height: 25px;
    font-size: 12px
}
</style>