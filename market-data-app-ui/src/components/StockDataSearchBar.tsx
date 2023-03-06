import axios from "axios";
import qs from 'qs'

import { useState } from "react";
import { useQuery } from "react-query";

interface Props {
    addStockToList(newStock: string): void
}

const StockDataSearchBar = ({ addStockToList }: Props) => {
    const [value, setValue] = useState("")

    const { data, isSuccess } = useQuery("get_symbols",
        async () => {
            const { data } = await axios.get(
                'http://127.0.0.1:5000/market_data/symbols',
                {
                    params: {
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
    );

    const clickHandler = () => {
        if (!isSuccess) {
            alert("Still loading valid symbols. Please wait...")
        } else {
            let enteredSymbol = value.toUpperCase();
            if (data.symbols.includes(enteredSymbol)) {
                addStockToList(value.toUpperCase());
            } else {
                alert("Not a valid symbol!")
            }

        }

    }

    return (
        <>
            <label>
                <input
                    type="text"
                    placeholder="Type symbol"
                    onChange={(e) => setValue(e.target.value)}
                />
            </label>
            <input
                type="button"
                value="+ Watch"
                onClick={clickHandler}
            />
        </>
    )
}

export default StockDataSearchBar;