import { useState } from 'react';
// icons
import playIcon from '@iconify/icons-carbon/play';
import chevronRight from '@iconify/icons-carbon/chevron-right';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Container, Box, Grid, Divider, Button } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// theme
import { ColorSchema } from '../../../theme/palette';
// _data
import _mock from '../../../../_data/mock';
// assets
import { ElearningHeroIllustration } from '../../../assets';
// components
import { Iconify, TextIconLabel, PlayerWithButton, Image } from '../../../components';
import { FabButtonAnimate } from '../../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled(Stack)(({ theme }) => ({
  overflow: 'hidden',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: theme.spacing(15),
  },
}));

// ----------------------------------------------------------------------

export default function ElearningLandingHero() {
  const [openVideo, setOpenVideo] = useState(false);

  const handleOpenVideo = () => {
    setOpenVideo(true);
  };

  const handleCloseVideo = () => {
    setOpenVideo(false);
  };

  return (
    <>
      <RootStyle>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={5}>
              <Stack
                sx={{
                  textAlign: { xs: 'center', md: 'unset' },
                }}
              >
                <Typography variant="h1">
                  Quality{' '}
                  <Box component="span" sx={{ color: 'primary.main', textDecoration: 'underline' }}>
                  Reliable
                  </Box>
                  {' '}Roofing From
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    {' '}
                    Experts{' '}
                  </Box>
                </Typography>

                <Typography sx={{ color: 'text.secondary', mt: 3, mb: 5 }}>
                We have the skills, knowledge and experience to manage any roofing project. we pride ourselves on having a reputation for courteous, professional service and a dedication to health and safety.
                </Typography>

                <Stack spacing={3} alignItems="center" direction={{ xs: 'column', md: 'row' }}>
                  <Button
                    size="large"
                    variant="contained"
                    endIcon={<Iconify icon={chevronRight} />}
                  >
                    Talk to Us
                  </Button>
                  <TextIconLabel
                    icon={
                      <FabButtonAnimate color="secondary" sx={{ mr: 2 }}>
                        <Iconify icon={playIcon} />
                      </FabButtonAnimate>
                    }
                    value="Watch Video"
                    onClick={handleOpenVideo}
                    justifyContent={{ xs: 'center', sm: 'unset' }}
                    sx={{
                      cursor: 'pointer',
                      typography: 'h6',
                      '&:hover': { opacity: 0.72 },
                    }}
                  />
                </Stack>

                <Divider sx={{ borderStyle: 'dashed', mt: 8, mb: 6 }} />

                <SummarySection />
              </Stack>
            </Grid>

            <Grid item xs={12} md={6} lg={7} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{pl:15, borderRadius:50}}>
              <Image alt='hero' src="https://kpyoungroofing.vercel.app/assets/Portfolio/CDC_Hero2@2x.png" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>

      <PlayerWithButton open={openVideo} onClose={handleCloseVideo} videoPath={_mock.video} />
    </>
  );
}

// ----------------------------------------------------------------------

function SummarySection() {
  return (
    <Stack
      spacing={{ xs: 3, sm: 10 }}
      direction="row"
      justifyContent={{ xs: 'center', md: 'unset' }}
    >
      {SummaryItem(14000, 'Instalations', 'warning')}
      {SummaryItem(5000050, 'Turned over', 'error')}
      {SummaryItem(35, 'Years in business', 'success')}
    </Stack>
  );
}

function SummaryItem(total: number, label: string, color: ColorSchema) {
  return (
    <Stack spacing={0.5} sx={{ position: 'relative' }}>
      <Box
        sx={{
          top: 8,
          left: -4,
          width: 24,
          height: 24,
          zIndex: -1,
          opacity: 0.24,
          borderRadius: '50%',
          position: 'absolute',
          bgcolor: (theme) => theme.palette[color].main,
        }}
      />
      <Typography variant="h3">{fShortenNumber(total)}+</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
    </Stack>
  );
}
