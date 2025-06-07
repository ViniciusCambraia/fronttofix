import React, { useState, useEffect, useRef, useContext } from "react";

import { useHistory, useParams } from "react-router-dom";
import { parseISO, format, isSameDay } from "date-fns";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";

import { i18n } from "../../translate/i18n";

import api from "../../services/api";
import ButtonWithSpinner from "../ButtonWithSpinner";
import MarkdownWrapper from "../MarkdownWrapper";
import { Tooltip } from "@material-ui/core";
import { AuthContext } from "../../context/Auth/AuthContext";
import toastError from "../../errors/toastError";

const useStyles = makeStyles((theme) => ({
  ticket: {
    position: "relative",
    borderRadius: "10px",
    margin: "8px 4px",
    transition: "all 0.2s ease",
    backgroundColor: theme.palette.mode === "light" ? "#ffffff" : "#2a2a2a",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
    "&:hover": {
      backgroundColor: theme.palette.mode === "light" ? "#f5f5f5" : "#333333",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      transform: "translateY(-2px)",
    },
  },

  pendingTicket: {
    cursor: "unset",
    backgroundColor: theme.palette.mode === "light" ? "#fff9e6" : "#2a2a2a",
    borderLeft: `4px solid ${theme.palette.warning.main}`,
  },

  noTicketsDiv: {
    display: "flex",
    height: "150px",
    margin: 40,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.mode === "light" ? "#f8f9fa" : "#2a2a2a",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  noTicketsText: {
    textAlign: "center",
    color: theme.palette.mode === "light" ? "rgb(104, 121, 146)" : "#a0a0a0",
    fontSize: "14px",
    lineHeight: "1.6",
    marginTop: "10px",
  },

  noTicketsTitle: {
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "600",
    margin: "0px",
    color: theme.palette.mode === "light" ? "#333" : "#f0f0f0",
  },

  contactNameWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  lastMessageTime: {
    justifySelf: "flex-end",
    fontSize: "12px",
    color: theme.palette.mode === "light" ? "#999" : "#aaa",
  },

  closedBadge: {
    alignSelf: "center",
    justifySelf: "flex-end",
    marginRight: 32,
    marginLeft: "auto",
    "& .MuiBadge-badge": {
      fontSize: "11px",
      fontWeight: 500,
      padding: "0 8px",
      borderRadius: "12px",
      textTransform: "capitalize",
      backgroundColor: theme.palette.mode === "light" ? "#e0e0e0" : "#555",
      color: theme.palette.mode === "light" ? "#555" : "#e0e0e0",
    },
  },

  contactLastMessage: {
    paddingRight: 20,
    fontSize: "13px",
    color: theme.palette.mode === "light" ? "#666" : "#bbb",
    maxWidth: "70%",
  },

  newMessagesCount: {
    alignSelf: "center",
    marginRight: 8,
    marginLeft: "auto",
  },

  badgeStyle: {
    color: "white",
    backgroundColor: theme.palette.success.main,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    fontWeight: 500,
  },

  acceptButton: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "8px",
    textTransform: "none",
    fontWeight: 500,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },

  ticketQueueColor: {
    flex: "none",
    width: "4px",
    height: "100%",
    position: "absolute",
    top: "0%",
    left: "0%",
    borderRadius: "4px 0 0 4px",
  },
  
  avatar: {
    width: 42,
    height: 42,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  
  contactName: {
    fontWeight: 500,
    fontSize: "14px",
  },
}))

const TicketListItem = ({ ticket }) => {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { ticketId } = useParams();
  const isMounted = useRef(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleAcepptTicket = async (ticket) => {
    setLoading(true);
    try {
      await api.put(`/tickets/${ticket.id}`, {
        status: "open",
        userId: user?.id,
      });
    } catch (err) {
      setLoading(false);
      toastError(err);
    }
    if (isMounted.current) {
      setLoading(false);
    }
    history.push(`/tickets/${ticket.uuid}`);
  };
  console.log("🚀 Console Log : ticket.lastMessage", ticket.lastMessage);

  const handleSelectTicket = (ticket) => {
    history.push(`/tickets/${ticket.uuid}`);
  };

  return (
    <React.Fragment key={ticket.id}>
      <ListItem
        dense
        button
        onClick={(e) => {
          if (ticket.status === "pending") return;
          handleSelectTicket(ticket);
        }}
        selected={ticketId && +ticketId === ticket.id}
        className={clsx(classes.ticket, {
          [classes.pendingTicket]: ticket.status === "pending",
        })}
        style={{ padding: "10px 16px" }}
      >
        <Tooltip
          arrow
          placement="right"
          title={ticket.queue?.name || "Sem fila"}
        >
          <span
            style={{ backgroundColor: ticket.queue?.color || "#7C7C7C" }}
            className={classes.ticketQueueColor}
          ></span>
        </Tooltip>
        <ListItemAvatar>
          <Avatar 
            src={ticket?.contact?.profilePicUrl} 
            className={classes.avatar}
            alt={ticket.contact.name.charAt(0).toUpperCase()}
          />
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <span className={classes.contactNameWrapper}>
              <Typography
                noWrap
                component="span"
                variant="body2"
                color="textPrimary"
                className={classes.contactName}
              >
                {ticket.contact.name}
              </Typography>
              {ticket.status === "closed" && (
                <Badge
                  className={classes.closedBadge}
                  badgeContent={"closed"}
                  color="primary"
                />
              )}
{/*               {ticket.lastMessage && (
                <Typography
                  className={classes.lastMessageTime}
                  component="span"
                  variant="body2"
                  color="textSecondary"
                >
                  {isSameDay(parseISO(ticket.updatedAt), new Date()) ? (
                    <>{format(parseISO(ticket.updatedAt), "HH:mm")}</>
                  ) : (
                    <>{format(parseISO(ticket.updatedAt), "dd/MM/yyyy")}</>
                  )}
                </Typography>
              )} */}
            </span>
          }
/*           secondary={
            <span className={classes.contactNameWrapper}>
              <Typography
                className={classes.contactLastMessage}
                noWrap
                component="span"
                variant="body2"
                color="textSecondary"
              >
                {ticket.lastMessage ? (
                  <MarkdownWrapper>{ticket.lastMessage}</MarkdownWrapper>
                ) : (
                  <MarkdownWrapper></MarkdownWrapper>
                )}
              </Typography>

              <Badge
                className={classes.newMessagesCount}
                badgeContent={ticket.unreadMessages}
                classes={{
                  badge: classes.badgeStyle,
                }}
              />
            </span>
          } */
        />
        {ticket.status === "pending" && (
          <ButtonWithSpinner
            color="primary"
            variant="contained"
            className={classes.acceptButton}
            size="small"
            loading={loading}
            onClick={(e) => handleAcepptTicket(ticket)}
          >
            {i18n.t("ticketsList.buttons.accept")}
          </ButtonWithSpinner>
        )}
      </ListItem>
      <Divider variant="fullWidth" component="li" style={{ opacity: 0.5, margin: "0 16px" }} />
    </React.Fragment>
  );
};

export default TicketListItem;
