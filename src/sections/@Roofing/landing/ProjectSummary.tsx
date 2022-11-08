// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Container, Grid, Box } from '@mui/material';
// components
import { Iconify, TextIconLabel } from '../../../components';
import { MarketingAboutOurVision } from '../../@marketing';
import { Key } from 'react';
import checkmarkIcon from '@iconify/icons-carbon/checkmark';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(100, 0),
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 0),
  },
}));

type Props = {
  includes: any;
};

// ----------------------------------------------------------------------

export default function ElearningLandingIntroduce({ includes }: Props) {
  return (
    <RootStyle>
      <Container>
        <Grid
          container
          spacing={8}
          alignItems={{ md: 'center' }}
          justifyContent={{ md: 'space-between' }}
        >
          <Grid item xs={12} md={6} lg={7}>
            <MarketingAboutOurVision />
          </Grid>

          <Grid item xs={12} md={6} lg={5}>
            <Box sx={{ width: 24, height: 3, bgcolor: 'primary.main' }} />

            <Typography variant="h3" sx={{ my: 2.5 }}>
              Summary
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 15 }}>
              Curabitur a felis in nunc fringilla tristique. Fusce egestas elit eget lorem. Etiam
              vitae tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos hymenaeos.
            </Typography>

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ xs: 5, md: 10 }}
              sx={{ mt: { xs: 8, md: 5 } }}
            >
              <Box
                sx={{
                  display: 'grid',
                  rowGap: 2,
                  p: 0,
                  columnGap: 15,
                  gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  },
                }}
              >
                {includes.map((option: { label: Key | null | undefined; enabled: any }) => (
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
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
