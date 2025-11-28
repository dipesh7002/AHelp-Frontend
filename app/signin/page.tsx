"use client"

import { useState } from "react";
import NavBar from "../components/NavBar";

interface Feilds {
    type: string,
    required: boolean,
    readonly: boolean,
    choices: []
}

const [data, setData] = useState<Writers[] | null>(null)

export default function Signin(){
    return(
        <div>
        <NavBar />
            Sign in here
        </div>
    )
}