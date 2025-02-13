import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import orderBy from 'lodash/orderBy';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Typography, Stack, Button } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import FormProvider from '../../components/hook-form';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections
import Iconify from '../../components/iconify';
import CartWidget from '../../sections/@dashboard/e-commerce/CartWidget';
import dummyProducts from './dummyData1';
import { ChallengeList, ChallengeSearch, ChallengeSort, ChallengeTagFiltered } from '../../sections/@dashboard/e-commerce/challenges';
import { useGetAllChallengeQuery } from '../../redux/api/User.Api';

// ----------------------------------------------------------------------

export default function ChallengesPage() {
  const { themeStretch } = useSettingsContext();
  const { data: productsdata, isSuccess, refetch } = useGetAllChallengeQuery();
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  // const { products, checkout } = useSelector((state) => state.product);

  const [openFilter, setOpenFilter] = useState(false);

  const defaultValues = {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: [0, 200],
    rating: '',
    sortBy: 'featured',
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    watch,
    formState: { dirtyFields },
  } = methods;

  const isDefault =
    (!dirtyFields.gender &&
      !dirtyFields.category &&
      !dirtyFields.colors &&
      !dirtyFields.priceRange &&
      !dirtyFields.rating) ||
    false;

  const values = watch();

  const dataFiltered = applyFilter(products, values);

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);
  useEffect(() => {
    if (isSuccess && productsdata?.challenges) {
      setProducts(productsdata.challenges);
    }
  }, [isSuccess, productsdata]);


  const handleResetFilter = () => {
    reset();
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Challenges | IQED</title>
      </Helmet>

      <FormProvider methods={methods}>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <CustomBreadcrumbs
            heading="Challenges"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              {
                name: 'Challenges',
                href: PATH_DASHBOARD.challenge.root,
              },
              { name: 'Cards' },
            ]}
            action={
              <Button
                component={RouterLink}
                to={PATH_DASHBOARD.challenge.new}
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                New Product
              </Button>
            }
          />
          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            {/* <ChallengeSearch/> */}

            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
              {/* <challengeFilterDrawer
                isDefault={isDefault}
                open={openFilter}
                onOpen={handleOpenFilter}
                onClose={handleCloseFilter}
                onResetFilter={handleResetFilter}
              /> */}
              <ChallengeSort />
            </Stack>
          </Stack>

          <Stack sx={{ mb: 3 }}>
            {!isDefault && (
              <>
                <Typography variant="body2" gutterBottom>
                  <strong>{dataFiltered.length}</strong>
                  &nbsp;Products found
                </Typography>

                <ChallengeTagFiltered isFiltered={!isDefault} onResetFilter={handleResetFilter} />
              </>
            )}
          </Stack>

          <ChallengeList products={dataFiltered} loading={!products.length && isDefault} />

          {/* <CartWidget totalItems={checkout.totalItems} /> */}
        </Container>
      </FormProvider>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter(products, filters) {
  const { gender, category, colors, priceRange, rating, sortBy } = filters;

  const min = priceRange[0];

  const max = priceRange[1];


  if (sortBy === 'newest') {
    products = orderBy(products, ['createdAt'], ['desc']);
  }

  if (sortBy === 'priceDesc') {
    products = orderBy(products, ['eligibleGem'], ['desc']);
  }

  if (sortBy === 'priceAsc') {
    products = orderBy(products, ['eligibleGem'], ['asc']);
  }

  // FILTER PRODUCTS
  if (gender.length) {
    products = products.filter((product) => gender.includes(product.gender));
  }

  if (category !== 'All') {
    products = products.filter((product) => product.category === category);
  }

  if (colors.length) {
    products = products.filter((product) => product.colors.some((color) => colors.includes(color)));
  }

  if (min !== 0 || max !== 200) {
    products = products.filter((product) => product.price >= min && product.price <= max);
  }

  if (rating) {
    products = products.filter((product) => {
      const convertRating = (value) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return product.totalRating > convertRating(rating);
    });
  }

  return products;
}
