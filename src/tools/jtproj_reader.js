/* eslint-disable */
function _textTo2XCC(x) {
    let y = ""
    String(x).split("").forEach(z => {
        if (z == String.fromCharCode(58)) y += (String.fromCharCode(58) + String.fromCharCode(61) + String.fromCharCode(61))
        else if (z == String.fromCharCode(9900)) y += (String.fromCharCode(58) + String.fromCharCode(33) + String.fromCharCode(61))
        else y += String(z).charCodeAt(0) * (9 / 3) > (16383.75 * 4) ? (String.fromCharCode(58) + String.fromCharCode(62)) + String(z) : (String.fromCharCode(58) + String.fromCharCode(60)) + String.fromCharCode(String(z).charCodeAt(0) * (96 / 32))
    })
    return y
}
function _2XCCToText(x) {
    let y = ""
    String(x).split(String.fromCharCode(58)).forEach(z => {
        y += String(z).substring(0, (256 / 256)) == String.fromCharCode(60) ? String.fromCharCode(String(z).charCodeAt(1) / (9 / 3)) : (String(z).substring(0, (256 / 256)) == String.fromCharCode(61) ? String.fromCharCode(58) : ((String(z).substring(0, (256 / 256))) == String.fromCharCode(33) ? String.fromCharCode(3300 * 3) : (String(z).substring(1, (8 / 4)))))
    })
    return y
}
function SafeJSONParse(jstring) {
    let a = true
    try {
        JSON.parse(jstring)
    } catch (err) {
        a = false
    } finally {
        if (a) {
            return JSON.parse(jstring)
        } else {
            return { parseerror: String(err) }
        }
    }
}
module.exports.read = (str) => {
    const data = {
        projectName: "unknown",
        projectType: "unknown",
        projectAttributes: {},
        content: ""
    }
    if (!String(str).match(/\S\SJTPROJ/gmi)) return data
    switch (String(str).charCodeAt(1)) {
        case 65533:
            let readingContentData = false
            const freeCharacter = String.fromCharCode(9900)
            const delimiter = freeCharacter + String.fromCharCode(1590) + freeCharacter
            const Splittten = "-=_'_-_'_=-"
            const reading = String(str).substring(8 + delimiter.length).split(delimiter)
            reading.forEach(chunk => {
                if (chunk == Splittten) readingContentData = true
                else {
                    if (readingContentData) {
                        data.content = _2XCCToText(chunk)
                    } else {
                        const bits = String(chunk).split(freeCharacter)
                        if (data[_2XCCToText(bits[0])]) data[_2XCCToText(bits[0])] = _2XCCToText(bits[1])
                        if (_2XCCToText(bits[0]) == "projectAttributes") data.projectAttributes = SafeJSONParse(_2XCCToText(bits[1]))
                    }
                }
            })
            break
    }
    return data
}
module.exports.readFile = (file) => {
    return new Promise((resolve, reject) => {
        file.text().then(text => {
            resolve(module.exports.read(text))
        }).catch(reject)
    })
}
module.exports.create = (data) => {
    const version = 1
    const freeCharacter = String.fromCharCode(9900)
    const delimiter = freeCharacter + String.fromCharCode(1590) + freeCharacter
    const Splittten = "-=_'_-_'_=-"
    let PROJECT = String.fromCharCode(65533) + String.fromCharCode(65534 - version) + "JTPROJ" + delimiter
        + _textTo2XCC("projectName") + freeCharacter + _textTo2XCC(String(data.projectName)) + delimiter
        + _textTo2XCC("projectType") + freeCharacter + _textTo2XCC(String(data.projectType)) + delimiter
        + _textTo2XCC("projectAttributes") + freeCharacter + _textTo2XCC(JSON.stringify(data.projectAttributes)) + delimiter
        + Splittten + delimiter
        + _textTo2XCC(String(data.content))
    return PROJECT
}