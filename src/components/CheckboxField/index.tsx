import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import { Control, useController } from 'react-hook-form'
import { ReactNode } from 'react'

type CheckboxFieldProps = CheckboxProps & {
  name: string
  control: Control<any>
  label?: ReactNode
}

const CheckboxField = ({
  name,
  control,
  label,
  ...restProps
}: CheckboxFieldProps) => {
  const {
    field: { onChange, onBlur, ref, value }
    // fieldState: { error }
  } = useController({
    name,
    control
  })

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            name={name}
            value={value}
            inputRef={ref}
            onChange={onChange}
            onBlur={onBlur}
            // error={!!error}
            // helperText={error?.message}
            {...restProps}
          />
        }
        label={label}
      />
    </FormGroup>
  )
}

export default CheckboxField
