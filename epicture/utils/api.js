const apiKey = "234799096cc962efbde690893d69edc89fb8afb7"
const clientId = "cbd2e2ae6f404a8"

module.exports = {
    getViral() {
        return fetch("https://api.imgur.com/3/gallery/hot/viral/0.json", {
            headers: {
                Authorization: 'Client-ID ' + clientId
            }
        })
            .then((response) => {
                return response.json()
            })
    },

    getImagesWithTag(tag, sort)
    {
        return fetch(`https://api.imgur.com/3/gallery/search/viral?q=cat`, {
            headers: {
                Authorization: 'Client-ID ' + clientId
            }
        })
            .then((response) => {
                return response.json()
            })
    }
}