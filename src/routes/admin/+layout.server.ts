import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ request, cookies }) => {
    let rawURL = request.url;
    let url = new URL(rawURL);
    let path = url.pathname;

    // Check if admin cookie is set
    if (cookies.get('admin') !== 'true' && path != "/admin") {
        throw redirect(301, "/admin")
    }
}