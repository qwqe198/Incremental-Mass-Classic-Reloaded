export const RESETS = {
    rage: {
        get require() { return player.mass.gte(CURRENCIES.rage.require) }, 
        reset(force) {
            if (!force) {
                gainCurrency('rage',temp.currency_gain.rage)
                player.rage.unlocked = true

                giveAchievement(13)
            }

            this.doReset()
        },
        doReset() {
            resetRank(RANKS_LEN)
        },
    },
    'dark-matter': {
        get require() { return player.rage.powers.gte(CURRENCIES['dark-matter'].require) }, 
        reset(force) {
            if (!force) {
                gainCurrency('dark-matter',temp.currency_gain['dark-matter'])
                player.bh.unlocked = true

                giveAchievement(21)
                if (!hasNonQoLUpgradesByGroup('rage')) giveAchievement(25);
            }

            this.doReset()
        },
        doReset() {
            player.rage.powers = E(0)
            resetUpgradesByGroup('rage',['r2','r4'])
            player.bh.mass = E(0)
            player.bh.anti_mass = E(0)

            RESETS.rage.doReset()

            updateTemp()
        },
    },
    'multiverse': {
        get require() { return player.mass.gte(MULTIVERSE.require()) },
        reset(force) {
            if (!force) {
                player.mlt.times = player.mlt.times.add(1).max(MULTIVERSE.bulk)
                player.mlt.unlocked = true
            }

            this.doReset()
        },
        doReset(chal) {
            player.bh.dm = E(0)

            let k = ['bh5']
            if (player.mlt.times.gte(3)) k.push('bh3');
            if (player.mlt.times.gte(4)) k.push('bh8');
            if (player.mlt.times.gte(9)) k.push('bh7');
            resetUpgradesByGroup('bh',k)

            RESETS["dark-matter"].doReset()
            if (chal || !SET_BEST_CHAL[1]()) resetChallengeLayers(1);

            updateTemp()
        },
    },
}

export function doReset(id, force, ...arg) {
    var r = RESETS[id]
    if (force || r.require) r.reset(force, ...arg)
    // else if (r.require) createConfirmationPopup(lang_text('reset-'+id+"-message"), () => {r.reset(false, ...arg)})
}