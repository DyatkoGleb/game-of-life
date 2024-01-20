class Utils
{
    getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    deepCopy = (obj) => {
        if (obj === null || typeof obj !== 'object') {
            return obj
        }

        if (Array.isArray(obj)) {
            const arrCopy = []

            for (let i = 0; i < obj.length; i++) {
                arrCopy[i] = this.deepCopy(obj[i])
            }

            return arrCopy
        }

        const objCopy = {}

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                objCopy[key] = this.deepCopy(obj[key])
            }
        }

        return objCopy
    }
}