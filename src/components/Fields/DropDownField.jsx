import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const DropDownField = ({label,value,name, datas, handleChange}) => {
  return (
    <>
    <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select
              name={name}
              value={value}
              onChange={handleChange}
              size="small"
            >
              <MenuItem value="">Select {label}</MenuItem>
              {datas.map((data) => (
                <MenuItem key={data.id} value={data.code}>
                  {data.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
    </>
  )
}

export default DropDownField