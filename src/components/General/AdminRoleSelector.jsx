import React from "react";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {updateAdminRoleID} from "../../features/Blocks/blocksSlice";

// 管理者ロールの選択です
export const AdminRoleSelector = () => {
  const dispatch = useDispatch();
  const {adminRoleID, roles} = useSelector(state => state.blocks)

  return (
    <Box sx={{minWidth: 120, mt: 2}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">管理者のロール</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={!adminRoleID ? "" : adminRoleID}
          label="管理者のロール"
          onChange={(e) => {
            dispatch(updateAdminRoleID({adminRoleID: e.target.value}))
          }}
        >
          {roles.map((role) => {
            return <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>

  )
}