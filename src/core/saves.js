import { imageUrls } from "./preload";
import { PRESTIGES, PRESTIGES_LEN } from "./prestiges";
import { RANKS, RANKS_LEN } from "./ranks";
import { updateTemp } from "./temp";

window.player = {}

const saveID = "IMCR_SAVE"

export const FPS = 30

export function getPlayerData() {
    let s = {
        mass: DC.D0,
        exmass: DC.D0,
        
        ranks: [],
        first_ranks: [],

        prestiges: [],
        first_prestiges: [],

        upgrades: {},
        auto_upgs: {},

        rage: {
            unlocked: false,
            powers: DC.D0,
        },

        bh: {
            unlocked: false,
            dm: DC.D0,
            mass: DC.D0,
            anti_mass: DC.D0,
        },

        mlt: {
            unlocked: false,
            times: DC.D0,

            energy: DC.D0,
            total_energy: DC.D0,

            broken: false,
            fragments: DC.D0,
            total_fragments: DC.D0,
        },

        chal: {
            active: {},
            completions: {},
            best: {},
        },

        achievements: [],

        options: {
            massDis: 0,
            notation: 2,
        },

        time: 0,
        lastest: Date.now(),
    }
    for (let k in UPGRADES) s.upgrades[k] = DC.D0;
    for (let i = 0; i < RANKS_LEN; i++) s.ranks[i] = DC.D0;
    for (let i = 0; i < PRESTIGES_LEN; i++) s.prestiges[i] = DC.D0;
    for (let i in CHALLENGES) {
        s.chal.active[i] = false
        s.chal.completions[i] = DC.D0
        s.chal.best[i] = DC.D0
    }
    return s
}

export function wipe(reload=false) {
    if (reload) {
        wipe()
        save()
        location.reload()
    }
    else player = getPlayerData()
}

function loadPlayer(load) {
    const DATA = getPlayerData()
    player = deepNaN(load, DATA)
    player = deepUndefinedAndDecimal(player, DATA)
    console.log(player)
    convertStringToDecimal()
}

export function clonePlayer(obj,data) {
    let unique = {}

    for (let k in obj) {
        if (data[k] == null || data[k] == undefined) continue
        unique[k] = data[k] instanceof Decimal
        ? E(obj[k])
        : typeof obj[k] == 'object'
        ? clonePlayer(obj[k],data[k])
        : obj[k]
    }

    return unique
}

function deepNaN(obj, data) {
    for (let k in obj) {
        if (typeof obj[k] == 'string') {
            if (data[k] == null || data[k] == undefined ? false : data[k] instanceof Decimal ) if (isNaN(E(obj[k]).mag)) obj[k] = data[k];
        } else {
            if (typeof obj[k] != 'object' && isNaN(obj[k])) obj[k] = data[k];
            if (typeof obj[k] == 'object' && data[k] && obj[k] != null) obj[k] = deepNaN(obj[k], data[k]);
        }
    }
    return obj
}

function deepUndefinedAndDecimal(obj, data) {
    if (obj == null) return data
    for (let k in data) {
        if (obj[k] === null) continue
        if (obj[k] === undefined) obj[k] = data[k]
        else {
            if (data[k] instanceof Decimal) obj[k] = E(obj[k])
            else if (typeof obj[k] == 'object') deepUndefinedAndDecimal(obj[k], data[k])
        }
    }
    return obj
}

function convertStringToDecimal() {
    
}

function cannotSave() { return false }

export function save() {
    let str = btoa(JSON.stringify(player))
    if (cannotSave()) return
    if (localStorage.getItem(saveID) == '') wipe()
    localStorage.setItem(saveID,str)
    // tmp.prevSave = localStorage.getItem(saveID)
    console.log("Game Saved")
    addNotify("Game Saved!")
}

function load(x){
    if(typeof x == "string" & x != ''){
        loadPlayer(JSON.parse(atob(x)))
    } else {
        wipe()
    }
}

export function exporty() {
    let str = btoa(JSON.stringify(player))
    /*
    if (findNaN(str, true)) {
        addNotify("Error Exporting, because it got NaNed")
        return
    }
    */
    save();
    let file = new Blob([str], {type: "text/plain"})
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "IM:CR Save - "+new Date().toGMTString()+".txt"
    a.click()
}

export function export_copy() {
    let str = btoa(JSON.stringify(player))
    /*
    if (findNaN(str, true)) {
        addNotify("Error Exporting, because it got NaNed")
        return
    }
    */
    let copyText = document.getElementById('copy')
    copyText.value = str
    copyText.style.visibility = "visible"
    copyText.select();
    document.execCommand("copy");
    copyText.style.visibility = "hidden"
    addNotify("Copied to Clipboard")
}

export function importy() {
    
    /*
    createPrompt("Paste in your save WARNING: WILL OVERWRITE YOUR CURRENT SAVE",'import',loadgame=>{
        let st = ""
        if (loadgame.length <= 100) st = convertStringIntoAGY(loadgame)
        if (ssf[2](loadgame)) return
        if (st == 'OJY$VFe*b') {
            addNotify('monke<br><img style="width: 100%; height: 100%" src="https://i.kym-cdn.com/photos/images/original/001/132/314/cbc.jpg">')
            return
        }
        if (st == 'p4H)pb{v2y5?g!') {
            addNotify('2+2=5<br><img src="https://cdn2.penguin.com.au/authors/400/106175au.jpg">')
            return
        }
        if (st == 'L5{W*oI.NhA-lE)C1#e') {
            addNotify('<img src="https://steamuserimages-a.akamaihd.net/ugc/83721257582613769/22687C6536A50ADB3489A721A264E0EF506A89B3/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false">',6)
            return
        }
        if (loadgame != null) {
            let keep = player
            try {
                setTimeout(()=>{
                    if (findNaN(loadgame, true)) {
                        addNotify("Error Importing, because it got NaNed")
                        return
                    }
                    load(loadgame)
                    save()
                    resetTemp()
                    loadGame(false)
                    location.reload()
                }, 200)
            } catch (error) {
                addNotify("Error Importing")
                player = keep
            }
        }
    })
    */

    let loadgame = prompt("Paste in your save");

    if (loadgame != null) {
        let keep = player
        try {
            setTimeout(()=>{
                if (findNaN(loadgame, true)) {
                    addNotify("Error Importing, because it got NaNed")
                    return
                }
                load(loadgame)
                save()
                location.reload()
            }, 200)
        } catch (error) {
            addNotify("Error Importing")
            player = keep
        }
    }
}

export function importy_file() {
    let a = document.createElement("input")
    a.setAttribute("type","file")
    a.click()
    a.onchange = ()=>{
        let fr = new FileReader();
        fr.onload = () => {
            let loadgame = fr.result
            if (findNaN(loadgame, true)) {
				error("Error Importing, because it got NaNed")
				return
			}
            localStorage.setItem(saveID, loadgame)
			location.reload()
        }
        fr.readAsText(a.files[0]);
    }
}

function setupGame() {
    wipe()
    load(localStorage.getItem(saveID))

    for (let i = 0; i < RANKS_LEN; i++) {
        Object.defineProperty(RANKS[i],"amount",{
            get() { return player.ranks[i] },
            set(v) { player.ranks[i] = v }
        })
        Object.defineProperty(RANKS[i],"res",{
            get() { return i == 0 ? player.mass : player.ranks[i-1] },
        })
    }

    for (let i = 0; i < PRESTIGES_LEN; i++) {
        Object.defineProperty(PRESTIGES[i],"amount",{
            get() { return player.prestiges[i] },
            set(v) { player.prestiges[i] = v }
        })
        Object.defineProperty(PRESTIGES[i],"res",{
            get() { return i == 0 ? player.exmass : player.prestiges[i-1] },
        })
    }

    temp = getTempData()
    updateTemp()

    let stab = TabSystem[Tab.tab].stab
    app.view.subtab = Array.isArray(stab) ? stab[Tab.subtab[Tab.tab]??0][0] : stab

    for (let id in CHALLENGES) {
        const C = CHALLENGES[id]

        if (!('unl' in C)) C.unl = ()=>true;

        if (!('goal' in C)) C.goal = ()=>EINF;
        if (!('bulk' in C)) C.bulk = ()=>DC.D0;

        C.res ??= 'placeholder'
    }

    setInterval(loop, 1000/FPS);

    setInterval(save, 60000);

    setTimeout(() => {
        app.view.initialized = true
    }, 0);
}

window.loadGame = () => {
    setupGame()

    return

    const loadImage = async src => {
        const img = new Image();
        img.src = src;
        await img.decode();
        return img;
    };

    Promise.all(imageUrls.map(loadImage)).then(setupGame).catch(err => console.error(err))
}

export function isNaNed(val) {
    return typeof val == "number" ? isNaN(val) : Object.getPrototypeOf(val).constructor.name == "Decimal" ? isNaN(val.mag) : false
}

export function findNaN(obj, str=false, data=getPlayerData(), node='player') {
    if (str ? typeof obj == "string" : false) obj = JSON.parse(atob(obj))
    for (let k in obj) {
        if (typeof obj[k] == "number") if (isNaNed(obj[k])) return node+'.'+k
        if (str) {
            if (typeof obj[k] == "string") if (data[k] == null || data[k] == undefined ? false : data[k] instanceof Decimal) if (isNaN(E(obj[k]).mag)) return node+'.'+k
        } else {
            if (obj[k] == null || obj[k] == undefined ? false : Object.getPrototypeOf(obj[k]).constructor.name == "Decimal") if (isNaN(E(obj[k]).mag)) return node+'.'+k
        }
        if (typeof obj[k] == "object") {
            let node2 = findNaN(obj[k], str, data[k], (node?node+'.':'')+k)
            if (node2) return node2
        }
    }
    return false
}