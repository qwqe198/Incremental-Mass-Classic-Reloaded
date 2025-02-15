import { expPow } from "../decimal"

export const MULTIVERSE = {
    get level() { return player.mlt.times },

    require(l=this.level) {
        let x = l.sumBase(1.01).pow(1.25).pow_base(1.44).mul(7).pow_base(DC.MAX_VALUE).mul(1.5e56)
        return x
    },
    get bulk() {
        let x = player.mass.div(1.5e56).log(DC.MAX_VALUE).div(7).log(1.44).root(1.25).sumBase(1.01,true).add(1).floor()
        return x
    },

    get effect() {
        let e = player.mlt.total_energy, x = []

        x[0] = e.add(10).log10().root(2).sub(1).div(10).add(1).pow(temp.break_mlt_effect[0])

        return x
    },

    milestones: [
        [1, `Unlock the multiversal energy generation permanently.`],
        [2, `Unlock the third Rank called <b>Tetr</b>.`],
        [3, `Keep the <b>bh3</b> upgrade on reset. Automatically update <b>Tetr</b>.`],
        [4, `Keep the <b>bh8</b> upgrade on reset, and it affects the third effect of the anti-black hole. Automate the black hole upgrades without spending any resources.`],
        [6, `The base of multiversal energy generation is <b>squared</b>.`],
        [7, `Unlock the <b>Challenge</b>.`],
        [9, `Keep the <b>bh7</b> upgrade on reset. Passively generate 100% of your dark matter gained on reset.`],
        [11, `Unlock the second layer of <b>Challenge</b>.`],
        [16, `The <b>mlt2</b> upgrade's base is <b>doubled</b>.`],
        [17, `Unlock <b>something</b> in the multiverse.`],
        [20, `Unlock the fourth Rank called <b>Pent</b> (can be automated). The L1 challenge completions will be set to the best. <i class="small-text">(It triggers if you exit any challenge. They're also kept on reset unless you enter any challenges)</i>`],
        [24, `The L1 challenges can be completed automatically outside, <b>not exceeding the best</b>.`],
        [31, `Unlock the third layer of <b>Challenge</b>. Automate the multiverse upgrades without spending any resources.`],
        [50, `Unlock the <b>Ex-Mass</b>.`],
        [60, `The L2 challenge completions will be set to the best.`],
        [84, `Reduce the <b>Prestige</b> requirement slightly.`],
        [100, `Unlock the next reset layer.<br><i class="small-text">(Not yet implemented...)</i>`],
    ],

    break: {
        doBreak() {
            resetChallengeLayers(2)
            resetUpgradesByGroup('mlt')
            player.mlt.energy = DC.D0, player.mlt.total_energy = DC.D0

            RESETS.multiverse.doReset()
        },

        get effect() {
            let e = player.mlt.total_fragments, x = []
    
            x[0] = e.add(1).log10().mul(.15).add(1).root(player.prestiges[1].gte(3) ? 2.5 : 3)
    
            return x
        },
    },
}

export const MLT_UPGRADES = {
    'mlt1': {
        unl: ()=>player.mlt.unlocked,
        get description() { return `Increase multiversal energy generation by <b>${formatMult(this.base)}</b> per level.` },

        curr: "mlt-energy",
        cost: a => a.sumBase(1.01).pow_base(3.5).mul(10),
        bulk: a => a.div(10).log(3.5).sumBase(1.01,true).floor().add(1),

        get strength() { return temp.break_mlt_effect[0].mul(simpleAchievementEffect(53)) },
        get base() {
            let b = Decimal.add(2,simpleUpgradeEffect('mlt11',0)).mul(challengeEffect('3-1'))
            return b
        },
        effect(a) {
            let x = this.base.pow(a)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'mlt2': {
        unl: ()=>player.mlt.unlocked,
        get description() { return `Gain <b>+${format(this.base)}</b> bonus levels of the <b>m3</b>, <b>r1</b>, and <b>bh1-2</b> upgrades per level.` },

        curr: "mlt-energy",
        cost: a => a.sumBase(1.1).pow_base(5).mul(100),
        bulk: a => a.div(100).log(5).sumBase(1.1,true).floor().add(1),

        get strength() { return temp.break_mlt_effect[0].mul(simpleAchievementEffect(53)) },
        get base() {
            let b = Decimal.add(player.mlt.times.gte(16) ? 2 : 1,simpleUpgradeEffect('bmlt6',0))
            return b
        },
        effect(a) {
            let x = a.mul(this.base)
            return x
        },
        effDesc: x => "+"+format(x),
    },
    'mlt3': {
        max: 1,

        unl: ()=>player.mlt.times.gte(2),
        get description() { return `Total multiversal energy reduces the scaling of the <b>m3</b> upgrade.` },

        curr: "mlt-energy",
        cost: a => E(1e4),

        effect(a) {
            let x = player.mlt.total_energy.add(10).log10().log10().div(10).add(1).pow(-1)
            return x
        },
        effDesc: x => formatMult(x,4),
    },
    'mlt4': {
        max: 1,

        unl: ()=>player.mlt.times.gte(3),
        get description() { return `The <b>m4</b> upgrade scales <b>${formatMult(50/9)}</b> slower.` },

        curr: "mlt-energy",
        cost: a => E(1e6),
    },
    'mlt5': {
        max: 1,

        unl: ()=>player.mlt.times.gte(4),
        get description() { return `Add bonus <b>m3</b> upgrade by <b>+1</b> per <b>Tier</b>.` },

        curr: "mlt-energy",
        cost: a => E(1e11),

        effect(a) {
            let x = player.ranks[1]
            return x
        },
        effDesc: x => "+"+format(x),
    },
    'mlt6': {
        max: 1,

        unl: ()=>player.mlt.times.gte(5),
        get description() { return `The <b>"I ate without cheapness"</b> achievement affects the <b>bh1-2</b> upgrades normally.` },

        curr: "mlt-energy",
        cost: a => E(1e13),
    },
    'mlt7': {
        max: 1,

        unl: ()=>player.mlt.times.gte(6),
        get description() { return `The <b>bh2</b> upgrade strengthens the <b>bh1</b> upgrade.` },

        curr: "mlt-energy",
        cost: a => E(1e26),

        effect(a) {
            let x = getTotalUpgrades('bh2').div(50).add(1)
            return x
        },
        effDesc: x => formatPercent(x.sub(1)),
    },
    'mlt8': {
        max: 1,

        unl: ()=>player.mlt.times.gte(6),
        get description() { return `The multiversal energy's effect affects rage powers.` },

        curr: "mlt-energy",
        cost: a => 1e30,
    },
    'mlt9': {
        max: 1,

        unl: ()=>player.mlt.times.gte(7),
        get description() { return `Product of challenge completions multiplies multiversal energy generation.` },

        curr: "mlt-energy",
        cost: a => 1e36,

        effect(a) {
            let x = DC.D1
            for (let id in CHALLENGES) x = x.mul(player.chal.completions[id].add(1))
            return x
        },
        effDesc: x => formatMult(x),
    },
    'mlt10': {
        max: 1,

        unl: ()=>player.mlt.times.gte(9),
        get description() { return `The multiversal energy's effect affects mass of the black hole.` },

        curr: "mlt-energy",
        cost: a => 1e54,
    },
    'mlt11': {
        max: 1,

        unl: ()=>player.mlt.times.gte(10),
        get description() { return `Multiverse increases the base of <b>mlt1</b> upgrade.` },

        curr: "mlt-energy",
        cost: a => 1e66,

        effect(a) {
            let x = player.mlt.times.mul(0.1)
            if (x.gt(1) && hasUpgrade('bmlt6')) x = x.pow(2)
            return x
        },
        effDesc: x => "+"+format(x),
    },
    'mlt12': {
        max: 1,

        unl: ()=>player.mlt.times.gte(11),
        get description() { return `The multiversal energy's effect affects mass of the anti-black hole.` },

        curr: "mlt-energy",
        cost: a => 1e100,
    },
    'mlt13': {
        max: 1,

        unl: ()=>player.mlt.times.gte(14),
        get description() { return `Product of ranks multiplies multiversal energy generation.` },

        curr: "mlt-energy",
        cost: a => 1e144,

        effect(a) {
            let x = DC.D1
            for (let id in RANKS) x = x.mul(player.ranks[id].add(1))
            return expPow(x,1.5)
        },
        effDesc: x => formatMult(x),
    },
    'mlt14': {
        max: 1,

        unl: ()=>player.mlt.times.gte(15),
        get description() { return `The <b>"I ate without cheapness"</b> achievement is improved.` },

        curr: "mlt-energy",
        cost: a => 1e196,
    },
    'mlt15': {
        max: 1,

        unl: ()=>player.mlt.times.gte(19),
        get description() { return `The multiversal energy's effect affects dark matter.` },

        curr: "mlt-energy",
        cost: a => 1e285,
    },

    'bmlt1': {
        unl: ()=>player.mlt.broken,
        get description() { return `Increase multiversal fragments generation by <b>${formatMult(this.base)}</b> per level.` },

        curr: "mlt-fragments",
        cost: a => a.sumBase(1.01).pow_base(3.5).mul(10),
        bulk: a => a.div(10).log(3.5).sumBase(1.01,true).floor().add(1),

        get strength() { return simpleUpgradeEffect('bmlt11') },
        get base() {
            let b = Decimal.mul(2,challengeEffect('3-1'))
            return b
        },
        effect(a) {
            let x = this.base.pow(a)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'bmlt2': {
        unl: ()=>player.mlt.broken,
        get description() { return `Strengthen the <b>m1-4</b>, <b>r1</b>, and <b>bh1-2</b> upgrades by <b>${formatPercent(this.base)}</b> per level.` },

        curr: "mlt-fragments",
        cost: a => a.sumBase(1.1).pow_base(6).mul(100),
        bulk: a => a.div(100).log(6).sumBase(1.1,true).floor().add(1),

        get strength() { return simpleUpgradeEffect('bmlt11') },
        get base() {
            let b = 0.05
            return b
        },
        effect(a) {
            let x = a.mul(this.base).add(1)
            return x
        },
        effDesc: x => formatPercent(x.sub(1)),
    },
    'bmlt3': {
        unl: ()=>player.mlt.broken,
        get description() { return `Increase multiversal energy generation by <b>${formatMult(this.base)}</b> per level, based on total multiversal fragments.` },

        curr: "mlt-fragments",
        cost: a => a.sumBase(1.01).pow_base(4).mul(1e3),
        bulk: a => a.div(1e3).log(4).sumBase(1.01,true).floor().add(1),

        get strength() { return simpleUpgradeEffect('bmlt11') },
        get base() {
            let b = player.mlt.total_fragments.add(10).log10().root(2).add(1)
            return b
        },
        effect(a) {
            let x = this.base.pow(a)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'bmlt4': {
        max: 1,

        unl: ()=>player.mlt.broken,
        get description() { return `The multiversal fragment's effect affects the L1 challenges.` },

        curr: "mlt-fragments",
        cost: a => E(1e6),
    },
    'bmlt5': {
        max: 1,

        unl: ()=>player.mlt.broken,
        get description() { return `The <b>bh2</b> upgrade affects the first black hole's effect at a reduced rate.` },

        curr: "mlt-fragments",
        cost: a => E(1e8),

        effect(a) {
            let x = expPow(upgradeEffect('bh2'),0.5)
            return x
        },
        effDesc: x => formatPow(x),
    },
    'bmlt6': {
        max: 1,

        unl: ()=>player.mlt.broken,
        get description() { return `The <b>mlt11</b> upgrade's effect is <b>squared</b> after <b>+1</b>. Multiverse increases the base of <b>mlt2</b> upgrade, starting at 20.` },

        curr: "mlt-fragments",
        cost: a => E(1e11),

        effect(a) {
            let x = player.mlt.times.sub(19).max(0).div(10)
            return x
        },
        effDesc: x => "+"+format(x),
    },
    'bmlt7': {
        max: 1,

        unl: ()=>player.mlt.broken,
        get description() { return `Total multiversal energy boosts multiversal fragment generation at a reduced rate.` },

        curr: "mlt-fragments",
        cost: a => 1e12,

        effect(a) {
            let x = expPow(player.mlt.total_energy.add(1),0.25)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'bmlt8': {
        max: 1,

        unl: ()=>player.mlt.broken,
        get description() { return `The <b>bh2</b> upgrade affects the first anti-black hole's effect.` },

        curr: "mlt-fragments",
        cost: a => E(1e24),
    },
    'bmlt9': {
        max: 100,

        unl: ()=>player.mlt.broken,
        get description() { return `The <b>m3</b> upgrade affects the <b>m1</b> upgrade's effect at a reduced rate.` },

        curr: "mlt-fragments",
        cost: a => a.add(5).pow(2).add(1).pow_base(10),
        bulk: a => a.log(10).sub(1).root(2).sub(4).floor(),

        effect(a) {
            let x = a.root(2).div(10)
            return x
        },
        effDesc: x => formatPow(x,4) + ` (${formatPow(upgradeEffect('m3').pow(x))})`,
    },
    'bmlt10': {
        max: 1,

        unl: ()=>player.mlt.broken,
        get description() { return `The <b>η</b> challenge's reward affects dark matter normally.` },

        curr: "mlt-fragments",
        cost: a => E(1e30),
    },
    'bmlt11': {
        max: 1,

        unl: ()=>player.mlt.broken && player.prestiges[1].gte(3),
        get description() { return `The <b>bmlt1-3</b> upgrades are stronger based on multiverses.` },

        curr: "mlt-fragments",
        cost: a => E('e500'),

        effect(a) {
            let x = player.mlt.times.add(10).log10().root(4)
            return x
        },
        effDesc: x => formatPercent(x.sub(1)) + " stronger",
    },
}

createTempUpdate("updateMultiverseTemp", ()=>{
    temp.break_mlt_effect = MULTIVERSE.break.effect
    temp.mlt_effect = MULTIVERSE.effect
})