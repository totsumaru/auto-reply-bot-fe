import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateNickname } from "../../features/Blocks/blocksSlice";

// ニックネームのダイアログです
export const NicknameDialog = () => {
  const [open, setOpen] = React.useState(false);
  const { token, nickname } = useSelector(state => state.blocks);
  const { serverID } = useSelector(state => state.serverID);
  const dispatch = useDispatch();

  const url = `${ process.env.REACT_APP_BE_ROOT_URL }/server/nickname?id=${ serverID }&name=${ nickname }`

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postUpdate = async () => {
    // ニックネームはURLのクエリパラメータに入っています
    await axios.post(url, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Token': token
      },
    })
  }

  return (
    <>
      <Button variant="outlined" sx={ { mt: 0 } } onClick={ handleClickOpen }>
        bot名を変更する
      </Button>
      <Dialog
        open={ open }
        onClose={ handleClose }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          bot名を変更します
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            このサーバー内のみ適用されます。
            他のサーバーには影響しません。
          </DialogContentText>
        </DialogContent>

        {/* フォーム */ }
        <TextField
          id="outlined-basic"
          label="bot名"
          value={ nickname }
          variant="outlined"
          placeholder="Comment-bot"
          sx={ {
            mx: 3
          } }
          onChange={ (e) => {
            dispatch(updateNickname({ nickname: e.target.value }))
          } }
        />

        <DialogActions sx={ { m: 2 } }>
          <Button onClick={ handleClose }>キャンセル</Button>
          <Button
            variant="contained"
            onClick={ async (e) => {
              e.preventDefault()
              await postUpdate()
              handleClose()
            } }
            autoFocus
          >
            変更
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}