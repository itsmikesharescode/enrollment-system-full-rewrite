import { createServerClient } from '@supabase/ssr';
import type { Handle } from '@sveltejs/kit';
import type { CookieSerializeOptions } from 'cookie';

const supabaseURL: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseKEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseAdminKEY: string = import.meta.env.VITE_SUPABASE_ADMIN_KEY;

export const handle: Handle = async ({ event, resolve, }) => {

    event.locals.supabase = createServerClient(supabaseURL, supabaseKEY, {
        cookies: {
          get: (key) => event.cookies.get(key),
          /**
           * Note: You have to add the `path` variable to the
           * set and remove method due to sveltekit's cookie API
           * requiring this to be set, setting the path to an empty string
           * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
           */
          set: (key, value, options) => {
            event.cookies.set(key, value, { ...options, path: '/' })
          },
          remove: (key, options) => {
            event.cookies.delete(key, { ...options, path: '/' })
          },
        },
      })

    event.locals.supabaseAdmin = createServerClient(supabaseURL, supabaseAdminKEY, {
        cookies: {
            get: (key) => event.cookies.get(key),
            set: (key, value, options ) => {
                event.cookies.set(key, value, options as CookieSerializeOptions & { path: string } )
            },
            remove: (key, options ) => {
                event.cookies.delete(key, options as CookieSerializeOptions & { path: string } )
            },
        },
        
    });

    event.locals.getSession = async () => {
        const {
        data: { session },
        } = await event.locals.supabase.auth.getSession()
        return session
    };

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range'
        },
    });
}