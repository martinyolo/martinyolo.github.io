import * as React from 'react';
import Radio from '@mui/material/Radio';

export default function RadioButtons() {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
        {/* eat the street */}
      <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        value="a"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'A' }}
      />
      {/* Fresh4you */}
      <Radio
        checked={selectedValue === 'b'}
        onChange={handleChange}
        value="b"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'B' }}
      />
      {/* Flow */}
        <Radio
        checked={selectedValue === 'c'}
        onChange={handleChange}
        value="c"
        name="radio-buttons"
        inputProps={{ 'aria-label': 'C' }}
      />
    </div>
  );
}