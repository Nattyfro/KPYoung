import { useRef } from 'react';
import Slider from 'react-slick';
import { m } from 'framer-motion';
// next
import NextLink from 'next/link';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Grid,
  List,
  Link,
  ListItem,
  BoxProps,
  ListItemProps,
  ListSubheader,
  ListSubheaderProps,
} from '@mui/material';
// config
import { HEADER_DESKTOP_HEIGHT } from '../../config';
// @types
import { NavDesktopMenuProps } from '../../@types/layout';
//
import { Image, CarouselDots } from '../../components';
import { DialogAnimate, MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

interface SubLinkStyleProps extends ListItemProps {
  active?: boolean;
}

interface IconBulletStyleProps extends BoxProps {
  active?: boolean;
}

const SubLinkStyle = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'active',
})<SubLinkStyleProps>(({ active, theme }) => ({
  ...theme.typography.body3,
  padding: 0,
  width: 'auto',
  cursor: 'pointer',
  color: theme.palette.text.secondary,
  transition: theme.transitions.create('color'),
  '&:hover': {
    color: theme.palette.text.primary,
  },
  ...(active && {
    ...theme.typography.subtitle3,
    color: theme.palette.text.primary,
  }),
}));

const IconBulletStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<IconBulletStyleProps>(({ active, theme }) => ({
  width: 12,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  '&:before': {
    content: '""',
    display: 'block',
    width: 4,
    height: 4,
    borderRadius: '50%',
    backgroundColor: theme.palette.text.disabled,
  },
  ...(active && {
    '&:before': {
      content: '""',
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: theme.palette.primary.main,
      transition: theme.transitions.create('all', {
        duration: theme.transitions.duration.shortest,
      }),
    },
  }),
}));

const ListSubheaderStyled = styled((props: ListSubheaderProps) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.h5,
  marginBottom: theme.spacing(2.5),
  color: theme.palette.text.primary,
}));

// ----------------------------------------------------------------------

export default function NavDesktopMenu({
  lists,
  isOpen,
  onClose,
  isScrolling,
}: NavDesktopMenuProps) {

  const theme = useTheme();

  const carouselRef = useRef<Slider | null>(null);

  const carouselList = lists.filter((list) => list.subheader !== 'Common');


  const carouselSettings = {
    arrows: false,
    dots: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots(),
  };


  return (
    <DialogAnimate
      hideBackdrop
      maxWidth={false}
      open={isOpen}
      onClose={onClose}
      variants={
        varFade({
          distance: 80,
          durationIn: 0.16,
          durationOut: 0.24,
          easeIn: 'easeIn',
          easeOut: 'easeOut',
        }).inRight
      }
      PaperProps={{
        sx: {
          m: 0,
          maxWidth: 1,
          position: 'absolute',
          borderRadius: '0 !important',
          top: isScrolling ? HEADER_DESKTOP_HEIGHT - 20 : HEADER_DESKTOP_HEIGHT,
          // Fix scroll on window
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        },
      }}
    >
      <Grid container columns={15} spacing={4}>
        <Grid item xs={12}>
          <Box sx={{ position: 'relative', px: 2, py: 6 }}>
            <Slider ref={carouselRef} {...carouselSettings}>
              {carouselList.map((list) => {
                const { subheader, items, cover } = list;

                const path = items.length > 0 ? items[0].path : '';

                return (
                  <List key={subheader} disablePadding sx={{ px: 2 }} component={MotionContainer}>
                    <m.div variants={varFade({ distance: 80 }).inLeft}>
                      <ListSubheaderStyled>{subheader}</ListSubheaderStyled>
                    </m.div>

                      <NextLink href={path} passHref>
                        <Box
                          component={m.a}
                          variants={varFade({ distance: 80 }).inLeft}
                          sx={{ display: 'block' }}
                        >
                          <Image
                            alt={cover}
                            src={cover}
                            sx={{
                              mb: 2.5,
                              minHeight: 80,
                              borderRadius: 1.5,
                              cursor: 'pointer',
                              transition: theme.transitions.create('opacity'),
                              border: (theme) => `solid 1px ${theme.palette.divider}`,
                              '&:hover': { opacity: 0.8 },
                            }}
                          />
                        </Box>
                      </NextLink>

                    {/* <Stack spacing={1.5} alignItems="flex-start">
                      {items?.map((item) => {
                        const { title, path } = item;

                        const active = router.pathname === path || router.asPath === path;

                        return <LinkItem key={title} title={title} href={path} active={active} />;
                      })}
                    </Stack> */}
                  </List>
                );
              })}
            </Slider>

          </Box>
        </Grid>

      </Grid>
    </DialogAnimate>
  );
}

// ----------------------------------------------------------------------

type LinkItemProps = {
  title: string;
  href: string;
  active: boolean;
};

function LinkItem({ title, href, active }: LinkItemProps) {
  return (
    <NextLink key={title} href={href} passHref>
      <Link
        color="inherit"
        underline="hover"
        component={m.a}
        variants={
          varFade({
            distance: 12,
            durationIn: 0.16,
            durationOut: 0.12,
            easeIn: 'easeIn',
          }).inRight
        }
      >
        <SubLinkStyle active={active}>
          <IconBulletStyle active={active} />
          {title}
        </SubLinkStyle>
      </Link>
    </NextLink>
  );
}
