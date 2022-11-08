import { ReactElement } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// routes
import Routes from '../../../src/routes';
// utils
import {
  getCaseStudyData,
  getAllCaseStudies,
  getCaseStudiesSlugs,
} from '../../../src/utils/get-mardown/marketing/case-studies';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config';
// @types
import { CaseStudyProps } from '../../../src/@types/marketing';
// _data
import { _testimonials } from '../../../_data/mock';
// layouts
import Layout from '../../../src/layouts';
// components
import { Page, Breadcrumbs, varFade } from '../../../src/components';
// sections
import { TestimonialsMarketing } from '../../../src/sections/testimonials';
import {
  MarketingCaseStudiesSimilar,
  CaseStudiesGallery,
} from '../../../src/sections/@marketing';
import { m } from 'framer-motion';
import ProjectSummary from '../../../src/sections/@Roofing/landing/ProjectSummary';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

type Props = {
  caseStudy: CaseStudyProps;
  caseStudies: CaseStudyProps[];
};

export default function MarketingCaseStudyPage({ caseStudies, caseStudy }: Props) {
  const { frontmatter } = caseStudy;

  const { title, description, coverImg, galleryImgs, includes } = frontmatter;

  return (
    <Page
      title={`${title} - Case Study`}
      meta={
        <>
          <meta property="og:image" content={coverImg} />
        </>
      }
    >
      <RootStyle>
        <Container>
          <Breadcrumbs
            sx={{ my: { xs: 5, md: 10 } }}
            links={[
              { name: 'Home', href: '/' },
              { name: 'Portfolio', href: Routes.marketing.caseStudies },
              { name: title },
            ]}
          />

          <Box
            sx={{
              mb: { xs: 8, md: 10 },
              textAlign: 'center',
            }}
          >
            <m.div variants={varFade().inDown}>
              <Typography variant="overline" sx={{ color: 'primary.main' }}>
                Project
              </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography variant="h2" sx={{ mt: 2, mb: 3 }}>
                {title}
              </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
            </m.div>
          </Box>
        </Container>

        <ProjectSummary includes={includes} />

        <Container sx={{ py: 10 }}>
          <Typography variant="h4" paragraph>
            Project Includes
          </Typography>

          <CaseStudiesGallery images={galleryImgs} />
        </Container>

        <TestimonialsMarketing testimonials={_testimonials} />

        <MarketingCaseStudiesSimilar caseStudies={caseStudies.slice(0, 3)} />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

MarketingCaseStudyPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const caseStudy = getCaseStudyData(params.slug);

  return {
    props: {
      caseStudies: getAllCaseStudies(),
      caseStudy: {
        ...caseStudy,
        content: await serialize(caseStudy.content),
      },
    },
  };
}

export async function getStaticPaths() {
  const files = getCaseStudiesSlugs();

  return {
    paths: files,
    fallback: false,
  };
}
