window.addEventListener('load', async () => {
    const htmlFromString = (html) => {
        const el = document.createElement('template')
        el.innerHTML = html
        return el.content.childNodes
    }
    const updateList = (data, id) => {
        data.forEach((site) => {
            let template = [
                `<div class="widget--body topanswers-site">
            <img src="${site.logo_url}" height="32" width="32" alt />
            <a href="${site.canonical_url}" target="_blank" rel="noopener noreferrer">${site.name}</a>
        </div>`,
                `<div class="grid--cell is-4 is-6-md is-12-sm">
    <div class="widget">
        <div class="widget--header is-complex">
            <div class="has-text-align-center has-font-weight-bold has-font-size-display">
                <a href="${site.canonical_url}"
                    style="display: flex; align-items: center; justify-content: center;">
                        <img src="${site.logo_url}" alt="Meta" style="height: 1.5em">
                </a>
            </div>
        </div>
        <div class="widget--body">
            <p>${site.description}</p>
        </div>
        <div class="widget--footer">
            <a href="${site.canonical_url}" class="button is-filled">Visit the site</a>
        </div>
    </div>
</div>`,
            ]
            const elements = htmlFromString(template[id])
            elements.forEach((el) =>
                id
                    ? codidact_list.appendChild(el)
                    : topanswers_list.appendChild(el)
            )
        })
    }

    const topAns_URL = 'https://topanswers.xyz/communities.json'
    const codidact_URL = './communities.json'
    const codidact_list = document.querySelector('.community-list')
    const topanswers_list = document.querySelector('.js-topanswers-list')

    const resp2 = await fetch(codidact_URL, {
        headers: {
            Accept: 'application/json',
        },
    })
    if (resp2.status === 200) {
        const data = await resp2.json()
        //add communities from json excluding first three communities (already existing for JS disabled users)
        updateList(data.slice(3), 1)
    }

    try {
        const resp = await fetch(topAns_URL, {
            headers: {
                Accept: 'application/json',
            },
        })

        if (resp.status === 200) {
            const data = await resp.json()
            updateList(data, 0)
        }
    } catch (e) {
        const error = `<div class="notice is-danger">
            <p>Couldn't load TopAnswers communities right now. Visit the <a href="https://topanswers.xyz/" target="_blank" rel="noopener noreferrer">TopAnswers homepage</a>
            to see the communities available there.</p>
        </div>`
        const el = htmlFromString(error)
        topanswers_list.appendChild(el[0])
    }
})
