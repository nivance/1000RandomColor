
export const navigation = {
  legal: [
    { name: 'Terms of Service', href: '/termsofservice' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  friendsMenu: [
    // { name: 'Convert webp to jpg', href: '/convert-webp-to-jpg' },
  ],
};



const buildConfig = () => {
    // const blogId = process.env.NEXT_PUBLIC_BLOG_ID;
    return {
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
      googleId: process.env.NEXT_PUBLIC_GOOGLE_ID || "",
    };
};
  
export const config = buildConfig();
