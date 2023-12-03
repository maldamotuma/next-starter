"use client"

import React, { FC } from 'react'
import { Box, Chip, Container, IconButton, Stack, Typography } from '@mui/material'
import { indigo } from '@mui/material/colors'
import { Facebook, GitHub, LinkedIn, LocationOnOutlined, LockClock, MailOutline, Twitter } from '@mui/icons-material'
import Link from 'next/link'

const Header: FC = () => {
  return (
    <Box
      sx={{
        bgcolor: indigo[900],
        px: 2
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pr: {
            xs: 1,
            md: 3
          },
          pl: 3
        }}
      >
        <Typography
          sx={{
            display: {
              md: "none"
            }
          }}
          color={indigo[100]}
        >
          Let Us Connect!
        </Typography>
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
            label="Fully Online"
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
            label="getintouch.malda@gmail.com"
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
            label="Mon – Mon"
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
        <Box
          sx={{
            display: "flex",
            px: 2,
            pl: 8
          }}
        >
          <IconButton
            component={Link}
            target="_blank"
            sx={{
              color: `${indigo[100]} !important`
            }}
            href="https://www.linkedin.com/in/malda-motuma-39b88a219"
          ><LinkedIn /></IconButton>
          <IconButton
            component={Link}
            target="_blank"
            sx={{
              color: `${indigo[100]} !important`
            }}
            href="https://github.com/maldamotuma"
          ><GitHub /></IconButton>
          <IconButton
            component={Link}
            target="_blank"
            sx={{
              color: `${indigo[100]} !important`
            }}
            href="https://twitter.com/MaldaMotuma"
          ><Twitter /></IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Header