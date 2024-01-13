
import {  Container, Box, Typography, Grid, Table, TableCell, TableHead,TableRow,TableBody } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import MyComponent from "./navbar";

const Home = () => {
    const navigate = useNavigate();

    return(
        <Container>
            <nabar>
                <MyComponent/>
            </nabar>
        </Container>
    )

}
export default Home;