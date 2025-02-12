import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections
import ProductNewEditForm from '../../sections/@dashboard/e-commerce/ProductNewEditForm';
import dummyProducts from './dummyData1';
// sections
import {ChallengeNewEditForm} from '../../sections/@dashboard/e-commerce/challenges';
// ----------------------------------------------------------------------

export default function ChallengeEditPage() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const { name } = useParams();
  const [currentProduct, setCurrentProduct] = useState();
  // const currentProduct = useSelector((state) =>
  //   state.product.products.find((product) => paramCase(product.name) === name)
  // );
  useEffect(() => {
    setCurrentProduct(dummyProducts.find((product) => paramCase(product.productName) === name) )
  }, [name]);
  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);
console.log("currentProduct",currentProduct)
  return (
    <>
      <Helmet>
        <title> Challenges: Edit | IQED</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Challenges"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Challenges',
              href: PATH_DASHBOARD.challenge.root,
            },
            { name: currentProduct?.productName},
          ]}
        />

        <ChallengeNewEditForm isEdit currentProduct={currentProduct} />
      </Container>
    </>
  );
}
