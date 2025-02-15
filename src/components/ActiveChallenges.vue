<script>
export default {
    name: "ActiveChallenges",
    data() {
        let s = {
            chal: {
                inside: false,
                active: {},
            },
        }
        for (let id in CHALLENGES) s.chal.active[id] = false
        return s
    },
    computed: {
        get_html() {
            let h = []

            if (this.chal.inside) {
                let c = []
                for (let id in CHALLENGES) if (this.chal.active[id]) {
                    const C = CHALLENGES[id]
                    c.push(C.symbol + ('trap' in C ? ` (${C.trap.map(x=>CHALLENGES[x].symbol).join(" + ")})` : ""))
                }
                h.push(`<b>${c.join(" + ")}</b> challenge${c.length > 1 ? "s are" : " is"} running.`)
            }

            return h.length === 0 ? "No Challenges Active!" : h.join(" | ")
        },
    },
    methods: {
        update() {
            const c_data = this.chal
            c_data.inside = !temp.outside_chal
            if (c_data.inside) for (let id in CHALLENGES) c_data.active[id] = player.chal.active[id];
        },
    },
}
</script>
<template>
    <div style="min-height: 36px; font-size: 12px;">
        <div v-html="get_html"></div>
    </div>
</template>
<style scoped>

</style>