
import {body} from 'express-validator'

export const createProjectValidator = ()=>{
    return [
        body()
    ]
}