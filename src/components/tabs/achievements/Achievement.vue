<script>
export default {
    name: "Achievement",
    props: {
        id: {
            type: Number,
        },
    },
    data() {
        return {
            ach: ACHIEVEMENTS[this.id],

            isUnlocked: false,
            tooltip: "",
            isMouseOver: false,
        }
    },
    computed: {
        classObject() {
            return {
                unlocked: this.isUnlocked,
            }
        },
        styleObject() {
            return {'background-position': `-${(this.id%10-1)%8*125}px -${Math.floor(Math.floor(this.id/10)-1)*125}px`}
        },
    },
    methods: {
        update() {
            this.isUnlocked = player.achievements.includes(this.id);

            if (this.isMouseOver) {
                this.tooltip = getAchievementTooltip(this.id);
            }
        },
        onMouseEnter() {
            clearTimeout(this.mouseOverInterval);
            this.isMouseOver = true;
        },
        onMouseLeave() {
            this.mouseOverInterval = setTimeout(() => this.isMouseOver = false, 300);
        },
    },
}
</script>
<template>
    <div class="o-achievement--cell" :style="styleObject" :class="classObject" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <div class="o-achievement--tooltip">
            <template v-if="isMouseOver && tooltip">
                <div class="o-achievement--tooltip-text" v-html="tooltip"></div>
            </template>
        </div>
    </div>
</template>
<style scoped>
.o-achievement--tooltip {
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;

  pointer-events: none;
  z-index: 2;

  padding: 5px 10px;
  border: solid 1px white;
  border-radius: 5px;
  width: 250px;
  background-color: #000e;

  opacity: 0;
  transform: translate(-50%, 20px);

  transition: opacity 0.3s, transform 0.3s;
}
.o-achievement--tooltip::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 100%;
    width: 20px;
    height: 20px;
    background-color: white;
    clip-path: polygon(50% 50%, 0% 0%, 100% 0%);
    transform: translateX(-50%);
}
.o-achievement--cell:hover > .o-achievement--tooltip {
  opacity: 1;
  transform: translate(-50%, 0px);
}

.o-achievement--tooltip-text {
  color: white;
  
  text-align: center;
  font-size: 12px;
}
</style>