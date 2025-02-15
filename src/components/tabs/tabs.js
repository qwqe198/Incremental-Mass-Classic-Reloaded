import AchievementsTab from './achievements/AchievementsTab.vue'
import BlackHoleTab from './BlackHoleTab.vue'
import ChallengesTab from './ChallengesTab.vue'
import ExMassTab from './ex-mass/ExMassTab.vue'
import MassTab from './MassTab.vue'
import BreakMultiverseTab from './mlt/BreakMultiverseTab.vue'
import MultiverseMilestonesTab from './mlt/MultiverseMilestonesTab.vue'
import MultiverseTab from './mlt/MultiverseTab.vue'
import OptionsTab from './options/OptionsTab.vue'
import PrestigesTab from './PrestigesTab.vue'
import RanksTab from './RanksTab.vue'

export const TabComponents = {
    MassTab, BlackHoleTab, RanksTab
}

export const TabContents = {
    "mass": {
        name: "Mass",
        component: MassTab,
    },
    "bh": {
        name: "Black Hole",
        component: BlackHoleTab,
    },
    "exmass": {
        name: "Ex-Mass",
        component: ExMassTab,
    },
    "ranks": {
        name: "Rank Rewards",
        component: RanksTab,
    },
    "prestiges": {
        name: "Prestige Rewards",
        component: PrestigesTab,
    },
    "achievements": {
        name: "Achievements",
        component: AchievementsTab,
    },
    "mlt": {
        name: "Multiverse",
        component: MultiverseTab,
    },
    "mlt_milestone": {
        name: "Multiverse Milestones",
        component: MultiverseMilestonesTab,
    },
    "break_mlt": {
        name: "Break Multiverse",
        component: BreakMultiverseTab,
    },
    "options": {
        name: "Options",
        component: OptionsTab,
    },
    "challenges": {
        name: "Challenges",
        component: ChallengesTab,
    },
}

export const TabSystem = [
    {
        name: "Main",
        unl: ()=>true,
        stab: [
            ["mass"],
            ["bh",()=>player.bh.unlocked],
            ["exmass",()=>player.mlt.times.gte(50)],
        ],
    },{
        name: "Multiverse",
        unl: ()=>player.mlt.unlocked,
        stab: [
            ["mlt"],
            ["mlt_milestone"],
            ["break_mlt",()=>player.mlt.times.gte(17)],
        ],
    },{
        name: "Challenges",
        unl: ()=>player.mlt.times.gte(7),
        stab: "challenges",
    },{
        name: "Statistics",
        unl: ()=>true,
        stab: [
            ["ranks"],
            ["prestiges",()=>player.first_prestiges[0]==true],
        ],
    },{
        name: "Options",
        unl: ()=>true,
        stab: "options",
    },{
        name: "Achievements",
        unl: ()=>true,
        stab: "achievements",
    },
]

export const Tab = {
    tab: 0,
    subtab: [0,0],
    /*
    get currentComponent() {
        let tab_ctn = TabSystem[this.tab], stab = tab_ctn.stab, component;

        if (Array.isArray(stab)) component = TabContents[stab[this.stab][0]].component
        else component = TabContents[stab].component

        return component
    },
    */
    choose(tab,subtab) {
        this.tab = tab;
        if (subtab !== undefined) this.subtab[tab] = subtab;

        let tab_ctn = TabSystem[this.tab], stab = tab_ctn.stab

        app.view.subtab = Array.isArray(stab) ? stab[this.subtab[this.tab]??0][0] : stab

        GameUI.update()
    },
}