import sum from 'lodash/sum';
import { useCallback, useEffect } from 'react';
// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Box, Stack, Button, Divider, Typography, InputAdornment, MenuItem, Radio, FormControlLabel, RadioGroup } from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  { id: 1, name: 'full stack development', price: 90.99 },
  { id: 2, name: 'backend development', price: 80.99 },
  { id: 3, name: 'ui design', price: 70.99 },
  { id: 4, name: 'ui/ux design', price: 60.99 },
  { id: 5, name: 'front end development', price: 40.99 },
];

// ----------------------------------------------------------------------

export default function QuestionNewEditDetails() {
  const { control, setValue, watch, resetField } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  const totalOnRow = values.items.map((item) => item.quantity * item.price);

  const totalPrice = sum(totalOnRow) - values.discount + values.taxes;

  useEffect(() => {
    setValue('totalPrice', totalPrice);
  }, [setValue, totalPrice]);

  const handleAdd = () => {
    append({
      title: '',
      description: '',
      service: '',
      quantity: 1,
      price: 0,
      total: 0,
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const handleClearService = useCallback(
    (index) => {
      resetField(`items[${index}].quantity`);
      resetField(`items[${index}].price`);
      resetField(`items[${index}].total`);
    },
    [resetField]
  );

  const handleSelectService = useCallback(
    (index, option) => {
      setValue(
        `items[${index}].price`,
        SERVICE_OPTIONS.find((service) => service.name === option)?.price
      );
      setValue(
        `items[${index}].total`,
        values.items.map((item) => item.quantity * item.price)[index]
      );
    },
    [setValue, values.items]
  );

  const handleChangeQuantity = useCallback(
    (event, index) => {
      setValue(`items[${index}].quantity`, Number(event.target.value));
      setValue(
        `items[${index}].total`,
        values.items.map((item) => item.quantity * item.price)[index]
      );
    },
    [setValue, values.items]
  );

  const handleChangePrice = useCallback(
    (event, index) => {
      setValue(`items[${index}].price`, Number(event.target.value));
      setValue(
        `items[${index}].total`,
        values.items.map((item) => item.quantity * item.price)[index]
      );
    },
    [setValue, values.items]
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 5 }}>
        Questions:-
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3} marginX={{ xs: 2, md: 5 }}>
        {fields.map((item, index) => (

          <Stack key={item.id} alignItems="flex-end" spacing={2}>
            <Typography variant="h6" textAlign="start" sx={{ color: 'text.disabled', width: 1 }}>
              <span>Q{index + 1}</span> )
            </Typography>
            <RHFTextField
              size="small"
              name={`items[${index}].Question`}
              label="Question"
            // InputLabelProps={{ shrink: true }}
            />
            <RadioGroup name={`items[${index}].correctOption`} sx={{ width: 1 }}>
              <Stack direction="column" spacing={2} sx={{ width: 1 }} paddingLeft={2}>
                <Stack direction="row" spacing={2} sx={{ width: 1 }}>
                  <Stack direction="row" spacing={0} sx={{ width: 1 }}>
                    <FormControlLabel
                      control={<Radio />}
                      value="Option1"
                      label=""
                      sx={{ margin: '0' }}
                    />
                    <RHFTextField
                      size="small"
                      name={`items[${index}].Option1`}
                      label="Option"
                    />
                  </Stack>
                  <Stack direction="row" spacing={0} sx={{ width: 1 }}>
                    <FormControlLabel
                      control={<Radio />}
                      value="Option2"
                      label=""
                      sx={{ margin: '0' }}
                    />
                    <RHFTextField
                      size="small"
                      name={`items[${index}].Option2`}
                      label="Option"
                    />
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ width: 1 }}>
                  <Stack direction="row" spacing={0} sx={{ width: 1 }}>
                    <FormControlLabel 
                      control={<Radio />}
                      value="Option3"
                      label=""
                      sx={{ margin: '0' }}
                    />
                    <RHFTextField
                      size="small"
                      name={`items[${index}].Option3`}
                      label="Option"
                    />
                  </Stack>
                  <Stack direction="row" spacing={0} sx={{ width: 1 }}>
                    <FormControlLabel
                      control={<Radio />}
                      value="Option4"
                      label=""
                      sx={{ margin: '0' }}
                    />
                    <RHFTextField
                      size="small"
                      name={`items[${index}].Option4`}
                      label="Option"
                    />
                  </Stack>
                </Stack>
              </Stack>
            </RadioGroup>
            <RHFTextField
              size="large"
              name={`items[${index}].Explanation`}
              label="Explanation"
            // InputLabelProps={{ shrink: true }}
            />
            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              onClick={() => handleRemove(index)}
            >
              Remove
            </Button>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        <Button
          size="small"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          Add Item
        </Button>

      </Stack>


    </Box>
  );
}
