// // Browser console-friendly code for testing Contentful API
// // Copy this entire file and paste into your browser console

// // Replace these with your actual values
// const SPACE_ID = "9ve70g19eyyj"; // Your Contentful space ID
// const ACCESS_TOKEN = ""; // Add your access token when pasting in console

// // Fetch all blog posts
// async function fetchAllBlogPosts() {
//   const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=pageBlogPost&access_token=${ACCESS_TOKEN}`;

//   const response = await fetch(url);
//   const data = await response.json();
//   console.log("All blog posts raw data:", data);

//   // Process the data to have a similar structure to the SDK
//   const processedBlogs = data.items.map((item) => {
//     // Get the fields directly
//     const fields = item.fields;

//     // Process linked assets (images)
//     if (fields.featuredImage && fields.featuredImage.sys) {
//       const assetId = fields.featuredImage.sys.id;
//       const asset = data.includes.Asset.find((a) => a.sys.id === assetId);
//       fields.featuredImage = asset;
//     }

//     // Process linked entries (author)
//     if (fields.author && fields.author.sys) {
//       const authorId = fields.author.sys.id;
//       const author = data.includes.Entry.find((e) => e.sys.id === authorId);

//       // Also process author's avatar if exists
//       if (author && author.fields.avatar && author.fields.avatar.sys) {
//         const avatarId = author.fields.avatar.sys.id;
//         const avatar = data.includes.Asset.find((a) => a.sys.id === avatarId);
//         author.fields.avatar = avatar;
//       }

//       fields.author = author;
//     }

//     return fields;
//   });

//   console.log("Processed blog data:", processedBlogs);
//   return processedBlogs;
// }

// // Fetch a single blog post by slug
// async function fetchBlogPostBySlug(slug) {
//   const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?content_type=pageBlogPost&fields.slug=${slug}&access_token=${ACCESS_TOKEN}`;

//   const response = await fetch(url);
//   const data = await response.json();
//   console.log("Blog post by slug raw data:", data);

//   if (!data.items.length) {
//     console.log("No blog post found with the given slug");
//     return null;
//   }

//   // Get the first matching blog post
//   const blog = data.items[0];
//   const fields = blog.fields;

//   // Process linked assets (images)
//   if (fields.featuredImage && fields.featuredImage.sys) {
//     const assetId = fields.featuredImage.sys.id;
//     const asset = data.includes.Asset.find((a) => a.sys.id === assetId);
//     fields.featuredImage = asset;
//   }

//   // Process linked entries (author)
//   if (fields.author && fields.author.sys) {
//     const authorId = fields.author.sys.id;
//     const author = data.includes.Entry.find((e) => e.sys.id === authorId);

//     // Also process author's avatar if exists
//     if (author && author.fields.avatar && author.fields.avatar.sys) {
//       const avatarId = author.fields.avatar.sys.id;
//       const avatar = data.includes.Asset.find((a) => a.sys.id === avatarId);
//       author.fields.avatar = avatar;
//     }

//     fields.author = author;
//   }

//   // Process embedded content in blog content
//   if (fields.content && fields.content.content) {
//     fields.content.content = fields.content.content.map((node) => {
//       if (
//         node.nodeType === "embedded-entry-block" &&
//         node.data &&
//         node.data.target &&
//         node.data.target.sys
//       ) {
//         const entryId = node.data.target.sys.id;
//         const entry = data.includes.Entry.find((e) => e.sys.id === entryId);

//         if (entry && entry.fields.image && entry.fields.image.sys) {
//           const imageId = entry.fields.image.sys.id;
//           const image = data.includes.Asset.find((a) => a.sys.id === imageId);
//           entry.fields.image = image;
//         }

//         node.data.target = entry;
//       }
//       return node;
//     });
//   }

//   console.log("Processed single blog post:", fields);
//   return fields;
// }

// console.log("Contentful fetch functions loaded!");
// console.log("To fetch all blogs, run: fetchAllBlogPosts()");
// console.log(
//   'To fetch a single blog by slug, run: fetchBlogPostBySlug("your-blog-slug")'
// );

// Example usage:
// fetchAllBlogPosts()
//   .then(blogs => console.log('All blogs data (processed):', blogs))
//   .catch(error => console.error('Error fetching blogs:', error));

// fetchBlogPostBySlug("how-ar-will-transform-our-lives-in-2050")
//   .then(blog => console.log('Single blog data (processed):', blog))
//   .catch(error => console.error('Error fetching blog:', error));
