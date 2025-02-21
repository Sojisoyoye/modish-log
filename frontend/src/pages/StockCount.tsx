import { Container, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StockCountForm from "../components/StockCountForm";

const StockCount: React.FC = () => {
    const [stockCount, setStockCount] = useState({
        productId: '',
        quantity: 0,
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         await addStockCount(stockCount);
    //         setMessage('Stock count recorded successfully!');
    //         navigate('/stock');
    //     } catch (error) {
    //         setMessage('Failed to record stock count. Please check again.');
    //     }
    // };

    return (
        <Container  component="main" maxWidth="sm">
         
            <StockCountForm />

            <Typography variant="h5" gutterBottom mt={4}>
              Stock Count - Table coming
            </Typography>
             {/* stock count list table */}
            {/* {message && <Alert severity="info">{message}</Alert>} */}
        </Container>
    );
}

export default StockCount;