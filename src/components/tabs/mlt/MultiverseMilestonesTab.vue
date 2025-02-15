<script>
export default {
    name: "MultiverseMilestonesTab",
    data() {
        return {
            mlt: DC.D0,
            next: 0,
            milestones: MULTIVERSE.milestones,
        }
    },
    computed: {
        
    },
    methods: {
        update() {
            this.mlt = player.mlt.times

            let w = this.milestones.findIndex(x => this.mlt.lt(x[0]))
            this.next = w === -1 ? this.milestones.length : w+2
        },
    },
}
</script>
<template>
    <div class="c-table-center" style="margin: 5px 0;">
        <button v-for="x in milestones.length" v-if="x <= next" class="o-primary-btn o-mlt-milestone" :class="{'o-primary-btn--bought': mlt.gte(milestones[x-1][0])}">
            <div class="o-mlt-milestone--req">Multiverse #{{ format(milestones[x-1][0],0) }}</div>
            <div v-html="milestones[x-1][1]"></div>
        </button>
    </div>
</template>
<style scoped>
.o-mlt-milestone--req {
    position: absolute;
    top: 0px;
    width: calc(100% - 10px);
    text-align: left;
    font-size: 8px;
}
</style>