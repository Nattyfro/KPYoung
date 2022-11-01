// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
// _data
import _mock from '../../../../_data/mock';
// components
import { PlayerWithImage } from '../../../components';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5),
  },
}));

// const TypographyStyle = styled(Typography)(({ theme }) => ({
//   textAlign: 'center',
//   [theme.breakpoints.up('md')]: {
//     left: 0,
//     right: 0,
//     zIndex: 9,
//     margin: 'auto',
//     position: 'absolute',
//     color: theme.palette.common.white,
//   },
// }));

// ----------------------------------------------------------------------

export default function MarketingAboutOurVision() {
  return (
    <>
      <RootStyle>
        <Container sx={{ position: 'relative' }}>
          {/* <TypographyStyle variant="h2" sx={{ mb: 5, top: { md: 80 } }}>
            Our Story
          </TypographyStyle> */}

          <Box sx={{ mx: 20 }}>
            <PlayerWithImage
              imgPath="https://kpyoungroofing.vercel.app/assets/Movies/Images/Thumbnail.png"
              videoPath="https://www.youtube.com/embed/eAgAnhkVvhE"
            />
          </Box>
          

          {/* <TypographyStyle
            variant="h4"
            sx={{ mt: 5, maxWidth: 564, bottom: { md: 80 }, opacity: { md: 0.72 } }}
          >
            Our vision offering the best product nulla vehicula tortor scelerisque ultrices
            malesuada.
          </TypographyStyle> */}
        </Container>
      </RootStyle>
    </>
  );
}
