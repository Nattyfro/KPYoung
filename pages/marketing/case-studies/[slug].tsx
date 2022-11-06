import { ReactElement } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
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
import { Page, Markdown, Breadcrumbs, TextIconLabel, Iconify } from '../../../src/components';
// sections
import { NewsletterMarketing } from '../../../src/sections/newsletter';
import { TestimonialsMarketing } from '../../../src/sections/testimonials';
import {
  MarketingFreeSEO,
  MarketingCaseStudySummary,
  MarketingCaseStudiesSimilar,
  MarketingAboutOurVision,
  CaseStudiesGallery,
} from '../../../src/sections/@marketing';
import checkmarkIcon from '@iconify/icons-carbon/checkmark';

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

  const { title, coverImg, galleryImgs, includes } = frontmatter;

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

          {/* <Stack spacing={3} sx={{ mb: 8, mx: 'auto', maxWidth: 600, textAlign: 'center' }}>
            <Typography variant="h2">{title}</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Over the years we have built up a collection of creditable building contracts, feel
              free to contact them and ask about our workmanship
            </Typography>
          </Stack> */}

          <Grid
            container
            spacing={{ md: 8 }}
            direction={{ md: 'row' }}
            sx={{
              pb: { xs: 10, md: 15 },
            }}
          >
            <Grid item xs={12} md={4}>
              <MarketingCaseStudySummary frontmatter={frontmatter} />
            </Grid>
            <Grid item xs={12} md={8}>
              <MarketingAboutOurVision />
            </Grid>
          </Grid>
          <Typography variant="h4" paragraph>
            Project Includes
          </Typography>

          <Box
            sx={{
              display: 'grid',
              rowGap: 2,
              p: 2,
              columnGap: 0,
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              },
            }}
          >
            {includes.map((option) => (
              <TextIconLabel
                key={option.label}
                icon={
                  <Iconify
                    icon={checkmarkIcon}
                    sx={{
                      mr: 2,
                      width: 20,
                      height: 20,
                      color: 'primary.main',
                      ...(!option.enabled && { color: 'currentColor' }),
                    }}
                  />
                }
                value={option.label}
                sx={{
                  ...(!option.enabled && { color: 'text.disabled' }),
                }}
              />
            ))}
          </Box>

          <CaseStudiesGallery images={galleryImgs} />
        </Container>

        <TestimonialsMarketing testimonials={_testimonials} />

        <MarketingCaseStudiesSimilar caseStudies={caseStudies.slice(0, 3)} />

        <MarketingFreeSEO />

        <NewsletterMarketing />
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
