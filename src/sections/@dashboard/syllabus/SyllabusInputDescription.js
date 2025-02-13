import PropTypes from 'prop-types';
// @mui
import { InputBase } from '@mui/material';

// ----------------------------------------------------------------------

SyllabusInputDescription.propTypes = {
  sx: PropTypes.object,
};

export default function SyllabusInputDescription({ sx, ...other }) {
  return (
    <>
    <InputBase
      sx={{
          width:'100%',
        '& .MuiInputBase-input': {
          py: 0,
          borderRadius: 1,
          typography: 'body2',
          border: `solid 1px transparent`,
          transition: (theme) => theme.transitions.create(['padding-left', 'border-color']),
          '&:hover, &:focus': {
            pl: 1,
            border: (theme) => `solid 1px ${theme.palette.text.primary}`,
          },
        },
        ...sx,
      }}
      {...other}
    />
    </>
  );
}
