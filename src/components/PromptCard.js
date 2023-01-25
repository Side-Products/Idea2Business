import Image from "next/image";
import styles from "./styles/PromptCard.module.css";

export default function PromptCard({handleCardClick, cardInfo, bgImg, isLoading}){
    return (
        <div className="cursor-pointer w-[240px] aspect-square relative rounded-2xl overflow-hidden bg-white" onClick={handleCardClick}>
            {<Image
                sizes="100%"
                src={'/card-2.jpg'} fill alt="cover" priority style={{objectFit: 'cover'}}/>}
            <div className={"w-full h-full absolute flex items-center justify-center "+styles['card-info']}>
                {!isLoading?
                    <h3 className="font-tertiary uppercase font-semibold text-xl text-center text-white">{cardInfo? cardInfo:'Test'}</h3>
                    :
                    <span className="loader"></span>
                }
            </div>
        </div>
    );
}