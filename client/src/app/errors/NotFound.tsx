import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound(){
    return (
        <Container component={Paper} style={{ height: 400 }}>
            <Typography gutterBottom variant={'h3'}>
                Oops - We could not find what your are looking for!
            </Typography>
            <Divider />
            <Button component={Link} to='/catalog' fullWidth>Go back to the shop</Button>
        </Container>
    )
}