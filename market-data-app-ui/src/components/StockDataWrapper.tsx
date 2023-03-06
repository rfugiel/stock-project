import { useState, useEffect } from "react";
import StockDataSearchBar from "./StockDataSearchBar";
import StockDataTable from "./StockDataTable";
import axios from "axios";

const StockDataWrapper = () => {
    const [stockList, setStockList] = useState<string[]>([]);

    useEffect(() => {
        axios.get(
            'http://127.0.0.1:5000/auth/retrieve_auth_token',

        ).then((r) =>  localStorage.setItem('CBOE_TOKEN', r.data.access_token))
      }, []);

    const addStockToList = (newStock: string) => {
        if (!stockList.includes(newStock)) {
            setStockList((prev) => [...prev, newStock]);
        }
    }
    const removeStockFromList = (stockToRemove: string) => {
        setStockList((prev) => prev.filter(x => x != stockToRemove));
    }

    return (
        <>
        <StockDataSearchBar addStockToList={addStockToList}/>
        <StockDataTable 
            stockList={stockList} 
            removeStockFromList={removeStockFromList}
            stockData={null}
            />
        </>
    )
}

export default StockDataWrapper;