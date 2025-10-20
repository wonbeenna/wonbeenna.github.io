export type Frontmatter = {
  title: string;
  titleImage?: string;
  description?: string;
  date: string | Date;
  category?: string;
  path?: string;
};

export type PostMetaData = {
  slug: string;
  data: Frontmatter;
  modifiedTimeMs: number;
};

export interface Posts {
  posts: PostMetaData[];
  total: number;
}

export type CompiledPost = {
  content: React.ReactElement;
  frontmatter: Frontmatter;
};
