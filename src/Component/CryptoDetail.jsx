// CryptoDetail.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Typography, Card, CardContent, Button } from '@mui/material';
import { getCryptoDetails } from '../services/authapi';

const CryptoDetail = () => {
    const { id } = useParams();
    const [cryptoDetails, setCryptoDetails] = useState(null);
    const navigate = useNavigate();

    const fetchCryptoDetails = async () => {
        const response = await getCryptoDetails({ symbol: id })
        setCryptoDetails(response)
    };

    useEffect(() => {
        fetchCryptoDetails();
    }, [id]);

    if (!cryptoDetails) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {cryptoDetails?.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    Symbol: {cryptoDetails?.symbol}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    Current Price: ${cryptoDetails?.market_data?.current_price?.usd}
                </Typography>
                <Typography variant="body2" component="div" style={{ marginTop: 20 }}>
                    <div dangerouslySetInnerHTML={{ __html: cryptoDetails?.description?.en }} />
                </Typography>
                <Button variant="contained" onClick={() => { navigate(-1) }} color="primary" style={{ marginTop: 20 }}>
                    Back to List
                </Button>
            </CardContent>
        </Card>
    );
};

export default CryptoDetail;
