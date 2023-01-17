import React from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {useDispatch, useSelector} from "react-redux";
import {updateIsRestrict} from "../../features/Blocks/blocksSlice";

// URL制限をするかどうかの表示です
export const Restrict = () => {
  const {isRestrict} = useSelector(state => state.blocks.rule.url);
  const dispatch = useDispatch();

  return (
    <>
      <FormGroup sx={{
        mt: 1,
      }}>
        <FormControlLabel control={
          <Switch
            checked={isRestrict}
            onChange={(e) => {
              dispatch(updateIsRestrict())
            }}
          />
        } label="URL制限をする"/>
      </FormGroup>
    </>
  )
}