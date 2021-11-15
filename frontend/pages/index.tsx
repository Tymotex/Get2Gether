import HelloWorld from "@components/HelloWorld/HelloWorld";
import axios from "axios";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
    const [result, setResult] = useState<any>();

    const addUser = () => {
        axios
            .get("http://localhost:4000/users")
            .then((res) => {
                console.log(res);
                setResult(res.data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <strong>UPDATE!!!!!!!!!!!!!!!</strong>
            <HelloWorld />
            <div>
                <button
                    onClick={addUser}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add user
                </button>
            </div>
            <pre>{result}</pre>
        </div>
    );
};

export default Home;
