<script>
export default {
    name: "PrimaryButton",
    data() {
        return {
            unlocked: false,
            description: "",
            mass: false,
            max: DC.D1,
            bonus: DC.D0,
            level: DC.D0,
            strength: DC.D1,
            cost: EINF,
            effDesc: undefined,
            isAutoUnlocked: false,
            auto: false,
            locked: false,

            currency: DC.D0,
            suffix: "",
        }
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    computed: {
        classObject() {
            return {
                "o-primary-btn--disabled": this.level.lt(this.max) && (this.locked || this.currency.lt(this.cost)),
                "o-primary-btn--bought": this.level.gte(this.max),
            };
        },
        get_level() {
            return formatPercent(this.strength) + "<br>Level: " + format(this.level,0) + (this.bonus > 0 ? ` + ${format(this.bonus)} ➜ ${format(this.level.add(this.bonus),0)}` : "") + (Decimal.lt(this.max,EINF) ? " / " + format(this.max,0) : "");
        },
        get_desc() {
            let h = this.description
            if (this.effDesc) h += `<br class='sub-line'> Effect: ` + this.effDesc.bold();
            return h
        },
        get_cost() {
            return this.locked ? `Locked` : "Cost: " + (this.mass?formatMass:format)(this.cost) + " " + this.suffix;
        },
    },
    methods: {
        update() {
            const u = UPGRADES[this.id];
            
            this.unlocked = u.unl();

            if (!this.unlocked) return;

            const curr = CURRENCIES[u.curr];
            this.currency = curr.amount;
            this.suffix = curr.costName ?? curr.name;

            this.mass = u.mass;
            this.level = player.upgrades[this.id];
            this.max = u.max ?? EINF;
            this.bonus = temp.bonus_upgrades[this.id] ?? 0; // u.bonus ?? 0;
            this.strength = u.strength ?? 1;
            this.description = u.description;
            this.cost = u.cost(this.level);
            this.auto = player.auto_upgs[this.id];
            this.locked = temp.locked_upgrades[this.id];
            this.isAutoUnlocked = temp.auto_upgs_unlocked[this.id];

            this.effDesc = u.effDesc?.(temp.upgrade_effects[this.id]);
        },
        purchase() { buyUpgrade(this.id); },
        purchase_all() { buyUpgrade(this.id,true); },
        auto_switch() { player.auto_upgs[this.id] = !player.auto_upgs[this.id] },
    },
};
</script>

<template>
    <div v-if="unlocked">
        <button
        class="o-primary-btn o-upgrade-btn"
        :class="classObject"
        @click="purchase"
        >
        <div class="o-upgrade-btn--id">{{ id }}</div>
        <div class="o-upgrade-btn--level" v-if="max > 1" v-html="get_level"></div>
        <div v-html="get_desc"></div>
        <div class="o-upgrade-btn--cost" v-html="get_cost"></div>
        </button>
        <div class="o-upgrade-bottom">
            <button class="o-primary-btn" v-if="max > 1" @click="purchase_all">
                Buy MAX
            </button><button class="o-primary-btn" v-if="isAutoUnlocked" @click="auto_switch">
                Auto: <b v-if="auto" style="color:lime">ON</b><b v-else style="color:red">OFF</b>
            </button>
        </div>
    </div>
</template>

<style scoped>
.o-upgrade-btn {
    padding: 20px 5px;
    margin-bottom: 0px;
    width: 200px;
    min-height: 200px;
    font-size: 10px;

    position: relative;
}
.o-upgrade-btn * {
    pointer-events: none
}
.o-upgrade-btn--id {
    position: absolute;
    top: 0px;
    width: calc(100% - 10px);
    text-align: right;
    color: #fff8;
    font-size: 8px;
}
.o-upgrade-btn--cost {
    position: absolute;
    bottom: 0px;
    width: calc(100% - 10px);
    font-size: 8px;
}
.o-upgrade-btn--level {
    position: absolute;
    top: 0px;
    width: calc(100% - 10px);
    text-align: left;
    font-size: 8px;
}

.o-upgrade-bottom {
    display: flex;
}
.o-upgrade-bottom > button {
    width: 100%;
    margin-top: 0px;
    font-size: 10px;
    height: 25px;
}
</style>