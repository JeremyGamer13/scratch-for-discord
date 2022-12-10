/* eslint-disable */
// helper modules
const BlocklyModule = require("../../blocks/blocklyModule")

// functions
function createElement(tag, parent, cb) {
    const e = document.createElement(tag)
    if (parent) parent.append(e)
    if (cb) cb(e)
    return e
}
function cleanStringForHTML(str) {
    return String(str).replace(/</gmi, "&lt;")
}

// main variables
module.exports.apiURL = "https://S4DJTPBESystems.jeremygamer13.repl.co/"
module.exports.isSignedIn = false

// main functions
module.exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        resolve({
            username: "JeremyGamer13",
            displayname: "Jeremy",
            avatar: "https://media.discordapp.net/attachments/914411539887456296/1050635912670892083/Untitled528_20221126183923.png?width=676&height=676",
            bio: "Welcome to my profile!",
            profilecolor: "#ff8800",
            badges: [0]
        })
        // reject({ error: "Could not find page", errorcode: 404 })
    })
}

// html tools
module.exports.HTMLTools = {}
module.exports.HTMLTools.createProfileHtml = (parent) => {
    return createElement("div", parent, e => {
        e.profileDisplay = createElement("div", e, pd => {
            pd.style.position = "absolute"
            pd.style.left = "0px"
            pd.style.top = "32px"
            pd.style.backgroundColor = "#ffffff"
            pd.style.width = "100%"
            pd.style.height = "50%"
        })
    })
}

// helper tools
module.exports.HelperTools = {}
module.exports.HelperTools.askForLogin = () => {
    return new Promise((resolve, reject) => {
        module.exports.isSignedIn = true
        resolve()
    })
}
module.exports.HelperTools.showProfileMenu = (id) => {
    const menu = BlocklyModule.menus.createMenu({
        width: 512,
        height: 512,
        title: "User's Profile",
        zindex: 1000,
    })
    module.exports.getUserById(id).then(data => {
        menu.topbar.contentDiv.titleLabel.innerHTML = cleanStringForHTML(data.displayname) + "'s Profile"
        const profileArea = module.exports.HTMLTools.createProfileHtml(menu.content)
    }).catch(err => {
        createElement("p", menu.content, e => {
            e.innerHTML = cleanStringForHTML(JSON.stringify(err))
        })
    })
}