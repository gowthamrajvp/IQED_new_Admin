import { useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Box, Stack, Button, Divider, Typography, Radio, FormControlLabel, RadioGroup } from '@mui/material';
import Iconify from '../../../../components/iconify';
import { RHFTextField } from '../../../../components/hook-form';

export default function QuestionNewEditDetails() {
  const { control, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  useEffect(() => {
    setValue('totalPrice', values.totalPrice);
  }, [setValue, values.totalPrice]);

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
            <RHFTextField size="small" name={`items[${index}].Question`} label="Question" />
            <RadioGroup name={`items[${index}].correctOption`} sx={{ width: 1 }}>
              <Stack direction="column" spacing={2} sx={{ width: 1 }} paddingLeft={2}>
              <Stack direction="row" spacing={2} sx={{ width: 1 }}>
                {[1, 2,].map((num) => (
                  <Stack key={num} direction="row" spacing={2} sx={{ width: 1 }}>
                    <FormControlLabel control={<Radio />} value={`Option${num}`} label="" sx={{ margin: '0' }} />
                    <RHFTextField size="small" name={`items[${index}].Option${num}`} label="Option" />
                  </Stack>
                ))}
                </Stack>
                <Stack direction="row" spacing={2} sx={{ width: 1 }}>
                {[3, 4].map((num) => (
                  <Stack key={num} direction="row" spacing={2} sx={{ width: 1 }}>
                    <FormControlLabel control={<Radio />} value={`Option${num}`} label="" sx={{ margin: '0' }} />
                    <RHFTextField size="small" name={`items[${index}].Option${num}`} label="Option" />
                  </Stack>
                ))}
              </Stack>
              </Stack>
            </RadioGroup>
            <RHFTextField size="large" name={`items[${index}].Explanation`} label="Explanation" />
            <Button size="small" color="error" startIcon={<Iconify icon="eva:trash-2-outline" />} onClick={() => remove(index)}>
              Remove
            </Button>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack spacing={2} direction={{ xs: 'column-reverse', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }}>
        <Button size="small" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAdd} sx={{ flexShrink: 0 }}>
          Add Item
        </Button>
      </Stack>
    </Box>
  );
}
