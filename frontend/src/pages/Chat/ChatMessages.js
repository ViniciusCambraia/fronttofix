import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

import { AuthContext } from "../../context/Auth/AuthContext";
import { useDate } from "../../hooks/useDate";
import api from "../../services/api";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    flex: 1,
    overflow: "hidden",
    borderRadius: 0,
    height: "100%",
    borderLeft: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.05)'}`,
    backgroundColor: theme.palette.mode === 'light' ? '#f8f9fa' : '#1a1a1a',
  },
  messageList: {
    position: "relative",
    overflowY: "auto",
    height: "100%",
    ...theme.scrollbarStyles,
    backgroundColor: theme.palette.chatlist,
    padding: "10px 16px",
  },
  inputArea: {
    position: "relative",
    height: "auto",
    backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2a2a2a',
    borderTop: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.05)'}`,
    padding: "8px 16px",
  },
  input: {
    padding: "12px 16px",
    backgroundColor: theme.palette.mode === 'light' ? '#f0f2f5' : '#3a3a3a',
    borderRadius: "20px",
    fontSize: "14px",
  },
  buttonSend: {
    margin: theme.spacing(0.5),
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
    },
  },
  boxLeft: {
    padding: "12px 16px",
    margin: "6px 0",
    position: "relative",
    backgroundColor: theme.palette.mode === 'light' ? '#e4e6eb' : '#3a3b3c',
    color: theme.palette.mode === 'light' ? '#050505' : '#e4e6eb',
    maxWidth: 300,
    borderRadius: "18px",
    borderBottomLeftRadius: "4px",
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    wordBreak: 'break-word',
  },
  boxRight: {
    padding: "12px 16px",
    margin: "6px 0 6px auto",
    position: "relative",
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    textAlign: "left",
    maxWidth: 300,
    borderRadius: "18px",
    borderBottomRightRadius: "4px",
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    wordBreak: 'break-word',
  },
  messageTime: {
    fontSize: '11px',
    marginTop: '4px',
    opacity: 0.7,
    display: 'block',
  },
  senderName: {
    fontWeight: 600,
    marginBottom: '4px',
    fontSize: '13px',
  },
  messageContent: {
    fontSize: '14px',
    lineHeight: '1.4',
  },
}));

export default function ChatMessages({
  chat,
  messages,
  handleSendMessage,
  handleLoadMore,
  scrollToBottomRef,
  pageInfo,
  loading,
}) {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { datetimeToClient } = useDate();
  const baseRef = useRef();

  const [contentMessage, setContentMessage] = useState("");

  const scrollToBottom = () => {
    if (baseRef.current) {
      baseRef.current.scrollIntoView({});
    }
  };

  const unreadMessages = (chat) => {
    if (chat !== undefined) {
      const currentUser = chat.users.find((u) => u.userId === user.id);
      return currentUser.unreads > 0;
    }
    return 0;
  };

  useEffect(() => {
    if (unreadMessages(chat) > 0) {
      try {
        api.post(`/chats/${chat.id}/read`, { userId: user.id });
      } catch (err) {}
    }
    scrollToBottomRef.current = scrollToBottom;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = (e) => {
    const { scrollTop } = e.currentTarget;
    if (!pageInfo.hasMore || loading) return;
    if (scrollTop < 600) {
      handleLoadMore();
    }
  };

  return (
    <Paper className={classes.mainContainer}>
      <div onScroll={handleScroll} className={classes.messageList}>
        {Array.isArray(messages) &&
          messages.map((item, key) => {
            if (item.senderId === user.id) {
              return (
                <Box key={key} className={classes.boxRight}>
                  <Typography variant="subtitle2" className={classes.senderName}>
                    {item.sender.name}
                  </Typography>
                  <Typography className={classes.messageContent}>
                    {item.message}
                  </Typography>
                  <Typography variant="caption" className={classes.messageTime}>
                    {datetimeToClient(item.createdAt)}
                  </Typography>
                </Box>
              );
            } else {
              return (
                <Box key={key} className={classes.boxLeft}>
                  <Typography variant="subtitle2" className={classes.senderName}>
                    {item.sender.name}
                  </Typography>
                  <Typography className={classes.messageContent}>
                    {item.message}
                  </Typography>
                  <Typography variant="caption" className={classes.messageTime}>
                    {datetimeToClient(item.createdAt)}
                  </Typography>
                </Box>
              );
            }
          })}
        <div ref={baseRef}></div>
      </div>
      <div className={classes.inputArea}>
        <FormControl variant="outlined" fullWidth>
          <Input
            multiline
            placeholder="Digite sua mensagem..."
            value={contentMessage}
            onKeyUp={(e) => {
              if (e.key === "Enter" && contentMessage.trim() !== "") {
                handleSendMessage(contentMessage);
                setContentMessage("");
              }
            }}
            onChange={(e) => setContentMessage(e.target.value)}
            className={classes.input}
            disableUnderline={true}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    if (contentMessage.trim() !== "") {
                      handleSendMessage(contentMessage);
                      setContentMessage("");
                    }
                  }}
                  className={classes.buttonSend}
                  size="small"
                >
                  <SendIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </Paper>
  );
}
