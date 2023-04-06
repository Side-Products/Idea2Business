import Image from "next/image";
import Link from "next/link";
import discord from "../../../public/socials/discord.svg";
import facebook from "../../../public/socials/facebook.svg";
import twitter from "../../../public/socials/twitter.svg";
import instagram from "../../../public/socials/instagram.svg";
import youtube from "../../../public/socials/youtube.svg";
import telegram from "../../../public/socials/telegram.svg";
import linkedin from "../../../public/socials/linkedin.svg";

const Socials = () => {
	return (
		<div className="socials mt-2">
			<button>
				<Link href="https://discord.com/invite/rXKb7rCqjG" className="flex justify-center items-center" passHref>
					<Image src={discord} width={20} height={20} alt="discord"></Image>
				</Link>
			</button>
			<button>
				<Link href="https://www.instagram.com/musixverse/" className="flex justify-center items-center" passHref>
					<Image src={instagram} width={20} height={20} alt="instagram"></Image>
				</Link>
			</button>
			<button>
				<Link href="https://twitter.com/musixverse" className="flex justify-center items-center" passHref>
					<Image src={twitter} width={20} height={20} alt="twitter"></Image>
				</Link>
			</button>
			<button>
				<Link href="https://www.facebook.com/Musixverse-104390125641359" className="flex justify-center items-center" passHref>
					<Image src={facebook} width={20} height={20} alt="facebook"></Image>
				</Link>
			</button>
			<button>
				<Link href="https://www.linkedin.com/company/musixverse" className="flex justify-center items-center" passHref>
					<Image src={linkedin} width={20} height={20} alt="LinkedIn"></Image>
				</Link>
			</button>
			<button>
				<Link href="https://www.youtube.com/channel/UCloNloMRDKaB-0e-xeaTdXw" className="flex justify-center items-center" passHref>
					<Image src={youtube} width={20} height={20} alt="YouTube"></Image>
				</Link>
			</button>
			<button>
				<Link href="https://t.me/+7e4mG5yhutswNWVl" className="flex justify-center items-center" passHref>
					<Image src={telegram} width={20} height={20} alt="Telegram"></Image>
				</Link>
			</button>
		</div>
	);
};

export default Socials;
