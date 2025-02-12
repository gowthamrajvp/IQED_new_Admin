import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
import { countries } from '../../../assets/data';
// components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';
import { useUpdateUserMutation } from '../../../redux/api/User.Api';

// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserNewEditForm({ isEdit = false, currentUser }) {
  const [UpdateUser] = useUpdateUserMutation();
  const navigate = useNavigate();
  const [imageFile, setimageFile] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().trim().required('Name is required'),
    userName: Yup.string()
      .trim()
      .matches(/^\S*$/, 'Username cannot contain spaces')
      .required('Username is required'),
    email: Yup.string().trim().email('Invalid email format').required('Email is required'),

    age: Yup.number().min(0, 'Age cannot be negative').required('Age is required'),
    parentsName: Yup.string().trim().notRequired(),
    schoolName: Yup.string().trim().notRequired(),
    grade: Yup.string().trim().notRequired(),
    mobileNumber: Yup.string()
      .trim()
      .notRequired()
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      userName: currentUser?.userName || '',
      mobileNumber: currentUser?.mobileNumber || '',
      parentsName: currentUser?.parentsName || '',
      schoolName: currentUser?.schoolName || '',
      grade: currentUser?.grade || '',
      age: currentUser?.age || '',
      email: currentUser?.auth?.email || '',
      profileImage: currentUser?.profileImage || null,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('userId', currentUser._id);
      formData.append('name', data.name);
      formData.append('userName', data.userName);
      formData.append('mobileNumber', data.mobileNumber);
      formData.append('parentsName', data.parentsName);
      formData.append('schoolName', data.schoolName);
      formData.append('grade', data.grade);
      formData.append('age', data.age);
      formData.append('email', data.email);
      formData.append('file', imageFile);
      await UpdateUser(formData)
        .unwrap()
        .then(async () => {
          await new Promise((resolve) => setTimeout(resolve, 500));
          reset();
          enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
          navigate(PATH_DASHBOARD.user.list);
        });
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
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
        setValue('profileImage', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={values.status === 'active' ? 'success' : 'error'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="profileImage"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Full Name" />
              <RHFTextField name="userName" label="userName" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="mobileNumber" label="Phone Number" />
              <RHFTextField name="age" label="age" />
              <RHFTextField name="grade" label="grade" />
              <RHFTextField name="schoolName" label="school Name" />
              <RHFTextField name="parentsName" label="parents Name" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
