import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import {ChallengeNewEditForm} from '../../sections/@dashboard/e-commerce/challenges';

// ----------------------------------------------------------------------

export default function ChallengeCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> New challenge | IQED</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new challenge"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Challenges',
              href: PATH_DASHBOARD.challenge.root,
            },
            { name: 'New Challenge' },
          ]}
        />
        <ChallengeNewEditForm />
      </Container>
    </>
  );
}
