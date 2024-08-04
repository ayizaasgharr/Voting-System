import {  User } from "../types/invite"
import { DocumentData } from '@firebase/firestore'; 

export interface Select {
    types: DocumentData[] | User[] 
    values: any
    handleChange: any
    type: string
}