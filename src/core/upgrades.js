import { BH_UPGRADES } from "./black-hole"
import { MLT_UPGRADES } from "./mlt/multiverse"
import { EXMASS_UPGRADES } from "./prestiges"

export const UPGRADES = {
    'm1': {
        unl: ()=>hasUpgrade('bh3') || player.ranks[0].gte(1),
        mass: true,
        get description() { return `每级增加普通质量的基础 <b>+${this.base.format()}</b>。` },

        curr: "mass",
        cost: a => a.pow_base(player.ranks[0].gte(2) ? 1.25 : 1.5).mul(10).div(upgradeEffect('m4')).max(1).root(upgradeEffect('m5')),
        bulk: a => a.pow(upgradeEffect('m5')).mul(upgradeEffect('m4')).div(10).log(player.ranks[0].gte(2) ? 1.25 : 1.5).floor().add(1),

        get bonus() { return simpleUpgradeEffect('r5',0) },
        get strength() { return insideChallenge('3-5') ? 0.01 : Decimal.add(1,simpleUpgradeEffect('r11',0)).add(rankEffect(2,3)).mul(challengeEffect('1-1')).mul(upgradeEffect('bmlt2')) },
        get base() {
            let b = DC.D1
            if (player.ranks[0].gte(3)) b = b.add(player.upgrades.m1.div(10))
            b = b.mul(upgradeEffect('m2'))
            return b
        },
        effect(a) {
            let x = a.mul(this.base).pow(upgradeEffect('m3',DC.D1).pow(upgradeEffect('bmlt9',0)))
            return x
        },
        effDesc: x => `+${format(x)}`,
    },
    'm2': {
        unl: ()=>hasUpgrade('bh3') || player.ranks[0].gte(2),
        mass: true,
        get description() { return `每级增加 <b>m1</b> 升级的基础 <b>+${formatPercent(this.base)}</b>。` },

        curr: "mass",
        cost: a => a.pow_base(player.ranks[0].gte(3) ? 2 : 3).mul(100).div(upgradeEffect('m4')).max(1).root(upgradeEffect('m5')),
        bulk: a => a.pow(upgradeEffect('m5')).mul(upgradeEffect('m4')).div(100).log(player.ranks[0].gte(3) ? 2 : 3).floor().add(1),

        get bonus() { return simpleUpgradeEffect('r5',0) },
        get strength() { return insideChallenge('3-5') ? 0.01 : Decimal.add(1,simpleUpgradeEffect('r11',0)).add(rankEffect(2,3)).mul(challengeEffect('1-1')).mul(upgradeEffect('bmlt2')) },
        get base() {
            let b = DC.D1
            if (player.ranks[0].gte(5)) b = b.add(player.upgrades.m2.div(10))
            return b
        },
        effect(a) {
            let x = a.mul(this.base).add(1).pow(upgradeEffect('m3'))
            return x
        },
        effDesc: x => formatMult(x),
    },
    'm3': {
        unl: ()=>hasUpgrade('bh3') || player.ranks[0].gte(3),
        mass: true,
        get description() { return `每级增加 <b>m2</b> 升级效果的指数 <b>+${formatPercent(this.base)}</b>。` },

        curr: "mass",
        cost: a => a.sumBasePO(temp.upg.m3_fp).pow(1.25).pow_base(player.ranks[0].gte(4) ? 6 : 9).mul(1e3).div(upgradeEffect('m4')).max(1).root(upgradeEffect('m5')),
        bulk: a => a.pow(upgradeEffect('m5')).mul(upgradeEffect('m4')).div(1e3).log(player.ranks[0].gte(4) ? 6 : 9).root(1.25).sumBasePO(temp.upg.m3_fp,true).floor().add(1),

        get bonus() { return Decimal.add(simpleUpgradeEffect('r5',0),simpleUpgradeEffect('mlt2',0)).add(simpleUpgradeEffect('mlt5',0)) },
        get strength() { return insideChallenge('3-5') ? 0.01 : Decimal.add(hasAchievement(16) ? 1.1 : 1,simpleUpgradeEffect('r11',0)).add(rankEffect(2,3)).mul(challengeEffect('1-1')).mul(simpleAchievementEffect(44)).mul(upgradeEffect('bmlt2')) },
        get base() {
            let b = Decimal.add(0.5,simpleUpgradeEffect('r3',0))
            if (player.ranks[0].gte(32)) b = b.add(.1);
            if (player.ranks[2].gte(2)) b = b.add(player.upgrades.m3.div(100));
            if (player.ranks[3].gte(3)) b = b.mul(10);
            b = b.mul(challengeEffect('3-2'))
            return b
        },
        effect(a) {
            let x = a.mul(this.base).add(1).pow(upgradeEffect('m6'))
            return x
        },
        effDesc: x => formatPow(x),
    },
    'm4': {
        unl: ()=>hasUpgrade('bh3'),
        mass: true,
        get description() { return `每级使前三个质量升级便宜 <b>${formatMult(this.base)}</b>。` },

        curr: "mass",
        cost: a => a.sumBasePO(temp.upg.m4_fp).pow_base(3).mul(1e3).root(upgradeEffect('m5')),
        bulk: a => a.pow(upgradeEffect('m5')).div(1e3).log(3).sumBasePO(temp.upg.m4_fp,true).floor().add(1),

        get strength() { return insideChallenge('3-5') ? 0.01 : Decimal.add(1,simpleUpgradeEffect('r11',0)).add(rankEffect(2,3)).mul(challengeEffect('1-1')).mul(upgradeEffect('bmlt2')) },
        get base() {
            let b = Decimal.add(2,simpleUpgradeEffect('r7',0)).mul(simpleUpgradeEffect('r14')).mul(simpleUpgradeEffect('r15'))
            return b
        },
        effect(a) {
            let x = a.pow_base(this.base)
            return x
        },
        effDesc: x => formatMult(x.pow(-1)),
    },
    'm5': {
        unl: ()=>player.ranks[3].gte(1),
        mass: true,
        get description() { return `每级使前四个质量升级便宜 <b>${formatPow(this.base)}</b>。` },

        curr: "mass",
        cost: a => a.sumBasePO(0.05).pow_base(1.1).pow_base('1.5e1000000056'),
        bulk: a => a.log('1.5e1000000056').log(1.1).sumBasePO(0.05,true).floor().add(1),

        get strength() { return 1 },
        get base() {
            let b = Decimal.mul(2,challengeEffect('3-2'))
            return b
        },
        effect(a) {
            let x = a.pow_base(this.base)
            return x
        },
        effDesc: x => formatPow(x),
    },
    'm6': {
        unl: ()=>player.ranks[3].gte(5),
        mass: true,
        get description() { return `每级增加 <b>m3</b> 升级效果的指数 <b>+${formatPercent(this.base)}</b>。` },

        curr: "mass",
        cost: a => a.sumBasePO(0.1).pow_base(10).pow_base('ee24'),
        bulk: a => a.log('ee24').log(10).sumBasePO(0.1,true).floor().add(1),

        get strength() { return 1 },
        get base() {
            let b = .05
            if (player.prestiges[1].gte(2)) b += .01;
            return b
        },
        effect(a) {
            let x = a.mul(this.base).add(1)
            return x
        },
        effDesc: x => formatPow(x),
    },

    'r1': {
        unl: ()=>player.rage.unlocked,
        get description() { return `每级基于普通质量增加普通质量 <b>${formatMult(this.base)}</b>。` },

        curr: "rage",
        cost: a => a.sumBase(1.01).pow_base(2).div(simpleAchievementEffect(24)).max(1).root(player.ranks[3].gte(3) ? upgradeEffect('m5') : 1),
        bulk: a => a.pow(player.ranks[3].gte(3) ? upgradeEffect('m5') : 1).mul(simpleAchievementEffect(24)).log(2).sumBase(1.01,true).floor().add(1),

        get bonus() { return upgradeEffect('mlt2',0) },
        get strength() { return insideChallenge('3-5') ? 0.01 : Decimal.add(rankEffect(2,2),simpleUpgradeEffect('r11',0)).mul(challengeEffect('1-2')).mul(upgradeEffect('bmlt2')) },
        get base() {
            let b = player.mass.add(10).log10().root(hasUpgrade('r12') ? 1 : 2).mul(rankEffect(1,4)).mul(rankEffect(0,7))
            return b
        },
        effect(a) {
            let x = this.base.pow(a)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'r2': {
        qol: true,
        max: 1,

        unl: ()=>player.rage.unlocked,
        get description() { return `自动升级质量升级，无需消耗任何资源。` },

        curr: "rage",
        cost: a => 1e6,
    },
    'r3': {
        max: 1,

        unl: ()=>player.rage.unlocked,
        get description() { return `未使用的狂怒能量以降低的速率增加 <b>m3</b> 升级的基础。` },

        curr: "rage",
        cost: a => 1e10,

        effect(a) {
            let x = player.rage.powers.add(10).log10().log10().div(10)
            if (hasUpgrade('bh10')) x = x.max(expPow(player.rage.powers.add(1).log10(),0.5).div(15));
            if (hasUpgrade('r6')) x = x.mul(3);
            return x
        },
        effDesc: x => "+"+format(x,4),
    },
    'r4': {
        qol: true,
        max: 1,

        unl: ()=>player.rage.unlocked,
        get description() { return `自动更新阶层。` },

        curr: "rage",
        cost: a => 1e12,
    },
    'r5': {
        max: 1,

        unl: ()=>player.rage.unlocked,
        get description() { return `<b>r1</b> 升级以降低的速率增加 <b>m1-3</b> 升级的奖励。` },

        curr: "rage",
        cost: a => 1e15,

        effect(a) {
            let x = player.upgrades.r1.add(1).log(4).pow(2).div(1.5)
            return x
        },
        effDesc: x => "+"+format(x),
    },
    'r6': {
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `<b>r3</b> 升级效果增强 <b>三倍</b>。` },

        curr: "rage",
        cost: a => 1e21,
    },
    'r7': {
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `普通质量以 <b>r1</b> 的基础增加 <b>m4</b> 升级的基础。` },

        curr: "rage",
        cost: a => 1e30,

        effect(a) {
            let x = player.mass.add(1).log10().root(3)
            return x
        },
        effDesc: x => "+"+format(x),
    },
    'r8': {
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `改进狂怒能量基础的公式。` },

        curr: "rage",
        cost: a => 1e42,
    },
    'r9': {
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `<b>m4</b> 升级影响级别需求。` },

        curr: "rage",
        cost: a => 1e72,
    },
    'r10': {
        max: 1,

        unl: ()=>player.bh.unlocked,
        get description() { return `黑洞被未使用的狂怒能量增强。` },

        curr: "rage",
        cost: a => 1e120,

        effect(a) {
            let x = expPow(player.rage.powers,0.5).pow(2)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'r11': {
        max: 1,

        unl: ()=>player.mlt.unlocked,
        get description() { return `<b>m1-4</b> 和 <b>r1</b> 升级基于你的狂怒能量增强。` },

        curr: "rage",
        cost: a => '1e600',

        effect(a) {
            let x = player.rage.powers.add(10).log10().log10().pow(2).div(25)
            return x
        },
        effDesc: x => "+"+formatPercent(x),
    },
    'r12': {
        max: 1,

        unl: ()=>player.mlt.unlocked,
        get description() { return `改进普通质量对 <b>r1</b> 升级基础的加成。` },

        curr: "rage",
        cost: a => '1e900',
    },
    'r13': {
        max: 1,

        unl: ()=>player.mlt.unlocked,
        get description() { return `狂怒能量提升多元宇宙能量生成。` },

        curr: "rage",
        cost: a => 'e1000',

        effect(a) {
            let x = player.rage.powers.add(10).log10()
            return x
        },
        effDesc: x => formatMult(x),
    },
    'r14': {
        max: 1,

        unl: ()=>player.mlt.unlocked,
        get description() { return `黑洞质量增加 <b>m4</b> 升级的基础。` },

        curr: "rage",
        cost: a => 'e25000',

        effect(a) {
            let x = player.bh.mass.add(10).log10().root(3)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'r15': {
        max: 1,

        unl: ()=>player.mlt.unlocked,
        get description() { return `反黑洞质量增加 <b>m4</b> 升级的基础。` },

        curr: "rage",
        cost: a => 'e1e6',

        effect(a) {
            let x = player.bh.anti_mass.add(10).log10().root(2)
            return x
        },
        effDesc: x => formatMult(x),
    },

    ...BH_UPGRADES,
    ...MLT_UPGRADES,
    ...EXMASS_UPGRADES,
}

export const UPG_KEYS = Object.keys(UPGRADES)

export const UPG_GROUPS = {
    'mass': ['m1','m2','m3','m4','m5','m6'],
    'rage': ['r1','r2','r3','r4','r5','r6','r7','r8','r9','r10','r11','r12','r13','r14','r15'],
    'bh': ['bh1','bh2','bh3','bh4','bh5','bh6','bh7','bh8','bh9','bh10','bh11','bh12','bh13','bh14','bh15'],
    'mlt': ['mlt1','mlt2','mlt3','mlt4','mlt5','mlt6','mlt7','mlt8','mlt9','mlt10','mlt11','mlt12','mlt13','mlt14','mlt15'],
    'break_mlt': ['bmlt1','bmlt2','bmlt3','bmlt4','bmlt5','bmlt6','bmlt7','bmlt8','bmlt9','bmlt10','bmlt11'],
    'exmass': ['exm1','exm2','exm3','exm4','exm5'],
}

export const AUTO_UPG_GROUPS = {
    'mass': () => hasUpgrade('r2'),
    'rage': () => hasUpgrade('bh5'),
    'bh': () => player.mlt.times.gte(4),
    'mlt': () => player.mlt.times.gte(31),
}