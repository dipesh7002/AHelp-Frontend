import {motion, scale, Variants} from 'framer-motion'

const buttonVariant: Variants = {
    hidden: {opacity: 0},
    visible: {opacity: 1}
}

export default function Button({text} : {text: string}){
    return(
        <motion.button
            className="rounded-4xl px-6 py-3 font-medium bg-sky-900 text-white hover:bg-sky-800 cursor-pointer" 
            variants={buttonVariant}
            whileHover={{
                scale: 1.1
            }}
        >
        {text}
        </motion.button>
    ) 
}
