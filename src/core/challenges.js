import { format, formatMass, formatPercent } from "./format"

export const CHAL_RESOURCES = {
    placeholder: {
        name: "",
        get amount() { return DC.D0 },
        format: format,
    },
    mass: {
        name: "普通质量",
        get amount() { return player.mass },
        format: formatMass,
    },
    bh: {
        name: "黑洞质量",
        get amount() { return player.bh.mass },
        format: formatMass,
    },
    L1: {
        name: "L1挑战总完成次数",
        get amount() {
            let x = DC.D0
            for (let id of CHALLENGES_MAP[1]) x = x.add(player.chal.completions[id]);
            return x
        },
        format: x=>format(x,0),
    },
}

export const CHALLENGES = {
    '1-1': {
        name: "阿尔法",
        symbol: "α",
        layer: 1,

        get desc() { return `级别提升速度加快 <b>${formatMult(3)}</b>。` },

        res: "mass",
        goal: a => a.pow_base(1.02).mul(25000).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(25000).log(1.02).add(1).floor(),

        get strength() { return Decimal.mul(challengeEffect('2-5'),simpleAchievementEffect(56)).mul(simpleUpgradeBoost('bmlt4',temp.break_mlt_effect[0])).mul(challengeEffect('3-6')) },
        effect(c) {
            let x = c.mul(.01).add(1)
            return x
        },
        reward: x => `<b>m1-4</b> 升级效果增强 <b>${formatPercent(x.sub(1))}</b>。`,
    },
    '1-2': {
        name: "贝塔",
        symbol: "β",
        layer: 1,

        get desc() { return `无法购买任何质量升级。` },

        res: "mass",
        goal: a => a.pow_base(1.02).mul(25000).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(25000).log(1.02).add(1).floor(),

        get strength() { return Decimal.mul(challengeEffect('2-5'),simpleAchievementEffect(56)).mul(simpleUpgradeBoost('bmlt4',temp.break_mlt_effect[0])).mul(challengeEffect('3-6')) },
        effect(c) {
            let x = c.mul(.01).add(1).pow(2)
            return x
        },
        reward: x => `<b>r1</b> 升级效果增强 <b>${formatPercent(x.sub(1))}</b>。`,
    },
    '1-3': {
        name: "伽马",
        symbol: "γ",
        layer: 1,

        get desc() { return `普通质量的指数减少到 <b>^0.1</b>。` },

        res: "mass",
        goal: a => a.pow_base(1.05).mul(4000).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(4000).log(1.05).add(1).floor(),

        get strength() { return Decimal.mul(challengeEffect('2-5'),simpleAchievementEffect(56)).mul(simpleUpgradeBoost('bmlt4',temp.break_mlt_effect[0])).mul(challengeEffect('3-6')) },
        effect(c) {
            let x = c.div(50).add(1).root(2)
            return x
        },
        reward: x => `普通质量提升 <b>${formatPow(x,4)}</b>。`,
    },
    '1-4': {
        name: "德尔塔",
        symbol: "δ",
        layer: 1,

        get desc() { return `狂怒能量的指数减少到 <b>^0.1</b>。` },

        res: "mass",
        goal: a => a.pow_base(1.05).mul(40000).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(40000).log(1.05).add(1).floor(),

        get strength() { return Decimal.mul(challengeEffect('2-5'),simpleAchievementEffect(56)).mul(simpleUpgradeBoost('bmlt4',temp.break_mlt_effect[0])).mul(challengeEffect('3-6')) },
        effect(c) {
            let x = c.div(50).add(1).root(2)
            return x
        },
        reward: x => `狂怒能量提升 <b>${formatPow(x,4)}</b>。`,
    },

    '2-1': {
        name: "伊普西隆",
        symbol: "ε",
        layer: 2,

        get desc() { return `无法提升级别。` },

        res: "mass",
        goal: a => a.pow_base(1.1).mul(1e5).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(1e5).log(1.1).add(1).floor(),

        get strength() { return Decimal.mul(challengeEffect('3-6'),simpleAchievementEffect(56)) },
        effect(c) {
            let x = c.div(5).add(1).root(2)
            return x
        },
        reward: x => `级别价格提升速度减慢 <b>${formatMult(x,4)}</b>。`,
    },
    '2-2': {
        name: "泽塔",
        symbol: "ζ",
        layer: 2,

        get desc() { return `无法购买任何狂怒升级。` },

        res: "mass",
        goal: a => a.pow_base(1.05).mul(5e5).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(5e5).log(1.05).add(1).floor(),

        get strength() { return Decimal.mul(challengeEffect('3-6'),simpleAchievementEffect(56)) },
        effect(c) {
            let x = c.mul(.01).add(1).pow(2)
            return x
        },
        reward: x => `<b>bh1</b> 升级效果增强 <b>${formatPercent(x.sub(1))}</b>。`,
    },
    '2-3': {
        name: "伊塔",
        symbol: "η",
        layer: 2,

        get desc() { return `无法获得狂怒能量。你将根据狂怒能量的指数从普通质量中获得暗物质。` },

        res: "mass",
        goal: a => a.pow_base(1.05).mul(5e5).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(5e5).log(1.05).add(1).floor(),

        get strength() { return Decimal.mul(challengeEffect('3-6'),simpleAchievementEffect(56)) },
        effect(c) {
            if (c.eq(0)) return DC.D0;
            let x = c.add(2).slog(2).pow(3).sub(1).div(500)
            return x
        },
        reward: x => `增加狂怒能量基础的指数 <b>+${format(x,4)}</b>。`,
    },
    '2-4': {
        name: "西塔",
        symbol: "θ",
        layer: 2,

        get desc() { return `所有黑洞资源的指数减少到 <b>^0.1</b>。` },

        res: "bh",
        goal: a => a.pow_base(1.05).mul(400).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(400).log(1.05).add(1).floor(),

        get strength() { return Decimal.mul(challengeEffect('3-6'),simpleAchievementEffect(56)) },
        effect(c) {
            let x = c.div(50).add(1).root(2)
            return x
        },
        reward: x => `所有黑洞资源提升 <b>${formatPow(x,4)}</b>。`,
    },
    '2-5': {
        name: "约塔",
        symbol: "ι",
        layer: 2,
        trap: ['1-1','1-2','1-3','1-4'],

        get desc() { return `第一层挑战将被激活/困住一次。<br><i>注意：被困住的挑战可以<b>自动</b>完成，直到你完成的最佳次数。</i>` },

        res: "mass",
        goal: a => a.scale(25,75,"DA").pow_base(1.1).mul(DC.LOG10_MAX_VALUE).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(DC.LOG10_MAX_VALUE).log(1.1).add(1).scale(25,75,"DA",true).floor(),

        get strength() { return Decimal.mul(challengeEffect('3-6'),simpleAchievementEffect(56)) },
        effect(c) {
            let x = c.div(10).add(1).root(2)
            return x
        },
        reward: x => `第一层挑战的奖励增强 <b>${formatPercent(x.sub(1))}</b>。`,
    },

    '3-1': {
        name: "卡帕",
        symbol: "κ",
        layer: 3,

        get desc() { return `普通质量和黑洞的指数减少到 <b>^0.5</b>。` },

        res: "mass",
        goal: a => a.pow_base(1.5).mul(1e5).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(1e5).log(1.5).add(1).floor(),

        get strength() { return Decimal.mul(simpleAchievementEffect(65),simpleAchievementEffect(75)) },
        effect(c) {
            let x = c.mul(.3).add(1).root(3)
            return x
        },
        reward: x => `<b>mlt1</b> 和 <b>bmlt1</b> 升级的基础增加 <b>${formatMult(x,4)}</b>。`,
    },
    '3-2': {
        name: "兰姆达",
        symbol: "λ",
        layer: 3,
        trap: ['1-2','2-2'],

        get desc() { return `无法购买任何黑洞升级。<b>β</b> 和 <b>ζ</b> 挑战将被激活一次。此外，普通质量和黑洞的指数减少到 <b>^0.75</b>。` },

        res: "mass",
        goal: a => a.pow_base(1.5).mul(1e6).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(1e6).log(1.5).add(1).floor(),

        get strength() { return Decimal.mul(simpleAchievementEffect(65),simpleAchievementEffect(75)) },
        effect(c) {
            let x = c.mul(.3).add(1).root(3)
            return x
        },
        reward: x => `<b>m3</b> 和 <b>m5</b> 升级的基础增加 <b>${formatMult(x,4)}</b>。`,
    },
    '3-3': {
        name: "缪",
        symbol: "μ",
        layer: 3,
        trap: ['1-3','1-4','2-4'],
        
        get desc() { return `<b>γ</b>、<b>δ</b> 和 <b>θ</b> 挑战将被激活一次，且它们的削弱效果加倍。` },

        res: "mass",
        goal: a => a.pow_base(1.5).mul(1e7).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(1e7).log(1.5).add(1).floor(),

        get strength() { return Decimal.mul(simpleAchievementEffect(65),simpleAchievementEffect(75)) },
        effect(c) {
            let x = c.mul(.3).add(1).root(3)
            return x
        },
        reward: x => `<b>bh2</b> 升级效果增强 <b>${formatPercent(x.sub(1))}</b>。`,
    },
    '3-4': {
        name: "纽",
        symbol: "ν",
        layer: 3,
        trap: ['2-3'],

        get desc() { return `所有黑洞资源无法获得或生成。<b>η</b> 挑战也将被激活。此外，普通质量的指数减少到 <b>^0.75</b>。` },

        res: "mass",
        goal: a => a.pow_base(1.5).mul(1e6).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(1e6).log(1.5).add(1).floor(),

        get strength() { return Decimal.mul(simpleAchievementEffect(65),simpleAchievementEffect(75)) },
        effect(c) {
            if (c.eq(0)) return DC.D0;
            let x = c.add(2).slog(2).pow(3).sub(1).div(500)
            return x
        },
        reward: x => `增加黑洞和反黑洞第二个效果的指数 <b>+${format(x,4)}</b>。`,
    },
    '3-5': {
        name: "克西",
        symbol: "ξ",
        layer: 3,
        trap: ['2-1'],
        
        get desc() { return `<b>m1-4</b>、<b>r1</b> 和 <b>bh1-2</b> 升级的效果始终为 <b>1%</b>。<b>ε</b> 挑战也将被激活。` },
        
        res: "mass",
        goal: a => a.pow_base(1.5).mul(1e6).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(1e6).log(1.5).add(1).floor(),

        get strength() { return Decimal.mul(simpleAchievementEffect(65),simpleAchievementEffect(75)) },
        effect(c) {
            let x = c.mul(0.3).add(1).root(3)
            return x
        },
        reward: x => `多元宇宙能量和碎片的生成增强 <b>${formatPercent(x.sub(1))}</b>。`,
    },
    '3-6': {
        name: "奥米克戎",
        symbol: "ο",
        layer: 3,
        trap: ['1-1','1-2','1-3','1-4','2-1','2-2','2-3','2-4','2-5'],
        
        get desc() { return `第一层和第二层挑战将被激活一次。此外，普通质量和黑洞的指数减少到 <b>^0.75</b>。` },

        res: "mass",
        goal: a => a.pow_base(1.5).mul(1e10).pow10().mul(1.5e56),
        bulk: a => a.div(1.5e56).log10().div(1e10).log(1.5).add(1).floor(),

        get strength() { return Decimal.mul(simpleAchievementEffect(65),simpleAchievementEffect(75)) },
        effect(c) {
            let x = c.div(15).add(1).root(3)
            return x
        },
        reward: x => `第一层和第二层挑战的奖励增强 <b>${formatPercent(x.sub(1))}</b>。`,
    },
}

export const CHALLENGES_MAP = [
    null,
    ['1-1','1-2','1-3','1-4'],
    ['2-1','2-2','2-3','2-4','2-5'],
    ['3-1','3-2','3-3','3-4','3-5','3-6'],
]
export const CHALLENGE_LAYERS = CHALLENGES_MAP.length-1

export const SET_BEST_CHAL = [
    null,
    () => player.mlt.times.gte(20),
    () => player.mlt.times.gte(60),
]
export const AUTO_CHAL = [
    null,
    () => player.mlt.times.gte(24),
]

export function getActiveChallenge(layer) {
    for (let C of CHALLENGES_MAP[layer]) if (player.chal.active[C]) return C;
    return null;
}

export function insideChallenge(id) { return temp.trapped_chal[id] || player.chal.active[id] }

export function checkIsChallengeOutside() {
    for (let C in CHALLENGES) if (insideChallenge(C)) return false;
    return true;
}

export function enterChallenge(c) {
    const C = CHALLENGES[c]
    let active = getActiveChallenge(C.layer)

    if (active) {
        const CA = CHALLENGES[active], CRA = CHAL_RESOURCES[CA.res]

        player.chal.active[active] = false

        if (CRA.amount.gte(CA.goal(player.chal.completions[active]))) {
            player.chal.best[active] = player.chal.best[active].max(player.chal.completions[active] = player.chal.completions[active].add(1).max(CA.bulk(CRA.amount)));
            giveAchievement(44)
        }

        if (active === "2-1" && !hasNonQoLUpgradesByGroup('mass') && !hasNonQoLUpgradesByGroup('rage') && !hasNonQoLUpgradesByGroup('bh') && player.mass.gte('1.5e4056')) giveAchievement(53);
    }

    for (let l = 1; l < C.layer; l++) {
        let a = getActiveChallenge(l)
        if (a) player.chal.active[a] = false;
    }

    if (getChallengeLayersUnlocked() >= C.layer) {
        if (active !== c) {
            player.chal.active[c] = true
        }
    
        switch (C.layer) {
            case 1: {
                RESETS['dark-matter'].doReset()
                break
            }
            case 2: {
                RESETS.multiverse.doReset(true)
                break
            }
            case 3: {
                resetChallengeLayers(2)
                resetUpgradesByGroup('mlt')
                player.mlt.energy = DC.D0, player.mlt.total_energy = DC.D0
                RESETS.multiverse.doReset(true)
                break
            }
        }

        if (temp.trapped_chal[c]) giveAchievement(55);
    }

    if (checkIsChallengeOutside()) for (let l = 1; l <= CHALLENGE_LAYERS; l++) if (SET_BEST_CHAL[l]?.()) for (let C of CHALLENGES_MAP[l]) player.chal.completions[C] = E(player.chal.best[C]);
}

export function getChallengeLayersUnlocked() {
    return 1+player.mlt.times.gte(11)+player.mlt.times.gte(31)
}
export function challengeEffect(id,def=1) { return temp.chal_effect[id] ?? def }
export function resetChallengeLayers(layer) { for (let l = 1; l <= layer; l++) for (let C of CHALLENGES_MAP[l]) player.chal.completions[C] = DC.D0; }

createTempUpdate("updateChallengesTemp", ()=>{
    for (let id in CHALLENGES) {
        const C = CHALLENGES[id]

        var lvl = player.chal.completions[id], str = C.strength ?? 1

        if ('effect' in C) temp.chal_effect[id] = C.effect(lvl.mul(str));
    }
})