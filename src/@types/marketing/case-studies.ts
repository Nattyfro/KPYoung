import { MDXRemoteSerializeResult } from 'next-mdx-remote';
//
import { SocialLinks } from '../socials';

// ----------------------------------------------------------------------

export type CaseStudyFrontmatter = {
  title: string;
  description: string;
  category: string;
  coverImg: string;
  heroImg: string;
  createdAt: Date | string | number;
  galleryImgs: string[];
  website: string;
  socialLinks?: SocialLinks;
    includes: {
    label: string;
    enabled: boolean;
  }[];
};

export type CaseStudyProps = {
  slug: string;
  content: MDXRemoteSerializeResult;
  frontmatter: CaseStudyFrontmatter;
  description: string;
  includes: {
    label: string;
    enabled: boolean;
  }[];
};
