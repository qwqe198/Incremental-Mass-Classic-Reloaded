import { hasUpgrade, simpleUpgradeBoost, simpleUpgradeEffect, upgradeEffect } from "./upgrades"

export const BH_UPGRADES = {
    'bh1': {
        unl: ()=>player.bh.unlocked,
        get description() { return `增加黑洞的质量，每级提升 <b>${formatMult(this.base)}</b>。` },

        curr: "dark-matter",
        cost: a => a.sumBase(1.01).pow_base(2).div(simpleUpgradeBoost('mlt6',simpleAchievementEffect(24))),
        bulk: a => a.mul(simpleUpgradeBoost('mlt6',simpleAchievementEffect(24))).log(2).sumBase(1.01,true).floor().add(1),

        get bonus() { return upgradeEffect('mlt2',0) },
        get strength() { return insideChallenge('3-5') ? 0.01 : Decimal.mul(simpleUpgradeEffect('mlt7'),challengeEffect('2-2')).mul(upgradeEffect('bmlt2')) },
        get base() {
            let b = Decimal.mul(3,simpleUpgradeEffect('bh4')).mul(simpleUpgradeEffect('bh14'))
            return b
        },
        effect(a) {
            let x = this.base.pow(a)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'bh2': {
        unl: ()=>player.bh.unlocked,
        get description() { return `增加黑洞第二个效果的指数，每级提升 <b>+${formatPercent(this.base)}</b>。` },

        curr: "dark-matter",
        cost: a => a.sumBase(1.05).pow_base(10).div(simpleUpgradeBoost('mlt6',simpleAchievementEffect(24))),
        bulk: a => a.mul(simpleUpgradeBoost('mlt6',simpleAchievementEffect(24))).log(10).sumBase(1.05,true).floor().add(1),

        get bonus() { return upgradeEffect('mlt2',0) },
        get strength() { return insideChallenge('3-5') ? 0.01 : Decimal.mul(upgradeEffect('bmlt2'),challengeEffect('3-3')) },
        get base() {
            let b = Decimal.add(0.5,simpleUpgradeEffect('bh9',0))
            return b
        },
        effect(a) {
            let x = this.base.mul(a).add(1)
            return x
        },
        effDesc: x => formatPow(x),
    },
    'bh3': {
        qol: true,
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `开始时解锁前三个质量升级。解锁第四个质量升级，降低之前质量升级的成本。` },

        curr: "dark-matter",
        cost: a => 5,
    },
    'bh4': {
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `普通质量以降低的速率增加 <b>bh1</b> 升级的基础。` },

        curr: "dark-matter",
        cost: a => 100,

        effect(a) {
            let x = hasUpgrade('bh14') ? expPow(player.mass.add(10).log10(),0.5).pow(2) : player.mass.add(10).log10().log10().add(1)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'bh5': {
        qol: true,
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `自动升级狂怒升级，无需消耗任何资源。` },

        curr: "dark-matter",
        cost: a => 1e3,
    },
    'bh6': {
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `增加黑洞的新效果。增强黑洞的第一个效果。` },

        curr: "dark-matter",
        cost: a => 1e4,
    },
    'bh7': {
        qol: true,
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `重置时被动生成 100% 的狂怒能量。` },

        curr: "dark-matter",
        cost: a => 1e5,
    },
    'bh8': {
        qol: true,
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `解锁 <b>反黑洞</b>。<b>bh2</b> 升级以降低的速率影响黑洞的第三个效果和反黑洞的第二个效果。` },

        curr: "dark-matter",
        cost: a => 1e6,

        effect(a) {
            let x = upgradeEffect('bh2').max(1).root(2)
            return x
        },
        effDesc: x => formatPow(x),
    },
    'bh9': {
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `反黑洞的质量以降低的速率增加 <b>bh2</b> 升级的基础。` },

        curr: "dark-matter",
        cost: a => 1e7,

        effect(a) {
            let x = expPow(player.bh.anti_mass.add(1).log10(),0.5).div(10)
            return x
        },
        effDesc: x => "+"+format(x,4),
    },
    'bh10': {
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `显著增强 <b>r3</b> 升级。` },

        curr: "dark-matter",
        cost: a => 1e8,
    },
    'bh11': {
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `增加反黑洞的新效果。黑洞提升反黑洞的质量。` },

        curr: "dark-matter",
        cost: a => 1e9,

        effect(a) {
            let x = expPow(player.bh.mass.add(1),1/3)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'bh12': {
        max: 1,

        unl: ()=>player.mlt.unlocked,
        get description() { return `狂怒能量提升至 <b>1.15</b> 次方。` },

        curr: "dark-matter",
        cost: a => 1e13,
    },
    'bh13': {
        max: 1,

        unl: ()=>player.mlt.unlocked,
        get description() { return `<b>bh1</b> 升级以降低的速率影响反黑洞。` },

        curr: "dark-matter",
        cost: a => 1e40,

        effect(a) {
            let x = expPow(upgradeEffect('bh1'),1/2)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'bh14': {
        max: 1,

        unl: ()=>player.mlt.unlocked,
        get description() { return `黑洞的质量以降低的速率增加 <b>bh1</b> 升级的基础。增强 <b>bh4</b> 升级。` },

        curr: "dark-matter",
        cost: a => 1e69,

        effect(a) {
            let x = expPow(player.bh.mass.add(10).log10(),0.5).pow(2)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'bh15': {
        max: 1,

        unl: ()=>player.mlt.unlocked,
        get description() { return `暗物质提升多元宇宙能量生成。` },

        curr: "dark-matter",
        cost: a => 1e200,

        effect(a) {
            let x = player.bh.dm.add(10).log10().pow(2)
            return x
        },
        effDesc: x => formatMult(x),
    },
}

export const BH_effects = [
    x => `普通质量提升 <h3>${formatMult(x)}</h3>`,
    x => `黑洞质量提升 <h3>${formatMult(x)}</h3>`,
    x => `狂怒能量提升 <h3>${formatMult(x)}</h3>`,
    x => `普通质量提升 <h3>${formatPow(x)}</h3>`,
]

export const ABH_effects = [
    x => `黑洞质量提升 <h3>${formatMult(x)}</h3>`,
    x => `反黑洞质量提升 <h3>${formatMult(x)}</h3>`,
    x => `暗物质提升 <h3>${formatMult(x)}</h3>`,
]

function getBHEffect() {
    var bh = player.bh.mass

    var a = [
        bh.root(hasUpgrade('bh6') ? 2 : 4).mul(10).add(1).pow(simpleAchievementEffect(26)).pow(simpleUpgradeEffect('bmlt5')),
        expPow(bh.add(1), Decimal.add(0.5,challengeEffect('3-4',0))).pow(upgradeEffect('bh2')).pow(simpleAchievementEffect(26)),
    ]

    if (hasUpgrade('bh6')) a[2] = expPow(bh.add(1), 0.4).pow(simpleUpgradeEffect('bh8')).pow(simpleAchievementEffect(26));
    if (hasUpgrade('exm5')) a[3] = expPow(player.bh.mass.add(10).log10(),1/3).pow(simpleAchievementEffect(26));

    return a
}

function getABHEffect() {
    var bh = player.bh.anti_mass

    var a = [
        bh.root(2).mul(10).add(1).pow(simpleAchievementEffect(36)).pow(simpleUpgradeBoost('bmlt8',upgradeEffect('bh2'))),
        expPow(bh.add(1), Decimal.add(0.5,challengeEffect('3-4',0))).pow(simpleUpgradeEffect('bh8')).pow(simpleAchievementEffect(36)),
    ]

    if (hasUpgrade('bh11')) a[2] = expPow(bh.add(1), 0.4).pow(player.mlt.times.gte(4) ? simpleUpgradeEffect('bh8') : 1).pow(simpleAchievementEffect(36));

    return a
}

createTempUpdate("updateBHTemp", ()=>{
    temp.bh_effect = getBHEffect()
    temp.abh_effect = getABHEffect()
})