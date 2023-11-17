"use client"

import React, { FC } from 'react'
import { Box, Chip, Container, IconButton, Stack } from '@mui/material'
import { indigo } from '@mui/material/colors'
import { Facebook, LinkedIn, LocationOnOutlined, LockClock, MailOutline, Twitter } from '@mui/icons-material'

const Header: FC = () => {
  return (
    <Box
      sx={{
        bgcolor: indigo[900],
        px: 2
      }}
    >
      <Container maxWidth="xl"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={1}
          sx={{
            display: {
              xs: "none",
              md: "flex"
            }
          }}
        >
          <Chip
            size={"small"}
            variant={"outlined"}
            sx={{
              border: "none",
              color: indigo[100]
            }}
            label="4b, Walse Street , USA"
            icon={<LocationOnOutlined sx={{
              color: `${indigo[50]} !important`
            }} />}
          />
          <Chip
            size={"small"}
            variant={"outlined"}
            sx={{
              border: "none",
              color: indigo[100]
            }}
            label="malda@template.go"
            icon={<MailOutline sx={{
              color: `${indigo[50]} !important`
            }} />}
          />
          <Chip
            size={"small"}
            variant={"outlined"}
            sx={{
              border: "none",
              color: indigo[100]
            }}
            label="Mon – Sun: 9.00 am – 8.00pm"
            icon={<LockClock sx={{
              color: `${indigo[50]} !important`
            }} />}
          />
        </Stack>
        <Box
          sx={{
            flexGrow: 1
          }}
        />
        <Stack direction="row" spacing={1}>
          <IconButton>
            <Facebook sx={{
              color: `${indigo[100]} !important`
            }} />
          </IconButton>
          <IconButton>
            <Twitter sx={{
              color: `${indigo[100]} !important`
            }} />
          </IconButton>
          <IconButton>
            <LinkedIn sx={{
              color: `${indigo[100]} !important`
            }} />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  )
}

export default Header