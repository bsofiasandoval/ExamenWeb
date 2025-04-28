import { useState } from "react";

interface User {
    username: string;
    password: string;
    fullName: string;
    membershipNumber: string;
}

const sampleUsers: User[] = [
    {
        username: "sandra.g",
        password: "latte123",
        fullName: "Sandra García",
        membershipNumber: "5001",
    },
    {
        username: "roberto.m",
        password: "capuccino456",
        fullName: "Roberto Martínez",
        membershipNumber: "5002",
    },
    {
        username: "esteban.1",
        password: "espresso789",
        fullName: "Esteban López",
        membershipNumber: "5003",
    },
];

export const useValidateUser = () => {
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateUser = (username: string, password: string) => {
        const user = sampleUsers.find(
            (u) => u.username === username && u.password === password
        );

        if (user) {
            setIsValid(true);
            return { fullName: user.fullName, membershipNumber: user.membershipNumber };
        } else {
            setIsValid(false);
            setError("Acceso denegado. Usuario o contraseña incorrectos");
            return null;
        }
    };

    return { validateUser };
};