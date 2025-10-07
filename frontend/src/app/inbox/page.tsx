'use client'
import React, { useState } from "react"
import AppLayout from "@/components/AppLayout"
import {
  Avatar, Box, Typography, Paper, List, ListItem, ListItemAvatar, ListItemText,
  IconButton, Fade, Divider, Chip, Button // Added Button import
} from "@mui/material"
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import MarkEmailUnreadRoundedIcon from '@mui/icons-material/MarkEmailUnreadRounded'
import ReplyAllRoundedIcon from '@mui/icons-material/ReplyAllRounded'

type Email = {
  id: string
  sender: string
  subject: string
  preview: string
  date: string
  unread: boolean
  important: boolean
  avatar?: string
}

const inboxDemoData: Email[] = [
  {
    id: "1",
    sender: "John Customer",
    subject: "Quotation for green bags",
    preview: "Hi team, can you share the best price for 200 eco bags?",
    date: "2025-10-05 09:12",
    unread: true,
    important: true,
    avatar: ""
  },
  {
    id: "2",
    sender: "VIP Client",
    subject: "Need changes in order #2301",
    preview: "Please change the delivery address for my latest order.",
    date: "2025-10-04 16:40",
    unread: false,
    important: false,
    avatar: ""
  },
  {
    id: "3",
    sender: "Gmail Team",
    subject: "Security alert on new device",
    preview: "We noticed a sign-in from a new device.",
    date: "2025-10-03 22:01",
    unread: true,
    important: false,
    avatar: ""
  }
]

export default function InboxPage() {
  const [selected, setSelected] = useState<string | null>(inboxDemoData[0]?.id ?? null)
  const selectedMail = inboxDemoData.find(m => m.id === selected)

  return (
    <AppLayout>
      <Box display="flex" gap={3} flexWrap="wrap" minHeight="69vh">
        {/* Inbox List */}
        <Paper
          elevation={2}
          sx={{
            minWidth: 320, maxWidth: 390, flex: 1, bgcolor: "#fff",
            height: "70vh", overflowY: "auto", borderRadius: 5, p: 0, display: "flex", flexDirection: "column"
          }}>
          <Typography variant="h5" px={3} pt={2} letterSpacing={1} fontWeight={700}>Inbox</Typography>
          <Divider sx={{ my: 1.2 }} />
          <List dense>
            {inboxDemoData.length === 0 && (
              <Typography textAlign="center" mt={4} px={2} color="text.secondary">No messages yet!</Typography>
            )}
            {inboxDemoData.map(mail => (
              <ListItem
                button
                key={mail.id}
                onClick={() => setSelected(mail.id)}
                sx={{
                  bgcolor: selected === mail.id ? "#eaf6ec" : mail.unread ? "#f7f7f8" : "#fff",
                  borderLeft: selected === mail.id ? "4px solid #219653" : "4px solid transparent",
                  transition: "background .18s",
                  mb: 0.5
                }}
              >
                <ListItemAvatar>
                  <Avatar src={mail.avatar || undefined} sx={{ bgcolor: "#219653" }}>
                    {mail.sender.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography
                        fontWeight={mail.unread ? 700 : 400}
                        sx={{ fontSize: "17px" }}
                      >
                        {mail.subject}
                      </Typography>
                      {mail.important && (
                        <StarRoundedIcon color="warning" fontSize="small" sx={{ ml: 0.5 }} />
                      )}
                    </Box>
                  }
                  secondary={
                    <Typography
                      color="text.secondary"
                      fontWeight={mail.unread ? 600 : 400}
                      sx={{ fontSize: "14px" }}
                      noWrap
                    >
                      {mail.preview}
                    </Typography>
                  }
                  sx={{ mb: 0.3 }}
                />
                <Box ml={1} textAlign="right">
                  <Typography component="span" sx={{ fontSize: 12 }} color="text.secondary">
                    {mail.date}
                  </Typography>
                  {mail.unread && (
                    <MarkEmailUnreadRoundedIcon sx={{ color: "#219653", fontSize: 22, ml: 1 }} />
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Details Panel */}
        <Fade in>
          <Paper
            elevation={1}
            sx={{
              minWidth: { xs: "90vw", md: 420 },
              maxWidth: "calc(100vw - 430px)",
              flex: 2,
              borderRadius: 5,
              bgcolor: "#fafdff",
              p: 4,
              display: selectedMail ? "block" : "flex",
              minHeight: "70vh"
            }}
          >
            {!selectedMail ? (
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                <Typography color="text.secondary" mt={6}>
                  Select an email to view details.
                </Typography>
              </Box>
            ) : (
              <>
                <Box display="flex" alignItems="center" mb={1} gap={1.5}>
                  <Avatar sx={{ bgcolor: "#219653", width: 48, height: 48 }}>
                    {selectedMail.sender.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" fontWeight={700}>{selectedMail.subject}</Typography>
                    <Typography fontSize={15} color="text.secondary">{selectedMail.sender}</Typography>
                  </Box>
                  {selectedMail.important && (
                    <Chip label="Important" color="warning" sx={{ ml: 2 }} size="small" />
                  )}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography fontSize={16} mb={3}>{selectedMail.preview}</Typography>
                <Typography color="text.disabled" fontSize={13} mb={2}>{selectedMail.date}</Typography>
                <Box display="flex" gap={2} mt={2}>
                  <IconButton color="primary">
                    <ReplyAllRoundedIcon />
                  </IconButton>
                  <Button variant="outlined" color="success" size="small">
                    Mark as Read
                  </Button>
                  <Button variant="contained" color="primary" size="small">
                    Quick Reply
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Fade>
      </Box>
    </AppLayout>
  )
}