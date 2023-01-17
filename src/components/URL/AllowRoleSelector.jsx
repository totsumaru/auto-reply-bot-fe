import React from "react";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {updateAllowRoleID} from "../../features/Blocks/blocksSlice";
import {AddRoleBtn} from "./AddRoleBtn";
import {DeleteRoleBtn} from "./DeleteRoleBtn";

// 制限を受けないロールです
export const AllowRoleSelector = () => {
  const dispatch = useDispatch();
  const {roles} = useSelector(state => state.blocks);
  const {isRestrict, allowRoleID} = useSelector(state => state.blocks.rule.url);

  return (
    <>
      {allowRoleID.map((roleID, index) => {
        return (
          <Box key={index} sx={{mx: 1, my: 2, display: "flex", alignItems: "center"}}>
            <FormControl fullWidth disabled={!isRestrict}>
              <InputLabel id="demo-simple-select-label">{"ロール" + (index + 1)}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={!roleID ? "" : roleID}
                label="制限をしないロール"
                onChange={(e) => {
                  dispatch(updateAllowRoleID({index: 1, roleID: e.target.value}))
                }}
              >
                {roles.map((role) => {
                  return <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                })}
              </Select>
            </FormControl>

            <DeleteRoleBtn index={index}/>
          </Box>
        )
      })}

      {allowRoleID.length >= 5 ? "" : <AddRoleBtn/>}
    </>
  )
}