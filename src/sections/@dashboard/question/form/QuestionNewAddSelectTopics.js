// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { DatePicker } from '@mui/x-date-pickers';
import { Stack, TextField, MenuItem } from '@mui/material';
// components
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';
import { useGetAllTopicQuery } from '../../../../redux/api/User.Api';
// import {  useDeleteQuestionMutation, useGetAllQuestionQuery, useGetAllTopicQuery } from '../../redux/api/User.Api';
// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['paid', 'unpaid', 'overdue', 'draft'];

// ----------------------------------------------------------------------

export default function QuestionNewAddSelectTopics() {
  const { control, watch } = useFormContext();
  const { data: TotalTopic } = useGetAllTopicQuery();
  const values = watch();
  const TopicNameList = TotalTopic?.data.map((p)=> p.name)
  
  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ p: 3, bgcolor: 'background.neutral' }}
    >
      <RHFSelect fullWidth name="topic" label="Select Topic" InputLabelProps={{ shrink: true }}>
        {STATUS_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </RHFSelect>

    </Stack>
  );
}
