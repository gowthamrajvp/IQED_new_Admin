import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Stack, Fab, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// redux
// import { useDispatch } from '../../../../redux/store';
import { addToCart } from '../../../../redux/slices/product';
// components
import Iconify from '../../../../components/iconify';
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import { ColorPreview } from '../../../../components/color-utils';
import { useDispatch } from '../../../../redux/store';

// ----------------------------------------------------------------------

// ChallengeCard.propTypes = {
//   product: PropTypes.object,
// };

const product = {

  "_id": "679f88060c7dab944a5c51c5",
  "title": "Prime Numbers",
  "productName": "Sketch Pens 24 Colors",
  "banner": "https://m.media-amazon.com/images/I/81wQoBSXR2L._SX450_.jpg",
  "description": "KLIFFOO Dual Tip Colorful Art Markers Sketch Pens 24 Colors With Carrying Case",
  "sponsoreName": "AllReal",
  "eligibleGem": 100,
  "TestTime": 25,
  "QuestionCount": 30,
  "Active": true,
  "participantsCount": 8,
  "Winners": [],
  "Topic": "678b9dc939053772c9f9303c"

}

export default function ChallengeCard() {
  // const { id, name, cover, price, colors, status, available, sizes, priceSale } = product;
  const { id, title, banner, eligibleGem, participantsCount, productName, description, sponsoreName, TestTime, QuestionCount, Active, } = product;

  const dispatch = useDispatch();

  const linkTo = PATH_DASHBOARD.eCommerce.view(paramCase(productName));

  // const handleAddCart = async () => {
  //   const newProduct = {
  //     id,
  //     name,
  //     cover,
  //     available,
  //     price,
  //     colors: [colors[0]],
  //     size: sizes[0],
  //     quantity: 1,
  //   };
  //   try {
  //     dispatch(addToCart(newProduct));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', p: 1 }}>
        {Active && (
          <Label
            variant="filled"
            color="info"
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {Active ? "Active" : "Inactive"}
          </Label>
        )}

        <Image alt={productName} src={banner} ratio="1/1" sx={{ borderRadius: 1.5 }} />

        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 0.5,
            fontSize: 12,
          }}
        >
          Sponsored by {sponsoreName}
        </Box>
      </Box>
      <Stack spacing={2.5} sx={{ p: 3 }}>
        <Link component={RouterLink} to={linkTo} color="inherit" variant="subtitle2" noWrap>
          {productName}
        </Link>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {description}
        </Typography>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}

          <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
            {/* {priceSale && (
              <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {fCurrency(priceSale)}
              </Box>
            )} */}

            <Box component="span">{eligibleGem}</Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
