import { ReactElement } from 'react';
// @mui
import { styled } from '@mui/material/styles';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../src/config';
// utils
import { getAllPosts } from '../src/utils/get-mardown/e-learning/posts';
// _data
import { _members, _brandsColor } from '../_data/mock';
// layouts
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
// sections
import { TeamMarketingLangding } from '../src/sections/team';
import { OurClientsElearning } from '../src/sections/our-clients';
import { ElearningLandingHero } from '../src/sections/@e-learning';
import { MarketingAboutOurVision, MarketingServicesBenefits } from '../src/sections/@marketing';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="K P Young Roofing Limited">
      <RootStyle>
        <ElearningLandingHero />

        <OurClientsElearning brands={_brandsColor} />

        <Box sx={{ mx: { sm: 5, md: 20 } }}>
          <MarketingAboutOurVision />
        </Box>

        <TeamMarketingLangding members={_members.slice(0, 4)} />

        <MarketingServicesBenefits />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout simpleFooter>{page}</Layout>;
};

// ----------------------------------------------------------------------

export async function getStaticProps() {
  return {
    props: {
      posts: getAllPosts(),
    },
  };
}
