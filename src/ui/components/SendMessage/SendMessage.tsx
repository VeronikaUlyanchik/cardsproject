import React from 'react';
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import {PATH} from "../../../enum/Path";
import {useNavigate} from "react-router-dom";
import Email from "../../../common/image/New-email.jpg";

const SendMessage = () => {

    const navigate = useNavigate()

    return (
        <div>
            <Box
                sx={{
                    width: 300,
                    height: 400,
                    backgroundColor: 'white',
                    opacity: [0.9, 0.8, 0.8],
                    p: 10,
                    borderRadius: '20px',
                    boxShadow: '20',
                    fontSize: '20px',
                }}
            >Check your email
                <Box sx={{
                    marginTop: '45px'
                }}>
                    <img alt={'Email'} src={Email}/>
                </Box>
                <Box sx={{
                    marginTop: '48px',
                    fontSize: '20px'
                }}> {`Back to `}
                    <Link sx={{
                        marginTop: '-5px',
                        fontSize: '20px'
                    }}
                        component="button"
                        variant="body2"
                        underline="hover"
                        onClick={() => navigate(PATH.LOGIN)}
                    > login
                    </Link>
                </Box>
            </Box>
        </div>
    );
};

export default SendMessage;