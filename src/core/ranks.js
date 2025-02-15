import { DC } from "./decimal"
import { updateTemp } from "./temp"

export const RANKS = [
    {
        name: "级别",
        unl: () => true,
        auto: () => player.first_ranks[1],

        get fp() { return Decimal.mul(simpleAchievementEffect(34),temp.ranks_fp).mul(challengeEffect('2-1')) },

        require(a) { return insideChallenge('2-1') ? EINF : a.div(this.fp).sumBase(1.01).pow(1.5).add(1).pow_base(player.ranks[1].gte(1) ? 8 : 10).div(hasUpgrade('r9')?upgradeEffect('m4'):1).max(1).root(player.ranks[3].gte(2) ? upgradeEffect('m5') : 1) },
        bulk(a) { return insideChallenge('2-1') ? DC.D0 : a.pow(player.ranks[3].gte(2) ? upgradeEffect('m5') : 1).mul(hasUpgrade('r9')?upgradeEffect('m4'):1).log(player.ranks[1].gte(1) ? 8 : 10).sub(1).root(1.5).sumBase(1.01,true).mul(this.fp).floor().add(1) },

        rewards: {
            "1": [
                `解锁第一个质量升级。`
            ],
            "2": [
                `解锁第二个质量升级。减少第一个质量升级的折算。`
            ],
            "3": [
                `解锁第三个质量升级。减少第二个质量升级的折算。第一个质量升级会增强自身。`
            ],
            "4": [
                `减少第三个质量升级的折算。级别提升普通质量。`,
                ()=>player.ranks[0].sub(2).pow(player.ranks[0].gte(17) ? player.ranks[0].root(player.ranks[1].gte(19) ? 1 : 3) : 2), 1, x=>formatMult(x),
            ],
            "5": [
                `第二个质量升级会增强自身。`
            ],
            "17": [ // 5
                `增强 <b>级别 4</b> 的效果。`,
            ],
            "32": [
                `第三个质量升级的基础增加 <b>+10%</b>（加法）。`
            ],
            "44": [
                `每 <b>级别</b> 增加 <b>r1</b> 升级的基础 <b>+1%</b>。`,
                ()=>player.ranks[0].mul(.01).add(1).pow(player.ranks[1].gte(10)?3:1), 1, x=>formatMult(x),
            ],
            "57": [
                `每 <b>级别</b> 增加获得的狂怒能量 <b>+10%</b>（复利）。`,
                ()=>player.ranks[0].pow_base(1.1).pow(player.ranks[0].gte(107)?rankEffect(1,5):1), 1, x=>formatMult(x),
            ],
            "107": [
                `<b>阶层 7</b> 影响 <b>级别 57</b> 的效果。`,
            ],
            "150": [ // 10
                `普通质量的指数每 <b>级别<sup>0.75</sup></b> 增加 <b>+1%</b>，从 150 开始。`,
                ()=>player.ranks[0].sub(149).max(0).pow(0.75).mul(.01).add(1), 1, x=>formatPow(x,4),
            ],
            "230": [
                `每 <b>级别<sup>0.75</sup></b> 增加多元宇宙能量生成 <b>+10%</b>（复利）。`,
                ()=>player.ranks[0].max(0).pow(0.75).pow_base(1.1), 1, x=>formatMult(x),
            ],
            "350": [
                `<b>级别 150</b> 影响狂怒能量。`,
            ],
        },
    },{
        name: "阶层",
        unl: () => player.first_ranks[0],
        auto: () => hasUpgrade('r4'),

        get fp() { return temp.ranks_fp },
        
        require(a) { return a.div(this.fp).add(2).pow(player.ranks[2].gte(1) ? 1.8 : 2).round() },
        bulk(a) { return a.root(player.ranks[2].gte(1) ? 1.8 : 2).sub(2).mul(this.fp).add(1).floor() },

        rewards: {
            "1": [
                `减少级别需求。自动更新级别。`
            ],
            "2": [
                `普通质量提升至 <b>1.15</b> 次方。`
            ],
            "3": [
                `进一步减少第三个质量升级的折算。`
            ],
            "4": [
                `每 <b>阶层</b> 获得的狂怒能量 <b>三倍</b>。`,
                ()=>player.ranks[1].pow_base(3).pow(rankEffect(1,5)), 1, x=>formatMult(x),
            ],
            "5": [
                `每 <b>阶层</b> 增加 <b>r1</b> 升级的基础 <b>+10%</b>。`,
                ()=>player.ranks[1].mul(.1).add(1).pow(player.ranks[1].gte(10)?3:1), 1, x=>formatMult(x),
            ],
            "7": [ // 5
                `未使用的暗物质以降低的速率增强 <b>阶层 4</b> 的效果。`,
                ()=>expPow(player.bh.dm.add(10).log10(),0.5), 1, x=>formatPow(x),
            ],
            "10": [
                `增强 <b>级别 44</b> 和 <b>阶层 5</b> 的效果。`,
            ],
            "19": [
                `显著增强 <b>级别 4</b> 的效果。`,
            ],
        },
    },{
        name: "四重阶层",
        unl: () => player.mlt.times.gte(2),
        auto: () => player.mlt.times.gte(3),

        get fp() { return temp.ranks_fp },

        require(a) { return a.div(this.fp).add(4).pow(1.6).round() },
        bulk(a) { return a.root(1.6).sub(4).mul(this.fp).add(1).floor() },

        rewards: {
            "1": [
                `减少阶层需求。`
            ],
            "2": [
                `第三个质量升级会增强自身。`
            ],
            "3": [
                `<b>r1</b> 升级效果增强 <b>15%</b>。`,
                ()=>1.15,1
            ],
            "5": [
                `每 <b>四重阶层</b> 增加 <b>m1-4</b> 升级的效果 <b>+5%</b>（加法）。`,
                ()=>player.ranks[2].div(20),DC.D0,x=>"+"+formatPercent(x)
            ],
        },
    },{
        name: "五重阶层",
        unl: () => player.mlt.times.gte(20),
        auto: () => player.mlt.times.gte(20),

        get fp() { return temp.ranks_fp },

        require(a) { return a.div(this.fp).add(5).pow(1.7).round() },
        bulk(a) { return a.root(1.7).sub(5).mul(this.fp).add(1).floor() },

        rewards: {
            "1": [
                `解锁第五个质量升级。`
            ],
            "2": [
                `第五个质量升级正常影响 <b>级别</b> 需求。`
            ],
            "3": [
                `<b>x10</b> 到第三个质量升级的基础。第五个质量升级影响 <b>r1</b> 升级。`
            ],
            "5": [
                `解锁第六个质量升级。`
            ],
        },
    },
]

export const RANKS_LEN = RANKS.length

export function resetRank(id) {
    for (let i = id-1; i >= 0; i--) {
        player.ranks[i] = DC.D0
    }

    player.mass = DC.D0
    resetUpgradesByGroup('mass')

    updateTemp()
}

export function rankUp(id) {
    const R = RANKS[id]
    if (R.unl() && R.res.gte(R.require(R.amount))) {
        R.amount = R.bulk(R.res).max(R.amount.add(1))
        player.first_ranks[id] = true
        resetRank(id)
    }
}

export function rankEffect(id,i,def=1) { return temp.rank_effects[id][i] ?? def }

createTempUpdate('updateRanksTemp', ()=>{
    temp.ranks_fp = insideChallenge('1-1') ? 1/3 : 1

    for (let i = 0; i < RANKS_LEN; i++) {
        const R = RANKS[i], amount = R.amount, TR = temp.rank_effects[i], RRK = Object.keys(R.rewards);

        for (let r = 0; r < RRK.length; r++) {
            const RB = RRK[r], RR = R.rewards[RB]

            if (RR[1]) TR[r] = amount.gte(RB) ? RR[1]() : RR[2];
        }
    }
})