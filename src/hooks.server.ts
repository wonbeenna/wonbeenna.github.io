/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
    const theme = event.cookies.get("siteTheme");

    return await resolve(event, {
        transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme=${theme}`)
    });
}
