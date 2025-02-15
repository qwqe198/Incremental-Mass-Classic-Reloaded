<script>
import Achievement from './Achievement.vue';

export default {
    name: "AchievementsTab",
    components: {
        Achievement,
    },
    data() {
        return {
            ACHIEVEMENTS_KEYS,
            ACHIEVEMENTS_VISIBLE,
        }
    },
}
</script>
<template>
    <div>
        <div class="o-achievements-grid">
            <template v-for="x in ACHIEVEMENTS_KEYS">
                <Achievement v-if="ACHIEVEMENTS_VISIBLE[x]" :id="x"/>
                <div v-else class="o-achievement--cell-hidden"></div>
            </template>
        </div>
    </div>
</template>
<style scoped>
.o-achievements-grid {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(6, 129px);
    grid-auto-rows: 129px;
    grid-gap: 5px;
}
</style>