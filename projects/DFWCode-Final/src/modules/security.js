export const Security = {
    _salt: 0x5F3759DF, // Constante magique

    // Fonction de hashage (DjB2)
    hash: function (str) {
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i);
        }
        return hash >>> 0; // Force un entier 32-bit non signé
    },

    // Algorithme de validation
    validateKey: function (keyInput) {
        if (!keyInput) return false;
        const cleanKey = keyInput.trim().toUpperCase();
        const parts = cleanKey.split('-');
        if (parts.length !== 4) return false;
        const [pre, seed, hash, csum] = parts;
        if (pre !== 'ARCH') return false;
        const seedNum = parseInt(seed, 16);
        if (isNaN(seedNum)) return false;
        const expectedHashVal = ((seedNum ^ this._salt) * 13) >>> 0;
        const expectedHash = expectedHashVal.toString(16).toUpperCase();
        if (hash !== expectedHash) return false;
        const fullStr = pre + seed + hash;
        const calcCsumVal = this.hash(fullStr) % 255;
        if (parseInt(csum, 16) !== calcCsumVal) return false;
        return true;
    },

    // Générateur de clés valides
    generateKey: function () {
        const pre = 'ARCH';
        const seedNum = Math.floor(Math.random() * 65535);
        const seed = seedNum.toString(16).toUpperCase().padStart(4, '0');
        const hashVal = ((seedNum ^ this._salt) * 13) >>> 0;
        const hash = hashVal.toString(16).toUpperCase();
        const fullStr = pre + seed + hash;
        const csum = (this.hash(fullStr) % 255).toString(16).toUpperCase();
        return `${pre}-${seed}-${hash}-${csum}`;
    }
};
