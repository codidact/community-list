window.addEventListener('load', async () => {
    const htmlFromString = html => {
        const el = document.createElement('template');
        el.innerHTML = html;
        return el.content.childNodes;
    };

    const API_URL = 'https://topanswers.xyz/communities.json';
    const list = document.querySelector('.js-topanswers-list');

    const resp = await fetch(API_URL, {
        headers: {
            'Accept': 'application/json'
        }
    });

    if (resp.status === 200) {
        const data = await resp.json();
        data.forEach(site => {
            const template = `<div class="widget-body topanswers-site">
                <img src="${site.logo_url}" height="32" width="32" alt />
                <a href="${site.canonical_url}" target="_blank" rel="noopener noreferrer">${site.name}</a>
            </div>`;
            const elements = htmlFromString(template);
            elements.forEach(el => list.appendChild(el));
        });
    }
    else {
        const error = `<div class="notice is-danger">
            <p>Couldn't load TopAnswers communities right now. Visit the <a href="https://topanswers.xyz/" target="_blank" rel="noopener noreferrer">TopAnswers homepage</a>
            to see the communities available there.</p>
        </div>`;
        const elements = htmlFromString(error);
        elements.forEach(el => list.appendChild(el));
    }
});