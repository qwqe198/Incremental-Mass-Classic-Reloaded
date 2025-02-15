import { formatMult, formatPercent } from "./format"

export const ACHIEVEMENTS = {
    11: {
        title: `必须想象西西弗斯是快乐的`,
        get description() { return `进行<b>级别</b>重置。` },
        condition: ()=>player.ranks[0].gte(1),
    },
    12: {
        title: `一千万力量！！！`,
        get description() { return `达到<b>${formatMass(1e7)}</b>普通质量。` },
        condition: ()=>player.mass.gte(1e7),
    },
    13: {
        title: `谁把这只狗放进油炸锅了？`,
        get description() { return `执行<b>狂怒</b>。` },
        get reward() { return `推动<b>${formatMult(3)}</b>更多的普通质量。` },
    },
    14: {
        title: `升级的西西弗斯`,
        get description() { return `进行<b>阶层</b>重置。` },
        condition: ()=>player.ranks[1].gte(1),
    },
    15: {
        title: `没有升级是迷茫的`,
        get description() { return `在不购买任何质量升级的情况下达到<b>级别 10</b>。` },
        condition: ()=>player.ranks[0].gte(10) && !UPG_GROUPS.mass.find(x => hasUpgrade(x)),
    },
    16: {
        title: `没有软上限？这不是个好主意`,
        get description() { return `获得第三个质量升级效果的<b>${formatPow(10)}</b>。` },
        get reward() { return `第三个质量升级效果增强<b>10%</b>。` },
        condition: ()=>Decimal.gte(upgradeEffect('m3'),10),
    },

    21: {
        title: `黑色恐惧症`,
        get description() { return `执行<b>黑洞</b>。` },
    },
    22: {
        title: `推动宇宙出错了`,
        get description() { return `达到<b>${formatMass(1.5e56)}</b>普通质量。` },
        condition: ()=>player.mass.gte(1.5e56),
    },
    23: {
        title: `小咆哮`,
        get description() { return `购买<b>bh6</b>升级。` },
        condition: ()=>hasUpgrade('bh6'),
    },
    24: {
        title: `我没有吝啬地吃`,
        get description() { return `在不购买第四个质量升级的情况下达到<b>${formatMass('1.5e806')}</b>普通质量。` },
        get reward() { return `第四个质量升级以较低速率（10<sup>lg(x)<sup>${format(1/3,4)}</sup></sup>）应用于<b>r1</b>升级。` },
        effect: [()=>expPow(Decimal.max(upgradeEffect('m4'),1),hasUpgrade('mlt14') ? 0.5 : 1/3),x=>formatMult(x.pow(-1))],
        condition: ()=>!hasUpgrade('m4') && player.mass.gte('1.5e806'),
    },
    25: {
        title: `不再有侵略！`,
        get description() { return `在不购买任何非QoL狂怒升级的情况下执行<b>黑洞</b>。` },
    },
    26: {
        title: `推动黑洞-`,
        get description() { return `达到<b>${formatMass(1.5e56)}</b>黑洞质量。` },
        get reward() { return `黑洞效果增强<b>10%</b>。` },
        effect: [()=>1.1],
        condition: ()=>player.bh.mass.gte(1.5e56),
    },
    
    31: {
        title: `上限`,
        get description() { return `达到<b>${formatMass('1.5e1056')}</b>普通质量。` },
        condition: ()=>player.mass.gte('1.5e1056'),
    },
    32: {
        title: `新一代`,
        get description() { return `达到第一个<b>多元宇宙</b>。` },
        condition: ()=>player.mlt.times.gte(1),
    },
    33: {
        title: `四面体`,
        get description() { return `进行<b>四重阶层</b>重置。` },
        condition: ()=>player.ranks[2].gte(1),
    },
    34: {
        title: `没有折算？该死的`,
        get description() { return `达到<b>级别 256</b>。` },
        get reward() { return `获得<b>${formatMult(1.1)}</b>更多的级别。` },
        effect: [()=>1.1],
        condition: ()=>player.ranks[0].gte(256),
    },
    35: {
        title: `比caseoh重一古戈尔倍`,
        get description() { return `使普通质量每秒比当前普通质量多<b>一古戈尔</b>倍（<b>${formatMult(1e100)}</b>）。` },
    },
    36: {
        title: `推动反黑洞`,
        get description() { return `达到<b>${formatMass(1.5e56)}</b>反黑洞质量。` },
        get reward() { return `反黑洞效果增强<b>10%</b>。` },
        effect: [()=>1.1],
        condition: ()=>player.bh.anti_mass.gte(1.5e56),
    },

    41: {
        title: `想象牛顿睡在椰子树下`,
        get description() { return `达到多元宇宙<b>#6</b>。` },
        condition: ()=>player.mlt.times.gte(6),
    },
    42: {
        title: `痛苦计量器`,
        get description() { return `获得<b>${formatPercent(10)}</b>的<b>r1</b>升级效果。` },
        condition: ()=>UPGRADES.r1.strength.gte(10),
    },
    43: {
        title: `等待模拟器`,
        get description() { return `玩游戏<b>2小时</b>。` },
        condition: ()=>player.time>=7200,
        get reward() { return `总游戏时间以对数速率获得多元宇宙能量生成的倍数。` },
        effect: [()=>Decimal.log10(player.time+1),formatMult],
    },
    44: {
        title: `我告诉过你不要打球`,
        get description() { return `首次完成任何挑战。` },
        get reward() { return `第三个质量升级基于总挑战完成次数变得更强。` },
        effect: [()=>{
            let x = DC.D1
            for (let id in CHALLENGES) x = x.mul(player.chal.completions[id].add(1).log(10).div(60).add(1))
            return x
        },x=>formatPercent(x.sub(1))+' 更强'],
    },
    45: {
        title: `没有狂怒升级会更好`,
        get description() { return `在<b>β</b>挑战中不购买<b>r1</b>升级的情况下达到<b>${formatMass('1.5e100056')}</b>普通质量。` },
        condition: ()=>insideChallenge('1-2') && !hasUpgrade('r1') && player.mass.gte('1.5e100056'),
    },
    46: {
        title: `超过9000`,
        get description() { return `获得第三个质量升级效果的<b>${formatPow(9000)}</b>。` },
        condition: ()=>Decimal.gte(upgradeEffect('m3'),9000),
    },
    
    51: {
        title: `别再跟我提通货膨胀了`,
        get description() { return `达到<b>${formatMass('1.5e1000056')}</b>普通质量。` },
        condition: ()=>player.mass.gte('1.5e1000056'),
    },
    52: {
        title: `总有老一代`,
        get description() { return `达到多元宇宙<b>#12</b>。` },
        condition: ()=>player.mlt.times.gte(12),
    },
    53: {
        title: `“我在没有升级的情况下节省”`,
        get description() { return `退出<b>ε</b>挑战，在不购买质量和非QoL狂怒及黑洞升级的情况下达到<b>${formatMass('1.5e4056')}</b>普通质量。` },
        get reward() { return `<b>mlt1-2</b>升级增强<b>10%</b>。` },
        effect: [()=>1.1],
    },
    54: {
        title: `超大质量黑洞`,
        get description() { return `达到<b>${formatMass('1.5e1000056')}</b>黑洞质量。` },
        condition: ()=>player.bh.mass.gte('1.5e1000056'),
    },
    55: {
        title: `兄弟，你在这里做什么？`,
        get description() { return `进入一个需要进入别的挑战的挑战。` },
    },
    56: {
        title: `完成者`,
        get description() { return `获得<b>${format(1e3,0)}</b>总挑战完成次数。` },
        get reward() { return `L1 & L2挑战增强<b>1%</b>。` },
        effect: [()=>hasAchievement(65) ? 1.1 : 1.01],
        condition: ()=>{
            let x = DC.D0
            for (let id in CHALLENGES) x = x.add(player.chal.completions[id]);
            return x.gte(1e3)
        },
    },

    61: {
        title: `一拳超人：多元宇宙破坏者`,
        get description() { return `打破多元宇宙，达到<b>${formatMass(mlt(1))}</b>普通质量。` },
        get reward() { return `多元宇宙能量生成增强<b>10%</b>。` },
        effect: [()=>1.1],
    },
    62: {
        title: `这个西西弗斯永远不会结束`,
        get description() { return `进行<b>五重阶层</b>重置。` },
        condition: ()=>player.ranks[3].gte(1),
    },
    63: {
        title: `超级黑`,
        get description() { return `达到<b>${formatMass(mlt(1))}</b>黑洞质量。` },
        condition: ()=>player.bh.mass.gte(mlt(1)),
    },
    64: {
        title: `你在获得更多奖章吗？`,
        get description() { return `达到<b>级别 ${format(1e5,0)}</b>。` },
        condition: ()=>player.ranks[0].gte(1e5),
    },
    65: {
        title: `大家好，我是Markiplier，欢迎来到《玩具熊的五夜后宫》，这是一款你们大家强烈推荐的独立恐怖游戏，我看到Yamimash玩过，他说这游戏真的非常棒...所以我非常期待看看是怎么回事。那是一只可怕的机械熊！“家庭披萨店正在寻找夜班保安。”哦...凌晨12点。第一晚。如果我不想待第一晚，为什么我还要待超过...五...为什么我还要待超过两...你好？好吧...`,
        get description() { return `在<b>γ</b>、<b>ε</b>和<b>ν</b>挑战中不购买<b>m1</b>升级的情况下达到<b>${formatMass('1.5e1000056')}</b>普通质量。` },
        get reward() { return `L3挑战增强<b>10%</b>。<b>十倍</b>“完成者”成就的奖励。` },
        effect: [()=>1.1],
        condition: ()=>insideChallenge('1-3') && insideChallenge('2-1') && insideChallenge('3-4') && !hasUpgrade('m1') && player.mass.gte('1.5e1000056'),
    },
    66: {
        title: `为什么我不能拥有所有这些多元宇宙`,
        get description() { return `达到<b>${formatMass('ee24')}</b>普通质量。` },
        condition: ()=>player.mass.gte('ee24'),
    },

    71: {
        title: `你看到怀旧的东西了吗？`,
        get description() { return `达到多元宇宙<b>#50</b>。` },
        condition: ()=>player.mlt.times.gte(50),
    },
    72: {
        title: `受《声望树》启发？？？`,
        get description() { return `进行<b>转生级别</b>重置。` },
        condition: ()=>player.prestiges[0].gte(1),
    },
    73: {
        title: `提到Gigachad！`,
        get description() { return `达到<b>${formatMass('ee39')}</b>普通质量。` },
        condition: ()=>player.mass.gte('ee39'),
    },
    74: {
        title: `荣耀`,
        get description() { return `进行<b>荣耀</b>重置。` },
        get reward() { return `多元宇宙碎片生成增强<b>10%</b>。` },
        effect: [()=>1.1],
        condition: ()=>player.prestiges[1].gte(1),
    },
    75: {
        title: `别担心，这只是小菜一碟`,
        get description() { return `获得<b>${format(100,0)}</b>每个L3挑战的完成次数。` },
        get reward() { return `L3挑战基于多元宇宙变得更强。` },
        effect: [()=>player.mlt.times.add(10).log10().sqrt(),x=>formatPercent(x.sub(1))+' 更强'],
        condition: ()=>{
            for (let x = 1; x <= CHALLENGES_MAP[3].length; x++) if (player.chal.completions['3-'+x].lt(100)) return false;
            return true
        },
    },
    76: {
        title: `兄弟与现实脱节了`,
        get description() { return `达到<b>级别 ${format(1e6,0)}</b>。` },
        condition: ()=>player.ranks[0].gte(1e6),
    },
}

export const ACHIEVEMENTS_KEYS = Object.keys(ACHIEVEMENTS).map(x=>parseInt(x))
export const ACHIEVEMENTS_VISIBLE = (()=>{
    let a = {}
    for (let i of ACHIEVEMENTS_KEYS) a[i] = ACHIEVEMENTS[i] !== null;
    return a
})()

export const MAX_ACHIEVEMENT_ROWS = Math.ceil((ACHIEVEMENTS.length - 1) / 6)

export function getAchievementTooltip(id) {
    const ach = ACHIEVEMENTS[id]
    var h = ""

    h += `<h4>${ach.title}</h4>`
    h += `<br class='sub-line'>${ach.description}`

    if ("reward" in ach) h += `<br class='sub-line'><i><b>奖励：</b> ${ach.reward}</i>`;
    if ("effect" in ach && ach.effect?.[1]) h += `<br class='sub-line'><i><b>效果：</b> ${ach.effect[1](temp.achievement_effects[id])}</i>`;

    return h
}

export function checkAchievements() {
    for (let i of ACHIEVEMENTS_KEYS) if (ACHIEVEMENTS_VISIBLE[i] && !player.achievements.includes(i) && ACHIEVEMENTS[i].condition?.()) giveAchievement(i);
}
export function giveAchievement(id) {
    if (!player.achievements.includes(id)) {
        player.achievements.push(id);
        addNotify(`<b>成就解锁：</b> ${ACHIEVEMENTS[id].title}`);
    }
}

export function hasAchievement(id) { return player.achievements.includes(id) }
export function simpleAchievementEffect(id,def=1) { return hasAchievement(id) ? temp.achievement_effects[id] ?? def : def }

createTempUpdate("updateAchievementsTemp", ()=>{
    for (let [id,a] of Object.entries(ACHIEVEMENTS)) if (a) {
        id = parseInt(id)
        if ('effect' in a) temp.achievement_effects[id] = a.effect[0]();
    }
})