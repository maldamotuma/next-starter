import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { shuffle } from '@/utils/array';

export const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: "1px solid currentColor",
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


export default function GroupAvatars() {
    const [avatars, setavatars] = React.useState<number[]>([...shuffle<number>([1, 2, 3, 4, 5, 6, 7])]);

    React.useEffect(() => {
        setInterval(() => {
            setavatars([...shuffle<number>([1, 2, 3, 4, 5, 6, 7])])
        }, 1800);
        return () => {

        }
    }, [])

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: {
                    xs: "column",
                    sm: "row"
                },
                gap: {
                    xs: 1,
                    sm: 2,
                    md: 3
                }
            }}
        >
            <Box
                sx={{
                    display: "inline-block",
                    pl: 2
                }}
            >
                <AvatarGroup
                    sx={{
                        flexDirection: "row"
                    }}
                    renderSurplus={(_surplus) => <span>+</span>}
                    spacing={"small"}
                    max={5}
                >
                    {
                        avatars.slice(0, 2).map(dv => (
                            <StyledBadge
                                key={"dev-avatar-" + dv}
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar alt="Tech Scan" src={`/dev-pp/dev${dv}.jpg`} />
                            </StyledBadge>
                        ))
                    }
                    {
                        avatars.slice(2).map(dv => (
                            <Avatar key={"dev-avatars-" + dv} alt="Tech Scan" src={`/dev-pp/dev${dv}.jpg`} />
                        ))
                    }
                </AvatarGroup>
            </Box>
            <Box>
                <Typography>
                    Empowering Developers and AI Engineers Worldwide
                </Typography>
                <Typography variant={"caption"} color={"text.secondary"}>
                    Join a Community Trusted by Visionaries, Innovators, and Tech Enthusiasts
                </Typography>
            </Box>
        </Box>
    );
}
