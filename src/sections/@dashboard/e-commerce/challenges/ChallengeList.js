import PropTypes from 'prop-types';
// @mui
import { Box } from '@mui/material';
// components
import { SkeletonProductItem } from '../../../../components/skeleton';
//
import ChallengeCard from './ChallengeCard';

// ----------------------------------------------------------------------

ChallengeList.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.array,
};

export default function ChallengeList({ products, loading, ...other }) {
  console.log(products)
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
      {...other}
    >
      {(loading ? [...Array(12)] : products).map((product, index) =>
        product ? (
          <ChallengeCard key={product._id} product={product} />
        ) : (
          <SkeletonProductItem key={index} />
        )
      )}
    </Box>
  );
}
