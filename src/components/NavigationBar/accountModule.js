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
            banner: "https://media.discordapp.net/attachments/914411539887456296/1051051140361498694/image4.png",
            bio: "Welcome to my profile!",
            profilecolor: "#ff8800",
            badges: [0]
        })
        // reject({ error: "Could not find page", errorcode: 404 })
    })
}
module.exports.getBadgeById = (id) => {
    return new Promise((resolve, reject) => {
        resolve({
            name: "Developer Badge",
            url: "devbadge_placeholder.png"
        })
        // reject({ error: "Could not find page", errorcode: 404 })
    })
}

// html tools
module.exports.HTMLTools = {}
module.exports.HTMLTools.calculateFontSizeForMaxCharacters = (cc, mc, dfs) => {
    const defaultFontSize = dfs ? dfs : 16
    return defaultFontSize * (mc / cc)
}
module.exports.HTMLTools.createBadgeHtml = (parent, badgeData, offset) => {
    return createElement("img", parent, badge => {
        badge.title = badgeData.name
        badge.src = badgeData.url
        badge.style.width = "32px"
        badge.style.height = "32px"
        badge.style.position = "absolute"
        badge.style.left = offset + "px"
        badge.style.top = "0px"
    })
}
module.exports.HTMLTools.createProfileHtml = (parent) => {
    return createElement("div", parent, e => {
        // the top area with the avatar and username
        e.profileDisplay = createElement("div", e, pd => {
            pd.style.position = "absolute"
            pd.style.left = "0px"
            pd.style.top = "32px"
            pd.style.backgroundColor = "#ffffff"
            pd.style.width = "100%"
            pd.style.height = "256px"
            // banner image
            pd.bannerHolder = createElement("img", pd, bh => {
                bh.draggable = false
                bh.style.zIndex = 5
                bh.style.position = "absolute"
                bh.style.left = "0px"
                bh.style.top = "0px"
                bh.style.width = "100%"
                bh.style.height = "256px"
                bh.style.objectFit = "cover"
                bh.src = "banner_placeholder.png"
            })
            // the circle border with the profile picture inside
            pd.profilePictureHolder = createElement("div", pd, pph => {
                pph.style.zIndex = 10
                pph.style.position = "absolute"
                pph.style.left = "16px"
                pph.style.top = "calc((256px - 160px) / 2)"
                pph.style.backgroundColor = "#000000"
                pph.style.width = "160px"
                pph.style.height = "160px"
                pph.style.borderRadius = "100%"
                // the profile picture image
                pph.profilePicture = createElement("img", pph, pfp => {
                    pfp.src = "scratch.png"
                    pfp.draggable = false
                    pfp.style.zIndex = 10
                    pfp.style.position = "absolute"
                    pfp.style.left = "4px"
                    pfp.style.top = "4px"
                    pfp.style.width = "calc(160px - 8px)"
                    pfp.style.height = "calc(160px - 8px)"
                    pfp.style.borderRadius = "100%"
                })
            })
            // display & username appear inside this part
            const displayNameWidth = module.exports.HTMLTools.calculateFontSizeForMaxCharacters("DisplayName".length, 32)
            pd.nameHolder = createElement("div", pd, nh => {
                nh.style.zIndex = 10
                nh.style.position = "absolute"
                nh.style.right = "16px"
                nh.style.top = "calc((256px - 160px) / 2)"
                nh.style.backgroundColor = "rgba(0,0,0, 50%)"
                nh.style.width = "58%"
                nh.style.height = "160px"
                // display name
                nh.displayname = createElement("p", nh, displayname => {
                    displayname.style.position = "absolute"
                    displayname.style.left = "4px"
                    displayname.style.top = "4px"
                    displayname.style.width = "calc(100% - 8px)"
                    displayname.style.fontSize = displayNameWidth + "px"
                    displayname.innerHTML = "DisplayName"
                })
                // username
                nh.username = createElement("p", nh, username => {
                    username.style.position = "absolute"
                    username.style.left = "4px"
                    username.style.top = `calc(2px + ${nh.displayname.clientHeight}px)`
                    username.style.width = "calc(100% - 8px)"
                    username.style.fontSize = "14px"
                    username.style.color = "#ffffff"
                    username.style.opacity = "50%"
                    username.innerHTML = "@Username"
                })
                const nameHolderHeight = nh.username.clientHeight + nh.displayname.clientHeight + 8
                nh.style.height = `${nameHolderHeight}px`
                nh.style.top = `calc((256px - ${nameHolderHeight}px) / 2)`
                nh.reposition = () => {
                    const displayNameWidth = module.exports.HTMLTools.calculateFontSizeForMaxCharacters(nh.displayname.innerText.length, 32)
                    nh.displayname.style.fontSize = displayNameWidth + "px"
                    nh.username.style.top = `calc(2px + ${nh.displayname.clientHeight}px)`
                    const nameHolderHeight = nh.username.clientHeight + nh.displayname.clientHeight + 8
                    nh.style.height = `${nameHolderHeight}px`
                    nh.style.top = `calc((256px - ${nameHolderHeight}px) / 2)`
                }
            })
        })
        // a row of all of the badges this user has
        e.badgeDisplay = createElement("div", e, bd => {
            bd.style.position = "absolute"
            bd.style.top = "calc(258px + 32px)"
            bd.style.left = "2px"
            bd.style.backgroundColor = "rgba(255,255,255, 10%)"
            bd.style.width = "calc(100% - 4px)"
            bd.style.height = "32px"
        })
        // user bio/about me
        e.descriptionArea = createElement("div", e, da => {
            da.style.position = "absolute"
            da.style.top = "calc(258px + 66px)"
            da.style.left = "2px"
            da.style.backgroundColor = "rgba(255,255,255, 3%)"
            da.style.width = "calc(100% - 4px)"
            da.style.height = "218px"
            // About Me title
            da.titleElement = createElement("p", da, title => {
                title.style.position = "absolute"
                title.style.top = "2px"
                title.style.left = "2px"
                title.style.opacity = "50%"
                title.style.color = "white"
                title.style.width = "100%"
                title.style.height = "12px"
                title.innerHTML = "About Me"
                title.style.fontSize = "12px"
            })
            // Description area
            da.descriptionElement = createElement("p", da, desc => {
                desc.style.position = "absolute"
                desc.style.top = "16px"
                desc.style.left = "2px"
                desc.style.color = "white"
                desc.style.width = "100%"
                desc.style.height = "100%"
                desc.innerHTML = "Description"
                desc.style.fontSize = "16px"
            })
        })
    })
}

// helper tools
module.exports.HelperTools = {}
module.exports.HelperTools.askForLogin = () => {
    return new Promise((resolve, reject) => {
        module.exports.isSignedIn = true
        resolve(1)
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
        profileArea.profileDisplay.bannerHolder.src = data.banner
        profileArea.profileDisplay.profilePictureHolder.profilePicture.src = data.avatar
        profileArea.profileDisplay.profilePictureHolder.style.backgroundColor = menu.style.backgroundColor
        profileArea.profileDisplay.nameHolder.displayname.innerHTML = cleanStringForHTML(data.displayname)
        profileArea.profileDisplay.nameHolder.username.innerHTML = cleanStringForHTML("@" + data.username)
        profileArea.profileDisplay.nameHolder.reposition()
        profileArea.descriptionArea.descriptionElement.innerHTML = cleanStringForHTML(data.bio)
        let badgeCount = 0
        data.badges.forEach(badgeId => {
            let currentBadgeCount = badgeCount
            console.log("rendering badge", badgeId)
            module.exports.getBadgeById(badgeId).then(data => {
                module.exports.HTMLTools.createBadgeHtml(profileArea.badgeDisplay, data, currentBadgeCount * 32)
            }).catch(err => {
                module.exports.HTMLTools.createBadgeHtml(profileArea.badgeDisplay, { name: JSON.stringify(err), url: "badge_load_fail.png" }, currentBadgeCount * 32)
            })
            badgeCount += 1
        })
    }).catch(err => {
        createElement("p", menu.content, e => {
            e.innerHTML = cleanStringForHTML(JSON.stringify(err))
        })
    })
}