interface ImageField {
  title: string;
  description: string;
  file: {
    url: string;
    details: {
      size: number;
      image: {
        width: number;
        height: number;
      };
    };
    fileName: string;
    contentType: string;
  };
}

interface Author {
  metadata: {
    tags: [];
    concepts: [];
  };
  fields: {
    internalName: string;
    name: string;
    avatar: {
      fields: ImageField;
    };
  };
}

interface FeaturedImage {
  metadata: {
    tags: [];
    concepts: [];
  };
  fields: ImageField;
}

interface Blog {
  slug: string;
  title: string;
  shortDescription: string;
  publishedDate: string;
  author: Author;
  featuredImage: FeaturedImage;
  relatedBlogPosts: Array<{ fields: Blog }>;
  content: {
    content: Array<any>;
    data: {};
    nodeType: "document";
  };
}
