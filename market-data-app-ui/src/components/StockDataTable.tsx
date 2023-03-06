import axios from "axios";
import { useQuery } from "react-query";

import qs from 'qs'

interface Props {
    stockList: string[],
    removeStockFromList(stockToRemove: string): void,
    stockData: any //TODO: update this
}

const StockDataTable = ({stockList, removeStockFromList}: Props) => {

    const { isLoading, data} = useQuery(
        stockList,
        async () => {
            if (stockList) {
          const { data } = await axios.get(
            'http://127.0.0.1:5000/market_data/underlying_quotes',
            {
                params: {
                    symbols: stockList,
                    cboe_token: localStorage.getItem("CBOE_TOKEN")
                },
                paramsSerializer: {
                    serialize: (params) => {
                        return qs.stringify(params, { arrayFormat: 'repeat' })
                    }
                },
            }
          );
          return data;
        }
        },
        {
          refetchInterval: 10000,
        }
      );
    
      if (isLoading) return (
        <>LOADING TABLE DATA...</>
      )

    const tableRow = (rowSymbol: string) => {
        let symbolData = data[rowSymbol];
        return (
                <tr key={rowSymbol}>
                    <td>{symbolData.symbol}</td>
                    <td>{symbolData.underlying_last_trade_price}</td>
                    <td>{symbolData.iv30}</td>
                    <td>{symbolData.iv30_change}</td>
                    <td>
                        <input 
                            type="button" 
                            value="remove"
                            onClick={() => removeStockFromList(rowSymbol)}
                        />
                    </td>
                </tr>
        )
    }

    return (
        <>
        <table>
            <thead>
            <tr>
                <th>Symbol</th>
                <th>Last</th>
                <th>IV30</th>
                <th>IV30 CHG</th>
            </tr>
            </thead>
            <tbody>
            {stockList.map((symbol) => tableRow(symbol))}
            </tbody>
        </table>
        </>
    )
}

export default StockDataTable;