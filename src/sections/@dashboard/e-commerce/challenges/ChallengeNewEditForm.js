import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
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

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    images: Yup.array().min(1, 'At least one image is required'),
    sponsoreName: Yup.string().required('Sponsor Name is required'),
    description: Yup.string().required('Description is required'),
    topic: Yup.string().required('Topic is required'),
    questionCount: Yup.number().required('Questions count is required'),
    participantsCount: Yup.number().required('Participants Count is required'),
    time: Yup.number()
      .required('Test time is required'),
    eligibleGem: Yup.number()
      .moreThan(0, 'Eligible Gem must be greater than 0')
      .required('Eligible Gem is required'),
  });
  

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.productName || '',
      description: currentProduct?.description || '',
      images: currentProduct?.Image || [],
      sponsoreName: currentProduct?.sponsoreName || '',
      title: currentProduct?.title || '',
      eligibleGem: currentProduct?.eligibleGem || 0,
      time: currentProduct?.TestTime || 0,
      questionCount: currentProduct?.QuestionCount || 0,
      participantsCount: currentProduct?.participantsCount || 0,
      active: currentProduct?.Active || true,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.eCommerce.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = (inputFile) => {
    const filtered = values.images && values.images?.filter((file) => file !== inputFile);
    setValue('images', filtered);
  };

  const handleRemoveAllFiles = () => {
    setValue('images', []);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="Product Name" />
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Description
                </Typography>
                <RHFTextField name="description"  multiline rows={4} />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Banner
                </Typography>

                <RHFUpload
                  multiple
                  thumbnail
                  name="images"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemoveFile}
                  onRemoveAll={handleRemoveAllFiles}
                  onUpload={() => console.log('ON UPLOAD')}
                />
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <RHFSwitch name="active" label="In Live" />

              <Stack spacing={3} mt={2}>
                <RHFTextField name="sponsoreName" label="Sponsored By" />

                {/* <RHFTextField name="sku" label="Product SKU" /> */}

                {/* <Stack spacing={1}>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Gender
                  </Typography>

                  <RHFRadioGroup row spacing={4} name="gender" options={GENDER_OPTION} />
                </Stack> */}

                <RHFSelect native name="topic" label="Topic">
                  <option value="" />
                  {CATEGORY_OPTION.map((category) => (
                    <optgroup key={category.group} label={category.group}>
                      {category.classify.map((classify) => (
                        <option key={classify} value={classify}>
                          {classify}
                        </option>
                      ))}
                    </optgroup>
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
                  name="questionCount"
                  label="Questions Count"
                  onChange={(event) =>
                    setValue('QCount', Number(event.target.value), { shouldValidate: true })
                  }
                  InputProps={{
                    type: 'number',
                  }}
                />
                <RHFTextField
                  name="time"
                  label="Test Time"
                  onChange={(event) =>
                    setValue('time', Number(event.target.value), { shouldValidate: true })
                  }
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
                  onChange={(event) =>
                    setValue('gemCount', Number(event.target.value), { shouldValidate: true })
                  }
                  InputProps={{
                    type: 'number',
                  }}
                />
                <RHFTextField
                  name="participantsCount"
                  label="Participants Count"
                  onChange={(event) =>
                    setValue('participantsCount', Number(event.target.value), { shouldValidate: true })
                  }
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
