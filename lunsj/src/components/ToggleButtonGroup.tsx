import * as React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

type ToggleButtonGroupsProps = {
    selectedValue: boolean;
    handleSelectionChange: (newValue: boolean) => void;
};

const ToggleButtonGroups: React.FC<ToggleButtonGroupsProps> = ({ selectedValue, handleSelectionChange }) => {
    const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: boolean | null) => {
        if (newValue !== null) {
            handleSelectionChange(newValue);
        }
    };

    return (
        <div>
            <ToggleButtonGroup
                color="primary"
                value={selectedValue}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton value={true}>Ukesmeny</ToggleButton>
                <ToggleButton value={false}>Dagens meny</ToggleButton>
            </ToggleButtonGroup>
        </div>
    );
}
export default ToggleButtonGroups;