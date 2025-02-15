var date = Date.now(), diff = 0;

function calc(dt) {
    if (temp.currency_gain.mass.div(player.mass.max(1)).gte(1e100)) giveAchievement(35);

    for (let [i,v] of Object.entries(CURRENCIES)) {
        var passive = v.passive ?? 1
        gainCurrency(i, temp.currency_gain[i].mul(dt*passive))
    }

    for (let i = 0; i < RANKS_LEN; i++) {
        const R = RANKS[i], res = R.res
        if (R.unl() && R.auto?.() && res.gte(R.require(R.amount))) R.amount = R.bulk(res).max(R.amount.add(1));
    }

    for (let i = 0; i < PRESTIGES_LEN; i++) {
        const R = PRESTIGES[i], res = R.res
        if (R.unl() && R.auto?.() && res.gte(R.require(R.amount))) R.amount = R.bulk(res).max(R.amount.add(1));
    }

    for (let id of UPG_KEYS) if (UPGRADES[id].unl() && temp.auto_upgs_unlocked[id] && player.auto_upgs[id]) buyUpgrade(id,true,true);

    for (let l = 1; l <= CHALLENGE_LAYERS; l++) {
        let auto = AUTO_CHAL[l]?.(), auto_lite = l < temp.highest_active_layer - 1

        for (let id of CHALLENGES_MAP[l]) {
            const C = CHALLENGES[id]
            var trapped = auto_lite || temp.trapped_chal[id]

            if (trapped || auto) {
                var amount = CHAL_RESOURCES[C.res].amount
                if (amount.gte(C.goal(DC.D0))) {
                    var bulk = C.bulk(amount)
                    if (!auto) bulk = bulk.min(player.chal.best[id])
                    player.chal.completions[id] = player.chal.completions[id].max(bulk);
                }
            }
        }
    }

    player.time += dt

    checkAchievements()
}

export function loop() {
    diff = Date.now() - date;
    GameUI.update()
    calc(diff/1000)
    updateTemp()
    player.latest = date = Date.now()
}

export function addNotify(message,time=3) {
    const notify = document.createElement('div');
    notify.classList.add('notify-ctn');
    notify.innerHTML = message;
    document.getElementById('notify').appendChild(notify);
    setTimeout(() => {
        notify.style.opacity = 0
        setTimeout(() => {
            notify.remove()
        },1000)
    },time*1000)
}