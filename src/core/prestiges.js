import { DC } from "./decimal"
import { updateTemp } from "./temp"

export const PRESTIGES = [
    {
        name: "转生级别",
        unl: () => true,
        auto: () => player.prestiges[1].gte(2),

        get fp() { return 1 },

        require(a) { return a.div(this.fp).sumBase(1.01).pow(player.mlt.times.gte(84) ? 1.67 : 2).add(1).pow_base(10).mul(1e2).max(1) },
        bulk(a) { return a.div(1e2).log(10).sub(1).root(player.mlt.times.gte(84) ? 1.67 : 2).sumBase(1.01,true).mul(this.fp).floor().add(1) },

        rewards: {
            "1": [
                `解锁一个新的额外质量升级。`,
            ],
            "2": [
                `再次解锁一个新的额外质量升级。`,
            ],
            "4": [
                `转生级别提升额外质量。`,
                ()=>player.prestiges[0].gte(19) ? player.prestiges[0].sub(2).max(0).pow_base(2) : player.prestiges[0].sub(2).pow(2), 1, x=>formatMult(x),
            ],
            "5": [
                `解锁一组额外质量升级。`,
            ],
            "6": [
                `<b>exm1</b> 升级的基础增加 <b>+1</b>。`,
            ],
            "8": [
                `<b>exm2</b> 升级的基础增加 <b>+0.025</b>。`,
            ],
            "13": [
                `每 <b>转生级别</b> 增加额外质量公式中级别的指数 <b>+0.1</b>。`,
                ()=>player.prestiges[0].max(0).mul(.1), DC.D0, x=>"+"+format(x),
            ],
            "19": [
                `增强 <b>转生级别 4</b> 的效果。`,
            ],
        },
    },{
        name: "荣耀",
        unl: () => player.first_prestiges[0],
        auto: () => false,

        get fp() { return 1 },

        require(a) { return a.div(this.fp).add(2).pow(2).round() },
        bulk(a) { return a.root(2).sub(2).mul(this.fp).add(1).floor() },

        rewards: {
            "1": [
                `额外质量的基础现在乘以级别的乘积。`,
            ],
            "2": [
                `<b>m6</b> 升级的基础增加 <b>+1%</b>（加法）。自动更新转生级别。`,
            ],
            "3": [
                `增强总多元宇宙碎片的效果。解锁一个新的多元宇宙升级。`,
            ],
        },
    },
]

export const PRESTIGES_LEN = PRESTIGES.length

export function resetPrestige(id) {
    for (let i = id-1; i >= 0; i--) {
        player.prestiges[i] = DC.D0
    }

    player.exmass = DC.D0
    resetUpgradesByGroup('exmass',['exm4','exm5'])
    doReset('multiverse',true)

    updateTemp()
}

export function prestigeUp(id) {
    const R = PRESTIGES[id]
    if (R.unl() && R.res.gte(R.require(R.amount))) {
        R.amount = R.bulk(R.res).max(R.amount.add(1))
        player.first_prestiges[id] = true
        resetPrestige(id)
    }
}

export function prestigeEffect(id,i,def=1) { return temp.prestige_effects[id][i] ?? def }

createTempUpdate('updatePrestigesTemp', ()=>{
    temp.prestiges_fp = 1

    for (let i = 0; i < PRESTIGES_LEN; i++) {
        const R = PRESTIGES[i], amount = R.amount, TR = temp.prestige_effects[i], RRK = Object.keys(R.rewards);

        for (let r = 0; r < RRK.length; r++) {
            const RB = RRK[r], RR = R.rewards[RB]

            if (RR[1]) TR[r] = amount.gte(RB) ? RR[1]() : RR[2];
        }
    }
})

export const EXMASS_UPGRADES = {
    'exm1': {
        unl: ()=>player.prestiges[0].gte(1),
        mass: true,
        get description() { return `每级增加额外质量 <b>${formatMult(this.base)}</b>。` },
        
        curr: "ex-mass",
        cost: a => a.sumBase(1.01).pow_base(10).mul(100),
        bulk: a => a.div(100).log(10).sumBase(1.01,true).floor().add(1),
        
        // get bonus() { return  },
        // get strength() { return  },
        get base() {
            let b = E(2)
            if (player.prestiges[0].gte(6)) b = b.add(1);
            return b
        },
        effect(a) {
            let x = a.pow_base(this.base)
            return x
        },
        effDesc: x => formatMult(x),
    },
    'exm2': {
        unl: ()=>player.prestiges[0].gte(2),
        mass: true,
        get description() { return `每级增加质量 <b>${formatPow(this.base,3)}</b>。` },
        
        curr: "ex-mass",
        cost: a => a.sumBase(1.01).pow_base(2).mul(1000),
        bulk: a => a.div(1000).log(2).sumBase(1.01,true).floor().add(1),
        
        // get bonus() { return  },
        // get strength() { return  },
        get base() {
            let b = E(1.1)
            if (player.prestiges[0].gte(8)) b = b.add(.025);
            return b
        },
        effect(a) {
            let x = a.pow_base(this.base)
            return x
        },
        effDesc: x => formatPow(x),
    },
    'exm3': {
        unl: ()=>player.prestiges[0].gte(5),
        mass: true,
        get description() { return `每平方根级增加额外质量公式中质量的指数 <b>+${format(this.base)}</b>。` },
        
        curr: "ex-mass",
        cost: a => a.sumBase(1.1).pow_base(100).mul(1e20),
        bulk: a => a.div(1e20).log(100).sumBase(1.1,true).floor().add(1),
        
        // get bonus() { return  },
        // get strength() { return  },
        get base() {
            let b = E(.1)
            return b
        },
        effect(a) {
            let x = a.root(2).mul(this.base)
            return x
        },
        effDesc: x => "+"+format(x,3),
    },
    'exm4': {
        max: 1,

        unl: ()=>player.prestiges[0].gte(5),
        mass: true,
        get description() { return `<b>exm2</b> 升级影响黑洞的质量。` },

        curr: "ex-mass",
        cost: a => 1e45,
    },
    'exm5': {
        max: 1,

        unl: ()=>player.prestiges[0].gte(5),
        mass: true,
        get description() { return `黑洞为质量提供指数加成。` },

        curr: "ex-mass",
        cost: a => 1e130,
    },
}