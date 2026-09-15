'use client';
import PropTypes from 'prop-types';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import { styled } from '../zero-styled';

const RadioButtonIconRoot = styled('span', {
  name: 'MuiRadioButtonIcon',
})({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

function RadioButtonIcon(props) {
  const { checked = false } = props;

  return (
    <RadioButtonIconRoot>
      {checked ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
    </RadioButtonIconRoot>
  );
}

RadioButtonIcon.propTypes = {
  checked: PropTypes.bool,
  classes: PropTypes.object,
  fontSize: PropTypes.oneOf(['small', 'medium']),
};

export default RadioButtonIcon;
