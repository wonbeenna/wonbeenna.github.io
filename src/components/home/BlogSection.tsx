import Link from 'next/link';
import { getAllPost } from '@/utils/getPost';
import Section from '@/components/common/Section';
import FeaturedPostCard from '@/components/home/FeaturedPostCard';
import RemainingPostList from '@/components/home/RemainingPostList';

const BlogSection = async () => {
  const { posts } = await getAllPost({ limit: 7 });

  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <Section>
      <Link href="/blog" className="inline-block">
        <h1 className=" text-5xl font-extrabold tracking-tight text-gray900">BLOG</h1>
      </Link>

      <FeaturedPostCard post={featuredPost} />
      <RemainingPostList posts={remainingPosts} />

      <Link href="/blog" className="btn-learn-more mt-12">
        ALL POSTS
      </Link>
    </Section>
  );
};

export default BlogSection;
