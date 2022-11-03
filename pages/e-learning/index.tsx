import { ReactElement } from 'react';
// @mui
import { styled } from '@mui/material/styles';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../src/config';
// utils
import { getAllPosts } from '../../src/utils/get-mardown/e-learning/posts';
// _data
import { _members, _brandsColor } from '../../_data/mock';
// layouts
import Layout from '../../src/layouts';
// components
import { Page } from '../../src/components';
// sections
import { TeamMarketingLangding } from '../../src/sections/team';
import { OurClientsElearning } from '../../src/sections/our-clients';
import { ElearningLandingHero } from '../../src/sections/@e-learning';
import { MarketingAboutOurVision, MarketingServicesBenefits } from '../../src/sections/@marketing';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function ElearningLandingPage() {
  return (
    <Page title="Landing - E-Learning">
      <RootStyle>
        <ElearningLandingHero />
        
        <OurClientsElearning brands={_brandsColor} />

        <MarketingAboutOurVision />

        <TeamMarketingLangding members={_members.slice(0, 4)} />

        <MarketingServicesBenefits />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

ElearningLandingPage.getLayout = function getLayout(page: ReactElement) {
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
