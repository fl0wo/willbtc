export type CTAStyleBlog = {
    title?: string,
    description?: string,
    url?: string, // deprecated using ctaRedirectUrl
    text?: string,  // deprecated using ctaRedirect
    stealthMode?: boolean,

    // if at some point we want to add more fields for stylign add them here
}