import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _invoices } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import FeedbackDetails from '../../sections/@dashboard/invoice/details/index1';
import { useGetAllFeedbackQuery } from '../../redux/api/Feedback.Api';

// ----------------------------------------------------------------------

export default function FeedbackDetailsPage() {
  const { themeStretch } = useSettingsContext();
   const { data: Feedbackdata, isSuccess } = useGetAllFeedbackQuery();

  const { id } = useParams();

  const currentFeedback = Feedbackdata?.find((Feed) => Feed?._id === id);

  return (
    <>
      <Helmet>
        <title> Invoice: View | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Feedback Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Feedback',
              href: PATH_DASHBOARD.feedback.root,
            },
            { name: `${currentFeedback?._id}` },
          ]}
        />

        <FeedbackDetails feedbackdata={currentFeedback} />
      </Container>
    </>
  );
}
