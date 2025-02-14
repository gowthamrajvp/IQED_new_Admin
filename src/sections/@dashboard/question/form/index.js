import PropTypes from 'prop-types';
import { useState, useMemo, useEffect } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// mock
import { _invoiceAddressFrom } from '../../../../_mock/arrays';
// components
import FormProvider from '../../../../components/hook-form';
//
import QuestionNewEditDetails from './QuestionNewEditDetails';
import QuestionNewEditAddress from './QuestionNewEditAddress';
import QuestionNewAddSelectTopics from './QuestionNewAddSelectTopics';

// ----------------------------------------------------------------------

QuestionNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentQuestion: PropTypes.object,
};

export default function QuestionNewEditForm({ isEdit, currentQuestion }) {
  const navigate = useNavigate();

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const NewUserSchema = Yup.object().shape({
    topic: Yup.string().nullable().required('topic is required'),
  });

  const defaultValues = useMemo(
    () => ({
      invoiceNumber: currentQuestion?.invoiceNumber || '17099',
      createDate: currentQuestion?.createDate || new Date(),
      dueDate: currentQuestion?.dueDate || null,
      taxes: currentQuestion?.taxes || 0,
      status: currentQuestion?.status || 'draft',
      discount: currentQuestion?.discount || 0,
      invoiceFrom: currentQuestion?.invoiceFrom || _invoiceAddressFrom[0],
      invoiceTo: currentQuestion?.invoiceTo || null,
      items: currentQuestion?.items || [
        { title: '', description: '', service: '', quantity: 1, price: 0, total: 0 },
      ],
      totalPrice: currentQuestion?.totalPrice || 0,
    }),
    [currentQuestion]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentQuestion) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentQuestion]);

  const handleSaveAsDraft = async (data) => {
    setLoadingSave(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSave(false);
      navigate(PATH_DASHBOARD.question.list);
      console.log('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      setLoadingSave(false);
    }
  };

  const handleCreateAndSend = async (data) => {
    setLoadingSend(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSend(false);
      navigate(PATH_DASHBOARD.question.list);
      console.log('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      setLoadingSend(false);
    }
  };

  return (
    <FormProvider methods={methods}>
      <Card>
        {/* <QuestionNewEditAddress /> */}
        
        <QuestionNewAddSelectTopics />

        <QuestionNewEditDetails />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        

        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend && isSubmitting}
          onClick={handleSubmit(handleCreateAndSend)}
        >
          {isEdit ? 'Update' : 'Create'} & Submit
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
