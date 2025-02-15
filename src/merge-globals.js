function mergeIntoGlobal(object) {
    for (const key in object) {
        if (key === "default") {
            // Skip default exports
            continue;
        }
        const value = object[key];
        const existingValue = window[key];
        if (existingValue !== undefined) {
            throw `Property ${key} already exists in global context`;
        }
      
        window[key] = value;
    }
}

import * as core from "./core/globals.js";
mergeIntoGlobal(core);