import { hasUpgrade, simpleUpgradeBoost, simpleUpgradeEffect, upgradeEffect } from "./upgrades";

export const CURRENCIES = {
    mass: {
        name: "普通质量",
        costName: "普通质量",

        get amount() { return player.mass },
        set amount(v) { player.mass = v.max(0) },
    
        get gain() {
            let x = DC.D1.add(upgradeEffect('m1',0)).mul(rankEffect(0,3)).mul(upgradeEffect('r1')).mul(temp.bh_effect[0])

            if (hasAchievement(13)) x = x.mul(3);

            x = x.pow(temp.mlt_effect[0]).pow(rankEffect(0,10)).pow(challengeEffect('1-3')).pow(upgradeEffect('exm2')).pow(temp.bh_effect[3] ?? 1)
            if (player.ranks[1].gte(2)) x = x.pow(1.15);
            if (insideChallenge('1-3')) x = x.pow(insideChallenge('3-3') ? .01 : .1);

            if (insideChallenge('3-1')) x = expPow(x,.5);
            if (insideChallenge('3-2')||insideChallenge('3-4')||insideChallenge('3-6')) x = expPow(x,.75);

            if (!player.mlt.broken) x = x.min(mlt(1));

            return x
        },
    },
    rage: {
        name: "狂怒能量",

        get require() { return 1e18 },
        get exponent() { return Decimal.add(hasUpgrade('r8') ? 0.55 : 0.5,challengeEffect('2-3',0)) },

        get amount() { return player.rage.powers },
        set amount(v) { player.rage.powers = v.max(0) },
    
        get gain() {
            let x = player.mass.div(this.require)

            if (x.lt(1) || insideChallenge('2-3')) return DC.D0;

            x = expPow(x,this.exponent).mul(rankEffect(1,3)).mul(rankEffect(0,8)).mul(temp.bh_effect[2]??1)

            x = x.pow(simpleUpgradeBoost('mlt8',temp.mlt_effect[0])).pow(challengeEffect('1-4'))
            if (player.ranks[0].gte(350)) x = x.pow(rankEffect(0,10));
            if (hasUpgrade('bh12')) x = x.pow(1.15);
            if (insideChallenge('1-4')) x = x.pow(insideChallenge('3-3') ? .01 : .1);

            return x
        },

        get passive() { return +hasUpgrade('bh7') },
    },
    'dark-matter': {
        name: "暗物质",

        get require() { return insideChallenge('2-3') ? 'e324' : 1e18 },

        get amount() { return player.bh.dm },
        set amount(v) { player.bh.dm = v.max(0) },
    
        get gain() {
            let x = (insideChallenge('2-3') ? player.mass : player.rage.powers).div(this.require)

            if (x.lt(1) || insideChallenge('3-4')) return DC.D0;

            let exp = 0.5
            exp = Decimal.add(exp,simpleUpgradeBoost('bmlt10',challengeEffect('2-3',0),0))
            if (insideChallenge('2-3')) exp = Decimal.mul(exp,CURRENCIES.rage.exponent);

            x = expPow(x,exp).mul(temp.abh_effect[2]??1)

            x = x.pow(challengeEffect('2-4')).pow(simpleUpgradeBoost('mlt15',temp.mlt_effect[0]))
            if (insideChallenge('2-4')) x = x.pow(insideChallenge('3-3') ? .01 : .1);

            return x
        },

        get passive() { return +player.mlt.times.gte(9) },
    },
    'black-hole': {
        name: "黑洞",
        costName: "黑洞",

        get amount() { return player.bh.mass },
        set amount(v) { player.bh.mass = v.max(0) },
    
        get gain() {
            if (!player.bh.unlocked || insideChallenge('3-4')) return DC.D0;

            let x = DC.D1.mul(upgradeEffect('bh1')).mul(temp.bh_effect[1]).mul(temp.abh_effect[0]).mul(simpleUpgradeEffect('r10'))

            x = x.pow(simpleUpgradeBoost('mlt10',temp.mlt_effect[0])).pow(challengeEffect('2-4')).pow(simpleUpgradeBoost('exm4',upgradeEffect('exm2')))
            if (insideChallenge('2-4')) x = x.pow(insideChallenge('3-3') ? .01 : .1);

            if (insideChallenge('3-1')) x = expPow(x,.5);
            if (insideChallenge('3-2')||insideChallenge('3-6')) x = expPow(x,.75);

            return x
        },
    },
    'anti-black-hole': {
        name: "反黑洞",
        costName: "反黑洞",

        get amount() { return player.bh.anti_mass },
        set amount(v) { player.bh.anti_mass = v.max(0) },
    
        get gain() {
            if (!hasUpgrade('bh8') || insideChallenge('3-4')) return DC.D0;

            let x = DC.D1.mul(temp.abh_effect[1]).mul(simpleUpgradeEffect('bh11')).mul(simpleUpgradeEffect('bh13'))

            x = x.pow(simpleUpgradeBoost('mlt12',temp.mlt_effect[0])).pow(challengeEffect('2-4'))
            if (insideChallenge('2-4')) x = x.pow(insideChallenge('3-3') ? .01 : .1);
            
            return x
        },
    },
    'mlt-energy': {
        name: "多元宇宙能量",

        get amount() { return player.mlt.energy },
        set amount(v) { player.mlt.energy = v.max(0) },

        get total() { return player.mlt.total_energy },
        set total(v) { player.mlt.total_energy = v.max(0) },
    
        get gain() {
            let m = player.mlt.times.mul(challengeEffect('3-5')).mul(simpleAchievementEffect(61))

            if (!player.mlt.unlocked || m.lt(1)) return DC.D0;

            let x = m.pow_base(m)
            if (m.gte(6)) x = x.pow(2);
            
            x = x.mul(upgradeEffect('mlt1')).mul(rankEffect(0,11)).mul(simpleUpgradeEffect('r13')).mul(simpleUpgradeEffect('bh15')).mul(simpleUpgradeEffect('mlt9')).mul(simpleUpgradeEffect('mlt13')).mul(simpleAchievementEffect(43)).mul(simpleUpgradeEffect('bmlt3'))

            return x
        },
    },
    'mlt-fragments': {
        name: "多元宇宙碎片",

        get amount() { return player.mlt.fragments },
        set amount(v) { player.mlt.fragments = v.max(0) },

        get total() { return player.mlt.total_fragments },
        set total(v) { player.mlt.total_fragments = v.max(0) },
    
        get gain() {
            if (!player.mlt.broken) return DC.D0;

            let m = player.mlt.times.sub(17).max(0).mul(simpleAchievementEffect(74)).mul(challengeEffect('3-5')).add(1)

            let x = m.pow(0.75).pow_base(m).max(1).mul(upgradeEffect('bmlt1')).mul(simpleUpgradeEffect('bmlt7'))

            return x
        },
    },
    'ex-mass': {
        name: "额外质量",
        costName: "额外质量",

        get amount() { return player.exmass },
        set amount(v) { player.exmass = v.max(0) },

        get mass_exp() { return Decimal.add(1,upgradeEffect('exm3',0)) },
        get rank_exp() { return Decimal.add(1,prestigeEffect(0,6)) },
    
        get gain() {
            if (player.mlt.times.lt(50)) return DC.D0;

            let x = player.mass.max(1).log10().div(1e30).max(1).pow(this.mass_exp)

            if (player.prestiges[1].gte(1)) x = x.mul(player.ranks.reduce((a,b) => a.mul(b.add(1)),DC.D1).div(1e9).max(1).pow(this.rank_exp));
            
            x = x.mul(upgradeEffect('exm1')).mul(prestigeEffect(0,2))

            // if (x.lt(1)) return DC.D0;

            return x
        },
    },
}

export function getCurrencyGainDisplay(id,passive=CURRENCIES[id].passive>0) { return passive ? formatGain(CURRENCIES[id].amount,temp.currency_gain[id]) : `(+${format(temp.currency_gain[id],0)})` }

export const TOPBAR_CURRENCIES = {
    mass: {
        unl: ()=>true,
        name: "普通质量",
        color: "white",
        get display() {
            const curr = CURRENCIES.mass
            var h = formatMass(curr.amount) + "<br>" + formatGain(curr.amount,temp.currency_gain.mass,true)
            return h
        },
        get tooltip() {
            return `<h3>普通质量</h3><br class='sub-line'>你已经推动了 <b>${formatMass(player.mass)}</b> 的普通质量。`
        },
    },
    rage: {
        unl: ()=>!insideChallenge('2-3') && player.first_ranks[0],
        name: "狂怒能量",
        color: "#f55",
        get display() {
            const curr = CURRENCIES.rage
            var h = format(curr.amount,0) + "<br>" + (CURRENCIES.mass.amount.gte(curr.require) ? getCurrencyGainDisplay('rage') : `(需要 <b>${formatMass(curr.require)}</b>)`)
            return h
        },
        get tooltip() {
            return `<h3>狂怒能量</h3><br class='sub-line'><i>达到 <b>${formatMass(CURRENCIES.rage.require)}</b> 的普通质量以重置你的质量升级和级别，获得 <b>狂怒能量</b>。</i>`
        },
        click() {
            doReset('rage')
        },
    },
    "dark-matter": {
        unl: ()=>!insideChallenge('3-4') && player.rage.unlocked,
        name: "暗物质",
        color: "#fe5",
        get display() {
            const curr = CURRENCIES["dark-matter"]
            var h = format(curr.amount,0) + "<br>" + (CURRENCIES.rage.amount.gte(curr.require) ? getCurrencyGainDisplay('dark-matter') : insideChallenge('2-3') ? `(需要 <b>${formatMass(CURRENCIES["dark-matter"].require)}</b>)` : `(需要 <b>${format(curr.require)}</b> 狂怒能量)`)
            return h
        },
        get tooltip() {
            let c = insideChallenge('2-3') ? `<b>${formatMass(CURRENCIES["dark-matter"].require)}</b> 的普通质量` : `<b>${format(CURRENCIES["dark-matter"].require)}</b> 狂怒能量`
            return `<h3>暗物质</h3><br class='sub-line'><i>达到 ${c} 以重置狂怒相关的一切，包括狂怒能量和狂怒升级，获得 <b>暗物质</b>。</i>`
        },
        click() {
            doReset('dark-matter')
        },
    },
    "black-hole": {
        unl: ()=>!insideChallenge('3-4') && player.bh.unlocked,
        name: "黑洞",
        color: "#fe5",
        get display() {
            const curr = CURRENCIES["black-hole"]
            var h = formatMass(curr.amount) + "<br>" + formatGain(curr.amount,temp.currency_gain['black-hole'],true)
            return h
        },
        get tooltip() {
            return `<h3>黑洞</h3><br class='sub-line'>你已经推动了 <b>${formatMass(player.bh.mass)}</b> 的黑洞质量。`
        },
    },
    "anti-black-hole": {
        unl: ()=>!insideChallenge('3-4') && hasUpgrade('bh8'),
        name: "反黑洞",
        color: "#5ef",
        get display() {
            const curr = CURRENCIES["anti-black-hole"]
            var h = formatMass(curr.amount) + "<br>" + formatGain(curr.amount,temp.currency_gain['anti-black-hole'],true)
            return h
        },
        get tooltip() {
            return `<h3>反黑洞</h3><br class='sub-line'>你已经推动了 <b>${formatMass(player.bh.anti_mass)}</b> 的反黑洞质量。`
        },
    },
    "mlt": {
        unl: ()=>player.mlt.unlocked||hasUpgrade('bh8'),
        name: "多元宇宙",
        color: "#ff7fed",
        get display() {
            let req = MULTIVERSE.require(), bulk = MULTIVERSE.bulk
            var h = format(player.mlt.times,0) + "<br>" + (player.mass.gte(req) ? `(+${format(bulk.sub(player.mlt.times).max(0),0)}, 下一个在 <b>${formatMass(MULTIVERSE.require(bulk))}</b>)` : `(需要 <b>${formatMass(req)}</b>)`)
            return h
        },
        get tooltip() {
            let c = CURRENCIES["mlt-energy"], b = CURRENCIES["mlt-fragments"]
            let h = `<h3>多元宇宙</h3>`
            if (player.mlt.unlocked) h += `<br class='sub-line'>你有 <b>${format(c.amount)}</b> ${formatGain(c.amount,temp.currency_gain['mlt-energy'])} 多元宇宙能量。`;
            if (player.mlt.broken)  h += `<br>你有 <b>${format(b.amount)}</b> ${formatGain(b.amount,temp.currency_gain['mlt-fragments'])} 多元宇宙碎片。`;
            h += `<br class='sub-line'><i>达到 <b>${formatMass(MULTIVERSE.require())}</b> 的普通质量以重置黑洞相关的一切，包括暗物质、黑洞、黑洞升级和反黑洞，提升多元宇宙。</i>`
            return h
        },
        click() {
            doReset('multiverse')
        },
    },
}

export function gainCurrency(id,amt) {
    var curr = CURRENCIES[id]
    curr.amount = curr.amount.add(amt)
    if ('total' in curr) curr.total = curr.total.add(amt)
}

createTempUpdate("updateCurrenciesTemp", ()=>{
    for (let [i,v] of Object.entries(CURRENCIES)) temp.currency_gain[i] = preventNaNDecimal(v.gain??E(0))
})