window.addEventListener('load', async () => {
    const htmlFromString = (html) => {
        const el = document.createElement('template');
        el.innerHTML = html;
        return el.content.childNodes;
    };

    const updateList = (data, id) => {
        let communityList = [
            ...document.querySelectorAll('.community-list .widget'),
        ].map((v) => v.getAttribute('data-name'));

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
            ];
            const elements = htmlFromString(template[id]);
            elements.forEach((el) => {
                id
                    ? !communityList.includes(site.url_slug) &&
                      codidactList.prepend(el)
                    : topAnswersList.appendChild(el);
            });
        });
    };

    const topAnswersUrl = 'https://topanswers.xyz/communities.json';
    const codidactUrl = '/communities.json';
    const codidactList = document.querySelector('.community-list');
    const topAnswersList = document.querySelector('.js-topanswers-list');

    const codidactRespond = await fetch(codidactUrl, {
        headers: {
            Accept: 'application/json',
        },
    });

    if (codidactRespond.status === 200) {
        const data = await codidactRespond.json();
        updateList(data, 1);
    }

    try {
        const topAnsRespond = await fetch(topAnswersUrl, {
            headers: {
                Accept: 'application/json',
            },
        });

        if (topAnsRespond.status === 200) {
            const data = await topAnsRespond.json();
            updateList(data, 0);
        }
    } catch (e) {
        const error = `
        <div class="notice is-danger">
            <p>Couldn't load TopAnswers communities right now. Visit the <a href="https://topanswers.xyz/" target="_blank" rel="noopener noreferrer">TopAnswers homepage</a>
            to see the communities available there.</p>
        </div>`;
        const el = htmlFromString(error);
        topAnswersList.appendChild(el[0]);
    }
});
