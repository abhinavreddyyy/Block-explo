import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState, useRef } from 'react';
import { Routes, Route, Outlet, useNavigate, useLocation } from "react-router-dom";

import Blockchain from './Blockchain';
import BlockView from './Blockview';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export default function App() {
    const [blockNumber, setBlockNumber] = useState(0);

    return (
        <Routes>
            <Route path="/" element={<Layout blockNumber={blockNumber} setBlockNumber={setBlockNumber} />}>
                <Route index element={<Blockchain blockNumber={blockNumber} />} />
                <Route path="block/:blockNumber" element={<BlockView setBlockNumber={setBlockNumber} />} />

            </Route>
        </Routes>
    );
}


function Layout({ blockNumber, setBlockNumber }) {
    const [latestBlock, setLatestBlock] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") setLatestBlockNumber();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const inputRef = useRef();
    const handleInput = (e) => {
        const result = e.target.value.replace(/\D/g, '');
        inputRef.current.value = result;
    }

    const gotoBlock = (blockNumber) => {
        if (location.pathname.startsWith("/block")) {
            navigate(`/block/${blockNumber}`);
        } else {
            setBlockNumber(blockNumber);
        }
    }


    async function setInputBlock() {
        const inputBlock = parseInt(inputRef.current.value);
        inputRef.current.value = "";

        if (inputBlock <= latestBlock) gotoBlock(inputBlock);
        else {
            const latest = await alchemy.core.getBlockNumber();
            setLatestBlock(latest);
            if (inputBlock <= latest) gotoBlock(inputBlock);
        }
    }

    function setPrevBlockNumber() {
        if (blockNumber) gotoBlock(blockNumber - 1);
    }

    async function setNextBlockNumber() {
        if (blockNumber < latestBlock) gotoBlock(blockNumber + 1);
        else {
            const latest = await alchemy.core.getBlockNumber();
            setLatestBlock(latest);
            if (blockNumber < latest) gotoBlock(blockNumber + 1);
        }
    }

    async function setLatestBlockNumber() {
        const latest = await alchemy.core.getBlockNumber();
        setLatestBlock(latest)
        gotoBlock(latest);
    }

    return (
        <>
            <input
                ref={inputRef}
                onChange={handleInput}
                onKeyDown={e => { if (e.key === 'Enter') setInputBlock(); }}
                placeholder='Find block by number'
            />
            <button onClick={setInputBlock}>Find</button>
            <button onClick={setPrevBlockNumber}>Previous</button>
            <button onClick={setNextBlockNumber}>Next</button>
            <button onClick={setLatestBlockNumber}>Latest</button>
            <hr />
            {/* An <Outlet> renders whatever child route is currently active, you can think 
			about this <Outlet> as a placeholder for the child routes defined above. */}
            <Outlet />
        </>
    );
}