import axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {}

interface User {
    id: number;
    email: string;
    name: string;
}

const HelloWorld: React.FC<Props> = () => {
    // TODO: Get rid of this component. It's just for manual testing

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        console.log("Fetching users now");

        axios
            .get("http://localhost:4000/")
            .then((res) => {
                setUsers(res.data as User[]);
            })
            .catch((err) => {
                console.log("Failed: ", err);
            });
    }, []);

    return (
        <div style={{ background: "lightgray" }}>
            Hello World!
            <div style={{ margin: 10, background: "yellow" }}>
                Users in the database:
                <hr />
                {users && users.length > 0 ? (
                    users.map((user, i) => (
                        <div
                            key={i}
                            style={{
                                margin: 10,
                                padding: 10,
                                background: "purple",
                                color: "white",
                            }}
                        >
                            <pre>Email: {user.email}</pre>
                            <pre>Name: {user.name}</pre>
                        </div>
                    ))
                ) : (
                    <div>
                        <strong>No users found</strong>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HelloWorld;
