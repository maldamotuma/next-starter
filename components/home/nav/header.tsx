"use client"

import React, { FC } from 'react'
import { Box, Chip, IconButton, Stack } from '@mui/material'
import { indigo } from '@mui/material/colors'
import { Facebook, LinkedIn, LocationOnOutlined, LockClock, MailOutline, Twitter } from '@mui/icons-material'

const Header: FC = () => {
  return (
    <Box
      sx={{
        bgcolor: indigo[50],
        display: "flex",
        alignItems: "center",
        px: 2
      }}
    >
      <Stack direction="row" spacing={1}>
        <Chip
          size={"small"}
          variant={"outlined"}
          sx={{
            border: "none"
          }}
          label="4b, Walse Street , USA"
          icon={<LocationOnOutlined />}
        />
        <Chip
          size={"small"}
          variant={"outlined"}
          sx={{
            border: "none"
          }}
          label="malda@template.go"
          icon={<MailOutline />}
        />
        <Chip
          size={"small"}
          variant={"outlined"}
          sx={{
            border: "none"
          }}
          label="Mon – Sun: 9.00 am – 8.00pm"
          icon={<LockClock />}
        />
      </Stack>
      <Box
        sx={{
          flexGrow: 1
        }}
      />
      <Stack direction="row" spacing={1}>
        <IconButton color="info">
          <Facebook />
        </IconButton>
        <IconButton color="info">
          <Twitter />
        </IconButton>
        <IconButton color="info">
          <LinkedIn />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default Header