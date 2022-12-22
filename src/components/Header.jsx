import React from "react";
import {AppBar, Box, Container, Toolbar, Typography} from "@mui/material";

// ヘッダーです
export const Header = () => {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              [自動返信bot] 管理者設定
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}