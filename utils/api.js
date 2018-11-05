const apiKey = "234799096cc962efbde690893d69edc89fb8afb7"
const clientId = "cbd2e2ae6f404a8"

/**
 * Thisd is all the api functions
 */

module.exports = {

    uploadImage(data, token, title, description) {

        let formdata = new FormData()

        formdata.append('type', 'base64');
        formdata.append('image', data);
        formdata.append('title', title)
        formdata.append("description", description)


        return fetch("https://api.imgur.com/3/upload.json", {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token


            },
            body: formdata
        })
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .catch((error) => {
                console.log(error)
            })
    },
    deleteImage(name, hash, token)
    {
        return fetch(`https://api.imgur.com/3/account/${name}/image/${hash}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            }

        })
    },
    favoriteAlbum(id, token) {
        return fetch(`https://api.imgur.com/3/album/${id}/favorite`, {
            method: 'POST',
            headers : {
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => {
                return response.json()
            })
    },
    favoriteImage(id, token) {
        return fetch(`https://api.imgur.com/3/image/${id}/favorite`, {
            method: 'POST',
            headers : {
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => {
                return response.json()
            })
    },

    getUserImages(name, token) {
        return fetch(`https://api.imgur.com/3/account/${name}/images/`, {
            headers: {
                Authorization: 'Bearer ' + token

            }
        })
            .then((response) => {
                return response.json()
            })
    },

    getUserFavorites(name, token) {
      return fetch(`https://api.imgur.com/3/account/${name}/favorites/`, {
          headers: {
              Authorization: 'Bearer ' + token

          }
      })
          .then((response) => {
              return response.json()
          })
    },

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
        return fetch(`https://api.imgur.com/3/gallery/search/viral?q=${tag}`, {
            headers: {
                Authorization: 'Client-ID ' + clientId
            }
        })
            .then((response) => {
                return response.json()
            })
    },

    login()
    {
        const url = `https://api.imgur.com/oauth2/authorize?client_id=${clientId}&response_type=token`;
        console.log(url)


        return fetch(url, {
        }).then((response) => {
            console.log(response)
            return response
        })
    }
}

