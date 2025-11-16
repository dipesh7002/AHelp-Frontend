import {motion, scale, Variants} from 'framer-motion'

const buttonVariant: Variants = {
    hidden: {opacity: 0},
    visible: {opacity: 1}
}

export default function Button({text} : {text: string}){
    return(
        <motion.button
            className='bg-green-700 text-black rounded-xl cursor-pointer hover:bg-green-500 py-3 px-5 my-0' 
            variants={buttonVariant}
            whileHover={{
                scale: 1.1
            }}
        >
        {text}
        </motion.button>
    ) 
}
