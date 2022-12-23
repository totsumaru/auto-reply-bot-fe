import React, {useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useDispatch} from "react-redux";
import {deleteBlock} from "../../features/Blocks/blocksSlice";

export const BlockDeleteBtn = ({blockIndex, name}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{
      textAlign: "right",
      mx: 1,
    }}>
      <Button
        variant="outlined"
        color="error"
        onClick={(e) => {
          e.preventDefault()
          handleClickOpen()
        }}
      >
        設定を削除する
      </Button>

      {/* ダイアログ */}
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          設定の削除
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            「{name}」を削除しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button
            variant="contained"
            color="error"
            onClick={(e) => {
              e.preventDefault()
              dispatch(deleteBlock({
                blockIndex: blockIndex
              }))
              handleClose()
            }}
            autoFocus
          >
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}