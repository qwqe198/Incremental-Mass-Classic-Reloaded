<script>
export default {
    name: "Tabs",
    components: {

    },
    data() {
        let s = {
            tab_length: TabSystem.length,
            tab_names: TabSystem.map(x => x.name ?? TabContents[x.stab].name),
            isUnlocked: {},
        }
        for (let i = 0; i < s.tab_length; i++) {
            s.isUnlocked[i] = false;
        }
        return s
    },
    props: {
        tab: {
            type: Number,
            required: true,
        },
        subtab: {
            type: Number,
            required: true,
        },
    },
    computed: {
        
    },
    methods: {
        update() {
            for (let i = 0; i < this.tab_length; i++) {
                this.isUnlocked[i] = TabSystem[i].unl();
            }
        },
        chooseTab(i) { Tab.choose(i) },
    },
};
</script>
<template>
    <button class="o-primary-btn o-tab-btn" v-if="isUnlocked[x-1]" v-html="tab_names[x-1]" @click="chooseTab(x-1)"></button>
</template>
<style scoped>
.o-tab-btn {
    min-width: 160px;
    height: 25px;
    font-size: 12px
}
</style>