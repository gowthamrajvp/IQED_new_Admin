import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, InputAdornment } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFRadioGroup,
  RHFAutocomplete,
} from '../../../../components/hook-form';
import { useCreateChallengeMutation, useGetAllTopicQuery } from '../../../../redux/api/User.Api';

// ----------------------------------------------------------------------

const GENDER_OPTION = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
];

const CATEGORY_OPTION = [
  { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather'] },
  { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats'] },
  { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] },
  { group: 'Acce', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] },
];

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

// ----------------------------------------------------------------------

ChallengeNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function ChallengeNewEditForm({ isEdit, currentProduct }) {
  const navigate = useNavigate();
  const [CreateChallenge] = useCreateChallengeMutation();
  const { data: TotalTopic } = useGetAllTopicQuery();
  const { enqueueSnackbar } = useSnackbar();
  const [imageFile, setimageFile] = useState(null);

  const NewProductSchema = Yup.object().shape({
    productName: Yup.string().required('Product Name is required'),
    sponsoreName: Yup.string().required('Sponsor Name is required'),
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    Topic: Yup.string().required('Topic is required'),
    QuestionCount: Yup.number()
      .required('Questions count is required')
      .min(1, 'Questions count must be at least 1'),
    participantsCount: Yup.number()
      .required('Participants Count is required')
      .min(1, 'Participants Count must be at least 1'),
    TestTime: Yup.number()
      .required('Test time is required')
      .min(1, 'Test time must be at least 1 minute'),
    eligibleGem: Yup.number()
      .required('Eligible Gem is required')
      .min(1, 'must be at least 1 minute'),
  });

  const defaultValues = useMemo(
    () => ({
      productName: currentProduct?.productName || '',
      description: currentProduct?.description || '',
      banner: currentProduct?.banner || [],
      sponsoreName: currentProduct?.sponsoreName || '',
      title: currentProduct?.title || '',
      Topic: currentProduct?.Topic || '',
      eligibleGem: currentProduct?.eligibleGem || 0,
      TestTime: currentProduct?.TestTime || 0,
      QuestionCount: currentProduct?.QuestionCount || 0,
      participantsCount: currentProduct?.participantsCount || 0,
      // Active: currentProduct?.Active || true,
    }),
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
      setValue('images', currentProduct?.banner);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const onSubmit = async (data) => {
    try {
      console.log('Form Data Before Submission:', data);
      
      if (!imageFile) {
        enqueueSnackbar('Image is required', { variant: 'error' });
        console.log('Error: No image file selected');
        return;
      }
  
      const formData = new FormData();
      formData.append('productName', data.productName);
      formData.append('description', data.description);
      formData.append('sponsoreName', data.sponsoreName);
      formData.append('Topic', data.Topic);
      formData.append('title', data.title);
      formData.append('eligibleGem', data.eligibleGem);
      formData.append('TestTime', data.TestTime);
      formData.append('QuestionCount', data.QuestionCount);
      formData.append('participantsCount', data.participantsCount);
      formData.append('file1', imageFile);
  
      console.log('FormData before API call:', Object.fromEntries(formData.entries()));
  
      await CreateChallenge(formData)
        .unwrap()
        .then(async (response) => {
          console.log('API Response:', response);
          await new Promise((resolve) => setTimeout(resolve, 500));
          reset();
          enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
          navigate(PATH_DASHBOARD.challenge.root);
        });
    } catch (error) {
      console.error('Submission Error:', error);
      enqueueSnackbar(error.message || 'Something went wrong', { variant: 'error' });
    }
  };
  
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setimageFile(file);
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      if (file) {
        setValue('images', newFile);

      }
    },
    [setValue]
  );

  const handleRemoveFile = () => {
    setValue('images', null);
  };
  console.log('Form Errors:', methods.formState.errors);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="title" label="Challenge Title" />
              <RHFTextField name="productName" label="Product Name" />
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Description
                </Typography>
                <RHFTextField name="description" multiline rows={4} />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Banner
                </Typography>

                <RHFUpload
                  name="images"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onDelete={handleRemoveFile}
                />
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              {/* <RHFSwitch name="active" label="In Live" /> */}

              <Stack spacing={3} mt={2}>
                <RHFTextField name="sponsoreName" label="Sponsored By" />

                {/* <RHFTextField name="sku" label="Product SKU" /> */}

                {/* <Stack spacing={1}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Gender
                  </Typography>

                  <RHFRadioGroup row spacing={4} name="gender" options={GENDER_OPTION} />
                </Stack> */}

                <RHFSelect native name="Topic" label="Topic">
                  <option value="" />

                  {TotalTopic?.data.map((topic) => (
                    <option key={topic._id} value={topic._id}>
                      {topic.name}
                    </option>
                  ))}
                </RHFSelect>

                {/* <RHFAutocomplete
                  name="tags"
                  label="Tags"
                  multiple
                  freeSolo
                  options={TAGS_OPTION.map((option) => option)}
                  ChipProps={{ size: 'small' }}
                /> */}
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <RHFTextField
                  name="QuestionCount"
                  label="Questions Count"
                  onChange={(event) => setValue('QuestionCount', Number(event.target.value))}
                  InputProps={{
                    type: 'number',
                  }}
                />
                <RHFTextField
                  name="TestTime"
                  label="Test Time"
                  onChange={(event) => setValue('TestTime', Number(event.target.value))}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Box component="span" sx={{ color: 'text.disabled' }}>
                          Min
                        </Box>
                      </InputAdornment>
                    ),
                    type: 'number',
                  }}
                />
                <RHFTextField
                  name="eligibleGem"
                  label="Eligible Gem"
                  onChange={(event) => setValue('eligibleGem', Number(event.target.value))}
                  InputProps={{
                    type: 'number',
                  }}
                />
                <RHFTextField
                  name="participantsCount"
                  label="Participants Count"
                  onChange={(event) => setValue('participantsCount', Number(event.target.value))}
                  InputProps={{
                    type: 'number',
                  }}
                />

                {/* <RHFTextField
                  name="priceSale"
                  label="Sale Price"
                  placeholder="0.00"
                  onChange={(event) => setValue('priceSale', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box component="span" sx={{ color: 'text.disabled' }}>
                          $
                        </Box>
                      </InputAdornment>
                    ),
                    type: 'number',
                  }}
                /> */}
              </Stack>
            </Card>

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? 'Create Product' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
