import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import InvoiceNewEditForm from '../../sections/@dashboard/invoice/form';
import QuestionNewEditForm from '../../sections/@dashboard/question/form';

// ----------------------------------------------------------------------

export default function QuestionCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Question Creater | IQED</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Upload New Questions"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Questions',
              href: PATH_DASHBOARD.question.list,
            },
            {
              name: 'New Questions',
            },
          ]}
        />



        <QuestionNewEditForm />
      </Container>
    </>
  );
}
