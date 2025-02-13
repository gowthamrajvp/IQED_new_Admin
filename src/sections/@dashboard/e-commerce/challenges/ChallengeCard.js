import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Stack, Fab, Typography, Button } from '@mui/material';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
import { styled } from '@mui/system';
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
// import { IQGemIcon } from '/assets/illustrations';
import { IQGemIcon } from '../../../../assets/illustrations';
import { useDeleteChallengeMutation } from '../../../../redux/api/User.Api';

// ----------------------------------------------------------------------

ChallengeCard.propTypes = {
  product: PropTypes.object,
};

const StatItem = styled(Box)({
  flex: 1,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  justifyContent: 'space-between',
});

const StatRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  // marginTop: 20,
});

// const product = {
//   "_id": "679f88060c7dab944a5c51c5",
//   "title": "Prime Numbers",
//   "productName": "Sketch Pens 24 Colors",
//   "banner": "https://m.media-amazon.com/images/I/81wQoBSXR2L._SX450_.jpg",
//   "description": "KLIFFOO Dual Tip Colorful Art Markers Sketch Pens 24 Colors With Carrying Case",
//   "sponsoreName": "AllReal",
//   "eligibleGem": 100,
//   "TestTime": 25,
//   "QuestionCount": 30,
//   "Active": true,
//   "participantsCount": 8,
//   "Winners": [],
//   "Topic": "678b9dc939053772c9f9303c"
// }

export default function ChallengeCard({ product }) {
  // const { id, name, cover, price, colors, status, available, sizes, priceSale } = product;
  const {
    _id,
    title,
    banner,
    eligibleGem,
    participantsCount,
    productName,
    description,
    sponsoreName,
    TestTime,
    QuestionCount,
    Active,
  } = product;
  const [DeleteChallenge] = useDeleteChallengeMutation();
  const dispatch = useDispatch();

  const linkTo = PATH_DASHBOARD.challenge.edit(paramCase(_id));
  const handleDelete = async (id) => {
    try {
      await DeleteChallenge({challengeId:id}).unwrap();
      console.log('Challenge deleted successfully');
    } catch (error) {
      console.error('Error deleting challenge:', error);
    }
  };
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
            {Active ? 'Active' : 'Inactive'}
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
        <Box>
          <Box display="flex" alignItems="center">
            {/* <Link
              component={RouterLink}
              to={linkTo}
              color="inherit"
              variant="subtitle2"
              noWrap
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            > */}
              {productName}
              {/* <Iconify
                icon="line-md:edit"
                sx={{
                  width: 15,
                  height: 15,
                  // opacity: 0.12,
                  // position: 'absolute',
                  // right: theme.spacing(-3),
                }}
              /> */}
            {/* </Link> */}
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {description}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'left',
            alignItems: 'left',
            borderLeft: 'solid 2px',
            pl: '5px',
            my: '10px',
          }}
        >
          <Typography
            fontWeight="bold"
            sx={{
              fontSize: '8px',
              mb: '2px',
            }}
          >
            Challenge Topic
          </Typography>
          <Typography
            fontWeight="bold"
            sx={{
              fontSize: '13px',
              borderRadius: '10px',
            }}
          >
            {title}
          </Typography>
        </Box>
        <StatRow>
          <StatItem
            sx={{
              borderRight: '1px solid',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {QuestionCount}
            </Typography>
            <Typography
              sx={{
                fontSize: '10px',
                fontWeight: 'bold',
                py: '2px',
              }}
            >
              Total <br />
              MCQ{' '}
            </Typography>
          </StatItem>
          <StatItem
            sx={{
              borderRight: '1px solid',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {TestTime} Min
            </Typography>
            <Typography
              sx={{
                fontSize: '10px',
                fontWeight: 'bold',
                py: '2px',
              }}
            >
              MCQ <br /> Time
            </Typography>
          </StatItem>
          <StatItem>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {participantsCount}
            </Typography>
            <Typography
              sx={{
                fontSize: '10px',
                fontWeight: 'bold',
                py: '2px',
              }}
            >
              Total <br />
              winners
            </Typography>
          </StatItem>
        </StatRow>
        <Stack
          direction="row"
          spacing={2.5}
          alignItems="center"
          justifyContent="center"
          sx={{ typography: 'subtitle1' }}
        >
          <Button color="error" onClick={()=>handleDelete(_id)}>DELETE</Button>

          <Typography
            variant="body"
            fontWeight="bold"
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderLeft: '2px solid',
              pl: '10px',
            }}
          >
            <Box
              component="img"
              src={IQGemIcon}
              alt="Gem Icon"
              sx={{
                height: '18px',
                marginRight: '4px',
              }}
            />
            Gem {eligibleGem}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
