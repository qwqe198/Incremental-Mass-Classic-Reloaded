<script>
export default {
    name: "TopbarCurrency",
    data() {
        return {
            isUnlocked: false,
            color: "white",
            display: "",
            tooltip: null,
            isMouseOver: false,
        }
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    computed: {
        styleObject() {
            return {
                "border-color": this.color,
                "color": this.color,
            }
        },
        classObject() {
            return {
                'o-topbar--reset': TOPBAR_CURRENCIES[this.id].click !== undefined,
            }
        },
        classObject2() {
            return {
                ['o-currency--'+this.id]: true,
            }
        },
    },
    methods: {
        update() {
            const tc = TOPBAR_CURRENCIES[this.id]

            this.isUnlocked = tc.unl()

            if (this.isUnlocked) {
                this.display = tc.name.bold() + ": " + tc.display;
                this.color = tc.color

                let t = tc.tooltip
                if (t) {
                    this.tooltip = t
                }
            }
        },
        action() { TOPBAR_CURRENCIES[this.id].click?.() },
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
    <div class="o-topbar--currency" :class="classObject" :style="styleObject" @click="action" v-if="isUnlocked" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
        <div class="o-topbar--display" :class="classObject2" v-html="display"></div>
        <div class="o-topbar--tooltip">
            <template v-if="isMouseOver && tooltip">
                <div class="o-topbar--tooltip-text" v-html="tooltip"></div>
            </template>
        </div>
    </div>
</template>
<style scoped>
.o-topbar--currency {
    position: relative;
    width: calc(100% - 10px);
    height: 42px;
    padding: 3px;
    margin: 2px;

    border: dashed 1px white;
    border-radius: 5px;
    transition: background-color 0.2s;
}
.o-topbar--currency.o-topbar--reset {
    cursor: pointer;
    border-style: solid;
}
.o-topbar--currency.o-topbar--reset:hover {
    background-color: #fff2;
}

.o-topbar--display {
    position: absolute;
    left: 3px;
    top: 50%;
    transform: translateY(-50%) translateY(0.00001px);
    width: calc(100% - 6px);
    text-align: left;
    font-size: 12px;
    pointer-events: none;
}

.o-topbar--tooltip {
    position: absolute;
    top: calc(100% + 12px);
    left: -1px;

    pointer-events: none;
    z-index: 2;

    padding: 5px 10px;
    border: solid 1px white;
    border-radius: 5px;
    width: calc(100% - 20px);
    background-color: #000e;

    opacity: 0;
    transform: translateY(-20px);

    transition: opacity 0.3s, transform 0.3s;
}
.o-topbar--tooltip::before {
    content: "";
    position: absolute;
    left: 5px;
    bottom: 100%;
    width: 20px;
    height: 20px;
    background-color: white;
    clip-path: polygon(50% 50%, 0% 100%, 100% 100%);
}
.o-topbar--currency:hover > .o-topbar--tooltip {
    opacity: 1;
    transform: translateY(0px);
}

.o-topbar--tooltip-text {
    color: white;
    
    text-align: left;
    font-size: 12px;
}
</style>