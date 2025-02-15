import { E, EINF } from './decimal'

const ST_NAMES = [
	null, [
		["","U","D","T","Qa","Qt","Sx","Sp","Oc","No"],
		["","Dc","Vg","Tg","Qag","Qtg","Sxg","Spg","Ocg","Nog"],
		["","Ce","De","Te","Qae","Qte","Sxe","Spe","Oce","Noe"],
	],[
		["","Mi","Mc","Na","Pc","Fm","At","Zp","Yc","Xn"],
		["","Me","Du","Tr","Te","Pe","He","Hp","Ot","En"],
		["","c","Ic","TCn","TeC","PCn","HCn","HpC","OCn","ECn"],
		["","Hc","DHe","THt","TeH","PHc","HHe","HpH","OHt","EHc"]
	]
]

const FORMATS = {
    omega: {
        config: {
            greek: "βζλψΣΘΨω",
            infinity: "Ω",
        },
        format(value) {
            const step = Decimal.floor(value.div(1000));
            const omegaAmount = Decimal.floor(step.div(this.config.greek.length));
            let lastLetter = this.config.greek[step.toNumber() % this.config.greek.length] + toSubscript(value.toNumber() % 1000);
            const beyondGreekArrayBounds = this.config.greek[step.toNumber() % this.config.greek.length] === undefined;
            if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
            lastLetter = "ω";
            }
            const omegaOrder = Decimal.log(value, 8000);
            if (omegaAmount.equals(0)) {
            return lastLetter;
            } else if (omegaAmount.gt(0) && omegaAmount.lte(3)) {
            const omegas = [];
            for (let i = 0; i < omegaAmount.toNumber(); i++) {
                omegas.push("ω");
            }
            return `${omegas.join("^")}^${lastLetter}`;
            } else if (omegaAmount.gt(3) && omegaAmount.lt(10)) {
            return `ω(${omegaAmount.toFixed(0)})^${lastLetter}`;
            } else if (omegaOrder.lt(3)) {
            return `ω(${this.format(omegaAmount)})^${lastLetter}`;
            } else if (omegaOrder.lt(6)) {
            return `ω(${this.format(omegaAmount)})`;
            }
            let val = Decimal.pow(8000, omegaOrder.toNumber() % 1);
			      if(omegaOrder.gte(1e20))val = E(1)
            const orderStr = omegaOrder.lt(100)
            ? Math.floor(omegaOrder.toNumber()).toFixed(0)
            : this.format(Decimal.floor(omegaOrder));
            return `ω[${orderStr}](${this.format(val)})`;
        },
    },
    omega_short: {
        config: {
            greek: "βζλψΣΘΨω",
            infinity: "Ω",
        },
        format(value) {
            const step = Decimal.floor(value.div(1000));
            const omegaAmount = Decimal.floor(step.div(this.config.greek.length));
            let lastLetter = this.config.greek[step.toNumber() % this.config.greek.length] + toSubscript(value.toNumber() % 1000);
            const beyondGreekArrayBounds = this.config.greek[step.toNumber() % this.config.greek.length] === undefined;
            if (beyondGreekArrayBounds || step.toNumber() > Number.MAX_SAFE_INTEGER) {
            lastLetter = "ω";
            }
            const omegaOrder = Decimal.log(value, 8000);
            if (omegaAmount.equals(0)) {
            return lastLetter;
            } else if (omegaAmount.gt(0) && omegaAmount.lte(2)) {
            const omegas = [];
            for (let i = 0; i < omegaAmount.toNumber(); i++) {
                omegas.push("ω");
            }
            return `${omegas.join("^")}^${lastLetter}`;
            } else if (omegaAmount.gt(2) && omegaAmount.lt(10)) {
            return `ω(${omegaAmount.toFixed(0)})^${lastLetter}`;
            }
            let val = Decimal.pow(8000, omegaOrder.toNumber() % 1);
			      if(omegaOrder.gte(1e20))val = E(1)
            const orderStr = omegaOrder.lt(100)
            ? Math.floor(omegaOrder).toFixed(0)
            : this.format(Decimal.floor(omegaOrder));
            return `ω[${orderStr}](${this.format(val)})`;
        }
    },
    elemental: {
      config: {
        element_lists: [["H"],
        ["He", "Li", "Be", "B", "C", "N", "O", "F"],
        ["Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl"],
        [
          "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe",
          "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br"
        ],
        [
          "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru",
          "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I"
        ],
        [
          "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm",
          "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm",
          "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir",
          "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At"
        ],
        [
          "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np",
          "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md",
          "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt",
          "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts"
        ],
        ["Og"]],
      },
      getOffset(group) {
        if (group == 1) return 1
        let n = Math.floor(group / 2)
        let r = 2 * n * (n + 1) * (2 * n + 1) / 3 - 2
        if (group % 2 == 1) r += 2 * Math.pow(n + 1, 2)
        return r
      },
      getAbbreviation(group, progress) {
        const length = this.abbreviationLength(group)
        const elemRel = Math.floor(length * progress)
  
        const elem = elemRel + this.getOffset(group)
  
        return elem > 118 ? this.beyondOg(elem) : this.config.element_lists[group - 1][elemRel]
      },
      beyondOg(x) {
        let log = Math.floor(Math.log10(x))
        let list = ["n", "u", "b", "t", "q", "p", "h", "s", "o", "e"]
        let r = ""
        for (var i = log; i >= 0; i--) {
          let n = Math.floor(x / Math.pow(10, i)) % 10
          if (r == "") r = list[n].toUpperCase()
          else r += list[n]
        }
        return r
      },
      abbreviationLength(group) {
        return group == 1 ? 1 : Math.pow(Math.floor(group / 2) + 1, 2) * 2
      },
      getAbbreviationAndValue(x) {
        const abbreviationListUnfloored = x.log(118).toNumber()
        const abbreviationListIndex = Math.floor(abbreviationListUnfloored) + 1
        const abbreviationLength = this.abbreviationLength(abbreviationListIndex)
        const abbreviationProgress = abbreviationListUnfloored - abbreviationListIndex + 1
        const abbreviationIndex = Math.floor(abbreviationProgress * abbreviationLength)
        const abbreviation = this.getAbbreviation(abbreviationListIndex, abbreviationProgress)
        const value = E(118).pow(abbreviationListIndex + abbreviationIndex / abbreviationLength - 1)
        return [abbreviation, value];
      },
      formatElementalPart(abbreviation, n) {
        if (n.eq(1)) {
          return abbreviation;
        }
        return `${n} ${abbreviation}`;
      },
      format(value,acc) {
        if (value.gt(E(118).pow(E(118).pow(E(118).pow(4))))) return "e"+this.format(value.log10(),acc)
  
        let log = value.log(118)
        let slog = log.log(118)
        let sslog = slog.log(118).toNumber()
        let max = Math.max(4 - sslog * 2, 1)
        const parts = [];
        while (log.gte(1) && parts.length < max) {
          const [abbreviation, value] = this.getAbbreviationAndValue(log)
          const n = log.div(value).floor()
          log = log.sub(n.mul(value))
          parts.unshift([abbreviation, n])
        }
        if (parts.length >= max) {
          return parts.map((x) => this.formatElementalPart(x[0], x[1])).join(" + ");
        }
        const formattedMantissa = E(118).pow(log).toFixed(parts.length === 1 ? 3 : acc);
        if (parts.length === 0) {
          return formattedMantissa;
        }
        if (parts.length === 1) {
          return `${formattedMantissa} × ${this.formatElementalPart(parts[0][0], parts[0][1])}`;
        }
        return `${formattedMantissa} × (${parts.map((x) => this.formatElementalPart(x[0], x[1])).join(" + ")})`;
      },
    },
    old_sc: {
      format(ex, acc) {
        ex = E(ex)
        let e = ex.log10().floor()
        if (e.lt(9)) {
            if (e.lt(3)) {
                return ex.toFixed(acc)
            }
            return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        } else {
            if (ex.gte("eeee10")) {
                let slog = ex.slog()
                return (slog.gte(1e9)?'':E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + this.format(slog.floor(), 0)
            }
            let m = ex.div(E(10).pow(e))
            return (e.log10().gte(9)?'':m.toFixed(4))+'e'+this.format(e,0)
        }
      }
    },
    eng: {
      format(ex, acc) {
        ex = E(ex)
        let e = ex.log10().floor()
        if (e.lt(9)) {
          if (e.lt(3)) {
              return ex.toFixed(acc)
          }
          return ex.floor().toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        } else {
          if (ex.gte("eeee10")) {
            let slog = ex.slog()
            return (slog.gte(1e9)?'':E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + this.format(slog.floor(), 0)
          }
          let m = ex.div(E(1000).pow(e.div(3).floor()))
          return (e.log10().gte(9)?'':m.toFixed(E(4).sub(e.sub(e.div(3).floor().mul(3)))))+'e'+this.format(e.div(3).floor().mul(3),0)
        }
      },
    },
    mixed_sc: {
      format(ex, acc, max) {
        ex = E(ex)
        let e = ex.log10().floor()
        if (e.lt(63) && e.gte(max)) return format(ex,acc,max,"st")
        else {
            if (ex.gte("eeee10")) {
                let slog = ex.slog()
                return (slog.gte(1e9)?'':E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + format(slog.floor(),0,max)
            }
            let ee = e.log10().floor(), f = Decimal.sub(5, ee).max(0).min(2).toNumber()
            let m = ex.div(E(10).pow(e)).min(10-10**-f)
            let be = ee.gte(6)
            return e.gte(1e3) ? (be?"":m.toFixed(f))+"e"+this.format(e,0,max) : format(ex,acc,max,"sc")
        }
      }
    },
    layer: {
      layers: ["infinity","eternity","reality","equality","affinity","celerity","identity","vitality","immunity","atrocity"],
      format(ex, acc, max) {
        ex = E(ex)
        let layer = ex.max(1).log10().max(1).log(INFINITY_NUM.log10()).floor()
        if (layer.lte(0)) return format(ex,acc,max,"sc")
        ex = E(10).pow(ex.max(1).log10().div(INFINITY_NUM.log10().pow(layer)).sub(layer.gte(1)?1:0))
        let meta = layer.div(10).floor()
        let layer_id = layer.toNumber()%10-1
        return format(ex,Math.max(4,acc),max,"sc") + " " + (meta.gte(1)?"meta"+(meta.gte(2)?formatPow(meta,0,max,"sc"):"")+"-":"") + (isNaN(layer_id)?"nanity":this.layers[layer_id])
      },
    },
    standard: {
      tier1(x) {
        return ST_NAMES[1][0][x % 10] +
        ST_NAMES[1][1][Math.floor(x / 10) % 10] +
        ST_NAMES[1][2][Math.floor(x / 100)]
      },
      tier2(x) {
        let o = x % 10
        let t = Math.floor(x / 10) % 10
        let h = Math.floor(x / 100) % 10
  
        let r = ''
        if (x < 10) return ST_NAMES[2][0][x]
        if (t == 1 && o == 0) r += "Vec"
        else r += ST_NAMES[2][1][o] + ST_NAMES[2][2][t]
        r += ST_NAMES[2][3][h]
  
        return r
      },
    },
    inf: {
      format(ex, acc, max) {
        let meta = 0
        let inf = E(Number.MAX_VALUE)
        let symbols = ["", "∞", "Ω", "Ψ", "ʊ"]
        let symbols2 = ["", "", "m", "mm", "mmm"]
        while (ex.gte(inf)) {
          ex = ex.log(inf)
          meta++
        }
  
        if (meta == 0) return format(ex, acc, max, "sc")
        if (ex.gte(3)) return symbols2[meta] + symbols[meta] + "ω^"+format(ex.sub(1), acc, max, "sc")
        if (ex.gte(2)) return symbols2[meta] + "ω" + symbols[meta] + "-"+format(inf.pow(ex.sub(2)), acc, max, "sc")
        return symbols2[meta] + symbols[meta] + "-"+format(inf.pow(ex.sub(1)), acc, max, "sc")
      }
    },
}


const INFINITY_NUM = E(2).pow(1024);
const SUBSCRIPT_NUMBERS = "₀₁₂₃₄₅₆₇₈₉";
const SUPERSCRIPT_NUMBERS = "⁰¹²³⁴⁵⁶⁷⁸⁹";

function toSubscript(value) {
    return value.toFixed(0).split("")
      .map((x) => x === "-" ? "₋" : SUBSCRIPT_NUMBERS[parseInt(x, 10)])
      .join("");
}

function toSuperscript(value) {
    return value.toFixed(0).split("")
      .map((x) => x === "-" ? "₋" : SUPERSCRIPT_NUMBERS[parseInt(x, 10)])
      .join("");
}

export function format(ex, acc=2, max=6, type=options.notation) {
    ex = E(ex)

    var neg = ex.lt(0)?"-":""
    if (ex.mag == Infinity) return neg + '∞'
    if (Number.isNaN(ex.mag)) return neg + 'NaN'
    if (ex.lt(0)) ex = ex.mul(-1)
    if (ex.eq(0)) return ex.toFixed(acc)
    let e = ex.log10().floor()
    switch (type) {
        case "sc":
            if (ex.log10().lt(Math.min(-acc,0)) && acc > 1) {
                let e = ex.log10().ceil()
                let m = ex.div(e.eq(-1)?E(0.1):E(10).pow(e))
                let be = e.mul(-1).max(1).log10().gte(9)
                return neg+(be?'':m.toFixed(2))+'e'+format(e, 0, max, "sc")
            } else if (e.lt(max)) {
                let a = Math.max(Math.min(acc-e.toNumber(), acc), 0)
                return neg+(a>0?ex.toFixed(a):ex.toFixed(a).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'))
            } else {
                if (ex.gte("eeee10")) {
                    let slog = ex.slog()
                    return neg+(slog.gte(1e9)?'':E(10).pow(slog.sub(slog.floor())).toFixed(4)) + "F" + format(slog.floor(), 0)
                }
                let ee = e.log10().floor(), f = Decimal.sub(5, ee).max(0).min(2).toNumber()
                let m = ex.div(E(10).pow(e)).min(10-10**-f)
                let be = ee.gte(6)
                return neg+(be?'':m.toFixed(f))+'e'+format(e, 0, max, "sc")
            }
        case "st":
            if (e.lt(max) || ex.gte("eeee10")) return format(ex, acc, max, "sc")

            let e3 = ex.log(1e3).floor()
            if (e3.lt(1)) {
              return neg+ex.toFixed(Math.max(Math.min(acc-e.toNumber(), acc), 0))
            } else {
              let e3_mul = e3.mul(3)
              let ee = e3.log10().floor()
              if (ee.gte(3000)) return "e"+format(e, acc, max, "st")

              let final = ""
              if (e3.lt(4)) final = ["", "K", "M", "B"][Math.round(e3.toNumber())]
              else {
                let ee3 = Math.floor(e3.log(1e3).toNumber())
                if (ee3 < 100) ee3 = Math.max(ee3 - 1, 0)
                e3 = e3.sub(1).div(E(10).pow(ee3*3))
                while (e3.gt(0)) {
                  let div1000 = e3.div(1e3).floor()
                  let mod1000 = e3.sub(div1000.mul(1e3)).floor().toNumber()
                  if (mod1000 > 0) {
                    if (mod1000 == 1 && !ee3) final = "U"
                    if (ee3) final = FORMATS.standard.tier2(ee3) + (final ? "-" + final : "")
                    if (mod1000 > 1) final = FORMATS.standard.tier1(mod1000) + final
                  }
                  e3 = div1000
                  ee3++
                }
              }

              let m = ex.div(E(10).pow(e3_mul))
              return neg+(ee.gte(10)?'':(m.toFixed(E(3).sub(e.sub(e3_mul)).toNumber())))+final
            }
        case "log":
          if (e.lt(max) || ex.gte("eeee10")) return format(ex, acc, max, "sc")
          return neg+"e"+format(ex.log10(), 3, max, "log")
        default:
            return neg+FORMATS[type].format(ex, acc, max)
    }
}

var mass_type = 'short'
const VERSES = {
    standard: [
        [
            // Pre-Archverse Verses
            'multi',  'mega',   'giga'   ,'tera'  ,'peta'   ,'exa'   ,'zetta'   ,'yotta' ,'ronna'   ,'quetta',
            'xenna',  'weka',   'vendeka','uda'   ,'tradaka','sorta' ,'quexa'   ,'pepta' ,'ocha'    ,'nena',
            'minga',  'luma',   'kema'   ,'jretta','iqatta' ,'huitta','gatextta','feqesa','enscenda','desyta',
            'ceanata','bevvgta','avta'
        ],[
            // Pre-Lodeverse Verses
            'multi','meta','xeno','hyper','ultra','omni'
        ],
    ],
    short: [
        [
            // Pre-Archverse Verses
            'mlt','mg','gi','te','pe','ex','ze','yo','rn','qu',
             'xn','wk','ve','ud','tr','sr','qx','pp','oc','ne',
             'mi','lu','ke','jr','iq','hu','ga','fe','en','ds',
             'ce','be','av'
        ],[
            // Pre-Lodeverse Verses
            'mlt','met','xen','hyp','ult','omv'
        ],
    ]
}
const MASS_NAMES = {
    standard: [
        'gramm',
        'kilogramm',
        'tonne',
        'mass of mount everest',
        'mass of earth',
        'mass of sun',
        'mass of milky way galaxy',
        'universe',

        'verse', // 8
        'arch',  // 9
        'lode',  // 10
    ],
    short: [
        'g',
        'kg',
        'tonne',
        'MME',
        'M⊕',
        'M☉',
        'MMWG',
        'uni',

        'v',  // 8
        'ar', // 9
        'ld', // 10
    ],
}

export function mlt(x) { return Decimal.mul(x, 1e9).pow10().mul(1.5e56) }

function getMltValue(mass){
	mass = E(mass);
	if(mass.lte(1e50)){
		return mass.div(1.5e56).mul(Decimal.log10(Decimal.exp(1))).div(1e9);
	}else{
		return mass.div(1.5e56).add(1).log10().div(1e9);
	}
}

function getARVName(i,lode) { const n = MASS_NAMES[mass_type], v = VERSES[mass_type][0][i-1]; return i > 0 ? v ? v + (!lode && (mass_type == 'standard' || i != 1) ? n[8] : "") : (lode ? n[9] : n[9]+n[8])+formatPow(i,0) : "" }

function formatARV(ex,lode) {
  if (lode && ex.lt(1e15)) return format(ex) + " "
  const n = MASS_NAMES[mass_type]
  const mlt = lode ? ex.div(1e15) : getMltValue(ex);
  const arv = mlt.log10().div(15)
	if(arv.add(1).gte(1000)) return format(arv.add(1))+" "+n[9]+ (lode ? "s-" : n[8]+"s");
  let nn = arv.add(1).floor().toNumber()
  if (!lode) nn = Math.max(1,nn);
  return format(mlt.div(Decimal.pow(1e15,arv.floor()))) + " " + getARVName(nn,lode) + (lode ? "-" : "")
}

function formatLDV(ex) {
    const n = MASS_NAMES[mass_type]
    const ldv = E(ex).slog(10).toNumber() - 1.9542425094393248
    const ldv_floor = Math.floor(ldv)
    if (ldv >= 1000) return format(ldv)+' '+n[10]+n[8]+'s'
    var v = VERSES[mass_type][1][ldv_floor-1]
    return formatARV(ex.iteratedlog(10,ldv_floor).div(1e9),true) + "" + (v ? v + (mass_type == 'standard' ? n[8] : "") : n[10]+n[8]+formatPow(ldv_floor,0))
    // Decimal.tetrate(10, ldv % 1 + 1).div(10)
}

const DT = Decimal.tetrate(10,6)
const MAX_ARVS = Decimal.iteratedexp(10,2,VERSES.standard[0].length*15+9)
const LOG_MAX_ARVS = MAX_ARVS.log10()
const MAX_LDVS = Decimal.iteratedexp(10,VERSES.standard[1].length+2,9)

export function formatGain(a,e,mass) {
    const g = Decimal.add(a,e), f = mass ? formatMass : format, n = MASS_NAMES[mass_type], verse = n[8], arch = n[9], lode = n[10];

    if (mass && player.options.massDis == 1) mass = false

    if (g.neq(a)) {
        if (mass) {
            if (a.gte('eee9')) {
                var ldv = E(a).slog(10).toNumber() - 1.9542425094393248, ldv_floor = Math.floor(ldv)

                if (a.gte(MAX_LDVS)) {
                    ldv = E(g).slog(10).sub(E(a).slog(10)).mul(FPS)
                    if (ldv.gte(1)) return "(+" + ldv.format() + " "+lode+verse+"s/s)"
                }

                var sg = E(g).iteratedlog(10,ldv_floor), sa = E(a).iteratedlog(10,ldv_floor), rate = ""

                if (sa.gte(LOG_MAX_ARVS)) {
                    var arv = sg.div(sa).log10().div(15).mul(FPS)
                    if (arv.gte(1)) rate = arv.format() + " "+arch+"s-"
                }

                if (rate === '') rate = formatARV(sg.sub(sa).div(1e9).mul(FPS),true)
                
                var v = VERSES[mass_type][1][ldv_floor-1]
                return "(+" + rate + "" + (v ? v + (mass_type == 'standard' ? verse : "") : lode+verse+formatPow(ldv_floor,0)) + "/s)"
            }

            if (a.gte(MAX_ARVS)) {
                var arv = E(g).log10().div(E(a).log10()).log10().div(15).mul(FPS)
                return "(+" + arv.format() + " "+arch+verse+"s/s)"
            }
        } else {
            if (a.gte(DT)) {
                var oom = E(g).slog(10).sub(E(a).slog(10)).mul(FPS)
                if (oom.gte(1e-3)) return "(+" + oom.format() + " OoMs^^2/s)"
            }
    
            if (a.gte('ee100')) {
                var tower = Math.floor(E(a).slog(10).toNumber() - 1.3010299956639813);
        
                var oom = E(g).iteratedlog(10,tower).sub(E(a).iteratedlog(10,tower)).mul(FPS), rated = false;
        
                if (oom.gte(1)) rated = true
                else if (tower > 2) {
                    tower--
                    oom = E(g).iteratedlog(10,tower).sub(E(a).iteratedlog(10,tower)).mul(FPS)
                    if (oom.gte(1)) rated = true
                }
        
                if (rated) return "(+" + oom.format() + " OoMs^"+tower+"/s)"
            }
        }
    
        if (a.gte(1e100)) {
            const oom = g.div(a).log10().mul(FPS)
            if (mass && a.gte('1.5e1000000056') && a.lt(MAX_ARVS)) return "(+" + formatARV(Decimal.pow(10,oom)) + "/s)"
            if (oom.gte(10)) return "(+" + oom.format() + " OoMs/s)"
        }
    }

    return "(+" + f(e) + "/s)"
}

export function formatMass(ex) {
  ex = E(ex)

  const n = MASS_NAMES[mass_type]
  let md = player.options.massDis

  if (md == 1 || ex.gte(EINF)) return format(ex) + ' ' + n[0]

  if (ex.gte('eee9')) return formatLDV(ex)
  if (ex.gte('1.5e1000000056')) return formatARV(ex)
  if (ex.gte(1.5e56)) return format(ex.div(1.5e56)) + ' ' + n[7]
  if (ex.gte(2.9835e45)) return format(ex.div(2.9835e45)) + ' ' + n[6]
  if (ex.gte(1.989e33)) return format(ex.div(1.989e33)) + ' ' + n[5]
  if (ex.gte(5.972e27)) return format(ex.div(5.972e27)) + ' ' + n[4]
  if (ex.gte(1.619e20)) return format(ex.div(1.619e20)) + ' ' + n[3]
  if (ex.gte(1e6)) return format(ex.div(1e6)) + ' ' + n[2]
  if (ex.gte(1e3)) return format(ex.div(1e3)) + ' ' + n[1]
  return format(ex) + ' ' + n[0]
}

/*
export function formatGain(a,e) {
    const g = Decimal.add(a,e.div(FPS))

    if (g.neq(a)) {
        if (a.gte(DT)) {
            var oom = E(g).slog(10).sub(E(a).slog(10)).mul(FPS)
            if (oom.gte(1e-3)) return "(+" + oom.format() + " OoMs^^2/s)"
        }

        if (a.gte('ee100')) {
            var tower = Math.floor(E(a).slog(10).toNumber() - 1.3010299956639813);
    
            var oom = E(g).iteratedlog(10,tower).sub(E(a).iteratedlog(10,tower)).mul(FPS), rated = false;
    
            if (oom.gte(1)) rated = true
            else if (tower > 2) {
                tower--
                oom = E(g).iteratedlog(10,tower).sub(E(a).iteratedlog(10,tower)).mul(FPS)
                if (oom.gte(1)) rated = true
            }
    
            if (rated) return "(+" + oom.format() + " OoMs^"+tower+"/s)"
        }
    
        if (a.gte(1e100)) {
            const oom = g.div(a).log10().mul(FPS)
            if (oom.gte(1)) return "(+" + oom.format() + " OoMs/s)"
        }
    }

    return "(" + (e.lt(0) ? "" : "+") + format(e) + "/s)"
}
*/

export function formatTime(ex,acc=0,type="s") {
  ex = E(ex)
  if (ex.mag == Infinity) return 'Forever'
  if (ex.gte(31536000)) return format(ex.div(31536000).floor(),0)+" years"+(ex.div(31536000).gte(1e9) ? "" : " " + formatTime(ex.mod(31536000),acc,'y'))
  if (ex.gte(86400)) return format(ex.div(86400).floor(),0)+" days "+formatTime(ex.mod(86400),acc,'d')
  if (ex.gte(3600)) return format(ex.div(3600).floor(),0)+":"+formatTime(ex.mod(3600),acc,'h')
  if (ex.gte(60)||type=="h") return (ex.div(60).gte(10)||type!="h"?"":"0")+format(ex.div(60).floor(),0)+":"+formatTime(ex.mod(60),acc,'m')
  return (ex.gte(10)||type!="m" ?"":"0")+format(ex,acc)+(type=='s'?"s":"")
}

export function formatReduction(ex,acc) { return format(Decimal.sub(1,ex).mul(100),acc)+"%" }

export function formatPercent(ex,acc) { return format(Decimal.mul(ex,100),acc)+"%" }

export function formatMult(ex,acc) { return Decimal.gte(ex,1)?"×"+format(ex,acc):"/"+format(Decimal.pow(ex,-1),acc)}

export function formatPow(ex,acc) { return "^"+format(ex,acc) }

Decimal.prototype.format = function (acc, max) { return format(this.clone(), acc, max) }

Decimal.prototype.formatGain = function (gain, mass=false) { return formatGain(this.clone(), gain, mass) }

